/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */
define([
    'Magento_Ui/js/form/element/abstract',
    'jquery',
], function (Abstract, $) {
    'use strict';

    return Abstract.extend({
        defaults: {
            template: 'Hevelop_InvoiceRequest/ec-field',
            elementTmpl: 'Hevelop_InvoiceRequest/ec-input',
        },
        getElementId: function ($parentContext) {
            var paymentMethodName = '',
                // paymentMethodRenderer = this.$parentContext.$parents[1];
                paymentMethodRenderer = $parentContext.$parents[1];

            // corresponding payment method fetched from parent context
            if (paymentMethodRenderer) {
                // item looks like this: {title: "Check / Money order", method: "checkmo"}
                paymentMethodName = paymentMethodRenderer.item ?
                    paymentMethodRenderer.item.method : '';
            }
            return (paymentMethodName ? paymentMethodName + '_' : '') + this.uid;
        },
    });
});
