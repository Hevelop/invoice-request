define([
    'jquery',
    'ko',
    'uiComponent',
    'Magento_Ui/js/lib/validation/validator',
    'Magento_Checkout/js/model/payment/additional-validators'
],

function ($, ko, Component, validator) {
    'use strict';

    return Component.extend({
        defaults: {
            isVatDataFormVisible: ko.observable()
        },

        initialize: function () {
            this._super();

            this.isVatDataFormVisible(false);
            // component initialization logic

            return this;
        }
    });
});
