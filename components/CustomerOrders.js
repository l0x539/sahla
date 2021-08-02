import { Component } from "react";
import Orders from "./Orders";

const TEST_DATA = [
    {
        type: "porduct",
        title: "Nico Product",
        phone: "",
        username: "",
        email: "",
        quantity: 13,
        status: "unresolved"
    }
]

export class CustomerOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render () {

        return (
            <div className="orders__myorders">
                <h1 className="orders__title">
                    {"Customer Orders"}
                </h1>
                <Orders data={this.props.products} title={"Products"} />
                <Orders data={this.props.services} title={"Services"} />
            </div>
        )
    }
}