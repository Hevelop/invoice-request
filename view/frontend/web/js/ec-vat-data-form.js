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
    'Magento_Ui/js/form/form'
],
function ($, ko, Form) {
    'use strict';

    return Form.extend({
        defaults: {
            isVatDataFormVisible: ko.observable(),
            childrenInputs: [
                'ec_invoice_type',
                'ec_company',
                'ec_vat_id',
                'ec_taxvat',
                'ec_sdi_code'
            ]
        },

        initialize: function () {
            this._super();
            this.isVatDataFormVisible(false);
            return this;
        }
    });
});
