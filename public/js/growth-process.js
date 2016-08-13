import React, {Component} from 'react';

export default class GrowthProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diaries: []
        }
    }

    componentWillMount() {
        $.get('/diaries', (diaries) => {
            this.setState({diaries});
        }, 'json');
    }

    render() {
        return <div>
            {this.state.diaries.map((diary, index) => {
                return <div key={index}>
                    {diary.date}
                    {diary.age}
                    {diary.title}
                </div>
            })}
        </div>
    }
}
