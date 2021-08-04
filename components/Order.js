import { Add, ArrowLeft, ExpandLess } from "@material-ui/icons";
import { Component } from "react";
import { NotificationManager} from 'react-notifications';

export class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    addPhone = () => {
        this.setState({phone: true})
    }

    handleSumbit = async (e) => {
        e.preventDefault()
        let form = e.target.elements;

        let address = form.adress?.value;
        let quantity = form.quantity?.value;
        let services_plans = form.plans?.value;
        let email = form.email?.value;
        let phone = form.phone?.value;

        let data = {
            address,
            quantity,
            services_plans,
            email,
            phone,
            type: this.props.type,
            item_id: this.props.order.id
        }
    
        const res = await this.props.place_order(data, {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        });

        if (res.error) {
            return NotificationManager.error(res.message, 'Error');
        } else {
            this.props.exitOrder()
            return NotificationManager.success("Your order has been sent.", 'Success');
        }
    }

    render () {
        return (
            <div className="order">
                <div className="order__header" onClick={()=> {this.props.exitOrder()}}>
                    <div className="order__return">
                        <ArrowLeft />
                    </div>
                </div>
                <form className="order__content" onSubmit={this.handleSumbit}>
                    <input type="text" name="adress" className="input__main" placeholder="Address" />
                    {
                        this.props.order.price?
                        <input type="number" name="quantity" className="order__quantity input__main" placeholder="Quantity" />
                        :null
                    }
                    {
                        this.props.order.services_plans?.length?
                        <select type="number" name="plans" className="input__main" placeholder="Plans" />
                        :null
                    }
                    <input type="email" name="email" className="input__main" placeholder="Email" />
                    {
                        this.state.phone?
                            <>
                                <input type="tel" name="phone" className="input__main" placeholder="Phone Number (optional)" />
                                
                            </>
                            :
                            <div className="order__link control-head__button control-head--add " onClick={this.addPhone}>
                            <Add />
                            {'Add Phone Number'}
                        </div>
                    }
                    <button type="submit" className="btn__big btn_content order__button">
                        <span className="btn__big--front">
                            {'Add'}
                        </span>
                    </button>
                    
                </form>
            </div>
        )
    }
}