// Inicializamos Vexor y creamos el estado del carrito
const cart = vexor.state([]);

// Función para agregar productos al carrito
function addToCart(burger) {
  // Agregar el producto al carrito
  cart.set([...cart(), burger]);
  localStorage.setItem('cart', JSON.stringify(cart())); // Actualizar localStorage
  alert(`${burger.name} ha sido agregado al carrito.`);
}

// Función para eliminar productos del carrito
function removeFromCart(burgerId) {
  const updatedCart = cart().filter(item => item.id !== burgerId);
  cart.set(updatedCart); // Actualizar el carrito en el estado
  localStorage.setItem('cart', JSON.stringify(cart())); // Actualizar localStorage
}

// Renderizar el carrito
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  cartItemsContainer.innerHTML = ''; // Limpiar el carrito antes de renderizar
  let total = 0;

  cart().forEach(item => {
    const cartItem = `
      <div class="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h3 class="font-semibold">${item.name}</h3>
          <p class="text-gray-500">$${item.price}</p>
        </div>
        <button class="text-red-500" onclick="removeFromCart(${item.id})">Eliminar</button>
      </div>
    `;
    cartItemsContainer.innerHTML += cartItem;
    total += item.price;
  });

  totalPriceElement.textContent = total.toFixed(2);
}

// Cargar carrito desde localStorage al inicio
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
cart.set(savedCart);

// Usamos un efecto para renderizar automáticamente el carrito cuando cambie el estado
vexor.effect(() => {
  renderCart();
}, [cart]);

// Agregar productos al carrito cuando se hace clic en los botones
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (event) => {
    const burgerId = event.target.dataset.id;
    const burgerName = event.target.dataset.name;
    const burgerPrice = parseFloat(event.target.dataset.price);
    addToCart({ id: burgerId, name: burgerName, price: burgerPrice });
  });
});

function clearCart() {
  cart.set([]); // Vaciar el carrito
  localStorage.setItem('cart', JSON.stringify([])); // Limpiar localStorage
}
