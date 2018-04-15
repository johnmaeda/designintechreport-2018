Design In Tech Report 2018 Multi-Lingual Translation
====================================================

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Dependency Status](https://david-dm.org/takram-design-engineering/designintechreport-2018.svg)](https://david-dm.org/takram-design-engineering/designintechreport-2018)

## Origins

This began as a project that Takram led to refactor and open source the Design in Tech Report. I've been finally learning lot of things I should have learned a long time ago from @shotamatsuda and the Takram team. Thank you! —@johnmaeda

## Getting Started

1. Make sure you have the latest node and npm (9.7.1 and 5.7.1 at the time of this writing).

1. Clone and install node modules.

    ```sh
    git clone git@github.com:johnmaeda/designintechreport-2018.git
    cd designintechreport-2018
    npm install
    ```

1. Start webpack dev server on [http://localhost:3000](http://localhost:3000).

    ```sh
    npm start
    ```

## Building

Runing the following command outputs compiled files in the `build` directory.

```sh
npm run build
```

## Editing Markdown

`src/index.md` is the markdown source file for [remark.js](https://github.com/gnab/remark).

Github Flavoured Markdown [explicitly states](https://github.github.com/gfm/#list-items) that 4 spaces are needed to indent list items, which is a bit wider, personally. It may make you better to configure the tab width of your editor to 2 spaces or whatever you prefer and use tabs in Markdown files.

## Working with Git

Here're some useful resources:

- [Git Cheat Sheet](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf) – Github's official git cheatsheet
- [Git Reference](https://git-scm.com/docs) – Git CLI reference
- [Tower](https://www.git-tower.com/mac/) – Super well-made git GUI app
- [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/) – One of the most commonly used strategies of Git branching

### Updating Local Branch

```sh
git pull
```

This retrieves changes from the remote tracking branch of a remote repo.

Pull is fetch + merge, meaning if you have any local changes you must stash the changes first:

```sh
git stash # Save your local changes in a stash
git pull
git stash pop # Apply and delete the stash
```

When you see `package.json` in changed files after pulling, make sure to do:

```
npm install
```

This updates the installation of npm dependencies in your local copy according to the updated `package.json`. Don't confuse it with `npm update`, which checks for newer versions (minor and patch of [semver](https://semver.org)) of all the dependencies and *updates* `package.json`.

### Commiting and Pushing

```sh
git commit -m '<your commit message>'
git push
```

This makes a new commit, and sends the commit data and refs to the remote tracking branch of a remote repo.

### Checking Out a Branch

```sh
git checkout -b <local ref> <remote ref>
```

This create and checkout a new local branch with a remote tracking info to the remote branch.

The order of arguments and its notation is confusing.

```sh
git checkout -b master origin/master # Checkout remote `master` branch
git checkout -b feature/fix origin/feature/fix # Checkout remote `feature/fix` branch
```
