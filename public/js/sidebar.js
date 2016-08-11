module.exports = React.createClass({
    componentDidMount(){
        $(document).ready(function () {
            $("#flip").click(function () {
                $(".panel").slideToggle("slow");
            });
        });
    },
    render(){
        return <div>
            <Sidebar></Sidebar>
        </div>
    }
});


const Sidebar = React.createClass({
    render(){
        return <div className="siderbar">
            <p id="flip" className="glyphicon glyphicon-align-justify">点击我</p>
            <div className="panel">
                <a href="#">成长日记</a><br/>
                <a href="#">育儿心得</a><br/>
                <a href="#">闲置转让</a><br/>
                <a href="#">爸爸圈</a><br/>
                <a href="#">妈妈圈</a><br/>
            </div>
        </div>
    }
});