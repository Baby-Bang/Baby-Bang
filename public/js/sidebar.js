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

        $.get('/logIn', (userName) => {
            this.setState({userName});
        });
    },
    judge(){
        if (this.state.userName === '') {
            if (confirm('还未登陆，是否登陆！'))
                browserHistory.push('/logIn')   
        } else {
            browserHistory.push('/growup');
        }
    },
    render(){
        return <div className="siderbar">
            <p id="flip" className="glyphicon glyphicon-align-justify">点击我</p>
            <div className="panel">
                <Link to="/">首页</Link><br/>
                <p onClick={this.judge}>成长日记</p>
                <Link to="#">育儿心得</Link><br/>
                <Link to="#">闲置转让</Link><br/>
                <Link to="#">爸爸圈</Link><br/>
                <Link to="#">妈妈圈</Link><br/>
            </div>
        </div>
    }
});