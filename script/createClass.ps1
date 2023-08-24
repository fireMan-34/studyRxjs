[System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8;

$Class = Read-Host "请输入要创建的课程的节数"

# 复制初始模板

Get-Location | Write-Output

Copy-Item -Path .\template\simple.ts -Destination .\

Rename-Item -Path .\simple.ts -NewName "$Class.ts"

# * 添加 package 自动化生成 修改 json 可能 js 脚本相对容易一些
.\node_modules\.bin\ts-node-cwd.ps1 -r tsconfig-paths/register .\script\createClass.ts $Class

# * 启动自动化调试
pnpm run "watch:$Class"