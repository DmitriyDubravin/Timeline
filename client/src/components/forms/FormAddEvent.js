import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from '../../queryServer';
import * as action from '../../store/actions';
// import { clearScreenDown } from 'readline';
import {timestampToTimeObj, convertNumToTwoDigits} from '../../support/functions';

class FormAddEvent extends Component {
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
            startHours: '',
            startMinutes: '',
            finishHours: '',
            finishMinutes: '',
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.btnHandler = this.btnHandler.bind(this);
    }

    componentDidMount() {
        this.getTypes(); // TEMP! need caching
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

    inputHandler(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});

        if (
            name === "startHours" || 
            name === "startMinutes" || 
            name === "finishHours" || 
            name === "finishMinutes"
        ) {
            this.setState({[name]: value});
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

        // TEMP! no errors check
        const date = this.props.date.date;
        const id = data.addedEvent._id;
        this.props.togglePopupAddEvent(false);
        this.props.addEvent(date, {[id]: data.addedEvent});

    }

    getSeconds(hour, minute) {
        let {day, month, year} = this.props.date;
        return Math.floor(+new Date(Date.UTC(year, month, day, hour, minute)) / 1000)
    }

    submitHandler(event) {
        event.preventDefault();
        const {
            startHours,
            startMinutes,
            finishHours,
            finishMinutes,
            type,
            category,
            subcategory,
            comment
        } = this.state;

        const start = this.getSeconds(startHours, startMinutes);




        // if (finish < start) .... etc...






        const finish = this.getSeconds(finishHours, finishMinutes);

        const {hour: startHour, minute: startMinute} = timestampToTimeObj(start);
        const {hour: finishHour, minute: finishMinute} = timestampToTimeObj(finish);

        
        queryServer({
            path: '/add-event',
            data: {
                name: 'admin',
                start: start,
                startHour: startHour,
                startMinute: startMinute,
                finish: finish,
                finishHour: finishHour,
                finishMinute: finishMinute,
                type: type,
                category: category,
                subcategory: subcategory,
                comment: comment
            },
            callback: this.eventAdded.bind(this)
        });
    }


    render() {

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

        const hoursOptions = Array.from({length: 24}, (v,i) => i).map((item, i) => <option key={i}>{convertNumToTwoDigits(item)}</option>);
        const minutesOptions = Array.from({length: 12}, (v,i) => i * 5).map((item, i) => <option key={i}>{convertNumToTwoDigits(item)}</option>);

        return (
            <form className="add-event-form" onSubmit={this.submitHandler}>

                <div className="line times">
                    <select name="startHours" onChange={this.inputHandler}>
                        {hoursOptions}
                    </select>
                    <select name="startMinutes" onChange={this.inputHandler}>
                        {minutesOptions}
                    </select>
                    <select name="finishHours" onChange={this.inputHandler}>
                        {hoursOptions}
                    </select>
                    <select name="finishMinutes" onChange={this.inputHandler}>
                        {minutesOptions}
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
        },
        togglePopupAddEvent: function(boolean) {
            dispatch(action.togglePopupAddEvent(boolean))
        },
    })
)(FormAddEvent)
