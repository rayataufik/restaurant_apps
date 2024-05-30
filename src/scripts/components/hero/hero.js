class Hero extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="hero-image">
      <picture>
      <source media="(max-width: 600px)" srcset="./images/heros/hero-image_4-small.jpg">
      <img src="./images/heros/hero-image_4-large.jpg" alt="hero-image" />
      </picture>
    </div>
    `;
  }
}

customElements.define('hunger-hero', Hero);
