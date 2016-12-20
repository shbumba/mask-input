(function (global, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {/* Use AMD */
        define(factory());
    } else if (typeof module !== 'undefined' && module.exports) {/* Use CommonJS */
        module.exports = factory();
    } else {/* Use Browser */
        global.Mask = factory();
    }
})(typeof window !== 'undefined' ? window : this, function () {
    var Mask = function (_input, option) {
        var self = this;

        var _data = {},
            _option = {
                prefix: '_',
                keyIgnore: [8, 37, 39, 46],
                setPlaceholder: true,
                callback: {
                    success: function (input) {
                        //success
                    },
                    error: function (input) {
                        //error
                    }
                }
            },
            _mask = null,
            _splitMask = [],
            _replaceNum = null,
            _currentVal = null,
            _cursorPosition = null;

        this.init = function () {
            if (_input === undefined || _input.length > 1) return false;

            _option = Object.assign({}, _option, option);

            _data = _input.dataset;
            _mask = _data.mask;
            _splitMask = _mask.split(_option.prefix);
            _replaceNum = _mask.trim().replace(/[^\d]/gi, '');
            _currentVal = _input.value;
            _cursorPosition = 0;

            if (_option.setPlaceholder) {
                _input.placeholder = _mask;
            }

            _input.addEventListener('keyup', function (event) {
                self.setVal(this, event);
            });
        };

        this.getMaskedVal = function (value) {
            var clearVal = value.trim().replace(/[^\d]/gi, ''),
                splitVal = clearVal.split(''),
                maskedVal = _splitMask.slice(0);

            if (clearVal.indexOf(_replaceNum) != -1) {
                splitVal = splitVal.slice(_replaceNum.split('').length);
            }

            maskedVal.forEach(function (val, key) {
                if (key == (maskedVal.length - 1) || maskedVal[key] == undefined) return false;

                if (splitVal[key] == undefined) {
                    maskedVal[key] = maskedVal[key] + _option.prefix;
                } else {
                    maskedVal[key] = maskedVal[key] + splitVal[key];
                    self.setCursorPosition(maskedVal, key);
                }
            });

            return maskedVal.join('');
        };

        this.setCursorPosition = function (maskedVal, key) {
            var arr = [];

            for (var i = 0; i <= key; i++) {
                arr[i] = maskedVal[i];
            }

            _cursorPosition = arr.join('').length;
        };

        this.setCursor = function (input, charPos) {
            if (input != null && input != undefined) {
                if (input.createTextRange) {
                    var range = input.createTextRange();

                    range.move('character', charPos);
                    range.select();
                } else {
                    if (input.selectionStart) {
                        input.focus();
                        input.setSelectionRange(charPos, charPos);
                    } else {
                        input.focus();
                    }
                }
            }
        };

        this.check = function (input) {
            if (input.value.indexOf(_option.prefix) == -1) {
                _option.callback.success(input);
            } else {
                _option.callback.error(input);
            }
        };

        this.setVal = function (input, event) {
            _currentVal = input.value;
            _cursorPosition = input.selectionStart;

            var value = self.getMaskedVal(_currentVal);

            if (_currentVal != value && (event == null || _option.keyIgnore.join(',').indexOf(event.keyCode) < 0)) {
                input.value = value;
                self.setCursor(input, _cursorPosition);
                self.check(input);
            }
        };

        this.init();
    };

    return Mask;
});