import { Component } from 'react';
import { API_HOST } from '../utils/constants';
import { get_me, get_user } from '../utils/requests';
import Copyright from './Copyright';
import Footer from './Footer';
import Nav from './Nav';
import Router from 'next/router'


class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'light',
            loggedIn: false,
            resolved: false,
        }
    }

    async componentDidMount(){
        this.setState({isArabic:/[\u0600-\u06FF]/.test(this.props.footerLang.home)})
        if(localStorage.getItem('theme')) {
            this.setState({ theme: localStorage.getItem('theme') })
        }
        if(localStorage.getItem('jwt')) {
            const me = await get_me(localStorage.getItem('jwt'))
            const user = await get_user(localStorage.getItem('jwt'), me.data.id)
            
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
        this.setState({resolved: true})
        
    }

    setLogout = () => {
        localStorage.removeItem("jwt")
        this.setState({ jwt: undefined })
        this.setState({ user:undefined })
        this.setState({ loggedIn: false })
        Router.push("/");

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
                <Nav language={this.props.navbarLang} handleThemeUpdate={this.handleThemeUpdate} setLogout={this.setLogout} user={this.state.user} loggedIn={this.state.loggedIn} setLogin={this.setLogin} user={this.state.user} API_HOST={API_HOST} resolved={this.state.resolved} />
                <div className="content">
                    {this.props.children}
                </div>
                <footer>
                    <div className="main-divider"></div>
                    <Footer isArabic={this.state.isArabic} language={this.props.footerLang} />
                    <div className="main-divider"></div>
                    <Copyright isArabic={this.state.isArabic} copyright={this.props.footerLang?.copyright??"COPYRIGHT © 2021 Sahla Business"} />
                </footer>
                
            </main>
        )
    }
}

export default Layout;