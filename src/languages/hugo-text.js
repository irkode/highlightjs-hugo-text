/*
Language: Hugo Template

Author: Irkode <irkode@rikode.de>
Description: Go templating grammar for Hugo
Website: https://irkopde.github.io/highlightjs-hugo
Category: template
*/

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

// START: H4H keyword based generated code
const H4H_BUILT_IN = [
  "findRESubmatch",
  "partialCached",
  "safeHTMLAttr",
  "htmlUnescape",
  "base64Encode",
  "base64Decode",
  "singularize",
  "markdownify",
  "fingerprint",
  "relLangURL",
  "newScratch",
  "htmlEscape",
  "fileExists",
  "dateFormat",
  "countwords",
  "countrunes",
  "complement",
  "absLangURL",
  "unmarshal",
  "safeJSStr",
  "replaceRE",
  "pluralize",
  "intersect",
  "highlight",
  "hasSuffix",
  "hasPrefix",
  "anchorize",
  "urlquery",
  "truncate",
  "slicestr",
  "safeHTML",
  "readFile",
  "plainify",
  "humanize",
  "erroridf",
  "duration",
  "warnidf",
  "symdiff",
  "shuffle",
  "safeURL",
  "safeCSS",
  "replace",
  "readDir",
  "querify",
  "println",
  "postCSS",
  "partial",
  "modBool",
  "keyVals",
  "jsonify",
  "getJSON",
  "emojify",
  "delimit",
  "default",
  "xxhash",
  "urlize",
  "substr",
  "string",
  "sha256",
  "safeJS",
  "relURL",
  "relref",
  "printf",
  "minify",
  "getenv",
  "getCSV",
  "findRE",
  "errorf",
  "append",
  "absURL",
  "where",
  "warnf",
  "upper",
  "union",
  "toCSS",
  "title",
  "split",
  "slice",
  "print",
  "merge",
  "lower",
  "isset",
  "index",
  "group",
  "float",
  "first",
  "chomp",
  "babel",
  "apply",
  "after",
  "uniq",
  "trim",
  "time",
  "sort",
  "site",
  "sha1",
  "page",
  "last",
  "i18n",
  "hmac",
  "dict",
  "cond",
  "sub",
  "seq",
  "ref",
  "pow",
  "now",
  "not",
  "mul",
  "mod",
  "md5",
  "len",
  "int",
  "div",
  "and",
  "add",
  "or",
  "ne",
  "lt",
  "le",
  "in",
  "gt",
  "ge",
  "eq",
  "T"
];

