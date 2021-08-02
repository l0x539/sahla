import ReactMarkdown from 'react-markdown'
import { Component } from "react";


export default class AboutUs extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount () {
        this.setState({isArabic:window.localStorage.getItem("jwt")==="ar-DZ"})
        if (window.localStorage.getItem("jwt")==="ar-DZ") document.getElementById('aboutus').classList.add("arabic")
        this.setState({language:this.props.language})
    }

    render() {
        return (
            this.state.language?
            <div className={`aboutus ${/[\u0600-\u06FF]/.test(this.state.language?.title)?"arabic":""}`}>
                <div className="aboutus__title">
                <h1>
                    {this.state.language?.title}
                </h1>
                </div>
                <div className="aboutus__content">
                <ReactMarkdown>{this.state.language?.content}</ReactMarkdown>
                </div>
            </div>:
            ""
        )
    }
}