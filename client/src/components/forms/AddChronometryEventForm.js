import React, {Component} from 'react';
import {connect} from 'react-redux';

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
            comment: ''
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.btnHandler = this.btnHandler.bind(this);
    }

    inputHandler(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
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
    submitHandler(event) {
        event.preventDefault();
    }


    render() {

        const {type, newType, category, newCategory, newSubcategory} = this.state;

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
                            <option>1</option>
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
                            <option>2</option>
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
                            <option>3</option>
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
    null,
    // state => ({
    //     name: state.user.name
    // }),
    // dispatch => ({
    //     setUserName: function(name) {
    //         dispatch(action.setUserName(name))
    //     }
    // })
)(AddChronometryEventForm)
