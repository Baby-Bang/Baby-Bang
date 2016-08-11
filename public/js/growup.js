import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Growup extends Component{

    render(){
        return <div >
            <Link to="#">
                <button className="growup-button">添加</button><br/>
            </Link>
            <Link to="#">
                <button className="grow-button">查看历史</button>
            </Link>
        </div>
    }
}