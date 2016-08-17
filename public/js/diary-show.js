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
        $.get('/diray-show', (userinfo)=> {
            const texts = this.state.texts;
            for (const i of userinfo) {
                for (const j of i.diaries) {
                    if(j.public === 'true'){
                        texts.push({likeNumber: j.likeNumber, title: j.title, content: j.content, name: i.name});
                    }
                }
            }
            this.setState({texts}, () => {
            });
        })

    }

    render() {
        return <div className="row">
            <div id="" className="col-md-11 diaryShowMag">
                <p id="diary-show-font">精彩日记</p>
                <ShowTitle texts={this.state.texts} buildInfo={this.props.buildInfo}/>
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
            for (j = i; j > 0 && text[j - 1].likeNumber <temp.likeNumber; j--) {
                text[j] = text[j - 1];
            }
            text[j] = temp;
        }

        return text;
    },
    onAdd(ele) {
        this.props.buildInfo(ele);
    },
    add: function (ele) {
        const info = ele;
        info.likeNumber++;
        $.post('/updateLike', {info},(data)=> {});
        this.setState(ele);
    },

    render: function () {

        const array = this.sort(this.props.texts).slice(0, 4);
        const diary = array.map((ele, index) => {
            return <div key={index}>

                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-10">
                            <Link to="/diary-page">
                                <span className="glyphicon glyphicon-triangle-right"></span>
                                <button id="diaryTitle" onClick={this.onAdd.bind(this, ele)}>{ele.title}</button>
                            </Link>
                        </div>
                        <div className="col-md-2">
                            <p className="glyphicon glyphicon-heart heartColor"
                               onClick={this.add.bind(this, ele)}/>
                            <span >  {ele.likeNumber}</span>

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
