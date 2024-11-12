const deficon = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#E91E63"/>
    <path d="M35 30 L35 70 L75 50 Z" fill="white"/>
    <rect x="20" y="25" width="60" height="50" rx="8" stroke="white" stroke-width="4" fill="none"/>
</svg>`


const apps = [
  {
    name: "For Richie",
    description: "made with videogen.io",
    dlink: "https://videogen.io/?via=codemarc",
    url: "v1/",
    qr: "v1/v1.png",
    icon: deficon
  },
  {
    name: "For Steve",
    description: "genai tools",
    dlink: "#",
    url: "v2/",
    qr: "v2/v2.png",
    icon: deficon
  }
  // Add more vids as needed
]

function createAppCard(app) {
  const card = document.createElement('div')
  card.className = 'app-card'
  card.innerHTML = `
      <a id="icon" href="${app.url}">${app.icon}</a>
      <h2>${app.name}</h2>
      <p><a class="littlelink" href=${app.dlink}">${app.description}</a></p>
      <a href="${app.url}">Play</a>
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