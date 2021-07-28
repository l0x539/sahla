import { Component } from "react";
import LanguageSelect from "./LanguageSelect";
import NavItem from "./NavItem";
import SignUpButton from "./SignUpButton";
import ThemeSwitch from "./ThemeSwitch";
import Logo from "../assets/logo.svg";
import LogoHolder from "../assets/LogoHolder.svg";
import { Divide as Hamburger } from 'hamburger-react'
import SidenavLink from "./SideNavLink";
import Registration from "./Registration";
import Modal from "./Modal";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import UserDropDown from "./UserDropDown";



class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: this.props.theme,
            openButtonLangue: false,
            sidenavActive: false
        }
    }

    componentDidMount() {
        this.setState({
            theme: localStorage.getItem('theme') || 'light'
        });

    }

    openModalEvent = () => {
        this.setState({modalOpen: true})
    }

    closeModal = () => {
        this.setState({modalOpen: false})
    }

    handleThemeClick = (e) => {
        let currentTheme = e.target.closest('#slider').dataset.theme;
        let newTheme = currentTheme === 'light' ? 'dark' : 'light'

        localStorage.setItem('theme', newTheme);

        this.setState({
            theme: newTheme
        }, () => {
            this.props.handleThemeUpdate(newTheme);
        });
    }

    toggleButonLanguage = () => {
        this.setState({openButtonLangue: !this.state.openButtonLangue})
    }

    toggleSidenav = () => {
        this.setState({sidenavActive: !this.state.sidenavActive})
    }

    handleBackgroundClick = e => {
        if(e.target.closest('.sidenav')) return;
        this.toggleSidenav(); 
    }

    render() {
        return (
            <>
                <NotificationContainer/>
                <div className={`sidenav__background ${this.state.sidenavActive ? 'sidenav__background--active' : ''}`} onClick={this.handleBackgroundClick}>

                    <nav className="sidenav">
                        <div className="sidenav__content">
                            <button className="nav__hamburger nav__hamburger--cross sidenav__cross" onClick={this.toggleSidenav}>
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </button>
                            <ul className="sidenav__list normalize-list">
                                {this.props.loggedIn?null:<SignUpButton openModalEvent={this.openModalEvent} />}
                                    <div className="nav__item nav__item--switch nav__item--switch-menu">
                                        <ThemeSwitch handleSwitchTheme={this.handleThemeClick} theme={this.state.theme} />
                                    </div>
                                <SidenavLink islink={true} link="/" label="Home" />
                                <SidenavLink islink={true} link="/services" label="Services" />
                                <SidenavLink islink={true} link="/products" label="Products" />
                                <SidenavLink islink={true} link="/aboutus" label="About US" />
                                <SidenavLink islink={true} link="/support" label="Support" />
                            </ul>
                        </div>
                    </nav>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="sidenav__wave">
                        <path fillOpacity="1" d="M0,160L80,154.7C160,149,320,139,480,149.3C640,160,800,192,960,197.3C1120,203,1280,181,1360,170.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                    </svg>
                </div>
                <div className="nav">
                    <div className="nav__headline" />
                    <div className="nav__container">
                        <div className="nav__logo-snap">
                            <div className="nav__logo-container">
                                <Logo className="nav__logo" />
                            </div>
                        </div>
                        <div className="nav__list nav__list--right">

                            <NavItem text="Home" active link="/" />
                            <NavItem text="Services" link="/services" />
                            <NavItem text="Products" link="/products" />
                            <NavItem text="About US" link="/aboutus" />
                            <NavItem text="Support" link="/support" />

                            <div className="nav__item">
                                <LanguageSelect open={this.state.openButtonLangue} text={"عربي"} flag={"algeria"} />
                            </div>
                            <div className="nav__item nav__item--switch">
                                <ThemeSwitch handleSwitchTheme={this.handleThemeClick} theme={this.state.theme} />
                            </div>
                            <div className="nav__item">
                                {this.props.loggedIn?null:<SignUpButton openModalEvent={this.openModalEvent} />}
                                {this.props.loggedIn?<UserDropDown user={this.props.user} setLogout={this.props.setLogout} /> :null}
                            </div>
                        </div>
                        <div className="mobile-drop">
                            {this.props.loggedIn?<UserDropDown user={this.props.user} setLogout={this.props.setLogout} /> :null}
                        </div>
                        <div className="menu">
                            <Hamburger onToggle={this.toggleSidenav} toggled={this.state.sidenavActive} />
                        </div>
                    </div>
                </div>
                <Modal
                active={this.state.modalOpen}
                size={{width: '50rem', height: '20rem'}}
                centerContent={true}
                title={<div className="heading-primary">Sign In</div>}
                    closeModal={this.closeModal}>
                    <Registration NotificationManager={NotificationManager} closeModal={this.closeModal} setLogin={this.props.setLogin} />
                </Modal>
            </>
        )
    }
}

export default Nav;