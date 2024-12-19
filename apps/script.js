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
    name: "Pay Calc",
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
    name: "Stock Calc",
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
  },
  {
    name: "Poll Calc",
    description: "calculate survey results",
    url: "pollcalc",
    qr: "pollcalc/pollcalc.png",
    icon: `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#4CAF50" rx="12"/>
    <g fill="#ffffff">
        <!-- Poll bars -->
        <rect x="25" y="25" width="50" height="9" rx="2"/>
        <rect x="25" y="41" width="37" height="9" rx="2"/>
        <rect x="25" y="57" width="20" height="9" rx="2"/>
        <rect x="25" y="73" width="28" height="9" rx="2"/>
        
        <!-- Percentage labels -->
        <text x="78" y="31" font-family="Arial" font-size="6" text-anchor="start">75%</text>
        <text x="65" y="47" font-family="Arial" font-size="6" text-anchor="start">50%</text>
        <text x="48" y="63" font-family="Arial" font-size="6" text-anchor="start">20%</text>
        <text x="58" y="79" font-family="Arial" font-size="6" text-anchor="start">35%</text>
    </g>
</svg>`
  },
  {
    name: "Donuts Calc",
    description: "from the donuts with 💜",
    url: "donuts/",
    qr: "donuts/donuts.png",
    icon: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
  <circle cx="12" cy="12" r="10" fill="#FA4616"/>
  <text x="12" y="17" font-family="Arial" font-size="14" fill="#0021A5" text-anchor="middle">TIP</text>
  <path d="M8 8l8 8M16 8l-8 8" stroke="#0021A5" stroke-width="2"/>
</svg>`
  },
  {
    name: "Password Calc",
    description: "password generator",
    url: "pwdcalc/",
    qr: "pwdcalc/pwdcalc.png",
    icon: `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#2196F3" rx="12"/>
  <g fill="white">
    <!-- Lock body -->
    <rect x="25" y="45" width="50" height="35" rx="4"/>
    <!-- Lock shackle -->
    <path d="M40 45 L40 30 Q50 20 60 30 L60 45" stroke="white" stroke-width="6" fill="none"/>
    <!-- Keyhole -->
    <circle cx="50" cy="60" r="14"/>
    <rect x="48" y="60" width="4" height="8"/>
  </g>
</svg>`
  },
  {
    name: "TodoMenuBar",
    description: "macos todo app",
    url: "todo/",
    icon: `
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#9C27B0" rx="12"/>
        <g fill="white">
            <!-- Checkmark -->
            <path d="M30 50 L45 65 L70 35" stroke="white" stroke-width="6" fill="none"/>
            
            <!-- Todo lines -->
            <rect x="25" y="20" width="50" height="4" rx="2"/>
            <rect x="25" y="75" width="50" height="4" rx="2"/>
            
            <!-- Menu bar indicator -->
            <rect x="40" y="85" width="20" height="3" rx="1.5"/>
        </g>
    </svg >`
  }
]

function createAppCard(app) {
  const card = document.createElement('div')
  card.className = 'app-card'
  card.innerHTML = `
      <a id="icon" href="${app.url}">${app.icon}</a>
      <h2>${app.name}</h2>
      <p>${app.description}</p>
      <a href="${app.url}">Open App</a>
      <div class="qr">${app.qr ? "<img src=" + app.qr + "/>" : ""} </div >
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