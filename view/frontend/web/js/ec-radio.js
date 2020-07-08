define([
    'Magento_Ui/js/form/element/abstract',
    'jquery',
    'Hevelop_InvoiceRequest/js/ec-vat-data-form',
    'Magento_Checkout/js/model/quote'
], function (Abstract, $, vatForm, quote) {
    'use strict';

    let vatInputs = '.payment-method div.ec-vat-data-form > .field';

    return Abstract.extend({
        initialize: function () {
            this._super();
            let self = this;

            vatForm().isVatDataFormVisible.subscribe(function (value) {
                if (value) {
                    self.change('private');
                } else {
                    $(vatInputs).each(function (index, element) {
                        // eslint-disable-next-line max-len
                        if ($(element).hasClass('ec_company') || $(element).hasClass('ec_vat_id') || $(element).hasClass('ec_taxvat')) {
                            let eleInput = $(element).find('input.input-text');

                            $(eleInput).val('');
                        }
                    });
                }
            });

            return this;
        },

        /**
         * Handle radio click
         */
        setChecked: function (data, event) {
            event.target.checked = true;
            this.change(event.target.value);
            //return true;
        },

        /**
         * Change value of radio
         */
        change: function (value) {
            if (value === 'business') {
                this.setBusinessInputs();
            } else if (value === 'private') {
                this.setPrivateInputs();
            }
        },

        setPrivateInputs: function () {
            $(vatInputs).each(function (index, element) {
                let ele = $(element),
                    eleInput = ele.find('input.input-text'),
                    eleLabel = ele.find('label');

                $('.radio-private').prop('checked', true).attr('checked', 'checked');
                $('.radio-business').prop('checked', false).removeAttr('checked');

                let billingAddress = quote.billingAddress();
                let country = billingAddress !== null ? billingAddress.countryId : 'IT';

                if (window.checkoutConfig.customerData.taxvat !== null && ele.hasClass('ec_taxvat'))
                    $(eleInput).val(window.checkoutConfig.customerData.taxvat);

                if (ele.hasClass('ec_company'))
                    $(eleInput).val('');

                if (ele.hasClass('ec_vat_id'))
                    $(eleInput).val('');

                if (ele.hasClass('ec_sdi_code'))
                    $(eleInput).val('');

                $(eleInput).removeClass('ec-invalid-input');
                $(eleInput).attr('aria-invalid', 'false');
                $(eleInput).siblings('.ec-error').remove();

                if (ele.hasClass('ec_company') || ele.hasClass('ec_vat_id') || ele.hasClass('ec_sdi_code')) {
                    $(eleInput).prop('required', false);
                    $(eleInput).removeClass('ec-required ec-sdi-validation ec-ita-vat-validation');
                    $(eleInput).addClass('ec-not-required');
                    ele.fadeOut('fast');
                    $(eleLabel).find('sup').remove();
                } else if (ele.hasClass('ec_taxvat')) {
                    $(eleInput).addClass('ec-required');
                    $(eleInput).removeClass('ec-not-required');
                    $(eleInput).prop('required', true);
                    $(eleLabel).find('sup').remove();
                    $(eleLabel).append('<sup>*</sup>');

                    if (country === 'IT')
                        $(eleInput).addClass('ec-ita-cf-validation');
                }
            });

            window.checkoutConfig.invoiceData.ec_invoice_type = "private";
        },

        setBusinessInputs: function () {
            $(vatInputs).each(function (index, element) {
                let ele = $(element),
                    eleInput = ele.find('input.input-text'),
                    eleLabel = ele.find('label');

                $('.radio-business').prop('checked', true).attr('checked', 'checked');
                $('.radio-private').prop('checked', false).removeAttr('checked');

                let billingAddress = quote.billingAddress();
                let country = billingAddress !== null ? billingAddress.countryId : 'IT';

                // eslint-disable-next-line max-len
                if (typeof billingAddress.company !== 'undefined' && billingAddress.company !== null && ele.hasClass('ec_company'))
                    $(eleInput).val(billingAddress.company);

                // eslint-disable-next-line max-len
                if (typeof billingAddress.vatId !== 'undefined' && billingAddress.vatId !== null && ele.hasClass('ec_vat_id'))
                    $(eleInput).val(billingAddress.vatId);

                if (typeof billingAddress.customAttributes !== "undefined") {
                    // eslint-disable-next-line max-len
                    if (typeof billingAddress.customAttributes.sdi_code !== 'undefined' && billingAddress.customAttributes.sdi_code.value !== null && ele.hasClass('ec_sdi_code'))
                        $(eleInput).val(billingAddress.customAttributes.sdi_code.value);
                }

                if (window.checkoutConfig.customerData.taxvat !== null && ele.hasClass('ec_taxvat'))
                    $(eleInput).val(window.checkoutConfig.customerData.taxvat);

                $(eleInput).removeClass('ec-invalid-input');
                $(eleInput).attr('aria-invalid', 'false');
                $(eleInput).siblings('.ec-error').remove();

                // eslint-disable-next-line max-len,no-extra-parens
                if (ele.hasClass('ec_company') || ele.hasClass('ec_vat_id') || (country === 'IT' && ele.hasClass('ec_sdi_code'))) {
                    $(eleInput).prop('required', true);
                    $(eleInput).removeClass('ec-not-required');
                    $(eleInput).addClass('ec-required');
                    ele.fadeIn('fast');
                    $(eleLabel).find('sup').remove();
                    $(eleLabel).append('<sup>*</sup>');

                    if (ele.hasClass('ec_sdi_code'))
                        $(eleInput).addClass('ec-sdi-validation');

                    if (country === 'IT' && ele.hasClass('ec_vat_id'))
                        $(eleInput).addClass('ec-ita-vat-validation');
                } else if (ele.hasClass('ec_taxvat')) {
                    $(eleInput).prop('required', false);
                    $(eleInput).removeClass('ec-required ec-ita-cf-validation');
                    $(eleInput).addClass('ec-not-required');
                    $(eleLabel).find('sup').remove();
                }
            });

            window.checkoutConfig.invoiceData.ec_invoice_type = "company";
        }
    });
});
