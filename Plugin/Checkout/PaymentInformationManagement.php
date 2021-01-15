<?php
/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */

namespace Hevelop\InvoiceRequest\Plugin\Checkout;

use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Quote\Api\Data\AddressInterface;
use Magento\Quote\Api\Data\PaymentInterface;
use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Checkout\Model\PaymentInformationManagement as Subject;

class PaymentInformationManagement
{
    /**
     * @var CartRepositoryInterface
     */
    protected $quoteRepository;

    /**
     * PaymentInformationManagement constructor.
     * @param CartRepositoryInterface $quoteRepository
     */
    public function __construct(
        CartRepositoryInterface $quoteRepository
    ) {
        $this->quoteRepository = $quoteRepository;
    }

    /**
     * @param Subject $subject
     * @param $cartId
     * @param PaymentInterface $paymentMethod
     * @param AddressInterface $billingAddress
     * @throws NoSuchEntityException
     */
    public function beforeSavePaymentInformation(
        Subject $subject,
        $cartId,
        PaymentInterface $paymentMethod,
        AddressInterface $billingAddress
    ) {
        $extAttributes = $billingAddress->getExtensionAttributes();

        if (!empty($extAttributes)) {
            $quote = $this->quoteRepository->getActive($cartId);
            $quote->setEcWantInvoice($extAttributes->getEcWantInvoice());
            // This is a mapping of the customer vatId and the Taxvat
            $vatData = array(
                $extAttributes->getEcVatId(),
                $extAttributes->getEcTaxvat()
            );

            if ($extAttributes->getEcWantInvoice() == "1") {
                $quote->setEcInvoiceType($extAttributes->getEcInvoiceType());
                $billingAddress->setCompany($extAttributes->getEcCompany());
                $billingAddress->setVatId(implode(",", $vatData));
                $billingAddress->setSdiCode($extAttributes->getEcSdiCode());
            } else {
                $quote->setEcInvoiceType("");
                $billingAddress->setCompany("");
                $billingAddress->setVatId("");
                $billingAddress->setSdiCode("");
            }
        }
    }
}
