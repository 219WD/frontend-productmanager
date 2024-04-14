import React from 'react';
import { Route, Routes } from "react-router-dom";
import UserScreen from '../pages/User/User';
import RecoveryScreen from '../pages/User/RecoveryPassword';
import PropTypes from "prop-types"

function UserRouter({ show = false }) {
    return (
            show ? (
            <Routes>
                <Route path="/" element={<UserScreen />} />
                <Route path="/recovery-password" element={<RecoveryScreen />} />
            </Routes>
            ) : (
            <h1>Usted no inicio sesion</h1>
            )
    );
}

UserRouter.propTypes = {
    show: PropTypes.bool.isRequired
}

export default UserRouter