<?php

namespace Hevelop\InvoiceRequest\Plugin;

use Magento\Sales\Api\OrderRepositoryInterface as Subject;

class SetWantInvoiceInAPi
{
    public function afterGet(Subject $subject, $result, $id)
    {
        if ($result !== null) {
            $extensionAttributes = $result->getExtensionAttributes();
            $extensionAttributes->setData('want_invoice', $result->getEcWantInvoice());
            $extensionAttributes->setData('invoice_type', $result->getEcInvoiceType());
            $result->setExtensionAttributes($extensionAttributes);
        }

        return $result;
    }
}
