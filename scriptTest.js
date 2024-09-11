var outList = [];
var count = 0;
var found = false;
var logList = [];

document.getElementById("button1").addEventListener("click", handleButtonClick);
document.getElementById("button2").addEventListener("click", handleButtonClick);
document.getElementById("button3").addEventListener("click", handleButtonClick);

function handleButtonClick(event) {
    var id = document.getElementById("text_input1").value;
    var timeStamp = new Date().toUTCString();
    let dataList = [];
    let match = null;
    let firstFourNumbers = [];
    
    if (id !== "") {
        // Retrieve data from sessionStorage
        const fileData = JSON.parse(sessionStorage.getItem('fileData'));


        if (fileData){
	    ({ firstFourNumbers, dataList } = fileData);
		
	    match = dataList.find(entry => entry.number === id);


	}

        else {
           document.getElementById("text_area2").value = 'No data available. Please upload a file.';
           return;
        }

        if (match) {
            if (count === 0) {
                outList.push(id);
	    	if (event.target.id === "button1"){
                	logList.push(`${match.name} Left to Restroom ${timeStamp}`);
			submitToForm(match,id,"Restroom","Leaving", firstFourNumbers);
                	document.getElementById("text_area2").value = `${match.name} Left to Restroom\n${timeStamp}`;
                	count++;}
		if (event.target.id === "button2"){
                	logList.push(`${match.name} Left to Office ${timeStamp}`);
			submitToForm(match,id,"Office","Leaving", firstFourNumbers);
                	document.getElementById("text_area2").value = `${match.name} Left to Office\n${timeStamp}`;
                	count++;}
		if (event.target.id === "button3"){
                	logList.push(`${match.name} Left to Nurse ${timeStamp}`);
			submitToForm(match,id,"Nurse","Leaving", firstFourNumbers);
                	document.getElementById("text_area2").value = `${match.name} Left to Nurse\n${timeStamp}`;
                	count++;}
            } else {
                for (var i = 0; i < outList.length; i++) {
                    if (id === outList[i]) {
			if (event.target.id === "button1"){
                        	document.getElementById("text_area2").value = `${match.name} Returned from Restroom\n${timeStamp}`;
				submitToForm(match,id,"Restroom","Returned", firstFourNumbers);
                        	logList.push(`${match.name} Returned from Restroom ${timeStamp}`);
                        	outList.splice(i, 1);
                        	found = true;
                        	count--;}
			if (event.target.id === "button2"){
                        	document.getElementById("text_area2").value = `${match.name} Returned from Office\n${timeStamp}`;
				submitToForm(match,id,"Office","Returned", firstFourNumbers);
                        	logList.push(`${match.name} Returned from Office ${timeStamp}`);
                        	outList.splice(i, 1);
                        	found = true;
                        	count--;}
			if (event.target.id === "button3"){
                        	document.getElementById("text_area2").value = `${match.name} Returned from Nurse\n${timeStamp}`;
				submitToForm(match,id,"Nurse","Returned", firstFourNumbers);
                        	logList.push(`${match.name} Returned from Nurse ${timeStamp}`);
                        	outList.splice(i, 1);
                        	found = true;
                        	count--;}
                    }
                }
                if (!found) {
		    if (event.target.id === "button1"){
                    	outList.push(id);
                    	logList.push(`${match.name} Left to Restroom ${timeStamp}`);
			submitToForm(match,id,"Restroom","Leaving", firstFourNumbers);
                    	document.getElementById("text_area2").value = `${match.name} Left to Restroom\n${timeStamp}`;
                    	count++;}
		    if (event.target.id === "button2"){
                    	outList.push(id);
                    	logList.push(`${match.name} Left to Office ${timeStamp}`);
			submitToForm(match,id,"Office","Leaving", firstFourNumbers);
                    	document.getElementById("text_area2").value = `${match.name} Left to Office\n${timeStamp}`;
                    	count++;}
		    if (event.target.id === "button2"){
                    	outList.push(id);
                    	logList.push(`${match.name} Left to Nurse ${timeStamp}`);
			submitToForm(match,id,"Nurse","Leaving", firstFourNumbers);
                    	document.getElementById("text_area2").value = `${match.name} Left to Nurse\n${timeStamp}`;
                    	count++;}
                }
                found = false;
            }
        } else {
            document.getElementById("text_area2").value = "No matching number found.";
        }
    } else {
        document.getElementById("text_area2").value = "Please input ID to continue.";
    }
    document.getElementById("text_input1").value = "";
}

document.addEventListener('DOMContentLoaded', (event) => {
    const inputBox = document.getElementById('text_input1');
    inputBox.focus(); // Focus the input box when the page loads

    // Event listeners to manage focus behavior
    inputBox.addEventListener('blur', () => {
        setTimeout(() => {
            inputBox.focus(); // Re-focus on the input box if it loses focus
        }, 0);
    });
});

function downloadLog() {
    var logString = logList.join('\n');
    var blob = new Blob([logString], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download = 'Log.txt';
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
}

document.getElementById("button4").addEventListener("click", function() {
    downloadLog();
});
function submitToForm(value, id, location, status,num){
    const googleFormURL = num[4];
    const formData = new FormData();

    formData.append(`entry.${num[0]}`, value.name);
    formData.append(`entry.${num[1]}`, id);
    formData.append(`entry.${num[2]}`, location);
    formData.append(`entry.${num[3]}`, status);

    fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors', // prevents CORS blocking
        body: formData
    })
    .then(response => {
        console.log('Form submitted successfully!');
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
}