class NavigationBar extends React.Component {

    render() {
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <div className="navbar-header">

                        <Picture/>
                            </div>
                    </div>
                    <Head/>
                    <div className="col-md-2">
                        <SignInButton/>
                        <LogInButton/>
                    </div>
                </div>
            </div>
        </nav>
    }
}

class Picture extends React.Component {
    render() {
        return <img src="../images/logo.gif"/>
        }
}

class Head extends React.Component {
    render() {
        return <div className="col-md-8">
            <div className="center">
                <h1><p className="navbar-text">育 儿 帮</p></h1>
            </div>
        </div>
    }
}

class SignInButton extends React.Component {
    render() {
        return <ReactRouter.Link to="#">
            <button type="button" className="btn btn-link navbar-btn pull-right">注册</button>
        </ReactRouter.Link>
    }
}

class LogInButton extends React.Component {
    render() {
        return <ReactRouter.Link to="#">
            <button type="button" className="btn btn-link navbar-btn pull-right">登陆</button>
        </ReactRouter.Link>
    }
}

ReactDOM.render(<ReactRouter.Router>
    <ReactRouter.Route path="/" component={NavigationBar}/>
</ReactRouter.Router>, document.getElementById('navigationBar'));
