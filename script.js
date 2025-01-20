// Obtener elementos del DOM
const sliderValues = document.getElementById("myRange");
const sliderMonths = document.getElementById("rangeMonths");
// const amount = document.getElementById("amount");
const amountReport = document.getElementById("amountReport");
const ModalAmountReport = document.getElementById("ModalAmountReport");
const ModalMonthReport = document.getElementById("ModalMonthReport");
const ModalTotal = document.getElementById("ModalTotal");
const ModalDateFirstPayment = document.getElementById("ModalDateFirstPayment");
const ModalTotalFees = document.getElementById("ModalTotalFees");
const ModalFianza = document.getElementById("ModalFianza");
const total = document.getElementById("total");
// const monthsLabel = document.getElementById("monthsLabel");
const monthReport = document.getElementById("monthReport");
const serviceReport = document.getElementById("serviceReport");
const interestMVLabel = document.getElementById("interestMV");

// Obtener el modal
const modal = document.getElementById("myModal");
// Obtener el botón que abre el modal
const btn = document.getElementById("openModalBtn");
// Obtener el elemento <span> que cierra el modal
const span = document.getElementsByClassName("close")[0];

//docs: https://docs.google.com/spreadsheets/d/17cvJi5X5llrzgnoR5NtKKWacb7Tj5DbQ/edit?gid=1531492329#gid=1531492329
// https://www.keypago.com/solicitar-cupo-simulador/
// https://www.rapicredit.com/credito-para-ropa/

// Inicializar valores
let initialValue = 40000; // Valor inicial del slider de cantidad
let initialMonths = 1; // Valor inicial del slider de meses
let rawValue = 40000; // Valor sin formato
const InteresEA = 26.8242; // Interés Efectivo Anual
const interestMV = "2.0"; // Interés Mensual Vencido
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
function updateValues() {
  const service = rawValue * 0.1;
  const totalAmount = Math.round(
    calcularPMT(InteresMensual, initialMonths, rawValue) +
      service / initialMonths
  );

  // amount.innerHTML = rawValue;
  amountReport.innerHTML = Number(rawValue).toLocaleString("es-co");
  ModalAmountReport.innerHTML = Number(rawValue).toLocaleString("es-co");
  monthReport.innerHTML = initialMonths;
  ModalMonthReport.innerHTML = initialMonths;
  // monthsLabel.innerHTML = initialMonths;
  interestMVLabel.innerHTML = interestMV + "%";
  total.innerHTML = Number(totalAmount).toLocaleString("es-co");
  ModalTotal.innerHTML = Number(totalAmount).toLocaleString("es-co");
  ModalDateFirstPayment.innerHTML = calcularFecha();
  ModalFianza.innerHTML = Number(service).toLocaleString("es-co");
  ModalTotalFees.innerHTML = Number(
    totalAmount * initialMonths - rawValue - service
  ).toLocaleString("es-co");
  // serviceReport.innerHTML = service.toLocaleString('es-co');
}

function calcularFecha() {
  const hoy = new Date();
  const dia = hoy.getDate();
  const mes = hoy.getMonth();
  const año = hoy.getFullYear();

  let fechaResultado;
  const opciones = { day: "2-digit", month: "short", year: "numeric" };

  if (dia >= 1 && dia <= 10) {
    fechaResultado = new Date(año, mes + 1, 5);
  } else if (dia >= 10 && dia <= 20) {
    fechaResultado = new Date(año, mes + 1, 15);
  } else {
    fechaResultado = new Date(año, mes + 1, 25);
  }

  return fechaResultado.toLocaleDateString("es-ES", opciones);
}

function formatCurrency(input) {
  let value = input.value.replace(/[^0-9]/g, "");
  value = parseInt(value, 10);
  rawValue = value;

  if (!isNaN(value)) {
    input.value = "$" + value.toLocaleString("es-CO");
  } else {
    input.value = "";
  }
}

// Event listener para el slider principal
sliderValues.addEventListener("input", function () {
  initialValue = this.value;
  updateValues();
  if (this.value < 40000) {
    sliderMonths.max = 3;
  } else if (this.value > 250001) {
    sliderMonths.max = 6;
  } else {
    sliderMonths.max = 4;
  }
});

// Event listener para el slider de meses
sliderMonths.addEventListener("input", function () {
  initialMonths = this.value;
  // monthsLabel.innerHTML = this.value;
  monthReport.innerHTML = this.value;
  updateValues();
});

// Inicializar la interfaz con los valores iniciales
updateValues();

// Cuando el usuario hace clic en el botón, abre el modal
btn.onclick = function () {
  modal.style.display = "block";
};

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function () {
  modal.style.display = "none";
};

// Cuando el usuario hace clic en cualquier lugar fuera del modal, cierra el modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
document.addEventListener("DOMContentLoaded", (event) => {
  const input = document.getElementById("myRange");
  formatCurrency(input);
});
