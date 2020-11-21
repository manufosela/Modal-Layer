export class ModalLayer {
  constructor() {
    this.modalId = `Modal-${Date.now()}`;
    this.defineStyles();
    this.createModal();
    this.injectStyles();
  }

  defineStyles() {
    this.modalStyle = '.modal { height: 365px; width: 650px; background-color: #fff; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 45px; opacity: 0; pointer-events: none; transition: all 300ms ease-in-out; z-index: 1011; }';
    this.modalStyleVisible = '.modal-visible { opacity: 1; pointer-events: auto; }';
    this.modalStyleClose = '.modal-closeBtn { position: absolute; font-size: 1.2rem; right: -10px; top: -10px; cursor: pointer; background:#F30; padding:5px; font-size:bold; border-radius:50%; }';
    this.blackedout = '.blackedout { position: absolute; z-index: 1010; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.65); display: none; }';
    this.blackedoutVisible = '.blackedout-visible { display: block; }';
  }

  createModal(contentModal) {
    this.contentModal = contentModal || '';
    this.modalHTML = document.createElement('div');
    this.modalHTML.id = this.modalId;
    this.modalHTML.dataset.popupModal = 'one';
    this.modalHTML.classList.add('modal');
    this.modalHTML.classList.add('shadow');
    this.modalHTML.innerHTML = `<span class="modal-closeBtn">X</span><div id="modal-content">${this.contentModal}</div>`;
    this.bodyBlackedout = document.createElement('div');
    this.bodyBlackedout.classList.add('blackedout');
  }

  injectStyles() {
    let style = document.getElementById('EditContentStyles');
    if (!style) {
      style = document.createElement('style');
      style.setAttribute('id', 'EditContentStyles');
      style.setAttribute('type', 'text/css');
      style.innerHTML = this.modalStyle + this.modalStyleVisible + this.modalStyleClose + this.blackedout + this.blackedoutVisible;
      document.getElementsByTagName('head')[0].appendChild(style);
      document.body.appendChild(this.bodyBlackedout);
      document.body.appendChild(this.modalHTML);
    }
  }

  hideModal() {
    this.modalHTML.classList.remove('modal-visible');
    this.bodyBlackedout.classList.remove('blackedout-visible');
    document.querySelector('.blackedout').removeEventListener('click', this.hideModal);
    this.modalHTML.querySelector('.modal-closeBtn').removeEventListener('click', this.hideModal);
  }

  openModal(content) {
    this.modalHTML.classList.add('modal-visible');
    this.bodyBlackedout.classList.add('blackedout-visible');
    this.modalHTML.querySelector('#modal-content').innerHTML = content;
    this.modalHTML.querySelector('.modal-closeBtn').addEventListener('click', this.hideModal.bind(this));
    document.querySelector('.blackedout').addEventListener('click', this.hideModal.bind(this));
  }
}