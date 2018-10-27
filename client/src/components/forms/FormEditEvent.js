import React, {Component} from 'react';
import {connect} from 'react-redux';
import {convertNumToTwoDigits, timestampToTimeObj} from '../../support/functions';
import * as action from '../../store/actions';
import QM from './../../modules/QueryModule';


class FormEditEvent extends Component {
    constructor(props) {
        super(props);
        const {
            type,
            category,
            subcategory,
            comment,
            start,
            startHour,
            startMinute,
            finish,
            finishHour,
            finishMinute
        } = props.event;

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
            startHour: startHour,
            startMinute: startMinute,
            finish: finish,
            finishHour: finishHour,
            finishMinute: finishMinute,
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

    async getTypes() {
        const queryData = {
            author: this.props.name
        };
        const {success, data} = await QM.getTypes(queryData);
        if (success) {
            const sortedDataList = data.filter(item => item.length !== 0).sort();
            this.setState({types: sortedDataList});
        }
    }

    async getCategories(type) {
        const queryData = {
            author: this.props.name,
            data: type
        };
        const {success, data} = await QM.getCategories(queryData);
        if (success) {
            const sortedDataList = data.filter(item => item.length !== 0).sort();
            this.setState({categories: sortedDataList});
        }
    }

    async getSubcategories(category) {
        const queryData = {
            author: this.props.name,
            data: category
        };
        const {success, data} = await QM.getCategories(queryData);
        if (success) {
            const sortedDataList = data.filter(item => item.length !== 0).sort();
            this.setState({subcategories: sortedDataList});
        }
    }


    inputHandler(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});

        if (name === 'type') {
            if (value !== 'Type') {
                this.getCategories(value);
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
                this.getSubcategories(value);
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
        const {name, event: {_id}} = this.props;
        
        let start = this.calcSeconds(startHour, startMinute);
        let finish = this.calcSeconds(finishHour, finishMinute);

        // is event ends on next day
        const startTotalMinutes = startHour * 60 + startMinute * 1;
        const finishTotalMinutes = finishHour * 60 + finishMinute * 1;
        if (finishTotalMinutes <= startTotalMinutes) {
            finish += 86400
        }

        const queryData = {
            name: name,
            _id: _id,
            start: start,
            finish: finish,
            type: type,
            category: category,
            subcategory: subcategory,
            comment: comment
        };

        const {success, updatedEvent} = await QM.editEvent(queryData);
        if (success) {
            const {togglePopupEditEvent, editEvent} = this.props;
            editEvent({[_id]: updatedEvent});
            togglePopupEditEvent(false);
        } else {
            // TEMP!
            console.log('c%Editing Error', 'color: red');
        }

    }



    render() {
        // console.log('state', this.state);
        console.log('props.event', this.props.event);

        const {
            start,
            finish,
            types,
            categories,
            subcategories,
            type,
            newType,
            category,
            newCategory,
            newSubcategory,
        } = this.state;

        const startData = timestampToTimeObj(start);
        const finishData = timestampToTimeObj(finish);
        const startHour = startData.hour;
        const startMinute = startData.minute;
        const finishHour = finishData.hour;
        const finishMinute = finishData.minute;

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
                    <select name="startHour" value={startHour} onChange={this.inputHandler}>
                        {hoursOptions}
                    </select>
                    <select name="startMinute" value={startMinute} onChange={this.inputHandler}>
                        {minutesOptions}
                    </select>
                    <select name="finishHour" value={finishHour} onChange={this.inputHandler}>
                        {hoursOptions}
                    </select>
                    <select name="finishMinute" value={finishMinute} onChange={this.inputHandler}>
                        {minutesOptions}
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
