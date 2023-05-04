<?php
// Convert JSON data to PHP
$result = $_REQUEST['rawRequest'];
$obj = json_decode($result, true);

//Set field values
// $gseNumber = $obj['q4_enterThe'];
// $typeOfPack = $obj['q5_whatType'];
// $whoToInform = $obj['q6_whoShould'];
// $addPerson = $obj['q7_wouldYou'];

$currId = $obj['editSubmission'];

echo $currId;

function updateFieldValues() {
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://innovativebc.jotform.com/API/submission/5587718922157254289?apiKey=0939588d108aab1075b45c7dc97ce7ec&submission%5B55%5D=NO&submission%5B56%5D=YES&submission%5B57%5D=YES&submission%5B58%5D=Needs%20Assessment%20Pending',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_HTTPHEADER => array(
            'Cookie: ENTERPRISE_SESSION=9t9b7kepqpcbj5u3gpcitivui1; guest=guest_466ede1c1793db84; theme=tile-black'
    ),
));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;
}
  
  updateFieldValues(); // call the function

?>