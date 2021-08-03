import Head from 'next/head'
import Layout from '../components/Layout'
import "react-responsive-carousel/lib/styles/carousel.min.css";

import 'pure-react-carousel/dist/react-carousel.es.css';


import Web from '../assets/web.svg'
import Accessoies from '../assets/accessories.svg'
import Architect from '../assets/architect.svg'
import Bullhorn from '../assets/bullhorn.svg'
import DesignThinking from '../assets/design-thinking.svg'
import Mechanic from '../assets/mechanic.svg'
import Trade from '../assets/trade.svg'
import Site from '../assets/web-site.svg'
import { useRouter, withRouter } from 'next/router';
import { get_best_products, get_best_services, get_language } from '../utils/requests';
import { API_HOST } from '../utils/constants';

import Home from '../components/Home'

const SVGS = [
                <Web />,
                <Site />,
                <Trade />,
                <Bullhorn />,
                <Mechanic />,
                <Architect />,
                <Accessoies />,
                <DesignThinking />,
              ]

function HomePage({
    english,
    english_navbar,
    english_footer,
    arabic,
    arabic_navbar,
    arabic_footer,
    best_products,
    best_services
  }) {
  const router = useRouter();

  let language = english;
  let navbarLang = english_navbar;
  let footerLang = english_footer;
  let isArabic = false
  if (typeof window !== 'undefined') {
    if (localStorage.getItem("lang")==="ar-DZ") isArabic = true

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

  const goProduct = (id) => {
    router.push(`/product/${id}`)
  }
  const goService = (id) => {
    router.push(`/service/${id}`)
  }
  return (
    <Layout navbarLang={navbarLang} footerLang={footerLang} >
      <Head>
        <title>{language?language?.Title:'Sahla Business'}</title>
        <meta name="description" content={language?language?.description:"Sahla is an online based business company and commercial trade center that provides services for its customers and help advertise, spread and attract customers to businesses."} />
        <link rel="icon" href={language?(API_HOST + language?.favicon?.url):"/favicon.ico"} />        
      </Head>
      <Home services={best_services} products={best_products} language={language} SVGS={SVGS} goProduct={goProduct} goService={goService} />

    </Layout>
  )
}

export default withRouter(HomePage);

export async function getStaticProps(context) {

	let english = (await get_language("home"))?.data;
	let english_navbar = (await get_language("navbar"))?.data;
	let english_footer = (await get_language("footer"))?.data;
	let arabic = (await get_language("home", "ar-DZ"))?.data;
	let arabic_navbar = (await get_language("navbar", "ar-DZ"))?.data;
	let arabic_footer = (await get_language("footer", "ar-DZ"))?.data;

  let best_products = (await get_best_products())?.data;
  let best_services = (await get_best_services())?.data;

	return {
		props: {
			english:english??null,
      english_navbar:english_navbar??null,
      english_footer:english_footer??null,
      arabic:arabic??null,
      arabic_navbar:arabic_navbar??null,
      arabic_footer:arabic_footer??null,
      best_products:best_products??null,
      best_services:best_services??null,
		},
		revalidate: 5
	}
}