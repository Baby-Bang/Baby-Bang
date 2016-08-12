import {Link} from 'react-router';
import React from 'react';
import {browserHistory} from 'react-router';

module.exports = React.createClass({
    getInitialState(){
        return {
            userName: ''
        }
    },
    componentDidMount(){
        $(document).ready(function () {
            $("#flip").click(function () {
                $(".panel").slideToggle("slow");
            });
        });
    },
    judge(){
        $.get('/logIn', (userName) => {
            this.setState({userName}, () => {
                if (this.state.userName === '') {
                    if (confirm('还未登陆，是否登陆！'))
                        browserHistory.push('/logIn')
                } else {
                    browserHistory.push('/growup');
                }
            });
        });
    },
    linkToHome(){
        browserHistory.push('/')
    },
    render(){
        return <div className="siderbar">
            <p id="flip" className="glyphicon glyphicon-align-justify">点击我</p>
            <div className="panel">
                <p onClick={this.linkToHome}>首页</p>
                <p onClick={this.judge}>成长日记</p>
                <p onClick="">育儿心得</p>
                <p onClick="">闲置转让</p>
                <p onClick="">爸爸圈</p>
                <p onClick="">妈妈圈</p>
            </div>
        </div>
    }
});