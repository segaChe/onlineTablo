'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import FlightsTable from './FlightsTable';
import Flight from './Flight.js';
import styles from '../style/adminTablo.css';

export default class AdminTablo extends Component {
	/**
	 * @constructor
	 */
	constructor (props) {
		super(props);
		this.state = {
			cityIsEmpty: true,
			flightNumberIsEmpty: true,
			airplaneIsEmpty: true,
			timeIsEmpty: true,
			counterId: 6,//изменить на колличество полетов в массиве
			flightType: "DepartureFlights"
		};
	}
	/**
	 * Добавляем новый рейс
	 * @param  {Object} event объект события
	 */
	onAddFlightBtn (event) {
		event.preventDefault();

		this.setState({counterId: ++this.state.counterId});

		let flightNumberEl = ReactDOM.findDOMNode(this.refs.flightNumber),
			cityEl = ReactDOM.findDOMNode(this.refs.city),
			airplaneTypeEl = ReactDOM.findDOMNode(this.refs.airplaneType),
			timeEl = ReactDOM.findDOMNode(this.refs.time),
			timeFactEl = ReactDOM.findDOMNode(this.refs.timeFact),
			statusEl = ReactDOM.findDOMNode(this.refs.status),
			flightTypeEl = ReactDOM.findDOMNode(this.refs.flightType);

		let flightNumber = flightNumberEl.value,
			city = cityEl.value,
			airplaneType = airplaneTypeEl.value,
			time = timeEl.value,
			timeFact = timeFactEl.value ? timeFactEl.value : timeEl.value,
			status = statusEl.value;

		let flight = {
			flightNumber: flightNumber,
			city: city,
			airplaneType: airplaneType,
			time: time,
			timeFact: timeFact,
			status: status,
			id: 'flight_' + this.state.counterId,
			flightType: this.state.flightType
		};

		if (flight.flightType === "DepartureFlights") {
			this.props.flights.DepartureFlights.push(flight);
			this.props.getDepartureFlights(this.props.flights);
		} else {
			this.props.flights.ArrivalFlights.push(flight);
			this.props.getArrivalFlights(this.props.flights);
		}

		flightNumberEl.value = '';
		cityEl.value = '';
		airplaneTypeEl.value = '';
		timeEl.value='';
		timeFactEl.value = '';
		statusEl.value='';

		this.setState ({
			cityIsEmpty: true,
			flightNumberIsEmpty: true,
			airplaneIsEmpty: true,
			timeIsEmpty: true,
		});
	}
	/**
	 * Выбираем тип рейса
	 * @param  {Object} event объект события
	 */
	_checkRuleClick (event) {
		this.setState({flightType: event.target.value});
	}
	/**
	 * Отслеживаем пустые поля ввода или нет
	 * @param  {String} fieldName Имя поля ввода
	 * @param  {Object} event     объект события
	 */
	_fieldChange (fieldName, event) {
		let next = {};

		if (event.target.value.trim().length > 0) {
			next[fieldName] = false;
			this.setState(next);
		} else {
			next[fieldName] = true;
			this.setState(next);
		}
	}

	render () {
		const { showFlights, flights, header } = this.props;
		const { getDepartureFlights, 
				getArrivalFlights,
				editFlight, 
				deleteFlight } = this.props;
		return (
			<div className="adminTablo_wrap">
				<form className="adminTabloForm">
					<div className=" flightTypes">
						<label><input 
								type="radio" 
								ref="flightType" 
								defaultValue="DepartureFlights" 
								name="flightType" 
								defaultChecked={true} 
								onChange={::this._checkRuleClick} />
							Вылеты
						</label>
						<label><input 
								type="radio" 
								ref="flightType" 
								defaultValue="ArrivalFlights" 
								name="flightType" 
								onChange={::this._checkRuleClick} />
							Прибытие
						</label>
					</div>
					<div className="adminTabloForm_i_wrap">
					<div className="adminTabloForm_i">
						<label htmlFor="flightNumberId">Номер рейса:</label>
						<input
						 id="flightNumberId"
						 type="text" 
						 placeholder="номер рейса" 
						 defaultValue=""
						 ref="flightNumber"
						 onChange={::this._fieldChange.bind(this, 'flightNumberIsEmpty')} />
					</div>
					<div className="adminTabloForm_i">
						<label htmlFor="cityId">Город отправления\прибытия:</label>
						<input
						 id="cityId"
						 type="text" 
						 placeholder="город" 
						 defaultValue=""
						 ref="city"
						 onChange={::this._fieldChange.bind(this, 'cityIsEmpty')} />
					</div>
					<div className="adminTabloForm_i">
						<label htmlFor="airplaneTypeId">
							Тип ВС <span>(Воздушное Судно):</span>
						</label>
						<input
						 id="airplaneTypeId"
						 type="text" 
						 placeholder="тип ВС" 
						 defaultValue=""
						 ref="airplaneType"
						 onChange={::this._fieldChange.bind(this, 'airplaneIsEmpty')} />
					</div>
					<div className="adminTabloForm_i">
						<label htmlFor="timeId">Время отправления\прибытия:</label>
						<input
						 id="timeId"
						 type="text" 
						 placeholder="время" 
						 defaultValue=""
						 ref="time"
						 onChange={::this._fieldChange.bind(this, 'timeIsEmpty')} />
					</div>
					<div className="adminTabloForm_i">
						<label htmlFor="timeFactId">Фактическое время:</label>
						<input
						 id="timeFactId"
						 type="text" 
						 placeholder="фактическое время" 
						 defaultValue=""
						 ref="timeFact"
						 onChange={::this._fieldChange.bind(this, 'timeIsEmpty')} />
					</div>
					<div className="adminTabloForm_i">
						<label htmlFor="statusId">Статус:</label>
						<input
						 id="statusId"
						 type="text" 
						 placeholder="статус" 
						 defaultValue="" 
						 ref="status"/>
					</div>
					</div>
					<button
					 className="adminTabloForm_i addFlightBtn button"
					 onClick={::this.onAddFlightBtn} 
					 ref="alert_button"
					 disabled = {this.state.cityIsEmpty || 
					 			this.state.flightIsEmpty || 
					 			this.state.airplaneIsEmpty || 
					 			this.state.timeIsEmpty} >
						Добавить рейс
					</button>
				</form>
				<FlightsTable
            				flights={flights} 
            				showFlights={showFlights}
            				header={header}
            				getArrivalFlights={getArrivalFlights}
            				getDepartureFlights={getDepartureFlights}
            				editFlight={editFlight}
            				deleteFlight={deleteFlight}
            				adminFlights={'true'} />
			</div>	
		)
	}
}
/**
 * Типы данных передаваемых компоненте
 * @type {Object}
 */
AdminTablo.propTypes = {
  flights: PropTypes.object.isRequired,
  getDepartureFlights: PropTypes.func.isRequired,
  getArrivalFlights: PropTypes.func.isRequired,
  editFlight: PropTypes.func.isRequired,
  deleteFlight: PropTypes.func.isRequired,
  showFlights: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired
};