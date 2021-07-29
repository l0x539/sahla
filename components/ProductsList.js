import { Component } from "react";
import CardCarousel from "./CardCarousel";
import SearchBar from "./SearchBar";

const BEST_PRODUCTS = [
    { id: 1, rating: 4.5, title: 'حواسيب غايمنغ', description: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
    { id: 4, rating: 4.5, title: 'حواسيب غايمنغ', description: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
    { id: 5, rating: 4.5, title: 'منتجات شاور', description: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
    { id: 6, rating: 4.5, title: 'ساعات يد لوكسور', description: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
    { id: 7, rating: 4.5, title: 'حواسيب غايمنغ', description: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
    { id: 8, rating: 4.5, title: 'منتجات شاور', description: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
    { id: 9, rating: 4.5, title: 'ساعات يد لوكسور', description: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
    { id: 10, rating: 4.5, title: 'حواسيب غايمنغ', description: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
    { id: 11, rating: 4.5, title: 'منتجات شاور', description: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
    { id: 12, rating: 4.5, title: 'ساعات يد لوكسور', description: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
    { id: 13, rating: 4.5, title: 'حواسيب غايمنغ', description: 'حواسيب غايمنغ حواسيب غايمنغ', image: '/assets/gaming-desktop-pc-custom-built-cpu--500x500.jpg' },
    { id: 14, rating: 4.5, title: 'منتجات شاور', description: 'منتجات شاور منتجات شاور منتجات شاور', image: '/assets/rsz_bath_and_shower_products.jpg' },
    { id: 15, rating: 4.5, title: 'ساعات يد لوكسور', description: 'ساعات يد لوكسور ساعات يد لوكسور ', image: '/assets/twin_1.jpg.transform.generic-cards_image_335_2x.jpg' },
  ]
  

class ProductsList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    previewProduct = (id) => {
        this.props.products.map((v, i) => {

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
                <CardCarousel preview={this.previewProduct} items={this.props.products} />
            </>
        )
    }
}

export default ProductsList;