var size=5, spMode=1, apMode=0, i; // i->index for students
var messFee = 150, adminPass="1", itemSelect=-1, section="first-page";

window.onbeforeunload = function() {
    return "Dude, are you sure you want to leave? Think of the kittens!";
}

class student{
    constructor(regNo,name,amount,dob,dailyDeals,hostel,room){
        this.regNo = regNo;
        this.name = name;
        this.amount = amount;
        this.dob = dob;
        this.dailyDeals = dailyDeals;
        this.hostel = hostel;
        this.room = room;
    }
}

var students = [];

students.push(new student("B220444CS","NOUFAL RAHIM",19500,"21052004",["Juice","Lays","Kurkure"],"B",144));
students.push(new student("B220395EE","HANAN VENKITTA",17640,"06082004",["Juice","Lays","Kurkure"],"A",220));
students.push(new student("B221087CS","NIVIN PRASAD",13500,"16032004",["Biscut","Apple","Biscut","Biscut","Biscut","Orange"],"B",139));
students.push(new student("B220404CS","MOHAMMED SHIBIN",13451,"30022004",["Biscut","Lays","Juice"],"B",144))
students.push(new student("1","STUDENT 1",15,"1", ["Juice","Lays","Kurkure"],"A",100))
// make sure to update size variable

function loginAsStudent(){
    $("#first-page").fadeOut(200);
    $("#login-page-student").fadeIn(400);
    section = "login-page-student";
    $("#logout-btn").fadeIn(400);
}
function loginAsAdmin(){
    $("#first-page").fadeOut(200);
    $("#login-page-admin").fadeIn(400);
    section = "login-page-admin";
    $("#logout-btn").fadeIn(400);
}
function logout(){
    $("#"+section).fadeOut(200);
    $(".sp-sidebar").html("");
    $("#first-page").fadeIn(400);
}

function enterAsStudent(){
    i=0;
    var status = 0; // 0,1,2 invalid, success, proxy
    var regNo = $(".login-input")[0].value;
    var dob = $(".login-input")[1].value;
    for(i=0;i<size;i++){
        if(regNo == students[i].regNo){
            if(dob == students[i].dob){
                status = 1;
            }
            else{
                status = 2;
            }
            break;
        }
    }
    if(status==0)
        alert("Invalid Reg.No");
    else if(status==1){
        $("#login-page-student").fadeOut(200);
        $("#student-portal").fadeIn(400);
        section = "student-portal";
        
        var spSidebar = $(".sp-sidebar");
        spSidebar.append('<img class="img-thumbnail sp-img" src="'+i+'.jpg">');
        spSidebar.append('<h3>'+students[i].name+'</h3><br><br>');
        spSidebar.append('<h4>Reg.No:'+students[i].regNo+'</h4>');
        spSidebar.append('<h4>Hostel : &emsp;'+students[i].hostel+'</h4>');
        spSidebar.append('<h4>Room : &emsp;'+students[i].room+'</h4>');
        
        manageSpBox();
    }
    else{
        alert("Proxy");
    }
}
function enterAsAdmin(){
    var adminCode = $(".login-input")[2].value;
    if(adminCode != adminPass){
        alert("Incorrect Admin Code");
        return;
    }
    
    $("#login-page-admin").fadeOut(200);
    $("#admin-portal").fadeIn(400);
    section = "admin-portal";

    manageApBox();
}

