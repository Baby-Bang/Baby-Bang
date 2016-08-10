const App = React.createClass({
    render: function () {

        return <div id="myCarousel" className="carousel slide">

            <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
                <li data-target="#myCarousel" data-slide-to="3"></li>
                <li data-target="#myCarousel" data-slide-to="4"></li>
            </ol>

            <div className="carousel-inner">
                <div className="item active">
                    <a href="https://www.amazon.cn/s/ref=nb_ss?ie=UTF8&keywords=%E7%8E%A9%E5%85%B7+%E5%A9%B4%E5%84%BF&tag=googhydrcn-23&index=baby&hvadid=44268539950&hvpos=1t1&hvexid=&hvnetw=g&hvrand=17905765057394918716&hvpone=&hvptwo=&hvqmt=b&hvdev=c&ref=pd_sl_94vpwa0tas_b"
                       target="_blank">
                        <img className="img-rounded" src="../images/tools.jpg" alt="玩具"/>
                        <div className="carousel-caption">tools</div>
                    </a>
                </div>
                <div className="item">
                    <a href="https://www.amazon.cn/s/ref=nb_sb_noss_1?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Dbaby&field-keywords=%E5%A9%B4%E5%84%BF%E5%BA%8A&rh=n%3A42692071%2Ck%3A%E5%A9%B4%E5%84%BF%E5%BA%8A"
                       target="_blank">
                        <img className="img-rounded" src="../images/babyroom.jpg"alt="婴儿房"/>
                        <div className="carousel-caption">baby-room</div>
                    </a>
                </div>
                <div className="item">

                    <a href="https://www.amazon.cn/s/ref=nb_sb_noss_1?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Dbaby&field-keywords=%E5%A9%B4%E5%84%BF%E8%A1%A3%E6%9C%8D&rh=n%3A42692071%2Ck%3A%E5%A9%B4%E5%84%BF%E8%A1%A3%E6%9C%8D"
                       target="_blank">

                        <img className="img-rounded" src="../images/clothes.jpg"alt="衣服"/>
                        <div className="carousel-caption">clothes</div>
                    </a>
                </div>
                <div className="item">
                    <a href="https://www.amazon.cn/s/ref=nb_sb_noss_1?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Dbaby&field-keywords=%E5%A9%B4%E5%84%BF%E8%BD%A6&rh=n%3A42692071%2Ck%3A%E5%A9%B4%E5%84%BF%E8%BD%A6"
                       target="_blank">
                        <img className="img-rounded" src="../images/buggy.jpg"alt="婴儿车"/>
                        <div className="carousel-caption">buggy</div>
                    </a>
                </div>
                <div className="item">
                    <a href="https://www.amazon.cn/s/ref=nb_sb_noss_2?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Dbaby&field-keywords=%E5%A5%B6%E7%B2%89%E5%A9%B4%E5%84%BF&rh=n%3A42692071%2Ck%3A%E5%A5%B6%E7%B2%89%E5%A9%B4%E5%84%BF"
                       target="_blank">
                        <img className="img-rounded" src="../images/milkpowder.jpg"alt="奶粉"/>
                        <div className="carousel-caption">milk-powder</div>
                    </a>
                </div>
            </div>

            <a className="carousel-control left" href="#myCarousel"
               role="button" data-slide="prev">&lsaquo;</a>
            <a className="carousel-control right" href="#myCarousel"
               role="button" data-slide="next">&rsaquo;</a>
        </div>
    }
});
ReactDOM.render(
    <App />
    , document.getElementById('carousel'));