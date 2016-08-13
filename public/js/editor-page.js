import React, {Component} from 'react';
import {render} from 'react-dom';
import NavigationBar from './navigation-bar';
import Sidebar from './sidebar';
import Growtheditor from './growth-Editor'

export default class Editor extends React.Component {
    render() {
        return <div>
            <NavigationBar name="编 辑 baby 成 长 历 程"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar/>
                    </div>
                    <div className="col-md-8">
                        <Growtheditor/>
                    </div>
                </div>
            </div>
        </div>
    }
}
