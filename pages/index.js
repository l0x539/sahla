import Head from 'next/head'
import Layout from '../components/Layout'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; // https://www.npmjs.com/package/react-responsive-carousel
import 'pure-react-carousel/dist/react-carousel.es.css';
import SearchBar from '../components/SearchBar';
import CardCarousel from '../components/CardCarousel';
import Paper from '../components/Paper';
import Category from '../components/Category';

import Web from '../assets/web.svg'
import Accessoies from '../assets/accessories.svg'
import Architect from '../assets/architect.svg'
import Bullhorn from '../assets/bullhorn.svg'
import DesignThinking from '../assets/design-thinking.svg'
import Mechanic from '../assets/mechanic.svg'
import Trade from '../assets/trade.svg'
import Site from '../assets/web-site.svg'


const BEST_SERVICES = [
  { title: 'التعليق الصوتي', desc: 'التعليق الصوتي التعليق الصوتي', image: '/assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg' },
  { title: 'الجواد للمنتاج', desc: 'الجواد للمنتاج الجواد للمنتاج', image: '/assets/back-view-video-editor-using-computer.jpg' },
  { title: 'الهندسة الصوتية', desc: 'الهندسة الصوتية الهندسة الصوتية', image: '/assets/website-builder-workplace-interior-3d-rendering.jpg' },
]

const BEST_PRODUCTS = [
  { title: 'حواسيب غايمنغ', desc: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
  { title: 'منتجات شاور', desc: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
  { title: 'ساعات يد لوكسور', desc: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
]

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Sahla Business</title>
        <meta name="description" content="Sahla business description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel swiping autoPlay swipeable showThumbs={false}>
          <div className="carousel__img" style={{backgroundImage: "url(/assets/website-builder-workplace-interior-3d-rendering.jpg)"}}>
              
          </div>
          <div className="carousel__img" style={{backgroundImage: "url(/assets/website-builder-workplace-interior-3d-rendering.jpg)"}}>
              
          </div>
      </Carousel>
      <SearchBar />
      <div className="main-divider"></div>
      <div className="content__holder">
        <h2 className="content__title arabic">
          {"أفضل الخدمات"}
        </h2>
        <CardCarousel items={BEST_SERVICES} />
      </div>
      <div className="main-divider"></div>
      <div className="content__holder">
        <h2 className="content__title arabic">
          {"أفضل المنتجات"}
        </h2>
        <CardCarousel items={BEST_PRODUCTS} />
      </div>
      <div className="main-divider"></div>

      <div className="content__darker-holder">
        <div className="content">
          <h2 className="content__darker-holder-title arabic">
            {"كيف تنظم للعمل مع سهلة"}
          </h2>
          <div className="content__fr">
            <Paper >
              <div className="paper__circle">
                <p>1</p>
              </div>
            </Paper>
            <Paper >
              <div className="paper__circle">
                <p>2</p>
              </div>
            </Paper>
            <Paper >
              <div className="paper__circle">
                <p>3</p>
              </div>
            </Paper>
          </div>

        </div>
      </div>
      <div className="main-divider"></div>

      <div className="content__image-holder">
        <div className="content">
            <h2 className="content__darker-holder-title arabic">
              {"التصنيفات"}
            </h2>
            <div className="content__image-holder__categories">
              <Category title={'برمجة المواقع'} desc={'برمجة المواقع الإلكترونية وإصلاح مشاكل المواقع'} svg={<Web />} />
              <Category title={'تصميم المواقع'} desc={'تصميم المواقع و تحويل الأفكار إلى الواقع'} svg={<Site />} />
              <Category title={'البيع و الشراء'} desc={'منتجات معروضة على سهلة, تفقد أحسن المنتجات'} svg={<Trade />} />
              <Category title={'الماركتينغ'} desc={'خدمات التسويق و الماركتينغ, أفضل المسوقين'} svg={<Bullhorn />} />
            </div>
            <div className="content__image-holder__categories">
              <Category title={'إصلاح السيارات'} desc={'أفضل صالحي السيارات في منطقتك'} svg={<Mechanic />} />
              <Category title={'البناء و التصميم'} desc={'أفضل البنائين و أقربهم إليك'} svg={<Architect />} />
              <Category title={'منتجات للبيع'} desc={'منتجات معروضة للبيع من محالات قريبة إللى موقعك'} svg={<Accessoies />} />
              <Category title={'التصميم'} desc={'مختلف التصاميم, إحصل على مصممي شعارات و أقمصة ...إلخ   '} svg={<DesignThinking />} />
            </div>
        </div>
      </div>

    </Layout>
  )
}
