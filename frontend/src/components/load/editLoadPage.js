import React from 'react';
import { connect } from 'react-redux';
import { fetchLoad, updateLoad } from '../../actions/loads';
import _ from 'lodash';

import LoadForm from './loadForm';

class EditLoadPage extends React.Component {
	componentDidMount() {
		this.props.fetchLoad(this.props.match.params.id);
	}
	onSubmit = (formValues) => {
		this.props.updateLoad(this.props.match.params.id, formValues);
	};

	renderComponentDetails = () => {
		if (!this.props.load) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<div className='page-header'>
					<ol className='breadcrumb'>
						<li className='breadcrumb-item active'>Edit Load {this.props.match.params.id}</li>
					</ol>
				</div>

				<div className='content-wrapper'>
					<LoadForm
						onSubmit={this.onSubmit}
						initialValues={_.pick(this.props.load, 'from', 'to', 'weight', 'budget', 'description')}
					/>
				</div>
			</div>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		load : state.loads[ownProps.match.params.id]
	};
};

export default connect(mapStateToProps, { fetchLoad, updateLoad })(EditLoadPage);
