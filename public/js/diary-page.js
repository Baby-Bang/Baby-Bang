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
                    <div className="col-md-10">
                        <Diary information={this.props.information}/>
                    </div>
                </div>
            </div>

    }
}

const Diary = React.createClass({
    render: function () {
        return <div>
            <div id="titleDiv">
                <h2>标题：{this.props.information.title}</h2>
            </div>
            <div id="contentDiv">
                <p>{this.props.information.content}</p>
            </div>
        </div>
    }
});
