// fetch api to show questions
fetch('./JSONs/qs.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendQuestion(data);
    })
    .catch(function(err) {
        console.log('error: ' + err);
    });
// append the fetched information
function appendQuestion(data) {
    var container = document.getElementById("Qs_Body");
    for (var item = 0; item < data.length; item++) {
        var ins = document.createElement("div");
        ins.className += "Question_Container";
        ins.innerHTML = `<div class="Question">
                            ${data[item].Qn_Number}, ${data[item].Question}
                        </div>
                        <div class="Question_Information">
                            <div class="Weight">
                                ${data[item].Weight} Marks
                            </div>
                            <div class="Optimum_Time">
                                ${data[item].Optimum_Time} Min
                            </div>
                        </div>`
        container.appendChild(ins);
    }
}

/*// search filter for python
function SearchPy() {
    // Declare variables
    var input, filter, uls, lis, as, is, txtValue;
    input = document.getElementById('PyLstSearch');
    filter = input.value.toUpperCase();
    uls = document.getElementById("pylst");
    lis = uls.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (is = 0; is < lis.length; is++) {
        as = lis[is].getElementsByTagName("section")[0];
        txtValue = as.textContent || as.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            lis[is].style.display = "";
        } else {
            lis[is].style.display = "none";
        }
    }
}*/

// fetch api to show questions
fetch('./JSONs/globe.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendGlobe(data);
    })
    .catch(function(err) {
        console.log('error: ' + err);
    });
// append the fetched information
function appendGlobe(data) {
    for (var item = 0; item < data.length; item++) {
        document.getElementById("Subject_Name").innerHTML = data[item].Subject_Name;
        document.getElementById("Email_To").href = `mailto:${data[item].Email_To}?subject=${data[item].Email_Subject}`;
        document.getElementById("Target_Score").innerHTML = data[item].Pass_Marks + "/" + data[item].Full_Marks;
        document.getElementById("Count_down").innerHTML = data[item].Time;
        Count_It_Down(data[item].Exam_Start_Date, data[item].Exam_End_Date, data[item].Exam_End_Time, data[item].Exam_Start_Time);

    }
}

function Before_Time(Exam_Start_Date, Start_Time) {
    var StartTime = new Date(`${Exam_Start_Date} ${Start_Time}`).getTime();
    var now = new Date().getTime();
    var distance = StartTime - now;
    if (distance > 0) {
        document.getElementById("Overlay").style.display = "flex";
        document.getElementById("Overlay").innerHTML = `Exam will start in ${Start_Time}<br> Please Refresh if question is not visible in given time.`;
    } else {
        document.getElementById("Overlay").style.display = "none";
    }
}

function Count_It_Down(Exam_Start_Date, Exam_End_Date, Exam_End_Time, Exam_Start_Time) {
    // copied from w3schools
    // Set the date we're counting down to
    var countDownDate = new Date(`${Exam_End_Date} ${Exam_End_Time}`).getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
        Before_Time(Exam_Start_Date, Exam_Start_Time);
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("Count_down").innerHTML = `${hours}:${minutes}:${seconds}`;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("Email_To").innerHTML = "Get Lost";
            document.getElementById("Email_To").href = "";
            document.getElementById("Count_down").innerHTML = "Time Up!";
            document.getElementById("Overlay").style.display = "flex";
            document.getElementById("Overlay").innerHTML = `Exam is Over since ${Exam_End_Time}<br> If you havn't submitted your answer, Consult to your examiner.`;
        }
    }, 1000);

}