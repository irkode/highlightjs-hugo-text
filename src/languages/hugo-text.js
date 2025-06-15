/*
Language: Hugo Template
Author: Irkode <irkode@rikode.de>
Description: Go templating grammar for Hugo
Website: https://irkopde.github.io/highlightjs-hugo
Category: template
*/

export default function (hljs) {

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

const H4H_FUNCTION_REGEX = /\b(cast.ToFloat| cast.ToInt| cast.ToString| collections.After| collections.Append| collections.Apply| collections.Complement| collections.Delimit| collections.Dictionary| collections.First| collections.Group| collections.In| collections.Index| collections.Intersect| collections.IsSet| collections.KeyVals| collections.Last| collections.Merge| collections.NewScratch| collections.Querify| collections.Reverse| collections.Seq| collections.Shuffle| collections.Slice| collections.Sort| collections.SymDiff| collections.Union| collections.Uniq| collections.Where| compare.Conditional| compare.Default| compare.Eq| compare.Ge| compare.Gt| compare.Le| compare.Lt| compare.Ne| crypto.FNV32a| crypto.HMAC| crypto.MD5| crypto.SHA1| crypto.SHA256| css.PostCSS| css.Sass| css.TailwindCSS| data.GetCSV| data.GetJSON| debug.Dump| debug.Timer| diagrams.Goat| encoding.Base64Decode| encoding.Base64Encode| encoding.Jsonify| fmt.Errorf| fmt.Erroridf| fmt.Print| fmt.Printf| fmt.Println| fmt.Warnf| fmt.Warnidf| hash.FNV32a| hash.XxHash| hugo.BuildDate| hugo.CommitHash| hugo.Deps| hugo.Environment| hugo.Generator| hugo.GoVersion| hugo.IsDevelopment| hugo.IsExtended| hugo.IsMultihost| hugo.IsMultilingual| hugo.IsProduction| hugo.IsServer| hugo.Store| hugo.Version| hugo.WorkingDir| images.AutoOrient| images.Brightness| images.ColorBalance| images.Colorize| images.Config| images.Contrast| images.Dither| images.Filter| images.Gamma| images.GaussianBlur| images.Grayscale| images.Hue| images.Invert| images.Mask| images.Opacity| images.Overlay| images.Padding| images.Pixelate| images.Process| images.QR| images.Saturation| images.Sepia| images.Sigmoid| images.Text| images.UnsharpMask| inflect.Humanize| inflect.Pluralize| inflect.Singularize| js.Babel| js.Batch| js.Build| lang.FormatAccounting| lang.FormatCurrency| lang.FormatNumber| lang.FormatNumberCustom| lang.FormatPercent| lang.Merge| lang.Translate| math.Abs| math.Acos| math.Add| math.Asin| math.Atan| math.Atan2| math.Ceil| math.Cos| math.Counter| math.Div| math.Floor| math.Log| math.Max| math.MaxInt64| math.Min| math.Mod| math.ModBool| math.Mul| math.Pi| math.Pow| math.Product| math.Rand| math.Round| math.Sin| math.Sqrt| math.Sub| math.Sum| math.Tan| math.ToDegrees| math.ToRadians| openapi3.Unmarshal| os.FileExists| os.Getenv| os.ReadDir| os.ReadFile| os.Stat| partials.Include| partials.IncludeCached| path.Base| path.BaseName| path.Clean| path.Dir| path.Ext| path.Join| path.Split| reflect.IsMap| reflect.IsSlice| resources.Babel| resources.ByType| resources.Concat| resources.Copy| resources.ExecuteAsTemplate| resources.Fingerprint| resources.FromString| resources.Get| resources.GetMatch| resources.GetRemote| resources.Match| resources.Minify| resources.PostCSS| resources.PostProcess| resources.ToCSS| safe.CSS| safe.HTML| safe.HTMLAttr| safe.JS| safe.JSStr| safe.URL| strings.Diff| strings.Chomp| strings.Contains| strings.ContainsAny| strings.ContainsNonSpace| strings.Count| strings.CountRunes| strings.CountWords| strings.FindRE| strings.FindRESubmatch| strings.FirstUpper| strings.HasPrefix| strings.HasSuffix| strings.Repeat| strings.Replace| strings.ReplaceRE| strings.RuneCount| strings.SliceString| strings.Split| strings.Substr| strings.Title| strings.ToLower| strings.ToUpper| strings.Trim| strings.TrimLeft| strings.TrimPrefix| strings.TrimRight| strings.TrimSpace| strings.TrimSuffix| strings.Truncate| templates.Current| templates.Defer| templates.Exists| time.AsTime| time.Duration| time.Format| time.In| time.Now| time.ParseDuration| transform.CanHighlight| transform.Emojify| transform.Highlight| transform.HighlightCodeBlock| transform.HTMLEscape| transform.HTMLUnescape| transform.Markdownify| transform.Plainify| transform.PortableText| transform.Remarshal| transform.ToMath| transform.Unmarshal| transform.XMLEscape| urls.AbsLangURL| urls.AbsURL| urls.Anchorize| urls.JoinPath| urls.Parse| urls.Ref| urls.RelLangURL| urls.RelRef| urls.RelURL| urls.URLize)\b/; 

const H4H_ACTION_KEYWORDS = {
  $pattern: /\w+/,
  'keyword': KEYWORD,
};

const H4H_PIPELINE_KEYWORDS = {
   $pattern: /\w+/,
   'built_in': BUILT_IN,
   'literal': LITERAL,
};
const H4H_FUNCTION_KEYWORDS = {
   $pattern: /\w+\.\w+/,
   'built_in': FUNCTION,
};

const PIPE_FUNCTION_MODE = {
   // scope: 'PIPE_FUNCTION_MODE',
   begin: H4H_FUNCTION_REGEX,
   keywords: H4H_FUNCTION_KEYWORDS,
   contains: [METHOD_CHAIN_HELPER]
};
// END: H4H keyword based generated code

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
