import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {Route} from 'react-router';
import {IndexRoute} from 'react-router';
import {browserHistory} from 'react-router'
import Home from './home-page';
import GrowupHome from './growup-page'
import LogIn from './login-register';
import Log from './logIn';
import Sign from './sign';
import GrowthProcess from './growth-process';
import Editor from './editor-page';
import DiaryHome from './diary-page';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            information: {}
        }
    }
    buildInfo(info) {
        this.state.information = info;
        browserHistory.push('/diary-page');
    }
    addLikeNum(info) {
        this.state.information = info;
        this.setState({information: this.state.information});
    }
    render() {
        return <div>
            {this.props.children && React.cloneElement(this.props.children, {
                information: this.state.information,
                buildInfo: this.buildInfo.bind(this),
                addLikeNum: this.addLikeNum.bind(this)
            })}
        </div>
    }
}

render(<Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/logIn" component={LogIn}>
            <IndexRoute component={Log}></IndexRoute>
            <Route path="/sign" component={Sign}/>
        </Route>
        <Route path="/growUp" component={GrowupHome}/>
        <Route path="/course" component={GrowthProcess}/>
        <Route path="/editor" component={Editor}/>
        <Route path="/diary-page" component={DiaryHome}/>
    </Route>
</Router>, document.getElementById('main'));
