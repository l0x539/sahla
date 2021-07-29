import { Component } from "react";
import { API_HOST } from "../utils/constants";


class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    pickOrder = () => {
        this.props.onClick(this.props.order.id)
    }

    render () {
        return (
            <div className="card" onClick={this.pickOrder}>
                <div className="card__img" style={{backgroundImage: `url(${this.props.order?.images?.length?API_HOST + this.props.order.images[0].url:"http://beepeers.com/assets/images/commerces/default-image.jpg"})` }} />
                <div className="card__content">
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