<?php

// Get the webhook payload
$json = file_get_contents('php://input');
$data = json_decode($json);

// Extract the field value from the payload
$field_value = $data->field_value;

// Set up the Jotform API
$api_key = '05f90a7283fd85e72ab2d2d45909bb1a'; //Test remove later
$team_id = "231156469084056"; //Test remove later
$sub_id = '5589980639829119136'; //Test remove later
$url = "https://innovativebc.jotform.com/API/submission/$sub_id?apiKey=$api_key&submission[5]=M&submission[6]=J&submission[55]=M"; //"https://api.jotform.com/form/$form_id/submissions";

// Set up the API data
// $data = [
//   //'submission[FIELD_ID]' => $field_value,
//   "submission[5]" => "M",
//   "submission[6]" => "J",
//   "submission[55]" => "NO",
//   "submission[56]" => "YES",
//   "submission[57]" => "YES",
//   "submission[58]" => "Needs Assessment Pending"
// ];

// Send the API request
$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  // CURLOPT_POSTFIELDS => http_build_query($data),
  CURLOPT_HTTPHEADER => [
    "APIKEY: $api_key",
    "jf-team-id: $team_id"

  ],
]);
$response = curl_exec($curl);
curl_close($curl);

// Output the API response
echo $response;

?>