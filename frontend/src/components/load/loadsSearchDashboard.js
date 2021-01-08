import React, { Component, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoadsSearchList from './loadsSearchList';
import LoadListFilters from './loadListFilter';
import LoadsSearchInput from './loadsSearchInput';
import { setBudgets, setProposals, setCity, setSearchTerm } from '../../actions/loadsFilters';
import ViewLoadModal from './viewLoadModal';
import { connect } from 'react-redux';
import './loadsDashboard.css';

const LoadsSearchDashboard = (props) => {
	const budgetRef = useRef([]);
	const proposalRef = useRef([]);
	const cityRef = useRef(null);
	const [ city, setCity ] = useState('');
	const [ searchTerm, setSearchTerm ] = useState('');

	useEffect(() => {
		setSearchTerm(props.loadFilters.searchTerm);
	}, []);

	const [ budgets, setBudgets ] = useState([
		{ id: 1, value: '100', name: '0 - 100 USD', isChecked: false, min: 0, max: 100 },
		{ id: 2, value: '500', name: '100 - 500 USD', isChecked: false, min: 101, max: 500 },
		{ id: 3, value: '1000', name: '500 - 1000 USD', isChecked: false, min: 501, max: 1000 },
		{ id: 4, value: '1001', name: '1000+  USD', isChecked: false, min: 1001, max: 1000000000 }
	]);

	const [ proposals, setProposals ] = useState([
		{ id: 1, value: '5', name: '0 - 5', isChecked: false },
		{ id: 2, value: '10', name: '5 - 10', isChecked: false },
		{ id: 3, value: '20', name: '10 - 20', isChecked: false },
		{ id: 4, value: '21', name: '20+ ', isChecked: false }
	]);

	const handleCheckClickedBudget = (e) => {
		budgetRef.current
			.filter((budget) => {
				return e.target.id !== budget.id;
			})
			.map((target) => {
				return (target.checked = false);
			});

		budgets.forEach((budget) => {
			if (budget.value === e.target.value) budget.isChecked = e.target.checked;
			if (budget.value !== e.target.value) budget.isChecked = false;
		});
		props.setBudgets(budgets);
	};

	const handleRemoveBudgetFilter = (e) => {
		budgetRef.current[e.target.id].checked = false;
		budgets.forEach((budget) => {
			if (budget.value === e.target.value) budget.isChecked = false;
		});
		props.setBudgets(budgets);
	};

	const handleCheckClickedProposal = (e) => {
		proposalRef.current
			.filter((budget) => {
				return e.target.id !== budget.id;
			})
			.map((target) => {
				return (target.checked = false);
			});
		proposals.forEach((proposal) => {
			if (proposal.value === e.target.value) proposal.isChecked = e.target.checked;
			if (proposal.value !== e.target.value) proposal.isChecked = false;
		});
		props.setProposals(proposals);
	};

	const handleRemoveProposalFilter = (e) => {
		proposalRef.current[e.target.id].checked = false;
		proposals.forEach((proposal) => {
			if (proposal.value === e.target.value) proposal.isChecked = false;
		});
		props.setProposals(proposals);
	};

	const handleCitySelect = (e) => {
		setCity(e.target.value);
		props.setCity(e.target.value);
	};

	const handleRemoveCityFilter = (e) => {
		setCity('');
		props.setCity('');
	};

	const handleRemoveAllFilters = (e) => {
		props.setBudgets();
		props.setProposals();
		props.setCity('');
		setCity('');

		budgetRef.current.map((budget) => {
			budget.checked = false;
		});
		proposalRef.current.map((proposal) => {
			proposal.checked = false;
		});
	};

	const handleSearchText = (e) => {
		e.preventDefault();
		props.setSearchTerm(searchTerm);
	};

	return (
		<div>
			<div className="row content-wrapper">
				<div className="col-sm-3 left-bar">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<div className="card">
							<div className="card-header">
								<div className="card-title">Filter By</div>
							</div>
							<div className="card-body">
								<div className="form-group">
									<label htmlFor="reason">Location</label>
									<select className="form-control" value={city} onChange={handleCitySelect}>
										<option>~All Cities~</option>
										<option value="Bulawayo">Bulawayo</option>
										<option value="Harare">Harare</option>
										<option value="Gweru">Gweru</option>
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="reason">Budget</label>

									{budgets.map((budget) => (
										<div key={budget.id} className="form-check mb-2 mr-sm-2">
											<input
												ref={(el) => (budgetRef.current[budget.id] = el)}
												className="form-check-input"
												type="checkbox"
												id={budget.id}
												value={budget.value}
												onChange={handleCheckClickedBudget}
											/>
											<label className="form-check-label" htmlFor="inlineFormCheck">
												{budget.name}
											</label>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-6 ">
					<div className="content-wrapper">
						<div className="card">
							<form>
								<div className="row">
									<div className="col-sm-10 search-input">
										<input
											type="text"
											className="form-control"
											value={searchTerm}
											onChange={(e) => {
												setSearchTerm(e.target.value);
											}}
										/>
									</div>
									<div className="col-sm-2 search-btn-container">
										<button
											type="submit"
											onClick={handleSearchText}
											className="btn btn-primary search-btn"
										>
											Search
										</button>
									</div>
								</div>
							</form>
						</div>

						<div className="row gutters">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div className="card">
									<div className="card-header">
										<div className="card-title">Filters</div>
									</div>
									<div className="card-body">
										<div className="form-group m-0">
											<div type="text" className="bootstrap-tagsinput">
												{props.loadFilters.budgets ? (
													props.loadFilters.budgets
														.filter((budget) => {
															return budget.isChecked === true;
														})
														.map((budget) => {
															return (
																<span key={budget.id} className="tag badge">
																	{budget.name}
																	<span data-role="remove">
																		<button
																			id={budget.id}
																			value={budget.value}
																			onClick={handleRemoveBudgetFilter}
																		>
																			x
																		</button>
																	</span>
																</span>
															);
														})
												) : (
													''
												)}

												{props.loadFilters.proposals ? (
													props.loadFilters.proposals
														.filter((proposal) => {
															return proposal.isChecked === true;
														})
														.map((proposal) => {
															return (
																<span key={proposal.id} className="tag badge">
																	{proposal.name}
																	<span data-role="remove">
																		<button
																			id={proposal.id}
																			value={proposal.value}
																			onClick={handleRemoveProposalFilter}
																		>
																			x
																		</button>
																	</span>
																</span>
															);
														})
												) : (
													''
												)}

												{city ? (
													<span className="tag badge">
														{props.loadFilters.city}
														<span data-role="remove">
															<button
																value={props.loadFilters.city}
																onClick={handleRemoveCityFilter}
															>
																x
															</button>
														</span>
													</span>
												) : (
													''
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<LoadsSearchList />
					</div>
				</div>

				<div className="col-sm-3 right-bar">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<div className="card">
							<div className="card-header">
								<div className="card-title">Profile Settings </div>
							</div>
							<div className="card-body">
								<div>Availability</div>
								<div className="custom-control custom-switch">
									<input type="checkbox" className="custom-control-input" id="customSwitch1" />
									<label className="custom-control-label" htmlFor="customSwitch1">
										On
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isSignedIn  : state.auth.isSignedIn,
		loadFilters : state.loadsfilters
	};
};

export default connect(mapStateToProps, {
	setBudgets,
	setProposals,
	setCity,
	setSearchTerm
})(LoadsSearchDashboard);
