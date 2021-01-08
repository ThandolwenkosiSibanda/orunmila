import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import './starRating.css';

class ratingQualityOfService extends Component {
	constructor(props) {
		super(props);
		this.state = {
			star1 : 0,
			star2 : 0,
			star3 : 0,
			star4 : 0,
			star5 : 0
		};
	}

	componentDidMount() {
		this.setRating();
	}
	componentDidUpdate() {
		const currentState = _.sum(_.values(this.state));
		this.props.total(currentState);
	}

	hoverHandler = (e) => {
		const starkey = e.target.dataset.key;

		switch (starkey) {
			case '1':
				this.state.star1 === 0 ? this.setState({ star1: 1 }) : this.setState({ star1: 0 });
				break;
			case '2':
				this.state.star2 === 0 ? this.setState({ star2: 1 }) : this.setState({ star2: 0 });
				break;
			case '3':
				this.state.star3 === 0 ? this.setState({ star3: 1 }) : this.setState({ star3: 0 });
				break;
			case '4':
				this.state.star4 === 0 ? this.setState({ star4: 1 }) : this.setState({ star4: 0 });
				break;
			case '5':
				this.state.star5 === 0 ? this.setState({ star5: 1 }) : this.setState({ star5: 0 });
				break;
			default:
				break;
		}
		// const stars = ev.target.parentElement.getElementsByClassName('star');
		// const hoverValue = ev.target.dataset.value;
		// Array.from(stars).forEach((star) => {
		// 	star.style.color = hoverValue >= star.dataset.value ? '#093FAB' : 'gray';
		// });
		// console.log('Hover');
	};

	setRating = (ev) => {
		// const stars = this.refs.rating.getElementsByClassName('star');
		// Array.from(stars).forEach((star) => {
		// 	star.style.color = this.state.currentRating >= star.dataset.value ? '#093FAB' : 'gray';
		// });

		const stars = this.refs.rating.getElementsByClassName('star');
		Array.from(stars).forEach((star) => {
			// star.style.color = this.state.currentRating >= star.dataset.value ? '#093FAB' : 'gray';
			// star.style.color = '#093FAB';
			// star.style.color = star.dataset.value === '1' ? '#093FAB' : 'gray';
			// console.log(star);
		});
	};

	handleChange = (e) => {
		console.log('This is the message');
		// return <p>{this.props.total(this.countTotal())}</p>;
		// this.props.total(this.countTotal());
		return 2;
	};

	starClickHandler = (e) => {
		const starkey = e.target.dataset.key;

		switch (starkey) {
			case '1':
				this.state.star1 === 0 ? this.setState({ star1: 1 }) : this.setState({ star1: 0 });
				break;
			case '2':
				this.state.star2 === 0 ? this.setState({ star2: 1 }) : this.setState({ star2: 0 });
				break;
			case '3':
				this.state.star3 === 0 ? this.setState({ star3: 1 }) : this.setState({ star3: 0 });
				break;
			case '4':
				this.state.star4 === 0 ? this.setState({ star4: 1 }) : this.setState({ star4: 0 });
				break;
			case '5':
				this.state.star5 === 0 ? this.setState({ star5: 1 }) : this.setState({ star5: 0 });
				break;
			default:
				break;
		}

		// this.setState({ star1: 1 });
		// let rating = ev.target.dataset.value;
		// this.setState({ currentRating: rating }); // set state so the rating stays highlighted
		// if (this.props.onClick) {
		// 	this.props.onClick(rating); // emit the event up to the parent
		// }

		// console.log('Clicked');

		// console.log(this.state);

		// let total = this.state.star1 + this.state.star2 + this.state.star3 + this.state.star4 + this.state.star5;
		// console.log('em', total);

		// this.props.total(this.state.star1 + this.state.star2 + this.state.star3 + this.state.star4 + this.state.star5);
	};

	countTotal = () => {
		let total = this.state.star1 + this.state.star2 + this.state.star3 + this.state.star4 + this.state.star5;
		// console.log('onchange', total);
		// this.props.total(total);
		return total;
	};

	render() {
		return (
			<React.Fragment>
				<span ref="rating">
					<span
						className={this.state.star1 === 1 ? 'star checked' : 'star'}
						key={1}
						data-value={1}
						onClick={this.starClickHandler}
						value={this.state.star1}
						data-key={1}
					>
						&#9733;
					</span>

					<span
						className={this.state.star2 === 1 ? 'star checked' : 'star'}
						key={2}
						data-value={2}
						onClick={this.starClickHandler}
						value={this.state.star2}
						data-key={2}
					>
						&#9733;
					</span>

					<span
						className={this.state.star3 === 1 ? 'star checked' : 'star'}
						key={3}
						data-value={3}
						onClick={this.starClickHandler}
						value={this.state.star3}
						data-key={3}
					>
						&#9733;
					</span>

					<span
						className={this.state.star4 === 1 ? 'star checked' : 'star'}
						key={4}
						data-value={4}
						onClick={this.starClickHandler}
						value={this.state.star4}
						data-key={4}
					>
						&#9733;
					</span>

					<span
						className={this.state.star5 === 1 ? 'star checked' : 'star'}
						key={5}
						data-value={5}
						onClick={this.starClickHandler}
						value={this.state.star5}
						data-key={5}
					>
						&#9733;
					</span>
				</span>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return { selectedLoad: state.selectedLoad };
};

export default connect(mapStateToProps)(ratingQualityOfService);
