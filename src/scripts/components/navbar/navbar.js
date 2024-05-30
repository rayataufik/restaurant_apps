class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="app-bar">
    <a href="#content" class="skip-to-content">Skip to Content</a>
      <div class="app-bar__menu">
        <button id="hamburgerButton">☰</button>
      </div>
      <div class="app-bar__brand">
        <h1>Restaurant</h1>
      </div>
      <nav id="navigationDrawer" class="app-bar__navigation">
        <ul>
          <li><a href="#/list-restaurant">Home</a></li>
          <li><a href="#/favorite">Favorite</a></li>
          <li><a href="https://rayataufik.github.io/" target="_blank">About Us</a></li>
        </ul>
      </nav>
    </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
