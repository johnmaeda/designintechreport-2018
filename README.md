Design In Tech Report 2018 Japanese Translation
===============================================

## Getting Started

1. Make sure you have the latest node and npm (9.7.1 and 5.7.1 at the time of this writing).

1. Clone and install node modules.

    ```sh
    git clone git@github.com:takram-design-engineering/designintechreport-2018.git
    cd designintechreport-2018
    npm install
    ```

1. Start webpack dev server on [http://localhost:3000](http://localhost:3000).

    ```sh
    npm start
    ```

## Working with Git

- [Git Cheat Sheet](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf) – Github's official git cheatsheet
- [Tower](https://www.git-tower.com/mac/) – Super well-made git GUI app

### Updating Local Branch

```
git pull
```

When you see `package.json` in changed files, make sure to do:

```
npm install
```

This reinstalls npm dependencies in your local copy according to the updated `package.json`. Don't confuse it with `npm update`, which checks for newer versions (minor and patch of [semver](https://semver.org)) of all the dependencies and *updates* `package.json`.

### Commiting and Pushing

```
git commit -m '<your commit message>'
git push
```

### Track a Branch

```
git checkout -b <local ref> <remote ref>
```

## Editing Markdown

`src/index.md` is the markdown source file for [remark.js](https://github.com/gnab/remark).

Github Flavoured Markdown [explicitly states](https://github.github.com/gfm/#list-items) that 4 spaces are needed to indent list items, which is a bit wider, personally. It may make you better to configure the tab width of your editor to 2 spaces or whatever you prefer and use tabs in Markdown files.

## Building

Runing the following command outputs compiled files in the `build` directory.

```sh
npm run build
```
