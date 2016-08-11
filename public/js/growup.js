import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Growup extends Component{

    render(){
        return <div >
            <Link to="#">
                <button className="growup-button"><a href="#">添加</a></button><br/>
            </Link>
            <Link to="#">
                <button className="grow-button"><a href="#">查看历史</a></button>
            </Link>
        </div>
    }
}