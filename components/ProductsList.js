import { Component } from "react";
import CardCarousel from "./CardCarousel";
import SearchBar from "./SearchBar";

const BEST_PRODUCTS = [
    { id: 1, title: 'حواسيب غايمنغ', description: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
    { id: 2, title: 'منتجات شاور', description: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
    { id: 3, title: 'ساعات يد لوكسور', description: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
    { id: 4, title: 'حواسيب غايمنغ', description: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
    { id: 5, title: 'منتجات شاور', description: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
    { id: 6, title: 'ساعات يد لوكسور', description: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
    { id: 7, title: 'حواسيب غايمنغ', description: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
    { id: 8, title: 'منتجات شاور', description: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
    { id: 9, title: 'ساعات يد لوكسور', description: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
    { id: 10, title: 'حواسيب غايمنغ', description: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
    { id: 11, title: 'منتجات شاور', description: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
    { id: 12, title: 'ساعات يد لوكسور', description: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
    { id: 13, title: 'حواسيب غايمنغ', description: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
    { id: 14, title: 'منتجات شاور', description: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
    { id: 15, title: 'ساعات يد لوكسور', description: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
  ]
  

class ProductsList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    previewProduct = (id) => {
        BEST_PRODUCTS.map((v, i) => {

            if (id === v.id) {
                this.props.preview(v)
            }
        })
    }

    render () {
        return (
            <>
                <SearchBar placeholder={"... إبحث عن منتج الآن"} />
                <div className="main-divider"></div>
                <CardCarousel preview={this.previewProduct} items={BEST_PRODUCTS} />
            </>
        )
    }
}

export default ProductsList;