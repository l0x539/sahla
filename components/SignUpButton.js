
const SignUpButton = ({openModalEvent}) => {
    return <button onClick={openModalEvent} className="btn__big">
        <span className="btn__big--front">
            Sign Up
        </span>
    </button>
}

export default SignUpButton;