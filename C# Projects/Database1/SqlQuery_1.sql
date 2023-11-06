CREATE TABLE cdCstmrItmBllble (
    documentNumber VARCHAR(255),
    Description VARCHAR(255),
    ExternalReference VARCHAR(255),
    InvoiceDate DATE,
    PostingDate DATE,
    InvoiceOrCreditMemo VARCHAR(50),
    Buyer INT,
    BillTo INT,
    SalesUnit VARCHAR(50),
    ItemDescription VARCHAR(255),
    ItemQuantity INT,
    unitCode VARCHAR(50),
    ItemUnitPrice DECIMAL(10, 2),
    currencyCode VARCHAR(50),
    ItemTaxCode VARCHAR(50),
    CountryCode VARCHAR(50),
    ItemAccAssignType VARCHAR(50),
    ItemProTaskID VARCHAR(50),
    Provider VARCHAR(50),
    ItemProduct VARCHAR(50),
    stts VARCHAR(50),
    pmntMthd VARCHAR(50)
);

INSERT INTO cdCstmrItmBllble VALUES
('JMS123456', 'SEP-23 ILS FEES', NULL, '2023-09-14', '2023-09-14', 'INVOICE', NULL, 123450, 'P123', 'SEP 23 PAYROLL FEES', 1, 'EA', 12.5, 'GBP', 'GB', 'GBP', 'PRO', 'P12A34BC567', 'PPG', 'R0003_S', 'New', 'Invoice');



SELECT * FROM cdCstmrItmBllble;


DROP TABLE IF EXISTS cdCstmrItmBllble;

DECLARE @XmlResult XML;
DECLARE @XmlString NVARCHAR(MAX);

WITH XMLNAMESPACES ('http://0050255073-one-off.sap.com/Y8L3QDM7Y_' AS ns1)
SELECT @XmlResult = (
    SELECT
        (SELECT
            GETDATE() AS 'CreationDateTime'
         FOR XML PATH (''), TYPE) AS 'MessageHeader',
        (SELECT
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
        ISNULL(unitCode, '') AS 'ItemQuantity/@unitCode',
        ISNULL(itemQuantity, '') AS 'ItemQuantity',
        ISNULL(currencyCode, '') AS 'ItemUnitPrice/@currencyCode',
        ISNULL(itemUnitPrice, 0) AS 'ItemUnitPrice',
        ISNULL(countryCode, '') AS 'ItemTaxCode/@listID',
        ISNULL(itemTaxCode, '') AS 'ItemTaxCode',
        ISNULL(itemAccAssignType, '') AS ItemAccAssignType,
        ISNULL(itemProTaskID, '') AS ItemProTaskID,
        ISNULL(provider, '') AS Provider,
        ISNULL(itemProduct, '') AS ItemProduct
        FROM cdCstmrItmBllble
        WHERE pmntMthd = 'Invoice' AND stts = 'New'
        FOR XML PATH ('CustomerInvoiceUploader'), TYPE) AS 'List'
        FOR XML PATH (''), ROOT('ns1:CustomerInvoiceRequestUploaderInputRequest'), TYPE
);

SET @XmlString = CONVERT(NVARCHAR(MAX), @XmlResult);
--SET @XmlString = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + @XmlString;
SET @XmlString = '<?xml version="1.0" standalone="yes"?>' + @XmlString;
--SELECT @XmlString
SET @XmlString = REPLACE(@XmlString, '<CustomerInvoiceUploader xmlns:ns1="http://0050255073-one-off.sap.com/Y8L3QDM7Y_">', '<CustomerInvoiceUploader>');
SET @XmlString = REPLACE(@XmlString, '<CreationDateTime xmlns:ns1="http://0050255073-one-off.sap.com/Y8L3QDM7Y_">', '<CreationDateTime>');
SET @XmlResult = CAST(@XmlString AS XML);
UPDATE cdCstmrItmBllble
SET stts = 'Exported to XML'
WHERE pmntMthd = 'Invoice' AND stts = 'New';
SELECT @XmlResult AS XmlData;