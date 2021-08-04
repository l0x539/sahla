import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react';


const AboutUs = ({language}) => {
    const [isArabic, setIsArabic] = useState(false)
    useEffect(() => {
      if (localStorage.getItem("lang")==="ar-DZ") setIsArabic(true)
      // code to run on component mount
    }, [])
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