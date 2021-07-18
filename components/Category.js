import { Component } from "react";


class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="category arabic">
                <div className="category__svg">
                    {this.props.svg}
                </div>
                <div className="category__text">
                    <h3 className="category__title">
                        {this.props.title}
                    </h3>
                    <p className="category__desc">
                        {this.props.desc}
                    </p>
                </div>
            </div>
        )
    }
}

export default Category;