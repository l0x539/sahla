import Head from 'next/head'
import Layout from '../components/Layout'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; // https://www.npmjs.com/package/react-responsive-carousel
import 'pure-react-carousel/dist/react-carousel.es.css';

export default function Test() {
  return (
    <div>
      <Head>
        <title>Sahla Business</title>
        <meta name="description" content="Sahla business description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel>
                <div>
                    <img src="assets/website-builder-workplace-interior-3d-rendering.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/video-editing.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>

            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={125}
                totalSlides={3}
            >
                <Slider>
                <Slide index={0}>I am the first Slide.</Slide>
                <Slide index={1}>I am the second Slide.</Slide>
                <Slide index={2}>I am the third Slide.</Slide>
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
                </Slider>
            </CarouselProvider>
    </div>
  )
}
