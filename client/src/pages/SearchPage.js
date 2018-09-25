import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchPage extends Component {
    constructor(props) {
        super(props);
    }
    submitHandler() {

    }
    render() {
        let typeList = [];
        let categoriesList = [];
        let subCategoriesList = [];

        return (
            <div>
                <h2>Search Page</h2>

                <form className="search-form" onSubmit={this.submitHandler}>
                    <div className="line">
                        <select name="type" onChange={this.inputHandler}>
                            <option>Type</option>
                            {typeList}
                        </select>
                    </div>
                    <div className="line">
                        <select name="category" onChange={this.inputHandler}>
                            <option>Category</option>
                            {categoriesList}
                        </select>
                    </div>
                    <div className="line">
                        <select name="subcategory" onChange={this.inputHandler}>
                            <option>Subcategory</option>
                            {subCategoriesList}
                        </select>
                    </div>
                    <input type="submit" value="Search" />
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        name: state.user.name
    })
)(SearchPage)