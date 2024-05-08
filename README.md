# eCommerce Application 🛍️🌐

This project is a complete replica of the apps we are so used to using in our daily lives - an online store. In our store, you can explore and purchase the essentials without which no breakfast or dinner is complete. Yes, we're talking about tea and coffee. Immerse yourself in this wonderful world of hot beverages, try something new! Experience the entire journey of a typical shopper from browsing products to having them delivered to your door. So, what do we offer to our customers:

### Explore the full list of products

- View detailed descriptions of selected items
- Add items to the cart
- Complete the purchase

### Our customer can

- Register in our store
- Search and filter products by categories This is necessary to make the shopping process more organized and convenient.

> [!NOTE] To ensure that the product selection process is simple and enjoyable, we have made our design very responsive. In other words, no matter what device our customers are using, they will encounter a pleasant and user-friendly interface that adapts to the customer's device.

## Used stack

- SCSS
- TypeScript
- React
- Husky
- Jest
- Vite

## Scripts

You can use the following commands to use scripts:

```
npm run + ${name}
```

`prettier-check`: Script that runs a code check by prettier and if it finds changes in the code that do not correspond to prettier, it overwrites them according to the configuration. Runs automatically when a commit is created using Husky

`pre-push`: Automatically invoked by Husky before pushing code to a remote repository. Runs a check that all files match Eslint configuration, if so, runs Jest tests, if all tests pass without errors, runs validation of the created branch name according to the pattern. You can also run it manually with npm run pre-push

`format`: Manually starts formatting all files according to the prettier configuration

`ci:format`: Manually checks that all code matches the prettier configuration

`dev`: Starts development mode from the Vite builder

`build`: Starts the project build for the production version

`lint`: Manually ESLint checks

`preview`: Is used to preview (preview) an application build using the Vite tool

`test`: Runs jest test

## Install

> [!IMPORTANT] Node.js is reauired!

1. Clone this repository

2. Run the following command:

```
npm install
```

This command installs dependencies in the root folder.

3. Run `npm run dev` to run dev server or `npm run build` to build project.

## Authors

- [Asubas(Team-lead)](https://github.com/Asubas)
- [lipan4836](https://github.com/lipan4836)
- [DzmitryAlekseev](https://github.com/dzmitryalekseev)
