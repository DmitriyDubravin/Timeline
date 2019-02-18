import React, {useState, useEffect} from 'react';
import {convertNumToTwoDigits} from '../../services/math.service';
import {getTS} from '../../services/time.service';

const EventAdd = ({
    date,
    types = [],
    categories = [],
    subCategories = [],
    getTypes,
    getCategories,
    getSubcategories,
    addEvent
}) => {

    const [startHour, setStartHour] = useState('00');
    const [startMinute, setStartMinute] = useState('00');
    const [finishHour, setFinishHour] = useState('00');
    const [finishMinute, setFinishMinute] = useState('00');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [comment, setComment] = useState('');
    const [isNewType, setIsNewType] = useState(false);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [isNewSubcategory, setIsNewSubcategory] = useState(false);

    useEffect(() => {
        getTypes();
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

        let start = getTS({...date, hour: startHour, minute: startMinute});
        let finish = getTS({...date, hour: finishHour, minute: finishMinute});
        // check if event ends on next day
        if (finish <= start) {
            finish += 86400
        }

        // console.log({
        //     start,
        //     finish,
        //     type,
        //     category,
        //     subcategory,
        //     comment
        // })
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
        <form className="add-event-form" onSubmit={submitHandler}>

            <div className="line times">
                <select name="startHour" onChange={selectHandler}>
                    {hoursOptions}
                </select>
                <select name="startMinute" onChange={selectHandler}>
                    {minutesOptions}
                </select>
                <select name="finishHour" onChange={selectHandler}>
                    {hoursOptions}
                </select>
                <select name="finishMinute" onChange={selectHandler}>
                    {minutesOptions}
                </select>
            </div>
            {
                !isNewType &&
                <div className="line">
                    <select name="type" onChange={selectHandler}>
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
                    <select name="category" onChange={selectHandler}>
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
                    <select name="subcategory" onChange={selectHandler}>
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
            <textarea name="comment" onChange={inputHandler} ></textarea>
            <input type="submit" value="Add event" />
        </form>
    )
}

export default EventAdd;
