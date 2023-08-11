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

          --link-white-space: nowrap;

        }

        .text-link {
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
          white-space: var(--link-white-space);
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

    this.link = this.shadow.querySelector('a');

    // cache the state of the component
    this.props = {
      url: "",
      colorscheme: "",
      isbutton: false,
      isexternal: false,
      label: ""
    };

    this.updateLink = link => {
      link.setAttribute('href', this.props.url);
      if (this.props.isexternal) { 
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      } else {
        link.removeAttribute('target');
        link.removeAttribute('rel');
      }
      if (this.props.isbutton) { 
        link.setAttribute('role', 'button');
        link.setAttribute('aria-label', this.props.label);
        link.setAttribute('class', `btn ${this.props.colorscheme}`.trim()); // trim removes white space in case colorScheme is not set
      } else {
        link.setAttribute('class', `text-link`);
        // if updated from button to text link remove these attributes
        link.removeAttribute('role');
        link.removeAttribute('aria-label');
      }
      link.textContent = this.props.label;
    }

    // watch for textContent and boolean attribute changes
    this.mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this));
    this.mutationObserver.observe(this, {
      attributes: true,
      characterData: true, 
      childList: true, 
      subtree: true 
    });
  } // end constructor

  // component attributes
  static get observedAttributes() {
    return ['url', 'colorscheme', 'isbutton', 'isexternal'];
  }

  // explicitly define properties reflecting to attributes
  get url() {
    return this.props.url;
  }
  set url(value) { 
    this.props.url = value;
    this.updateLink(this.link);
  }
  get colorscheme() {
    return this.props.colorscheme;
  }
  set colorscheme(value) { 
    this.props.colorscheme = value;
    this.updateLink(this.link);
  }
  get isbutton() {
    return this.props.isbutton;
  }
  set isbutton(value) { 
    this.props.isbutton = !!value;
    this.updateLink(this.link);
  }
  get isexternal() {
    return this.props.isexternal;
  }
  set isexternal(value) { 
    this.props.isexternal = !!value;
    this.updateLink(this.link);
  }
  
  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (!oldValue || oldValue === newValue) return;

    switch (property) {
      case 'url':
        this.props.url = newValue;
        break;
      case 'colorscheme':
        this.props.colorscheme = newValue;
        break;
    }

    this.updateLink(this.link);
  }

  // boolean attributes and the textContent are changed via a mutation observer
  mutationObserverCallback(mutations) {
    mutations.forEach((mutation) => {
      /**
       * characterData and childList mutations are for textContent changes
       */

      if (mutation.type === 'characterData' || mutation.type === 'childList') {
        this.props.label = mutation.target.textContent;
      }

      /**
       * @notes
       * For boolean attributes, we use attribute mutations since they don't trigger 
       * the `attributeChangedCallback`. All other attribute changes are managed by the 
       * `attributeChangedCallback`.
       */
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'isbutton') {
          this.props.isbutton = !!mutation.target.hasAttribute('isbutton');
        } 
        if (mutation.attributeName === 'isexternal') {
          this.props.isexternal = !!mutation.target.hasAttribute('isexternal');  
        }
      }
      this.updateLink(this.link);
    });
  } // end mutationObserverCallback

  async connectedCallback() {
    this.props.url = this.getAttribute('url');
    this.props.isbutton = this.hasAttribute('isbutton');
    this.props.isexternal = this.hasAttribute('isexternal');
    this.props.colorscheme = this.getAttribute('colorscheme');
    this.props.label = this.textContent;

    //create link element
    const link = this.shadow.querySelector('a');

    this.updateLink(link);
  }

  disconnectedCallback() {
    // remove mutation observer
    this.mutationObserver.disconnect();
  } 
}

// register component
customElements.define( 'link-component', LinkComponent );