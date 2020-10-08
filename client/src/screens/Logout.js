import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/actions/index';

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
        onLogout: () => dispatch(logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);