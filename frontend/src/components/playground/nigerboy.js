/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { For } from 'react-loops';
import _ from 'lodash';
import { Table, Accordion, Message, Button } from 'semantic-ui-react';

import courierOrdersRoutine from './routines';
import styles from './courier_orders.module.css';

/**
 * Courier orders component.
 *
 * @component
 */

function CourierOrders(props) {
	useEffect(() => {
		const { getCourierOrders, courierId } = props;
		getCourierOrders(courierId);
	}, []);

	const { orders } = props;

	const [
		activeIndex,
		setCount
	] = useState(0);

	const tbl = (
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Collection Point:</Table.HeaderCell>
				<Table.HeaderCell>Delivered To:</Table.HeaderCell>
				<Table.HeaderCell>Phone Number:</Table.HeaderCell>
				<Table.HeaderCell>Email Address:</Table.HeaderCell>
				<Table.HeaderCell>Notes:</Table.HeaderCell>
			</Table.Row>
			<For
				of={orders}
				as={(order) => (
					<Table.Row>
						<Table.Cell>
							1st Avenue, opposite <br /> robert mugabe road
						</Table.Cell>
						<Table.Cell>
							{order.recipient.first_name} {order.recipient.last_name}
							<br />
							{order.recipient.address_line_1} <br />
							{order.recipient.address_line_2} <br />
							{order.recipient.address_line_3} <br />
						</Table.Cell>
						<Table.Cell>
							{order.recipient.phone_number_1} <br />
							{order.recipient.phone_number_2} <br />
						</Table.Cell>
						<Table.Cell>{order.recipient.email_address}</Table.Cell>
						<Table.Cell> </Table.Cell>
					</Table.Row>
				)}
			/>
		</Table.Header>
	);

	const headerCard = (
		<Table.Header>
			<For
				of={orders}
				as={(order) => (
					<Table.Row key={order.id}>
						<Table.HeaderCell>{order.id}</Table.HeaderCell>
						<Table.HeaderCell>{order.date_created}</Table.HeaderCell>
						<Table.HeaderCell>12</Table.HeaderCell>
						<Table.HeaderCell>{order.state}</Table.HeaderCell>
						<Table.HeaderCell> </Table.HeaderCell>
						<Table.HeaderCell>{order.delivery_method}</Table.HeaderCell>
						<Table.HeaderCell>
							<Button size='mini' basic primary>
								Collected
							</Button>
							<Button size='mini' basic positive>
								Delivered
							</Button>
						</Table.HeaderCell>
					</Table.Row>
				)}
			/>
		</Table.Header>
	);

	const panels = _.times(1, () => ({
		key     : 1,
		title   : {
			as          : Table,
			children    : headerCard,
			placeholder : 'orders'
		},
		content : {
			as          : Table,
			children    : tbl,
			placeholder : 'Maiden Name'
		}
	}));

	return (
		<For of={orders}>
			{(order) => (
				<Accordion key={order.id} defaultActiveIndex={order.id} panels={panels} exclusive={true} fluid />
			)}
		</For>
	);
}

CourierOrders.defaultProps = {
	orders : []
};

CourierOrders.propTypes = {
	courierId        : PropTypes.number.isRequired,
	getCourierOrders : PropTypes.func.isRequired,
	orders           : PropTypes.shape({
		id              : PropTypes.number,
		state           : PropTypes.string,
		delivery_method : PropTypes.string,
		date_created    : PropTypes.string,
		age             : PropTypes.number
	})
};

function mapStateToProps(state) {
	return {
		orders : state.getIn([
			'courierOrders',
			'orders'
		])
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getCourierOrders : (courierId, pageNumber, pageSize) =>
			dispatch(courierOrdersRoutine.trigger({ courierId, pageNumber, pageSize }))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CourierOrders);
