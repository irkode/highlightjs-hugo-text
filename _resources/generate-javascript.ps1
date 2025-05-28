[CmdLetBinding()]
param(
   [string]$Keywords = "hugo-full",
   [string]$TargetFolder = (Join-Path $PSScriptRoot "keywords"),
   [switch]$Force,
   [int]$Relevance = 8,
   [switch]$GroupedRegex
)

filter Add-Relevance() {
   param(
      [Parameter(Mandatory = $true)]
      [AllowEmptyCollection()]
      [string[]]$RelevantNames,
      [Parameter(Mandatory = $false, ValueFromPipeline = $true)]
      [string]$Name
   )
   process {
      $relevant = $RelevantNames | Where-Object { $_ -like "${name}|*" }
      if ($relevant) {
         Write-Verbose "$relevant has fixed relevance"
         return "`"$relevant`""
      } else {
         if ($RelevantNames.Contains($Name)) {
            Write-Verbose "$name is relevant with default ($Relevance)"
            return "`"$Name|$Script:Relevance`""
         }
      }
      return "`"$name`""
   }
}


if (-Not (Test-Path $TargetFolder -PathType Container -ErrorAction Stop)) {
   Write-Error "TargetFolder is not a folder [ $TargetFolder ]" -ErrorAction Stop
}
$SourceFileName = Join-Path $TargetFolder "${Keywords}.yaml"
$SourceFile = Resolve-Path $SourceFileName -ErrorAction SilentlyContinue
if (-Not ($SourceFile -and (Test-Path $SourceFile))) {
   Write-Error "`$Keyword file for [ $Keywords ] not found at [ $SourceFileName ]" -ErrorAction Stop
}
$TargetFileName = Join-Path $TargetFolder "${Keywords}.js"
if (Test-Path $TargetFileName) {
   if (-Not $Force) {
      Write-Error "TargetFile $TargetFile exists. Use -Force to overwrite"
      exit 0
   }
}
Write-Verbose "Use keywords [ $SourceFileName ] to generate [ $TargetFileName ]"

$YamlKeywords = Get-Content $SourceFile | ConvertFrom-Yaml

$jsCode = ""

# generate the array or words incl. relevance
foreach ($Scope in @('built_in', 'function', 'keyword', 'literal')) {
   if ($YamlKeywords."$Scope") {
      $ScopeDefinition = $YamlKeywords."$Scope"
      if ($ScopeDefinition.words) {
         $jsCode += "export const $($Scope.ToUpper()) = [`n  "
         $jsCode += ($ScopeDefinition.words | Group-Object -Property Length | Sort-Object { [int]$_.Name } -Desc | ForEach-Object { $_.Group | Sort-Object -Descending } | Add-Relevance $ScopeDefinition.relevant) -join ",`n  "
         $jsCode += "`n];`n`n"
      } else {
         $jsCode += "export const $($Scope.ToUpper()) = [];`n"
      }
   } else {
      Write-Warning "No keywords for scope '$Scope' defined"
   }
}
# generate the keywords definition based on previous arrays
$jscode += @"

export const ACTION_KEYWORDS = {
  `$pattern: /\w+/,
  'keyword': KEYWORD,
};

export const PIPELINE_KEYWORDS = {
   `$pattern: /\w+/,
   'built_in': BUILT_IN,
   'literal': LITERAL,
};

export const FUNCTION_KEYWORDS = {
   `$pattern: /\w+\.\w+/,
   'built_in': FUNCTION,
};

"@

# generate regex
foreach ($Scope in @('function')) {
   if ($YamlKeywords."$Scope") {
      $ScopeDefinition = $YamlKeywords."$Scope"
      if ($ScopeDefinition.words) {
         if ($GroupedRegex) {
            $FunctionsGrouped = $ScopeDefinition.words | Group-Object { $_.Split('.')[0] } | Sort-Object -Descending { $_.Name.Length } | ForEach-Object {
               $name = $_.Name
               $functions = $_.Group | ForEach-Object { $_.Replace("${name}.", "") } | Sort-Object -Descending -Property Length
               if ($_.Count -eq 1) {
                  "${name}\.${functions}"
               } else {
                  "${name}\.($($functions -join '|'))"
               }
            }
            $jsCode += "export const $($Scope.ToUpper())_REGEX = /\b(" + ($FunctionsGrouped -join '|') + ')\b/;' + "`n"
         } else {
            $jsCode += "export const $($Scope.ToUpper())_REGEX = /\b(" + ($ScopeDefinition.words -join '|') + ')\b/;' + "`n"
         }
      }
   } else {
      Write-Error "No keywords in scope '$Scope' defined"
   }
}

$jsCode | Set-Content -Force -Encoding utf8 $TargetFileName
Write-Output "generated $target"
foreach ($Scope in @('literal', 'keyword', 'built_in', 'function')) {
   Write-Output ("> {0,03} ${scope}s" -f $YamlKeywords."$Scope".words.Count)
}
exit 0
