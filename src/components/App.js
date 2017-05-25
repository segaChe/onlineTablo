'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tablo from './Tablo';
import * as fetchAction from '../actions/FetchAction';
import '../style/app.css';

class App extends Component {
	/**
	 * @constructor
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	constructor (props) {
		super(props);
		this.state = {
			tabloIsOpen: false,
			tabloOpenBtnText: 'Открыть табло'
		}; 
	} 
	/**
	 * 
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	onTabloOpenBtnClick(event) {
		this.setState({tabloIsOpen: !this.state.tabloIsOpen});
		if (!this.state.tabloIsOpen) {
			this.setState({tabloOpenBtnText: 'Закрыть табло'});
		} else {
			this.setState({tabloOpenBtnText: 'Открыть табло'});
		}
	}

	render () {
		const { tablo } = this.props;
		const { fetchFlights, 
				getDepartureFlights, 
				getArrivalFlights,
				editFlight, 
				deleteFlight } = this.props.fetchAction;
		const { tabloOpenBtnText, tabloIsOpen } = this.state;

		return (
			<div className="tablo_container">
				<div className="tablo_header">Online Табло</div>
				<button className="tablo_openBtn button" onClick={::this.onTabloOpenBtnClick}>
					{ tabloOpenBtnText }
				</button>
				{ tabloIsOpen ?
					<Tablo 
						flights={tablo.flights}
						showFlights={tablo.showFlights} 
						fetchFlights={fetchFlights}
						getDepartureFlights={getDepartureFlights}
						getArrivalFlights={getArrivalFlights}
						editFlight={editFlight}
						deleteFlight={deleteFlight}
						header={tablo.header}
						fetching={tablo.fetching} /> :
					<p></p>
				}
			</div>
		);
	}
}

/**
 * 
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function mapStateToProps (state) {
  return {
   tablo: state.tablo
  }
}
/**
 * 
 * @param  {[type]} dispatch [description]
 * @return {[type]}          [description]
 */
function mapDispatchToProps(dispatch) {
  return {
    fetchAction: bindActionCreators(fetchAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);