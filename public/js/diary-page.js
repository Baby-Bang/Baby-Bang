import React, {Component} from 'react';
import {render} from 'react-dom';
import NavigationBar from './navigation-bar';
import Sidebar from './sidebar';

export default class DiaryHome extends React.Component {
    render() {
        return <div className="container-fluid">
                <NavigationBar name="精彩日记"/>
                <div className="row">
                    <div className="col-md-1">
                        <Sidebar/>
                    </div>
                    <div className="col-md-4">
                        <Diary/>
                    </div>
                </div>
            </div>

    }
}

const Diary = React.createClass({
    render: function () {
        return <div className="row">
            <div className="col-md-8 col-md-offset-2">
                <input id="diary-show-border" type="text"/>
            </div>
        </div>
    }
});