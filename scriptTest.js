var outList = [];
var count = 0;
var found = false;
var logList = [];

document.getElementById("button1").addEventListener("click", handleButtonClick);
document.getElementById("button3").addEventListener("click", handleButtonClick);

function handleButtonClick() {
    var id = document.getElementById("text_input1").value;
    var timeStamp = new Date().toUTCString();
    
    if (id !== "") {
        // Retrieve data from sessionStorage
        const fileData = JSON.parse(sessionStorage.getItem('fileData'));

        if (!fileData) {
            document.getElementById("text_area2").value = 'No data available. Please upload a file.';
            return;
        }

        // Find the matching name
        const match = fileData.find(entry => entry.number === id);

        if (match) {
            if (count === 0) {
                outList.push(id);
                logList.push(`${match.name} Left to Restroom ${timeStamp}`);
                document.getElementById("text_area2").value = `${match.name} Left to Restroom\n${timeStamp}`;
                count++;
            } else {
                for (var i = 0; i < outList.length; i++) {
                    if (id === outList[i]) {
                        document.getElementById("text_area2").value = `${match.name} Returned from Restroom\n${timeStamp}`;
                        logList.push(`${match.name} Returned from Restroom ${timeStamp}`);
                        outList.splice(i, 1);
                        found = true;
                        count--;
                    }
                }
                if (!found) {
                    outList.push(id);
                    logList.push(`${match.name} Left to Restroom ${timeStamp}`);
                    document.getElementById("text_area2").value = `${match.name} Left to Restroom\n${timeStamp}`;
                    count++;
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

document.getElementById("button2").addEventListener("click", function() {
    downloadLog();
});
