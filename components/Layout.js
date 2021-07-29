import { Component } from 'react';
import { API_HOST } from '../utils/constants';
import { get_me, get_user } from '../utils/requests';
import Copyright from './Copyright';
import Footer from './Footer';
import Nav from './Nav';


class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'light',
            loggedIn: false
        }
    }

    async componentDidMount(){
        if(localStorage.getItem('theme')) {
            this.setState({ theme: localStorage.getItem('theme') })
        }
        if(localStorage.getItem('jwt')) {
            const me = await get_me(localStorage.getItem('jwt'))
            const user = await get_user(localStorage.getItem('jwt'), me.data.id)
            
            console.log("main user", user);
            if (!user.error) {
                this.setState({ jwt: localStorage.getItem('jwt') })
                this.setState({ user:user.data })
                this.setState({ loggedIn: true })
            } else {
                this.setState({ jwt: undefined })
                this.setState({ user:undefined })
                this.setState({ loggedIn: false })
            }
        }
    }

    setLogout = () => {
        this.setState({ jwt: undefined })
        this.setState({ user:undefined })
        this.setState({ loggedIn: false })
    }

    setLogin = (data) => {
        this.setState({ jwt: data.jwt })
        this.setState({ user: data.user })
        this.setState({ loggedIn: true })
        localStorage.setItem("jwt", data.jwt)
    }
    
    handleThemeUpdate = (theme) => {
        this.setState({theme});
    }

    render () {
        return (
            <main className={`root ${this.state.theme}-theme`}>
                <Nav handleThemeUpdate={this.handleThemeUpdate} setLogout={this.setLogout} user={this.state.user} loggedIn={this.state.loggedIn} setLogin={this.setLogin} user={this.state.user} API_HOST={API_HOST} />
                <div className="content">
                    {this.props.children}
                </div>
                <footer>
                    <div className="main-divider"></div>
                    <Footer />
                    <div className="main-divider"></div>
                    <Copyright />
                </footer>
            </main>
        )
    }
}

export default Layout;