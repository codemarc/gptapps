const apps = [
  {
    name: "Loan Calc",
    description: "calculate loan payments",
    url: "loancalc/",
    qr: "loancalc/loancalc.png",
    icon: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
  <rect x="2" y="3" width="20" height="18" rx="2" ry="2" fill="#4CAF50"/>
  <text x="12" y="16" font-family="Arial" font-size="14" fill="white" text-anchor="middle">$</text>
  <path d="M7 7h10M7 11h10M7 15h10" stroke="white" stroke-width="2"/>
</svg>`


  },
  {
    name: "Tip Calc",
    description: "calculate tip amounts",
    url: "tipcalc/",
    qr: "tipcalc/tipcalc.png",
    icon: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
  <circle cx="12" cy="12" r="10" fill="#2196F3"/>
  <text x="12" y="17" font-family="Arial" font-size="14" fill="white" text-anchor="middle">TIP</text>
  <path d="M8 8l8 8M16 8l-8 8" stroke="white" stroke-width="2"/>
</svg>`
  },
  {
    name: "Pay Calculator",
    description: "quick pay calculations",
    url: "paycalc",
    qr: "paycalc/paycalc.png",
    icon: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
  <rect x="2" y="3" width="20" height="18" rx="2" ry="2" fill="#FFC107"/>
  <text x="12" y="16" font-family="Arial" font-size="14" fill="white" text-anchor="middle">PAY</text>
  <path d="M6 7h12M6 11h12M6 15h12" stroke="white" stroke-width="2"/>
</svg>`
  },
  {
    name: "Stock Calculator",
    description: "picks by calculated strategy",
    url: "stockcalc",
    qr: "stockcalc/stockcalc.png",
    icon: `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#2196F3"/>
    <path d="M20 70 L40 50 L60 65 L80 30" stroke="white" stroke-width="6" fill="none"/>
    <circle cx="40" cy="50" r="4" fill="white"/>
    <circle cx="60" cy="65" r="4" fill="white"/>
    <circle cx="80" cy="30" r="4" fill="white"/>
</svg>`
  }

  // Add more apps as needed
]

function createAppCard(app) {
  const card = document.createElement('div')
  card.className = 'app-card'
  card.innerHTML = `
      <a id="icon" href="${app.url}">${app.icon}</a>
      <h2>${app.name}</h2>
      <p>${app.description}</p>
      <a href="${app.url}">Open App</a>
      <div class="qr"><img src="${app.qr}"/></div>
    `
  return card
}

function populateAppGrid() {
  const appGrid = document.querySelector('.app-grid')
  apps.forEach(app => {
    const card = createAppCard(app)
    appGrid.appendChild(card)
  })
}

document.addEventListener('DOMContentLoaded', populateAppGrid)