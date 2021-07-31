import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    handleBackgroundClick = (e) => {
        let clickedModalContent = e.target.closest('.modal');

        if(clickedModalContent) return;

        this.props.closeModal();
    }

    render() { 
        return (
            <div onClick={this.handleBackgroundClick} className={`modal__background modal__overlay--scroll ${this.props.active ? 'modal__background--active' : ''}`}>
                <div className={`modal ${this.props.centerContent ? 'modal--center' : ''}`} style={{minWidth: this.props.size.width, minHeight: this.props.size.height}}>
                    <div className="modal__header">
                        <div className="modal__title">{this.props.title}</div>
                    </div>
                    <div className={`modal__content ${this.props.centerContent ? 'modal__content--center' : ''}`}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Modal;