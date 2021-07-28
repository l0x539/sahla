import { Component } from "react";


class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="sahla-message">
                <h1 className="sahla-message__title">
                    {this.props.title}
                </h1>
                <p className="sahla-message__desc" >
                    {this.props.desc}
                </p>
            </div>
        )
    }
}

export default Message;