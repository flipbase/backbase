# Backbase

This project serves as a lightweight framework were the Flipbase recorder and
the Flipbase player can be build upon. It contains a global store, a model 
and a component class. 

Additionaly, we have also incorporated some utility functionality to handle 
DOM manipulation, event listeners, pubsubs and some underscore.js like
utility functionality.

### Installation

Download the package using bower:

    bower install backbase git@github.com:flipbase/backbase.git --save-dev

And then include the modules required:

    var Model = require('backbase/Model');
    var Component = require('backbase/Component');
    var _ = require('backbase/src/modules/utils');

### To do

- [ ] Complete 100% test coverage
- [ ] Rewrite Component and Model classes

## Usage

Please find more documentation about the {@link Component Component}, {@link Model Model} or
{@link modules_DOM fbQuery}. 

## A word on ES6

ES6 will create a slight overhead, because of the polyfills that are needed in the production code. For example, Babel will include some ES5 polyfills by default. The only way we can assure maximum compatiblity with ES3 runtime environments, is to write all code in ES3. It's not as fancy, it might even by a little more work to write all functionality needed, but debugging is a lot (!) easier. 

## Style guide

### Why Flux?

Anything is state; events, server side provided data properties. Since state handling is the considered to clutter the application a lot, we try to use a more uniform method.

The biggest issue with the previous recorder was state management; we needed some kind of controller. The Flux architecture provides us this controller with the cominbation of Stores, Dispatcher and Actions.

## Stores

Stores are extreemly explict. They do not hold as much properties as Backbone models; they only hold a couple or just 1 property. Stores are responsible for disptaching events to the views and updating the data storage. Stores filter all dipstached events and determine what to do with some of them. So stores contain application logic. Stores do not represent a row of data from a database table. Stores are related to a specific domain.

Anything that will influence how the views/interfaces/components will be rendered should be saved in stores. So we will have a Browser, Flash, Upload and Video store!

### Models

Can contain multiple stores. Models are responsible for server side communication and parsing data into stores (using actions). Models represent a single record of data like ORM models do.

### Actions

Actions are predefined methods that dispatch events on the Dispatcher. Actions methods are used in Models and in Views. Potentially we can only list an array of actions names. In the stores we can then use these action names to create onActionName like methods. 

1 limitation thought: ACTIONS CANNOT BE GLOBAL EVENTS, since we will support multiple instances of the recorder and we need to make sure events do not polute others.

### Views

Are responsible for DOM rendering, registering to store events and dispatching actions. Views only have kwowledge of Stores and Actions, not of the Dispatcher or Models. Views can remove themselves from the DOM and can remove children views from the DOM.

### Dispatcher

Provide 2 methods: register callbacks and trigger callbacks. We use the Dispatcher created by Facebook and used in React projects.

### Components (only interactive elements, that require re-rendering)

Are only responsible for creating the proper markup, updating themselves, binding events to the element and dispatching actions. Only have knowledge of actions. Do not have any knowledge with regards to other components. Components do not have children components or whatsover. Anything that will be re-rendered with other/new data needs to be captured in a component, so we can attach handlers what/when to be updated and re-render. If you only need to attach an click handler to a button, then you can use static rendering method and just hide/show the outer interface if necessary. 




