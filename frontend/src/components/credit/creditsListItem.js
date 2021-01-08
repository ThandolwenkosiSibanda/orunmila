import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';

const CreditsListItem = (props) => {
	return (
		<tr>
			<td>{moment(props.createdAt).format('LLL')}</td>
			<td>{props.reference}</td>
			<td>{props.origin}</td>
			<td>{props.amount}</td>
			<td>{props.value}</td>
		</tr>
	);
};

// class CreditsListItem extends Component {
// 	renderComponentDetails = () => {
// 		if (!this.props) {
// 			return <tr>Waiting</tr>;
// 		}
// 		return (
// 			<tr>
// 				<td>{moment(this.props.createdAt).format('LLL')}</td>
// 				<td>{this.props.reference}</td>
// 				<td>{this.props.origin}</td>
// 				<td>{this.props.amount}</td>
// 				<td>{this.props.value}</td>
// 			</tr>
// 		);
// 	};
// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

export default CreditsListItem;
