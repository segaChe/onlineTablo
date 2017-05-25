'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flight from './Flight.js';
import '../style/flightsTable.css';

export default class FlightsTable extends Component {
	/**
	 * @constructor
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	constructor (props) {
		super(props);
		this.state = {
			city: '',
			status: '',
			counterFlights: 0,
		};
	}
	/**
	 * Отображает вылеты
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	onDepartureBtnClick(event) {
		this.props.getDepartureFlights(this.props.flights);
	}
	/**
	 * Отображает прилеты
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	onArrivalBtnClick(event) {
		this.props.getArrivalFlights(this.props.flights);
	}
	/**
	 * Фильтрует рейсы по городу
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	onChangeCity (event) {
		this.setState( {city: event.target.value.toLowerCase()} );
	}
	/**
	 * Фильтрует рейсы по статусу
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	onChangeStatus (event) {
		this.setState( {status: event.target.value} );
	}
	/**
	 * Открывает табло администрирования
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	onEditBtnClick(event) {

	}

	/**
	 * Создает шаблон полетов
	 * @param  {Array} flights Массив полетов
	 * @return {HTMLTemplate} шаблон HTML       
	 */
	createTemplate(showFlights, 
					adminFlights,
					editFlight, 
					deleteFlight, 
					flights, 
					getDepartureFlights, 
					getArrivalFlights) {

		let template;
		let f = [];

		//Фильтруем по городу и по статусу
		if (this.state.city && this.state.status) { 
			f = showFlights.filter( 
				(i)=> i.city.toLowerCase().indexOf(this.state.city) != -1 );
			f = f.filter( 
				(i)=> i.status.toLowerCase().indexOf(this.state.status) != -1 );
		} else if (this.state.city) {
			f = showFlights.filter( 
				(i)=> i.city.toLowerCase().indexOf(this.state.city) != -1 );
		}else if (this.state.status) {
			f = showFlights.filter( 
				(i)=> i.status.toLowerCase().indexOf(this.state.status) != -1 );
		} else { f = showFlights; }
		
		//Создаем шаблон полетов
		if (f.length > 0) {

			template = f.map(function(item) {
				return (
							<Flight data={item} key={item.id}
								flights={flights} 
								adminFlights={adminFlights}
								getArrivalFlights={getArrivalFlights}
								getDepartureFlights={getDepartureFlights}
								editFlight={editFlight}
								deleteFlight={deleteFlight} />
					   )
			});
		} else {
			template = <tr>
						  <td colSpan="5">
						  	Нет рейсов с заданными параметрами
						  </td>
						</tr>
		}

		return template;	
	}

	render () {
		const { showFlights, flights, header, adminFlights } = this.props;
		const { getDepartureFlights, 
				getArrivalFlights,
				editFlight,
				deleteFlight } = this.props;
		
		return (
			<div className="flightsTable_container">

				<div className="flightsTable_menu">
					<button className="departureBtn button" 
					  onClick={::this.onDepartureBtnClick}>
					  Вылеты
					</button>
					<button className="arrivalsBtn button" 
					  onClick={::this.onArrivalBtnClick}>
					  Прибытие
					</button>
					<input 
					  className="changeCity"
					  type="text" 
					  placeholder="город" 
					  onChange={::this.onChangeCity} />
					<input
					  className="changeStatus"
					  type="text" 
					  placeholder="статус"
					  onChange={::this.onChangeStatus} >
						
					</input>
				</div>
				<div className="flightsTableHeader">{header}</div>
				<table className="flightsTable">
				<tbody>
					<tr className="flightsTable_item" >
						<th className="flightsTable_flight_i">номер рейса</th>
						<th className="flightsTable_flight_i">город</th>
						<th className="flightsTable_flight_i">тип ВС</th>
						<th className="flightsTable_flight_i">время</th>
						<th className="flightsTable_flight_i">фактическое время</th>
						<th className="flightsTable_flight_i">cтатус</th>
					</tr>
					{this.createTemplate(showFlights, 
										 adminFlights,
										 editFlight, 
										 deleteFlight, 
										 flights,
										 getDepartureFlights, 
										 getArrivalFlights)}
				</tbody>
				</table>
				<p className="counterFlights">Всего рейсов: {showFlights.length}</p>
			</div>
		);
	}
}

FlightsTable.propTypes = {
  flights: PropTypes.object.isRequired,
  getDepartureFlights: PropTypes.func.isRequired,
  getArrivalFlights: PropTypes.func.isRequired,
  showFlights: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  adminFlights: PropTypes.string,
  editFlight: PropTypes.func,
  deleteFlight: PropTypes.func
};