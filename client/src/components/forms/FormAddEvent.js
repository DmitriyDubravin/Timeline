import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../../store/actions';
import {convertNumToTwoDigits} from './../../support/functions';
import QM from './../../modules/QueryModule';
import paths from './../../paths';

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
            startHour: '00',
            startMinute: '00',
            finishHour: '00',
            finishMinute: '00',
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.btnHandler = this.btnHandler.bind(this);
    }

    componentDidMount() {
        this.getData(paths.getTypes, this.props.name); // TEMP! need caching
    }

    async getData(path, name, queryData = '') {
        const {success, data, dataName} = await QM.getData(path, name, queryData);
        if (success) {
            const sortedDataList = data.filter(item => item.length !== 0).sort();
            this.setState({[dataName]: sortedDataList});
        }
    }

    inputHandler(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});

        if (name === 'type') {
            if (value !== 'Type') {
                this.getData(paths.getCategories, this.props.name, value);
            } else {
                this.setState({type: ''});
            }
            this.setState({
                category: '',
                subcategory: '',
                categories: [],
                subcategories: [],
            });
        }

        if (name === 'category') {
            if (value !== 'Category') {
                this.getData(paths.getSubcategories, this.props.name, value);
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

        switch (name) {
            case "type":
                this.setState({newType: false, newCategory: false, newSubcategory: false, type: '', category: '', subcategory: ''});
                break;
            case "category":
                this.setState({newCategory: false, newSubcategory: false, category: '', subcategory: ''});
                break;
            case "subcategory":
                this.setState({newSubcategory: false, subcategory: ''});
                break;
            case "newType":
                this.setState({newType: true, newCategory: true, newSubcategory: true, type: '', category: '', subcategory: ''});
                break;
            case "newCategory":
                this.setState({newCategory: true, newSubcategory: true, category: '', subcategory: ''});
                break;
            case "newSubcategory":
                this.setState({newSubcategory: true, subcategory: ''});
                break;
            default:

        }
    }

    calcSeconds(hour, minute) {
        let {day, month, year} = this.props.date;
        return Math.floor(+new Date(Date.UTC(year, month, day, hour, minute)) / 1000)
    }

    async submitHandler(e) {
        e.preventDefault();
        const {
            startHour,
            startMinute,
            finishHour,
            finishMinute,
            type,
            category,
            subcategory,
            comment
        } = this.state;
        const {name} = this.props;

        let start = this.calcSeconds(startHour, startMinute);
        let finish = this.calcSeconds(finishHour, finishMinute);
        // check if event ends on next day
        const startTotalMinutes = startHour * 60 + startMinute * 1;
        const finishTotalMinutes = finishHour * 60 + finishMinute * 1;
        if (finishTotalMinutes <= startTotalMinutes) {
            finish += 86400
        }

        const queryData = {
            name,
            start,
            finish,
            type,
            category,
            subcategory,
            comment
        };

        const {success, addedEvent} = await QM.addEvent(queryData);
        if (success) {
            const {date: {date}, togglePopupAddEvent, addEvent} = this.props;
            const id = addedEvent._id;
            togglePopupAddEvent(false);
            addEvent(date, {[id]: addedEvent});
        } else {
            // TEMP!
            console.log('c%Adding Error', 'color: red');
        }

    }



    render() {
        // console.log('state', this.state);

        const {
            types,
            categories,
            subcategories,
            type,
            newType,
            category,
            newCategory,
            newSubcategory
        } = this.state;

        const hoursOptions = Array.from({length: 24}, (v,i) => i).map((item, i) => <option key={i}>{convertNumToTwoDigits(item)}</option>);
        const minutesOptions = Array.from({length: 12}, (v,i) => i * 5).map((item, i) => <option key={i}>{convertNumToTwoDigits(item)}</option>);

        const typesList = types.map((type, i) => <option key={type}>{type}</option>);
        const categoriesList = categories.map((category, i) => <option key={category}>{category}</option>);
        const subCategoriesList = subcategories.map((subcategory, i) => <option key={subcategory}>{subcategory}</option>);

        const showType = !newType;
        const showNewType = newType;
        const showCategory = !newCategory && type.length > 0;
        const showNewCategory = newCategory && type.length > 0;
        const showSubcategory = !newSubcategory && category.length > 0;
        const showNewSubcategory = newSubcategory && category.length > 0;

        return (
            <form className="add-event-form" onSubmit={this.submitHandler}>

                <div className="line times">
                    <select name="startHour" onChange={this.inputHandler}>
                        {hoursOptions}
                    </select>
                    <select name="startMinute" onChange={this.inputHandler}>
                        {minutesOptions}
                    </select>
                    <select name="finishHour" onChange={this.inputHandler}>
                        {hoursOptions}
                    </select>
                    <select name="finishMinute" onChange={this.inputHandler}>
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
