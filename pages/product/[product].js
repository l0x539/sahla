import Head from 'next/head'
import Layout from '../../components/Layout'
import Message from '../../components/Message'
import Loader from 'react-loader-spinner';

import { useRouter } from 'next/router'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Avatar from 'react-avatar'
import { getProduct } from '../../utils/queries'

import Rating from '@material-ui/lab/Rating';
import { Typography } from '@material-ui/core';


const API_HOST = "http://localhost:1337"

const Product = () => {
    console.log("product");

    const router = useRouter()
    const { product } = router.query
    console.log(product);
    const p = getProduct(product)

    console.log(p);

    let prod = {}
    if (p.isLoading) {
        <Message title={<Loader type="Rings" />} />
    }
    if (p.error || !p.data || p.data?.error) {
        console.log("prod",p);
        return (
            <Layout>
            <Head>
                <title>Error | Sahla Business</title>
                <meta name="description" content={"Somehing Went wrong, " + p.data?.message} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Message title={"Something Went wrong"} desc={p.data?.message} />
            </Layout>
        )
    } else {
        if (p.data?.data) {
            prod = p.data?.data
            console.log("prod",p);
        } else {
            prod = p.data
        }
    }

    return (
        <Layout>
        <Head>
            <title>Product | Sahla Business</title>
            <meta name="description" content="Sahla business Products, search through Sahla available services nearby you." />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="show">
            <div className="show-header">
                <h1 className="show-title">{prod.title}</h1>
                <div className="show-header--right">
                    <span className="show-user">{prod.user.username}</span>
                    <Avatar round={true} size="50" src={ prod.user.avatar&&prod.user.avatar.length>0?prod.user.avatar: `https://avatars.dicebear.com/api/avataaars/${prod.user?.id}.svg`} />
                </div>
            </div>
            <Carousel swiping  swipeable height={"20rem"}>
                {prod.images?.map((v, i)=> {
                    return (
                        // <img src={API_HOST+(v.formats.medium?v.formats.medium.url:v.formats.small.url)} />
                        <div key={i} className="carousel__img" style={{backgroundImage: `url(${API_HOST+(v.formats.medium?v.formats.medium.url:v.formats.small.url)})`, height: 500, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundColor: "rgb(51, 55, 64)"}}>
                            
                        </div>
                    )
                })}
            </Carousel>
            <div className="show-desc">
                <div className="show-rating" >
                    <Rating className={"show-rating--font"} name="read-only" value={prod?.rating} readOnly precision={0.1} />
                    <Typography variant="body2" component="p">
                        {prod.orders} orders
                    </Typography>
                </div>
                <p className="show-paragraph">
                    {prod.description}
                </p>
                <p className="show-paragraph--detail">
                    {prod.detailsDesc}
                </p>
            </div>
        </div>
        </Layout>
    )
}

export default Product;