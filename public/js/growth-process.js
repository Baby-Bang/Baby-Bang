import React, {Component} from 'react';

let yearCount = 0, monthCount = 0, dayCount = 0;

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

                const monthDay = dealMonth.map(m => {
                    let dealDay = [];
                    for (let i of date) {
                        if (i[1] === m && i[0] === y) {
                            dealDay.push(i[2]);
                        }
                    }

                    const mySetDay = new Set();
                    dealDay.map(i => mySetDay.add(i));
                    dealDay = [];

                    for (let i of mySetDay) {
                        dealDay.push(i);
                    }

                    return {month: m, day: dealDay}
                });

                return {year: y, monthDay: monthDay};
            });
            console.log(resultDate);
            this.setState({year, month, day, resultDate});

            this.setState({diaries});
        }, 'json');
    }

    diaries(m) {

    }

    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-md-offset-1">
                    <LeftLists date={this.state.resultDate} diaries={this.diaries}/>
                </div>
                <div className="col-md-6">
                    <RightLists diaries={this.state.diaries}/>
                </div>
            </div>
        </div>
    }
}

class RightLists extends React.Component {
    render() {
        return <div>
            {this.props.diaries.map((diary, index) => {
                return <div key={index} id={diary.date} className="processBackground">
                    <p className="titleColor">{diary.title}</p>
                    <p className="timeColor">{diary.date}</p>
                    <hr/>
                    <p className="titleColor">{diary.content}</p>
                </div>
            })}
        </div>
    }
}

class LeftLists extends React.Component {
    render() {
        return <div>
            <ul className="nav nav-pills nav-stacked">
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

    render() {
        return <div>
            <li className="list-group-item listLi"><a
                href={`#${this.props.date.year}-${this.props.date.monthDay[0].month}-${this.props.date.monthDay[0].day[0]}`}>
                <h3 onClick={this.show.bind(this)} className="pcolor">{this.props.date.year}年</h3></a>
                <ul className={this.state.isShow ? "nav nav-pills nav-stacked" : "hidden"}>
                    {this.props.date.monthDay.map((m, i) => {
                        return <div key={i}>
                            <MonthDay date={m} year={this.props.date.year}/>
                        </div>;
                    })}
                </ul>
            </li>
        </div>
    }
}

class MonthDay extends React.Component {
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

    render() {
        return <div>
            <li className="list-group-item listLi"><a
                href={`#${this.props.year}-${this.props.date.month}-${this.props.date.day[0]}`}><h4
                onClick={this.show.bind(this)} className="pcolor"> {this.props.date.month}月</h4></a>
                <ul className={this.state.isShow ? "nav nav-pills nav-stacked" : "hidden"}>
                    {this.props.date.day.map((d, i) => {
                        return <div key={i}>
                            <li className="list-group-item listLi"><a
                                href={`#${this.props.year}-${this.props.date.month}-${this.props.date.day[i]}`}><h5
                                className="pcolor">{d}日</h5></a></li>
                        </div>
                    })}
                </ul>
            </li>
        </div>
    }
}


