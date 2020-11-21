# ModalLayer javascript class

To create modals layers easily. It uses vanilla javascript.

# Install 
```
$ npm install vanilla-modal-layer
```

# Demo
[Codepen Demo](https://codepen.io/manufosela/pen/MWeMXrO);


# Local demo
```
$ npm run start
```

# Example

```javascript
import { ModalLayer } from '../ModalLayer.js';
    
const modalLayer = new ModalLayer(); 
modalLayer.styleContent = `
  main {
    display:flex;
    justify-content: center;
    align-items: center;
  }
`;
modalLayer.contentModal = `
  <main>
    <div>
      <h1>Testing ModalLayer</h1>
      <p>To create modals layers easily. It uses vanilla javascript.</p>
      <a href="https://codepen.io/manufosela/pen/MWeMXrO">Codepen Demo</a>
    </div>
  </main>
`;
modalLayer.openModal();
```