#!/bin/bash
REPO="git@github.com:locize/locize-landing.git"
BRANCH="gh-pages"
SUB_PATH="blog"
COMMIT_MSG="update blog"

INTERNAL_GIT_FOLDER_NAME=".deploy_git_landing"

DIR="$PWD/$INTERNAL_GIT_FOLDER_NAME/.git"

mkdir -p $INTERNAL_GIT_FOLDER_NAME

if [ ! -d "$DIR" ]; then
  # folder does not exist...
  git clone $REPO $INTERNAL_GIT_FOLDER_NAME
fi

cd $INTERNAL_GIT_FOLDER_NAME
git checkout $BRANCH
git pull

rm -rf $SUB_PATH
cp -r ../public $SUB_PATH

git add $SUB_PATH
git commit -m $COMMIT_MSG
git push origin $BRANCH