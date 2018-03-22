Design In Tech Report 2018 Japanese Translation
===============================================

## Getting Started

1. Make sure you have the latest node and npm (9.7.1 and 5.7.1 at the time of this writing).

1. Clone and install node modules.

    ```sh
    git clone git@github.com:takram-design-engineering/designintechreport-2018.git
    npm install
    ```

1. Start webpack dev server on [http://localhost:3000](http://localhost:3000).

    ```sh
    npm start
    ```

## Editing Markdown

`src/index.md` is the markdown source file for [remark.js](https://github.com/gnab/remark).

## Building

Runing the following command outputs compiled files in the `build` directory.

```sh
npm run build
```
