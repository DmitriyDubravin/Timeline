import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import queryServer from './../../queryServer';
import * as action from './../../store/actions';
// import { clearScreenDown } from 'readline';

class AddChronometryEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newType: false,
            newCategory: false,
            newSubcategory: false,
            type: '',
            category: '',
            subcategory: '',
            comment: '',
            types: [],
            categories: [],
            subcategories: [],
            start: '',
            finish: '',
            redirect: false
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.btnHandler = this.btnHandler.bind(this);
    }

    componentDidMount() {
        this.getTypes();
    }

    getTypes() {

        queryServer({
            path: '/get-types',
            data: {
                name: 'admin'
            },
            callback: this.gotTypes.bind(this)
        });

    }
    gotTypes(response) {

        let typesList = response.types;
        let sortedTypesList = typesList.filter(type => type.length !== 0).sort();
        this.setState({types: sortedTypesList});

    }

    getCategories(type) {

        queryServer({
            path: '/get-categories',
            data: {
                name: 'admin',
                type: type
            },
            callback: this.gotCategories.bind(this)
        });

    }
    gotCategories(response) {

        let categoriesList = response.categories;
        let sortedCategoriesList = categoriesList.filter(category => category.length !== 0).sort();
        this.setState({categories: sortedCategoriesList});

    }

    getSubcategories(category) {

        queryServer({
            path: '/get-subcategories',
            data: {
                name: 'admin',
                category: category
            },
            callback: this.gotSubcategories.bind(this)

        });
    }
    gotSubcategories(response) {

        let subCategoriesList = response.subcategories;
        let sortedSubcategoriesList = subCategoriesList.filter(subcategory => subcategory.length !== 0).sort();
        this.setState({subcategories: sortedSubcategoriesList});

    }

    getSeconds(time) {
        let [hour, minute] = time.split(':');
        let {day, month, year} = this.props.date;
        return Math.floor(+new Date(Date.UTC(year, month, day, hour, minute)) / 1000)
    }

    inputHandler(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
        if (name === "start") {
            let start = this.getSeconds(value);
            this.setState({start: start});
        }
        if (name === "finish") {
            let finish = this.getSeconds(value);
            this.setState({finish: finish});
        }
        if (name === 'type') {
            if (value !== 'Type') {
                this.setState({
                    category: '',
                    subcategory: '',
                    categories: [],
                    subcategories: [],
                });
                this.getCategories(value)
            } else {
                this.setState({
                    type: '',
                    category: '',
                    subcategory: '',
                    categories: [],
                    subcategories: [],
                });
            }
        }
        if (name === 'category') {
            if (value !== 'Category') {
                this.getSubcategories(value)
            } else {
                this.setState({
                    category: '',
                    subcategories: [],
                });
            }
        }
    }
    btnHandler(event) {
        const {name} = event.target;
        if (name === 'newType') {
            this.setState({
                newType: true,
                newCategory: true,
                newSubcategory: true,
                type: '',
                category: '',
                subcategory: ''
            });
        }
        if (name === 'type') {
            this.setState({
                newType: false,
                newCategory: false,
                newSubcategory: false,
                type: '',
                category: '',
                subcategory: ''
            });
        }

        if (name === 'newCategory') {
            this.setState({
                newCategory: true,
                newSubcategory: true,
                category: '',
                subcategory: ''
            });
        }
        if (name === 'category') {
            this.setState({
                newCategory: false,
                newSubcategory: false,
                category: '',
                subcategory: ''
            });
        }

        if (name === 'newSubcategory') {
            this.setState({
                newSubcategory: true,
                subcategory: ''
            });
        }
        if (name === 'subcategory') {
            this.setState({
                newSubcategory: false,
                subcategory: ''
            });
        }
    }
    eventAdded(data) {

        if (Object.keys(this.props.eventsListings).length !== 0) {
            const {day, month, year} = this.props.date;
            const date = `${day}.${month}.${year}`;
            this.props.addEvent(date, data.addedEvent);
            this.setState({redirect: true});
        }

        // if (data.status === "success") this.setState({redirect: true});
    }
    submitHandler(event) {
        event.preventDefault();
        const {start, finish, type, category, subcategory, comment} = this.state;
        
        queryServer({
            path: '/add-event',
            data: {
                name: 'admin',
                start: start,
                finish: finish,
                type: type,
                category: category,
                subcategory: subcategory,
                comment: comment
            },
            callback: this.eventAdded.bind(this)
        });
    }


    render() {

        if (this.state.redirect) return <Redirect to="/chronometry" push={true} />

        // console.log(this.state);

        const {types, categories, subcategories, type, newType, category, newCategory, newSubcategory} = this.state;

        const typesList = types.map((type, i) => <option key={type}>{type}</option>);
        const categoriesList = categories.map((category, i) => <option key={category}>{category}</option>);
        const subCategoriesList = subcategories.map((subcategory, i) => <option key={subcategory}>{subcategory}</option>);

        const showType = !newType;
        const showNewType = newType;
        const showCategory = !newCategory && type.length > 0;
        const showNewCategory = newCategory && type.length > 0;
        const showSubcategory = !newSubcategory && category.length > 0;
        const showNewSubcategory = newSubcategory && category.length > 0;

        const startOptions = Array.from({length: 288}, (v, i) => i * 5)
            .map(item => {
                let hrsRaw = Math.floor(item / 60);
                let hrs = hrsRaw < 10 ? '0' + hrsRaw : hrsRaw;
                let minsRaw = item - hrs * 60;
                let mins = minsRaw < 10 ? '0' + minsRaw: minsRaw;
                return `${hrs}:${mins}`;
            })
            .map((item, i) => <option key={i}>{item}</option>);

        const finishOptions = Array.from({length: 288}, (v, i) => (i + 1) * 5)
            .map(item => {
                let hrsRaw = Math.floor(item / 60);
                let hrs = hrsRaw < 10 ? '0' + hrsRaw : hrsRaw;
                let minsRaw = item - hrs * 60;
                let mins = minsRaw < 10 ? '0' + minsRaw: minsRaw;
                return `${hrs}:${mins}`;
            })
            .map((item, i) => <option key={i}>{item}</option>);

        return (
            <form className="add-chronometry-event-form" onSubmit={this.submitHandler}>

                <div className="line">
                    <select name="start" onChange={this.inputHandler}>
                        <option>Start</option>
                        {startOptions}
                    </select>
                    <select name="finish" onChange={this.inputHandler}>
                        <option>Finish</option>
                        {finishOptions}
                    </select>
                </div>
                {
                    showType &&
                    <div className="line">
                        <select name="type" onChange={this.inputHandler}>
                            <option>Type</option>
                            {typesList}
                        </select>
                        <button name="newType" className="side-btn add-btn" type="button" onClick={this.btnHandler}>+</button>
                    </div>
                }
                {
                    showNewType &&
                    <div className="line">
                        <input type="text" name="type" placeholder="New Type" onChange={this.inputHandler} />
                        <button name="type" className="side-btn remove-btn" type="button" onClick={this.btnHandler}>-</button>
                    </div>
                }

                {
                    showCategory &&
                    <div className="line">
                        <select name="category" onChange={this.inputHandler}>
                            <option>Category</option>
                            {categoriesList}
                        </select>
                        <button name="newCategory" className="side-btn add-btn" type="button" onClick={this.btnHandler}>+</button>
                    </div>
                }
                {
                    showNewCategory &&
                    <div className="line">
                        <input type="text" name="category" placeholder="New Category" onChange={this.inputHandler} />
                        {!newType && <button name="category" className="side-btn remove-btn" type="button" onClick={this.btnHandler}>-</button>}
                    </div>
                }

                {
                    showSubcategory &&
                    <div className="line">
                        <select name="subcategory" onChange={this.inputHandler}>
                            <option>Subcategory</option>
                            {subCategoriesList}
                        </select>
                        <button name="newSubcategory" className="side-btn add-btn" type="button" onClick={this.btnHandler}>+</button>
                    </div>
                }
                {
                    showNewSubcategory &&
                    <div className="line">
                        <input type="text" name="subcategory" placeholder="New Subcategory" onChange={this.inputHandler} />
                        {!newCategory && <button name="subcategory" className="side-btn remove-btn" type="button" onClick={this.btnHandler}>-</button>}
                    </div>
                }
                <textarea name="comment" onChange={this.inputHandler} ></textarea>

                <input type="submit" value="Add event" />
            </form>
        )
    }
}



export default connect(
    state => ({
        name: state.user.name,
        date: state.date,
        eventsListings: state.eventsListings
    }),
    dispatch => ({
        addEvent: function(date, event) {
            dispatch(action.addEvent(date, event))
        }
    })
)(AddChronometryEventForm)
