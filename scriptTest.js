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
    
    if (id !== "") {
        // Retrieve data from sessionStorage
        const fileData = JSON.parse(sessionStorage.getItem('fileData'));


        if (fileData){
	    const { dataList } = fileData;
	}
        else {
            document.getElementById("text_area2").value = 'No data available. Please upload a file.';
            return;
        }

	document.getElementById("text_area2").value = "test";

        // Find the matching name
        const match = dataList.find(entry => entry.number === id);

        if (match) {
            if (count === 0) {
                outList.push(id);
	    	if (event.target.id === "button1"){
                	logList.push(`${match.name} Left to Restroom ${timeStamp}`);
			submitToForm(match,id,"Restroom","Leaving");
                	document.getElementById("text_area2").value = `${match.name} Left to Restroom\n${timeStamp}`;
                	count++;}
		if (event.target.id === "button2"){
                	logList.push(`${match.name} Left to Office ${timeStamp}`);
			submitToForm(match,id,"Office","Leaving");
                	document.getElementById("text_area2").value = `${match.name} Left to Office\n${timeStamp}`;
                	count++;}
		if (event.target.id === "button3"){
                	logList.push(`${match.name} Left to Nurse ${timeStamp}`);
			submitToForm(match,id,"Nurse","Leaving");
                	document.getElementById("text_area2").value = `${match.name} Left to Nurse\n${timeStamp}`;
                	count++;}
            } else {
                for (var i = 0; i < outList.length; i++) {
                    if (id === outList[i]) {
			if (event.target.id === "button1"){
                        	document.getElementById("text_area2").value = `${match.name} Returned from Restroom\n${timeStamp}`;
				submitToForm(match,id,"Restroom","Returned");
                        	logList.push(`${match.name} Returned from Restroom ${timeStamp}`);
                        	outList.splice(i, 1);
                        	found = true;
                        	count--;}
			if (event.target.id === "button2"){
                        	document.getElementById("text_area2").value = `${match.name} Returned from Office\n${timeStamp}`;
				submitToForm(match,id,"Office","Returned");
                        	logList.push(`${match.name} Returned from Office ${timeStamp}`);
                        	outList.splice(i, 1);
                        	found = true;
                        	count--;}
			if (event.target.id === "button3"){
                        	document.getElementById("text_area2").value = `${match.name} Returned from Nurse\n${timeStamp}`;
				submitToForm(match,id,"Nurse","Returned");
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
			submitToForm(match,id,"Restroom","Leaving");
                    	document.getElementById("text_area2").value = `${match.name} Left to Restroom\n${timeStamp}`;
                    	count++;}
		    if (event.target.id === "button2"){
                    	outList.push(id);
                    	logList.push(`${match.name} Left to Office ${timeStamp}`);
			submitToForm(match,id,"Office","Leaving");
                    	document.getElementById("text_area2").value = `${match.name} Left to Office\n${timeStamp}`;
                    	count++;}
		    if (event.target.id === "button2"){
                    	outList.push(id);
                    	logList.push(`${match.name} Left to Nurse ${timeStamp}`);
			submitToForm(match,id,"Nurse","Leaving");
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
function submitToForm(value, id, location, status){
    const googleFormURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdxaLzSWfNDao42Fv0dChmlABKq0BLLPnCMZkRA3TI_Vl9wLg/formResponse";
    const formData = new FormData();

    formData.append('entry.1306696328', value.name);
    formData.append('entry.428718456', id);
    formData.append('entry.2102814176', location);
    formData.append('entry.1839909552', status);

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