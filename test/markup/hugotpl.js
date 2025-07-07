/*
Language: Hugo Template
Author: Irkode <irkode@rikode.de>
Description: Matcher for Hugo template language.
Website: https://irkopde.github.io/highlightjs-hugotpl
Category: template
*/

import * as hugo from './hugo-keywords.js'

export default function (hljs) {

  const re_hugo_BUILTINS = "/" + hugo.BUILTINS.join('|') + "/";

  // a sequence of words separated with DOTs
  const re_WORD_DOT_CHAIN = /\w+(\.\w+)*/;
  // a sequence of words separated with DOTs and starting with a DOT
  const re_DOT_WORD_CHAIN = /\.\w+(\.\w+)*/;

  // known words to style in pipeline
  const ACTION_KEYWORDS = {
    $pattern: /\w+/,
    'keyword': hugo.KEYWORDS,
  };
  // known words to style in pipeline
  const PIPELINE_KEYWORDS = {
    $pattern: /\w+/,
    'built_in': hugo.BUILTINS,
    'literal': hugo.LITERALS,
  };

  // names for block, define and template
  const TEMPLATE_NAME_REGEX = /"[a-zA-Z_][/\w]*"/;

  // action comments
  const re_COMMENT_OPEN = /\s*(\{\{- \/\*|\{\{\/\*)/;
  const re_COMMENT_CLOSE = /\*\/ -\}\}|\*\/\}\}/;

  // action commands
  const re_ACTION_OPEN = /\{\{- |\{\{(?!-)/;
  const re_ACTION_CLOSE = / -\}\}|(?<! -)\}\}/;

  // we want to style that differently
  const re_SYM_EQUAL = /\:?\=/
  const re_SYM_PIPE = /\|/

  // template variables
  const re_VARIABLE = /\$\w+/;


  // standalone context -> always list last to not capture variables or paths
  const GOTPL_CONTEXT_REGEX = /\.|\$/;
  const PIPE_OPERATOR_MODE = { scope: 'operator', match: re_SYM_PIPE, };
  const CONTEXT_MODE = { scope: 'template-variable.context', match: GOTPL_CONTEXT_REGEX };
  const DOT_PROPERTY_CHAIN = { scope: 'PROPERTY', match: /(\.\w+)+/ };
  const WORD_PROPERTY_CHAIN = { scope: 'PROPERTY', match: /\w+(\.\w+)*/ };

  // used after a builtin or function has been detected before
  // method submode - starting with a NON context DOT
  const METHOD_CHAIN_HELPER = {
    scope: 'METHOD_CHAIN_HELPER',
    begin: [/\./, /\w+/], beginScope: { 1: 'punctuation', 2: 'title', },
    contains: [DOT_PROPERTY_CHAIN],
  }
  // method chain - starting with a context DOT
  const PIPE_METHOD_MODE = {
    scope: 'PIPE_METHOD_MODE',
    begin: [/\.(?=\w+)/], beginScope: { 1: 'template-variable.context' },
    contains: [WORD_PROPERTY_CHAIN]
  };

  // two words identifier considered a built in
  const PIPE_FUNCTION_MODE = {
    scope: 'PIPE_FUNCTION_MODE',
    begin: hugo.FUNCTIONS_REGEX,
    keywords: { $pattern: /\w+\.\w+/, 'built_in': hugo.FUNCTIONS, },
    contains: [METHOD_CHAIN_HELPER]
  };
  // one word identifier followed by a DOT a function object that calls a method
  const PIPE_BUILTIN_MODE = {
    scope: 'PIPE_BUILTIN_MODE',
    keywords: { $pattern: /\w+/, 'built_in': hugo.BUILTINS, 'literal': hugo.LITERALS, },
    variants: [
      { begin: /\w+(?=\.)/, contains: [METHOD_CHAIN_HELPER], },
      { match: /\w+/ }
    ]
  };

  //template variable
  const PIPE_VARIABLE_MODE = {
    scope: 'PIPE_VARIABLE_MODE',
    variants: [
      { begin: [/\$\w+(?=\.)/], beginScope: { 1: 'template-variable.context', }, contains: [METHOD_CHAIN_HELPER], },
      { match: re_VARIABLE, scope: 'template-variable' },
    ],
  };

  // there's no way to know which end token has been captured, so we shift anayzing to a new mode
  // needed to not treat a . after a closing paren as template-variable.context
  const PIPE_EXPRESSION_MODE = {
    // scope: 'GOTPL_SUB_EXPRESSION',
    begin: [/\(/], beginScope: { 1: 'punctuation' },
    // content will be added after all modes are defined
  };

  const EXPRESSION_CLOSE_WITH_CHAIN_MODE = {
    // scope: 'EXPRESSION_CLOSE_MODE',
    begin: [/\)(?=\.)/], beginScope: { 1: 'punctuation', },
    contains: [METHOD_CHAIN_HELPER],
  };
  const EXPRESSION_CLOSE_MODE = { scope: 'punctuation', match: /\)/ };

  const PIPELINE_CONTENT = [
    // end subexpression and handle possible following dot correctly
    EXPRESSION_CLOSE_WITH_CHAIN_MODE,
    EXPRESSION_CLOSE_MODE,
    // other modes contained. Order matters!
    hljs.NUMBER_MODE,
    hljs.QUOTE_STRING_MODE,
    PIPE_FUNCTION_MODE,
    PIPE_BUILTIN_MODE,
    PIPE_METHOD_MODE,
    PIPE_VARIABLE_MODE,
    PIPE_OPERATOR_MODE,
    PIPE_EXPRESSION_MODE,
  ];

  PIPE_EXPRESSION_MODE.contains = PIPELINE_CONTENT

  const PIPELINE_MODE = {
    // scope: 'GOTPL_PIPELINE',
    end: [re_ACTION_CLOSE], endScope: { 1: 'template-tag' }, endsParent: true,
    contains: PIPELINE_CONTENT,
  }

  //
  // toplevel action modes
  // alphabetical - actual order is defined in return below
  //
  const ACTION_ASSIGN_MODE = {
    // scope: 'ACTION_ASSIGN',
    begin: [re_ACTION_OPEN, /\s*/, re_VARIABLE, /\s*/, re_SYM_EQUAL],
    beginScope: { 1: 'template-tag', 3: 'template-variable', 5: 'operator' },
    contains: [PIPELINE_MODE],
  };

  const ACTION_BLOCK_MODE = {
    // scope: 'ACTION_BLOCK_MODE',
    begin: [re_ACTION_OPEN, /\s*/, /block|template/, /\s*/, TEMPLATE_NAME_REGEX, /\s*/],
    beginScope: { 1: 'template-tag', 5: 'string' },
    contains: [PIPELINE_MODE],
  };

  const ACTION_COMMAND_MODE = {
    // scope: 'ACTION_COMMAND_MODE',
    begin: [re_ACTION_OPEN, /\s*/, /else\s+if|if|range|return|try|with/, /\s*/],
    beginScope: { 1: 'template-tag' },
    contains: [PIPELINE_MODE],
  };

  const ACTION_DEFINE_MODE = {
    // scope: 'ACTION_DEFINE_MODE',
    begin: [re_ACTION_OPEN, /\s*/, /define|template/, /\s*/, TEMPLATE_NAME_REGEX, /\s*/, re_ACTION_CLOSE,],
    beginScope: { 1: 'template-tag', 5: 'name', 7: 'template-tag', },
  };

  const ACTION_KEYWORD_MODE = {
    // scope: 'ACTION_KEYWORD_MODE',
    begin: [re_ACTION_OPEN, /\s*/, /break|continue|else|end/, /\s*/, re_ACTION_CLOSE],
    beginScope: { 1: 'template-tag', 5: 'template-tag' },
  };

  const ACTION_VAR_MODE = {
    // scope: 'ACTION_VAR_MODE',
    begin: [re_ACTION_OPEN, /\s*/, /range|else\s+with|with/, /\s+/, re_VARIABLE, /\s*/, re_SYM_EQUAL],
    beginScope: { 1: 'template-tag', 5: 'template-variable', 7: 'operator' },
    contains: [PIPELINE_MODE],
  }
  const ACTION_VARVAR_MODE = {
    // scope: 'ACTION_VARVAR_MODE',
    begin: [re_ACTION_OPEN, /\s*/, /range/, /\s+/, re_VARIABLE, /\s*/, /,/, /\s*/, re_VARIABLE, /\s*/, re_SYM_EQUAL],
    beginScope: { 1: 'template-tag', 5: 'template-variable', 7: 'punctuation', 9: 'template-variable', 11: 'operator' },
    contains: [PIPELINE_MODE],
  };

  const ACTION_PIPELINE_MODE = {
    // scope: 'ACTION_PIPELINE_MODE',
    begin: [re_ACTION_OPEN], beginScope: { 1: 'template-tag', },
    keywords: PIPELINE_KEYWORDS,
    contains: [PIPELINE_MODE],
  }

  return {
    name: 'hugotpl',
    aliases: [
      'hugo-template',
      'hugo-tpl'
    ],
    case_insensitive: false,
    //subLanguage: 'xml',
    keywords: ACTION_KEYWORDS,
    ignoreIllegals: false,
    contains: [
      hljs.COMMENT(re_COMMENT_OPEN, re_COMMENT_CLOSE, { relevance: 5, }),
      ACTION_KEYWORD_MODE,
      ACTION_DEFINE_MODE,
      // following will start pipeline
      ACTION_BLOCK_MODE,
      ACTION_ASSIGN_MODE,
      ACTION_VAR_MODE,
      ACTION_VARVAR_MODE,
      ACTION_COMMAND_MODE,
      // generic pipeline without initial keyword
      ACTION_PIPELINE_MODE,
    ],
  }
}
