import React, { PropTypes } from 'react';  
import { connect } from 'react-redux';  
import { push } from 'react-router-redux';

export default function (ComposedComponent) {  
  class Authenticate extends React.Component {
    static propTypes = {
      isSigned: PropTypes.boolean,
      redirect: PropTypes.func.isRequired
    };

    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { isSigned, redirect } = this.props;

      if (!isSigned) {
        redirect();
      }
    }

    render() {
      return (
        <div>
          { this.props.isSigned ? <ComposedComponent {...this.props} /> : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isSigned
    };
  };
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    redirect: () => push('/login')
  }, dispatch)
  
  Authenticate.propTypes = propTypes

  return connect(
    mapStateToProps, 
    mapDispatchToProps
  )(Authenticate);
}