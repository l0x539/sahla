import Head from 'next/head'
import Layout from '../components/Layout'
import Message from '../components/Message'
import ServicesList from '../components/ServicesList'
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Services() {
  return (
    <Layout>
      <Head>
        <title>Services | Sahla Business</title>
        <meta name="description" content="Sahla business Services, search through Sahla available services nearby you." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Message title={'Sahla Business'} desc={'Comming Soon!'} /> */}
      <ServicesList />
      
    </Layout>
  )
}
