const slider = document.getElementById('myRange');
const sliderMonths = document.getElementById('rangeMonths');
const output = document.getElementById("demo");
const total = document.getElementById("total");
const monthsLabel = document.getElementById("monthsLabel");
const newValue = 40000;
slider.value = newValue;

document.getElementById('myRange').addEventListener('input', function() {
    console.log(this.value);
    output.innerHTML = this.value;
    total.innerHTML = this.value * 10;
  });

  document.getElementById('rangeMonths').addEventListener('input', function() {
    console.log(this.value);
    output.innerHTML = this.value;
    monthsLabel.innerHTML = this.value;
    total.innerHTML = this.value * 10;
  });