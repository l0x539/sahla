import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Message from '../components/Message'
import { getUser, getUserProduct } from '../utils/queries'
import Loader from 'react-loader-spinner';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Modal, Fade } from "@material-ui/core";
import ProductsList from '../components/ProductsList'
import { Preview } from '../components/Preview'
import "react-responsive-carousel/lib/styles/carousel.min.css";


const useStyles = makeStyles((theme) => ({
  modal: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflowY:'scroll'       

  }
})
);

export default function MyProducts() {
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
    console.log(token);
    if (!token) {
      router.push(`/`)
      return ""
    }

    console.log("hi");
    const queryProducts = getUserProduct(false, token)
    console.log("ho");
    if (queryProducts.isLoading) {
      return <Message desc={<Loader type="TailSpin" />} />
    }
    if (!queryProducts.data?.data) {
      router.push(`/`)
      return <Message desc={<Loader type="TailSpin" />} />
    }
    else {
      
      const products = queryProducts.data?.data
      return (
        <Layout>
          <Head>
            <title>My Products | Sahla Business</title>
            <meta name="description" content="Sahla business description" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ProductsList products={products} preview={openModal} />
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
                <Preview order={preview} service={'product'} />
              </Fade>
          </Modal>
        </Layout>
      )
    }


  } else {
    return <Message desc={<Loader type="TailSpin" />} />
  }

  console.log("queryProducts", products);
  
  return (
    <Layout>
      <Head>
        <title>My Products | Sahla Business</title>
        <meta name="description" content="Sahla business description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Message title={'Sahla Business'} desc={'Comming Soon!'} />
      
    </Layout>
  )
}
