//VARIABLES

const carrito = document.querySelector('#carrito'); //cuadrado de los productos
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let carritoCompras = [];




//FUNCIÓN GENERAL PARA CARGAR LOS EVENTS LISTENERS
cargarEventos();
function cargarEventos(){

    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        carritoCompras = [];
        mostrarCarrito();
        console.log(carritoCompras);
    });
   
}



//FUNCIONES
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        carritoCompras = carritoCompras.filter(producto => producto.id !== cursoId);
        mostrarCarrito();
    }
}


function leerDatos(curso){

    const cursoAgregado = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //RECORREMOS EL CARRITO PARA VER QUE NO SE AGREGUEN 2 PRODUCTOS IGUALES
    let encontrado = carritoCompras.some( producto => producto.id === cursoAgregado.id);
   
  
    if(encontrado){
        carritoCompras.forEach(producto => {
            if(producto.id === cursoAgregado.id){
                producto.cantidad++;
            }
        })
    }else{
        carritoCompras = [...carritoCompras, cursoAgregado];
    }
 
    mostrarCarrito();
    
}


function mostrarCarrito(){
    
    //LIMPIAR EL CARRITO DE FORMA LENTA
    //contenedorCarrito.innerHTML = '';

    //LIMPIARLO DE MANERA MÁS EFECTIVA
    limpiarHTML();
    carritoCompras.forEach( producto => {
        const {imagen, titulo, precio, cantidad, id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" height="50px" width="50px" />
            </td>

            <td>
                ${titulo}
            </td>

            
            <td>
                ${precio}
            </td>

            <td>
                ${cantidad}
            </td>

            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>

        
        `;

        contenedorCarrito.appendChild(row);
    })
}


function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


