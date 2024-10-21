document.getElementById('vacation-days').addEventListener('input', function () {
  document.getElementById('vacation-days-value').textContent = this.value
})

document.getElementById('overtime-hours').addEventListener('input', function () {
  document.getElementById('overtime-hours-value').textContent = this.value
})

function toggleMode() {
  const mode = document.getElementById('mode-toggle').value
  if (mode === 'hourly') {
    document.getElementById('hourly-inputs').style.display = 'block'
    document.getElementById('hourly-controls').style.display = 'block'
    document.getElementById('yearly-inputs').style.display = 'none'

  } else {
    document.getElementById('hourly-inputs').style.display = 'none'
    document.getElementById('hourly-controls').style.display = 'none'
    document.getElementById('yearly-inputs').style.display = 'block'
  }
}


function calculateFederalTax(grossYearlySalary) {
  let federalTax = 0
  if (grossYearlySalary > 539900) {
    federalTax += (grossYearlySalary - 539900) * 0.37
    grossYearlySalary = 539900
  }
  if (grossYearlySalary > 215950) {
    federalTax += (grossYearlySalary - 215950) * 0.35
    grossYearlySalary = 215950
  }
  if (grossYearlySalary > 170050) {
    federalTax += (grossYearlySalary - 170050) * 0.32
    grossYearlySalary = 170050
  }
  if (grossYearlySalary > 89075) {
    federalTax += (grossYearlySalary - 89075) * 0.24
    grossYearlySalary = 89075
  }
  if (grossYearlySalary > 41775) {
    federalTax += (grossYearlySalary - 41775) * 0.22
    grossYearlySalary = 41775
  }
  if (grossYearlySalary > 10275) {
    federalTax += (grossYearlySalary - 10275) * 0.12
    grossYearlySalary = 10275
  }
  federalTax += grossYearlySalary * 0.10
  return federalTax
}

function calculateSalary() {
  const mode = document.getElementById('mode-toggle').value
  const vacationDays = parseInt(document.getElementById('vacation-days').value)
  const overtimeHours = parseInt(document.getElementById('overtime-hours').value)
  const stateTaxRate = parseFloat(document.getElementById('location').selectedOptions[0].getAttribute('data-tax')) / 100

  const workDaysPerYear = 260 - vacationDays
  const regularHoursPerYear = workDaysPerYear * 8
  const overtimeHoursPerYear = overtimeHours * 52
  const totalHoursPerYear = regularHoursPerYear + overtimeHoursPerYear

  let grossYearlySalary
  if (mode === 'hourly') {
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value)
    grossYearlySalary = hourlyRate * totalHoursPerYear
  } else {
    grossYearlySalary = parseFloat(document.getElementById('gross-yearly-salary').value)
  }

  const federalTax = calculateFederalTax(grossYearlySalary)
  const stateTax = grossYearlySalary * stateTaxRate
  const totalTax = federalTax + stateTax
  const netYearlySalary = grossYearlySalary - totalTax
  const effectiveTaxRate = (totalTax / grossYearlySalary) * 100

  document.getElementById('result').innerHTML = `
    <table>
      <tr>
        <th>Gross Yearly Salary</th>
        <td>${grossYearlySalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
      </tr>
      <tr>
        <th>Federal Tax</th>
        <td>${federalTax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
      </tr>
      <tr>
        <th>State Tax</th>
        <td>${stateTax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
      </tr>
      <tr>
        <th>Total Tax</th>
        <td>${totalTax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
      </tr>
      <tr>
        <th>Net Yearly Salary</th>
        <td>${netYearlySalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
      </tr>
      <tr>
        <th>Effective Tax Rate</th>
        <td>${effectiveTaxRate.toFixed(2)}%</td>
      </tr>
    </table>
  `
}