const H4H_FUNCTION = [
  "transform.HighlightCodeBlock",
  "resources.ExecuteAsTemplate",
  "strings.ContainsNonSpace",
  "lang.FormatNumberCustom",
  "transform.PortableText",
  "transform.HTMLUnescape",
  "transform.CanHighlight",
  "strings.FindRESubmatch",
  "partials.IncludeCached",
  "collections.NewScratch",
  "collections.Dictionary",
  "collections.Complement",
  "transform.Markdownify",
  "resources.PostProcess",
  "resources.Fingerprint",
  "lang.FormatAccounting",
  "encoding.Base64Encode",
  "encoding.Base64Decode",
  "collections.Intersect",
  "transform.HTMLEscape",
  "resources.FromString",
  "transform.XMLEscape",
  "transform.Unmarshal",
  "transform.Remarshal",
  "transform.Highlight",
  "strings.SliceString",
  "strings.ContainsAny",
  "resources.GetRemote",
  "lang.FormatCurrency",
  "inflect.Singularize",
  "images.GaussianBlur",
  "images.ColorBalance",
  "hugo.IsMultilingual|10",
  "compare.Conditional",
  "collections.SymDiff",
  "collections.Shuffle",
  "collections.Reverse",
  "collections.Querify",
  "collections.KeyVals",
  "collections.Delimit",
  "transform.Plainify",
  "time.ParseDuration",
  "strings.TrimSuffix",
  "strings.TrimPrefix",
  "strings.FirstUpper",
  "strings.CountWords",
  "strings.CountRunes",
  "resources.GetMatch",
  "openapi3.Unmarshal",
  "lang.FormatPercent",
  "images.UnsharpMask",
  "hugo.IsDevelopment|10",
  "collections.Append",
  "transform.Emojify",
  "templates.Current",
  "strings.TrimSpace",
  "strings.TrimRight",
  "strings.RuneCount",
  "strings.ReplaceRE",
  "strings.HasSuffix",
  "strings.HasPrefix",
  "resources.PostCSS",
  "lang.FormatNumber",
  "inflect.Pluralize",
  "images.Saturation",
  "images.Brightness",
  "images.AutoOrient",
  "hugo.IsProduction|10",
  "collections.Where",
  "collections.Union",
  "collections.Slice",
  "collections.Merge",
  "collections.IsSet",
  "collections.Index",
  "collections.Group",
  "collections.First",
  "collections.Apply",
  "collections.After",
  "transform.ToMath",
  "templates.Exists",
  "strings.Truncate",
  "strings.TrimLeft",
  "strings.Contains",
  "resources.Minify",
  "resources.Concat",
  "resources.ByType",
  "partials.Include",
  "inflect.Humanize",
  "images.Grayscale",
  "hugo.IsMultihost|10",
  "hugo.Environment|10",
  "encoding.Jsonify",
  "collections.Uniq",
  "collections.Sort",
  "collections.Last",
  "urls.RelLangURL",
  "urls.AbsLangURL",
  "templates.Defer",
  "strings.ToUpper",
  "strings.ToLower",
  "strings.Replace",
  "resources.ToCSS",
  "resources.Match",
  "resources.Babel",
  "reflect.IsSlice",
  "images.Pixelate",
  "images.Contrast",
  "images.Colorize",
  "hugo.WorkingDir|10",
  "hugo.IsExtended|10",
  "hugo.CommitHash|10",
  "css.TailwindCSS",
  "compare.Default",
  "collections.Seq",
  "urls.Anchorize",
  "strings.Substr",
  "strings.Repeat",
  "strings.FindRE",
  "resources.Copy",
  "math.ToRadians",
  "math.ToDegrees",
  "lang.Translate",
  "images.Sigmoid",
  "images.Process",
  "images.Padding",
  "images.Overlay",
  "images.Opacity",
  "hugo.GoVersion|10",
  "hugo.Generator|10",
  "hugo.BuildDate|10",
  "collections.In",
  "urls.JoinPath",
  "time.Duration",
  "strings.Title",
  "strings.Split",
  "strings.Count",
  "strings.Chomp",
  "safe.HTMLAttr",
  "resources.Get",
  "reflect.IsMap",
  "path.BaseName",
  "os.FileExists",
  "math.MaxInt64",
  "images.Invert",
  "images.Filter",
  "images.Dither",
  "images.Config",
  "hugo.IsServer|10",
  "diagrams.Goat",
  "crypto.SHA256",
  "crypto.FNV32a",
  "cast.ToString",
  "strings.Trim",
  "strings.Diff",
  "math.Product",
  "math.ModBool",
  "math.Counter",
  "images.Sepia",
  "images.Gamma",
  "hugo.Version|10",
  "fmt.Erroridf",
  "data.GetJSON",
  "cast.ToFloat",
  "urls.URLize",
  "urls.RelURL",
  "urls.RelRef",
  "urls.AbsURL",
  "time.Format",
  "time.AsTime",
  "os.ReadFile",
  "images.Text",
  "images.Mask",
  "hash.XxHash",
  "hash.FNV32a",
  "fmt.Warnidf",
  "fmt.Println",
  "debug.Timer",
  "data.GetCSV",
  "css.PostCSS",
  "crypto.SHA1",
  "crypto.HMAC",
  "urls.Parse",
  "safe.JSStr",
  "path.Split",
  "path.Clean",
  "os.ReadDir",
  "math.Round",
  "math.Floor",
  "math.Atan2",
  "lang.Merge",
  "images.Hue",
  "hugo.Store|10",
  "fmt.Printf",
  "fmt.Errorf",
  "debug.Dump",
  "crypto.MD5",
  "compare.Ne",
  "compare.Lt",
  "compare.Le",
  "compare.Gt",
  "compare.Ge",
  "compare.Eq",
  "cast.ToInt",
  "safe.HTML",
  "path.Join",
  "path.Base",
  "os.Getenv",
  "math.Sqrt",
  "math.Rand",
  "math.Ceil",
  "math.Atan",
  "math.Asin",
  "math.Acos",
  "images.QR",
  "hugo.Deps|10",
  "fmt.Warnf",
  "fmt.Print",
  "urls.Ref",
  "time.Now",
  "safe.URL",
  "safe.CSS",
  "path.Ext",
  "path.Dir",
  "math.Tan",
  "math.Sum",
  "math.Sub",
  "math.Sin",
  "math.Pow",
  "math.Mul",
  "math.Mod",
  "math.Min",
  "math.Max",
  "math.Log",
  "math.Div",
  "math.Cos",
  "math.Add",
  "math.Abs",
  "js.Build",
  "js.Batch",
  "js.Babel",
  "css.Sass",
  "time.In",
  "safe.JS",
  "os.Stat",
  "math.Pi"
];

const H4H_KEYWORD = [
  "continue|10",
  "template",
  "return",
  "define",
  "range",
  "break",
  "block",
  "with",
  "else",
  "try",
  "end",
  "if"
];

