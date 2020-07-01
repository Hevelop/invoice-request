<?php

namespace Hevelop\InvoiceRequest\Observer;

use Magento\Checkout\Model\Session;
use Magento\Framework\Event\Observer as EventObserver;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;

class SaveDataToOrderObserver implements ObserverInterface
{
    /**
     * @var Session
     */
    protected $checkoutSession;

    /**
     * SaveDataToOrderObserver constructor.
     * @param Session $checkoutSession
     */
    public function __construct(
        Session $checkoutSession
    ) {
        $this->checkoutSession = $checkoutSession;
    }

    /**
     * @param EventObserver $observer
     * @return $this|void
     * @throws LocalizedException
     * @throws NoSuchEntityException
     */
    public function execute(EventObserver $observer)
    {
        $order = $observer->getOrder();
        $quote = $this->checkoutSession->getQuote();

        $order->setEcWantInvoice($quote->getEcWantInvoice());

        if ($quote->getEcWantInvoice() == "1") {
            $addresses = $order->getAddresses();

            foreach ($addresses as $address) {
                if ($address->getAddressType() == 'billing') {
                    if ($quote->getEcCompany() != "") {
                        $address->setCompany($quote->getEcCompany());
                    }

                    if ($quote->getEcVatId() != "") {
                        $address->setVatId($quote->getEcVatId());
                    }

                    if ($quote->getSdiCode() != "") {
                        $address->setSdiCode($quote->getSdiCode());
                    }
                }
            }

            if ($quote->getEcTaxvat() != "") {
                $order->setCustomerTaxvat($quote->getEcTaxvat());
            }
        }

        return $this;
    }
}
