import { Component } from 'react';
import Copyright from './Copyright';
import Footer from './Footer';
import Nav from './Nav';

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'light'
        }
    }

    componentDidMount() {
        if(localStorage.getItem('theme')) {
            this.setState({ theme: localStorage.getItem('theme') })
        }
    }
    
    handleThemeUpdate = (theme) => {
        this.setState({theme});
    }

    render () {
        return (
            <main className={`root ${this.state.theme}-theme`}>
                <Nav handleThemeUpdate={this.handleThemeUpdate} />
                <div className="content">
                    {this.props.children}
                </div>
                <footer>
                    <Footer />
                    <Copyright />
                </footer>
            </main>
        )
    }
}

export default Layout;