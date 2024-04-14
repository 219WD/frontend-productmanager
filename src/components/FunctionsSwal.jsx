import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function show_alerta(mensaje, icono, foco = '') {
    onfocus(foco);
    MySwal.fire({
        title: mensaje,
        icon: icono
    });
}

function onfocus(foco) {
    if (foco !== '') {
        document.getElementById(foco).focus();
    }
}

export default MySwal;
