const apps = [
  {
    name: "Loan Calc",
    description: "Calculate loan payments",
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
    description: "Calculate tip amounts",
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
    description: "Perform quick pay calculations",
    url: "paycalc",
    qr: "paycalc/paycalc.png",
    icon: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
  <rect x="2" y="3" width="20" height="18" rx="2" ry="2" fill="#FFC107"/>
  <text x="12" y="16" font-family="Arial" font-size="14" fill="white" text-anchor="middle">PAY</text>
  <path d="M6 7h12M6 11h12M6 15h12" stroke="white" stroke-width="2"/>
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