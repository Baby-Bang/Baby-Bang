import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class Growtheditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowTime: ""
        }
    }

    componentWillMount() {
        var nowTime = new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getDate()
        this.setState({nowTime});
    }

    render() {
        return <div className="largefont">
            <Time nowTime={this.state.nowTime}/>
            <BabyDays babyBir={this.props.babyBir} nowTime={this.state.nowTime}/>
            <Title/>
            <ImageUpload/>
            <Text/>
            <Start/>
            <Submit userName={this.props.userName}/>
        </div>
    }
}

class Time extends Component {
    render() {
        return <div className="time">
            <div className="nowtime">今天是</div>
            <div className="nowtime" id="getnowtime">{this.props.nowTime}</div>
        </div>
    }
}

class BabyDays extends Component {
    calculate(nowTime, babyBir) {
        var nowtime = nowTime.split('-');
        var babybir = babyBir.split('-');
        var year = parseInt(nowtime[0] - babybir[0]);
        var month = parseInt(nowtime[1] - babybir[1]);
        var day = parseInt(nowtime[2] - babybir[2]);
        if (year === 0) {
            return month + "月" + day + "天";
        } else if (month === 0) {
            return day + "天";
        } else {
            return year + "年" + month + " 月" + day + " 天";
        }
    }

    render() {
        var baby = this.calculate(this.props.nowTime, this.props.babyBir);

        return <div className="inputDay">
            <p className="babyinline">baby 已经 </p>
            <div id="babydays" className="babyinline">{baby}</div>
        </div>
    }
}

class Title extends Component {
    render() {
        return <div className="titleInput">
            <form className="form-horizontal" role="form">
                <div className="form-group">
                    <input type="text" className="form-control" classID="firstname"
                           placeholder="请输入标题" id="titlename"></input>
                </div>
            </form>
        </div>
    }
}

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} height="150px" width="200px"/>);
        }
        return (
            <div className="addPhoto">
                <form onSubmit={this._handleSubmit}>
                    <input type="file" onChange={this._handleImageChange}/>
                </form>
                <div className="hidden" id="imageurl">
                    {imagePreviewUrl}
                </div>
                <div>
                    {$imagePreview}
                </div>
            </div>
        )
    }
}

class Text extends Component {
    render() {
        return <div className="textArea">
            <h4>内容</h4>
            <textarea cols="75" rows="15" id="dairytext"></textarea>
        </div>
    }
}

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            babystar: [0, 0, 0, 0, 0],
            parentstar: [0, 0, 0, 0, 0]
        }
    }

    clickstart(index, type) {
        if (type === 'baby') {
            let babystar = this.state.babystar;
            for (let i = 0; i < 5; i++) {
                if (i <= index) {
                    babystar[i] = 1;
                } else {
                    babystar[i] = 0;
                }
            }
            this.setState({babystar});
        } else {
            let parentstar = this.state.parentstar;
            for (let i = 0; i < 5; i++) {
                if (i <= index) {
                    parentstar[i] = 1;
                } else {
                    parentstar[i] = 0;
                }
            }
            this.setState({parentstar});
        }

    }

    render() {
        var babystar = this.state.babystar.map((start, index) => {
            if (start === 0) {
                return <div key={index} className="performance">
                    <span className="glyphicon glyphicon-star-empty startcolor"
                          onClick={this.clickstart.bind(this, index, 'baby')} id={index}></span>
                </div>
            } else {
                return <div key={index} className="performance">
                    <span className="glyphicon glyphicon-star startcolor"
                          onClick={this.clickstart.bind(this, index, 'baby')} id={index}></span>
                </div>
            }
        })

        var parentstar = this.state.parentstar.map((start, index) => {
            if (start === 0) {
                return <div key={index} className="performance">
                    <p className="glyphicon glyphicon-star-empty startcolor"
                       onClick={this.clickstart.bind(this, index, 'parent')} id={index}></p>
                </div>
            } else {
                return <div key={index} className="performance">
                    <p className="glyphicon glyphicon-star startcolor"
                       onClick={this.clickstart.bind(this, index, 'parent')} id={index}></p>
                </div>
            }
        })
        this.state.babystar.reduce((a, b) => a + b);
        return <div className="start">
            <div className="hidden" id="babyscore">
                {this.state.babystar.reduce((a, b) => a + b)}
            </div>
            <div className="hidden" id="parentscore">
                {this.state.parentstar.reduce((a, b) => a + b)}
            </div>
            <div>
                {"baby 表现 "}{babystar}
            </div>
            <div>
                {"父母 表现"}{parentstar}
            </div>
        </div>
    }
}

class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publicdairy: true
        }
    }

    changeClickState() {
        this.setState({publicdairy: !this.state.publicdairy})
    }

    changeClick() {
        if (this.state.publicdairy === true) {
            this.setState({publicdairy: this.state.publicdairy})
        } else {
            this.setState({publicdairy: !this.state.publicdairy})
        }
    }

    saveMessage() {
        const date = document.getElementById('getnowtime').innerHTML;
        const age = document.getElementById('babydays').innerHTML;
        const title = document.getElementById('titlename').value;
        const content = document.getElementById('dairytext').value;
        const babyscore = document.getElementById('babyscore').innerHTML;
        const parentscore = document.getElementById('parentscore').innerHTML;
        const publics = this.state.publicdairy;
        const likeNumber = 0;
        const picture = document.getElementById('imageurl').innerHTML;


        $.post('/editor', {name: this.props.userName, date: date, age: age, title: title,content:content,
                babyscore:babyscore,parentscore:parentscore,public:publics,likeNumber:likeNumber,picture:picture},(data)=>{
        });
        browserHistory.push('/course');
    }

    render() {
        return <div>
                <div className="miradio">
                    私密:<input type="radio" name="radio" onClick={this.changeClickState.bind(this)}></input>
                </div>
                <div className="publicRadio">
                    公开:<input type="radio" name="radio" onClick={this.changeClick.bind(this)}></input>
                </div>
            <button type="submit" className="submit" onClick={this.saveMessage.bind(this)}>保存</button>
        </div>
    }
}