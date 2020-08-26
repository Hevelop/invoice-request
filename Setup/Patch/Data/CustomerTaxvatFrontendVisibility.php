<?php

namespace Hevelop\InvoiceRequest\Setup\Patch\Data;

use Magento\Eav\Model\Config;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\App\Config\ConfigResource\ConfigInterface;

class CustomerTaxvatFrontendVisibility implements DataPatchInterface
{
    /**
     * @var Config
     */
    protected $eavConfig;

    /**
     * @var EavSetupFactory
     */
    protected $eavSetupFactory;

    /**
     * CustomerTaxvatFrontendVisibility constructor.
     * @param Config $eavConfig
     * @param EavSetupFactory $eavSetupFactory
     * @param ConfigInterface $config
     */
    public function __construct(
        Config $eavConfig,
        EavSetupFactory $eavSetupFactory,
        ConfigInterface $config
    ) {
        $this->eavConfig = $eavConfig;
        $this->eavSetupFactory = $eavSetupFactory;
        $this->config = $config;
    }

    /**
     * @return DataPatchInterface|void
     * @throws \Magento\Framework\Exception\LocalizedException
     * @throws \Magento\Framework\Exception\StateException
     * @throws \Zend_Validate_Exception
     */
    public function apply()
    {
        $this->config->saveConfig(
            'customer/create_account/vat_frontend_visibility',
            1
        );

        $eavSetup = $this->eavSetupFactory->create();
        $customAttribute = $this->eavConfig->getAttribute('customer', 'taxvat');
        $customAttribute->setData('is_visible', 1);
        $customAttribute->save();
    }

    /**
     * @return array|string[]
     */
    public static function getDependencies()
    {
        return [];
    }

    /**
     * @return array|string[]
     */
    public function getAliases()
    {
        return [];
    }
}