const H4H_LITERAL = [
  "false",
  "true",
  "nil"
];

const H4H_FUNCTION_REGEX = /\b(collections\.(Complement|Dictionary|NewScratch|Intersect|KeyVals|Delimit|SymDiff|Shuffle|Reverse|Querify|Append|Union|Slice|Merge|After|IsSet|Index|Group|First|Apply|Where|Uniq|Sort|Last|Seq|In)|transform\.(HighlightCodeBlock|CanHighlight|HTMLUnescape|PortableText|Markdownify|HTMLEscape|Highlight|Remarshal|Unmarshal|XMLEscape|Plainify|Emojify|ToMath)|templates\.(Current|Exists|Defer)|resources\.(ExecuteAsTemplate|Fingerprint|PostProcess|FromString|GetRemote|GetMatch|PostCSS|ByType|Concat|Minify|Babel|Match|ToCSS|Copy|Get)|partials\.(IncludeCached|Include)|diagrams\.Goat|encoding\.(Base64Decode|Base64Encode|Jsonify)|openapi3\.Unmarshal|reflect\.(IsSlice|IsMap)|inflect\.(Singularize|Pluralize|Humanize)|strings\.(ContainsNonSpace|FindRESubmatch|SliceString|ContainsAny|CountRunes|CountWords|TrimPrefix|FirstUpper|TrimSuffix|TrimSpace|TrimRight|RuneCount|HasPrefix|HasSuffix|ReplaceRE|Truncate|Contains|TrimLeft|ToUpper|ToLower|Replace|Substr|Repeat|FindRE|Split|Count|Chomp|Title|Trim|Diff)|compare\.(Conditional|Default|Eq|Ge|Gt|Le|Lt|Ne)|images\.(ColorBalance|GaussianBlur|UnsharpMask|Saturation|AutoOrient|Brightness|Grayscale|Contrast|Colorize|Pixelate|Sigmoid|Process|Padding|Overlay|Opacity|Filter|Dither|Config|Invert|Gamma|Sepia|Mask|Text|Hue|QR)|crypto\.(FNV32a|SHA256|HMAC|SHA1|MD5)|debug\.(Timer|Dump)|time\.(ParseDuration|Duration|AsTime|Format|Now|In)|path\.(BaseName|Clean|Split|Base|Join|Dir|Ext)|safe\.(HTMLAttr|JSStr|HTML|CSS|URL|JS)|cast\.(ToString|ToFloat|ToInt)|urls\.(AbsLangURL|RelLangURL|Anchorize|JoinPath|AbsURL|RelRef|RelURL|URLize|Parse|Ref)|math\.(ToRadians|ToDegrees|MaxInt64|ModBool|Counter|Product|Floor|Round|Atan2|Ceil|Atan|Rand|Sqrt|Asin|Acos|Sum|Sin|Tan|Sub|Min|Mul|Mod|Max|Log|Div|Cos|Add|Pow|Abs|Pi)|lang\.(FormatNumberCustom|FormatAccounting|FormatCurrency|FormatPercent|FormatNumber|Translate|Merge)|hugo\.(IsMultilingual|IsDevelopment|IsProduction|Environment|IsMultihost|CommitHash|IsExtended|WorkingDir|BuildDate|Generator|GoVersion|IsServer|Version|Store|Deps)|hash\.(FNV32a|XxHash)|data\.(GetJSON|GetCSV)|fmt\.(Erroridf|Println|Warnidf|Errorf|Printf|Print|Warnf)|css\.(TailwindCSS|PostCSS|Sass)|os\.(FileExists|ReadFile|ReadDir|Getenv|Stat)|js\.(Babel|Batch|Build))\b/; 

const H4H_ACTION_KEYWORDS = {
  $pattern: /\w+/,
  'keyword': H4H_KEYWORD,
};

const H4H_PIPELINE_KEYWORDS = {
   $pattern: /\w+/,
   'built_in': H4H_BUILT_IN,
   'literal': H4H_LITERAL,
};
const H4H_FUNCTION_KEYWORDS = {
   $pattern: /\w+\.\w+/,
   'built_in': H4H_FUNCTION,
};

