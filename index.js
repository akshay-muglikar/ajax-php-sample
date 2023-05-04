
var jobTypes = [];
function addEmployee() {
    var fname = document.getElementById('firstname').value;
    var lname = document.getElementById('lastname').value;
    var rates = document.getElementsByName('gender');
    var gender;
    for(var i = 0; i < rates.length; i++){
        if(rates[i].checked){
            gender = rates[i].value;
        }
    }
    var jobtype = document.getElementById('jobtype').value;
    if((isInvalid(fname) || isInvalid(lname) || isInvalid(gender))){
        alert('Please select all values');
        return
    }
    var formData = new FormData(); 
    var empId= document.getElementById("empId").value
    if(empId !=="-1"){
        formData.append('query', 'edit');
        formData.append('id', empId);
    }else{
        formData.append('query', 'add');
    }
    formData.append('fname', fname)
    formData.append('lname', lname)
    formData.append('gender' , gender)
    formData.append('jobtype', jobtype)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            var response = JSON.parse(xmlHttp.responseText);
            closemodal("addEmployeeModal");
            employeeList(response); 
        }
    }
    xmlHttp.open("post", "db.php"); 
    xmlHttp.send(formData); 
}


function getEmployee() {
    var formData = new FormData(); 
    formData.append('query', 'get');
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            var response = JSON.parse(xmlHttp.responseText);
            employeeList(response);
        }
    }
    xmlHttp.open("post", "db.php"); 
    xmlHttp.send(formData); 
}
function listJobType(){
    var formData = new FormData(); 
    formData.append('query', 'jobtype');
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            var response = JSON.parse(xmlHttp.responseText);
            jobTypes= response;
            var options = '';
            for (var i = 0; i < response.length; i++) {
                options +=`<option value="${response[i].job_type_id}">${response[i].job_type_desc}</option>`
            }
            document.getElementById('jobtype').innerHTML = options;
        }
    }
    xmlHttp.open("post", "db.php"); 
    xmlHttp.send(formData); 
}
function employeeList(response){
    var tr = '';
    for (var i = 0; i < response.length; i++) {
        var firstname = response[i].firstname;
        var lastname = response[i].lastname;
        var gender = response[i].gender;
        var jobType = response[i].job_type_id;
        var id = response[i].id;
        tr += '<tr><td><input type="checkbox" name="emp" onclick="checkboxt()" value="' + id + '"></td>';
        tr += '<td>' + firstname + '</td>';
        tr += '<td>' + lastname + '</td>';
        tr += '<td>' + gender + '</td>';
        tr += '<td>' + jobTypes.find(x=>x.job_type_id == jobType).job_type_desc + 
        `</td><td><button class="btn-primary" data-bs-toggle="modal" data-bs-target="#addEmployeeModal" onclick="editEmpModal('${id}', '${firstname}', '${lastname}', '${gender}', ${jobType})">EDIT</button>
        <button class="btn-danger" onclick="showDel('${id}')">Delete</button>
        </td></tr>`;
    }
    document.getElementById('employee_data').innerHTML = tr ;
}
function editEmpModal(id, firstname, lastname, gender, job_type_id){
    document.getElementById("firstname").value = firstname;
    document.getElementById('lastname').value = lastname;
    document.getElementById('jobtype').value = job_type_id
    document.getElementById("empId").value =id; 
    document.getElementById("add-title").innerText = "EDIT Employee";
    var rates = document.getElementsByName('gender');
    for(var i = 0; i < rates.length; i++){
        if(rates[i].value==gender){
            rates[i].checked =true;
        }
    }
}
function addEmpModal(){
    document.getElementById("add-title").innerText = "Add Employee";

}
function closeEdit(){
    clearData();
}

function selectAll(){
    var val = document.getElementById("selectAll").checked;
    var empList = document.getElementsByName('emp');
    for(var i = 0; i < empList.length; i++){
        empList[i].checked = val;
    }
}

function showDel(id){
    var delemp = "";

    if(id==undefined || id == null){
        var empL = document.getElementsByName('emp');
        for(var i = 0; i < empL.length; i++){
            if(empL[i].checked){
                delemp = delemp +"'"+empL[i].value+"'"; 
            }
        }
    }else{
        delemp = `'${id}'`;
        document.getElementById("empId").value = id;

    }
    if(delemp!=="")
        showmodal('deleteEmployeeModal');
    else
        showmodal('noRecords');

}

function deleteEmployee(){
    var empL = document.getElementsByName('emp');
    var delemp = "";
    var delid =document.getElementById("empId").value
    if(delid==undefined || delid == null || delid=='-1'){
        var dat = []
        for(var i = 0; i < empL.length; i++){
            if(empL[i].checked){
                dat.push("'"+empL[i].value+"'"); 
            }
        }
        delemp = dat.join(",")
    }
    else{
        delemp=`'${delid}'`;
    }
    
    var formData = new FormData(); 
    formData.append('query', 'delete');
    formData.append('delemp', delemp);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            var response = JSON.parse(xmlHttp.responseText);
            closemodal("deleteEmployeeModal");
            document.getElementById("selectAll").checked = false;
            document.getElementById("empId").value=-1;
            employeeList(response);        
        }
    }
    xmlHttp.open("post", "db.php"); 
    xmlHttp.send(formData); 
   
}

function checkboxt() {
    document.getElementById("selectAll").checked = false;
}
function isInvalid(val){
    if(val==undefined || val==null || val == ""){
        return true;
    }
    return false;
}
function closemodal(modalId){
    var list = document.getElementsByClassName("modal-backdrop");
    for(var i = 0; i < list.length; i++){
        list[i].classList.remove("show")
        list[i].classList.remove("fade")
        list[i].classList.remove("modal-backdrop")

    }
    document.getElementById(modalId).style.display = "none";
    document.getElementById(modalId).classList.remove("show");
    clearData();
}

function showmodal(modalId){
    var list = document.getElementsByClassName("modal-backdrop");
    for(var i = 0; i < list.length; i++){
        list[i].classList.add("show")
    }
    document.getElementById(modalId).style.display = "block";
    document.getElementById(modalId).classList.add("show");
}

function clearData(){
    document.getElementById('firstname').value="";
    document.getElementById('lastname').value="";
    var rates = document.getElementsByName('gender');
    for(var i = 0; i < rates.length; i++){
        rates[i].checked =false;
    }
    document.getElementById('jobtype').value =1;
    document.getElementById("empId").value =-1; 
}