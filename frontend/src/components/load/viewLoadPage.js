import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLoad } from '../../actions/loads';
import LoadView from './loadView';
import LoadCard from './loadCard';
import { fetchLoad } from '../../actions/loads';

class viewLoadPage extends React.Component {
	componentDidMount() {
		this.props.fetchLoad(this.props.match.params.id);
	}

	renderComponentDetails = () => {
		if (!this.props.load) {
			return <div>Loading</div>;
		}
		return (
			<div>
				<div className='page-header'>
					<ol className='breadcrumb'>
						<li className='breadcrumb-item active'>Load: #{this.props.match.params.id}</li>
					</ol>
				</div>

				<div className='content-wrapper'>
					<LoadCard {...this.props.load} />
				</div>
			</div>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state, OwnProps) => {
	return {
		load : state.loads[OwnProps.match.params.id]
	};
};

export default connect(mapStateToProps, { fetchLoad })(viewLoadPage);