const PIPE_FUNCTION_MODE = {
   // scope: 'PIPE_FUNCTION_MODE',
   begin: H4H_FUNCTION_REGEX,
   keywords: H4H_FUNCTION_KEYWORDS,
   contains: [METHOD_CHAIN_HELPER]
};
// END: H4H keyword based generated code


   // method chain - starting with a context DOT
   const PIPE_CONTEXT_MODE = {
      // scope: 'PIPE_CONTEXT_MODE',
      begin: [/\.(?=\w+)/], beginScope: { 1: 'template-variable.context' },
      contains: [METHOD_CHAIN_HELPER],
   };

   // one word identifier followed by a DOT a function object that calls a method
   const PIPE_BUILTIN_MODE = {
      // scope: 'PIPE_BUILTIN_MODE',
      variants: [
         { begin: /\w+(?=\.)/, contains: [METHOD_CHAIN_HELPER] },
         { match: /\w+/ }
      ],
      keywords: H4H_PIPELINE_KEYWORDS,
   };

   //template variable
   const PIPE_VARIABLE_MODE = {
      // scope: 'PIPE_VARIABLE_MODE',
      variants: [
         { begin: [/\$\w+(?=\.)/], beginScope: { 1: 'template-variable', }, contains: [METHOD_CHAIN_HELPER] },
         { match: /\$\w+/, scope: 'template-variable' },
      ],
   };

   // there's no way to know which end token has been captured, so we shift analyzing to a new mode
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

   // H4H build removes PIPE_FUNCTION_MODE if there are no _two word_ functions
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
      keywords: H4H_ACTION_KEYWORDS,
      relevance: 5,
      contains: [PIPELINE_MODE],
   };

   const ACTION_BLOCK_MODE = {
      // scope: 'ACTION_BLOCK_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /block|template/, /\s*/, re_TEMPLATE_NAME, /\s*/],
      beginScope: { 1: 'template-tag', 5: 'string' },
      keywords: H4H_ACTION_KEYWORDS,
      relevance: 5,
      contains: [PIPELINE_MODE],
   };

   const ACTION_COMMAND_MODE = {
      // scope: 'ACTION_COMMAND_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /else\s+if|if|range|return|try|with/, /\s*/],
      beginScope: { 1: 'template-tag' },
      keywords: H4H_ACTION_KEYWORDS,
      relevance: 5,
      contains: [PIPELINE_MODE],
   };

   const ACTION_DEFINE_MODE = {
      // scope: 'ACTION_DEFINE_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /define|template/, /\s*/, re_TEMPLATE_NAME, /\s*/, re_ACTION_CLOSE,],
      beginScope: { 1: 'template-tag', 5: 'string', 7: 'template-tag', },
      relevance: 5,
      keywords: H4H_ACTION_KEYWORDS,
   };

   const ACTION_KEYWORD_MODE = {
      // scope: 'ACTION_KEYWORD_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /break|continue|else|end/, /\s*/, re_ACTION_CLOSE],
      beginScope: { 1: 'template-tag', 5: 'template-tag' },
      relevance: 5,
      keywords: H4H_ACTION_KEYWORDS,
   };

   const ACTION_VAR_MODE = {
      // scope: 'ACTION_VAR_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /range|else\s+with|with/, /\s+/, re_VARIABLE, /\s*/, /\:?\=/],
      beginScope: { 1: 'template-tag', 5: 'template-variable', 7: 'operator' },
      keywords: H4H_ACTION_KEYWORDS,
      relevance: 5,
      contains: [PIPELINE_MODE],
   }
   const ACTION_RANGE_MODE = {
      // scope: 'ACTION_RANGE_MODE',
      begin: [re_ACTION_OPEN, /\s*/, /range/, /\s+/, re_VARIABLE, /\s*/, /,/, /\s*/, re_VARIABLE, /\s*/, /\:?\=/],
      beginScope: { 1: 'template-tag', 5: 'template-variable', 7: 'punctuation', 9: 'template-variable', 11: 'operator' },
      keywords: H4H_ACTION_KEYWORDS,
      relevance: 5,
      contains: [PIPELINE_MODE],
   };

   const ACTION_PIPELINE_MODE = {
      // scope: 'ACTION_PIPELINE_MODE',
      begin: [re_ACTION_OPEN], beginScope: { 1: 'template-tag', },
      keywords: H4H_PIPELINE_KEYWORDS,
      contains: [PIPELINE_MODE],
   };

   return {
      name: 'hugo-text',
		aliases: ['hugo-text-tpl','hugo-text-template'],
		// subLanguage: [],
      case_insensitive: false,
      ignoreIllegals: false,
      contains: [
         hljs.COMMENT(re_COMMENT_OPEN, re_COMMENT_CLOSE, { relevance: 10, }),
         // stop highlighting if a handlebars begin tag is found
         { begin: /\{\{(#|>|!--|!)/, end: /\}\}/, illegal: /.*/, },
         // start sub mode to avoid highlighting keywords outside a template action
         {
            // scope: 'TEMPLATE_ACTION'
            // raise relevance for special hugo template tag '{{- '
            variants: [
               { begin: /\{\{- /, returnBegin: true, relevance: 10, },
               { begin: /\{\{(?!-)/, returnBegin: true, },
            ],
            keywords: H4H_ACTION_KEYWORDS,
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
