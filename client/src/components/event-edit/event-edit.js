import React, { useState, useEffect } from 'react';
import {convertNumToTwoDigits} from '../../services/math.service';
import {getTS} from '../../services/time.service';
// import { bool } from 'prop-types';

const EventEdit = ({
    date,
    event,
    types = [],
    categories = [],
    subCategories = [],
    getTypes,
    getCategories,
    getSubcategories,
    editEvent
}) => {

    const [startHour, setStartHour] = useState(event.startHour);
    const [startMinute, setStartMinute] = useState(event.startMinute);
    const [finishHour, setFinishHour] = useState(event.finishHour);
    const [finishMinute, setFinishMinute] = useState(event.finishMinute);
    const [type, setType] = useState(event.type);
    const [category, setCategory] = useState(event.category);
    const [subcategory, setSubcategory] = useState(event.subcategory);
    const [comment, setComment] = useState(event.comment);
    const [isNewType, setIsNewType] = useState(false);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [isNewSubcategory, setIsNewSubcategory] = useState(false);

    useEffect(() => {
        getTypes();
        if (type.length > 0) {
            getCategories(type);
        }
        if (category.length > 0) {
            getSubcategories(category);
        }
    }, []);

    useEffect(() => {
        if (type && type !== 'Type' && !isNewType) {
            getCategories(type);
        }
    }, [type]);

    useEffect(() => {
        if (category && category !== 'Category' && !isNewCategory) {
            getSubcategories(type);
        }
    }, [category]);


    function selectHandler({ target: { name, value } }) {
        switch (name) {
            case 'startHour':
                setStartHour(value);
                break;
            case 'startMinute':
                setStartMinute(value);
                break;
            case 'finishHour':
                setFinishHour(value);
                break;
            case 'finishMinute':
                setFinishMinute(value);
                break;
            case 'type':
                setType(value);
                if (value === 'Type') {
                    setCategory('');
                    setSubcategory('');
                }
                break;
            case 'category':
                setCategory(value);
                if (value === 'Category') {
                    setSubcategory('');
                }
                break;
            case 'subcategory':
                setSubcategory(value);
                break;
            default:
        }
    }

    function inputHandler({ target: { name, value } }) {
        switch (name) {
            case 'type':
                setType(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'subcategory':
                setSubcategory(value);
                break;
            case 'comment':
                setComment(value);
                break;
            default:
        }
    }

    function btnHandler({ target: { name } }) {
        switch (name) {
            case "newType":
                setIsNewType(true);
                setIsNewCategory(true);
                setIsNewSubcategory(true);
                setType('');
                setCategory('');
                setSubcategory('');
                break;
            case "type":
                setIsNewType(false);
                setIsNewCategory(false);
                setIsNewSubcategory(false);
                setType('');
                setCategory('');
                setSubcategory('');
                break;
            case "newCategory":
                setIsNewCategory(true);
                setIsNewSubcategory(true);
                setCategory('');
                setSubcategory('');
                break;
            case "category":
                setIsNewCategory(false);
                setIsNewSubcategory(false);
                setCategory('');
                setSubcategory('');
                break;
            case "newSubcategory":
                setIsNewSubcategory(true);
                setSubcategory('');
                break;
            case "subcategory":
                setIsNewSubcategory(false);
                setSubcategory('');
                break;
            default:
        }
    }


    async function submitHandler(e) {
        e.preventDefault();
        
        let start = getTS({...date, hour: startHour, minte: startMinute});
        let finish = getTS({...date, hour: finishHour, minute: finishMinute});
        // check if event ends on next day
        if (finish <= start) {
            finish += 86400
        }

        editEvent({
            _id: event._id,
            start,
            finish,
            type,
            category,
            subcategory,
            comment
        });
    }



    const hoursOptions = Array.from({length: 24}, (v,i) => i).map((item, i) => <option key={i}>{convertNumToTwoDigits(item)}</option>);
    const minutesOptions = Array.from({length: 12}, (v,i) => i * 5).map((item, i) => <option key={i}>{convertNumToTwoDigits(item)}</option>);
    const typesList = types.map((type, i) => <option key={type}>{type}</option>);
    const categoriesList = categories.map((category, i) => <option key={category}>{category}</option>);
    const subCategoriesList = subCategories.map((subcategory, i) => <option key={subcategory}>{subcategory}</option>);

    const showCategory = !isNewCategory && type;
    const showNewCategory = isNewCategory && type;
    const showSubcategory = !isNewSubcategory && category;
    const showNewSubcategory = isNewSubcategory && category;

    return (
        <form className="edit-event-form" onSubmit={submitHandler}>

            <div className="line times">
                <select name="startHour" value={startHour} onChange={selectHandler}>
                    {hoursOptions}
                </select>
                <select name="startMinute" value={startMinute} onChange={selectHandler}>
                    {minutesOptions}
                </select>
                <select name="finishHour" value={finishHour} onChange={selectHandler}>
                    {hoursOptions}
                </select>
                <select name="finishMinute" value={finishMinute} onChange={selectHandler}>
                    {minutesOptions}
                </select>
            </div>
            {
                !isNewType &&
                <div className="line">
                    <select name="type" onChange={selectHandler} value={type}>
                        <option>Type</option>
                        {typesList}
                    </select>
                    <button name="newType" onClick={btnHandler} className="side-btn add-btn" type="button">+</button>
                </div>
            }
            {
                isNewType &&
                <div className="line">
                    <input name="type" onChange={inputHandler} type="text" placeholder="New Type" />
                    <button name="type" onClick={btnHandler} className="side-btn remove-btn" type="button">-</button>
                </div>
            }
            {
                showCategory &&
                <div className="line">
                    <select name="category" onChange={selectHandler} value={category}>
                        <option>Category</option>
                        {categoriesList}
                    </select>
                    <button name="newCategory" onClick={btnHandler} className="side-btn add-btn" type="button">+</button>
                </div>
            }
            {
                showNewCategory &&
                <div className="line">
                    <input name="category" onChange={inputHandler} type="text" placeholder="New Category" />
                    {!isNewType && <button name="category" onClick={btnHandler} className="side-btn remove-btn" type="button">-</button>}
                </div>
            }
            {
                showSubcategory &&
                <div className="line">
                    <select name="subcategory" onChange={selectHandler} value={subcategory}>
                        <option>Subcategory</option>
                        {subCategoriesList}
                    </select>
                    <button name="newSubcategory" onClick={btnHandler} className="side-btn add-btn" type="button">+</button>
                </div>
            }
            {
                showNewSubcategory &&
                <div className="line">
                    <input name="subcategory" onChange={inputHandler} type="text" placeholder="New Subcategory" />
                    {!isNewCategory && <button name="subcategory" onClick={btnHandler} className="side-btn remove-btn" type="button">-</button>}
                </div>
            }
            <textarea name="comment" onChange={inputHandler} value={comment} ></textarea>
            <input type="submit" value="Edit event" />
        </form>
    )
}

// TODO
// FormEditEvent.propTypes = {
//     event: bool
// };


export default EventEdit;
