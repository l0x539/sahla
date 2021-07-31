import { Component } from "react";

export default class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div >
                <p className="sahla-message__desc" >
                    {this.props.question}
                </p>
                <div className="card-carousel">
                    <button className="btn__big btn_content" onClick={() => {this.props.answer(true)}}>
                        <span className="btn__big--front">
                            {'Yes'}
                        </span>
                    </button>
                    <button className="btn__big btn_content" style={{ backgroundColor: "gray"}} onClick={() => {this.props.answer(false)}}>
                        <span className="btn__big--front" style={{ backgroundColor: "#a8a8a8"}}>
                            {'No'}
                        </span>
                    </button>
                </div>
            </div>
        )
    }
}