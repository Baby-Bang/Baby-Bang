import React, {Component} from 'react';
import {render} from 'react-dom';
import NavigationBar from './navigation-bar';
import Carousel from './carousel';
import Sidebar from './sidebar';

class App extends React.Component {
    render() {
        return <div>
            <NavigationBar/>
            <div className="container-fluid">
                <div class="row">
                    <div className="col-md-2">
                        <Sidebar/>
                    </div>
                    <div className="col-md-10">
                        <Carousel/>
                    </div>
                </div>
            </div>
        </div>
    }
}

render(<App/>, document.getElementById('main'));