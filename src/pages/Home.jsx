import React, { useEffect } from 'react';
import { Container } from "react-bootstrap"
import LogoLargo from "../assets/logo-largo.png"
import Foto1 from "../assets/National Safety Month June 2019.jpg"
import Foto2 from "../assets/Premium Photo _ Focused warehouse manager writing on clipboard.jpg"
import Foto3 from "../assets/Mobile Mechanic or a Repair Shop which is the best choice.jpg"
import Icon1 from "../assets/icono-perdidas.png"
import Icon2 from "../assets/icono-stock.png"
import Icon3 from "../assets/icono-vencimiento.png"
import "../pages/Home.css"
import Aos from 'aos';
import 'aos/dist/aos.css';


const HomeScreen = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=5493816671884&text=Hola,%20quiero%20contratar%20Stock%20Manager.&type=phone_number&app_absent=0";
  useEffect(() => {
    Aos.init()
  })
  return (
    <>
      <div className="hero" data-aos="zoom-in">
        <div className="title-hero">
          <h5>SOLUCION DE GESTIÓN DE STOCK PARA PYMES</h5>
          <h1>Stock Manager</h1>
          <p>Simplificamos la gestion del manejo de vencimiento de tu stock.</p>
        </div>
      </div>

      <div className="section-0">
        <h2 className='title' data-aos="fade-right">Bienvenido a Stock Manager</h2>
        <div className="about" style={
          {
            display: "flex",
            gap: "20px"
          }
        }>
          <p data-aos="fade-right">
            En Stock Manager, estamos comprometidos a simplificar la gestión de productos para tu negocio.
            Nuestra aplicación te ofrece una solución intuitiva y eficiente para administrar tus productos
            de manera personalizada y mantener un control total sobre tu inventario. <br /> <br />

            Con nuestra interfaz fácil de usar y opciones de configuración flexible,
            podrás adaptar la aplicación a las necesidades específicas de tu negocio en cuestión de minutos.
            ¿Quieres recibir alertas diarias sobre productos próximos al vencimiento?
            ¿Necesitas categorizar tus productos de manera precisa y eficiente?
            ¡Con Stock Manager, todo es posible! <br /> <br />

            Ya sea que administres un pequeño comercio o una cadena de tiendas,
            nuestra aplicación está diseñada para simplificar tus operaciones diarias y ayudarte a optimizar tu negocio.
            No pierdas más tiempo con procesos complicados y tediosos.
            ¡Únete a la comunidad de usuarios satisfechos de Stock Manager y lleva la gestión de productos al siguiente nivel!
          </p>
          <img src={Foto1} alt="" data-aos="fade-left" style={
            {
              width: "50%",
              borderRadius: "5px"
            }
          } />
        </div>
      </div>



      <div className="cards-container mt-5 mb-5">
        <div className="cards" data-aos="fade-up">
          <div className="card">
            <img src={Icon1} alt="" style={{
              width: "200px"
            }} />
            <h6>Basta de perder dinero y mercaderia</h6>
          </div>
          <div className="card">
            <img src={Icon2} alt="" style={{
              width: "200px"
            }} />
            <h6>Lleva un control total de tu Stock</h6>
          </div>
          <div className="card">
            <img src={Icon3} alt="" style={{
              width: "200px"
            }} />
            <h6>Constantes alertas de vencimiento</h6>
          </div>
        </div>
      </div>

      <div className="info-cards mt-5 mb-5">
        <ul data-aos="fade-up">
          <li style={{ borderRight: '1px solid #000', paddingRight: '20px', marginRight: '10px' }}><p>Deja de perder dinero por controles anticuados e imprecisos de tu mercaderia que se vence y tenes que tirarla.</p></li>
          <li style={{ borderRight: '1px solid #000', paddingRight: '20px', marginRight: '10px' }}><p>Lleva un control absoluto y detallado de cada producto de tu stock, registralo en cuestion de minutos y deja de perder mercaderia. </p></li>
          <li><p>Programa cada cuanto tiempo previo al vencimiento queres tus alertas y pedi el cambio o hace un descuento a tiempo.</p></li>
        </ul>
      </div>

      <div className="section-1">
        <img src={Foto2} data-aos="fade-right" alt="" style={{ borderRadius: "5px" }} />
        <div className="text-s1" data-aos="fade-left">
          <h3>El software de control de stock para impulsar tu empresa al futuro.</h3>
          <p>
            ¿Sentis que perdes el tiempo anotando tu stock? ¿Cansado de perder dinero por qué se vencen tus productos? <br /> <br />
            ¡Basta de perder  tiempo y dinero te presentamos Stock Manager!  <br /> <br />
            Nuestra revolucionaria aplicación te brinda el poder de controlar cada aspecto de tu inventario
            con facilidad y precisión. Desde alertas programables sobre productos próximos al vencimiento
            hasta una configuración ultra rápida, Stock Manager te pone en el asiento del conductor de tu negocio.
            ¡Contrata ahora y descubre cómo puedes transformar tu gestión de inventario en una experiencia fluida y rentable!
            No dejes que la competencia te supere, ¡toma el control con Stock Manager hoy mismo!
          </p>
        </div>

      </div>

      <div className="service-container" data-aos="fade-up">
        <h2>Contrata nuestro servicio</h2>
        <div className="service-content">
          <div className="cards-service" data-aos="fade-right">
            <div className="card card-service" style={{height: "80%"}}>
              <h3>Compra nuestro servicio</h3>
              <p>Adquiri nuestro servicio de forma definitiva con un gran descuento pagando de contado.</p>
              <ul>
                <li>Atencion al cliente 24hs.</li>
                <li>Dominio y pagina .com.ar gratis.</li>
                <li>Mantenimiento contante.</li>
              </ul>
              <button className='contratar'>Contratar servicio</button>
            </div>
            <div className="card card-service" style={{height: "80%"}}>
              <h3>Financia nuestro servicio</h3>
              <p>Adquiri nuestro servicio de forma definitiva en comodas cuotas mensuales.</p>
              <ul>
                <li>Atencion al cliente 24hs.</li>
                <li>Dominio y pagina .com.ar con un increible descuento.</li>
                <li>Mantenimiento contante.</li>
              </ul>
              <button className='contratar'>Contratar servicio</button>
            </div>
          </div>
          <img src={Foto3} alt="" style={{width:"40%",  borderRadius: "5px"}} data-aos="fade-left"/>
        </div>


      </div>

      <div className="footer" data-aos="fade-up">
      <h7>Tambien podes:</h7>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <button className='whatsapp'>Contactar por WhatsApp</button>
        </a>
        <img src={LogoLargo} alt="" style={{ width: "30rem" }} />

      </div>
    </>
  )
}

export default HomeScreen