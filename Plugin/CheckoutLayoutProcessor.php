<?php
/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */

namespace Hevelop\InvoiceRequest\Plugin;

use Magento\Checkout\Block\Checkout\LayoutProcessor as MagentoLayoutProcessor;

class CheckoutLayoutProcessor
{
    /**
     * @param MagentoLayoutProcessor $subject
     * @param array $jsLayout
     * @return array
     */
    public function afterProcess(
        MagentoLayoutProcessor $subject,
        array $jsLayout
    ) {
        $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']['payment']['children']['payments-list']['children']['before-place-order']['children']['ec_want_invoice'] = [
            'component' => 'Hevelop_InvoiceRequest/js/ec-want-invoice-checkbox',
            'sortOrder' => '900',
            'displayArea' => 'before-place-order',
            'config' => [
                'customScope' => 'payment',
                'template' => 'ui/form/element/checkbox',
                'options' => [],
                'id' => 'want-invoice'
            ],
            'dataScope' => 'payment.ec_want_invoice',
            'label' => __('I want invoice'),
            'provider' => 'checkoutProvider',
            'visible' => true,
            'validation' => [],
            'id' => 'want-invoice'
        ];

        $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']['payment']['children']['payments-list']['children']['before-place-order']['children']['ec-vat-data-form'] = [
            'component' => 'Hevelop_InvoiceRequest/js/ec-vat-data-form',
            'sortOrder' => '901',
            'displayArea' => 'before-place-order',
            'config' => [
                'template' => 'Hevelop_InvoiceRequest/vat-data-form-renderer',
                'options' => []
            ]
        ];

        $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']['payment']['children']['payments-list']['children']['before-place-order']['children']['ec-vat-data-form']['children']['ec_invoice_type'] = [
            'component' => 'Hevelop_InvoiceRequest/js/ec-radio',
            'displayArea' => 'ec-vat-data-form',
            'config' => [
                'customScope' => 'payment',
                'customEntry' => null,
                'template' => 'ui/form/field',
                'elementTmpl' => 'Hevelop_InvoiceRequest/ec-radios'
            ],
            'dataScope' => 'payment.ec_invoice_type',
            'label' => __('Invoice type'),
            'provider' => 'checkoutProvider',
            'visible' => true,
            'required' => false,
            'additionalClasses' => 'ec_invoice_type_radios',
            'validation' => [
                'required-entry' => false
            ],
            'sortOrder' => 110,
            'id' => 'ec_invoice_type'
        ];

        $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']['payment']['children']['payments-list']['children']['before-place-order']['children']['ec-vat-data-form']['children']['ec_company'] = [
            'component' => 'Hevelop_InvoiceRequest/js/ec-input',
            'displayArea' => 'ec-vat-data-form',
            'config' => [
                'customScope' => 'customInvoice',
                'options' => [],
                'template' => 'Hevelop_InvoiceRequest/ec-field',
                'elementTmpl' => 'Hevelop_InvoiceRequest/ec-input',
                'id' => 'ec_company_name'
            ],
            'dataScope' => 'customInvoice.ec_company',
            'label' => __('Company'),
            'provider' => 'checkoutProvider',
            'visible' => true,
            'required' => false,
            'additionalClasses' => 'ec_company',
            'validation' => [
                'required-entry' => false,
                'max_text_length' => 255
            ],
            'sortOrder' => 111,
            'id' => 'ec_company'
        ];

        $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']['payment']['children']['payments-list']['children']['before-place-order']['children']['ec-vat-data-form']['children']['ec_vat_id'] = [
            'component' => 'Hevelop_InvoiceRequest/js/ec-input',
            'displayArea' => 'ec-vat-data-form',
            'config' => [
                'customScope' => 'customInvoice',
                'options' => [],
                'template' => 'Hevelop_InvoiceRequest/ec-field',
                'elementTmpl' => 'Hevelop_InvoiceRequest/ec-input',
                'id' => 'ec_vat_id'
            ],
            'dataScope' => 'customInvoice.ec_vat_id',
            'label' => __('VAT Number'),
            'provider' => 'checkoutProvider',
            'visible' => true,
            'required' => false,
            'additionalClasses' => 'ec_vat_id',
            'validation' => [
                'required-entry' => false,
                'max_text_length' => 255,
                'validateVatIta' => true
            ],
            'sortOrder' => 112,
            'id' => 'ec_vat_id'
        ];

        $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']['payment']['children']['payments-list']['children']['before-place-order']['children']['ec-vat-data-form']['children']['ec_taxvat'] = [
            'component' => 'Hevelop_InvoiceRequest/js/ec-input',
            'displayArea' => 'ec-vat-data-form',
            'config' => [
                'customScope' => 'customInvoice',
                'options' => [],
                'template' => 'Hevelop_InvoiceRequest/ec-field',
                'elementTmpl' => 'Hevelop_InvoiceRequest/ec-input',
                'id' => 'ec_fiscal_code'
            ],
            'dataScope' => 'customInvoice.ec_taxvat',
            'label' => __('Tax / VAT number'),
            'provider' => 'checkoutProvider',
            'visible' => true,
            'required' => false,
            'additionalClasses' => 'ec_taxvat',
            'validation' => [
                'required-entry' => false,
                'max_text_length' => 255,
                'validateCf' => true
            ],
            'sortOrder' => 113,
            'id' => 'ec_taxvat'
        ];

        $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']['payment']['children']['payments-list']['children']['before-place-order']['children']['ec-vat-data-form']['children']['ec_sdi_code'] = [
            'component' => 'Hevelop_InvoiceRequest/js/ec-input',
            'displayArea' => 'ec-vat-data-form',
            'config' => [
                'customScope' => 'customInvoice',
                'options' => [],
                'template' => 'Hevelop_InvoiceRequest/ec-field',
                'elementTmpl' => 'Hevelop_InvoiceRequest/ec-input',
                'id' => 'ec_sdi_code'
            ],
            'dataScope' => 'customInvoice.ec_sdi_code',
            'label' => __('Codice destinatario (SDI)'),
            'provider' => 'checkoutProvider',
            'visible' => true,
            'required' => false,
            'additionalClasses' => 'ec_sdi_code',
            'validation' => [
                'required-entry' => false,
                'max_text_length' => 255,
                'validateSdi' => true
            ],
            'sortOrder' => 113,
            'id' => 'ec_sdi_code'
        ];

        foreach ($jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
                 ['payment']['children']['payments-list']['children'] as &$child) {
            if (isset($child['children']['form-fields']['children']['sdi_code'])) {
                unset($child['children']['form-fields']['children']['sdi_code']);
            }

            if (isset($child['children']['form-fields']['children']['vat_id'])) {
                unset($child['children']['form-fields']['children']['vat_id']);
            }
        }

        return $jsLayout;
    }
}
