import React, {Component} from 'react';
import {render} from 'react-dom';
import NavigationBar from './navigation-bar';
import Carousel from './carousel';
import Sidebar from './sidebar';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
    }

    componentWillMount() {
        $.get('/logIn', (userName) => {
            this.setState({userName}, () => {
                console.log(this.state.userName + 'h')
            });
        });
    }

    render() {
        return <div>
            <NavigationBar name="育 儿 帮" userName={this.state.userName}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar/>
                    </div>
                    <div className="col-md-8">
                        <Carousel/>
                    </div>
                </div>
            </div>
        </div>
    }
}