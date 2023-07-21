/**
 * @name LinkComponent
 * @description LinkComponent is a component for links to be rendered as either a text or a button link.
 * @example <link-component url="https://www.apple.com" isbutton colorscheme="primary" isexternal>Label</link-component>
 * @param {string} url - url for link
 * @param {string} label - label for link
 * @param {string} isbutton - if exists, link is renders as a button, else as a text link
 * @param {string} colorscheme - color scheme for button link, primary, secondary or inverted
 * @param {string} isexternal - if exists, link is rendered as an external link
 * 
 */

class LinkComponent extends HTMLElement {
  
  constructor() {
    super();
    
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
      <style>
        /* default styles */
        :host {
          --btn-color: #003436;
          --btn-text-color: #fff;
          --btn-border-radius: 0;
          --btn-padding: 0rem 2.5rem;
          --btn-font-size: 1rem;
          --btn-font-weight: 700;
          --btn-line-height: 2.5rem;

          --btn-color-primary: #003436;
          --btn-text-color-primary: #fff;

          --btn-color-secondary: #007175;
          --btn-text-color-secondary: #fff;

          --btn-color-tertiary: #00AFB5;
          --btn-text-color-tertiary: #222;

          --btn-color-inverted: transparent;
          --btn-border-color-inverted: #003436;
          --btn-text-color-inverted: #003436;
          --btn-text-color-hover-inverted: #fff;
          
          --link-color: #003436;
          --link-hover-color: #00C896;

        }

        .link {
          color: var(--link-color);
          text-decoration: none;
          border-bottom: 1px dashed var(--link-color);
          transition: all 0.3s ease-in-out;

          &:hover {
            opacity: 0.5;
          }
        }
        
        .btn {
          display: inline-block;
          position: relative;

          background: var(--btn-color);
          border: 1px solid var(--btn-border-color);
          border-radius: var(--btn-border-radius);
          color: var(--btn-text-color);
          cursor: pointer;
          padding: var(--btn-padding);
          font-size: var(--btn-font-size);
          font-weight: var(--btn-font-weight);
          line-height: var(--btn-line-height);
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease-in-out;

          &:hover {
            opacity: 0.7;
          }

          &.primary {
            background: var(--btn-color-primary);
            border-color: var(--btn-color-primary);
            color: var(--btn-text-color-primary);
          }

          &.secondary {
            background: var(--btn-color-secondary);
            border-color: var(--btn-color-secondary);
            color: var(--btn-text-color-secondary);
          }

          &.tertiary {
            background: var(--btn-color-tertiary);
            border-color: var(--btn-color-tertiary);
            color: var(--btn-text-color-tertiary);
          } 

          &.inverted {
            background: var(--btn-color-inverted);
            border: 2px solid var(--btn-border-color-inverted);
            color: var(--btn-text-color-inverted);

            &:hover {
              background: var(--btn-border-color-inverted);
              color: var(--btn-text-color-hover-inverted);
            }
          }
        }
      </style>
      <a></a>
    `;

    // get all attributes
    this.allAttributes = this.getAttributeNames();
    // reflecting properties to attributes
    this.allAttributes.forEach((attribute) => {
      Object.defineProperty(this, attribute, {
        get() {
          return this.getAttribute(attribute);
        },
        set(value) {
          if (value) {
            this.setAttribute(attribute, value);
          } else {
            // for boolean attributes, the presence of the attribute represents true
            this.removeAttribute(attribute);
          }
        },
      });
    });

    // watch for textContent and boolean attribute changes
    this.mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this));
    this.mutationObserver.observe(this, {
      attributes: true,
      characterData: true, 
      childList: true, 
      subtree: true 
    });
  }

  // component attributes
  static get observedAttributes() {
    return ['url', 'colorscheme'];
  }
  
  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (!oldValue || oldValue === newValue) return;

    const thisLink = this.shadow.querySelector('a');
    const isButton = this.hasAttribute('isbutton');
    
    switch (property) {
      case 'url':
        thisLink.href = newValue;
        break;
      case 'colorscheme':
        const newClasses = thisLink.className.replace(/primary|secondary|tertiary|inverted/g, newValue);
        thisLink.setAttribute('class', newClasses);
        break;
    }
  }

  // boolean attributes and the textContent are changed via a mutation observer
  mutationObserverCallback(mutations) {
    mutations.forEach((mutation) => {
      // characterData and childList mutations are for textContent changes
      // characterData when textContent is changed directly with dev tools
      // childList when textContent is changed with js via properties
      if (mutation.type === 'characterData' || mutation.type === 'childList') {
        const link = this.shadow.querySelector('a');
        link.textContent = mutation.target.textContent;
      }

      // attributes mutations are for boolean attributes as they do not trigger the attributeChangedCallback
      // all other atributes are handled by the attributeChangedCallback
      // atributes to watch are isbutton and isexternal
      if (mutation.type === 'attributes') {
        const thisLink = this.shadow.querySelector('a');

        if (mutation.attributeName === 'isbutton') {
          this.isButton = mutation.target.getAttribute('isbutton');
          if (this.isButton === null) {
            thisLink.removeAttribute('role');
            thisLink.className = "link";
          } else {
            thisLink.setAttribute('role', 'button');
            const colorScheme = this.getAttribute('colorscheme');
            thisLink.className = `btn ${colorScheme}`;
          }
        } 

        if (mutation.attributeName === 'isexternal') {
          this.isExternal = mutation.target.getAttribute('isexternal');
          if (this.isExternal === null) {
            thisLink.removeAttribute('target');
            thisLink.removeAttribute('rel');
          } else {
            thisLink.setAttribute('target', '_blank');
            thisLink.setAttribute('rel', 'noopener noreferrer');
          }   
        }
      }
    });
  }

  async connectedCallback() {
    const url = this.getAttribute('url');
    const isButton = this.getAttribute('isbutton');
    const isExternal = this.getAttribute('isexternal');
    const colorScheme = this.getAttribute('colorscheme');
    const label = this.textContent;

    //create link element
    const link = this.shadow.querySelector('a');
    link.setAttribute('href', url);
    if (isExternal) { 
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
    if (isButton) { 
      link.setAttribute('role', 'button');
      link.setAttribute('aria-label', this.textContent);
      link.setAttribute('class', `btn ${colorScheme}`.trim()); // trim removes white space in case colorScheme is not set
    } else {
      link.setAttribute('class', `text-link ${colorScheme}`);
    }
    link.textContent = label;
  }

  disconnedtedCallback() {
    // remove mutation observer
    this.mutationObserver.disconnect();
  } 
}

// register component
customElements.define( 'link-component', LinkComponent );