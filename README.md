# Hugo TEXT Template Language Grammar for Highlight.js

[![license](https://badgen.net/badge/license/MIT/blue)](LICENSE)

A language grammar to highlight [Hugo](https://gohugo.io)'s templating language with Highlight.js.

- [CSS class reference](css-class-reference.md)

## A word on auto detection

_Handlebars_ and _Go templates_ (used by _Hugo_) have similar template tags. Without setting any relevance the Hugo
modules will in most cases loose. To overcome this situation we use the following relevance settings trying to beat
Handlebars and still make it win for its own templates.

- for Go template comments we use relevance = 10.

   comments start with start with `{{/*` or `{{- /*` and end with `*/}}` or `*/ - }}`

- the opening tag `{{-` is very special to Go templates, so we use relevance = 10

- for functions in the _hugo_ namespace we use Relevance = 10 (e.g. hugo.IsDevelopment)

- We mark the following _Handlebars_ opening template tags as invalid for the hugo modules: `{{#`, `{{>`, `{{!--`, `{{!`

Known limitation:

We are unsure what happens if you include include `hugo-html` and `hugo.text`. Maybe the HTML variant will win if
there's enough HTML around. Maybe not, maybe dependent on import order...

In most cases you want the `hugo-html` module only. If not, specify the language for each code block in that case.

## Usage

Include the highlight.js library in your webpage or Node app, then load this module.

### Static website or simple usage

Load the module after loading Highlight.js. Take the minified version from `dist` directory.

```html
<script type="text/javascript" src="/path/to/hugo-highlight.min.js"></script>
<script type="text/javascript" src="/path/to/hugo-text.min.js"></script>
<script type="text/javascript">
   hljs.highlightAll();
</script>
```

<!-- TODO: publish to a CDN later

### Using directly from the UNPKG CDN

```html
<script
   type="text/javascript"
   src="https://unpkg.com/highlightjs-hugo-text@0.1.0/dist/hugo-text.min.js"
></script>
```

-  More info: <https://unpkg.com>
-->

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with
Highlight.js.

```javascript
var hljs = require("highlight.js");
var hljsHugo = require("hugo-text");

hljs.registerLanguage("hugo-text", hljsHugo);
hljs.highlightAll();
```

## License

This package is released under the MIT License. See [LICENSE](LICENSE) file for details.

### Author & Maintainer

- Irkode <irkode@rikode.de>

## Links

- HighlightJS Hugo modules:

   - [HighlightJS - Hugo HTML](https://github.com/irkode/highlightjs-hugo-html)
   - [HighlightJS - Hugo TEXT](https://github.com/irkode/highlightjs-hugo-text)

- [Highlight.js](https://highlightjs.org/) - [[view on GitHub]](https://github.com/highlightjs/highlight.js)

- [Hugo](https://gohugo.io/) - [[view on GitHub]](https://github.com/gohugoio/hugo)

- Go templating language
   - https://pkg.go.dev/html/template
   - https://pkg.go.dev/text/template

---

This module is generated from a private repo, which as of now is a quite evil hack...

- scans the hugoDocs for functions and built_ins
- builds the javascript highlighter from a template
- generates the supplemental files needed by highlight.js
- populates the testcases depending on the variant
- runs build and tests
- pushes the updated stuff to the module repositories

