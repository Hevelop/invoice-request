<?php

namespace Hevelop\InvoiceRequest\Plugin;

use Magento\Sales\Api\Data\OrderInterface as Subject;

class SetSdiInAPi
{
    public function afterGetBillingAddress(Subject $subject, $result)
    {
        if ($result !== null) {
            $extensionAttributes = $result->getExtensionAttributes();
            $extensionAttributes->setData('sdi_code', $result->getSdiCode());
            $result->setExtensionAttributes($extensionAttributes);
        }

        return $result;
    }
}
