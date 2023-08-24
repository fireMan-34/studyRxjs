[System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8;

$Class = Read-Host "请输入要创建的课程的节数"

Get-Location | Write-Output

Copy-Item -Path .\template\simple.ts -Destination .\

Rename-Item -Path .\simple.ts -NewName "$Class.ts"

# * 后续添加 package 自动化生成 修改 json 可能 js 脚本相对容易一些
# * 并启动自动化调试