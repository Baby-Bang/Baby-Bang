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
                        <Diary information={this.props.information} addLikeNum={this.props.addLikeNum}/>
                    </div>
                </div>
            </div>

    }
}

const Diary = React.createClass({

    likeNumber: function () {
        const info = this.props.information;
        console.log(info);
        info.likeNumber++;
        $.post('/updateLike', {info}, (data) => {
            console.log('success');
        });
        this.props.addLikeNum(info);
    },
    render: function () {
        return <div>
            <div id="titleDiv" className="row">
                <div className="col-md-10" id="title">
                    <h2 className="titleLike">标题：{this.props.information.title}</h2>
                </div>
                <div className="titleLike col-md-1">
                    <button id="likeButton" onClick={this.likeNumber}>
                        <img src="images/like.png" width='32px' height='32px'/>
                        {this.props.information.likeNumber}
                    </button>
                </div>
            </div>
            <div id="contentDiv">
                <span>{this.props.information.content}</span>
            </div>
        </div>
    }
});
