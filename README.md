## Checkout invoice request for italian invoicing

### Checkout
A new section is added to checkout in the payment step.
The new section contains "I want an invoice." checkbox. If this is checked, the user can choose whether to request the invoice as a private individual or a company.

If private:
```
- "Tax/Va Number" field (required if checked "I want invoice")
If the user is registered, it will be pre-filled with the "tax vat number" field relating to his account.
If he is a guest, with the one entered during checkout.
In both cases, the user can change it if necessary.
```
If company:
```
- "Company" field (required if checked "I want invoice")
If the user is registered, it will be pre-filled with the company field relating to the registered address.
If he is a guest, with the one entered during checkout.
In both cases, the user can change it if necessary.

- "VAT number" field (required if checked "I want invoice")
If the user is registered, it will be pre-filled with the vat_id field relating to the registered address.
If he is a guest, with the one entered during checkout.
In both cases, the user can change it if necessary.

- "Tax code" field (optional)
If the user is registered, it will be pre-filled with the taxvat field relating to his account.
If it is a guest, with the one entered during compilation.
In both cases, the user can change it if necessary, the field has been left for companies that have different CF and VAT numbers.

- "Recipient code (SDI)" field
The italian electronic invoicing field appears only if the billing address has set Italy as country, in this case it is also required.
If the billing address has another country, the field is emptied and hidden.
If the user is registered, it will be pre-filled with the sdi_code field relating to the registered address.
If it is a guest, with the one entered during compilation.
In both cases, the user can change it if necessary.
```
If the user is registered and changes the pre-filled fields, the modifications will be valid only for that single order.
Nothing will be changed in your account and at the next order you will find them pre-filled with the registered data.

### Customer Account
In the customer account, the user will find:
- the native "Tax/Vat Number" field provided by Magento, in customer entity
- the native "Company" filed provided by Magento, in customer address entity
- the native "Vat id" filed provided by Magento, in customer address entity
- the new "SDI code" filed for italian invoice provided by module, in customer address entity

### Order
At the order level, a "want invoice" field is registered if customer check "I want invoice" at checkout.
The field is visible in the backend order grid and is filterable.
The billing address of the order is filled in with the fields entered by the user in the new section at checkout.
If the fields had been changed compared to the pre-filled ones, in the order they will be modified but only for this order.

### Configurations
- The Magento native tax vat number must be active in "Store -> Configuration -> Customer Configuration"
- The Magento native vat id must be active in "Store -> Configuration -> Customer Configuration"
- The SDI code for italian invoice must be added in the address template in "Store -> Configuration -> Customer Configuration"

Ex.:
```
{{depend prefix}}{{var prefix}} {{/depend}}{{var firstname}} {{depend middlename}}{{var middlename}} {{/depend}}{{var lastname}}{{depend suffix}} {{var suffix}}{{/depend}}
{{depend company}}{{var company}}{{/depend}}
{{if street1}}{{var street1}}
{{/if}}
{{depend street2}}{{var street2}}{{/depend}}
{{depend street3}}{{var street3}}{{/depend}}
{{depend street4}}{{var street4}}{{/depend}}
{{if city}}{{var city}},  {{/if}}{{if region}}{{var region}}, {{/if}}{{if postcode}}{{var postcode}}{{/if}}
{{var country}}
{{depend telephone}}T: {{var telephone}}{{/depend}}
{{depend fax}}F: {{var fax}}{{/depend}}
{{depend vat_id}}VAT: {{var vat_id}}{{/depend}}
{{depend sdi_code}}SDI: {{var sdi_code}}{{/depend}}
```

### Translations
The module has i18n transaltions for italian, french and spanish languages.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


## Modulo richiesta fattura a checkout per fatturazione italiana

### Checkout
A checkout viene aggiunta una nuova sezione nello step del pagamento.
La nuova sezione contiene una spunta "Desidero la fattura." Se questa viene checkata, l'utente potrà scegliere se richiedere la fattura come privato o azienda.

