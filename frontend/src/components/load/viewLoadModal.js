import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

const ViewLoadModal = (props) => (
<div></div>
);

const MapStateToProps = (state, props) => {
	return {
		load   : _.toArray(state.loads).find((load) => load._id == props.loadId),
		credit : state.credits.length
	};
};
export default connect(MapStateToProps)(ViewLoadModal);
