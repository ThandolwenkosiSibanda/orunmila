import React, { Component } from 'react';

class ChatroomsSearch extends Component {
	render() {
		return (
			<div className='chat-search-box'>
				<div className='input-group'>
					<input className='form-control' placeholder='Search' />
					<div className='input-group-btn'>
						<button type='button' className='btn btn-primary'>
							<i className='icon-magnifying-glass' />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ChatroomsSearch;
