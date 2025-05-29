---
title: Class reference
---

# Highlight-JS Hugo - Class reference

## Core modes used

- hljs.NUMBER_MODE
- hljs.QUOTE_STRING_MODE
- hljs.COMMENT

## Scopes (Classes) explicitly set with hugo.js

We use the following classes to style our output

- operator

   The Pipe `|` is special in Hugo, so we use the _operator_ class for it.

- property

   We style every dot word chain as property except if it starts with a _built_in_. In these cases we use _built_in_ for
   the start (one or two words). see also _title.function.invoke_ below.

- punctuation

   Will be used for opening and closing parenthesis `()`

- string

   Names use in `block`, `partial`, and `define` are styled as _string_ and matched with a special regex.

- template-tag

   opening and closing template tags

- template-variable

   All occurances of variables `$variable`

- template-variable.context

   The _Context_ is a special thing in Hugo templating so have a special class here. You may define that to create a
   different visual appearance for the _Context_ and a variable.

- title.function.invoke

   If a _built_in_ is followed by a _dot_ this must be an object. Knowing it's something special and it definitely calls
   something we style it using the `invoke` subclass of _title.function_

## Keywords used

We use the common keywords based on standard Go templating adjusted for Hugo

- literal

   just `false`, `true` and `nil`

- keyword

   as documented in [Hugo - Go template functions](https://gohugo.io/functions/go-template/)

- built_in

   as documented in [Hugo - Functions](https://gohugo.io/functions/) except the _keywords_ above.

   Hugo's functions usually have a namespace and for those used often an alias is defined. We style both as _built_in_.
   Example `strings.Replace` and the alias `replace`.
