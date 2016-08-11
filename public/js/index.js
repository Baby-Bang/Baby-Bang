import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import {Router} from 'react-router';
import {Route} from 'react-router';
import {IndexRoute} from 'react-router';
import Home from './home-page';

class App extends React.Component {
    render() {
        return <div>
            {this.props.children}
        </div>
    }
}

render(<Router>
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
    </Route>
</Router>, document.getElementById('main'));