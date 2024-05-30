class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <p>&copy; 2024 - Restaurant Apps</p>
    `;
  }
}

customElements.define('app-footer', Footer);
