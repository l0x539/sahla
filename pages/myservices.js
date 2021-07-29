import Head from 'next/head'
import Layout from '../components/Layout'
import Message from '../components/Message'

export default function MyServices() {
  return (
    <Layout>
      <Head>
        <title>My Services | Sahla Business</title>
        <meta name="description" content="Sahla business description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Message title={'Sahla Business'} desc={'Comming Soon!'} />
      
    </Layout>
  )
}
