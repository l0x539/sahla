import { Component } from "react";
import Router from 'next/router'


class LanguageSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: false,
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();
        if (this.state.showMenu) {
            this.setState({ showMenu: false })
        } else {
            this.setState({ showMenu: true }, () => {
              document.addEventListener('click', this.closeMenu);
            });
        }
    }

    
    closeMenu(event) {
        event.preventDefault();
        if (!this.dropdownMenu.contains(event.target) && !this.dropdownButton.contains(event.target)) {
          
          this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
          });  
          
        }
    }

    setArabic = async () => {
        if (localStorage.getItem("lang") !== "ar-DZ") {
            await localStorage.setItem("lang", "ar-DZ")
            window.location.reload()
        }
    }

    setEnglish = async () => {
        if (localStorage.getItem("lang")) {
            await localStorage.removeItem("lang")
            window.location.reload()
            
        }
    }

    render () {

        return (
            <div className="ln-dropdown">
                <div className="ln-dropdown__language"  onClick={this.showMenu} ref={(element) => {
                  this.dropdownButton = element;
                }}  >
                    <img className="ln-dropdown__language--flag" src={`/assets/${this.props.flag}.svg`} />
                    <div className={`ln-dropdown__language--text ${/[\u0600-\u06FF]/.test(this.props.text)?"ln-dropdown__language--arabic":""}`}>{this.props.text}</div>
                    <div className="ln-dropdown__icon">▾</div>
                </div>
                <div className={`ln-dropdown__list ${this.state.showMenu?"ln-dropdown__visible":""}`} ref={(element) => {
                  this.dropdownMenu = element;
                }}>
                    <div className="ln-dropdown__item ln-dropdown__language--arabic" onClick={this.setArabic}>
                        <img className="ln-dropdown__language--flag--select" src={`/assets/algeria.svg`} />
                        <div className="ln-dropdown__language--text">{'عربي'}</div>
                    
                    </div>

                    <div className="divider" />

                    <div className="ln-dropdown__item" onClick={this.setEnglish}>
                        <img className="ln-dropdown__language--flag--select" src={`/assets/united-states.svg`} />
                        <div className="ln-dropdown__language--text ln-dropdown__language--text--select">English</div>
                    
                    </div>


                    {this.props.items?.map((v, i)=>(
                        <div className="ln-dropdown__item" onClick={this.setLang}>
                        <img className="ln-dropdown__language--flag--select" src={`/assets/${v}.svg`} />
                        <div className="ln-dropdown__language--text--select">{v}</div>
                    
                    </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default LanguageSelect;