Se privato:
```
- Campo "codice fiscale" (obbligatorio se spuntata "desidero fattura")
Se l'utente è registrato, verrà pre-compilato con il campo "taxvat" relativo al suo account.
Se è guest, con quello inserito in fase di compilazione checkout.
In entrambi in casi potrà eventualmente modificarlo.
```
Se azienda:
```
- Campo "azienda" (obbligatorio se spuntata "desidero fattura")
Se l'utente è registrato, verrà pre-compilato con il campo company relativo all'indirizzo registrato.
Se è guest, con quello inserito in fase di compilazione checkout.
In entrambi in casi potrà eventualmente modificarlo.

- Campo "partita iva" (obbligatorio se spuntata "desidero fattura")
Se l'utente è registrato, verrà pre-compilato con il campo vat_id relativo all'indirizzo registrato.
Se è guest, con quello inserito in fase di compilazione checkout.
In entrambi in casi potrà eventualmente modificarlo.

- Campo "codice fiscale" (facoltativo)
Se l'utente è registrato, verrà pre-compilato con il campo taxvat relativo al suo account.
Se è guest, con quello inserito in fase di compilazione.
In entrambi in casi potrà eventualmente modificarlo, il campo è stato lasciato per le aziende che hanno CF e P.IVA differente.

- Campo "codice destinatario (SDI)"
Il campo per la fatturazione elettronica, appare solo se il billing address ha impostato come country l'Italia, in questo caso è anche obbligatorio.
Se il billing address presenta un country estero, il campo viene svuotato e nascosto.
Se l'utente è registrato, verrà pre-compilato con il campo sdi_code relativo all'indirizzo registrato.
Se è guest, con quello inserito in fase di compilazione.
In entrambi in casi potrà eventualmente modificarlo.
```
Qualora l'utente sia registrato e modifichi i campi pre-compilati, le modifiche saranno valide solo per quel singolo ordine.
Non verrà modificato nulla nel suo account e al prossimo ordine li troverà pre-compilati con i dati registrati.

### Account utente
L'utente si troverà:
- a livello account il codice fiscale (taxvat, nativo Magento)
- a livello address l'azienda (company, nativo Magento)
- a livello address la partita iva (vat_id, nativo Magento)
- a livello address il codice SDI (sdi_code, campo aggiunto dal modulo)

### Ordine
A livello ordine viene registrato se l'utente ha richiesto la fattura (want_invoice).
Il campo è visibile nella griglia ordini a backend ed è filtrabile.
Il billing address dell'ordine viene compilato con i campi inseriti dall'utente nella nuova sezione a checkout.
Se i campi erano stati modificati rispetto ai precompilati, nell'ordine risulteranno modificati ma solo per questo ordine.

### Configurazioni
- codice fiscale (taxvat) deve essere attivato dalle configurazioni del customer in "Store -> Configuration -> Customer Configuration"
- partita iva (vat_id) deve essere attivato dalle configurazioni del customer in "Store -> Configuration -> Customer Configuration"
- SDI (sdi code) deve essere aggiunto all'address template nelle configurazioni del customer in "Store -> Configuration -> Customer Configuration"

Es.:
```
{{depend prefix}}{{var prefix}} {{/depend}}{{var firstname}} {{depend middlename}}{{var middlename}} {{/depend}}{{var lastname}}{{depend suffix}} {{var suffix}}{{/depend}}
{{depend company}}{{var company}}{{/depend}}
{{if street1}}{{var street1}}
{{/if}}
{{depend street2}}{{var street2}}{{/depend}}
{{depend street3}}{{var street3}}{{/depend}}
{{depend street4}}{{var street4}}{{/depend}}
{{if city}}{{var city}},  {{/if}}{{if region}}{{var region}}, {{/if}}{{if postcode}}{{var postcode}}{{/if}}
{{var country}}
{{depend telephone}}T: {{var telephone}}{{/depend}}
{{depend fax}}F: {{var fax}}{{/depend}}
{{depend vat_id}}VAT: {{var vat_id}}{{/depend}}
{{depend sdi_code}}SDI: {{var sdi_code}}{{/depend}}
```

### Traduzioni
Le voci sono in inglese, sono inserite le traduzioni per italiano, francese e spagnolo.
