import { Component } from "react";
import Search from "../assets/search.svg";


class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount () {
        this.setState({isArabic: /[\u0600-\u06FF]/.test(this.props.placeholder)})
    }

    handleSearchQuery = (e) => {
        this.props.setSearch(e.target.value)
    }

    render () {
        const {placeholder} = this.props
        return (
            <div className={`searchbar ${this.state.isArabic?"arabic":""}`}>
                <input className={`searchbar__input ${this.state.isArabic?"arabic":""}`} placeholder={placeholder} onChange={this.handleSearchQuery} />
                <Search />
            </div>
        )
    }
}

export default SearchBar;