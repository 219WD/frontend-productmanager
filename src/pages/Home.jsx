import React, { useEffect } from 'react';
import { Container } from "react-bootstrap"
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
  useEffect(() => {
    Aos.init()
  })
  return (
    <div className='container-home'>
      <div className="hero">
        <div className="title-hero">
          <h4 className='subtitulo'>SOLUCION DE GESTIÓN DE STOCK PARA PYMES</h4>
          <h1>Stock Manager</h1>
          <p className='subtitulo'>Simplificamos la gestion del manejo de vencimiento de tu stock.</p>
        </div>
      </div>

      <div className="section-0">
        <h2 className='title' data-aos="fade-right">Bienvenido a Stock Manager</h2>
        <div className="about">
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
          <img className='foto1' src={Foto1} alt="" data-aos="fade-left" />
        </div>
      </div>



      <div className="cards-container">
        <div className="cards" data-aos="fade-up">
          <div className="card">
            <img src={Icon1} className='foto-icon' alt="" />
            <h6>Deja de perder dinero y mercaderia</h6>
          </div>
          <div className="card">
            <img src={Icon2} className='foto-icon' alt="" />
            <h6>Lleva un control total de tu Stock</h6>
          </div>
          <div className="card">
            <img src={Icon3} className='foto-icon' alt="" />
            <h6>Constantes alertas de vencimiento</h6>
          </div>
        </div>
      </div>

      <div className="info-cards">
        <ul data-aos="fade-up">
          <li><p>Deja de perder dinero por controles anticuados e imprecisos de tu mercaderia que se vence y tenes que tirarla.</p></li>
          <li><p>Lleva un control absoluto y detallado de cada producto de tu stock, registralo en cuestion de minutos y deja de perder mercaderia. </p></li>
          <li className='border-none'><p>Programa cada cuanto tiempo previo al vencimiento queres tus alertas y pedi el cambio o hace un descuento a tiempo.</p></li>
        </ul>
      </div>

      <div className="section-1">
        <img src={Foto2} data-aos="fade-right" alt="" style={{ borderRadius: "5px" }} />
        <div className="text-s1" data-aos="fade-left">
          <h2 className='title'>El software de control de stock para impulsar tu empresa al futuro.</h2>
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
            <div className="card card-service">
              <h3>Compra nuestro servicio</h3>
              <p>Adquiri nuestro servicio de forma definitiva con un gran descuento pagando de contado.</p>
              <ul>
                <li>Atencion al cliente 24hs.</li>
                <li>Dominio y pagina .com.ar gratis.</li>
                <li>Mantenimiento constante.</li>
              </ul>
              <button className='btn-solid contratar'>Contratar servicio</button>
            </div>
            <div className="card card-service">
              <h3>Financia nuestro servicio</h3>
              <p>Adquiri nuestro servicio de forma definitiva en comodas cuotas mensuales.</p>
              <ul>
                <li>Atencion al cliente 24hs.</li>
                <li>Dominio y pagina .com.ar con un increible descuento.</li>
                <li>Mantenimiento constante.</li>
              </ul>
              <button className='btn-solid contratar'>Contratar servicio</button>
            </div>
          </div>
          <img src={Foto3} className='foto3' alt="" data-aos="fade-left" />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen