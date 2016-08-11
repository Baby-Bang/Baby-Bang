import {browserHistory} from 'react-router';
import React, {Component} from 'react';

export default class LoginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExist: '',
            isActiveLog: '',
            isActiveSign: ''
        }
    }

    logIn(name, password) {
        $.post('/logIn', {name: name, password: password}, (isExist) => {
            this.setState({isExist}, () => {
                if (this.state.isExist === true) {
                    browserHistory.push('/');
                } else if (this.state.isExist === false) {
                    document.getElementById('error').innerHTML = '密码输入错误!'
                }
            });
        });

    }

    activeChange(type) {
        if (type === 'log') {
            browserHistory.push('/logIn');
        } else {
            browserHistory.push('/sign');
        }
    }

    render() {
        return <div>
            <div id="navColor">
                <div className="center">
                    <img src="../images/logintop.png" height="60px"/>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row" id="logTop">
                    <div className="col-md-4 col-md-offset-2">
                        <div>
                            <img src="../images/babybang.png"/>
                        </div>
                        <div>
                            <img src="../images/om-user.png"/>
                        </div>
                    </div>
                    <div className="col-md-5" id="backColor">
                        <div id="Loglist" className="center">
                            <span onClick={this.activeChange.bind(this, 'log')} className="logA">登录</span>
                            <span onClick={this.activeChange.bind(this, 'sign')} className="logA">注册</span>
                        </div>

                        {this.props.children && React.cloneElement(this.props.children, {
                            onLog: this.logIn.bind(this)
                        })}
                    </div>
                </div>
            </div>
        </div>
    }
}
