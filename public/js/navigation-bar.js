import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NavigationBar extends Component {
    changeLogout(){
        this.props.onChangLogout();
    }
    render() {
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <div className="navbar-header">
                            <Picture/>
                        </div>
                    </div>
                    <Head name={this.props.name}/>
                    <div className={this.props.userName === '' ? "col-md-2" : "hidden"}>
                        <SignInButton/>
                        <LogInButton/>
                    </div>
                    <div className={this.props.userName === '' ? "hidden" : "col-md-2"}>
                        <LogOutButton changeLogout={this.changeLogout.bind(this)}/>
                        <UserName userName={this.props.userName}/>
                    </div>
                </div>
            </div>
        </nav>
    }
}

class Picture extends Component {
    render() {
        return <img src="../images/logo.gif"/>
    }
}

class Head extends Component {
    render() {
        return <div className="col-md-8">
            <div className="center">
                <h1><p className="navbar-text">{this.props.name}</p></h1>
            </div>
        </div>
    }
}

class SignInButton extends Component {
    render() {
        return <Link to="/sign">
            <button type="button" className="btn btn-link navbar-btn pull-right">注册</button>
        </Link>

    }
}

class LogInButton extends Component {
    render() {
        return <Link to="/logIn">
            <button type="button" className="btn btn-link navbar-btn pull-right">登录</button>
        </Link>
    }
}

class UserName extends Component {
    render() {
        return <Link to="/person">
            <button type="button" className="btn btn-link navbar-btn pull-right">{this.props.userName}</button>
        </Link>
    }
}

class LogOutButton extends Component {
    render() {
        return <div>
            <button type="button" className="btn btn-link navbar-btn pull-right" onClick={this.props.changeLogout.bind(this)}>登出</button>
            </div>
    }
}
