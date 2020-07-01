define([
    'jquery',
    'mage/validation',
    'mage/translate'
], function ($) {
    'use strict';

    let vatInputs = '.payment-method._active div.ec-vat-data-form input',
        ecErrorMessage = $.mage.__('This is a required field.');

    return {

        /**
         * @returns {Boolean}
         */
        validate: function () {
            var isValid = true;

            if (window.checkoutConfig.quoteData.ec_want_invoice === 1) {

                window.checkoutConfig.invoiceData = {
                    ec_company: '',
                    ec_vat_id: '',
                    ec_taxvat: '',
                    ec_sdi_code: ''
                };

                $(vatInputs).each(function (index, element) {
                    if ($(element).hasClass('ec-required') && $(element).val() === '') {
                        $(element).addClass('ec-invalid-input');
                        $(element).attr('aria-invalid', 'true');
                        $(element).after('<div class="mage-error ec-error field-error">' + ecErrorMessage + '</div>');
                        isValid = false;
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
                        if($(element).attr('name') === 'customInvoice[ec_sdi_code]')
                            // eslint-disable-next-line max-len
                            window.checkoutConfig.invoiceData.ec_sdi_code = $('[name="customInvoice[ec_sdi_code]"]').val();
                    }
                });

            }

            return isValid;
        }
    };
});
