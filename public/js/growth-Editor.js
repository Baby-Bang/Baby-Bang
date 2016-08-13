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
    render(){
        return <div>

        </div>
    }
}
