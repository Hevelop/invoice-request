/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */
define([
    'jquery',
    'ko',
    'Magento_Ui/js/form/element/boolean',
    'Hevelop_InvoiceRequest/js/ec-vat-data-form',
    'uiRegistry'
], function ($, ko, Component, vatForm, registry) {
    'use strict';

    return Component.extend({
        initialize: function () {
            this._super();

            this.value.subscribe(function (value) {
                let checkoutProvider = registry.get('checkoutProvider');
                let invoiceRequest = checkoutProvider.getChild('invoiceRequest');
                if (typeof invoiceRequest == 'undefined') {
                    invoiceRequest = {};
                }
                invoiceRequest.ec_want_invoice = value ? 1 : 0;
                checkoutProvider.set('invoiceRequest', invoiceRequest);
                vatForm().isVatDataFormVisible(value);
            });
            return this;
        }
    });
});
