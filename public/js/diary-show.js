import {Link} from 'react-router';
import React, {Component} from 'react';

export default class DiaryShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texts: []
        }
    }

    componentDidMount() {
        $.post('/diray-show', (userinfo)=> {
            const texts = this.state.texts;
            for (var i of userinfo) {
                for (const j of i.diaries) {
                    texts.push({likeNumber: j.likeNumber, title: j.title, content: j.content});
                }
            }
            this.setState({texts},() =>{
            });
        })

    }

    render() {
        return <div className="row">
            <div id="diary-show-table" className="col-md-8 col-md-offset-2">
                <p id="diary-show-font">精彩日记</p>
                <ShowTitle texts={this.state.texts}/>
            </div>
        </div>
    }
};

const ShowTitle = React.createClass({

    sort: function (text) {
        let temp;
        let i, j;

        for (i = 1; i < text.length; i++) {
            temp = text[i];
            for (j = i; j > 0 && text[j - 1].likeNumber < temp.likeNumber; j--) {
                text[j] = text[j - 1];
            }
            text[j] = temp;
        }

        return text;
    },
    render: function () {
        const array = this.sort(this.props.texts).slice(0, 4);
        const diary = array.map((ele, index) => {
            return <div key={index}>

                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-11">
                            <Link to="/diary-page">
                                <span className="glyphicon glyphicon-triangle-right"></span>
                                {ele.title}
                            </Link>
                        </div>
                        <div className="col-md-1">
                            <span id="zan" className="glyphicon glyphicon-thumbs-up">{ele.likeNumber}</span>
                        </div>

                    </div>
                </li>
            </div>
        })

        return <div>
            {diary}
        </div>
    }
});
