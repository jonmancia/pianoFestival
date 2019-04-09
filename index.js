/**
 * 
 * Handle student performance type selection to display
 * new form
 */
function getStudentPerformanceType() {
    let performanceType = document.getElementById("performance-type").value;
    return performanceType;
}

function getSingleStudentForm() {
    let singleStudentForm = document.getElementById("singleStudentForm");
    return singleStudentForm;
}

function getDuetStudentForm() {
    let duetStudentForm = document.getElementById("duetStudentForm");
    return duetStudentForm;
}

function handlePerformanceType(element) {
    let performanceType = getStudentPerformanceType();
    if (performanceType == "Duet") {
        hideSingleStudentForm();
        clearSingleFormValues();
        showDuetStudentForm();
    } else {
        hideDuetStudentForm();
        showSingleStudentForm();
    }
}

function hideSingleStudentForm() {
    let singleStudentForm = getSingleStudentForm();
    if (singleStudentForm.classList.contains("show")) {
        singleStudentForm.classList.replace("show", "hide");
    }
}

function showSingleStudentForm() {
    let singleStudentForm = getSingleStudentForm();
    if (singleStudentForm.classList.contains("hide")) {
        singleStudentForm.classList.replace("hide", "show");
    }
}

function showDuetStudentForm() {
    let duetStudentForm = getDuetStudentForm();
    if (duetStudentForm.classList.contains("hide")) {
        duetStudentForm.classList.replace("hide", "show");
    }
}

function hideDuetStudentForm() {
    let duetStudentForm = getDuetStudentForm();
    if (duetStudentForm.classList.contains("show")) {
        duetStudentForm.classList.replace("show", "hide");
    }
}

function getForm() {
    let form = document.getElementById("main-form");
    return form;
}

function getDuetElements() {
    let elements = [];
    elements.push(document.getElementById("duet1-first-name"));
    elements.push(document.getElementById("duet1-last-name"));
    elements.push(document.getElementById("duet1-student-id"));
    elements.push(document.getElementById("duet2-first-name"));
    elements.push(document.getElementById("duet2-last-name"));
    elements.push(document.getElementById("duet2-student-id"));
    elements.push(document.getElementById("room"));
    elements.push(document.getElementById("skill-level"));
    elements.push(document.getElementById("instrument"));
    elements.push(document.getElementById("location"));
    elements.push(document.getElementById("room"));
    return elements;
}

function getSingleElements() {
    let elements = [];
    elements.push(document.getElementById("first-name"));
    elements.push(document.getElementById("last-name"));
    elements.push(document.getElementById("student-id"));
    elements.push(document.getElementById("skill-level"));
    elements.push(document.getElementById("instrument"));
    elements.push(document.getElementById("location"));
    elements.push(document.getElementById("room"));
    return elements;
}

function clearDuetFormValues() {
    document.getElementById("duet1-first-name").value = "";
    document.getElementById("duet1-last-name").value = "";
    document.getElementById("duet1-student-id").value = "";
    document.getElementById("duet2-first-name").value = "";
    document.getElementById("duet2-last-name").value = "";
    document.getElementById("duet2-student-id").value = "";
    document.getElementById("room").value = "";
    document.getElementById("skill-level").value = "";
    document.getElementById("instrument").value = "";
    document.getElementById("location").value = "";
    document.getElementById("room").value = "";
}

function clearSingleFormValues() {
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("student-id").value = "";
    document.getElementById("skill-level").value = "";
    document.getElementById("instrument").value = "";
    document.getElementById("location").value = "";
    document.getElementById("room").value = "";
}
/**
 * Handle the onload request to pull registered students
 */
function getFileContents() {
    let targetElement = document.getElementById("registered-students");
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
            let table = "<table class=\"table\"><tr><th>Name</th><th>Student Id</th><th>Skill Level</th><th>Instrument</th><th>Location</th><th>Room</th><th>Time</th><tr>";
            targetElement.innerHTML = table + this.responseText + "</table>";
        } else {
            let errorFlag = "<h5> There was an error pulling registered students.</h5>"
            targetElement.innerText = errorFlag;
        }
    }
    request.open("GET", "registered.txt", true);
    request.send();
}

