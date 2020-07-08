define([
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote'
], function (wrapper, quote) {
    'use strict';

    return function (placeOrderAction) {
        return wrapper.wrap(
            placeOrderAction,
            function (originalAction) {
                let billingAddress = quote.billingAddress();

                if (billingAddress['extensionAttributes'] === undefined) {
                    billingAddress['extensionAttributes'] = {};
                }

                // eslint-disable-next-line max-len
                billingAddress['extensionAttributes']['ec_want_invoice'] = window.checkoutConfig.quoteData.ec_want_invoice;

                if (window.checkoutConfig.quoteData.ec_want_invoice === 1) {
                    if (window.checkoutConfig.invoiceData.ec_company !== '') {
                        // eslint-disable-next-line max-len
                        billingAddress['extensionAttributes']['ec_company'] = window.checkoutConfig.invoiceData.ec_company;
                    }

                    if (window.checkoutConfig.invoiceData.ec_vat_id !== '') {
                        // eslint-disable-next-line max-len
                        billingAddress['extensionAttributes']['ec_vat_id'] = window.checkoutConfig.invoiceData.ec_vat_id;
                    }

                    if (window.checkoutConfig.invoiceData.ec_taxvat !== '') {
                        // eslint-disable-next-line max-len
                        billingAddress['extensionAttributes']['ec_taxvat'] = window.checkoutConfig.invoiceData.ec_taxvat;
                    }

                    if (window.checkoutConfig.invoiceData.ec_sdi_code !== '') {
                        // eslint-disable-next-line max-len
                        billingAddress['extensionAttributes']['ec_sdi_code'] = window.checkoutConfig.invoiceData.ec_sdi_code;
                    }

                    if (window.checkoutConfig.invoiceData.ec_invoice_type !== '') {
                        // eslint-disable-next-line max-len
                        billingAddress['extensionAttributes']['ec_invoice_type'] = window.checkoutConfig.invoiceData.ec_invoice_type;
                    }
                } else {
                    billingAddress['extensionAttributes'].splice('ec_invoice_type', 1);
                }

                return originalAction();
            }
        );
    };
});
