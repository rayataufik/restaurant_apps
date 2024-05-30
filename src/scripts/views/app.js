import DrawerInitiator from '../utils/drawer-init';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const skipLink = document.querySelector('.skip-to-content');
    const mainContent = document.querySelector('#mainContent');
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.focus();
    });
    await page.afterRender();
  }
}

export default App;
