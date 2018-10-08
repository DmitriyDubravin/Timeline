import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import queryServer from '../../queryServer';
import {timestampToTimeObj} from '../../support/functions';
import * as action from '../../store/actions';

class FormEditEvent extends Component {
    constructor(props) {
        super(props);
        const {type, category, subcategory, comment, start, finish} = props.event;
        this.state = {
            newType: false,
            newCategory: false,
            newSubcategory: false,
            type: type,
            category: category,
            subcategory: subcategory,
            comment: comment,
            types: [],
            categories: [],
            subcategories: [],
            start: start,
            finish: finish,
            redirect: false
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.btnHandler = this.btnHandler.bind(this);
    }

    componentDidMount() {
        this.getTypes();
        if(this.props.event.category.length > 0) {
            this.getCategories(this.props.event.type);
        }
        if(this.props.event.category.length > 0) {
            this.getSubcategories(this.props.event.category);
        }
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
    getTime(timestamp) {
        let date = timestampToTimeObj(timestamp);
        return `${date.hours}:${date.minutes}`;
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
    eventEdited(data) {
        this.props.togglePopupEditEvent(false);
        if (data.status === "success") {
            this.props.editEvent({[this.props.event._id]: data.updatedEvent})
        } else {
            console.log('c%Editing Error', 'color: red');
        }
    }
    submitHandler(event) {
        event.preventDefault();
        const {start, finish, type, category, subcategory, comment} = this.state;
        
        queryServer({
            path: '/edit-event',
            data: {
                name: 'admin',
                _id: this.props.event._id,
                start: start,
                finish: finish,
                type: type,
                category: category,
                subcategory: subcategory,
                comment: comment
            },
            callback: this.eventEdited.bind(this)
        });
    }


    render() {

        if (this.state.redirect) {
            return <Redirect to="/chronometry" push={true} />
        }


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
                    <select name="start" value={this.getTime(this.state.start)} onChange={this.inputHandler}>
                        <option>Start</option>
                        {startOptions}
                    </select>
                    <select name="finish" value={this.getTime(this.state.finish)} onChange={this.inputHandler}>
                        <option>Finish</option>
                        {finishOptions}
                    </select>
                </div>
                {
                    showType &&
                    <div className="line">
                        <select name="type" value={this.state.type} onChange={this.inputHandler}>
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
                        <select name="category" value={this.state.category} onChange={this.inputHandler}>
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
                        <select name="subcategory" value={this.state.subcategory} onChange={this.inputHandler}>
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
                <textarea name="comment" value={this.state.comment} onChange={this.inputHandler} ></textarea>

                <input type="submit" value="Edit event" />
            </form>
        )
    }
}



export default connect(
    state => ({
        name: state.user.name,
        date: state.date,
        event: state.eventsData.events[state.popups.editEvent.id]
    }),
    dispatch => ({
        editEvent: function(event) {
            dispatch(action.editEvent(event))
        },
        togglePopupEditEvent: function(boolean, id) {
            dispatch(action.togglePopupEditEvent(boolean, id));
        }
    })
)(FormEditEvent)
