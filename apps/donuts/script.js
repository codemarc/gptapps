lastTipAmount = 0

function calculateTip(tipAmount) {
    lastTipAmount = tipAmount;
    const billAmount = Number.parseFloat(document.getElementById('bill').value);
    const numberOfPeople = Number.parseInt(document.getElementById('people').value)

    const resultElement = document.getElementById('result');
    
    if (Number.isNaN(billAmount) || billAmount <= 0) {
        alert('Please enter a valid bill amount');
        resultElement.innerHTML = '';
        return;
    }

    let tipValue
    let tipPercentage

    if (tipAmount < 1) {
        tipValue = billAmount * tipAmount;
        tipPercentage = `${(tipAmount * 100).toFixed(1)}%`;
    } else {
        tipValue = tipAmount;
        tipPercentage = `${((tipValue / billAmount) * 100).toFixed(1)}%`;
    }

    const totalBill = billAmount + tipValue;
    const perPersonAmount = totalBill / numberOfPeople;

      let resultHTML = `
          Tip: $${tipValue.toFixed(2)} (${tipPercentage})<br>
          Total Bill: $${totalBill.toFixed(2)}
      `;
  
      if (numberOfPeople > 1) {
          resultHTML += `<br>Per Person: $${perPersonAmount.toFixed(2)}`;
      } else {
        resultHTML += `<br><span style="font-size:9pt"><a href="#" onclick="roundTotal(); return false;">Round Total Up</a></span>`;
      }
      
  
      resultElement.innerHTML = resultHTML;
  }

  function roundTotal() {
    const resultElement = document.getElementById('result');
    const billAmount = Number.parseFloat(document.getElementById('bill').value);
    const numberOfPeople = Number.parseInt(document.getElementById('people').value);

    const currentTotal = Number.parseFloat(resultElement.innerHTML.match(/Total Bill: \$(\d+\.\d+)/)[1]);
    const roundedTotal = Math.ceil(currentTotal);
    const difference = roundedTotal - currentTotal;
    
    const newTip = difference + Number.parseFloat(resultElement.innerHTML.match(/Tip: \$(\d+\.\d+)/)[1]);
    const newTipPercentage = (newTip / billAmount * 100).toFixed(1);

    let newResultHTML = `
        Tip: $${newTip.toFixed(2)} (${newTipPercentage}%)<br>
        Total Bill: $${roundedTotal.toFixed(2)}
    `;

    if (numberOfPeople > 1) {
        const newPerPerson = roundedTotal / numberOfPeople;
        newResultHTML += `<br>Per Person: $${newPerPerson.toFixed(2)}`;
    }

    resultElement.innerHTML = newResultHTML;
}


function updatePeopleCount() {
    const peopleCount = document.getElementById('people').value;
    document.getElementById('peopleCount').textContent = `${peopleCount} ${peopleCount === 1 ? 'way' : 'ways'}`
    if (lastTipAmount > 0) calculateTip(lastTipAmount)
}

function updateTipPercentage(value) {
    document.getElementById('tipValue').textContent = value + '%';
    calculateTip(value / 100);
}

function handleCalculate() {
    const tipPercentage = document.getElementById('tipPercentage').value;
    calculateTip(tipPercentage / 100);
}

