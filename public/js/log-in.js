import {browserHistory} from 'react-router';
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
                } else if(this.state.isExist === false){
                    document.getElementById('error').innerHTML = '密码输入错误!'
                }
            });
        });
    }

    render() {
        return <div>
            <LogInView onLog={this.logIn.bind(this)}/>
        </div>
    }
}

class LogInView extends Component {
    logIn() {
        if(document.getElementById('userName').value && document.getElementById('passWord').value) {
            this.props.onLog(document.getElementById('userName').value, document.getElementById('passWord').value);
        } else {
            document.getElementById('error').innerHTML = '用户或密码不能为空';
        }
    }

    render() {
        return <div>
            <br/><br/>
            <form className="form-horizontal">
                <div className="form-group row">
                    <label className="col-md-1 col-md-offset-6 control-label">用户名：</label>
                    <div className="col-md-3">
                        <input type="text" className="form-control" id="userName"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-1 col-md-offset-6 control-label">密码：</label>
                    <div className="col-md-3">
                        <input type="password" className="form-control" id="passWord"/>
                    </div>
                </div>
                <div className="col-md-3 col-md-offset-7" id="error">
                </div>
                <div className="form-group">
                    <div className="col-md-offset-9 col-md-1">
                        <button type="button" className="btn btn-default" onClick={this.logIn.bind(this)}>登陆</button>
                    </div>
                </div>
            </form>
        </div>
    }
}
