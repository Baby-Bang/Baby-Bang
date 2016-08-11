import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {Route} from 'react-router';
import {IndexRoute} from 'react-router';
import { browserHistory } from 'react-router'
import Home from './home-page';
import LogIn from './log-in';

class App extends React.Component {
    render() {
        return <div>
            {this.props.children}
        </div>
    }
}

render(<Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/logIn" component={LogIn}/>
    </Route>
</Router>, document.getElementById('main'));