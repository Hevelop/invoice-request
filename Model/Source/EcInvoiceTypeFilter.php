<?php

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
