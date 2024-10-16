const monthsSlider = document.getElementById('months');
const monthsValue = document.getElementById('monthsValue');
const interestRateSlider = document.getElementById('interestRate');
const interestRateValue = document.getElementById('interestRateValue');

monthsSlider.addEventListener('input', () => {
    monthsValue.textContent = monthsSlider.value;
});

interestRateSlider.addEventListener('input', () => {
    interestRateValue.textContent = parseFloat(interestRateSlider.value).toFixed(1);
});

function formatNumber(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const months = parseInt(monthsSlider.value);
    const interestRate = parseFloat(interestRateSlider.value) / 100 / 12;

    const x = Math.pow(1 + interestRate, months);
    const monthlyPayment = (loanAmount * x * interestRate) / (x - 1);
    const totalCost = monthlyPayment * months;
    const totalInterest = totalCost - loanAmount;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <p>Monthly Payment: ${formatNumber(monthlyPayment)}</p>
        <p>Total Cost of Loan: ${formatNumber(totalCost)}</p>
        <p>Total Interest: ${formatNumber(totalInterest)}</p>
    `;
}
const ROWS_PER_PAGE = 12; // Show 1 year of payments per page
let currentPage = 1;
let amortizationData = [];

function generateAmortizationTable() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const months = parseInt(monthsSlider.value);
    const interestRate = parseFloat(interestRateSlider.value) / 100 / 12;

    let balance = loanAmount;
    amortizationData = [];
    const monthlyPayment = (loanAmount * Math.pow(1 + interestRate, months) * interestRate) / (Math.pow(1 + interestRate, months) - 1);

    let totalInterest = 0;
    for (let i = 1; i <= months; i++) {
        const interestPayment = balance * interestRate;
        const principalPayment = monthlyPayment - interestPayment;
        totalInterest += interestPayment;
        balance -= principalPayment;

        amortizationData.push({
            month: i,
            payment: monthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            totalInterest: totalInterest,
            balance: Math.max(0, balance)
        });
    }

    currentPage = 1;
    renderAmortizationTable();
}

function renderAmortizationTable() {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const pageData = amortizationData.slice(startIndex, endIndex);

    let tableHTML = `
        <table class="responsive-container">
            <tr>
                <th>Month</th>
                <th>Payment</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Total Interest</th>
                <th>Balance</th>
            </tr>
    `;

    pageData.forEach(row => {
        tableHTML += `
            <tr>
                <td>${row.month}</td>
                <td>${formatNumber(row.payment)}</td>
                <td>${formatNumber(row.principal)}</td>
                <td>${formatNumber(row.interest)}</td>
                <td>${formatNumber(row.totalInterest)}</td>
                <td>${formatNumber(row.balance)}</td>
            </tr>
        `;
    });

    tableHTML += '</table>';

    const totalPages = Math.ceil(amortizationData.length / ROWS_PER_PAGE);
    const paginationHTML = `
        <div class="pagination">
            <button onclick="goToPage(1)" ${currentPage === 1 ? 'disabled' : ''}>First</button>
            <button onclick="changePage(-1)" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button onclick="changePage(1)" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
            <button onclick="goToPage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>Last</button>
        </div>
    `;

    document.getElementById('amortizationTable').innerHTML = tableHTML + paginationHTML;
}

function goToPage(page) {
    currentPage = page;
    renderAmortizationTable();
}
function changePage(direction) {
    currentPage += direction;
    renderAmortizationTable();
}
