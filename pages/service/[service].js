import Head from 'next/head'
import Layout from '../../components/Layout'
import Message from '../../components/Message'

import { useRouter } from 'next/router'

const Service = () => {
  const router = useRouter()
  const { service } = router.query
  return (
    <Layout>
      <Head>
        <title>Service | Sahla Business</title>
        <meta name="description" content="Sahla business Products, search through Sahla available services nearby you." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Message title={<p>Service: {service}</p>} />
    </Layout>
  )
  return 
}

export default Service;