'use strict';

import { GET_FLIGHTS_REQUEST, GET_FLIGHTS_SUCCESS,
		 GET_DEPARTURE_FLIGHTS, 
		 GET_ARRIVAL_FLIGHTS,
		 EDIT_FLIGHT,
		 DELETE_FLIGHT } from '../constants/constants';

//данные для имитации асинхронного запроса
// const flights = {
// 	DepartureFlights: [
// 		{
// 			flightNumber: "AF-213",
// 			city: "Москва",
// 			airplaneType: "A320",
// 			time: "9:30",
// 			timeFact: "9:35",
// 			status: "идет посадка",
// 			id: "flight_1",
// 			flightType: "DepartureFlights"
// 		},

// 		{
// 			flightNumber: "UV-213",
// 			city: "Москва",
// 			airplaneType: "A320",
// 			time: "9:30",
// 			timeFact: "9:35",
// 			status: "идет посадка",
// 			id: "flight_2",
// 			flightType: "DepartureFlights"
// 		},

// 		{
// 			flightNumber: "UA-502",
// 			city: "Будапешт",
// 			airplaneType: "ТУ-154",
// 			time: "11:00",
// 			timeFact: "",
// 			status: "",
// 			id: "flight_3",
// 			flightType: "DepartureFlights"
// 		},

// 		{
// 			flightNumber: "AE-213",
// 			city: "Дубаи",
// 			airplaneType: "A320",
// 			time: "9:30",
// 			timeFact: "10:00",
// 			status: "регистрация",
// 			id: "flight_4",
// 			flightType: "DepartureFlights"
// 		}
// 	],

// 	ArrivalFlights: [
// 		{
// 			flightNumber: "AE-213",
// 			city: "Москва",
// 			airplaneType: "A320",
// 			time: "9:30",
// 			timeFact: "10:00",
// 			status: "Задержка",
// 			id: "flight_5",
// 			flightType: "ArrivalFlights"
// 		},

// 		{
// 			flightNumber: "AE-300",
// 			city: "Сургут",
// 			airplaneType: "A320",
// 			time: "9:30",
// 			timeFact: "9:30",
// 			status: "Прибыл",
// 			id: "flight_6",
// 			flightType: "ArrivalFlights"
// 		}
// 	]

// }

//имитация асинхронного запроса

// export function fetchFlights() {
// 	return (dispatch) => {
// 		dispatch({
// 			type: GET_FLIGHTS_REQUEST,
// 		});

// 		setTimeout( () => {
// 			dispatch({
// 				type: GET_FLIGHTS_SUCCESS,
// 				payload: flights
// 			});
// 		}, 1000);
// 	};
// }

/**
 * Запрос данных 
 * @return {Object} Объект состоя
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
 * @param  {Object} flights [description]
 * @return {Object} Объект состоя
 */
export function getDepartureFlights (flights) {
	return {
		type: GET_DEPARTURE_FLIGHTS,
		payload: flights
	};
}

/**
 * Запрос Прилетов
 * @param  {Object} flights [description]
 * @return {Object} Объект состояния
 */
export function getArrivalFlights (flights) {
	return {
		type: GET_ARRIVAL_FLIGHTS,
		payload: flights
	};
}
/**
 * Редактирует статус и фактическое время рейса
 * @param  {Object} flights    Все рейсы
 * @param  {String} flightId   Id рейса
 * @param  {String} flightType Тип рейса (вылеты\прибытие)
 * @param  {String} status     Статус рейса
 * @param  {String} timeFact   Фактическое время (вылета\прибытия)
 * @return {Object} 		   Объект состояния
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
 * @param  {Object} flights    Все рейсы
 * @param  {String} flightId   Id рейса
 * @param  {String} flightType Тип рейса (вылеты\прибытие)
 * @return {Object} 		   Объект состояния
 */
export function deleteFlight (flights, flightId, flightType) {
	flights[flightType] = flights[flightType].filter( (i)=> i.id != flightId );
	console.log(flights[flightType]);
	return {
		type: DELETE_FLIGHT,
		payload: flights
	}
}