'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createFragment from 'react-addons-create-fragment';
import PropTypes from 'prop-types';
import '../style/flight.css';

export default class Flight extends Component {

	/**
	 * Получает и сохроняет новые данные рейса
	 * @param  {Object} event объект события
	 */
	onEditFlightBtnClick(event) {
		let flights = this.props.flights,
			flightId = event.target.dataset.index,
			flightType = event.target.dataset.flighttype;

		let timeFact = ReactDOM.findDOMNode(this.refs.timeFact).value,
			status = ReactDOM.findDOMNode(this.refs.status).value;

		this.props.editFlight(flights, flightId, flightType, status, timeFact);
	}
	/**
	 * Удаляет рейс
	 * @param  {Object} event объект события
	 */
	onDeleteFlightBtnClick(event) {
		let flights = this.props.flights,
			flightId = event.target.dataset.index,
			flightType = event.target.dataset.flighttype;

		this.props.deleteFlight(flights, flightId, flightType);
		
		if (flightType == 'DepartureFlights') {
			this.props.getDepartureFlights(flights);
		} else {
			this.props.getArrivalFlights(flights);
		}
	}

	render () {
		const { flightNumber, 
				city, 
				airplaneType, 
				time, 
				timeFact, 
				status, 
				id, 
				flightType } = this.props.data;
				
		const { adminFlights } = this.props;

		return (
			<tr className="flightsTable_item" >
				<td className="flightsTable_flight_i">{flightNumber}</td>
				<td className="flightsTable_flight_i">{city}</td>
				<td className="flightsTable_flight_i">{airplaneType}</td>
				<td className="flightsTable_flight_i">{time}</td>
				<td className="flightsTable_flight_i">
					{ adminFlights ? <input 
									  type="text" 
									  defaultValue={timeFact} 
									  ref="timeFact" /> :
				 	  createFragment({timeFact}) }
				</td>
				<td className="flightsTable_flight_i">
					{ adminFlights ? <input 
									  type="text" 
									  defaultValue={status} 
									  ref="status" /> :
					 createFragment({status}) }
				</td>
				{adminFlights ? 
					<td className="flightsTable_flight_i">
						<button
						  className="editFlightBtn button"
						  data-index={id}
						  data-flightType={flightType}
						  onClick={::this.onEditFlightBtnClick}>
							Сохранить
						</button>
						<button
						  className="deleteFlightBtn button"
						  data-index={id}
						  data-flighttype={flightType}
						  onClick={::this.onDeleteFlightBtnClick}>
							Удалить
						</button>
					</td> : <td></td>}
			</tr>
		); 
	}
}
/**
 * Типы данных передаваемых компоненте
 * @type {Object}
 */
Flight.propTypes = {
  data: PropTypes.object.isRequired,
  flights: PropTypes.object.isRequired,
  getDepartureFlights: PropTypes.func.isRequired,
  getArrivalFlights: PropTypes.func.isRequired,
  adminFlights: PropTypes.string,
  editFlight: PropTypes.func,
  deleteFlight: PropTypes.func
};