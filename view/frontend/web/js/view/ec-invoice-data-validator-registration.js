define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/additional-validators',
        'Hevelop_InvoiceRequest/js/model/ec-invoice-data-validator'
    ],
    function (Component, additionalValidators, invoiceValidator) {
        'use strict';
        additionalValidators.registerValidator(invoiceValidator);
        return Component.extend({});
    }
);
