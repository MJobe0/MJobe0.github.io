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
SET @XmlResult = (
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
        ISNULL(unitCode, '') AS 'itemQuantity/@UnitCode',
        ISNULL(itemQuantity, '') AS 'itemQuantity',
        ISNULL(currencyCode, '') AS 'itemUnitPrice/@CurrencyCode',
        ISNULL(itemUnitPrice, 0) AS 'itemUnitPrice',
        ISNULL(countryCode, '') AS 'itemTaxCode/@listID',
        ISNULL(itemTaxCode, '') AS 'itemTaxCode',
        ISNULL(itemAccAssignType, '') AS ItemAccAssignType,
        ISNULL(itemProTaskID, '') AS ItemProTaskID,
        ISNULL(provider, '') AS Provider,
        ISNULL(itemProduct, '') AS ItemProduct
    FROM cdCstmrItmBllble
    WHERE pmntMthd = 'Invoice' AND stts = 'New'
    FOR XML PATH ('CustomerInvoiceRequestUploader'), ROOT('CustomerInvoiceRequestUploaderInputRequest'), ELEMENTS XSINIL
);

SET @XmlResult = (
    SELECT
        '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>' AS [processing-instruction],
        '<ns1:CustomerInvoiceRequestUploaderInputRequest xmlns:ns1="http://123456-one-off.sap.com/ABCKEFG" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' AS [Root],
        (
            SELECT
                '<MessageHeader>' AS [MessageHeader],
                (
                    SELECT GETDATE() AS [CreationDateTime]
                    FOR XML PATH(''), TYPE
                ),
                '</MessageHeader>' AS [MessageHeader],
                (
                    SELECT @XmlResult
                    FOR XML RAW('List'), TYPE
                )
            FOR XML PATH(''), TYPE
        ),
        '</ns1:CustomerInvoiceRequestUploaderInputRequest>' AS [Root]
    FOR XML PATH(''), ROOT
);

UPDATE cdCstmrItmBllble
SET stts = 'Exported to XML'
WHERE pmntMthd = 'Invoice' AND stts = 'New';
SELECT @XmlResult AS XmlData;
