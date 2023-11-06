CREATE PROCEDURE Procedure1
AS
DECLARE @XmlResult XML;
SET @XmlResult = (
    SELECT '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    (
        SELECT
        ISNULL(documentNumber, '') AS 'Document',
        ISNULL(description, '') AS Description,
        ISNULL(externalReference, '') AS ExternalReference,
        ISNULL(invoiceDate, '') AS InvoiceDate,
        ISNULL(postingDate, '') AS PostingDate,
        ISNULL(invoiceOrCreditMemo, '') AS InvoiceOrCreditMemo,
        ISNULL(buyer, '') AS Buyer,
        ISNULL(billTo, '') AS BillTo,
        ISNULL(salesUnit, '') AS SalesUnit,
        ISNULL(itemDescription, '') AS ItemDescription,
        ISNULL(itemQuantity, '') AS 'itemQuantity',
        ISNULL(unitCode, '') AS 'itemQuantity/@UnitCode',
        ISNULL(itemUnitPrice, 0) AS 'itemUnitPrice',
        ISNULL(currencyCode, '') AS 'itemUnitPrice/@CurrencyCode',
        ISNULL(itemTaxCode, '') AS 'itemTaxCode',
        ISNULL(countryCode, '') AS 'itemTaxCode/@listID',
        ISNULL(itemAccAssignType, '') AS ItemAccAssignType,
        ISNULL(itemProTaskID, '') AS ItemProTaskID,
        ISNULL(provider, '') AS Provider,
        ISNULL(itemProduct, '') AS ItemProduct
        FROM cdCstmrItmBllble
        WHERE pmntMthd = 'Invoice' AND stts = 'New'
        FOR XML PATH ('CustomerInvoiceRequestUploader'), ROOT('ns1:CustomerInvoiceRequestUploaderInputRequest xmlns:ns1="http://0050255073-one-off.sap.com/Y8L3QDM7Y_"')
    )
);

UPDATE cdCstmrItmBllble
SET stts = 'Exported to XML'
WHERE pmntMthd = 'Invoice' AND stts = 'New';
SELECT @XmlResult AS XmlData;