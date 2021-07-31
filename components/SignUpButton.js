
const SignUpButton = ({openModalEvent, placeholder}) => {
    return <button onClick={openModalEvent} className="btn__big">
        <span className="btn__big--front">
            {placeholder}
        </span>
    </button>
}

export default SignUpButton;