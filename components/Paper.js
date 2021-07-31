import { Component } from "react";


class Paper extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="paper__container">
                <div className="paper__side paper ">
                    {this.props.children}
                </div>
                <div className={`paper__side paper__other-side ${this.props.isArabic?"arabic":""}`}>
                    <div className="paper__other-side-part ">
                        {this.props.otherSide}
                    </div>
                </div>
            </div>
        )
    }
}

export default Paper;