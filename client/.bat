@echo off

pnpm build

echo Removing the android folder...
rmdir /s /q android
if errorlevel 1 (
  echo Failed to remove the android folder.  It might not exist or be in use.
  pause
  exit /b 1
) else (
  echo Android folder removed successfully.
)

echo Adding Android platform...
npx cap add android
if errorlevel 1 (
  echo Failed to add Android platform.
  pause
  exit /b 1
) else (
  echo Android platform added successfully.
)

echo Opening Android Studio...
npx cap open android
if errorlevel 1 (
  echo Failed to open Android Studio.  Make sure it's installed and configured correctly.
  pause
  exit /b 1
) else (
  echo Android Studio opened successfully.
)

echo Done!
pause
exit /b 0