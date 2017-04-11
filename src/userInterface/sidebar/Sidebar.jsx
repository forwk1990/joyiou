import React from 'react'
import './Sidebar.scss'
import {hashHistory} from 'react-router'
import HttpChannel from '../../channel'
import {connect} from 'react-redux'
import actions from '../../actions'

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.isFold = false
        this.selectedGroupIndex = -1
        this.modules = this._getVisibleModules()
    }

    /*
     * 获取需要显示的模块
     * */
    _getVisibleModules() {
        let modules = HttpChannel.modules()
        const userModules = this.props.modules
        return modules.map(function (module) {
            if (userModules.filter(function (userModule) {
                    return userModule.name === module.name && userModule.allowVisit
                }).length > 0) return module
        }).filter(function (module) {
            return !!module
        })
    }

    render() {
        const self = this
        return (
            <div className="sidebar">
                <div className="sidebar-fold"
                     onClick={() => this.handleFoldEvent()}>
                    <span className="fold-icon"></span>
                </div>
                {

                    this.modules.map(function (module, index) {
                        const ulHeight = module.items.length * 50 + 'px'
                        const matchedGroup = module.items.filter(function (item) {
                            return location.hash.indexOf(item.url) >= 0
                        })
                        if (matchedGroup && matchedGroup.length > 0) self.selectedGroupIndex = index

                        return (
                            <div className="sidebar-navigation" key={index}>
                                <div className="sidebar-navigation-title"
                                     onClick={() => self.handleGroupFoldEvent(index)}>
                                    <div className="sidebar-navigation-title-wrapper">
                                        <span data-index={`arrow-${index}`}
                                              className={`arrow ${(self.selectedGroupIndex == index) ? 'rotate-fold' : ''}`}></span>
                                        <span className="sidebar-title">{module.name}</span>
                                    </div>
                                </div>
                                <ul data-index={index}
                                    className={`sidebar-navigation-trans ${(self.selectedGroupIndex !== index) ? 'trans-fold' : ''}`}
                                    style={{height: ulHeight}}
                                    data-count={module.items.length}>
                                    {
                                        module.items.map(function (item, innerIndex) {
                                            const liSpanClassName = ((self.selectedGroupIndex == index) && (location.hash.indexOf(item.url) >= 0)) ? 'active' : ''
                                            return (
                                                <li data-index={`${index}-${innerIndex}`} key={innerIndex}
                                                    onClick={() => self.handleItemSelectedEvent(`${index}-${innerIndex}`, item.url)}>
                                                    <span className={`indicator ${liSpanClassName}`}></span>
                                                    <span className={`icon ${item.icon} ${liSpanClassName}`}></span>
                                                    <span className={`tran-name ${liSpanClassName}`}>{item.name}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    /*点击最上方的折叠按钮*/
    handleFoldEvent() {
        const isFold = !this.isFold
        if (isFold) {
            $(".sidebar").removeClass('width-unfold').addClass('width-fold')
            $(".fold-icon").removeClass('rotate-unfold').addClass('rotate-fold')
            $(".tran-name").hide()
            $(".sidebar-title").hide()
            $(".sidebar-navigation-trans").css("width", "50px")
        } else {
            $(".sidebar").removeClass('width-fold').addClass('width-unfold')
            $(".fold-icon").removeClass('rotate-fold').addClass('rotate-unfold')
            setTimeout(function () {
                $(".tran-name").show()
                $(".sidebar-title").show()
            }, 100)
            $(".sidebar-navigation-trans").css("width", "200px")
        }
        this.isFold = isFold
        this.props.dispatch(actions.toggleSidebar(this.isFold))
    }

    /*点击单个组模块组，切换折叠*/
    handleGroupFoldEvent(index) {
        $(`ul[data-index!=${index}]`).addClass("trans-fold")
        $(`ul[data-index=${index}]`).toggleClass("trans-fold")
        $(`span[data-index!=arrow-${index}]`).removeClass("rotate-fold")
        $(`span[data-index=arrow-${index}]`).toggleClass("rotate-fold")
    }

    /*点击单个模块*/
    handleItemSelectedEvent(liIndex, url) {
        $('.sidebar li span').removeClass('active')
        $(`.sidebar li[data-index=${liIndex}]>span`).addClass('active')
        hashHistory.push(url)
    }

}

const mapStateToProps = (state) => {
    return {
        modules: state.user.modules
    }
}

export default connect(mapStateToProps)(Sidebar)