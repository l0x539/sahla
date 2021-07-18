import Link from 'next/link';


import Facebook from "../assets/facebook.svg";
import Twitter from "../assets/twitter.svg";
import Instagram from "../assets/instagram.svg";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__list left">
                <h2 className="footer__title">
                    Sahla Buseniss
                </h2>
                <div className="footer__text--content">
                Sahla is an online based business company and commercial trade center that provides services for its customers  and help advertise, spread and attract  customers to businesses.	
                </div>
            </div>
            <div className="footer__list mid">
                <h2 className="footer__title">
                    Useful Links
                </h2>
                <div className="footer__list--container">
                    <div className="footer__list--links">
                        <div className="footer__link">
                            <Link href="/">
                                Home
                            </Link>
                        </div>
                        <div className="footer__link">
                            <Link href="/">
                                Services
                            </Link>
                        </div>
                        <div className="footer__link">
                            <Link href="/">
                                Products
                            </Link>
                        </div>
                        <div className="footer__link">
                            <Link href="/">
                                About US
                            </Link>
                        </div>
                        <div className="footer__link">
                            <Link href="/">
                                Support
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <div className="footer__link">
                            <Link href="/">
                                Privacy Policy
                            </Link>
                        </div>
                        <div className="footer__link">
                            <Link href="/">
                                {'Terms & Services'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__right">
                <div className="footer__logo">
                    <img src="/assets/logoFooter.png"  />
                </div>
                <h3 className="footer__title2" >Connect with us</h3>
                <div className="footer__socials">
                    <a target="_blank" href="https://fb.me/Sahlabusiness">
                        <Facebook />
                    </a>
                    <a target="_blank" href="https://twitter.com/Sahlabusiness">
                        <Twitter />
                    </a>
                    <a target="_blank" href="https://instagram.com/Sahlabusiness">
                        <Instagram />
                    </a>
                </div>
            </div>
            
        </div>
    )
}

export default Footer;