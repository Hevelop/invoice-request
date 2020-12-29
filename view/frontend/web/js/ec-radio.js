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
    'Hevelop_InvoiceRequest/js/ec-vat-data-form',
    'Magento_Checkout/js/model/quote',
    'uiRegistry'
], function (Abstract, $, ko, vatForm, quote, registry) {
    'use strict';

    return Abstract.extend({
        defaults: {
            vatFormListComponent: registry.get('checkout.steps.billing-step.payment.payments-list.before-place-order.ec-vat-data-form'),
            radioCheckValue: ko.observable('private'),
            value: ko.observable()
        },
        initialize: function () {
            this._super();
            let self = this;

            this.radioCheckValue('private');

            vatForm().isVatDataFormVisible.subscribe(function (value) {
                if (value) {
                    self.change('private');
                } else {
                    let vatFormFields = self.vatFormListComponent.childrenInputs;
                    vatFormFields.forEach(function (index) {
                        let component = self.vatFormListComponent.getChild(index);
                        // eslint-disable-next-line max-len
                        if (component.additionalClasses['ec_company'] || component.additionalClasses['ec_vat_id'] || component.additionalClasses['ec_taxvat']) {
                            component.value('');
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
            let self = this;
            let vatFormFields = this.vatFormListComponent.childrenInputs;
            let taxvat = window.checkoutConfig.customerData.taxvat;
            self.radioCheckValue('private');
            vatFormFields.forEach(function (index) {
                let component = self.vatFormListComponent.getChild(index);
                let ele = $('.' + component.id);

                let billingAddress = quote.billingAddress();
                let country = billingAddress !== null ? billingAddress.countryId : 'IT';

                if (taxvat !== null && component.additionalClasses['ec_taxvat']) {
                    component.value(taxvat);
                }

                if (component.additionalClasses['ec_company'] || component.additionalClasses['ec_vat_id'] || component.additionalClasses['ec_sdi_code']) {
                    component.value('');
                }

                if (component.additionalClasses['ec_company'] || component.additionalClasses['ec_vat_id'] || component.additionalClasses['ec_sdi_code']) {
                    component.required(false);
                    component.validation['required-entry'] = false;
                    component.visible(false);
                    ele.fadeOut('fast');
                } else if (component.additionalClasses['ec_taxvat']) {
                    component.required(true);
                    component.validation['required-entry'] = true;
                    if (country === 'IT') {
                        component.validation['validateCf'] = true;
                    } else {
                        component.validation['validateCf'] = false;
                    }
                }
            });
        },

        setBusinessInputs: function () {
            let self = this;
            let vatFormFields = this.vatFormListComponent.childrenInputs;
            let taxvat = window.checkoutConfig.customerData.taxvat;
            self.radioCheckValue('business');
            vatFormFields.forEach(function (index) {
                let component = self.vatFormListComponent.getChild(index),
                    ele = $('.' + component.id);

                let billingAddress = quote.billingAddress();
                let country = billingAddress !== null ? billingAddress.countryId : 'IT';

                if (billingAddress !== null) {

                    if (typeof billingAddress.company !== 'undefined' && billingAddress.company !== null && component.additionalClasses['ec_company']) {
                        component.value(billingAddress.company);
                    }

                    if (typeof billingAddress.vatId !== 'undefined' && billingAddress.vatId !== null && component.additionalClasses['ec_vat_id']) {
                        component.value(billingAddress.vatId);
                    }

                    if (typeof billingAddress.customAttributes !== "undefined") {
                        if (typeof billingAddress.customAttributes.sdi_code !== 'undefined' && billingAddress.customAttributes.sdi_code.value !== null && component.additionalClasses['ec_sdi_code']) {
                            component.value(billingAddress.customAttributes.sdi_code.value);
                        }
                    }
                }

                if (taxvat !== null && component.additionalClasses['ec_taxvat']) {
                    component.value(taxvat);
                }

                if (component.additionalClasses['ec_company'] || component.additionalClasses['ec_vat_id'] || (country === 'IT' && component.additionalClasses['ec_sdi_code'])) {
                    if (!component.additionalClasses['ec_company']) {
                        component.required(true);
                        component.validation['required-entry'] = true;
                    }
                    component.visible(true);
                    ele.fadeIn('fast');
                    if (country === 'IT' && component.additionalClasses['ec_vat_id']) {
                        component.validation['validateVatIta'] = true;
                    } else {
                        component.validation['validateVatIta'] = false;
                    }
                } else if (component.additionalClasses['ec_taxvat']) {
                    component.required(false);
                    component.validation['required-entry'] = false;
                    component.error('');
                    component.error.valueHasMutated();
                    component.bubble('error', '');
                }
            });
        }
    });
});
