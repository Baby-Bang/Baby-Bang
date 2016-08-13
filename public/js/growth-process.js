import React, {Component} from 'react';

export default class GrowthProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
            year: [],
            day: [],
            month: [],
            resultDate: []
        }
    }

    componentWillMount() {
        $.get('/diaries', (diaries) => {
            diaries.reverse();
            const date = diaries.map(diary => {
                return diary.date.split('-');
            });
            const year = date.map(date => date[0]);
            const month = date.map(date => date[1]);
            const day = date.map(date => date[2]);

            const mySetYear = new Set();
            year.map(y => mySetYear.add(y));

            let dealYear = [];
            for (let i of mySetYear) {
                dealYear.push(i);
            }

            const resultDate = dealYear.map(y => {
                let dealMonth = [];
                for (let d of date) {
                    if (d[0] === y) {
                        dealMonth.push(d[1]);
                    }
                }

                const mySetMonth = new Set();
                dealMonth.map(c => mySetMonth.add(c));
                dealMonth = [];

                for (let i of mySetMonth) {
                    dealMonth.push(i);
                }

                return {year: y, month: dealMonth.reverse()};
            });
            this.setState({year, month, day, resultDate});

            this.setState({diaries});
        }, 'json');
    }
    diaries(m){

    }

    render() {
        return <div className="row">
            <div className="col-md-4">
                <LeftLists date={this.state.resultDate} diaries={this.diaries}/>
            </div>
            <div className="col-md-7">
                <RightLists diaries={this.state.diaries}/>
            </div>
        </div>
    }
}

class RightLists extends React.Component {
    render() {
        return <div>
            {this.props.diaries.map((diary, index) => {
                return <div key={index} id={index}>
                    <p>标题：{diary.title}</p>
                    <p>内容：{diary.content}</p>
                </div>
            })}
        </div>
    }
}

class LeftLists extends React.Component {
    
    render() {
        return <div>
            <ul className="list-group jjj">
                {this.props.date.map((d, index) => {
                    return <div key={index}>
                        <DateLists date={d} diaries={this.props.diaries}/>
                    </div>
                })}
            </ul>
        </div>
    }
}


class DateLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    show() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    showDiaries(m){
        this.props.diaries(m);
    }
    render() {
        return <div>
            <li className="list-group-item"><p onClick={this.show.bind(this)}>{this.props.date.year}</p>
                <ul className={this.state.isShow ? "list-group jjj" : "hidden"}>
                    {this.props.date.month.map((m, i) => {
                        return <div key={i}>
                            <li onClick={this.showDiaries.bind(this,m)} className="list-group-item"><a href={`#${i}`}> {m}</a></li>
                        </div>;
                    })}
                </ul>
            </li>
        </div>
    }
}

