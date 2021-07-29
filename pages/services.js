import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/Layout'
import { Preview } from '../components/Preview'
import ServicesList from '../components/ServicesList'
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Backdrop, Modal, Fade, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  modal: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflowY:'scroll'       

  }
})
);

export default function Services() {

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

  return (
    <Layout>
      <Head>
        <title>Services | Sahla Business</title>
        <meta name="description" content="Sahla business Services, search through Sahla available services nearby you." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Message title={'Sahla Business'} desc={'Comming Soon!'} /> */}
      <ServicesList preview={openModal} />
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
