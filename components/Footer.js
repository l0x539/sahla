import Link from 'next/link';


import Facebook from "../assets/facebook.svg";
import Twitter from "../assets/twitter.svg";
import Instagram from "../assets/instagram.svg";
import { API_HOST } from '../utils/constants';

const Footer = ({language, isArabic}) => {
    return (
        <div className={`footer ${isArabic?"arabic":""}`}>
            <div className="footer__list left"  dir={isArabic?"rtl":"ltr"}>
                <h2 className="footer__title">
                    {language?language?.left_title:'Sahla Buseniss'}
                </h2>
                <div className="footer__text--content">
                {language?language?.description:'Sahla is an online based business company and commercial trade center that provides services for its customers  and help advertise, spread and attract  customers to businesses.'}	
                </div>
            </div>
            <div className="footer__list mid" dir={isArabic?"rtl":"ltr"}>
                <h2 className="footer__title">
                    {language?language?.mid_title:'Useful Links'}
                </h2>
                <div className="footer__list--container">
                    <div className="footer__list--links">
                        <div className="footer__link">
                            <Link href="/">
                                {language?language?.home:'Home'}
                            </Link>
                        </div>
                        <div className="footer__link">
                            <Link href="/">
                                {language?language?.services:'Services'}
                            </Link>
                        </div>
                        <div className="footer__link">
                            <Link href="/">
                                {language?language?.products:'Products'}
                            </Link>
                        </div>
                        <div className="footer__link">
                            <Link href="/">
                                {language?language?.aboutus:'About US'}
                            </Link>
                        </div>
                        <div className="footer__link">
                            <Link href="/">
                                {language?language?.support:'Support'}
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <div className="footer__link">
                            <Link href="/">
                                {language?language?.privacy_policy:'Privacy Policy'}
                            </Link>
                        </div>
                        <div className="footer__link">
                            <Link href="/">
                                {language?language?.terms_and_services:'Terms & Services'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__right">
                <div className="footer__logo">
                    <img src={language?(API_HOST + language?.logo_footer.url):"/assets/logoFooter.png"}  />
                </div>
                <h3 className="footer__title2" >Connect with us</h3>
                <div className="footer__socials">
                    <a target="_blank" href={language?.facebook}>
                        <Facebook />
                    </a>
                    <a target="_blank" href={language?.twitter}>
                        <Twitter />
                    </a>
                    <a target="_blank" href={language?.instagram}>
                        <Instagram />
                    </a>
                </div>
            </div>
            
        </div>
    )
}

export default Footer;