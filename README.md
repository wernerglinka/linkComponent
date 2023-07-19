# LinkComponent
A Web Component for Links

The link component offers two primary rendering options - text links and button links. Additionally, it provides features to choose a color scheme for the button link and specify if the link should open in a new tab (external link).

[![npm: version][npm-badge]][npm-url]
[![license: ISC][license-badge]][license-url]

## Installation
```bash
npm install linkcomponent
```
## Usage
```html
<link-component
  url="https://www.apple.com" 
  isbutton="true" 
  colorscheme="primary" 
  isexternal="true"
>Learn More</link-component>
```
## Attributes
| Attribute | Type | Description |
| --- | --- | --- |
| url | string | The URL to link to |
| isbutton | boolean | If exists, the link will be rendered as a button |
| colorscheme | string | The color scheme of the button. Options are primary, secondary, tertiary and inverted |
| isexternal | boolean | If exists, the link will open in a new tab |

## Styling
The link component can be styled with CSS. The following CSS variables are available:
| CSS Variable | Default |
| --- | --- |
| --btn-color | #003436 |
| --btn-text-color | #fff |
| --btn-border-radius | 0 |
| --btn-padding | 0rem 2.5rem |
| --btn-font-size | 1rem |
| --btn-font-weight | 700 |
| --btn-line-height | 2.5rem |
| --btn-color-primary | #003436 |
| --btn-text-color-primary | #fff |
| --btn-color-secondary | #007175 |
| --btn-text-color-secondary | #fff |
| --btn-color-tertiary | #00AFB5 |
| --btn-text-color-tertiary | #222 |
| --btn-color-inverted | transparent |
| --btn-border-color-inverted | #003436 |
| --btn-text-color-inverted | #003436 |
| --btn-text-color-hover-inverted | #fff |
| --link-color | #003436 |
| --link-hover-color | #00C896 |


To change the button color to red, for example, add the following to your CSS:
```css
link-component {
  --btn-color: red;
}
```



## License
[MIT](https://github.com/wernerglinka/linkComponent/blob/main/LICENSE)

## Author
[Werner Glinka](werner@glinka.co)

[npm-badge]: https://img.shields.io/npm/v/@wernerglinka/linkcomponent.svg
[npm-url]: https://www.npmjs.com/package/@wernerglinka/linkcomponent
[license-badge]: https://img.shields.io/github/license/wernerglinka/linkComponent
[license-url]: LICENSE