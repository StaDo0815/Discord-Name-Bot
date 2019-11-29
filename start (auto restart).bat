@echo off
:start
call node index.js
::cls
@timeout 1 > nul
echo restarting...
goto start 