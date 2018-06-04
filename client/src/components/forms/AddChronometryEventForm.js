import React, {Component} from 'react';
import {connect} from 'react-redux';

class AddChronometryEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'new-type': false,
            'new-category': false,
            'new-subcategory': false,
            type: '',
            category: '',
            subcategory: ''
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.btnHandler = this.btnHandler.bind(this);
    }

    inputHandler(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    btnHandler(event) {
        const {name} = event.target
        this.setState({
            [name]: !this.state[name],
            [name.slice(4)]: ''
        });
    }
    submitHandler(event) {
        event.preventDefault();
    }

    render() {
        console.log(this.state);

        let showCategory = !this.state['new-category'] && this.state.type.length > 0;
        let showNewCategory = this.state['new-category'] && this.state.type.length > 0;
        let showSubCategory = !this.state['new-subcategory'] && this.state.category.length > 0;
        let showNewSubCategory = 
            this.state.category.length > 0 &&
            !this.state['category'] &&
            this.state['new-subcategory'];

        return (
            <form className="add-chronometry-event-form" onSubmit={this.submitHandler}>
                {!this.state['new-type'] &&
                    <div>
                        <button name="new-type" className="side-btn add-btn" type="button" onClick={this.btnHandler}>+</button>
                        <select name="type" onChange={this.inputHandler}>
                            <option>Type</option>
                            <option>1</option>
                        </select>
                    </div>
                }
                {this.state['new-type'] &&
                    <div>
                        <button name="new-type" className="side-btn remove-btn" type="button" onClick={this.btnHandler}>-</button>
                        <input type="text" name="type" placeholder="New Type" onChange={this.inputHandler} />
                    </div>
                }

                {showCategory &&
                    <div>
                        <button name="new-category" className="side-btn add-btn" type="button" onClick={this.btnHandler}>+</button>
                        <select name="category" onChange={this.inputHandler}>
                            <option>Category</option>
                            <option>1</option>
                        </select>
                    </div>
                }
                {showNewCategory &&
                    <div>
                        <button name="new-category" className="side-btn remove-btn" type="button" onClick={this.btnHandler}>-</button>
                        <input type="text" name="category" placeholder="New Category" onChange={this.inputHandler} />
                    </div>
                }

                {showSubCategory &&
                    <div>
                        <button name="new-subcategory" className="side-btn add-btn" type="button" onClick={this.btnHandler}>+</button>
                        <select name="subcategory" onChange={this.inputHandler}>
                            <option>Subcategory</option>
                        </select>
                    </div>
                }
                {showNewSubCategory &&
                    <div>
                        {showNewCategory && <button name="new-subcategory" className="side-btn remove-btn" type="button" onClick={this.btnHandler}>-</button>}
                        <input type="text" name="subcategory" placeholder="New Subcategory" onChange={this.inputHandler} />
                    </div>
                }
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
