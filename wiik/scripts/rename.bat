@echo off
set i=1
for %%f in (*.png) do call :renameit "%%f"
goto done

:renameit
ren %1 %i%.png
set /A i+=1

:done