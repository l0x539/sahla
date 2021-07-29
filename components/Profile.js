import { Component } from "react";
import { get_user } from "../utils/requests";
import { ImageUploader } from "./ImageUploader";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.data.data
        }
    }

    async componentDidMount() {
        const user = await get_user(localStorage.getItem("jwt"), this.props.data.data.id)
        if (!user.error) {
            this.setState({user: user.data})
        }
    }

    render () {
        const {data, updateImage} = this.props;
        const user = data.data;

        return (
            <>
            <div className="article__header">
                <ImageUploader user={this.state.user} uploadFileName={"files"} onChange={updateImage}/>
                <div className="article__info">
                    <h3 className="article__title heading-primary">Edit your profile</h3>
                    <p className="article__subtitle heading-primary__sub">Change your username</p>
                    <input type="text" name="username" className="input__main article__subtitle heading-primary__sub" placeholder={user.username} />
                    <input type="password" name="cpassword" className="input__main" placeholder={"Enter your Password"} />
                    <button type="submit" className="btn__big">
                    <span className="btn__big--front">
                        Update
                    </span>
                </button>
                </div>
            </div>
                <p className="article__subtitle heading-primary__sub">Change your password</p>
                <input type="password" name="password" className="input__main message-box" placeholder={"Enter your New Password..."} />
                <input type="password" name="password2" className="input__main" placeholder={"Confirm your password..."} />
                <input type="password" name="cpassword" className="input__main" placeholder={"Enter your original Password"} />
                
                <button type="submit" className="btn__big">
                    <span className="btn__big--front">
                        Update Info
                    </span>
                </button>
            </>
        )
    }
}

export default Profile;