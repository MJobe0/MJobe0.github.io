<?php
// Convert JSON data to PHP
$result = $_REQUEST['rawRequest'];
$obj = json_decode($result, true);

// Change with your emails
$emailfrom = "john@example.com"; // Sender or From Email
$emailto = "TestPresent@hotmail.com"; // Recipient, you can predefine or use a field value e.g. $obj['q4_email']
$subject = "You've got a new submission"; // Email Subject Title

// Do not edit
$id = $_POST['submissionID']; // Get submission ID
$submissionURL = 'https://www.jotform.com/submission/'.$id; // Construct submission URL

$headers = "From: " . $emailfrom . "\r\n";
$headers .= "Reply-To: ". $emailfrom . "\r\n"; // Optional
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\r\n";

// New method, get data from the submissions page
$html = new DOMDocument;
$html->loadHTML(file_get_contents($submissionURL));
$body = $html->getElementsByTagName('body')->item(0);
// get html code after the body tag
foreach ($body->childNodes as $child){
    $html->appendChild($html->importNode($child, true));
}
// make the table responsive so it appears nicely on email
$body = $html->getElementsByTagName('table');
foreach ($body as $width) {
    $width->setAttribute('width', '100%');
}
$body = $html->saveHTML();

// Send email
@mail($emailto, $subject, $body, $headers);
?>