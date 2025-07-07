---
title: Class reference
---

# Highlight-JS Hugo - Class reference

This document is valid for both modules: `hugo-html` and `hugo-text`

## Core modes used

- hljs.NUMBER_MODE
- hljs.QUOTE_STRING_MODE
- hljs.COMMENT

## Scopes (Classes) explicitly set with hugo-\*.js

The following classes are used to style the output. Make sure your style has a definition for them.

- operator

   The Pipe `|` is special in Hugo, so we use the _operator_ class.

- property

   We style every dot word chain as property **except** if it starts with a _built_in_. In these cases we use _built_in_
   for the start (one or two words). see also _title.function.invoke_ below.

- punctuation

   Will be used for opening and closing parenthesis `()`

- string

   Names used in `block`, `partial`, and `define` are styled as _string_ and matched with a special regex.

- template-tag

   opening and closing template tags

- template-variable

   All occurrences of variables `$variable`

- template-variable.context (new by hugo modules)

   The _Context_ is a special thing in Hugo templating so we added a special class here. Use that in your CSS to create
   a different visual appearance for _Context_. Ofc all, styles out there do not define this one. So without adding
   something special it will be styled as `template-variable` which is the standard HighlightJS fallback method.

- title.function.invoke (special)

   If a _built_in_ is followed by a _dot_ this must be an object. Knowing it's something special and it definitely calls
   something we style it using the `invoke` subclass of _title.function_. Up-to-date styles may define this. If not
   standard fallback rules apply.

## Keywords used

We use the following keyword settings based on Go templating plus all functions added by Hugo.

- literal

   `false`, `true` and `nil`

- keyword

   Documented in [Hugo - Go template functions](https://gohugo.io/functions/go-template/)

- built_in

   Documented in [Hugo - Functions](https://gohugo.io/functions/) except the _keywords_ above.

   Hugo's functions are namespaced and for some we have aliases without namespace. We style **both** as _built_in_.
   Example `strings.Replace` and it's alias `replace`.
