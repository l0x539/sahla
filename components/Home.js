import { Carousel } from 'react-responsive-carousel';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; // https://www.npmjs.com/package/react-responsive-carousel
import 'pure-react-carousel/dist/react-carousel.es.css';
import SearchBar from '../components/SearchBar';
import CardCarousel from '../components/CardCarousel';
import Paper from '../components/Paper';
import Category from '../components/Category';
import { API_HOST } from '../utils/constants';

const Home = ({language, goProduct, goService, SVGS, services, products}) => {

    return (
        <>
            <Carousel swiping showStatus={false} autoPlay swipeable showThumbs={false}>
                {
                language?
                language?.carousel_images.map((v, i) => {
                    return (<div key={i} className="carousel__img" style={{backgroundImage: `url(${API_HOST+v.url})`}} >
                            <div className="img_cont"  />
                        </div>)
                })
                :<>
                    <div className="carousel__img" style={{backgroundImage: "url(/assets/website-builder-workplace-interior-3d-rendering.jpg)"}} >
                    <div className="img_cont"  />
                    </div>
                    <div className="carousel__img" style={{backgroundImage: "url(/assets/website-builder-workplace-interior-3d-rendering.jpg)"}}>
                        
                    </div>
                </>
                }
            </Carousel>
            <SearchBar isArabic={/[\u0600-\u06FF]/.test(language?.how_to_join)?true:false} placeholder={language?language?.search_pleaceholder:"... إبحث عن خدمة أو منتج الآن"} />
            <div className="main-divider"></div>
            <div className="content__holder">
                <h2 className={`content__title ${/[\u0600-\u06FF]/.test(language?.service_title)?"arabic":""}`}>
                {language?language?.services_title:"أفضل الخدمات"}
                </h2>
                <CardCarousel preview={goService} items={services} />
            </div>
            <div className="main-divider"></div>
            <div className="content__holder">
                <h2 className={`content__title ${/[\u0600-\u06FF]/.test(language?.products_title)?"arabic":""}`}>
                {language?language?.products_title:"أفضل المنتجات"}
                </h2>
                <CardCarousel preview={goProduct} items={products} />
            </div>
            <div className="main-divider"></div>

            <div className="content__darker-holder">
                <div className="content">
                <h2 className={`content__darker-holder-title${/[\u0600-\u06FF]/.test(language?.how_to_join)?"arabic":""}`}>
                    {language?language?.how_to_join:"كيف تنظم للعمل مع سهلة"}
                </h2>
                <div className="content__fr">
                    {[1, 2, 3].map((v, i) => {
                    return (
                        <Paper key={i} isArabic={/[\u0600-\u06FF]/.test(language?.how_to_join)} otherSide={
                        <>
                            <h4 className="paper__title">
                            {language[`join_step${v}_title`]}
                            </h4>
                            <div className="paper__desc">
                            {
                                language[`join_step${v}_desc`].split("\n").map((v, i) => <p key={i}>{v}</p>)
                            }
                            </div>
                        </>
                        } >
                        <div className="paper__circle">
                            <p>{v}</p>
                        </div>
                        </Paper>
                    )
                    })}
                </div>

                </div>
            </div>
            <div className="main-divider"></div>

            <div className="content__image-holder">
                <div className="content">
                    <h2 className={`content__darker-holder-title ${/[\u0600-\u06FF]/.test(language?.categories_title)?"arabic":""}`}>
                    {language?.categories_title}
                    </h2>
                    <div className="content__image-holder__categories">
                        {language?.categories.filter((_, i) => i <4).map((v, i) => {
                        return (
                            <Category key={i} isArabic={/[\u0600-\u06FF]/.test(language?.categories_title)} title={v.title} desc={v.description} svg={SVGS[i]} />
                        )
                        })}
                    </div>
                    <div className="content__image-holder__categories">
                        {language?.categories.filter((_, i) => i >=4).map((v, i) => {
                        return (
                            <Category key={i+4} isArabic={/[\u0600-\u06FF]/.test(language?.categories_title)} title={v.title} desc={v.description} svg={SVGS[i+4]} />
                        )
                        })}
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Home;