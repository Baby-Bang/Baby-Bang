import React, {Component} from 'react';
import {render} from 'react-dom';
import NavigationBar from './navigation-bar';
import Sidebar from './sidebar';
import Growtheditor from './growth-Editor';
import {browserHistory} from 'react-router';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            babyBir: "",
            userName: ""
        }
    }

    componentWillMount() {
        $.get('/babyBir', (babyBir)=> {
            this.setState({babyBir});
        }, 'json');
        $.get('/userName', (userName)=> {
            this.setState({userName});
        }, 'json');
    }

    changLogout() {
        $.post('/logout', (userName) => {
            this.setState({userName});
        });
        browserHistory.push('/');
    }

    render() {
        return <div>
            <NavigationBar name="编 辑 baby 成 长 历 程" userName={this.state.userName}
                           onChangLogout={this.changLogout.bind(this)}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar/>
                    </div>
                    <div className="col-md-8">
                        <Growtheditor babyBir={this.state.babyBir} userName={this.state.userName}/>
                    </div>
                </div>
            </div>
        </div>
    }
}
