import React, { useState, useEffect } from 'react';
import "./SetearProducts.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faDollarSign, faInfoCircle, faShoppingCart, faTags, faWeight } from '@fortawesome/free-solid-svg-icons';
import API_URL from "../../common/constants"


const SetearProducts = ({ onCheckboxChange, props, handleCloseSetProductsModal }) => {
    const [selectedFields, setSelectedFields] = useState({
        marca: false,
        producto: false,
        precio: false,
        descripcion: false,
        peso: false,
        cantidad: false,
        vencimiento: true,
        categoria: true
    });
    const [fieldsSet, setFieldsSet] = useState(false);

    const handleChange = (field) => {
        setSelectedFields(prevSelectedFields => ({
            ...prevSelectedFields,
            [field]: !prevSelectedFields[field]
        }));

        onCheckboxChange({
            ...selectedFields,
            [field]: !selectedFields[field]
        });
    };

    const handleSubmit = async () => {
        try {
            console.log("Campos seleccionados:", selectedFields);
            await fetch(API_URL + '/selectedFields/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedFields),
            });

            const response = await fetch(API_URL + '/selectedFields/findLast');
            const lastSelectedFields = await response.json();
            console.log("Último registro:", lastSelectedFields);
            setFieldsSet(true);
            handleCloseSetProductsModal();
        } catch (error) {
            console.error('Error submitting selected fields:', error);
        }
    };

    return (
        <div className='setearproducts-container'>
            <div className="formulario-container">
                <div className='radio-group'>
                    <h2>Ahora vamos a manejar tus productos</h2>
                    <p className='text-center'>Selecciona como vamos a administrar tus productos:</p>
                    <form>
                        <div className="form-radio-container dos">
                            <div className="input-container">
                                <input
                                    id="marca"
                                    value="marca"
                                    type="checkbox" 
                                    checked={selectedFields.marca}
                                    onChange={() => handleChange('marca')}
                                />
                                <div className="input-title">
                                    <FontAwesomeIcon className='icon-radio' icon={faTags} />
                                    <label>
                                        Marca
                                    </label>
                                </div>

                            </div>
                            <div className="input-container">
                                <input
                                    id="producto"
                                    value="producto"
                                    type="checkbox"
                                    
                                    checked={selectedFields.producto}
                                    onChange={() => handleChange('producto')}
                                />
                                <div className="input-title">
                                    <FontAwesomeIcon className='icon-radio' icon={faShoppingCart} />
                                    <label>
                                        Producto
                                    </label>
                                </div>
                            </div>
                            <div className="input-container">
                                <input
                                    id="precio"
                                    value="precio"
                                    type="checkbox"
                                    
                                    checked={selectedFields.precio}
                                    onChange={() => handleChange('precio')}
                                />
                                <div className="input-title">
                                    <FontAwesomeIcon className='icon-radio' icon={faDollarSign} />
                                    <label>
                                        Precio
                                    </label>
                                </div>
                            </div>
                            <div className="input-container">
                                <input
                                    id="descripcion"
                                    value="descripcion"
                                    type="checkbox"
                                    
                                    checked={selectedFields.descripcion}
                                    onChange={() => handleChange('descripcion')}
                                />
                                <div className="input-title">
                                    <FontAwesomeIcon className='icon-radio' icon={faInfoCircle} />
                                    <label>
                                        Descripcion
                                    </label>
                                </div>
                            </div>
                            <div className="input-container">
                                <input
                                    id="peso"
                                    value="peso"
                                    type="checkbox"
                                    
                                    checked={selectedFields.peso}
                                    onChange={() => handleChange('peso')}
                                />
                                <div className="input-title">
                                    <FontAwesomeIcon className='icon-radio' icon={faWeight} />
                                    <label>
                                        Peso
                                    </label>
                                </div>
                            </div>
                            <div className="input-container">
                                <input
                                    id="cantidad"
                                    value="cantidad"
                                    type="checkbox"
                                    
                                    checked={selectedFields.cantidad}
                                    onChange={() => handleChange('cantidad')}
                                />
                                <div className="input-title">
                                    <FontAwesomeIcon className='icon-radio' icon={faBoxes} />
                                    <label>
                                        Cantidad
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="modalfooter">
                        <button className='btn-solid' onClick={handleSubmit}>Finalizar</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SetearProducts;