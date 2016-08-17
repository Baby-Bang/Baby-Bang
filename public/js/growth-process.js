import React, {Component} from 'react';
import NavigationBar from './navigation-bar';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';

export default class GrowthProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
            resultDate: [],
            userName: ''
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
            this.state.resultDate = resultDate;

            this.setState({diaries});
        }, 'json');
        $.get('/logIn', (userName) => {
            this.setState({userName});
        });
    }

    changLogout() {
        $.post('/logout');
        browserHistory.push('/');
    }

    render() {
        return <div className="magBackColor2">
            <NavigationBar name="成 长 历 程" userName={this.state.userName} onChangLogout={this.changLogout.bind(this)}/>
            <div className="returnFixed">
                <Link to="/growUp">
                    <button className="growup-button">返回</button>
                </Link>
            </div>
            <div className="container-fluid">
                <div className="row  topProcess">
                    <div className={this.state.resultDate.length === 0 ? "" : "hidden"}>
                        <h1 id="ao">～啊哦</h1>
                        <div className="center">
                        <img src="../images/dingdang.png"/>
                            </div>
                        <h1 id="kongKong">空空如也</h1>
                    </div>
                    <div className={this.state.resultDate.length === 0 ? "hidden" : "leftFixed"}>
                        <div className="center">
                            <LeftLists date={this.state.resultDate}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-md-offset-4 ">
                        <RightLists diaries={this.state.diaries}/>
                    </div>
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
                    <p className="timeColor threeInline">{diary.date}</p>
                    <span className="glyphicon glyphicon-heart heartColor threeInline" aria-hidden="true"></span>
                    <p className="likeColor threeInline">{diary.likeNumber}</p>
                    <hr className="hrHeight"/>
                    <p className="contentColor">{diary.content}</p>
                    <hr className="hrHeight"/>
                    <div className="babyParent">
                        <p className="timeColor threeInline">宝宝表现：</p>
                        {[0, 0, 0, 0, 0].map((star, index) => {
                            if (index < diary.babyScore) {
                                return <div key={index} className="threeInline">
                                    <span className="glyphicon glyphicon-star starColor"></span>
                                </div>
                            } else {
                                return <div key={index} className="threeInline">
                                    <span className="glyphicon glyphicon-star-empty starColor"></span>
                                </div>
                            }
                        })}
                        <p className="timeColor threeInline">父母表现：</p>
                        {[0, 0, 0, 0, 0].map((star, index) => {
                            if (index < diary.parentScore) {
                                return <div key={index} className="threeInline">
                                    <span className="glyphicon glyphicon-star starColor"></span>
                                </div>
                            } else {
                                return <div key={index} className="threeInline">
                                    <span className="glyphicon glyphicon-star-empty starColor"></span>
                                </div>
                            }
                        })}
                    </div>
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


