import React, {Component} from 'react';
import {render} from 'react-dom';
import NavigationBar from './navigation-bar';
import Carousel from './carousel';
import Sidebar from './sidebar';
import Growup from './growup';
import {browserHistory} from 'react-router';

export default class GrowupHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
    }

    componentWillMount() {
        $.get('/session', (userName) => {
            this.setState({userName}, () => {
                console.log(this.state.userName + 'g')
            });
        });
        console.log(111)
    }

    changLogout() {
        $.post('/logout',(userName) => {
            this.setState({userName});
        });
        browserHistory.push('/');
    }

    render() {
        console.log(this.state.userName + 'g1')
        return <div>
            <NavigationBar name="成 长 日 记" userName={this.state.userName} onChangLogout={this.changLogout.bind(this)}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar/>
                    </div>
                    <div className="col-md-8">
                        <Carousel/>
                    </div>
                    <div>
                        <Growup/>
                    </div>
                </div>
            </div>
        </div>
    }
}