function manageSpBox(){
    var spBox=$("#sp-box-"+spMode), htmlStr='';
    switch(spMode){
        case 0:
        var slNo = 1;
        htmlStr += '<br><h2>NIT Calicut Mess - Monthly Statement</h2>';
        htmlStr += '<table border="2" class="monthly-table"><tr><th>SL</th><th>Item</th><th>Price</th><th>Quantity</th><th>Amount</th></tr>';
        for(let j=0; j<students[i].dailyDeals.length;j++){
            htmlStr += '<tr><td>'+(slNo++)+'</td><td>'+students[i].dailyDeals[j]+'</td><td>'+getPrice(students[i].dailyDeals[j])+'</td><td>'+1+'</td><td>'+getPrice(students[i].dailyDeals[j])+'</td></tr>'
        }
        htmlStr += '</table>';
        htmlStr += '<br>Total day mess used in this month: 26';
        htmlStr += '<br>Mess fee per day: '+messFee;
        htmlStr += '<br>Total mess fee: '+messFee*26;
        htmlStr += '<br><br>Net Amount: '+(messFee*26 + totalMonthlyDeal());
        break;

        case 1:
        htmlStr += '<br><h2>NIT Calicut Mess - Last 10 Items Bought</h2>';
        htmlStr += '<table><tr><th>Item</th><th>Quantity</th><th>Price</th><th>Total</th></tr>';
        for(let j=students[i].dailyDeals.length-1; j>students[i].dailyDeals.length-11 && j>=0;j--){
            htmlStr += '<tr><td>'+students[i].dailyDeals[j]+'</td> <td>1</td> <td>'+getPrice(students[i].dailyDeals[j])+'</td>'+'<td>'+getPrice(students[i].dailyDeals[j])+'</td></tr>';
        }
        htmlStr += '</table>';
        htmlStr += '<br>Overall Price: '+totalDailyDeal();
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '-' + mm + '-' + yyyy;
        htmlStr += '<br>Date: '+formattedToday;
        break;

        case 2: return;
    }
    spBox.html(htmlStr);
}
function manageApBox(){
    var apBox=$("#ap-box-"+apMode), htmlStr='';
    switch(apMode){
        case 0:
        var slNo = 1;
        htmlStr += '<br><h2>NIT Calicut Mess - Student Data</h2>';
        htmlStr += '<table border="2" class="monthly-table"><tr><th>SL</th><th>Name</th><th>Reg.No</th><th>Hostel</th><th>Room</th></tr>';
        for(let j=0; j<size;j++){
            htmlStr += '<tr><td>'+(slNo++)+'</td><td>'+students[j].name+'</td><td>'+students[j].regNo+'</td><td>'+students[j].hostel+'</td><td>'+students[j].room+'</td></tr>'
        }
        htmlStr += '</table>';
        break;

        case 1: return;

        case 2: return;
    }
    apBox.html(htmlStr);
}

function getPrice(item){
    switch(item){
        case 'Juice'    : return 25;
        case 'Lays'     : return 10;
        case 'Kurkure'  : return 20;
        case 'Biscut'   : return 9;
        case 'Apple'    : return 15;
        case 'Orange'   : return 12;
    }
}

function totalDailyDeal(){
    var sum=0;
    for(let j=students[i].dailyDeals.length-1; j>students[i].dailyDeals.length-11 && j>=0; j--){
        sum += getPrice(students[i].dailyDeals[j]);
    }
    return sum;
}
function totalMonthlyDeal(){
    var sum=0;
    for(let j=0; j<students[i].dailyDeals.length; j++){
        sum += getPrice(students[i].dailyDeals[j]);
    }
    return sum;
}


function addNewStudent(){
    var areas = $(".ap-add-input"), status=1;
    var name = areas[0].value;
    var regNo = areas[1].value;
    var hostel = areas[2].value;
    var room = parseInt( areas[3].value );
    var dob = areas[4].value;
    var amount = parseInt( areas[5].value );

    for(let j=0; j<6; j++){
        if(areas[j].value==''){
            alert("Fill All Areas");
            status = 0;
            break;
        }
    }

    if(status==1){
        students.push(new student(regNo,name,amount,dob,[],hostel,room));
        size++;
        alert("Updated Successfully");
        setToStudent();
    }
}
function addItem(){
    if(itemSelect==-1){
        alert("Select An Item");
        return;
    }
    
    var regNo = $("#ap-regAmt-input")[0].value;

    for(let j=0; j<size; j++){
        if(regNo == students[j].regNo){
            students[j].dailyDeals.push($(".item-btn")[itemSelect].innerHTML);
            alert("Item Sold Successfully")
            return;
        }
    }
    alert("Invalid Register Number");
}


// Student Portal Functions
function setToMonthly(){
    $("#sp-box-"+spMode).fadeOut(200);
    $("#sp-box-0").fadeIn(400);
    $(".sp-btn")[spMode].setAttribute("class","btn btn-lg btn-outline-dark sp-btn");
    spMode = 0;
    $(".sp-btn")[0].setAttribute("class","btn btn-lg btn-dark sp-btn");
    manageSpBox();
}
function setToLast(){
    $("#sp-box-"+spMode).fadeOut(200);
    $("#sp-box-1").fadeIn(400);
    $(".sp-btn")[spMode].setAttribute("class","btn btn-lg btn-outline-dark sp-btn");
    spMode = 1;
    $(".sp-btn")[1].setAttribute("class","btn btn-lg btn-dark sp-btn");
    manageSpBox();
}
function setToPay(){
    $("#sp-box-"+spMode).fadeOut(200);
    $("#sp-box-2").fadeIn(400);
    $(".sp-btn")[spMode].setAttribute("class","btn btn-lg btn-outline-dark sp-btn");
    spMode = 2;
    $(".sp-btn")[2].setAttribute("class","btn btn-lg btn-dark sp-btn");
    manageSpBox();
}
function setToRequest(){
    $("#sp-box-"+spMode).fadeOut(200);
    $("#sp-box-3").fadeIn(400);
    $(".sp-btn")[spMode].setAttribute("class","btn btn-lg btn-outline-dark sp-btn");
    spMode = 3;
    $(".sp-btn")[3].setAttribute("class","btn btn-lg btn-dark sp-btn");
    manageSpBox();
}

