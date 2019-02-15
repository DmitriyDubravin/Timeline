// import React, {Component, Fragment} from 'react';
// import {connect} from 'react-redux';
// import * as action from './../store/actions';
// import {
//     FaArrowLeft,
//     FaArrowRight,
//     FaBullseye,
//     FaCalendarAlt
// } from 'react-icons/fa';

// class DatePicker extends Component {

//     switchDay = modificator => {
//         const {day, month, year} = this.props.date;
//         let date = new Date(year, month, day + modificator);
//         let newDay = date.getDate();
//         let newMonth = date.getMonth();
//         let newYear = date.getFullYear();
//         this.props.setDate({day: newDay, month: newMonth, year: newYear});
//     }
//     switchToToday = () => {
//         const {day, month, year} = this.props.date;
//         let date = new Date();
//         let newDay = date.getDate();
//         let newMonth = date.getMonth();
//         let newYear = date.getFullYear();
//         if (day !== newDay || month !== newMonth || year !== newYear) {
//             this.props.setDate({day: newDay, month: newMonth, year: newYear});
//         }
//     }

//     render() {
//         return (
//             <Fragment>
//                 <button className="tile" onClick={() => this.switchDay(-1)}><FaArrowLeft /></button>
//                 <button className="tile" onClick={() => this.switchToToday()}><FaBullseye /></button>
//                 <button className="tile" onClick={() => this.switchDay(1)}><FaArrowRight /></button>
//                 <button
//                     className="tile"
//                     onClick={this.props.openPopupDatePicker}
//                 >
//                     <FaCalendarAlt />
//                 </button>
//             </Fragment>
//         )
//     }
// }

// export default connect(
//     state => ({
//         date: state.date
//     }),
//     dispatch => ({
//         setDate: function(date) {
//             dispatch(action.setDate(date))
//         },
//         openPopupDatePicker() {
//             dispatch(action.togglePopupDatePicker({ show: true }))
//         }
//     })
// )(DatePicker)

// TODO: remove this file