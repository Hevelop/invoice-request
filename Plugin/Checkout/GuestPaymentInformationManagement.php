<?php

namespace Hevelop\InvoiceRequest\Plugin\Checkout;

use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Quote\Api\Data\AddressInterface;
use Magento\Quote\Api\Data\PaymentInterface;
use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Checkout\Model\GuestPaymentInformationManagement as Subject;
use Magento\Quote\Model\QuoteIdMaskFactory;

class GuestPaymentInformationManagement
{
    /**
     * @var CartRepositoryInterface
     */
    protected $quoteRepository;

    /**
     * @var QuoteIdMaskFactory
     */
    protected $quoteIdMaskFactory;

    /**
     * GuestPaymentInformationManagement constructor.
     * @param CartRepositoryInterface $quoteRepository
     * @param QuoteIdMaskFactory $quoteIdMaskFactory
     */
    public function __construct(
        CartRepositoryInterface $quoteRepository,
        QuoteIdMaskFactory $quoteIdMaskFactory
    ) {
        $this->quoteRepository = $quoteRepository;
        $this->quoteIdMaskFactory = $quoteIdMaskFactory;
    }

    /**
     * @param Subject $subject
     * @param $cartId
     * @param $email
     * @param PaymentInterface $paymentMethod
     * @param AddressInterface $billingAddress
     * @throws NoSuchEntityException
     */
    public function beforeSavePaymentInformation(
        Subject $subject,
        $cartId,
        $email,
        PaymentInterface $paymentMethod,
        AddressInterface $billingAddress
    ) {
        $extAttributes = $billingAddress->getExtensionAttributes();

        if (!empty($extAttributes)) {
            $quoteIdMask = $this->quoteIdMaskFactory->create()->load($cartId, 'masked_id');
            $quote = $this->quoteRepository->getActive($quoteIdMask->getQuoteId());
            $quote->setEcWantInvoice($extAttributes->getEcWantInvoice());

            if ($extAttributes->getEcWantInvoice() == "1") {
                if ($extAttributes->getEcCompany() != "") {
                    $quote->setEcCompany($extAttributes->getEcCompany());
                }

                if ($extAttributes->getEcVatId() != "") {
                    $quote->setEcVatId($extAttributes->getEcVatId());
                }

                if ($extAttributes->getEcTaxvat() != "") {
                    $quote->setEcTaxvat($extAttributes->getEcTaxvat());
                }

                if ($extAttributes->getEcSdiCode() != "") {
                    $quote->setSdiCode($extAttributes->getEcSdiCode());
                }
            }
        }
    }
}
