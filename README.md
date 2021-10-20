to add latest updated GIT

git add .
git commit -m "<text goes here>"
git push (to push changes)

git restore HEAD -- hard (to undo changes after last commit)
git clean -fd (to delete any new files added. it doesn't delete .gitignore files)
git -x (dangerous will delete even .gitignored files)

git checkout -b <branch> (to create and switch to a new branch)
git checkout <branch> (to switch to another branch)
git add . (to add changes to the current branch)
git commit -m "bla bla" (to commit changes to the current branch)
git push origin <branch> (to push to a named branch)
