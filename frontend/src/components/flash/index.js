import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteFlashMessage } from '../../actions/flashMessages';

import './index.css';

const Flash = (props) => {
	let [ visibility, setVisibility ] = useState(true);
	let [ message, setMessage ] = useState('');
	let [ type, setType ] = useState('');

	useEffect(
		() => {
			setTimeout(() => {
				props.deleteFlashMessage();
				setVisibility(false);
			}, 4000);
		},
		[ props.flashMessage ]
	);

	return (
		visibility && (
			<React.Fragment>
				{props.flashMessage && props.flashMessageType === 'success' ? (
					<div className="alert alert-success alert-dismissible fade show" role="alert">
						{props.flashMessage}
						<button type="button" className="close" data-dismiss="alert" aria-label="Close">
							<span
								aria-hidden="true"
								onClick={() => {
									setVisibility(false);
								}}
							>
								&times;
							</span>
						</button>
					</div>
				) : props.flashMessage ? (
					<div className="alert alert-danger alert-dismissible fade show" role="alert">
						{props.flashMessage}
						<button type="button" className="close" data-dismiss="alert" aria-label="Close">
							<span
								aria-hidden="true"
								onClick={() => {
									setVisibility(false);
								}}
							>
								&times;
							</span>
						</button>
					</div>
				) : (
					''
				)}
			</React.Fragment>
		)
	);
};

const mapStateToProps = (state) => {
	return {
		flashMessage     : state.flashMessage.message,
		flashMessageType : state.flashMessage.type
	};
};

export default connect(mapStateToProps, { deleteFlashMessage })(Flash);
