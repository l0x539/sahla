import Head from 'next/head'
import { withRouter } from 'next/router';
import Layout from '../components/Layout'
import Message from '../components/Message'
import { get_language } from '../utils/requests'
import ReactMarkdown from 'react-markdown'
import Loader from 'react-loader-spinner'
import AboutUs from '../components/AboutUs';
import { API_HOST } from '../utils/constants';


function AboutUS({
    english,
    english_navbar,
    english_footer,
    arabic,
    arabic_navbar,
    arabic_footer
  }) {

  let language = english;
  let navbarLang = english_navbar;
  let footerLang = english_footer;
  let isArabic = false
  if (typeof window !== 'undefined') {
    if (localStorage.getItem("lang")==="ar-DZ") {
      isArabic = true
    }

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
  return (
    <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
      <Head>
        <title>Sahla Business</title>
        <meta name="description" content="Sahla business description" />
        <link rel="icon" href={language?(API_HOST + language?.favicon?.url):"/favicon.ico"} />
        
      </Head>
      <AboutUs language={language} />
      
    </Layout>
  )
}

export default withRouter(AboutUS);


export async function getStaticProps(context) {

	let english = (await get_language("aboutus"))?.data;
	let english_navbar = (await get_language("navbar"))?.data;
	let english_footer = (await get_language("footer"))?.data;
	let arabic = (await get_language("aboutus", "ar-DZ"))?.data;
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