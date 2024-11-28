// Establecer el año automáticamente en el pie de página
document.getElementById('year').textContent = new Date().getFullYear();

// Script para mostrar/ocultar el menú móvil
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

menuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Datos de las hamburguesas
const burgers = [
  { id: 1, nombre: "Meat & Cheese", precio: 10000, imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=3271&auto=format&fit=cropr" },
  { id: 2, nombre: "Meat & Cheese", precio: 12000, imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=3271&auto=format&fit=cropr" },
  { id: 3, nombre: "Cheese Lover", precio: 14000, imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=3271&auto=format&fit=cropr" },
  { id: 4, nombre: "Classic Burger", precio: 8000, imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=3271&auto=format&fit=cropr" },
  { id: 5, nombre: "Classic Burger", precio: 8000, imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=3271&auto=format&fit=cropr" },
  { id: 6, nombre: "Classic Burger", precio: 8000, imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=3271&auto=format&fit=cropr" }, 
];

// Función para renderizar las hamburguesas
function renderBurgers(burgers) {
  const container = document.getElementById('galeria-burgers');
  container.innerHTML = ''; // Limpiar la galería antes de renderizar
  burgers.forEach(burger => {
    const burgerCard = `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="${burger.imagen}" alt="${burger.nombre}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-semibold text-black">${burger.nombre}</h3>
          <p class="text-lg text-gray-500">$${burger.precio}</p>
          <button class="add-to-cart bg-yellow-500 text-white py-2 px-4 rounded-lg mt-4" 
            data-id="${burger.id}" data-name="${burger.nombre}" data-price="${burger.precio}">
            Añadir al carrito
          </button>
        </div>
      </div>
    `;
    container.innerHTML += burgerCard;
  });

  // Agregar los event listeners a los botones "Añadir al carrito"
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
      const burgerId = event.target.dataset.id;
      const burgerName = event.target.dataset.name;
      const burgerPrice = parseFloat(event.target.dataset.price);
      addToCart({ id: burgerId, name: burgerName, price: burgerPrice });
    });
  });
}

// Función de búsqueda
function searchBurgers() {
  const query = document.getElementById('search').value.toLowerCase();
  const filteredBurgers = burgers.filter(burger => 
    burger.nombre.toLowerCase().includes(query) || burger.precio.toString().includes(query)
  );
  renderBurgers(filteredBurgers);
}

// Escuchar cambios en el campo de búsqueda
document.getElementById('search').addEventListener('input', searchBurgers);

// Renderizar hamburguesas por defecto
renderBurgers(burgers);



