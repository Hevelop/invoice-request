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
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Sales\Api\Data\OrderSearchResultInterface;
use Magento\Sales\Api\OrderRepositoryInterface;

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

    /**
     * @param OrderRepositoryInterface $subject
     * @param OrderSearchResultInterface $result
     * @param SearchCriteriaInterface $searchCriteria
     * @return OrderSearchResultInterface
     */
    public function afterGetList(
        OrderRepositoryInterface $subject,
        OrderSearchResultInterface $result,
        SearchCriteriaInterface $searchCriteria
    ): OrderSearchResultInterface {
        foreach ($result->getItems() as $order) {
            $extensionAttributes = $order->getExtensionAttributes();
            $extensionAttributes->setData('want_invoice', $order->getEcWantInvoice());
            $extensionAttributes->setData('invoice_type', $order->getEcInvoiceType());
            $order->setExtensionAttributes($extensionAttributes);
        }
        return $result;
    }
}
