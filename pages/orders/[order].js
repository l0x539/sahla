import Head from 'next/head'
import Layout from '../../components/Layout'
import Message from '../../components/Message'

import { useRouter } from 'next/router'

const Order = () => {
  const router = useRouter()
  const { order } = router.query
  return (
    <Layout>
      <Head>
        <title>Order {order} | Sahla Business</title>
        <meta name="description" content="Sahla business Products, search through Sahla available services nearby you." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Message title={<p>Order: {order}</p>} />
    </Layout>
  )
  return 
}

export default Order;