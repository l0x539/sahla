import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/Layout'
import { Preview } from '../components/Preview'
import ServicesList from '../components/ServicesList'
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Backdrop, Modal, Fade, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { getServices, searchQuery } from '../utils/queries'
import Message from '../components/Message'
import Loader from 'react-loader-spinner'
import { get_language } from '../utils/requests'
import { withRouter } from 'next/router'
import { API_HOST } from '../utils/constants';


const useStyles = makeStyles((theme) => ({
  modal: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflowY:'scroll'       

  }
})
);

function Services({
    english,
    english_navbar,
    english_footer,
    arabic,
    arabic_navbar,
    arabic_footer
  }) {
  const classes = useStyles();
  const [preview, setPreview] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [categories, setCategoriesItems] = useState([])

  const setCategories = async (category ) => {

    if (categories.indexOf(category.sort)!==-1) {
      const new_categories = await categories.filter((v, i) => v!==category.sort)

      setCategoriesItems(new_categories)
      
    } else {
      setCategoriesItems([...categories, category.sort])
    }
  }

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

  let queryServices;

  if (search.length) {
    queryServices = searchQuery("services", search, false, false, categories)
  } else {
    queryServices = getServices(categories)
  }

  if (!queryServices) {
    return (<Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
              <Head>
                <title>My Services | Sahla Business</title>
                <meta name="description" content="Sahla business description" />
        <link rel="icon" href={language?(API_HOST + language?.favicon?.url):"/favicon.ico"} />
                
              </Head><Message title={<span style={{color: "red"}}>Something went wrong!</span>} desc={<Loader type="TailSpin" />} />
            </Layout>
            )
  }

  const services = queryServices.data?.data

  const openModal = (preview) => {
    setPreview(preview)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
      <Head>
        <title>Services | Sahla Business</title>
        <meta name="description" content="Sahla business Services, search through Sahla available services nearby you." />
        
      </Head>

      <ServicesList isLoading={queryServices.isLoading} setCategories={setCategories} categories={categories} setSearch={setSearch} services={services} preview={openModal} />
    
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
}

export default withRouter(Services);


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