// Admin Portal Functions
function setToStudent(){
    $("#ap-box-"+apMode).fadeOut(200);
    $("#ap-box-0").fadeIn(400);
    $(".ap-btn")[apMode].setAttribute("class","btn btn-lg btn-outline-dark sp-btn ap-btn");
    apMode = 0;
    $(".ap-btn")[0].setAttribute("class","btn btn-lg btn-dark sp-btn ap-btn");
    manageApBox();
}
function setToAdd(){
    $("#ap-box-"+apMode).fadeOut(200);
    $("#ap-box-1").fadeIn(400);
    $(".ap-btn")[apMode].setAttribute("class","btn btn-lg btn-outline-dark sp-btn ap-btn");
    apMode = 1;
    $(".ap-btn")[1].setAttribute("class","btn btn-lg btn-dark sp-btn ap-btn");
    manageApBox();
}
function setToUpdateAmt(){
    $("#ap-box-"+apMode).fadeOut(200);
    $("#ap-box-2").fadeIn(400);
    $(".ap-btn")[apMode].setAttribute("class","btn btn-lg btn-outline-dark sp-btn ap-btn");
    apMode = 2;
    $(".ap-btn")[2].setAttribute("class","btn btn-lg btn-dark sp-btn ap-btn");
    manageApBox();
}
function setToUpdateFee(){
    $("#ap-box-"+apMode).fadeOut(200);
    $("#ap-box-3").fadeIn(400);
    $(".ap-btn")[apMode].setAttribute("class","btn btn-lg btn-outline-dark sp-btn ap-btn");
    apMode = 3;
    $(".ap-btn")[3].setAttribute("class","btn btn-lg btn-dark sp-btn ap-btn");
    manageApBox();
}
function setToApprove(){
    $("#ap-box-"+apMode).fadeOut(200);
    $("#ap-box-4").fadeIn(400);
    $(".ap-btn")[apMode].setAttribute("class","btn btn-lg btn-outline-dark sp-btn ap-btn");
    apMode = 4;
    $(".ap-btn")[4].setAttribute("class","btn btn-lg btn-dark sp-btn ap-btn");
    manageApBox();
}


function itemJuice(){
    if(itemSelect!=-1)
        $(".item-btn")[itemSelect].setAttribute("class","item-btn");
    itemSelect = 0;
    $(".item-btn")[0].setAttribute("class","item-btn item-btn-dark");
}
function itemLays(){
    if(itemSelect!=-1)
        $(".item-btn")[itemSelect].setAttribute("class","item-btn");
    itemSelect = 1;
    $(".item-btn")[1].setAttribute("class","item-btn item-btn-dark");
}
function itemKurkure(){
    if(itemSelect!=-1)
        $(".item-btn")[itemSelect].setAttribute("class","item-btn");
    itemSelect = 2;
    $(".item-btn")[2].setAttribute("class","item-btn item-btn-dark");
}
function itemBiscut(){
    if(itemSelect!=-1)
        $(".item-btn")[itemSelect].setAttribute("class","item-btn");
    itemSelect = 3;
    $(".item-btn")[3].setAttribute("class","item-btn item-btn-dark");
}
function itemApple(){
    if(itemSelect!=-1)
        $(".item-btn")[itemSelect].setAttribute("class","item-btn");
    itemSelect = 4;
    $(".item-btn")[4].setAttribute("class","item-btn item-btn-dark");
}
function itemOrange(){
    if(itemSelect!=-1)
        $(".item-btn")[itemSelect].setAttribute("class","item-btn");
    itemSelect = 5;
    $(".item-btn")[5].setAttribute("class","item-btn item-btn-dark");
}
