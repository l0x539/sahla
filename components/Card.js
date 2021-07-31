import { Component } from "react";
import { API_HOST } from "../utils/constants";


class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount () {
        this.setState({isArabic: /[\u0600-\u06FF]/.test(this.props.order.title)})
    }

    pickOrder = (e) => {
        if (e.target.className !== "card__check")
            this.props.onClick(this.props.order.id)
    }

    checkBox = (e) => {
        this.props.selectCard(this.props.order.id)
    }

    render () {
    
        return (
            <div className="card" onClick={this.pickOrder}>
                {
                    this.props.isLoggedIn?
                    <input type="checkbox" className="card__check" onClick={this.checkBox} />
                    :
                    null
                }
                <div className="card__img" style={{backgroundImage: `url(${this.props.order?.images?.length?API_HOST + this.props.order.images[0].url:"http://beepeers.com/assets/images/commerces/default-image.jpg"})` }} />
                <div className={"card__content " + (this.state.isArabic?"arabic":"")}>
                    <h1 className="card__title">
                        {this.props.order.title}
                    <div className="card__title-bar"></div>
                    </h1>
                    <p className="card__desc" >
                        {this.props.order.description}
                    </p>
                </div>
            </div>
        )
    }
}

export default Card;