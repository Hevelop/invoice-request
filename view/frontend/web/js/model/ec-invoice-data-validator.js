/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */
define([
    'jquery',
    'uiRegistry',
    'mageUtils',
    'Magento_Ui/js/lib/validation/validator',
    'mage/validation',
    'mage/translate'
], function ($, registry, utils, validator, validation, $t) {
    'use strict';

    let vatFormListComponent = registry.get('checkout.steps.billing-step.payment.payments-list.before-place-order.ec-vat-data-form');

    validator.addRule(
        'validateVatIta',
        function (value) {
            let i;
            let j;
            let s = 0;
            let c = 0;

            if (value.length <= 0)
                return false;

            let piReg = /\d{11}/;
            if (!piReg.test(value))
                return false;

            for (i = 0; i <= 9; i += 2) {
                s += value.charCodeAt(i) - '0'.charCodeAt(0);
            }

            for (j = 1; j <= 9; j += 2) {
                c = 2 * (value.charCodeAt(j) - '0'.charCodeAt(0));
                if (c > 9) {
                    c = c - 9;
                }
                s += c;
            }

            return (10 - s % 10) % 10 === value.charCodeAt(10) - '0'.charCodeAt(0);
        }
        , $t('The format of this field is not valid')
    );

    validator.addRule(
        'validateCf',
        function (value) {
            let cfReg = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
            let i;
            let j;
            let s = 0;

            value = value.toUpperCase();

            if (!cfReg.test(value)) {
                return false;
            }

            let set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let setpari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let setdisp = "BAKPLCQDREVOSFTGUHMINJWZYX";

            for (i = 1; i <= 13; i += 2) {
                s += setpari.indexOf(set2.charAt(set1.indexOf(value.charAt(i))));
            }

            for (j = 0; j <= 14; j += 2) {
                s += setdisp.indexOf(set2.charAt(set1.indexOf(value.charAt(j))));
            }

            return s % 26 === value.charCodeAt(15) - 'A'.charCodeAt(0);
        }
        , $t('The format of this field is not valid')
    );

    validator.addRule(
        'validateSdi',
        function (value) {
            let sdiReg = /^[a-zA-Z0-9]{7,}$/;
            return sdiReg.test(value);
        }
        , $t('The format of this field is not valid')
    );

    return {

        /**
         * @returns {Boolean}
         */
        validate: function () {
            let isValid = true;

            let checkoutProvider = registry.get('checkoutProvider');
            let invoiceRequest = checkoutProvider.invoiceRequest;
            let ecInvoiceType = 'private';

            if (typeof invoiceRequest !== 'undefined' && invoiceRequest.ec_want_invoice === 1) {

                let checkout = registry.get('checkout');
                let invoiceData = {
                    ec_want_invoice: invoiceRequest.ec_want_invoice,
                    ec_company: '',
                    ec_vat_id: '',
                    ec_taxvat: '',
                    ec_sdi_code: '',
                    ec_invoice_type: ''
                };

                let vatFormFields = vatFormListComponent.childrenInputs;
                vatFormFields.forEach(function (index) {
                    let component = vatFormListComponent.getChild(index);
                    if (component.required() || component.value() !== '') {
                        let validationResult = component.validate();
                        if (validationResult.valid === false) {
                            isValid = false;
                        }
                    } else {
                        if (component.error() !== '') {
                            component.error('');
                        }
                    }
                    if (index === 'ec_invoice_type') {
                        ecInvoiceType = component.radioCheckValue();
                    }
                    invoiceData[index] = component.value();
                });

                if (ecInvoiceType === 'private') {
                    invoiceData.ec_invoice_type = "private";
                } else if (ecInvoiceType === 'business') {
                    invoiceData.ec_invoice_type = "company";
                }
                checkout.invoiceData = invoiceData;
            }

            return (isValid);
        }
    };
});
