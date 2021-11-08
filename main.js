//SELECTING ELEMENTS
const add = document.querySelector("#add");
const fullName = document.querySelector("#full-name");
const matNumber = document.querySelector("#mat-number");
const courseCode = document.querySelector("#course-code");
const unitLoad = document.querySelector("#unit-load");
const grade = document.querySelector("#grade");
const tbody = document.querySelector("#tbody");
const tfoot = document.querySelector("#tfoot");
const table = document.querySelector("#table");
const calcGp = document.querySelector("#calc-gp");
const clear = document.querySelector("#clear");

//UI CONSTRUCTOR
function UI(){}

//STORING VALUES IN AN ARRAY
let gpArry = [];

    //Instantiating UI
    const ui = new UI();

    //Show Alert Error Prototype
UI.prototype.showAlert = function(message, className){
  //Create a div
  const div = document.createElement('div') ;
  //Add Classes
  div.className = `alert ${className}`;
  //Add Text 
  div.appendChild(document.createTextNode(message));
  //Get Parents
  const container = document.querySelector('.container');

  //Get Form
  const form = document.querySelector('.wrapper');
   //Insert Alert
  container.insertBefore(div, form)

  //Timeout after 3sec
  setTimeout(function(){
      document.querySelector('.alert').remove();
  }, 2500);
}


//EVENTLISTENER FOR add
add.addEventListener("click", () => {
  if (
    courseCode.value === "" ||
    unitLoad.value <= 0 ||
    grade.selectedIndex === 0
  ) {

    //ALERT FOR EMPTY FIELD
    // alert("Wrong input,check and try again");

     //Error Alert
     ui.showAlert('Please fill in all fields..', 'error');


    
    
  } else {
    const tr = document.createElement("tr");
    const tdFullName = document.createElement("td");
    tdFullName.innerHTML = fullName.value;
    const tdMatriculationNumber = document.createElement("td");
    tdMatriculationNumber.innerHTML = matNumber.value;
    const tdCourseCode = document.createElement("td");
    tdCourseCode.innerHTML = courseCode.value;
    const tdUnitLoad = document.createElement("td");
    tdUnitLoad.innerHTML = unitLoad.value;
    const tdGrade = document.createElement("td");
    tdGrade.innerHTML = grade.options[grade.selectedIndex].text;

    //APPEND COLUMS TO TABLE ROW
    tr.appendChild(tdFullName);
    tr.appendChild(tdMatriculationNumber)
    tr.appendChild(tdCourseCode);
    tr.appendChild(tdUnitLoad);
    tr.appendChild(tdGrade);

    //APPEND TABLE ROW TO TABLE BODY
    tbody.appendChild(tr);
    table.classList.remove("display-none");
    calcGp.classList.remove("display-none");
    clear.classList.remove("display-none");

    //PUSHING VALUES TO AN ARRAY
    gpArry.push({
      unitLoad: unitLoad.value,
      grade: grade.options[grade.selectedIndex].value,
    });
    console.log(gpArry);

    //CLEAR FIELD AFTER INSERTING VALUES
    courseCode.value = "";
    unitLoad.value = "";
    grade.selectedIndex = "0";

      //Show Success
      ui.showAlert('Student information added successfully...', 'success');
  }
});

//EVENTLISTENER FOR calcGP
calcGp.addEventListener("click", () => {
  let unitLoads = 0,
    productOfUnitLoadsAndGrades = 0,
    sumOfProductOfUnitLoadsAndGrades = 0;

  gpArry.forEach((result) => {
    unitLoads += parseInt(result.unitLoad);
    productOfUnitLoadsAndGrades =
      parseInt(result.unitLoad) * parseInt(result.grade);
    sumOfProductOfUnitLoadsAndGrades += productOfUnitLoadsAndGrades;
  });
  const tr = document.createElement("tr");

  tdTotalUnitLoad = document.createElement("td");
  tdTotalUnitLoad.innerHTML = `Your total unit load is ${unitLoads}`;

  tdGpa = document.createElement("td");
  tdGpa.setAttribute("colspan", "2");
  tdGpa.innerHTML = `Your GPA is ${(
    sumOfProductOfUnitLoadsAndGrades / unitLoads
  ).toFixed(2)} `;

  tr.appendChild(tdTotalUnitLoad);
  tr.appendChild(tdGpa);
    if (tfoot.querySelector("tr") !== null) {
        tfoot.querySelector("tr").remove();
    }
  tfoot.appendChild(tr);
});

clear.addEventListener("click", () => {
  gpArry = [];
  tbody.querySelectorAll("*").forEach((child) => child.remove());
  if (tfoot.querySelector("tr") !== null) {
    tfoot.querySelector("tr").remove();
  }

  table.classList.add("display-none");
  calcGp.classList.add("display-none");
  clear.classList.add("display-none");
});
