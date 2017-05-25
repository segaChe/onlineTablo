'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FlightsTable from './FlightsTable';
import AdminTablo from './AdminTablo';

import '../style/tablo.css';

export default class Tablo extends Component {
	/**
	 * @constructor
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	constructor(props) {
		super(props);
		this.props.fetchFlights();
		this.state = {
			flightsIsEdit: false,
			adminBtnText: 'Открыть'
		}
	}

	onAdminBtnClick(event) {
		this.setState({flightsIsEdit: !this.state.flightsIsEdit});
		if (!this.state.flightsIsEdit) {
			this.setState({adminBtnText: 'Закрыть'});
		} else {
			this.setState({adminBtnText: 'Открыть'});
		}
	}

	render() {
		
		const { flights, fetching, showFlights, header } = this.props;
		const { getArrivalFlights, 
				getDepartureFlights,
				editFlight,
				deleteFlight } = this.props;

		return (
		  <div className="tablo_content_wrap">
		    {
            	fetching ?  <p>Loading</p> :
            	<div className="tablo_content">
            		<div className="adminBtn_wrap">
            			<span className="adminBtn_Header">Панель администратора</span>
						<button className="adminBtn button" onClick={::this.onAdminBtnClick} >
							{this.state.adminBtnText}
						</button>
					</div>
					{ this.state.flightsIsEdit ? 
						<AdminTablo 
							flights={flights} 
							getDepartureFlights={getDepartureFlights}
							getArrivalFlights={getArrivalFlights}
							editFlight={editFlight}
							deleteFlight={deleteFlight}
							showFlights={showFlights}
            				header={header} /> :
					
            			<FlightsTable
            				flights={flights} 
            				showFlights={showFlights}
            				header={header}
            				getArrivalFlights={getArrivalFlights}
            				getDepartureFlights={getDepartureFlights}
            				adminFlights={''} />
            		}
            	</div>
          	}	
		  </div>
		);
	}
}

Tablo.propTypes = {
  flights: PropTypes.object.isRequired,
  fetchFlights: PropTypes.func.isRequired,
  getDepartureFlights: PropTypes.func.isRequired,
  getArrivalFlights: PropTypes.func.isRequired,
  showFlights: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  editFlight: PropTypes.func.isRequired,
  deleteFlight: PropTypes.func
};