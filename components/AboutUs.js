import ReactMarkdown from 'react-markdown'


const AboutUs = ({language, isArabic}) => {

    return (
        <div className={`aboutus ${isArabic?"arabic":""}`}>
            <div className="aboutus__title">
            <h1>
                {language?.title}
            </h1>
            </div>
            <div className="aboutus__content">
            <ReactMarkdown>{language?.content}</ReactMarkdown>
            </div>
        </div>
    )
    
}

export default AboutUs;