<?php
  $connection = mysqli_connect('127.0.0.1:3306','test','Testakshay@123', 'tempDB');
  if (!$connection) {
    die('Could not connect: ' . mysqli_error($con));
  }
  $query = $_POST['query'];
  
  if($query=='add') {
    addEmp($connection);
  }
  if($query=='delete') {
    deleteEmp($connection);
  }
  if($query=='edit') {
   editEmp($connection);
  }
  if($query=='jobtype'){
   listjobTypes($connection);
   die();
  }

  getEmp($connection);

function getEmp($connection){
  $sql= "SELECT *  FROM `employee`";
  $result= mysqli_query($connection ,  $sql);
  $data = [];
  while ($fetch=mysqli_fetch_assoc($result)){
    $data[] = $fetch;
  }
  print_r(json_encode($data));
}
  
function addEmp($connection){
  $first_name= $_POST['fname'];
  $last_name= $_POST['lname'];
  $gender = $_POST['gender'];
  $job_type = $_POST['jobtype'];
  $query="INSERT INTO Employee (firstname,lastname,gender,job_type_id) VALUES ('$first_name','$last_name','$gender','$job_type');";
  $exec= mysqli_query($connection,$query);
  if($exec){
    $msg="Data was created sucessfully";

  }else{
    $msg= "Error: " . $query . "<br>" . mysqli_error($connection);
  }
}

function deleteEmp($connection){
  $delemp= $_POST['delemp'];
  
  $query="Delete from Employee where id in ($delemp);";
  $exec= mysqli_query($connection,$query);
  if($exec){
    $msg="Data was created sucessfully";

  }else{
    $msg= "Error: " . $query . "<br>" . mysqli_error($connection);
  }
}

function editEmp($connection){
  $first_name= $_POST['fname'];
  $last_name= $_POST['lname'];
  $gender = $_POST['gender'];
  $job_type = $_POST['jobtype'];
  $id = $_POST['id'];

  $query="Update Employee set job_type_id ='$job_type', firstname='$first_name',lastname='$last_name',gender='$gender'  where id = '$id';";
  $exec= mysqli_query($connection,$query);
  if($exec){
    $msg="Data was created sucessfully";

  }else{
    $msg= "Error: " . $query . "<br>" . mysqli_error($connection);
  }
}
function listjobTypes($connection){
  $sql= "SELECT *  FROM `job_type`";
  $result= mysqli_query($connection ,  $sql);
  $data = [];
  while ($fetch=mysqli_fetch_assoc($result)){
    $data[] = $fetch;
  }
  print_r(json_encode($data));
}

?>