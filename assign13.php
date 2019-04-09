<?php
  //Function to process sign up
  function processRequestToSignUp()
  {
    if (isSingleStudentForm()) {
      $values = getAllSingleFormValues();
      saveValuesToFile($values);
    }
    else {
      $values = getAllDuetFormValues();
      saveValuesToFile($values);
    }
  }

  processRequestToSignUp();

  # Function to verify if SingleStudent form was filled in or not
  function isSingleStudentForm() {
    if (isset($_REQUEST["first-name"]) && !empty($_REQUEST["first-name"]))
    {
      return true;
    }
    else {
      return false;
    }
  }
  # Function to get all values from the single student form
  function getAllSingleFormValues() {
    
    $values = array();
    
    $firstName  = $_REQUEST["first-name"];
    $lastName   = $_REQUEST["last-name"];
    $studentId  = $_REQUEST["student-id"];
    $skillLevel = $_REQUEST["skill-level"];
    $instrument = $_REQUEST["instrument"];
    $location   = $_REQUEST["location"];
    $room       = $_REQUEST["room"];
    $time       = $_REQUEST["time-slot"];

    $values = array("firstName" => $firstName, "lastName" => $lastName, "studentID" => $studentId,
    "skill-level" => $skillLevel, "instrument" => $instrument, "location" => $location, "room" => $room, "time" => $time);
    
    return $values;
  }

  # Function will get all values from duet student form
  function getAllDuetFormValues() {

    $duet1FirstName = $_REQUEST["duet1-first-name"];
    $duet1LastName  = $_REQUEST["duet1-last-name"];
    $duet1StudentId = $_REQUEST["duet1-student-id"];
    $duet2FirstName = $_REQUEST["duet2-first-name"];
    $duet2LastName  = $_REQUEST["duet2-last-name"];
    $duet2StudentId = $_REQUEST["duet2-student-id"];
    $skillLevel     = $_REQUEST["skill-level"];
    $instrument     = $_REQUEST["instrument"];
    $location       = $_REQUEST["location"];
    $room           = $_REQUEST["room"];
    $time           = $_REQUEST["time-slot"];

    $values = array("d1FirstName" => $duet1FirstName, "d1LastName" => $duet1LastName,
    "d1StudentId" => $duet1StudentId, "d2FirstName" => $duet2FirstName, "d2LastName" => $duet2LastName, "d2StudentId" => $duet2StudentId,
    "skill-level" => $skillLevel, "instrument" => $instrument, "location" => $location, "room" => $room, "time" => $time);
    
    return $values;
  }

  function saveValuesToFile($values) {
    
      $file = fopen("registered.txt", "a") or die("Unable to open file!");
      $text1 = "";
      $tempStudentId = "";
      foreach ($values as $key => $value) {
  
                  if ($key == "d1FirstName") {
                    $text1 .= "<tr><td>$value ";
                  }
                  else if ($key == "d1LastName")
                  {
                    $text1 .= "$value ";
                  }
                  else if ($key == "d1StudentId")
                  {
                    $tempStudentId .= $value;
                  }
                  else if ($key == "d2FirstName")
                  {
                    $text1 .= "and $value ";
                  }
                  else if ($key == "d2LastName")
                  {
                    $text1 .= "$value</td>";
                  }
                  else if ($key == "d2StudentId")
                  {
                    $text1 .= "<td>$tempStudentId and $value</td>";
                  }
                  else if ($key == "firstName")
                  {
                    $text1 .= "<tr><td>$value ";
                  }
                  else if ($key == "lastName")
                  {
                    $text1 .= "$value</td>";
                  }
                  else if ($key == "studentID")
                  {
                    $text1 .= "<td>$value</td>";
                  }
                  else if ($key == "skill-level")
                  {
                    $text1 .= "<td>$value</td>";
                  }
                  else if ($key == "instrument")
                  {
                    $text1 .= "<td>$value</td>";                    
                  }
                  else if ($key == "location")
                  {
                    $text1 .= "<td>$value</td>";
                  }
                  else if ($key == "room")
                  {
                    $text1 .= "<td>$value</td>";
                  }
                  else if ($key == "time")
                  {
                    $text1 .= "<td>$value</td><tr>";
                  }

      }
      fwrite($file, $text1);

  }
  ?>