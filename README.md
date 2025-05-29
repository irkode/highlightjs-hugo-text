# Hugo Template Language Grammar for Highlight.js

[![license](https://badgen.net/badge/license/MIT/blue)](LICENSE)

A language grammar to highlight [Hugo](https://gohugo.io)'s templating language with Highlight.js.

- [CSS class reference](css-class-reference.md)

## Usage

Simply include the highlight.js library in your webpage or Node app, then load this module.

### Static website or simple usage

Simply load the module after loading Highlight.js. Take the minified version from `dist` directory.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/highlightjs-hugo.min.js"></script>
<script type="text/javascript">
   hljs.highlightAll();
</script>
```

<!-- TODO: publish to a CDN later

### Using directly from the UNPKG CDN

```html
<script
   type="text/javascript"
   src="https://unpkg.com/highlightjs-hugo@0.1.0/dist/highlightjs-hugo.min.js"
></script>
```

-  More info: <https://unpkg.com>
-->

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with
Highlight.js.

```javascript
var hljs = require("highlight.js");
var hljsHugo = require("highlightjs-hugo");

hljs.registerLanguage("highlightjs-hugo", hljsHugo);
hljs.highlightAll();
```

## License

This package is released under the MIT License. See [LICENSE](LICENSE) file for details.

### Author & Maintainer

- Irkode <irkode@rikode.de>

## Links

- [HighlightJS Hugo](https://github.com/irkode/highlightjs-hugo) - [GitHub](https://irkode.github.com/highlightjs-hugo)

- Highlight.js Library

   - Homepage: <https://highlightjs.org/>.
   - GitHub: <https://github.com/highlightjs/highlight.js>

- Hugo

   - Homepage: <https://gohugo.io/>.
   - GitHub: <https://github.com/gohugoio/hugo>

- Go templating language
   - https://pkg.go.dev/text/template
   - https://pkg.go.dev/html/template
