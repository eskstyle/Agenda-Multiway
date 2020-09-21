import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actionTypes';

class Logout extends React.Component {

    componentDidMount() {
        this.props.onLogout();
    }
    
    render() {
        return null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({ type: actionTypes.LOGOUT })
    };
};

export default connect(null, mapDispatchToProps)(Logout);