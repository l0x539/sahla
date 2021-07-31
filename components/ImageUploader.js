import { useRef } from "react";
import { API_HOST } from "../utils/constants";


export const ImageUploader = (props) => {
    const {user} = props;
    const fileInputRef = useRef(null);
    const formRef = useRef(null);

    const onClickHandler = () => {
        fileInputRef.current?.click();
    };

    const onChangeHandler = (event) => {
        if (!event.target.files?.length) {
        return;
        }

        const formData = new FormData();

        Array.from(event.target.files).forEach((file) => {
            console.log(file);
            formData.append(event.target.name, file);
        });

        formData.append("fileInfo", `{"alternativeText":"","caption":"","name":null}`)

        props.onChange(formData);

        formRef.current?.reset();
    };

    return (
        <form ref={formRef} onClick={onClickHandler} className="article__image-container">
            <input
                accept={props.acceptedFileTypes}
                multiple={props.allowMultipleFiles}
                name={props.uploadFileName}
                onChange={onChangeHandler}
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
            />

                <img className="article__image clickable-image .clickable-image" src={user.avatar?.url?(API_HOST + user.avatar?.url):`https://avatars.dicebear.com/api/avataaars/${user.id}.svg`} />
                <div className="text-hide">+</div>
        </form>
    );
};

ImageUploader.defaultProps = {
    acceptedFileTypes: '',
    allowMultipleFiles: false,
};