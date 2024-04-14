import React from 'react';
import { Route, Routes } from "react-router-dom";
import AdminScreen from '../pages/Admin/Admin';
import PropTypes from "prop-types"
import CategoriesScreen from '../pages/Categories';
import ProductsScreen from '../pages/Products';

function AdminRouter({ show = false, jwt }) {
    return show ? (
        <Routes>
            <Route path="/" element={<AdminScreen />} />
            <Route path="/categorias" element={<CategoriesScreen jwt={jwt} />} />
            <Route path="/products" element={<ProductsScreen jwt={jwt} />} />
        </Routes>
    ) : (
        <h1>Usted no tiene permiso de administrador</h1>
    )
}

AdminRouter.propTypes = {
    show: PropTypes.bool.isRequired
}

export default AdminRouter