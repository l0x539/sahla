import { Component } from "react";
import Search from "../assets/search.svg";


class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="searchbar">
                <input className="searchbar__input arabic" placeholder={this.props.placeholder} />
                <Search />
            </div>
        )
    }
}

export default SearchBar;