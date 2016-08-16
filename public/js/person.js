import React, {Component} from 'react';
import NavigationBar from './navigation-bar';
import {browserHistory} from 'react-router';
import Sidebar from './sidebar';

export default class PersonView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userInfo: {}
        }
    }

    componentDidMount() {
        $.get('/userInfo', (userInfo) => {
            this.setState({userInfo});
        }, 'json');
        $.get('/logIn', (userName) => {
            this.setState({userName});
        });
    }

    changLogout() {
        $.post('/logout', (userName) => {
            this.setState({userName});
        });
        browserHistory.push('/');
    }

    render() {
        return <div id="jjj" className="magBackColor1">
            <NavigationBar name="个 人 中 心" userName={this.state.userName} onChangLogout={this.changLogout.bind(this)}/>
            <div className="col-md-3">
                <Sidebar/>
            </div>
            <div className="col-md-8">
                <Message userInfo={this.state.userInfo}/>
            </div>
        </div>
    }
}

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            babyBir: '',
            sex: '',
            oldPassword: '',
            isDone: false
        };
        console.log(this.props.userInfo);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userName: nextProps.userInfo.name,
            babyBir: nextProps.userInfo.babyBir,
            sex: nextProps.userInfo.sex,
            oldPassword: nextProps.userInfo.password
        })
    }

    modifyUserName() {
        this.setState({
            userName: document.getElementById('modifyName').value
        });
    }

    modifyBabyBir() {
        this.setState({
            babyBir: document.getElementById('modifyBir').value
        });
    }

    modifySex(type) {
        this.setState({
            sex: type
        })
    }

    saveModify() {
        $.ajax({
            url: "/userInfo",
            method: "put",
            data: {name: this.state.userName, babyBir: this.state.babyBir, sex: this.state.sex},
            dataType: "json",
            success: (res) => {
                if (res) {
                    alert('修改成功！');
                }
            }
        })
    }

    isRightPassword() {
        if (document.getElementById('oldPassword').value != this.state.oldPassword) {
            document.getElementById('wrongPassword').innerHTML = '你输了错误的密码';
        }
        else {
            document.getElementById('wrongPassword').innerHTML = '';
        }
    }

    isSamePassword() {
        if (document.getElementById('NewPassword1').value != document.getElementById('NewPassword2').value) {
            document.getElementById('notSamePassword').innerHTML = '两次输入不一致';
        }
        else {
            document.getElementById('notSamePassword').innerHTML = '';
        }
    }

    submitPassword() {
        const oldPassword = document.getElementById('oldPassword').value;
        const password = document.getElementById('NewPassword1').value;
        const password1 = document.getElementById('NewPassword2').value;

        if (oldPassword === '' || password === '' || password1 === '') {
            document.getElementById('notSamePassword').innerHTML = '输入密码不能为空！';
        } else {
            document.getElementById('notSamePassword').innerHTML = '';
            $.post('/submitPassword', {password: password}, (result)=> {
                if (result) {
                    alert('修改成功');
                }
            });
        }
    }

    render() {
        return <div id="person" className="">
            <div className="col-md-5 col-md-offset-2" id="backColor">
                <div id="Loglist" className="center ">
                    <span className="nameGra magPerson">个人资料</span>
                </div>
                <div className="gra">
                    <span className="nameGra">用户名：{this.state.userName}</span>
                </div>
                <div className="gra">
                    <span className="nameGra">宝宝生日</span> <input type="date" className="fontType" id="modifyBir"
                                                                 value={this.state.babyBir}
                                                                 onChange={this.modifyBabyBir.bind(this)}/>
                </div>
                <div className="gra">
                    <div className="threeInline">
                        <input className="sex1" type="radio" checked={this.state.sex === 'woman' ? "checked" : ""}
                               onChange={this.modifySex.bind(this, 'woman')}/><span className="nameGra">妈妈</span>
                    </div>
                    <div className="threeInline radiopad">
                        <input className="sex1" type="radio" checked={this.state.sex === 'woman' ? "" : "checked"}
                               onChange={this.modifySex.bind(this, 'man')}/><span className="nameGra">爸爸</span>
                    </div>
                </div>
                <div className="magButton">
                    <button className="btn btn-primary col-md-offset-2 btn-persion"
                            onClick={this.saveModify.bind(this)}>保 存
                    </button>
                    <button className="btn btn-primary col-md-offset-2 btn-persion" data-toggle="modal"
                            data-target="#myModal">修改密码
                    </button>
                </div>
            </div>

            <div id="myModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="row pasPad">
                            <span className="col-md-2 col-md-offset-2">旧密码</span>
                            <div className="col-md-6">
                                <input type="password" className="form-control" onBlur={this.isRightPassword.bind(this)}
                                       id="oldPassword"/>
                            </div>
                        </div>
                        <div id="wrongPassword" className="passError"></div>
                        <div className="row pasPad">
                            <span className="col-md-2 col-md-offset-2">新密码</span>
                            <div className="col-md-6">
                                <input type="password" className="form-control" id="NewPassword1"/>
                            </div>
                        </div>
                        <div className="row pasPad">
                            <span className="col-md-2 col-md-offset-2">确认密码</span>
                            <div className="col-md-6">
                                <input type="password" id="NewPassword2" onBlur={this.isSamePassword.bind(this)}
                                       className="form-control"/>
                            </div>
                        </div>
                        <div id="notSamePassword" className="passError"></div>
                        <div className="center">
                            <button className="btn btn-primary modalPad" onClick={this.submitPassword.bind(this)}>确认修改
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}




