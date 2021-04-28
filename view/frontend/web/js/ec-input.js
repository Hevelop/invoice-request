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
    'ko',
    'Magento_Ui/js/lib/validation/validator'
], function (Abstract, $, ko, validator) {
    'use strict';

    return Abstract.extend({
        defaults: {
            template: 'Hevelop_InvoiceRequest/ec-field',
            elementTmpl: 'Hevelop_InvoiceRequest/ec-input',
            value: ko.observable(),
            validation: ko.observable()
        },
        getElementId: function ($parentContext) {
            let paymentMethodName = '',
                paymentMethodRenderer = $parentContext.$parents[1];

            if (paymentMethodRenderer) {

                paymentMethodName = paymentMethodRenderer.item ?
                    paymentMethodRenderer.item.method : '';
            }
            return (paymentMethodName ? paymentMethodName + '_' : '') + this.uid;
        },

        validate: function () {
            var value = this.value(),
                result = validator(this.validation, value, this.validationParams),
                message = !this.disabled() && this.visible() ? result.message : '',
                isValid = this.disabled() || !this.visible() || result.passed;

            this.error(message);
            this.error.valueHasMutated();
            this.bubble('error', message);

            if (this.source && !isValid) {
                this.source.set('params.invalid', true);
            }

            return {
                valid: isValid,
                target: this
            };
        }
    });
});
