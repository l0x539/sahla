import { Component } from "react";


class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="card">
                <div className="card__img" style={{backgroundImage: `url(${this.props.image})` }} />
                <div className="card__content">
                    <h1 className="card__title">
                        {this.props.title}
                    <div className="card__title-bar"></div>
                    </h1>
                    <p className="card__desc" >
                        {this.props.desc}
                    </p>
                </div>
            </div>
        )
    }
}

export default Card;