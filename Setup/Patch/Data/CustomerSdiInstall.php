<?php
/**
 * Copyright © Hevelop srl. All rights reserved.
 * @license https://opensource.org/licenses/agpl-3.0  AGPL-3.0 License
 * @author Samuele Martini <samuele.martini@hevelop.com>
 * @copyright Copyright (c) 2020 Hevelop srl (https://hevelop.com)
 * @package Hevelop_InvoiceRequest
 */

namespace Hevelop\InvoiceRequest\Setup\Patch\Data;

use Magento\Customer\Api\AddressMetadataManagementInterface;
use Magento\Eav\Model\Config;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Webformat\FatturazioneElettronica\Setup\Patch\Data\CustomerAddressAttribute;

/**
 * Class CustomerSdiInstall
 *
 * @package Hevelop\InvoiceRequest\Setup\Patch\Data
 */
class CustomerSdiInstall implements DataPatchInterface
{
    // Customer Address 'sdi_code' Attribute
    const SDI_CODE = 'sdi_code';

    /**
     * @var Config
     */
    protected $eavConfig;

    /**
     * @var EavSetupFactory
     */
    protected $eavSetupFactory;

    /**
     * @var AttributeSetFactory
     */
    protected $attributeSetFactory;

    /**
     * AddressAttribute constructor.
     *
     * @param Config $eavConfig
     * @param EavSetupFactory $eavSetupFactory
     * @param AttributeSetFactory $attributeSetFactory
     */
    public function __construct(
        Config $eavConfig,
        EavSetupFactory $eavSetupFactory,
        AttributeSetFactory $attributeSetFactory
    ) {
        $this->eavConfig = $eavConfig;
        $this->eavSetupFactory = $eavSetupFactory;
        $this->attributeSetFactory = $attributeSetFactory;
    }

    /**
     * @return void|CustomerAddressAttribute
     * @throws LocalizedException
     * @throws Zend_Validate_Exception
     */
    public function apply()
    {
        $eavSetup = $this->eavSetupFactory->create();

        // getting Attribute Set & Group Id
        $customerAddressEntity =
            $this->eavConfig->getEntityType(AddressMetadataManagementInterface::ENTITY_TYPE_ADDRESS);
        $attributeSetId = $customerAddressEntity->getDefaultAttributeSetId();
        $attributeSet = $this->attributeSetFactory->create();
        $attributeGroupId = $attributeSet->getDefaultGroupId($attributeSetId);

        $eavSetup->removeAttribute(
            AddressMetadataManagementInterface::ENTITY_TYPE_ADDRESS,
            self::SDI_CODE
        );
        $eavSetup->addAttribute(
            AddressMetadataManagementInterface::ENTITY_TYPE_ADDRESS,
            self::SDI_CODE,
            [
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
            ]
        );

        // getting attribute
        $customAttribute = $this->eavConfig->getAttribute(
            AddressMetadataManagementInterface::ENTITY_TYPE_ADDRESS,
            self::SDI_CODE
        );

        // declaring attribute Set & Group and putting attribute in the forms
        $customAttribute->addData([
            'attribute_set_id' => $attributeSetId,
            'attribute_group_id' => $attributeGroupId,
            'used_in_forms' => [
                'adminhtml_customer_address',
                'customer_address_edit',
                'customer_register_address'
            ]
        ]);

        $customAttribute->save();
    }

    /**
     * @return array
     */
    public static function getDependencies()
    {
        return [];
    }

    /**
     * @return array
     */
    public function getAliases()
    {
        return [];
    }
}
