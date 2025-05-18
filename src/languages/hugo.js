/*
Language: Hugo Template
Author: Irkode <irkode@rikode.de>
Description: Go templating grammar for Hugo
Website: https://irkopde.github.io/highlightjs-hugo
Category: template
*/

import * as kw from './keywords.js'

export default function (hljs) {

   // names for block, define and template
   const re_TEMPLATE_NAME = /"([a-zA-Z_]\w*)(\/[a-zA-Z_]\w*)*"/

   // action comments
   const re_COMMENT_OPEN = /\s*(\{\{- \/\*|\{\{\/\*)/;
   const re_COMMENT_CLOSE = /\*\/ -\}\}|\*\/\}\}/;

   // action commands
   const re_ACTION_OPEN = /\{\{- |\{\{(?!-)/;
   const re_ACTION_CLOSE = / -\}\}|(?<! -)\}\}/;

   // template variables
   const re_VARIABLE = /\$\w+/;

   // standalone context -> always list last to not capture variables or paths
   const PIPE_OPERATOR_MODE = { scope: 'operator', match: /\|/, };
   const CONTEXT_ONLY_MODE = { scope: 'template-variable.context', match: /\.|\$/ };
   const DOT_PROPERTY_CHAIN = { scope: 'property', match: /(\.\w+)+/ };

   const METHOD_CHAIN_HELPER = {
      // scope: METHOD_CHAIN_HELPER',
      variants: [
         // used after a builtin or function has been detected before
         { begin: [/\./, /\w+/], beginScope: { 1: 'property', 2: 'title.function.invoke', }, },
         // method submode - starting with a WORD
         { begin: [/\w+/], beginScope: { 1: 'title.function.invoke', }, },
      ],
      contains: [DOT_PROPERTY_CHAIN],
   };
   // method chain - starting with a context DOT
   const PIPE_CONTEXT_MODE = {
      // scope: 'PIPE_CONTEXT_MODE',
      begin: [/\.(?=\w+)/], beginScope: { 1: 'template-variable.context' },
      contains: [METHOD_CHAIN_HELPER],
   };

   // two words identifier considered a built in
   const PIPE_FUNCTION_MODE = {
      // scope: 'PIPE_FUNCTION_MODE',
      begin: kw.FUNCTION_REGEX,
      keywords: FUNCTION_KEYWORDS,
      contains: [METHOD_CHAIN_HELPER]
   };
   // one word identifier followed by a DOT a function object that calls a method
   const PIPE_BUILTIN_MODE = {
      // scope: 'PIPE_BUILTIN_MODE',
      variants: [
         { begin: /\w+(?=\.)/, contains: [METHOD_CHAIN_HELPER] },
         { match: /\w+/ }
      ],
      keywords: PIPELINE_KEYWORDS,
   };

   //template variable
   const PIPE_VARIABLE_MODE = {
      // scope: 'PIPE_VARIABLE_MODE',
      variants: [
         { begin: [/\$\w+(?=\.)/], beginScope: { 1: 'template-variable', }, contains: [METHOD_CHAIN_HELPER] },
         { match: /\$\w+/, scope: 'template-variable' },
      ],
   };

   // there's no way to know which end token has been captured, so we shift anayzing to a new mode
   // needed to not treat a . after a closing paren as template-variable.context
   const PIPE_EXPRESSION_MODE = {
      // scope: 'PIPE_EXPRESSION',
      begin: [/\(/], beginScope: { 1: 'punctuation' },
      // content will be added after all modes are defined
   };

   const PIPE_EXPRESSION_CLOSE_WITH_CHAIN_MODE = {
      // scope: 'EXPRESSION_CLOSE_MODE',
      begin: [/\)(?=\.)/], beginScope: { 1: 'punctuation', },
      contains: [METHOD_CHAIN_HELPER],
   };
   const PIPE_EXPRESSION_CLOSE_MODE = { scope: 'punctuation', match: /\)/ };

   const PIPELINE_CONTENT = [
      // end subexpression and handle possible following dot correctly
      PIPE_EXPRESSION_CLOSE_WITH_CHAIN_MODE,
      PIPE_EXPRESSION_CLOSE_MODE,
      // other modes contained. Order matters!
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      PIPE_FUNCTION_MODE,
      PIPE_BUILTIN_MODE,
      PIPE_CONTEXT_MODE,
      PIPE_VARIABLE_MODE,
      PIPE_OPERATOR_MODE,
      CONTEXT_ONLY_MODE,
      PIPE_EXPRESSION_MODE,
   ];

   PIPE_EXPRESSION_MODE.contains = PIPELINE_CONTENT

   const PIPELINE_MODE = {
      // scope: 'PIPELINE',
      end: [re_ACTION_CLOSE], endScope: { 1: 'template-tag' }, endsParent: true,
      contains: PIPELINE_CONTENT,
   }

   //
   // toplevel action modes
   // alphabetical - actual order is defined in return below
   //
   const ACTION_ASSIGN_MODE = {
      // scope: 'ACTION_ASSIGN',
      begin: [re_ACTION_OPEN, /\s*/, re_VARIABLE, /\s*/, /\:?\=/],
      beginScope: { 1: 'template-tag', 3: 'template-variable', 5: 'operator' },
      keywords: ACTION_KEYWORDS,
      relevance: 5,
      contains: [PIPELINE_MODE],
   };

   const ACTION_BLOCK_MODE = {
      // scope: 'ACTION_BLOCK_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /block|template/, /\s*/, re_TEMPLATE_NAME, /\s*/],
      beginScope: { 1: 'template-tag', 5: 'string' },
      keywords: ACTION_KEYWORDS,
      relevance: 5,
      contains: [PIPELINE_MODE],
   };

   const ACTION_COMMAND_MODE = {
      // scope: 'ACTION_COMMAND_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /else\s+if|if|range|return|try|with/, /\s*/],
      beginScope: { 1: 'template-tag' },
      keywords: ACTION_KEYWORDS,
      relevance: 5,
      contains: [PIPELINE_MODE],
   };

   const ACTION_DEFINE_MODE = {
      // scope: 'ACTION_DEFINE_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /define|template/, /\s*/, re_TEMPLATE_NAME, /\s*/, re_ACTION_CLOSE,],
      beginScope: { 1: 'template-tag', 5: 'string', 7: 'template-tag', },
      relevance: 5,
      keywords: ACTION_KEYWORDS,
   };

   const ACTION_KEYWORD_MODE = {
      // scope: 'ACTION_KEYWORD_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /break|continue|else|end/, /\s*/, re_ACTION_CLOSE],
      beginScope: { 1: 'template-tag', 5: 'template-tag' },
      relevance: 5,
      keywords: ACTION_KEYWORDS,
   };

   const ACTION_VAR_MODE = {
      // scope: 'ACTION_VAR_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /range|else\s+with|with/, /\s+/, re_VARIABLE, /\s*/, /\:?\=/],
      beginScope: { 1: 'template-tag', 5: 'template-variable', 7: 'operator' },
      keywords: ACTION_KEYWORDS,
      relevance: 5,
      contains: [PIPELINE_MODE],
   }
   const ACTION_RANGE_MODE = {
      // scope: 'ACTION_RANGE_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /range/, /\s+/, re_VARIABLE, /\s*/, /,/, /\s*/, re_VARIABLE, /\s*/, /\:?\=/],
      beginScope: { 1: 'template-tag', 5: 'template-variable', 7: 'punctuation', 9: 'template-variable', 11: 'operator' },
      keywords: ACTION_KEYWORDS,
      relevance: 5,
      contains: [PIPELINE_MODE],
   };

   const ACTION_PIPELINE_MODE = {
      // scope: 'ACTION_PIPELINE_MODE',
      begin: [re_ACTION_OPEN], beginScope: { 1: 'template-tag', },
      keywords: PIPELINE_KEYWORDS,
      contains: [PIPELINE_MODE],
   };

   return {
      name: 'hugo',
      aliases: [
         'hugo-template',
         'hugo-tpl'
      ],
      case_insensitive: false,
      //subLanguage: '',
      ignoreIllegals: false,
      contains: [
         hljs.COMMENT(re_COMMENT_OPEN, re_COMMENT_CLOSE, { relevance: 5, }),
         // stop highlighting if a handlebars begin tag is found
         { begin: /\{\{(#|>|!--|!)/, end: /\}\}/, illegal: /.*/, },
         // start sub mode to avoid highlighting keywords outside a template action
         {
            // scope: 'TEMPLATE_ACTION'
            // raise relevance for special hugo template tag '{{- '
            variants: [
               { begin: /\{\{- /, returnBegin: true, relevance: 5, },
               { begin: /\{\{(?!-)/, returnBegin: true, },
            ],
            keywords: ACTION_KEYWORDS,
            contains: [
               ACTION_KEYWORD_MODE,
               ACTION_DEFINE_MODE,
               // following will start pipeline
               ACTION_BLOCK_MODE,
               ACTION_ASSIGN_MODE,
               ACTION_VAR_MODE,
               ACTION_RANGE_MODE,
               ACTION_COMMAND_MODE,
               // generic pipeline without initial keyword
               ACTION_PIPELINE_MODE,
            ],
         },
      ],
   };
}
