import React, {Component} from 'react';
import {render} from 'react-dom';
import NavigationBar from './navigation-bar';
import Sidebar from './sidebar';
import {browserHistory} from 'react-router';

export default class DiaryHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
    }
    componentWillMount() {
        $.get('/session', (userName) => {
            this.setState({userName}, () => {
                console.log(this.state.userName)
            });
        });
    }
    changLogout() {
        $.post('/logout');
        browserHistory.push('/');
    }
    render() {
        return <div className="container-fluid">
                <NavigationBar name="精 彩 日 记" userName={this.state.userName} onChangLogout={this.changLogout.bind(this)}/>
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
    getInitialState: function () {
        return {
            openPage: true
        };
    },
    likeNumber: function () {
        const info = this.props.information;
        if (this.state.openPage) {
            this.state.openPage = false;
            info.likeNumber++;
        }
        else {
            this.state.openPage = true;
            info.likeNumber--;
        }
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
                        <div>
                            {this.state.openPage?"":"已赞"}
                        </div>
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
