// Obtener datos del menú
async function obtenerBurgers() {
  try {
    const response = await fetch("../json/menu.json");
    if (!response.ok) {
      throw new Error(`Error al obtener los burgers: ${response.status}`);
    }
    const data = await response.json();
    renderBurgers(data.burgers);
  } catch (error) {
    console.error('Error al obtener los burgers', error);
  }
}

// Renderizar tarjetas de hamburguesas
function renderBurgers(burgers) {
  const containerBurgers = document.getElementById('galeria-burgers');
  containerBurgers.innerHTML = ''; // Limpiar la galería antes de renderizar
  
  burgers.forEach(burger => {
    const divBurgers = document.createElement('div');
    divBurgers.classList.add("p-4"); // Clase adicional para espaciado
    divBurgers.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="${burger.imagen}" alt="${burger.nombre}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-semibold text-black">${burger.nombre}</h3>
          <p class="text-lg text-gray-500">$${burger.precio}</p>
          <button class="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all mt-4" 
          onclick="agregarAlCarrito('${burger.nombre}', ${burger.precio})">Ordenar</button>
        </div>
      </div>
    `;
    containerBurgers.appendChild(divBurgers);
  });
}

// Variables globales
let carrito = [];

// Agregar al carrito
function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  guardarCarritoEnLocalStorage();
  actualizarContenidoCarrito();
}

// Guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function obtenerCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

carrito = obtenerCarritoDesdeLocalStorage();

// Actualizar contenido del carrito
function actualizarContenidoCarrito() {
  const carritoContenido = document.getElementById('carrito-contenido');
  carritoContenido.innerHTML = '';

  carrito.forEach(producto => {
    const divProducto = document.createElement('div');
    divProducto.classList.add("flex", "justify-between", "items-center", "p-2");
    divProducto.innerHTML = `
      <p>${producto.nombre} - Cantidad: ${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}</p>
      <button class="text-red-500 hover:text-red-700" onclick="eliminarDelCarrito('${producto.nombre}')">&times;</button>
    `;
    carritoContenido.appendChild(divProducto);
  });

  actualizarTotal();
}

// Eliminar del carrito
function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  actualizarContenidoCarrito();
}

// Actualizar total del carrito
function actualizarTotal() {
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Modal de carrito
const modal = document.getElementById('cart-modal');
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', () => modal.classList.remove('hidden'));
});

document.querySelector('.finalizar-compra').addEventListener('click', () => {
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Carrito vacío',
      text: 'Agrega productos antes de finalizar tu compra.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#fbbf24', // Amarillo
    });
    return;
  }

  // Mostrar el mensaje de agradecimiento
  Swal.fire({
    icon: 'success',
    title: '¡Gracias por tu compra!',
    text: 'Tu pedido ha sido recibido. Pronto nos pondremos en contacto contigo.',
    confirmButtonText: 'OK',
    confirmButtonColor: '#34d399', // Verde
  });

  // Reiniciar el carrito
  carrito = [];
  guardarCarritoEnLocalStorage();
  actualizarContenidoCarrito();

  // Cerrar el modal
  document.getElementById('cart-modal').classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
});

// Cargar el menú inicial
obtenerBurgers();
actualizarContenidoCarrito();