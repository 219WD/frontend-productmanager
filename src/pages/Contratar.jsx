//No logre integrar MercadoPago esta muy mal el doc de mercadopago developers, perdon :'(
import React, { useState } from 'react';
import Foto3 from '../assets/pexels-gustavo-fring-4173320.jpg';
import API_URL from "../common/constants"


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
            window.location.href = responseData;
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const servicio = {
        nombre: "Stock Manager",
        precio: 300000,
    };

    return (
        <div className="service-container" data-aos="fade-up">
            <h2>Contrata nuestro servicio</h2>
            <div className="service-content">
                <div className="cards-service" data-aos="fade-right">
                    <div className="card card-service" style={{ height: "100%" }}>
                        <h3>Compra nuestro servicio</h3>
                        <p>{servicio.nombre}</p>
                        <p>Adquirí nuestro servicio de forma definitiva con un gran descuento pagando de contado.</p>
                        <ul>
                            <li>Atención al cliente 24hs.</li>
                            <li>Dominio y página .com.ar gratis.</li>
                            <li>Mantenimiento constante.</li>
                        </ul>
                        <h5>PRECIO:</h5>
                        <p>{`$ ${servicio.precio}`}</p>
                        <button onClick={() => FuncionComprar(servicio)}>Comprar</button>
                    </div>
                </div>
                <img src={Foto3} alt="" style={{ width: "40%", height: "100%", borderRadius: "5px" }} data-aos="fade-left" />
            </div>
        </div>
    );
}

export default Contratar;
