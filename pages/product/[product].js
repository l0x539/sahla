import Head from 'next/head'
import Layout from '../../components/Layout'
import Message from '../../components/Message'
import Loader from 'react-loader-spinner';

import { useRouter, withRouter } from 'next/router'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Avatar from 'react-avatar'
import { getProduct } from '../../utils/queries'

import Rating from '@material-ui/lab/Rating';
import { Typography } from '@material-ui/core';
import { API_HOST } from '../../utils/constants';
import { get_language } from '../../utils/requests'
import draftToHtml from 'draftjs-to-html';


const Product = ({
        english,
        english_navbar,
        english_footer,
        arabic,
        arabic_navbar,
        arabic_footer
    }) => {

    const router = useRouter()
    const { product } = router.query

    let language = english;
    let navbarLang = english_navbar;
    let footerLang = english_footer;
    let isArabic = false
    if (typeof window !== 'undefined') {
        localStorage.getItem("lang")
        isArabic = true
        switch (localStorage.getItem("lang")) {
        case "ar-DZ":
            language = arabic;
            navbarLang = arabic_navbar;
            footerLang = arabic_footer;
            break;
        default:
            break;
        }
    }


    const p = getProduct(product)


    let prod = {}
    if (p.isLoading) {
        return (
            <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
            <Head>
                <title>Loading.. | Sahla Business</title>
                <meta name="description" content={"Somehing Went wrong, " + p.data?.message} />
                
            </Head>
            <Message desc={<Message title={<Loader type="Rings" />} />} />
            </Layout>
            )
    }
    if (p.error || !p.data || p.data?.error) {
        return (
            <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
            <Head>
                <title>Error | Sahla Business</title>
                <meta name="description" content={"Somehing Went wrong, " + p.data?.message} />
                <link rel="icon" href={language?(API_HOST + language?.favicon?.url):"/favicon.ico"} />
                
            </Head>
            <Message title={"Something Went wrong"} desc={p.data?.message} />
            </Layout>
        )
    } else {
        if (p.data?.data) {
            prod = p.data?.data
        } else {
            prod = p.data
        }
    }
    var isArabicContent = /[\u0600-\u06FF]/.test(prod.title);
    return (
        <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
        <Head>
            <title>{prod.title} | Sahla Business</title>
            <meta name="description" content="Sahla business Products, search through Sahla available services nearby you." />
            
        </Head>
        <div className="show" >
            <div className="show-header" dir={isArabicContent?"rtl":"ltr"}>
                <h1 className={"show-title " + (isArabicContent?"arabic":"")}>{prod.title}</h1>
                <div className="show-header--right">
                    <span className="show-user">{prod.user.username}</span>
                    <Avatar name={prod.user.username} round={true} size="50" src={ (prod.user.avatar&&prod.user.avatar?.url)?API_HOST + prod.user.avatar?.url: `https://avatars.dicebear.com/api/avataaars/${prod.user.id}.svg`} />

                </div>
            </div>
            <Carousel swiping  swipeable height={"20rem"}>
                {prod.images?.map((v, i)=> {
                    return (
                        // <img src={API_HOST+(v.formats.medium?v.formats.medium?.url:v.formats.small?.url)} />
                        <div key={i} className="carousel__img" style={{ backgroundImage: `url(${API_HOST+(v.formats?(v.formats.medium?v.formats.medium?.url:(v.formats.small?v.formats.small?.url:v?.url)):v?.url)})`, height: 500, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundColor: "rgb(51, 55, 64)"}}>
                            <img style={{zIndex: -5, position: "relative"}} src={API_HOST+(v.formats?(v.formats.medium?v.formats.medium?.url:(v.formats.small?v.formats.small?.url:v?.url)):v?.url)}  />
                        </div>
                    )
                })}
            </Carousel>
            <div className="show-desc">
                <div className="show-rating" >
                    <Rating className={"show-rating--font"} name="read-only" value={prod?.rating} readOnly precision={0.1} />
                    <Typography variant="body2" component="p">
                        {prod.orders} orders
                    </Typography>
                </div>
                <p className={"show-paragraph " + (isArabicContent?"arabic":"")} dir={isArabicContent?"rtl":"ltr"}>
                    {prod.description}
                </p>
                <p className={"show-paragraph--detail " + (isArabicContent?"arabic":"")} dir={isArabicContent?"rtl":"ltr"}>
                    <div dangerouslySetInnerHTML={{__html: prod?.detailsDesc?draftToHtml(JSON.parse(prod.detailsDesc)):null}}></div>

                </p>
            </div>
        </div>
        </Layout>
    )
}

export default withRouter(Product);

export const getStaticPaths = async () => {

    return {
        paths: [],
        fallback: 'blocking'
    }
  }

export async function getStaticProps(context) {

	let english = (await get_language("home"))?.data;
	let english_navbar = (await get_language("navbar"))?.data;
	let english_footer = (await get_language("footer"))?.data;
	let arabic = (await get_language("home", "ar-DZ"))?.data;
	let arabic_navbar = (await get_language("navbar", "ar-DZ"))?.data;
	let arabic_footer = (await get_language("footer", "ar-DZ"))?.data;

	return {
		props: {
			english:english??null,
      english_navbar:english_navbar??null,
      english_footer:english_footer??null,
      arabic:arabic??null,
      arabic_navbar:arabic_navbar??null,
      arabic_footer:arabic_footer??null
		},
		revalidate: 5
	}
}