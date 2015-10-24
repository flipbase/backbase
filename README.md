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




