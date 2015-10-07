# Backbase

This project serves as a lightweight framework were the Flipbase recorder and
the Flipbase player can be build upon. It contains a global store, a model 
and a component class. 

Additionaly, we have also incorporated some utility functions in the ```src/utils/```
directory. 

### API

Als je BB extend methode gebruikt, moet je overal nog wel 'new' keyword gebruiken.

Compositoin; enige verschil is de 'children' prop; niet een template, maar de volgorde
van de children array bepaalt in welke volgorde alles geinit wordt. CSS doet positioning.
Enige nadeel is dat voor ieder div-je een component gemaakt moet worden; dat is niet
zo met templates. 

Template
+ Minder classes
- Maar moet je template language adopteren
- Plus je ontkomt niet aan een virtual DOM

Everything is a component
- Lots of classes
- Children are initialized during parent init
+ No virutal DOM
- Hierachie can not be determined using a template


Why? This abstracts away 



### Usage

Download the package using bower:

    bower install backbase git@github.com:flipbase/backbase.git --save-dev

And then import the modules you need using ES6 ```import``` syntax:

    import Model from 'backbase/src/Model';
    import Component from 'backbase/src/Component';
    import {createEl} from 'backbase/src/utils/DOM';


### To do

- [ ] Create a new repo with generic Flipbase documentation: style guide,
      preferences, how to contribute, etc
- [ ] How to determine which options properties should be attached to the 
      Component instance?!
- [ ] Not every elements needs to have JS logic or events attached to it; so we 
      need to somehow implement a workaround for this.



## Suggestion

render: function () {
  return '<div>

    <div>
      {% this.renderChild('WebcamButton', data) %}
    </div>

    <div>
      {% this.renderChild('UploadButton', data) %}
    </div>

  </div>'
}


- Ieder UI component moet dus een HTML string terug geven of niets.
- We kunnen toch in iedere component definieren wanneer de render functie getriggered moet worden?
    -> Enige nadeel is dan wel dat de hele template opnieuw gerendered wordt. 


- In dat geval moet de parent gerendered worden, als in het child een event gebeurd of state verandert.
  -> Kunnen we niet alleen de parent updaten via een trigger? 
    -> Hoe gaan we dat doen als er een component meerdere parents heeft?

  -> Stel we renderen de parent, met de nieuwe state, dan wordt de child bijvoorbeeld niet meer gerendered.
     Dat betekend dat wel wel de instances netjes moeten verwijderen anders leaken die in memory. 
     -> En dat betekend weer dat we moeten diffen om de DOM om de components netjes weg te halen -> VIRTUAL DOM!

Uitzoeken
- Kan ik niet gewoon standaard de volledig app opnieuw renderen? Zo heel veel divs heb ik niet, wellicht is het niet eens erg voor performance!
- Of ik zorg dat "rerendering" niets anders is dan dingen 'hidden' en dan weer tonen. -> cameratag method
- Ik kan zorgen dan components zichzelf kunnen updaten?



