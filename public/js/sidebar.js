import {Link} from 'react-router';

import React from 'react';

module.exports = React.createClass({
    componentDidMount(){
        $(document).ready(function () {
            $("#flip").click(function () {
                $(".panel").slideToggle("slow");
            });
        });
    },
    render(){
        return <div>
            <Sidebar></Sidebar>
        </div>
    }
});


const Sidebar = React.createClass({
    render(){
        return <div className="siderbar">
            <p id="flip" className="glyphicon glyphicon-align-justify">点击我</p>
            <div className="panel">
                <Link to="/">首页</Link><br/>
                <Link to="/growup">成长日记</Link><br/>
                <Link to="#">育儿心得</Link><br/>
                <Link to="#">闲置转让</Link><br/>
                <Link to="#">爸爸圈</Link><br/>
                <Link to="#">妈妈圈</Link><br/>
            </div>
        </div>
    }
});