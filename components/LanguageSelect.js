import { Component } from "react";


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

    render () {

        return (
            <div className="dropdown">
                <div className="dropdown__language"  onClick={this.showMenu} ref={(element) => {
                  this.dropdownButton = element;
                }}  >
                    <img className="dropdown__language--flag" src={`/assets/${this.props.flag}.svg`} />
                    <div className="dropdown__language--text">{this.props.text}</div>
                    <div className="dropdown__icon">▾</div>
                </div>
                <div className={`dropdown__list ${this.state.showMenu?"dropdown__visible":""}`} ref={(element) => {
                  this.dropdownMenu = element;
                }}>
                    <div className="dropdown__item">
                        <img className="dropdown__language--flag" src={`/assets/${this.props.flag}.svg`} />
                        <div className="dropdown__language--text">{this.props.text}</div>
                    
                    </div>

                    <div className="divider" />

                    <div className="dropdown__item">
                        <img className="dropdown__language--flag" src={`/assets/united-states.svg`} />
                        <div className="dropdown__language--text">English</div>
                    
                    </div>


                    {this.props.items?.map((v, i)=>(
                        <div className="dropdown__item">
                        <img className="dropdown__language--flag" src={`/assets/${v}.svg`} />
                        <div className="dropdown__language--text">{v}</div>
                    
                    </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default LanguageSelect;