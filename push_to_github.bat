@echo off
setlocal EnableExtensions

rem Always run from the folder that contains this script.
cd /d "%~dp0"

set "REPO_URL=git@github.com:DeanJarvis/NATCP_Group_2.git"

where git >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Git is not installed or is not available in PATH.
  goto :fail
)

if not exist ".git" (
  echo Initializing Git repository...
  git init
  if errorlevel 1 goto :git_fail
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
  echo Adding GitHub remote...
  git remote add origin "%REPO_URL%"
) else (
  echo Updating GitHub remote...
  git remote set-url origin "%REPO_URL%"
)
if errorlevel 1 goto :git_fail

git add --all
if errorlevel 1 goto :git_fail

git diff --cached --quiet
if errorlevel 1 (
  echo Creating commit...
  git commit -m "Update HoroscopeToday"
  if errorlevel 1 goto :git_fail
) else (
  echo No new local changes to commit.
)

for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT_BRANCH=%%B"
if not defined CURRENT_BRANCH (
  set "CURRENT_BRANCH=main"
  git branch -M main
  if errorlevel 1 goto :git_fail
)

echo Pushing branch %CURRENT_BRANCH% to GitHub...
git push -u origin "%CURRENT_BRANCH%"
if errorlevel 1 goto :git_fail

echo.
echo [SUCCESS] Files were pushed to GitHub.
goto :done

:git_fail
echo.
echo [ERROR] Git operation failed. Review the message above.
echo Make sure your GitHub SSH key is configured and has repository access.

:fail
echo.
pause
exit /b 1

:done
echo.
pause
exit /b 0
