to add latest updated GIT

git add .
git commit -m "<text goes here>"
git push (to push changes)

git restore HEAD -- hard (to undo changes after last commit)
git clean -fd (to delete any new files added. it doesn't delete .gitignore files)
git -x (dangerous will delete even .gitignored files)
