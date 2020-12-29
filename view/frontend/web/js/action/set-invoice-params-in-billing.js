/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */
define([
    'Magento_Checkout/js/model/quote',
    'uiRegistry'
], function (quote, registry) {
    'use strict';

    return function () {
        let billingAddress = quote.billingAddress();

        if (billingAddress['extensionAttributes'] === undefined) {
            billingAddress['extensionAttributes'] = {};
        }

        let checkout = registry.get('checkout');
        let invoiceData = checkout.invoiceData;

        if (typeof invoiceData == 'undefined') {
            invoiceData = {
                ec_want_invoice: 0
            };
        }

        billingAddress['extensionAttributes']['ec_want_invoice'] = invoiceData.ec_want_invoice;

        if (invoiceData.ec_want_invoice === 1) {
            if (invoiceData.ec_company !== '') {
                billingAddress['extensionAttributes']['ec_company'] = invoiceData.ec_company;
            }

            if (invoiceData.ec_vat_id !== '') {
                billingAddress['extensionAttributes']['ec_vat_id'] = invoiceData.ec_vat_id;
            }

            if (invoiceData.ec_taxvat !== '') {
                billingAddress['extensionAttributes']['ec_taxvat'] = invoiceData.ec_taxvat;
            }

            if (invoiceData.ec_sdi_code !== '') {
                billingAddress['extensionAttributes']['ec_sdi_code'] = invoiceData.ec_sdi_code;
            }

            if (invoiceData.ec_invoice_type !== '') {
                billingAddress['extensionAttributes']['ec_invoice_type'] = invoiceData.ec_invoice_type;
            }

        } else if (billingAddress['extensionAttributes'] && billingAddress['extensionAttributes']['ec_invoice_type']) {
            billingAddress['extensionAttributes'].splice('ec_invoice_type', 1);
        }
    };
});
