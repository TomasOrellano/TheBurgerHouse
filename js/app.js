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
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Hubo un problema al obtener las burgers. Por favor, inténtalo nuevamente más tarde.',
      footer: `<strong>Error:</strong> ${error.message}`
    });
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

  // Notificación Toastify
  Toastify({
    text: `¡${nombre} añadido al carrito!`,
    duration: 3000,
    gravity: "top", // "top" or "bottom"
    position: "right", // "left", "center" or "right"
    backgroundColor: "#fbbf24",
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();
}

// Guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Obtener carrito desde localStorage
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
  guardarCarritoEnLocalStorage();
  actualizarContenidoCarrito();
}

// Actualizar total del carrito
function actualizarTotal() {
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Modal de carrito
const modal = document.getElementById('cart-modal');

// Abrir modal
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', () => modal.classList.remove('hidden'));
});

// Finalizar compra
document.querySelector('.finalizar-compra').addEventListener('click', () => {
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Carrito vacío',
      text: 'Agrega productos antes de finalizar tu compra.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#fbbf24',
    });
    return;
  }

  // Mostrar mensaje de agradecimiento
  Swal.fire({
    icon: 'success',
    confirmButtonText: 'OK',
    confirmButtonColor: '#34d399',
  }).then(() => {
    // Reiniciar el carrito
    carrito = [];
    guardarCarritoEnLocalStorage();
    actualizarContenidoCarrito();

    // Cerrar modal
    modal.classList.add('hidden');
  });
});

// Cerrar modal al hacer clic en "X"
document.getElementById('close-cart-modal').addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Cerrar modal al hacer clic fuera del contenido
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});

// Cargar el menú inicial
obtenerBurgers();
actualizarContenidoCarrito();

// Elementos de los modales
const finalizarCompraBtn = document.querySelector('.finalizar-compra');
const customerDataModal = document.getElementById('customer-data-modal');
const closeCustomerModalBtn = document.getElementById('close-customer-modal');
const customerDataForm = document.getElementById('customer-data-form');

// Mostrar modal de datos del cliente
finalizarCompraBtn.addEventListener('click', () => {
  if (carrito.length === 0) {
    Swal.fire('Carrito vacío', 'Por favor, agrega productos antes de finalizar la compra.', 'warning');
    return;
  }
  customerDataModal.classList.remove('hidden');
});

// Cerrar modal de datos del cliente
closeCustomerModalBtn.addEventListener('click', () => {
  customerDataModal.classList.add('hidden');
});

// Manejar el envío del formulario
customerDataForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const customerName = document.getElementById('customer-name').value.trim();
  const customerAddress = document.getElementById('customer-address').value.trim();
  const customerEmail = document.getElementById('customer-email').value.trim();

  // Validación defensiva
  if (!customerName || !customerAddress || !customerEmail) {
    Swal.fire('Datos incompletos', 'Por favor, complete todos los campos.', 'error');
    return;
  }

  // Simular el proceso de compra
  Swal.fire({
    icon: 'success',
    title: 'Gracias por su compra',
    text: `¡Gracias ${customerName}! Su pedido llegará a ${customerAddress}.`,
    confirmButtonText: 'Aceptar'
  });

  // Cerrar el modal, vaciar el carrito y reiniciar el formulario
  customerDataModal.classList.add('hidden');
  carrito = [];
  actualizarContenidoCarrito(); // Esta función debería vaciar visualmente el carrito
  customerDataForm.reset();
});
