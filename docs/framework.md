## Classes
<dl>
<dt><a href="#Component">Component</a></dt>
<dd></dd>
<dt><a href="#Model">Model</a></dt>
<dd><p>This is a class description</p>
</dd>
</dl>
<a name="Component"></a>
## Component
**Kind**: global class  
<a name="Model"></a>
## Model
This is a class description

**Kind**: global class  
**Author:** Ron Jansen [ron@flipbase.com]  
**Copyright**: Flipbase 2015  

* [Model](#Model)
  * [new Model()](#new_Model_new)
  * [.isNew()](#Model+isNew) ⇒ <code>Boolean</code>
  * [.get(attr)](#Model+get) ⇒ <code>object</code>
  * [.set(attr, val)](#Model+set)
  * [.previous(attr)](#Model+previous) ⇒ <code>object</code>
  * [.save(method)](#Model+save)
  * [.request(parse)](#Model+request)

<a name="new_Model_new"></a>
### new Model()
The Model class is inspired on the Backbone.Model class, with setters, 
getters, pubsub and a very basic AJAX layer (JSONP).

**Example**  
```js
var model = new Model({
  recorderId: 'abc',
  duration: 30,
  H264Recording: true
});

model.set('net_connection', 'success');
model.get('duration') // 30
```
<a name="Model+isNew"></a>
### model.isNew() ⇒ <code>Boolean</code>
**Kind**: instance method of <code>[Model](#Model)</code>  
**Returns**: <code>Boolean</code> - True if _id is null  
<a name="Model+get"></a>
### model.get(attr) ⇒ <code>object</code>
**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type |
| --- | --- |
| attr | <code>string</code> | 

<a name="Model+set"></a>
### model.set(attr, val)
**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>string</code> &#124; <code>object</code> | key or object |
| val | <code>mixed</code> | value to set the attr to |

<a name="Model+previous"></a>
### model.previous(attr) ⇒ <code>object</code>
Get previous value from a certain attribute.

**Kind**: instance method of <code>[Model](#Model)</code>  
**Returns**: <code>object</code> - attribute value  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>string</code> | key to fetch attribute |

<a name="Model+save"></a>
### model.save(method)
Use POST request as default, because of cross domain limitations in older
browsers.

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | [description] |

<a name="Model+request"></a>
### model.request(parse)
**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| parse | <code>Boolean</code> | If true, then the instance needs have  parse method. |

