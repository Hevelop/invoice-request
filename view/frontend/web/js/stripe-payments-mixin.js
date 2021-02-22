/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Matteo Magro <matteo.magro@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */
define([
    'uiRegistry'
], function (registry) {
    'use strict';

    const stripePaymentComponentExtended = {
        validate: function (elm) {
            const stripeValidate = this._super(elm);

            if (!stripeValidate) {
                return stripeValidate;
            }

            let isValid = true;

            let vatFormListComponent = registry.get('checkout.steps.billing-step.payment.payments-list.before-place-order.ec-vat-data-form');

            let checkoutProvider = registry.get('checkoutProvider');
            let invoiceRequest = checkoutProvider.invoiceRequest;
            let ecInvoiceType = 'private';

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


            return (isValid);
        }
    };

    return function (stripePaymentComponent) {
        return stripePaymentComponent.extend(stripePaymentComponentExtended);
    };
});
