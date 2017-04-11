import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import store from './utils/store'
import App from './App.js'
import Container from 'container/Container.jsx'
import OfflineActivities from 'main/activity/OfflineActivities.jsx'
import Vips from 'main/vip/vips'
import Login from 'main/login/Login'
import {Paths} from './constants'
import Trains from 'main/train/Trains'
import EnergyRange from 'main/energy/EnergyRange'
import EnergyRules from 'main/energy/EnergyRules'
import Users from 'main/user/Users'
import address from './channel/address'
import HttpChannel from './channel'
import NotFound from 'main/common/NotFound'
import {UserAuthWrapper} from 'redux-auth-wrapper'
import LoadingPage from './userInterface/main/common/Loading'

/*
 * 用户是否已经授权.
 * 用于需要做授权的组件包装
 * */
const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.user,
    predicate: user => user && user.id,
    authenticatingSelector: state => state.user.isLoading,
    LoadingComponent: LoadingPage,
    wrapperDisplayName: 'UserIsAuthenticated'
})

const PermissionWrapperComponent = (DecoratedComponent, moduleName) => {

    class wrapperComponent extends React.Component {

        constructor(props) {
            super(props)
            this.state = {
                editable: this._userCanEditModule(props)
            }
        }

        componentWillReceiveProps(nextProps) {
            this.setState({editable: this._userCanEditModule(nextProps)})
        }

        _userCanEditModule(props) {
            if (!props.modules || props.modules.length === 0) return false
            return props.modules.filter(module => {
                return module.name === moduleName && module.allowVisit && module.permission == 2
            }).length
        }

        render() {
            return (
                <DecoratedComponent editable={this.state.editable}/>
            )
        }

    }

    const mapStateToProps = (state) => {
        return {
            modules: state.user.modules
        }
    }

    return connect(mapStateToProps)(wrapperComponent)
}

/*
 * 用户是否允许访问当前模块
 * */
const UserIsAllowVisitModule = (moduleName) => component => {
    return UserAuthWrapper({
        authSelector: state => state.user,
        predicate: user => user.modules && user.modules.filter(module => (module.name === moduleName) && module.allowVisit).length > 0,
        wrapperDisplayName: 'UserIsAllowVisitModule',
        failureRedirectPath: '/login',
        allowRedirectBack: false
    })(PermissionWrapperComponent(component, moduleName))
}


/*
 * 获取用户访问模块
 * */
const getUserVisitModule = (user) => {
    if (!user || !user.id) return ''
    const userAllowVisitModules = user.modules.filter(userModule => userModule.allowVisit)
    if (!userAllowVisitModules || userAllowVisitModules.length === 0) return '404'
    const url = HttpChannel.modules().filter(function (module) {
        const userModule = userAllowVisitModules[0]
        return userModule.name === module.name && userModule.allowVisit
    })[0].url
    return url
}

/*
 * 用户是否还未授权
 * 用于登陆页面
 * */
const UserIsNotAuthenticated = UserAuthWrapper({
    authSelector: state => state.user,
    predicate: user => !user || !user.id,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || getUserVisitModule(state.user),
    allowRedirectBack: false
})

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={UserIsNotAuthenticated(Login)}/>
                <Route path='/login' component={UserIsNotAuthenticated(Login)}/>
                <Route path="/page" component={UserIsAuthenticated(Container)}>
                    <Route path={Paths.offlineActivities}
                           component={UserIsAllowVisitModule('线下活动')(OfflineActivities)}/>
                    <Route path={Paths.vips} component={UserIsAllowVisitModule('会员管理')(Vips)}/>
                    <Route path={Paths.users} component={UserIsAllowVisitModule('职级管理')(Users)}/>
                    <Route path={Paths.energyRange} component={UserIsAllowVisitModule('能量管理')(EnergyRange)}/>
                    <Route path={Paths.energyRules} component={UserIsAllowVisitModule('能量管理')(EnergyRules)}/>
                    <Route path={Paths.trains} component={UserIsAllowVisitModule('正念训练')(Trains)}/>
                </Route>
                <Route path='*' component={NotFound}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById("root")
)