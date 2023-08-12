pause
 
for /f "delims= tokens=1,2" %%i in (githubGit.txt) do (
 
echo %%i %%j
 
git clone %%i %%j
 
)
 
echo 'git clone finish!'
 
pause