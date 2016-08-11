import React, {Component} from 'react';
import {render} from 'react-dom';
import NavigationBar from './navigation-bar';
import Carousel from './carousel';
import Sidebar from './sidebar';
import Growup from './growup';

export default class GrowupHome extends React.Component {
    render() {
        return <div>
            <NavigationBar name="成 长 日 记"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar/>
                    </div>
                    <div className="col-md-8">
                        <Carousel/>
                    </div>
                    <div>
                        <Growup/>
                    </div>
                </div>
            </div>
        </div>
    }
}
