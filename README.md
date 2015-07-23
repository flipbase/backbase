# Backbase

This project serves as a lightweight framework were the Flipbase recorder and
the Flipbase player can be build upon. It contains a global store, a model 
and a component class. 

Additionaly, we have also incorporated some utility functions in the ```src/utils/```
directory. 

### Why composition?

### Usage

Download the package using bower

    bower install backbase git@github.com:flipbase/backbase.git --save-dev

Import the modules you need

    import Model from 'backbase/src/Model';
    import Component from 'backbase/src/Component';
    import {createEl} from 'backbase/src/utils/DOM';


## To do

[ ] How to determine which options properties should be attached to the 
    Component instance?!
[ ] Not every elements needs to have JS logic or events attached to it; so we 
    need to somehow implement a workaround for this.