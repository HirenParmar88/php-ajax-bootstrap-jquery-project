$(document).ready(function(){

//Ajax req for show data
function showdata(){
    output="";
    $.ajax({
        url:"showdata.php",
        method:"GET",
        dataType:"json",
        success:function(data){
            //console.log(data[0].name);
            if(data){
                x=data;
            }else{
                x="";
            }
            for(i=0; i<x.length; i++){
                //console.log(x[i].name);
                output += "<tr><td>" + x[i].id + "</td><td>" + x[i].name + "</td><td>" + x[i].email + "</td><td>" + x[i].password + "</td><td> <button class='btn btn-warning btn-sm btn-edit' data-sid="+ x[i].id +"> Edit </button> <button class='btn btn-danger btn-sm btn-del' data-sid="+ x[i].id +"> Delete <button></td></tr>";
            }
            $("#tbody").html(output);
        },
    });
}
showdata()

//Ajax req for insert data
$("#btnadd").click(function(e){
    e.preventDefault();
    console.log("insert button clicked..");

    let stid=$('#stuid').val()
    let nm=$("#nameid").val()
    let em=$("#emailid").val()
    let pw=$("#passwordid").val()
    //console.log(nm);
    //console.log(em);
    //console.log(pw);

    mydata={id:stid, name:nm, email:em, password:pw};
    //console.log(mydata);
    $.ajax({
        url:"insert.php",
        method:"POST",
        data:JSON.stringify(mydata),
        success:function(data){
            console.log(data);
            msg="<div>"+ data + "</div>";
            $("#msg").html(msg);
            $("#myform")[0].reset();
            showdata(); 
        },

    });

});

//Ajax req delete data
$("tbody").on("click", ".btn-del", function(){
    console.log("delete button clicked");
    let id=$(this).attr("data-sid");
    //console.log(id);
    mydata={sid:id};
    mythis=this;
    $.ajax({
        url:"delete.php",
        method:"POST",
        data: JSON.stringify(mydata),
        success: function(data){
            //console.log(data);
            if(data==1){
                msg="<div>"+ data + "</div>";
                $(mythis).closest("tr").fadeOut();

            }else if(data==0){
                msg="<div> Error! </div>";   
            }
            $("#msg").html(msg);
            //showdata();
        },
    });
});

//Ajax req Update data
$("tbody").on("click", ".btn-edit", function(){
    console.log("Edit button clicked");
    let id=$(this).attr("data-sid");
    //console.log(id);
    mydata={sid:id};
    $.ajax({
        url: "edit.php",
        method: "POST",
        dataType: "json",
        data: JSON.stringify(mydata),
        success: function(data){
            //console.log(data.id);
            $("#stuid").val(data.id);
            $("#nameid").val(data.name);
            $("#emailid").val(data.email);
            $("#passwordid").val(data.password);
        }
    });

});

});