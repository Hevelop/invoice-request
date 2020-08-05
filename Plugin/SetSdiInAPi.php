<?php
/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */

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
