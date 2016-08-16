import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import React, {Component} from 'react';

    export default class LoginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExist: ''
        }
    }

    logIn(name, password) {
        $.post('/logIn', {name: name, password: password}, (isExist) => {
            this.setState({isExist}, () => {
                if (this.state.isExist === true) {
                    browserHistory.push('/');
                } else if (this.state.isExist === false) {
                    document.getElementById('error').innerHTML = '用户或密码输入错误!'
                }
            });
        });

    }

    activeChange(type) {
        if (type === 'log') {
            document.getElementById('sign').style.background='#fff';
            document.getElementById('log').style.background='rgba(55,55,55,0.1)';
            browserHistory.push('/logIn');
        } else {
            document.getElementById('log').style.background='#fff';
            document.getElementById('sign').style.background='rgba(55,55,55,0.1)';
            browserHistory.push('/sign');
        }
    }

    render() {
        return <div>
            <div id="navColor">
                <div className="center">
                    <Link to="/"><img src="../images/logintop.png" height="60px"/></Link>
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
                            <span onClick={this.activeChange.bind(this, 'log')} className="logA" id="log">登录</span>
                            <span onClick={this.activeChange.bind(this, 'sign')} className="logA" id="sign">注册</span>
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
