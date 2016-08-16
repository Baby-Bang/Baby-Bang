import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Growup extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return <div>
            <div  className="growup-button1">
                <Link to="/editor">
                    <button  className="growup-button">添  加</button><br/>
                </Link>
            </div>
            <div className="grow-button2">
                <Link to="/course">
                    <button className="grow-button">查看历史</button>
                </Link>
            </div>
        </div>
    }
}