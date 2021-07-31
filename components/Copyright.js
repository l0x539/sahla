const Copyright = ({copyright, isArabic}) => {
    return <div className={`copyright ${isArabic?"arabic":""}`}>
                <div className="copyright__banner" >
                <span>{copyright}</span>
            </div>
        </div>
}

export default Copyright;