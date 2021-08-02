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
import { get_language } from '../utils/requests';
import { API_HOST } from '../utils/constants';

import Home from '../components/Home'



const BEST_SERVICES = [
  { id: 1, title: 'التعليق الصوتي', desc: 'التعليق الصوتي التعليق الصوتي', image: '/assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg' },
  { id: 1, title: 'الجواد للمنتاج', desc: 'الجواد للمنتاج الجواد للمنتاج', image: '/assets/back-view-video-editor-using-computer.jpg' },
  { id: 1, title: 'الهندسة الصوتية', desc: 'الهندسة الصوتية الهندسة الصوتية', image: '/assets/website-builder-workplace-interior-3d-rendering.jpg' },
]

const BEST_PRODUCTS = [
  { id: 1, title: 'حواسيب غايمنغ', desc: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
  { id: 1, title: 'منتجات شاور', desc: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
  { id: 1, title: 'ساعات يد لوكسور', desc: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
]

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
    arabic_footer
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
        <link rel="icon" href={language?(API_HOST + language?.favicon.url):"/favicon.ico"} />
      </Head>
      <Home services={BEST_SERVICES} products={BEST_PRODUCTS} language={language} SVGS={SVGS} goProduct={goProduct} goService={goService} />

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