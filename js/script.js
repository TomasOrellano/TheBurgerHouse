// Capturamos los elementos del formulario
const nameInput = document.getElementById("name");
const burgerSelect = document.getElementById("burger");
const quantityInput = document.getElementById("quantity");
const calculateButton = document.getElementById("calculate-button");

// Evento para calcular el total
calculateButton.addEventListener("click", () => {
  // Obtenemos los valores ingresados por el usuario
  const name = nameInput.value.trim();
  const burgerPrice = parseFloat(burgerSelect.value);
  const quantity = parseInt(quantityInput.value);

  // Validación básica
  if (!name || isNaN(quantity) || quantity <= 0) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  // Calcular el total
  const total = burgerPrice * quantity;

  // Mostrar el resultado
  alert(`Gracias, ${name}. Has pedido ${quantity} hamburguesa(s). El total es: $${total.toFixed(2)}.`);
});
