import Head from 'next/head'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { getUser } from '../utils/queries';

import Loader from 'react-loader-spinner';
import { update_profile, upload_avatar, upload_image } from '../utils/requests';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ProgressBar from "@ramonak/react-progress-bar";
import UserProfile from "../components/Profile";
import { useState } from 'react';

import Message from '../components/Message'

export default function Profile() {
  const router = useRouter()
  const [progress, setProgress] = useState(false)

  let queryUser = {}

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("jwt");
    console.log(token);
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
    console.log("result", result);
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
    <Layout>
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
