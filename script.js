// Obtener elementos del DOM
const slider = document.getElementById('myRange');
const sliderMonths = document.getElementById('rangeMonths');
const output = document.getElementById('demo');
const total = document.getElementById('total');
const monthsLabel = document.getElementById('monthsLabel');

// Establecer el valor inicial del slider
const initialValue = 40000;
slider.value = initialValue;

// Función para actualizar los valores en el DOM
function updateValues(value, isMonths = false) {
  console.log(value);
  output.innerHTML = value;
  total.innerHTML = value * 10;
  if (isMonths) {
    monthsLabel.innerHTML = value;
  }
}

// Event listener para el slider principal
slider.addEventListener('input', function() {
  updateValues(this.value);
});

// Event listener para el slider de meses
sliderMonths.addEventListener('input', function() {
  updateValues(this.value, true);
});