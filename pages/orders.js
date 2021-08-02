import Head from 'next/head'
import { useRouter, withRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import { CustomerOrders } from '../components/CustomerOrders';
import Layout from '../components/Layout'
import Message from '../components/Message'
import { MyOrders } from '../components/MyOrders';
import { getOrders } from '../utils/queries';
import { get_language } from '../utils/requests'

function Orders({
    english,
    english_navbar,
    english_footer,
    arabic,
    arabic_navbar,
    arabic_footer
  }) {
  const router = useRouter();

  let language = english;
  let navbarLang = english_navbar;
  let footerLang = english_footer;
  let isArabic = false

  let queryOrders = false
  let queryOrdersCustomer;

  if (typeof window !== 'undefined') {
    if (localStorage.getItem("lang"))
    if (localStorage.getItem("lang")==="ar-DZ") isArabic = true

    if (!localStorage.getItem("jwt")) router.push(`/`);
    
    
    switch (localStorage.getItem("lang")) {
        case "ar-DZ":
        language = arabic;
        navbarLang = arabic_navbar;
        footerLang = arabic_footer;
        break;
        default:
            break;
    }
    queryOrders = getOrders(localStorage.getItem("jwt"))
    queryOrdersCustomer = getOrders(localStorage.getItem("jwt"), "customer")
    const o = []

    if (queryOrders?.isLoading || queryOrdersCustomer?.isLoading) {
        return (
            <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
            <Head>
                <title>My Orders | Sahla Business</title>
                <meta name="description" content="Sahla business description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="orders">
                <div className="orders__loading">
                    <Loader type="TailSpin" />
                </div>
            </div>
            </Layout>

        )
    } else if (queryOrders.data?.error || queryOrdersCustomer.data?.error) {
        return (
            <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
            <Head>
                <title>My Orders | Sahla Business</title>
                <meta name="description" content="Sahla business description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Message title={'Error'} desc={queryOrders.data.message} />
            </Layout>
        )
    } else if (queryOrders.data?.data?.length || queryOrdersCustomer.data.data?.length) {
        const products = queryOrders.data.data.filter((v, i) => {
            return v.product
        })

        const customer_products = queryOrdersCustomer.data.data.filter((v, i) => {
            return v.product
        })

        const services = queryOrders.data.data.filter((v, i) => {
            return v.service
        })

        const customer_services = queryOrdersCustomer.data.data.filter((v, i) => {
            return v.service
        })


        return (
            <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
            <Head>
                <title>My Orders | Sahla Business</title>
                <meta name="description" content="Sahla business description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="orders">
                <MyOrders products={products} services={services} />
                <CustomerOrders products={customer_products} services={customer_services} />
            </div>
            </Layout>
        )
    } else {
        return (
            <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
            <Head>
                <title>My Orders | Sahla Business</title>
                <meta name="description" content="Sahla business description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="orders">
                {/* <MyOrders products={o} services={o} />
                <CustomerOrders products={o} services={o} /> */}
            </div>
            </Layout>
        )

    }
        
  } else {
      return (
        <Layout navbarLang={navbarLang} footerLang={footerLang} isArabic={isArabic} >
        <Head>
          <title>Sahla Business</title>
          <meta name="description" content="Sahla business description" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="orders">
            <div className="orders__loading">
                <Loader type="TailSpin" />
            </div>
        </div>
        
      </Layout>
      )
  }
  
}

export default withRouter(Orders);

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