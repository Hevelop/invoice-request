<?php
/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */

namespace Hevelop\InvoiceRequest\Model\Source;

use Magento\Framework\Data\OptionSourceInterface;

class EcInvoiceTypeFilter implements OptionSourceInterface
{
    /**
     * @return array
     */
    public function toOptionArray()
    {
        return [
            [
                'value' => "company", 'label' => __('Company')
            ],
            [
                'value' => "private", 'label' => __('Private')
            ]
        ];
    }
}
