import Head from 'next/head'
import { useRouter, withRouter } from 'next/router'
import Layout from '../components/Layout'
import Message from '../components/Message'
import { getUserService, searchQuery } from '../utils/queries'
import Loader from 'react-loader-spinner';
import { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Modal, Fade } from "@material-ui/core";
import ServicesList from '../components/ServicesList'
import { Preview } from '../components/Preview'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { get_language } from '../utils/requests'


const useStyles = makeStyles((theme) => ({
  modal: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflowY:'scroll'       

  }
})
);

function MyServices({
    english,
    english_navbar,
    english_footer,
    arabic,
    arabic_navbar,
    arabic_footer
  }) {

  const [search, setSearch] = useState('')

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
  const classes = useStyles();
  const [preview, setPreview] = useState({})
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (preview) => {
    setPreview(preview)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }
  const router = useRouter()

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push(`/`)
      return ""
    }

    let queryServices;

    if (search.length) {
      queryServices = searchQuery("services", search, true, token)
    } else {
      queryServices = getUserService(false, token)
    }
  
    
  
    if (!queryServices) {
      return (<Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
                <Head>
                  <title>My Services | Sahla Business</title>
                  <meta name="description" content="Sahla business description" />
                  <link rel="icon" href="/favicon.ico" />
                </Head><Message title={<span style={{color: "red"}}>Something went wrong!</span>} desc={<Loader type="TailSpin" />} />
              </Layout>
              )
    }
      
      const services = queryServices.data?.data
      return (
        <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
          <Head>
            <title>My Services | Sahla Business</title>
            <meta name="description" content="Sahla business description" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ServicesList isLoading={queryServices.isLoading} setSearch={setSearch} isLoggedIn services={services} preview={openModal} />
          <Modal
              className={classes.modal}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              disableAutoFocus
              disableEnforceFocus
              open={modalOpen}
              onClose={closeModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
              timeout: 500,
              }}
              container={() => document.getElementsByClassName('root')[0]}
          >
              <Fade in={modalOpen}>
                <Preview order={preview} service={'service'} />
              </Fade>
          </Modal>
        </Layout>
      )


  } else {
    return (<Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
      <Head>
        <title>My Services | Sahla Business</title>
        <meta name="description" content="Sahla business description" />
        <link rel="icon" href="/favicon.ico" />
      </Head><Message desc={<Loader type="TailSpin" />} />
    </Layout>
    )
  }
}

export default withRouter(MyServices);


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