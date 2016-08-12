import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class Sign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserExist: false,
            isSamePassword: true,
            isDisabled: ''
        }
    }

    existName() {
        $.post('/existUser', {userName: document.getElementById('userName').value}, (isUserExist) => {
            if (isUserExist) {
                this.setState({isUserExist, isDisabled: 'disabled'}, () => {
                    document.getElementById('userExist').innerHTML = ' 该用户已存在';
                });
            } else {
                console.log(this.state.isSamePassword);
                this.setState({isUserExist});
                if (this.state.isSamePassword) {
                    this.setState({isDisabled: ''});
                }
                document.getElementById('userExist').innerHTML = '';
            }
        });
    }

    isSamePassword() {
        if (document.getElementById('password').value === document.getElementById('confirmPassword').value) {
            if(!this.state.isUserExist){
                this.setState({isDisabled: ''});
            }
            this.setState({isSamePassword: true});
            document.getElementById('samePassword').innerHTML = '';
        } else {
            this.setState({isSamePassword: false, isDisabled: 'disabled'});
            document.getElementById('samePassword').innerHTML = '两次密码输入不一致';
        }
    }

    formSubmit() {
        const userName = document.getElementById('userName').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const babyBir = document.getElementById('babyBir').value;
        const sex = $("input[name=parent]:checked").val();
        if (userName === '' || password === '' ||
            confirmPassword === '' || babyBir === '' || sex === undefined) {
            alert('您所输入的注册内容不完整！');
        } else {
            $.post('/userInfo', {name: userName, password: password, babyBir: babyBir, sex: sex});
            browserHistory.push('/');

        }
    }

    render() {
        return <div>
            <form className="form-horizontal">
                <br/>
                <div className="form-group">
                    <label className="col-md-4 control-label textColor">用户名</label>
                    <div className="col-md-7">
                        <input type="text" className="form-control" id="userName" placeholder=""
                               onChange={this.existName.bind(this)}/>
                    </div>
                </div>
                <div id="userExist" className="col-md-offset-4"></div>
                <div className="form-group">
                    <label className="col-md-4 control-label textColor">密码</label>
                    <div className="col-md-7">
                        <input type="password" className="form-control" id="password" placeholder=""/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-4 control-label textColor">密码确认</label>
                    <div className="col-md-7">
                        <input type="password" className="form-control" id="confirmPassword" placeholder=""
                               onBlur={this.isSamePassword.bind(this)}/>
                    </div>
                </div>
                <div id="samePassword" className="col-md-offset-4"></div>
                <div className="form-group">
                    <label className="col-md-4 control-label textColor">宝宝出生日期</label>
                    <div className="col-md-7">
                        <input type="date" className="form-control" id="babyBir" placeholder=""/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-4 col-md-offset-3">
                        <input  type="radio" placeholder="" name="parent" value="woman"/><span className="sex">妈妈</span>
                    </div>
                    <div className="col-md-4">
                        <input className="sex" type="radio" placeholder="" name="parent" value="man"/><span className="sex">爸爸</span>
                    </div>
                </div>
                <div className="form-group">

                    <button type="button" className="btn btn-default signbtn" disabled={this.state.isDisabled}
                            onClick={this.formSubmit.bind(this)}>注册
                    </button>
                </div>
            </form>
        </div>
    }
}
