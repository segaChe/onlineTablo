'use strict';

import { GET_FLIGHTS_REQUEST, 
		 GET_FLIGHTS_SUCCESS,
		 GET_DEPARTURE_FLIGHTS, 
		 GET_ARRIVAL_FLIGHTS,
		 DELETE_FLIGHT,
		 EDIT_FLIGHT } from '../constants/constants';

const initialState = {
	showFlights: [],
	flights: {},
	header: '',
	fetching: true
};

export default function tablo (state=initialState, action) {
	switch (action.type) {
		case GET_FLIGHTS_REQUEST:
			return Object.assign({}, state, {
        				fetching: true
      				});
		case GET_FLIGHTS_SUCCESS:
			return Object.assign({}, state, {
        				flights: action.payload,
        				showFlights: action.payload.DepartureFlights,
        				header: 'Вылеты',
        				fetching: false
      				});
		//
		case GET_DEPARTURE_FLIGHTS:
			return Object.assign({}, state, {
        				showFlights: action.payload.DepartureFlights,
        				header: 'Вылеты',
      				});

		case GET_ARRIVAL_FLIGHTS:
			return Object.assign({}, state, {
        				showFlights: action.payload.ArrivalFlights,
        				header: 'Прибытие',
      				});

		case EDIT_FLIGHT:
			return Object.assign({}, state, {
        				flights: action.payload,
      				});

		case DELETE_FLIGHT:
			return Object.assign({}, state, {
        				flights: action.payload,
      				});
		default:
			return state;
	}
}