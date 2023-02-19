/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var connToken = '90932561|-31949277785690148|90948864'
var dbName = 'STUDENT-TABLE'
var relName = 'SCHOOL-DB'
var jpdpBaseUrl = 'http://api.login2explore.com:5577'
var jpdpIRL = '/api/irl';
var jpdpIML = '/api/iml';

$('#rollNo').focus();

function saveRecNO2LS(resJsonObj) {
    var lvData = JSON.parse(resJsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getrollNoAsJsonObj() {
    var rollNo1 = $('#rollNo').val();
    var jsonStr = {
        Roll_No: rollNo1
    };
    return JSON.stringify(jsonStr);
}

function fillData(resJsonObj) {
    saveRecNO2LS(resJsonObj);
    var record = JSON.parse(resJsonObj.data).record;
    $("#name").val(record.Name);
    $("#class").val(record.Class);
    $("#dob").val(record.DOB);
    $("#add").val(record.Address);
    $("#eDate").val(record.Enrollment_Date);
}

function validateData() {
    var rollVar = $("#rollNo").val();
    if (rollVar === "") {
        alert("Student Roll NO is Required Value");
        $("#rollNo").focus();
        return "";
    }
    var NameVar = $("#name").val();
    if (NameVar === "") {
        alert("Student Name is Required Value");
        $("#name").focus();
        return "";
    }

    var classVar = $("#class").val();
    if (classVar === "") {
        alert("Student Class is Required Value");
        $("#class").focus();
        return "";
    }

    var dateVar = $("#dob").val();
    if (dateVar === "") {
        alert("Student DOB is Required Value");
        $("#dob").focus();
        return "";
    }

    var addVar = $("#add").val();
    if (addVar === "") {
        alert("Student Address is Required Value");
        $("#add").focus();
        return "";
    }

    var eDateVar = $("#eDate").val();
    if (eDateVar === "") {
        alert("Student Enrollment Date is Required Value");
        $("#eDate").focus();
        return "";
    }


    var jsonStrObj = {
        Roll_No: rollVar,
        Name: NameVar,
        Class: classVar,
        DOB: dateVar,
        Address: addVar,
        Enrollment_Date: eDateVar
    };
    return JSON.stringify(jsonStrObj);
}

function resetForm() {
    $("#rollNo").val("");
    $("#name").val("");
    $("#class").val("");
    $("#dob").val("");
    $("#add").val("");
    $("#eDate").val("");
    $("#rollNo").prop("disabled", false);
    
    $("#Save").prop("disabled", true);
    $("#Change").prop("disabled", true);
    $("#Reset").prop("disabled", true);
    $("#rollNo").focus();
}

function saveData() {
    var jsonStr = validateData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken, jsonStr, dbName, relName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putReqStr, jpdpBaseUrl, jpdpIML);
    alert(JSON.stringify("Data Inserted successfully !!"));
    jQuery.ajaxSetup({async: true});
    resetForm();
    
    $('#rollNo').focus();
}

function getStudent() {
    var rollNoJsonObj = getrollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, dbName, relName, rollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdpBaseUrl, jpdpIRL);
    alert(JSON.stringify(resJsonObj));
    jQuery.ajaxSetup({async: true});
    
    if (resJsonObj.status === 400) {
        $('#Save').prop("disabled", false);
        $('#Reset').prop("disabled", false);
        $('#name').focus();
    } 
    
    else if (resJsonObj.status === 200) {
        $('#rollNo').prop("disabled", true);
        fillData(resJsonObj);
        $('#Change').prop("disabled", false);
        $('#Reset').prop("disabled", false);
        $('#name').focus();
    }

}

function changeData() {
    $('#Change').prop('disabled', true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, dbName, relName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdpBaseUrl, jpdpIML); 
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#rollNo').focus();
}

