import { Component } from "react";
import Orders from "./Orders";

const TEST_DATA = [

]

export class MyOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render () {
        return (
            <div className="orders__myorders">
                <h1 className="orders__title">
                    {"My Orders"}
                </h1>
                <Orders data={this.props.products} title={"Products"} />
                <Orders data={this.props.services} title={"Services"} />
            </div>
        )
    }
}