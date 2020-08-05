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
    'uiComponent',
    'Magento_Ui/js/lib/validation/validator',
    'Magento_Checkout/js/model/payment/additional-validators'
],

function ($, ko, Component, validator) {
    'use strict';

    return Component.extend({
        defaults: {
            isVatDataFormVisible: ko.observable()
        },

        initialize: function () {
            this._super();

            this.isVatDataFormVisible(false);
            // component initialization logic

            return this;
        }
    });
});
