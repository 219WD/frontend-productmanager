import React, { useEffect } from 'react'
import Aos from 'aos';
import 'aos/dist/aos.css';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoLargo from "../assets/logo-largo.png"

const Footer = () => {
    const whatsappLink = "https://api.whatsapp.com/send/?phone=5493816671884&text=Hola,%20quiero%20contratar%20Stock%20Manager.&type=phone_number&app_absent=0";
    useEffect(() => {
        Aos.init()
      })
    return (
        <footer className="footer" data-aos="fade-up">
            <h5>Tambien podes:</h5>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <button className='btn-solid whatsapp'><FontAwesomeIcon className='icono' icon={faWhatsapp} /> Contactar por WhatsApp</button>
            </a>
            <img src={LogoLargo} className='logo-footer' alt="" />

        </footer>
    )
}

export default Footer