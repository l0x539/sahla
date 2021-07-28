import React, { Component } from 'react';

import { contact_us } from "../utils/requests";
import ReCAPTCHA from "react-google-recaptcha";


import {NotificationContainer, NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
  )

  import "./contact.module.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class Contact extends Component {
    state = {
      editorState: undefined,
    }
  
    onEditorStateChange = (editorState) => {
      this.setState({
        editorState,
        error: false
      });
    };

    recaptchaChange = (recaptcha) => {
        this.setState({recaptcha})
    }
    
    componentDidMount () {
        this.setState({window})
    }

    handleSubmit = async (e) => {
      e.preventDefault();
      let form = e.target.elements;
      let email = form[0].value;
      let title = form[1].value;
      let content = this.state.editorState?.getCurrentContent()
      let recaptcha = this.state.recaptcha

      if (email && title && email.length < 70 && title.length<100) {
        //   if (!recaptcha) {
        //     this.setState({error: "Recaptcha required"})
        //     NotificationManager.error('Recaptcha required', 'Contact US');
        //     return;
        //   }
        contact_us(title, email, content, recaptcha).then(response => {
          if (response.data.error) {
            this.setState({error: response.data.error})
            NotificationManager.error(response.data.error, 'Contact US');

          } else {
            this.setState({message: "Message successfully sent"})
            NotificationManager.success('Message successfully sent', 'Contact US');

          }
        })
      } else {
        this.setState({error: "You have missing fields!"})
        NotificationManager.error('You have missing fields!', 'Contact US');
      }

  }
  
    render() {
      const { editorState } = this.state;
      return (
        <form onSubmit={this.handleSubmit} className="input">
          <div className="margin sahla-message-box ">
              <h1 className="info-card__header">Contact US</h1>
              <input type="email" name="email" className="input__main" placeholder="Email" />
              <input type="text" name="title" className="input__main" placeholder="Title" />
              <Editor
                wrapperClassName="contact-wrapper"
                editorClassName="contact-editor"
                onEditorStateChange={this.onEditorStateChange}
                />
            <br/>
            <ReCAPTCHA
                sitekey="6LciR8cbAAAAANtNxMUznKj73KYIstawazdlaLh3"
                onChange={this.recaptchaChange}
            />
            <button type="submit" className="btn__big btn_content">
                <span className="btn__big--front">
                    Send
                </span>
            </button>
            
          </div>
          <NotificationContainer/>
        </form>
      );
    }
  }

export default Contact