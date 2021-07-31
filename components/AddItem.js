import { Add, CloudUpload, ImageOutlined , Close } from "@material-ui/icons";
import { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { GOOGLE_PUBLIC_SECRET } from "../utils/constants";
import Select from "react-select";

import dynamic from 'next/dynamic';
import Dropzone from "react-dropzone";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { convertToRaw } from 'draft-js';

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
  )

  import "./contact.module.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { upload_image } from "../utils/requests";

const CURRENCIES = [
    {
      label: "Currencies",
      options: [
        { label: "USD", value: "USD" },
        { label: "DZD", value: "DZD" },
      ]
    },
  ];

class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: false,
            selectedFiles: []
        }
    }

    handleSumbit = async (e) => {
        const {NotificationManager} = this.props;
        e.preventDefault();
        let form = e.target.elements;

        let title = form[0].value;
        let description = form[1].value;
        let detailsDesc = this.state.editorState?JSON.stringify(convertToRaw(this.state.editorState?.getCurrentContent())):undefined;
        let recaptcha = this.state.recaptcha;
        let price = form[this.state.openedImages?3:2].value;
        let currency = this.state.currency?.label;
        let images = undefined;
        const formData = new FormData();
        if (this.state.selectedFiles.length) {
            await Array.from(this.state.selectedFiles).forEach(async (file, i) => {
                await formData.append(`files`, file);
            });

            formData.append("fileInfo", `{"alternativeText":"","caption":"","name":null}`)

            
            const config = {
                headers: { 
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
                onUploadProgress: (event) => {
                    this.setState({progress: Math.round((event.loaded * 100) / event.total)})
                console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
                },
            };
            const result = await upload_image(formData, config)
            images = result.data?.map((v) => v.id)
        }
        
        let data = {
        title,
        description,
        detailsDesc,
        recaptcha,
        images,
        price,
        currency,
        recaptcha,
        }

        console.log("data", data);
        
        const res = await this.props.add_item(data, {
                                                headers: { 
                                                    'Content-Type': 'application/json',
                                                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                                                }
                                            });
        
        this.setState({progress: false})

        if (res.error) {
            return NotificationManager.error(res.message, 'Error');
        } else {
            this.props.closeModal()
            this.props.addedItem(res.data)
            return NotificationManager.success("Item Added", 'Success');
        }

    }

    addDetail = () => {
        this.setState({detail: true})
    }

    openImages = () => {
        this.setState({openedImages: true})

    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
          error: false
        });
      };
    
    handleSelectGroup = selectedGroup => {
        this.setState({ currency: selectedGroup });
    };

    handleAcceptedFiles = async (files) => {
        files = files.filter((file) => {
            if (/\.(jpg|jpeg|png|gif)$/.test(file.name))
                return file
            
        })
        files.map(file =>
        {
            if (/\.(jpg|jpeg|png|gif)$/.test(file.name))
            return Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: this.formatBytes(file.size)
                }
            )}
        );

        this.setState({ selectedFiles: files.concat(this.state.selectedFiles) });
    };

    formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    removeFile = (index) => {
        let files = this.state.selectedFiles.filter((v, i) => { if (i != index) return v})
        this.setState({selectedFiles:files })
    }

    recaptchaChange = (recaptcha) => {
        this.setState({recaptcha})
    }

    render () {
        return (
            <form onSubmit={this.handleSumbit} className="input">
                <div>
                    <input type="text" name="title" className="input__main" placeholder="Title" />
                    <textarea type="text" name="description" className="input__main control-item__desc" placeholder="Description" />
                    <div className="transit-box-width" >
                    {
                        this.state.detail?
                            <>
                                <Editor
                                wrapperClassName="contact-wrapper"
                                editorClassName="contact-editor"
                                onEditorStateChange={this.onEditorStateChange}
                                />
                                <span style={{cursor:"pointer"}} onClick={() => {this.setState({detail:false})}} >cancel</span>
                            </>
                            :
                            <div className="control-head__button control-head--add" onClick={this.addDetail}>
                            <Add />
                            {'Add detailed description'}
                        </div>
                    }
                    </div>
                    <div className={"control-head__button control-item__btn--images "} onClick={this.openImages} >
                        {this.state.openedImages?
                        <>
                            <Dropzone
                                onDrop={acceptedFiles =>
                                this.handleAcceptedFiles(acceptedFiles)
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                <div className="control-item__button--image-open" {...getRootProps()}>
                                    <div
                                    className="dz-message needsclick"
                                    
                                    >
                                    <input {...getInputProps()} />
                                    <CloudUpload />
                                    <h3>Drop files here or click to upload.</h3>
                                    </div>
                                </div>
                                )}
                            </Dropzone>
                            
                            </>
                        :
                            <>
                                <ImageOutlined />
                                {'Add images'}
                            </>
                            }
                    </div>

                        <PerfectScrollbar className="control-item__images--preview">
                            {
                                this.state.selectedFiles?.map((f, i) => {
                                    return (
                                        <div className="control-item__image--preview" key={i}>
                                            <div className="control-item__image">
                                                <div className="control-item__image--remove" onClick={() => {this.removeFile(i)}}> <Close /> </div>
                                                <img
                                                data-dz-thumbnail=""
                                                height="80"
                                                className=""
                                                alt={f.name}
                                                src={f.preview}
                                                />
                                            </div>
                                            {/* <span>
                                                {f.name}                                                        
                                            </span> */}
                                            <p className="">
                                                <strong>{f.formattedSize}</strong>
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </PerfectScrollbar>
                    

                    <div className="control-item--row">
                            <input type="number" step={0.01} name="price" className="input__main control-item--price" placeholder="Price" />

                            <Select
                                value={this.state.currency}
                                onChange={this.handleSelectGroup}
                                options={CURRENCIES}
                                placeholder={"Currency"}
                                className="control-item--currency"
                            />

                                
                    </div>

                    <ReCAPTCHA
                        sitekey={GOOGLE_PUBLIC_SECRET}
                        onChange={this.recaptchaChange}
                    />
                    <button type="submit" className="btn__big btn_content">
                        <span className="btn__big--front">
                            {'Add'}
                        </span>
                    </button>
                    <br/>
                    {this.state.Err?<><span className="span-error">{this.state.Err}</span><br/></>:""}

                </div>
            </form>
        )
    }
}

export default AddItem;