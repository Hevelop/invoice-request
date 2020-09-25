/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */
define([
    'mage/utils/wrapper',
    'Hevelop_InvoiceRequest/js/action/set-invoice-params-in-billing'
], function (wrapper, saveBillingAction) {
    'use strict';

    return function (setPaymentInformationAction) {
        return wrapper.wrap(setPaymentInformationAction, function (originalAction) {
            saveBillingAction();

            return originalAction();
        });
    };
});
