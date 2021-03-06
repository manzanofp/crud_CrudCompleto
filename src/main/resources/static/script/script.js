function saveUser(){

var id = $("#id").val();
var name = $("#name").val();
var age = $("#age").val();

if(name == null || name != null && name.trim()== ' '){
$("#name").focus();
alert('Insert the name');
return;
}

if(age == null || age != null && age.trim()== ' '){
$("#age").focus();
alert('Insert the age');
return;
}

$.ajax({
method: "POST",
url: "saveUser",
data: JSON.stringify({
id : id,
name : name,
 age : age
 }),
contentType: "application/json; charset=utf-8",

success: function (response){
$("#id").val(response.id);
alert("Saved successfully!");
}

}).fail(function (xhr, status, errorThrown) {
alert("error saving: " + xhr.responseText);
});
}

function edit(id){

$.ajax({
method: "GET",
url: "findUser",
data: "iduser=" + id,

success: function (response){

$("#id").val(response.id);
$("#name").val(response.name);
$("#age").val(response.age);

$('#modal').modal('hide');

}
}).fail(function (xhr, status, errorThrown) {
alert("error when searching by id: " + xhr.responseText);
});
}

function searchUser(){
var name = $('#searchUser').val();

if(name != null && name.trim() != ' '){

$.ajax({
method: "GET",
url: "findByName",
data: "name=" + name,

success: function (response){
$('#tableResult > tbody > tr').remove();

for (var i = 0; i < response.length; i++){
$('#tableResult > tbody').append('<tr id="'+response[i].id+'"><td>'+response[i].id+'</td><td>'+response[i].name+'</td><td>'+response[i].age+'</td><td><button type="button" class="btn btn-primary" onclick="edit('+response[i].id+')">Edit</button></td><td><button type="button" class="btn btn-danger" onclick="deleteUser('+response[i].id+')">Delete</button></td></tr>');

}

}
}).fail(function (xhr, status, errorThrown) {
alert("error when searching: " + xhr.responseText);
});
}
}

function deleteUser(id){

if(confirm('Really want to delete?')){

$.ajax({
method: "DELETE",
url: "deleteUser",
data: "iduser=" + id,

success: function (response){

$('#'+ id).remove();

Alert(response);

}
}).fail(function (xhr, status, errorThrown) {
alert("error deleting user by id " + xhr.responseText);
});
}
}

function userDelete(){
var id = $('#id').val ();

if(id != null && id.trim() != ' '){
deleteUser(id);
document.getElementById('formUser').reset();
}

}