<?php
/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */

namespace Hevelop\InvoiceRequest\Setup\Patch\Data;

use Magento\Eav\Model\Config;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\Patch\DataPatchInterface;

class CustomerSdiInstall implements DataPatchInterface
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
     * AddressAttribute constructor.
     * @param Config $eavConfig
     * @param EavSetupFactory $eavSetupFactory
     */
    public function __construct(
        Config $eavConfig,
        EavSetupFactory $eavSetupFactory
    ) {
        $this->eavConfig = $eavConfig;
        $this->eavSetupFactory = $eavSetupFactory;
    }

    /**
     * @return DataPatchInterface|void
     * @throws \Magento\Framework\Exception\LocalizedException
     * @throws \Magento\Framework\Exception\StateException
     * @throws \Zend_Validate_Exception
     */
    public function apply()
    {
        $eavSetup = $this->eavSetupFactory->create();

        $eavSetup->removeAttribute('customer_address', 'sdi_code');
        $eavSetup->addAttribute('customer_address', 'sdi_code', [
            'label' => 'Codice destinatario (SDI)',
            'system' => 0,
            'user_defined' => false,
            'position' => 100,
            'sort_order' => 100,
            'visible' => true,
            'default_value' => '',
            'note' => '',
            'type' => 'varchar',
            'input' => 'text',
            'required' => false
        ]);

        $customAttribute = $this->eavConfig->getAttribute('customer_address', 'sdi_code');

        $customAttribute->setData(
            'used_in_forms',
            [
                'adminhtml_customer_address',
                'customer_address_edit',
                'customer_register_address'
            ]
        );

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
