import { Component } from "react";


class Paper extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="paper">
                {this.props.children}
            </div>
        )
    }
}

export default Paper;