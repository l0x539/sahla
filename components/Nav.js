import { Component } from "react";
import LanguageSelect from "./LanguageSelect";
import NavItem from "./NavItem";
import SignUpButton from "./SignUpButton";
import ThemeSwitch from "./ThemeSwitch";
import Logo from "../assets/logo.svg";
import LogoHolder from "../assets/LogoHolder.svg";



class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: this.props.theme,
            openButtonLangue: false
        }
    }

    componentDidMount() {
        this.setState({
            theme: localStorage.getItem('theme') || 'light'
        });

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

    render() {
        return (
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
                            <SignUpButton />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nav;