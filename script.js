// Obtener elementos del DOM
//sliders
const sliderValues = document.getElementById('myRange');
const sliderMonths = document.getElementById('rangeMonths');

const amount = document.getElementById('amount');
const amountReport = document.getElementById('amountReport');
const total = document.getElementById('total');
const monthsLabel = document.getElementById('monthsLabel');
const monthReport = document.getElementById('monthReport');

// inicializar valores
const initialValue = 40000; // initial value on amount slider
const InteresEA = 26.8242; // Interes Efectivo Anual
const InteresMensual = convertEAtoMV(InteresEA); // Interes MV



sliderValues.value = initialValue;

// Función para actualizar los valores en el DOM
function updateValues(value, isMonths = false) {
  amount.innerHTML = value;
  amountReport.innerHTML = Number(value).toLocaleString();
  total.innerHTML = value * 10;
  if (isMonths) {
    monthsLabel.innerHTML = value;
  }
}

function convertEAtoMV(InteresEA){
    let ea = InteresEA/100;
    let em = (Math.pow((1 + ea), (1/12))-1)*100;
    return em.toFixed(2);
}

// Event listener para el slider principal
sliderValues.addEventListener('input', function() {
  updateValues(this.value);
});

// Event listener para el slider de meses
sliderMonths.addEventListener('input', function() {
    monthReport.innerHTML = this.value;
});