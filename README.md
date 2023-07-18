# TitleBlock
A Web Component for a Header

The title web component provides a title block with a prefix, title, and subtitle. The prefix and subtitle are optional. The title may be truncated with an ellipsis and AP Title Case may be applied to the title.

[![npm: version][npm-badge]][npm-url]
[![license: ISC][license-badge]][license-url]

## Installation
```bash
npm install titleblock
```
## Usage
```html
<title-block
      prefix="your prefix"
      title="your title" 
      subtitle="your subtitle"
      headerTag="h1"
      titlelength="40"
      apstyle="yes"
    ></title-block>
```
## Attributes
| Attribute | Type | Description |
| --- | --- | --- |
| prefix | String | The prefix to the title |
| title | String | The title |
| subtitle | String | The subtitle |
| headerTag | String | The header tag to use for the title. Valid values are h1, h2, h3, h4, h5, and h6. Default is h1. |
| titlelength | Number | The maximum length of the title before truncation. Default is 40. |
| apstyle | String | If yes, the title will be converted to AP Title Case. Default is no. |

## Styling
The title block can be styled with CSS. The following CSS variables are available:
| CSS Variable | Default |
| --- | --- |
| --title-font-family | serif |
| --title-font-size | 2.5rem |
| --title-font-weight | 700 |
| --title-font-style | normal |
| --title-color | #000000 |
| --prefix-font-family | sans-serif |
| --prefix-font-size | 1rem |
| --prefix-font-weight | 300 |
| --prefix-font-style | serif |
| --prefix-color | #000000 |
| --subtitle-font-family | sans-serif |
| --subtitle-font-size | 1.5rem |
| --subtitle-font-weight | 700 |
| --subtitle-font-style | normal |
| --subtitle-color | #000000 |

To change set the color of the title to red, for example, add the following to your CSS:
```css
title-block {
  --title-color: red;
}
```



## License
[MIT](https://github.com/wernerglinka/titleblock/blob/main/LICENSE)

## Author
[Werner Glinka](werner@glinka.co)

[npm-badge]: https://img.shields.io/npm/v/titleblock.svg
[npm-url]: https://www.npmjs.com/package/titleblock
[license-badge]: https://img.shields.io/github/license/wernerglinka/titleblock
[license-url]: LICENSE