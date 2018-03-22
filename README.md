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

## Editing Markdown

`src/index.md` is the markdown source file for [remark.js](https://github.com/gnab/remark).

Github Flavoured Markdown [explicitly states](https://github.github.com/gfm/#list-items) that 4 spaces are needed to indent list items, which is a bit wider, personally. It may make you better if you configure the tab width of your editor to 2 spaces or whatever you prefer and use tabs in Markdown files.

## Building

Runing the following command outputs compiled files in the `build` directory.

```sh
npm run build
```