function sendFormContentsAndGetContents() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
            clearDuetFormValues();
            clearSingleFormValues();
            getFileContents();
        }
    }
    if (getStudentPerformanceType() == "Duet") {
        request.open("POST", "assign13.php?" + getDuetQueryString(), true);
        request.send();
    } else {
        request.open("POST", "assign13.php?" + getSingleQueryString(), true);
        request.send();
    }
}

function getDuetQueryString() {
    let duet1FirstName = document.getElementById("duet1-first-name").value;
    let duet1LastName = document.getElementById("duet1-last-name").value;
    let duet1StudentId = document.getElementById("duet1-student-id").value;
    let duet2FirstName = document.getElementById("duet2-first-name").value;
    let duet2LastName = document.getElementById("duet2-last-name").value;
    let duet2StudentId = document.getElementById("duet2-student-id").value;
    let skillLevel = document.getElementById("skill-level").value;
    let instrument = document.getElementById("instrument").value;
    let location = document.getElementById("location").value;
    let room = document.getElementById("room").value;
    let time = document.getElementById("time-slot").value;
    return "duet1-first-name=" + duet1FirstName + "&duet1-last-name=" + duet1LastName + "&duet1-student-id=" + duet1StudentId + "&duet2-first-name=" + duet2FirstName + "&duet2-last-name=" + duet2LastName + "&duet2-student-id=" + duet2StudentId + "&skill-level=" + skillLevel + "&instrument=" + instrument + "&location=" + location + "&room=" + room + "&time-slot=" + time;
}

function getSingleQueryString() {
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let studentId = document.getElementById("student-id").value;
    let skillLevel = document.getElementById("skill-level").value;
    let instrument = document.getElementById("instrument").value;
    let location = document.getElementById("location").value;
    let room = document.getElementById("room").value;
    let time = document.getElementById("time-slot").value;
    return "first-name=" + firstName + "&last-name=" + lastName + "&student-id=" + studentId + "&skill-level=" + skillLevel + "&instrument=" + instrument + "&location=" + location + "&room=" + room + "&time-slot=" + time;
}

function validateForm() {
    /** *******************************************
     * We'll get all elements and values from form 
     * ********************************************/
    const inputElementsArray = getInputElements();
    const inputValuesArray = getInputValues();
    // Loop to check if there are any undefined inputs
    let numInvalidInputs = 0;
    let i = 0;
    while (i < inputValuesArray.length) {
        // Add red border to invalid inputs 
        if (inputValuesArray[i] == '') {
            inputElementsArray[i].classList.add("invalid");
            numInvalidInputs++;
        } else {
            inputElementsArray[i].classList.remove("invalid");
        }
        i++;
    } // If everything is validated, execute request
    if (numInvalidInputs == 0) {
        sendFormContentsAndGetContents();
    }
}

function getInputElements() {
    let elements = [];
    if (getStudentPerformanceType() == 'Duet') {
        elements = getDuetElements();
    } else {
        elements = getSingleElements();
    }
    return elements;
}

function getInputValues() {
    let elements = [];
    if (getStudentPerformanceType() == 'Duet') {
        elements = getDuetElementValues();
    } else {
        elements = getSingleElementValues();
    }
    return elements;
}

function getDuetElementValues() {
    let elements = [];
    for (let i = 0; i < getDuetElements().length; i++) {
        elements.push(getDuetElements()[i].value);
    }
    return elements;
}

function getSingleElementValues() {
    let elements = [];
    for (let i = 0; i < getSingleElements().length; i++) {
        elements.push(getSingleElements()[i].value);
    }
    return elements;
}

function removeBorder(node) {
    // If the value of the node is not equal to nothing remove class
    if (node.value != '') {
        node.classList.remove("invalid");
    } else {
        node.classList.add("invalid");
    }
}