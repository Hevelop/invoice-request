define([
    'jquery',
    'mage/validation',
    'mage/translate'
], function ($) {
    'use strict';

    let vatInputs = '.payment-method._active div.ec-vat-data-form input',
        ecErrorMessageRequired = $.mage.__('This is a required field.'),
        ecErrorMessageFormat = $.mage.__('The format of this field is not valid.'),
        openErr = '<div class="mage-error ec-error field-error">',
        closeErr = '</div>';

    let validationInvoicingFields = {
        validateVatIta: function (value) {
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
        },

        validateCf: function (value) {
            let cfReg = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
            let i;
            let j;
            let s = 0;

            value = value.toUpperCase();

            if (!cfReg.test(value))
                return false;

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
        },

        validateSdi: function (value) {
            let sdiReg = /^[a-zA-Z0-9]{7,}$/;

            return sdiReg.test(value);
        },

        generateError: function (element, message) {
            $(element).siblings('.ec-error').remove();
            $(element).after(openErr + message + closeErr);
        }
    };

    return {

        /**
         * @returns {Boolean}
         */
        validate: function () {
            let requiredValid = true;
            let vatValid = true;
            let cfValid = true;
            let sdiValid = true;

            if (window.checkoutConfig.quoteData.ec_want_invoice === 1) {

                window.checkoutConfig.invoiceData = {
                    ec_company: '',
                    ec_vat_id: '',
                    ec_taxvat: '',
                    ec_sdi_code: ''
                };

                $(vatInputs).each(function (index, element) {
                    let value = $(element).val();
                    $(element).siblings('.ec-error').remove();

                    if ($(element).hasClass('ec-required') && $(element).val() === '') {
                        $(element).addClass('ec-invalid-input');
                        $(element).attr('aria-invalid', 'true');

                        validationInvoicingFields.generateError(element, ecErrorMessageRequired);

                        requiredValid = false;
                    } else if ($(element).hasClass('ec-ita-vat-validation')) {
                        vatValid = validationInvoicingFields.validateVatIta(value);

                        if (vatValid) {
                            window.checkoutConfig.invoiceData.ec_vat_id = $('[name="customInvoice[ec_vat_id]"]').val();
                        } else {
                            validationInvoicingFields.generateError(element, ecErrorMessageFormat);
                        }
                    } else if ($(element).hasClass('ec-ita-cf-validation')) {
                        cfValid = validationInvoicingFields.validateCf(value);

                        if (cfValid) {
                            window.checkoutConfig.invoiceData.ec_taxvat = $('[name="customInvoice[ec_taxvat]"]').val();
                        } else {
                            validationInvoicingFields.generateError(element, ecErrorMessageFormat);
                        }
                    } else if ($(element).hasClass('ec-sdi-validation')) {
                        sdiValid = validationInvoicingFields.validateSdi(value);

                        if (sdiValid) {
                            window.checkoutConfig.invoiceData.ec_sdi_code = $('[name="customInvoice[ec_sdi_code]"]').val();
                        } else {
                            validationInvoicingFields.generateError(element, ecErrorMessageFormat);
                        }
                    } else {
                        $(element).removeClass('ec-invalid-input');
                        $(element).attr('aria-invalid', 'false');
                        $(element).siblings('.ec-error').remove();

                        if ($(element).attr('name') === 'customInvoice[ec_company]')
                            // eslint-disable-next-line max-len
                            window.checkoutConfig.invoiceData.ec_company = $('[name="customInvoice[ec_company]"]').val();
                        if ($(element).attr('name') === 'customInvoice[ec_vat_id]')
                            window.checkoutConfig.invoiceData.ec_vat_id = $('[name="customInvoice[ec_vat_id]"]').val();
                        if ($(element).attr('name') === 'customInvoice[ec_taxvat]')
                            window.checkoutConfig.invoiceData.ec_taxvat = $('[name="customInvoice[ec_taxvat]"]').val();
                        if ($(element).attr('name') === 'customInvoice[ec_sdi_code]')
                            // eslint-disable-next-line max-len
                            window.checkoutConfig.invoiceData.ec_sdi_code = $('[name="customInvoice[ec_sdi_code]"]').val();
                    }
                });
            }

            return (requiredValid && vatValid && cfValid && sdiValid);
        }
    };
});
