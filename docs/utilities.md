## Modules
<dl>
<dt><a href="#module_browser">browser</a></dt>
<dd><p>Constats with browser related info</p>
</dd>
<dt><a href="#module_Flipbase">Flipbase</a></dt>
<dd><p>Create global namespace, where other globals can be attached to. If there
is already a &#39;Flipbase&#39; namepsace available (because of the recorder for
example), then use that namespace instance.</p>
</dd>
<dt><a href="#module_pubsub">pubsub</a></dt>
<dd></dd>
<dt><a href="#module_utils">utils</a></dt>
<dd></dd>
<dt><a href="#module_DOM">DOM</a></dt>
<dd><p>Lightweight DOM selector utilty methods</p>
</dd>
<dt><a href="#module_base64">base64</a></dt>
<dd><p>Base64 encryption, used for hashing the playerId</p>
</dd>
<dt><a href="#module_events">events</a></dt>
<dd><p>Lightweight DOM event listeners module</p>
</dd>
</dl>
## Classes
<dl>
<dt><a href="#Cookie">Cookie</a></dt>
<dd></dd>
</dl>
<a name="module_browser"></a>
## browser
Constats with browser related info

<a name="module_Flipbase"></a>
## Flipbase
Create global namespace, where other globals can be attached to. If there
is already a 'Flipbase' namepsace available (because of the recorder for
example), then use that namespace instance.

<a name="module_pubsub"></a>
## pubsub
<a name="module_utils"></a>
## utils
<a name="module_utils.checkForPepper"></a>
### utils.checkForPepper() ⇒ <code>boolean</code>
Chrome ships with their own Flash Player embedded, named 'Pepper Flash'
Performance with regards to Netstream methods is much lower compared to the
official Adobe Flash Player. If both are installed and active, Chrome still prefers
Pepper Flash.

**Kind**: static method of <code>[utils](#module_utils)</code>  
**Returns**: <code>boolean</code> - true if Pepper Flash is present and actived  
<a name="module_DOM"></a>
## DOM
Lightweight DOM selector utilty methods

**Category**: helpers  

* [DOM](#module_DOM)
  * [~getEl(id)](#module_DOM..getEl) ⇒ <code>object</code>
  * [~elHasAttr(el, attr)](#module_DOM..elHasAttr) ⇒ <code>object</code>

<a name="module_DOM..getEl"></a>
### DOM~getEl(id) ⇒ <code>object</code>
Select element by id; only supports '#elementId' or 'elementId' as input;

**Kind**: inner method of <code>[DOM](#module_DOM)</code>  
**Returns**: <code>object</code> - selected document node  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | element id |

<a name="module_DOM..elHasAttr"></a>
### DOM~elHasAttr(el, attr) ⇒ <code>object</code>
**Kind**: inner method of <code>[DOM](#module_DOM)</code>  
**Returns**: <code>object</code> - attribute value or undefined  

| Param | Type |
| --- | --- |
| el | <code>object</code> | 
| attr | <code>string</code> | 

<a name="module_base64"></a>
## base64
Base64 encryption, used for hashing the playerId

**Category**: helpers  
<a name="module_events"></a>
## events
Lightweight DOM event listeners module

**Category**: helpers  
<a name="Cookie"></a>
## Cookie
**Kind**: global class  
<a name="new_Cookie_new"></a>
### new Cookie()
Small module to set, get and remove cookies and to verify if one already
exists.

