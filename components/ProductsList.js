import { Add, Edit, RestoreFromTrashSharp } from "@material-ui/icons";
import { Component } from "react";
import AddItem from "./AddItem";
import CardCarousel from "./CardCarousel";
import Modal from "./Modal";
import Question from "./Question";
import SearchBar from "./SearchBar";
import { NotificationManager} from 'react-notifications';
import { delete_product, add_product } from "../utils/requests";
 

class ProductsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
        }
    }

    componentDidMount () {
    }

    previewProduct = (id) => {
        this.props.products.map((v, i) => {

            if (id === v.id) {
                this.props.preview(v)
            }
        })
    }

    openAddItem = () => {
        this.setState({openModal: true})
        this.setState({setModal: false})
    }

    openDeleteItem = () => {
        if (this.state.selected.length) {
            this.setState({openModal: true})
            this.setState({setModal: true})
        } else {
            NotificationManager.warning('Select items to delete.', 'Items');
        }
    }

    closeModal = () => {
        this.setState({openModal: false})
        this.setState({setModal: false})
    }

    selectCard = async (id) => {

        let selected = this.state.selected;
        if (selected.find((v) => v===id)) {
            selected = selected.filter((v) => { if (v != id) return v})
        } else {
            selected.push(id)
        }
        this.setState({selected})

    }

    answer =  async (response) => {
        if (response) {
            let selected = this.state.selected

            selected.forEach(async (v) => {
                const result = await delete_product(localStorage.getItem("jwt"), v)
                if (result.error) {
                    NotificationManager.error(result.error.message, "Error")
                } else {
                    NotificationManager.success("Item Deleted", "Success")
                    document.getElementById(v).remove()
                    this.setState({selected:selected.filter((k) => k!==v)})

                }
            })
        }
        this.closeModal()
    }

    addedItem = (item) => {
        const products = this.props.products
        products.push(item)
        this.setState({products })
    }


    render () {
        return (
            <>
                <SearchBar setSearch={this.props.setSearch} placeholder={"... إبحث عن منتج الآن"} />
                <div className="main-divider"></div>
                {this.props.isLoggedIn?
                <div className="control-head">
                    <div className="control-head__button control-head--add" onClick={this.openAddItem}>
                        <Add />
                        {'Add'}
                    </div>
                    {/* <div className="control-head__button control-head--edit">
                        <Edit />
                        {'Edit'}
                    </div> */}
                    <div className="control-head__button control-head--remove" onClick={this.openDeleteItem} >
                        {/* {'- Remove'} */}
                        <RestoreFromTrashSharp />
                    </div>
                </div>

                :null
                }
                <div className="list">
                    <div className="list__left">
                        <div className="list__title">
                            {'Categories'}
                        </div>
                        <div className="list__container">
                            <div className="list__categories">
                                <div className="list__category">
                                    {'Category'}
                                </div>
                                <div className="list__category">
                                    {'Category'}
                                </div>
                                <div className="list__category">
                                    {'Category'}
                                </div>
                                <div className="list__category">
                                    {'Category'}
                                </div>
                            </div>
                            <div className="list__categories">
                                <div className="list__category">
                                    {'Category'}
                                </div>
                                <div className="list__category">
                                    {'Category'}
                                </div>
                                <div className="list__category">
                                    {'Category'}
                                </div>
                                <div className="list__category">
                                    {'Category'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"list__right " + (this.props.isLoggedIn?"card__logged":"")}>
                        <CardCarousel isLoading={this.props.isLoading} isLoggedIn={this.props.isLoggedIn} preview={this.previewProduct} items={this.props.products} selectCard={this.selectCard} />
                    </div>
                </div>
                {this.props.isLoggedIn?<Modal
                active={this.state.openModal}
                size={{width: '50rem', height: '20rem'}}
                centerContent={true}
                title={<div className="heading-primary">Add Product</div>}
                    closeModal={this.closeModal}>
                        {
                            this.state.setModal?
                            <Question question={"Do you want to delete items?"} answer={this.answer} />
                            :
                            <AddItem product add_item={add_product} closeModal={this.closeModal} NotificationManager={NotificationManager} addedItem={this.addedItem} />
                        }
                </Modal>
                :null
                }
            </>
        )
    }
}

export default ProductsList;