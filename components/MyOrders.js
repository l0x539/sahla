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

export class MyOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="orders__myorders">
                <Orders data={TEST_DATA} />
            </div>
        )
    }
}