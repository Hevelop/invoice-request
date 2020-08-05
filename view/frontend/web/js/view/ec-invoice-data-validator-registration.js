/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */
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
