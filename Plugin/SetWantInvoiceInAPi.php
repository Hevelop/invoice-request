<?php
/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */

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
