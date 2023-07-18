/**
 * @name CTALink
 * @description CTA Link for links to be rendered as either a text or a button link.
 * @example <cta-Link url="https://www.apple.com" label="learn more" isButton="true" colorScheme="primary" isExternal="true">Label</cta-Link>
 * @param {string} url - url for link
 * @param {string} label - label for link
 * @param {string} isButton - if true link is renders as a button, else as a text link
 * @param {string} colorScheme - color scheme for button link, primary, secondary or inverted
 * @param {string} isExternal - if true link is rendered as an external link
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
  }

  // component attributes
  static get observedAttributes() {
    return ['url', 'isButton', 'colorScheme', 'isExternal'];
  }
  
  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (!oldValue || oldValue === newValue) return;

    console.log('property', property);

    const link = this.shadow.querySelector('a');
    
    switch (property) {
      case 'url':
        link.url = newValue;
        break;
      case 'label':
        link.textContent = newValue;
        break;
      case 'isButton':
        this.isButton = newValue;
        break;
      case 'colorScheme':
        this.colorScheme = newValue;
        break;
      case 'isExternal':
        this.isExternal = newValue;
        break;
      default:
        break;
    }
  }
  
  async connectedCallback() {
    const url = this.getAttribute('url');
    const isButton = this.getAttribute('isButton');
    const isExternal = this.getAttribute('isExternal');
    const colorScheme = this.getAttribute('colorScheme');

    /**
     * create link element
     */
    const link = this.shadow.querySelector('a');
    link.setAttribute('href', url);
    if (isExternal === 'true') { 
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
    if (isButton === 'true') { 
      link.setAttribute('role', 'button');
      link.setAttribute('aria-label', this.textContent);
      link.setAttribute('class', `btn ${colorScheme}`.trim()); // trim removes white space in case colorScheme is not set
    } else {
      link.setAttribute('class', `link ${colorScheme}`);
    }
    link.textContent = this.textContent;
    
  }
}

// register component
customElements.define( 'link-component', LinkComponent );