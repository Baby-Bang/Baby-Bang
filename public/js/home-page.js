import React, {Component} from 'react';
import {render} from 'react-dom';
import NavigationBar from './navigation-bar';
import Carousel from './carousel';
import Sidebar from './sidebar';
import {browserHistory} from 'react-router';
import DiaryShow from './diary-show'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
    }

    componentWillMount() {
        $.get('/logIn', (userName) => {
            this.setState({userName});
        });
    }

    changLogout() {
        $.post('/logout',(userName) => {
            this.setState({userName});
        });
        browserHistory.push('/');
    }

    render() {
        return <div>
            <NavigationBar name="育 儿 帮" userName={this.state.userName} onChangLogout={this.changLogout.bind(this)}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar/>
                    </div>
                    <div className="col-md-8">
                        <Carousel/>
                        <DiaryShow buildInfo={this.props.buildInfo}/>
                    </div>
                </div>
            </div>
        </div>
    }
}
