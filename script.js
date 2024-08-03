// Obtener elementos del DOM
const sliderValues = document.getElementById("myRange");
const sliderMonths = document.getElementById("rangeMonths");
const amount = document.getElementById("amount");
const amountReport = document.getElementById("amountReport");
const total = document.getElementById("total");
const monthsLabel = document.getElementById("monthsLabel");
const monthReport = document.getElementById("monthReport");
const serviceReport = document.getElementById("serviceReport");

//docs: https://docs.google.com/spreadsheets/d/17cvJi5X5llrzgnoR5NtKKWacb7Tj5DbQ/edit?gid=1531492329#gid=1531492329
// https://www.keypago.com/solicitar-cupo-simulador/
// https://www.rapicredit.com/credito-para-ropa/

// Inicializar valores
const initialValue = 40000; // Valor inicial del slider de cantidad
const initialMonths = 1; // Valor inicial del slider de meses
const InteresEA = 26.8242; // Interés Efectivo Anual
const InteresMensual = convertEAtoMV(InteresEA); // Interés Mensual Vencido

// Establecer valores iniciales en los sliders
sliderValues.value = initialValue;
sliderMonths.value = initialMonths;

// Función para convertir Interés Efectivo Anual a Mensual Vencido
function convertEAtoMV(InteresEA) {
  const ea = InteresEA / 100;
  const em = (Math.pow(1 + ea, 1 / 12) - 1) * 100;
  return em.toFixed(2);
}

function calcularPMT(tasaInteresAnual, numPagos, montoPrestamo) {
  // Convertir la tasa de interés anual a una tasa de interés por período (mensual)
  const tasaInteresMensual = tasaInteresAnual / 100;

  // Calcular el pago mensual usando la fórmula PMT
  const pmt =
    (montoPrestamo * tasaInteresMensual) /
    (1 - Math.pow(1 + tasaInteresMensual, -numPagos));

  return pmt;
}

// Función para actualizar los valores en el DOM
function updateValues(value, isMonths = false) {
  const service = value * 0.1;
  const taxes = value * (InteresMensual / 100);
  console.log(taxes);
  amount.innerHTML = value;
  amountReport.innerHTML = Number(value).toLocaleString();
  total.innerHTML = Number(calcularPMT(value, initialMonths, InteresMensual)).toLocaleString();;
  serviceReport.innerHTML = service.toLocaleString();

  if (isMonths) {
    monthsLabel.innerHTML = value;
    monthReport.innerHTML = value;
  }
}

// Event listener para el slider principal
sliderValues.addEventListener("input", function () {
  updateValues(this.value);
});

// Event listener para el slider de meses
sliderMonths.addEventListener("input", function () {
  updateValues(this.value, true);
});

// Inicializar la interfaz con los valores iniciales
updateValues(initialValue);
updateValues(initialMonths, true);
