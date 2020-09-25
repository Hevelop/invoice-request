/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */
var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/action/place-order': {
                'Hevelop_InvoiceRequest/js/place-order-mixin': true
            },
            'Magento_Checkout/js/action/set-payment-information': {
                'Hevelop_InvoiceRequest/js/set-payment-information-mixin': true
            }
        }
    }
};
