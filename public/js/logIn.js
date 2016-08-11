import React, {Component} from 'react';

export default class LogInView extends Component {
    logIn() {
        if (document.getElementById('userName').value && document.getElementById('passWord').value) {
            this.props.onLog(document.getElementById('userName').value, document.getElementById('passWord').value);
        } else {
            document.getElementById('error').innerHTML = '用户或密码不能为空';
        }
    }

    render() {
        return <div>
            <br/><br/>
            <form className="form-horizontal">
                <div className="col-md-10 col-md-offset-1">
                    <input type="text" className="text form-control" id="userName" placeholder="用户名" />
                </div>
                <div className="col-md-10 col-md-offset-1">
                    <input type="password" className="text form-control" id="passWord" placeholder="密码"/>
                </div>
                <div className="col-md-6 col-md-offset-1 iii" id="error">
                </div>
                <div className="form-group">
                    <div>
                        <button type="button" className="btn btn-default logbtn" onClick={this.logIn.bind(this)}>登录</button>
                    </div>
                </div>
            </form>
        </div>
    }
}