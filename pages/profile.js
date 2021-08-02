import Head from 'next/head'
import Layout from '../components/Layout'
import { useRouter, withRouter } from 'next/router'
import { getUser } from '../utils/queries';

import Loader from 'react-loader-spinner';
import { update_profile, upload_avatar, upload_image } from '../utils/requests';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ProgressBar from "@ramonak/react-progress-bar";
import UserProfile from "../components/Profile";
import { useState } from 'react';
import { get_language } from '../utils/requests'

import Message from '../components/Message'

function Profile({
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

  const router = useRouter()
  const [progress, setProgress] = useState(false)

  let queryUser = {}

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push(`/`)
      return ""
    }
    queryUser = getUser(token)
  } else {
    return <Message desc={<Loader type="TailSpin" />} />
  }

  const updateImage = async (formData) => {
    const config = {
      headers: { 
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
     },
      onUploadProgress: (event) => {
        setProgress(Math.round((event.loaded * 100) / event.total))
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    const result = await upload_image(formData, config)
    await upload_avatar({avatar: result.data[0].id}, {headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
   },}, queryUser.data.data.id)

    setProgress(false)
    if (result.error) {
        return NotificationManager.error(result.message, 'Error');
    } else {
        return NotificationManager.success("Image uploaded", 'Success');
    }
  };


  const handleSubmit = async (e) => {
      e.preventDefault();
      let form = e.target.elements;

      const username = form[0].value;
      const cpass_username = form[1].value;
      const new_pass = form[3].value;
      const cnew_pass = form[4].value;
      const cpass_new = form[5].value;

      if (username?.length) {
          if (cpass_username?.length) {
              const test = await update_profile({username, cpassword:cpass_username}, localStorage.getItem('jwt'), queryUser.data.data.id)
              if (test.error) {
                  return NotificationManager.error(test.message, 'Error');
              } else {
                  form[1].value = ""
                  return NotificationManager.success("Username updated", 'Success');

              }
          }
      }
      if (new_pass?.length) {
          if (new_pass === cnew_pass) {

              if (cpass_new?.length) {

                  const test = await update_profile({newpass:new_pass, cpassword:cpass_new}, localStorage.getItem('jwt'), queryUser.data.data.id)
                  if (test.error) {
                      return NotificationManager.error(test.message, 'Error');
                  } else {
                      form[5].value = ""
                      return NotificationManager.success("Password updated", 'Success');
  
                  }
              }
          }
      }

  }

  return (
    <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
      <Head>
        <title>Profile | Sahla Business</title>
        <meta name="description" content="Sahla business description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Message title={'Sahla Business'} desc={'Comming Soon!'} /> */}

      <NotificationContainer/>
      <div className="margin">
          <div className="home info-card__grid message-box">
              <div className="home__card info-card info-card--100">
                  <h3 className="info-card__header">
                      Profile
                  </h3>
                      {queryUser.isLoading?
                  <div className="info-card__content">
                      <Loader type="TailSpin" />
                      </div>
                      :
                      (!queryUser.data || !queryUser.data.data)?
                      <div className="info-card__content">
                          Not Logged in
                      </div>
                      :
                      <div className="info-card__content">
                          <form onSubmit={handleSubmit}>
                              <UserProfile updateImage={updateImage} data={queryUser.data} />
                          </form>
                      </div>
                      }
              </div>
          </div>
          {
              progress?
              <div className="sticky">
                  <div className="stats__info"><ProgressBar completed={progress}	bgColor="#42ba96" /></div>
              </div>
              :
              ""
          }
      </div> 
      
    </Layout>
  )
}

export default withRouter(Profile);

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