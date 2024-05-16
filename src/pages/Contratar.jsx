import React from 'react';
import API_URL from "../common/constants"
import "./Contratar.css"



const Contratar = () => {
    const FuncionComprar = async (servicio) => {
        try {
            const response = await fetch(API_URL + "/Mercado_Pago", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(servicio)
            });

            if (!response.ok) {
                throw new Error("Error al procesar la solicitud");
            }

            const responseData = await response.json();
            window.location.href = responseData.result;
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const servicio = {
        title: "Stock Manager",
        unit_price: 500,
        currency_id: "ARS",
        quantity: 1,
    };

    return (
        <div className="wrapper">
            <div className="pricing-table gprice-single">
                <div className="head">
                    <h4 className="title">Suscribite a Stock Manager</h4>
                </div>
                <div className="content">
                    <div className="price">
                        <h1>$50.000</h1>
                    </div>
                    <ul>
                        <li>Almacenamiento para 400.000 productos</li>
                        <li>Atencion personalizada</li>
                        <li><del>Dominio .com.ar</del></li>
                        <li><del>Landing page con boton a whatsapp</del></li>
                        <li><del>Constante mantenimiento</del></li>
                        <li><del>Atencion al cliente 24hs</del></li>

                    </ul>
                    <div className="sign-up">
                        <button className='btn-solid contratar' onClick={() => FuncionComprar(servicio)}>Comprar</button>
                    </div>
                </div>
            </div>
            <div className="pricing-table gprice-single">
                <div className="head">
                    <h4 className="title">Financia Stock Manager</h4>
                    <p>En cuotas mensuales de $100.000</p>
                </div>
                <div className="content">
                    <div className="price">
                        <h1>$1.200.000</h1>
                    </div>
                    <ul>
                        <li>Almacenamiento para 400.000 productos</li>
                        <li>Atencion personalizada</li>
                        <li>Dominio .com.ar</li>
                        <li>Landing page con boton a whatsapp</li>
                        <li>Constante mantenimiento</li>
                        <li><del>Atencion al cliente 24hs</del></li>
                    </ul>
                    <div className="sign-up">
                        <button className='btn-solid contratar' onClick={() => FuncionComprar(servicio)}>Comprar</button>
                    </div>
                </div>
            </div>
            <div className="pricing-table gprice-single">
                <div className="head">
                    <h4 className="title">Compra Stock Manager</h4>
                </div>
                <div className="content">
                    <div className="price">
                        <h1>{`$ ${servicio.unit_price}`}</h1>
                    </div>
                    <ul>
                        <li>Almacenamiento para 400.000 productos</li>
                        <li>Atencion personalizada</li>
                        <li>Dominio .com.ar</li>
                        <li>Landing page con boton a whatsapp</li>
                        <li>Constante mantenimiento</li>
                        <li>Atencion al cliente 24hs</li>
                    </ul>
                    <div className="sign-up">
                        <button className='btn-solid contratar' onClick={() => FuncionComprar(servicio)}>Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contratar;
