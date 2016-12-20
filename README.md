# mask-input
Simple module that provides a mask to enter field.
### How to use? ###
```javascript
document.querySelectorAll('input[data-mask]').forEach(function(val, key) {
    new Mask(val);
});
```
```html
<input type="text" value="" data-mask="+7 (___) - ___ - __ - __"/>
```
### Options ###
```javascript
new Mask(document.querySelector('input[data-mask]'), {
    prefix: '_',
    keyIgnore: [8,37,39,46],
    callback: {
        success: function (input) {
            console.log('success');
        },
        error: function (input) {
            console.log('error');
        }
    }
});
```

#### Available Options ####

* __setPlaceholder__: Set placeholder for input.
* __prefix__: Template for characters.
* __keyIgnore__: Keys to avoid.
* __callback.success__: Callback to execute when the input verification success.
* __callback.error__: Callback to execute when the input verification error.