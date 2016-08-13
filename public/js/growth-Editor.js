import React,{Component} from 'react';

export default class Growtheditor extends Component{
    render(){
        return <div>
            <Time></Time>
            <BabyDays></BabyDays>
            <Title></Title>
            <Picture></Picture>
            <Text></Text>
            <Start></Start>
        </div>
    }
}

class Time extends Component{
    render(){
        return  <div className="time">
            {new Date().getFullYear()+"年"+ (parseInt(new Date().getMonth())+1) +"月"+ new Date().getDate()+"日"}
        </div>
    }
}

class BabyDays extends Component{
    render(){
        return  <div className="babydays" id="days">
            {"baby"}<input type="text" size="10"></input>{"天"}
        </div>
    }
}

class Title extends Component{
    render(){
        return <div>
            {"标题:"}<input type="text"></input>
        </div>
    }
}

class Picture extends Component{
    render(){
        return <div>
            <button>添加图片</button>
        </div>
    }
}

class Text extends Component{
    render(){
        return <div>
            <textarea></textarea>
        </div>
    }
}

class Start extends Component{
    componentWillMount(){
        var starGroup = document.getElementById('star').children,
            clickIndex; //定义一个全局变量用于储存被点击星星的索引值

        window.onload = starFunc;

        function starFunc() {
            for (var i = 0; i < starGroup.length; i++) {//将每颗星星循环出来
                starGroup[i].onmouseover = starHover;//绑定鼠标划到星星上的事件
                starGroup[i].onclick = starClick;//绑定点击星星事件
                starGroup[i].onmouseout = starOut;//绑定鼠标移出星星事件
                starGroup[i].index = i;//获得每颗星星的索引
            };
        }

        function starHover() {
            var curIndex = this.index;//鼠标划过星星时，获得当前星星索引值
            starLight(curIndex);//传入点亮星星的函数，从而执行点亮和熄灭动作
        }

        function starClick() {
            var curIndex = this.index;//获得当前被点击星星的索引值
            starLight(curIndex);//传入点亮星星的函数
            clickIndex = curIndex;//将被点击星星的索引值记录下来
        }

        function starOut() {
//如果点击事件发生，被点击星星索引传入点亮星星函数，鼠标划出时将恢复点击时的状态，如果点击事件没有发生，星星将全部熄灭
            starLight(clickIndex);
        }

        function starLight(index) {//点亮星星函数，当mouse over和点击事件发生时，将当前星星索引值传入，用以执行星星的点亮和熄灭动作
            for (var i = 0; i < starGroup.length; i++) {
                if (i <= index) {
                    starGroup[i].className = "rated";//点亮星星
                } else {
                    starGroup[i].className = "";//熄灭星星
                };
            };
        }


    }
    render(){
        return <div id="star">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    }
}
