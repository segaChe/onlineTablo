'use strict';

import { GET_FLIGHTS_REQUEST, GET_FLIGHTS_SUCCESS,
		 GET_DEPARTURE_FLIGHTS, 
		 GET_ARRIVAL_FLIGHTS,
		 EDIT_FLIGHT,
		 DELETE_FLIGHT } from '../constants/constants';

/**
 * Запрос данных 
 * @return {Object}  
 */
export function fetchFlights() {
	return dispatch => {
		dispatch({
			type: GET_FLIGHTS_REQUEST,
		});

		return fetch('data/flights.json')
		  .then((response) => response.json())
		  .then(json => dispatch({
		  	type: GET_FLIGHTS_SUCCESS,
		  	payload: json
		}));
	};
}

/**
 * Запрос Вылетов 
 * @param  {[type]} flights [description]
 * @return {[type]}         [description]
 */
export function getDepartureFlights (flights) {
	return {
		type: GET_DEPARTURE_FLIGHTS,
		payload: flights
	};
}

/**
 * Запрос Прилетов
 * @param  {[type]} flights [description]
 * @return {[type]}         [description]
 */
export function getArrivalFlights (flights) {
	return {
		type: GET_ARRIVAL_FLIGHTS,
		payload: flights
	};
}
/**
 * Редактирует статус и фактическое время рейса
 * @param  {[type]} flights    [description]
 * @param  {[type]} flightId   [description]
 * @param  {[type]} flightType [description]
 * @param  {[type]} status     [description]
 * @param  {[type]} timeFact   [description]
 * @return {[type]}            [description]
 */
export function editFlight (flights, flightId, flightType, status, timeFact) {
	for (let i = 0; i < flights[flightType].length; i++) {
		if ( flights[flightType][i].id === flightId ) {
			flights[flightType][i].status = status;
			flights[flightType][i].timeFact = timeFact;
		}
	}
	return {
		type: EDIT_FLIGHT,
		payload: flights
	};
}
/**
 * Удаляет рейс
 * @param  {[type]} flights    [description]
 * @param  {[type]} flightId   [description]
 * @param  {[type]} flightType [description]
 * @return {[type]}            [description]
 */
export function deleteFlight (flights, flightId, flightType) {
	flights[flightType] = flights[flightType].filter( (i)=> i.id != flightId );
	console.log(flights[flightType]);
	return {
		type: DELETE_FLIGHT,
		payload: flights
	}
}