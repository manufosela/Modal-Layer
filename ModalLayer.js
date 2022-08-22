export class ModalLayer {
  constructor(options = {}) {
    this.modalId = `Modal-${Date.now()}`;
    this.contentStyle = '';
    this.contentHTML = '';
    this.heightModal = options.heightModal || '365px';
    this.widthModal = options.widthModal || '600px';
    this.eventInfoList = [];
    
    this.initModal();
  }

  restoreModal() {
    const modalLayer = document.querySelector('[id^="Modal-"]');
    if (modalLayer) {
      modalLayer.parentElement.removeChild(modalLayer);
      const styles = document.querySelector('#EditContentStyles');
      styles.parentElement.removeChild(styles);
      const bodyBlackedout = document.querySelector('.ModalLayer-blackedout');
      bodyBlackedout.parentElement.removeChild(bodyBlackedout);
    }
  }

  initModal() {
    this.restoreModal();
    this.defineStyles();
    this.createModal();
    this.injectStyles();
    this.injectModalElements();
  }

  defineStyles() {
    this.modalStyle = `.ModalLayer-modal { height: ${this.heightModal};  max-height: 100%; width: ${this.widthModal};max-width: 100%; display: block; background-color: #fff; position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 45px; opacity: 0; pointer-events: none; transition: all 300ms ease-in-out; z-index: 1011; box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.9);}`;
    this.modalStyleVisible = '.ModalLayer-modal-visible { opacity: 1; pointer-events: auto; }';
    this.modalStyleClose = '.ModalLayer-modal-closeBtn {cursor: pointer; position: absolute; right: 10px; top: 10px;}.ModalLayer-modal-closeBtn:after, .ModalLayer-modal-closeBtn:before {content: "";height: 20px;width: 20px;border-top: 1px solid #000;position: absolute;top: 7px;right: -8px;-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-webkit-transform: rotate(-45deg);transform: rotate(-45deg);}.ModalLayer-modal-closeBtn:before {right: 6px;-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-webkit-transform: rotate(45deg);transform: rotate(45deg);}.ModalLayer-modal-closeBtn:hover {filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=30);opacity: 0.3;}';
    this.blackedout = '.ModalLayer-blackedout { position: absolute; z-index: 1010; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.65); display: none; }';
    this.blackedoutVisible = `.ModalLayer-blackedout-visible { display: block; height:${document.body.clientHeight}px }`;
  }

  createModal() {
    this.modalHTML = document.createElement('div');
    this.modalHTML.id = this.modalId;
    this.modalHTML.dataset.popupModal = 'one';
    this.modalHTML.classList.add('ModalLayer-modal');
    this.modalHTML.classList.add('ModalLayer-shadow');
    this.bodyBlackedout = document.createElement('div');
    this.bodyBlackedout.classList.add('ModalLayer-blackedout');
  }

  injectStyles() {
    this.defineStyles();
    let style = document.getElementById('EditContentStyles');
    if (!style) {
      style = document.createElement('style');
      style.setAttribute('id', 'EditContentStyles');
      style.setAttribute('type', 'text/css');
      style.innerHTML = this.modalStyle + this.modalStyleVisible + this.blackedout + this.blackedoutVisible;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }

  injectModalElements() {
    document.body.appendChild(this.bodyBlackedout);
    document.body.appendChild(this.modalHTML);
    this.modalHTML.attachShadow({mode: 'open'});
  }

  injectModalContent() {
    this.bodyBlackedout.style.height = document.documentElement.clientHeight;
    this.modalHTML.style.top = `calc(${window.scrollY}px + 50%)`;
    this.modalHTML.shadowRoot.innerHTML = `
      <style>
        ${this.modalStyleClose}
        ${this.contentStyle}
      </style>
      <div id="ModalLayer-modal-content">       
      <span class="ModalLayer-modal-closeBtn"></span>
        ${this.contentHTML}
      </div>
    `;
  }

  getElementById(id) {
    return this.modalHTML.shadowRoot.getElementById(id);
  }

  addEvents() {
    this.modalHTML.shadowRoot.querySelector('.ModalLayer-modal-closeBtn').addEventListener('click', this.hideModal.bind(this));
    document.querySelector('.ModalLayer-blackedout').addEventListener('click', this.hideModal.bind(this));
    this.eventInfoList.forEach(eventInfo => {
      this.modalHTML.shadowRoot.querySelector(eventInfo.selector).addEventListener(eventInfo.event, eventInfo.callback);
    })
  }

  hideModal() {
    this.modalHTML.classList.remove('ModalLayer-modal-visible');
    this.bodyBlackedout.classList.remove('ModalLayer-blackedout-visible');
    document.querySelector('.ModalLayer-blackedout').removeEventListener('click', this.hideModal);
    this.modalHTML.shadowRoot.querySelector('.ModalLayer-modal-closeBtn').removeEventListener('click', this.hideModal);
  }

  openModal() {
    this.modalHTML.classList.add('ModalLayer-modal-visible');
    this.bodyBlackedout.classList.add('ModalLayer-blackedout-visible');
    this.injectModalContent();
    this.addEvents();
  }
}