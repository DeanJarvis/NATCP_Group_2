@echo off
setlocal EnableDelayedExpansion
title Beacon Git Push

cd /d C:\Users\User\Desktop\Beacon

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ERROR: This folder is not a Git repository.
    pause
    exit /b 1
)

git check-ignore .env >nul 2>&1
if errorlevel 1 (
    echo STOP: .env is not ignored by .gitignore.
    echo Push cancelled to protect API keys.
    pause
    exit /b 1
)

echo.
echo ===== Current status =====
git status --short
echo.

git add .

git diff --cached --quiet
if errorlevel 1 (
    set /p commit_message=Enter commit message: 

    if "!commit_message!"=="" (
        echo CANCELLED: Commit message cannot be empty.
        pause
        exit /b 1
    )

    git commit -m "!commit_message!"
    if errorlevel 1 (
        echo ERROR: Commit failed.
        pause
        exit /b 1
    )
) else (
    echo No new file changes to commit.
)

echo.
echo ===== Syncing with GitHub =====
git pull --rebase origin main

if errorlevel 1 (
    echo ERROR: Pull or rebase failed.
    echo Resolve the conflict before running this script again.
    pause
    exit /b 1
)

echo.
echo ===== Pushing to GitHub =====
git push

if errorlevel 1 (
    echo ERROR: Push failed.
    pause
    exit /b 1
)

echo.
echo DONE: Beacon was pushed to GitHub.
pause