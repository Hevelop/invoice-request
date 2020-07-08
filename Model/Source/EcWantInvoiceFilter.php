<?php

namespace Hevelop\InvoiceRequest\Model\Source;

use Magento\Framework\Data\OptionSourceInterface;

class EcWantInvoiceFilter implements OptionSourceInterface
{
    /**
     * @return array
     */
    public function toOptionArray()
    {
        return [
            [
                'value' => "1", 'label' => __('Yes')
            ],
            [
                'value' => "0", 'label' => __('No')
            ]
        ];
    }
}
