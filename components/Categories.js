import { Component } from "react";


export class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    selectCategory = async (category) => {
        this.props.setCategories(category)
        document.getElementById(category.id).classList.toggle("active")
        
    }

    render () {
        const {categories} = this.props
        const half = Math.floor(categories?.length/2);
        return (
            <div className="list__left">
                        <div className="list__title">
                            {'Categories'}
                        </div>
                        <div className="list__container">
                            <div className="list__categories">
                                {
                                    categories.filter((_, i) => i<=half)
                                        .map((v, i) => <div key={i} id={v.id} onClick={() => {this.selectCategory(v)}}  className={`list__category`}>
                                                            {v.title}
                                                        </div>)
                                }
                            </div>
                            <div className="list__categories">
                                {
                                    categories.filter((_, i) => i>half)
                                        .map((v, i) => <div key={i+half} id={v.id} onClick={() => {this.selectCategory(v)}} className={`list__category`}>
                                                            {v.title}
                                                        </div>)
                                }
                            </div>
                        </div>
                    </div>
        )
    }
}