import React  from 'react';
import './Login.scss';
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {message, Spin} from 'antd'
import actions from '../../../actions'
import {Message} from '../../../utils/utils'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rememberPassworld: false,
            user: {
                username: '',
                password: ''
            },
            loading: false
        }
        this.onLogin = this.onLogin.bind(this);
        this.onUserNameInput = this.onUserNameInput.bind(this);
        this.onPasswordInput = this.onPasswordInput.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        window.addEventListener('keypress', this.onKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.onKeyPress);
    }

    onKeyPress(e) {
        if (e.key === "Enter") {
            this.onLogin();
        }
    }

    onLogin() {
        let user = this.state.user;
        if (!user.username) {
            Message.error("请输入用户名");
            return;
        }
        if (!user.password) {
            Message.error("请输入密码")
            return;
        }

        this.props.dispatch(actions.login(user.username, user.password))
    }

    onUserNameInput(e) {
        e.stopPropagation();
        if (e.key === 'Enter') {
            this.refs.password.focus()
            return
        }

        let user = this.state.user;
        user.username = e.target.value;
        this.setState({
            user: user
        })
    }

    onPasswordInput(e) {
        let user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user: user
        })
    }

    render() {
        return (
            <div className="login-wrap">
                <Spin spinning={this.state.loading} tip='登录中,请稍候...'>
                    <div className="login-content">
                        <div className="logo">登陆</div>
                        <div className="login-form">
                            <div className="form-item">
                                <input type="text" placeholder="请输入账号" value={this.state.user.username}
                                       onChange={(e) => this.onUserNameInput(e)}
                                       onKeyPress={(e) => this.onUserNameInput(e)}/>
                            </div>
                            <div className="form-item">
                                <input type="password" placeholder="请输入密码" ref="password"
                                       value={this.state.user.password} onChange={(e) => this.onPasswordInput(e)}
                                       onKeyPress={(e) => this.onPasswordInput(e)}/>
                            </div>
                            <div className="login">
                                <div onClick={this.onLogin} className="icon"></div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }
}

export default connect()(Login)