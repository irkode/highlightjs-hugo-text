[CmdLetBinding()]
param(
   [string]$HugoDocs = (Join-Path $PSScriptRoot "../../../hugo/hugoDocs/"),
   [string]$Prefix = "hugo",
   [string]$DefaultKeywordConfigFile = (Join-Path $PSScriptRoot "hugo-defaults.yaml"),
   [string]$TargetFolder = (Join-Path $PSScriptRoot "keywords")
)

filter Add-FunctionWord() {
   param(
      [Parameter(Mandatory = $true)]
      [AllowEmptyCollection()]
      [string[]]$KnownWords,
      [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
      [AllowEmptyString()]
      [string]$Word
   )
   process {
      if ($Word) {
         # don't add predefined keywords
         if (-Not $KnownWords.contains($Word)) {
            # word.word is a namespaced function name, a simple word only is an alias (we treat as built_in)
            if ($word.Contains('.')) {
               $Script:KeywordConfig.keywords.function.words += $Word
            } else {
               $Script:KeywordConfig.keywords.built_in.words += $Word
            }
         }
      }
   }
}

# make sure $TargetFolder exists and is a Folder
if (-Not (Test-Path $TargetFolder -PathType Container)) {
   Write-Verbose "create `$TargetFolder at [ $TargetFolder ]"
   $TargetFolder = New-Item -ItemType Directory $TargetFolder
} elseif (Test-Path $TargetFolder -PathType Leaf) {
   Write-Error "`$Targetfolder is not a folder [ $TargetFolder ]"
   exit 1
} else {
   $TargetFolder = Get-Item -Path $TargetFolder
}
Write-Verbose "TargetFolder: $TargetFolder"

# load default keywords from given file or create empty dummy
if (Test-Path -PathType Leaf $DefaultKeywordConfigFile) {
   Write-Verbose "load initial keywords from $DefaultKeywordConfigFile"
   $Script:KeywordConfig = Get-Content $DefaultKeywordConfigFile | ConvertFrom-Yaml
} else {
   Write-Warning "No Keyword file found at [$DefaultKeywordConfigFile]"
   Write-Verbose "generate default Hugo keywords"
   $Script:KeywordConfig = @{
      config   = @{ relevance = 8 }
      keywords = {
         literal = @{
            words    = @("false", "nil", "true")
            relevant = @()
         }
         keyword = @{
            words    = @("block", "break", "continue", "define", "else", "end", "if", "range", "return", "template", "try", "with")
            relevant = @()
         }
      }
   }
}
# make sure all needed keyword classes exist
@('built_in', 'function', 'keyword', 'literal') | ForEach-Object {
   if (-Not ($Script:KeywordConfig.keywords.ContainsKey($_))) {
      if ("function" -eq $_) {
         $Script:KeywordConfig.keywords.Add($_, @{ words = @('HjsHugoDummy.HjsHugoDummy|0'); relevant = @() })
      } else {
         $Script:KeywordConfig.keywords.Add($_, @{ words = @(); relevant = @() })
      }
   }
}

# collect predefined keywords from config ignoring appended relevance
$PredefinedKeywords = $KeywordConfig.keywords.built_in.words +
$KeywordConfig.keywords.function.words +
$KeywordConfig.keywords.keyword.words +
$KeywordConfig.keywords.literal.words | ForEach-Object { ($_ -split '\|')[0] }

# load functions and function aliases from HugoDocs repo
if ($HugoDocs) {
   try {
      $HugoDocsFunctions = Join-Path -Resolve -Path $HugoDocs -ChildPath "content/en/functions" -ErrorAction Stop
   } catch {
      Write-Error "Hugo documentation not found at [ $HugoDocs ]" -ErrorAction Continue
      exit 1
   }
   Write-Verbose "Collecting files from $HugoDocsFunctions"
   Get-ChildItem $HugoDocsFunctions -Recurse -File -Exclude _index*, _common* *.md | Where-Object {
      $_.FullName -notlike "*_common*"
   } | ForEach-Object {
      $file = $_
      Write-Verbose "> $file"
      $content = Get-Content -Raw -Encoding UTF8 -Path $file.FullName
      if ($Content -match '(?s)^---(.*?)---') {
         $json = $Matches[1] | ConvertFrom-Yaml -Ordered
         # collect alias and function from docs Page
         $json.title, $json.params.functions_and_methods.aliases | ForEach-Object { $_ }
      } else {
         Write-Warning "No yaml header in $($file.FullName)"; exit
      }
      # add to specific section
   }  | Add-FunctionWord -KnownWords $PredefinedKeywords
} else {
   Write-Verbose "Hugo documentation not included" -ErrorAction Continue
}

try {
   $file = Join-Path $TargetFolder "${Prefix}-full.yaml"
   Write-Verbose "generate full list of built_ins : $file"
   $Script:KeywordConfig.keywords | ConvertTo-Yaml | Set-Content -Encoding utf8 $file

   $file = Join-Path $TargetFolder "${Prefix}-core.yaml"
   Write-Verbose "generate core list of built_ins : $file"
   $KeywordConfig.keywords.function.words = $KeywordConfig.keywords.function.words | Where-Object { $_.StartsWith("hugo.") }
   # make sure empty word list is serialized as array
   if (-Not $KeywordConfig.keywords.function.words) { $KeywordConfig.keywords.function.words = @() }
   $Script:KeywordConfig.keywords | ConvertTo-Yaml | Set-Content -Encoding utf8 $file
} catch {
   throw $_
}
exit 1
