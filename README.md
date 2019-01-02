# Burger Builder Project

This is the minified version of how a full e-commerce web app looks albeit it got all of the features which are required in one.
Below is a complete walkthrough and description of this awesome app.

## Table of Contents
- [GettingStarted](#gettingstarted)
- [HowTo](#howto)
- [Features](#features)
- [Dependencies](#dependencies)
- [Authors](#authors)

### GettingStarted

To run this awesome app. Just clone the repo(or fork and then clone) and in the project folder run `npm install` to install all the dependencies and then type `npm start` to start the server.

### HowTo

The homepage displays -
* Navigation Bar
* Burger container
* Build controls

NavigationBar houses Burger Builder and Orders route.
* Burger Builder<br>
This is the homepage and displays Burger container and Build Controls.
	* Burger container has the preview of the burger which is in the making.
	* Build controls aid in processing the ingredients needed to order a burger.
* Orders<br>
This fetches and shows all the previous orders that were successfully made and were stored in the database.<br>
* Checkout<br>
Once the ingredients are added the order button lits up and navigates to the purchasing summary modal which continues to the checkout.
Checkout previews the burger being ordered and opens a short form which needs to be filled up before making the final order and saves the order to the database.

### Features

* Responsive- Mobile friendly- this helps in hiding the navigation links and replaces them with sidebar functionality which helps in smoother navigation on small devices.
* Single Page App- Being an SPA it is fast.

### Dependencies

[create-react-app](https://github.com/facebook/create-react-app)- Used to bootstrap the whole project.<br>
[react-router-dom](https://www.npmjs.com/package/react-router-dom)- Used to simplify routing within an SPA.<br>
[redux/react-redux](https://react-redux.js.org/)- Manages the app state and makes it avilable throughout the app.

### Authors

* [Vikrant Sharma](https://github.com/vikkrantxx7) - Built the project end-to-end.