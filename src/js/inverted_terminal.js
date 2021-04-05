const terminalLine = ">";
const responses = {
    "bring me to a land that never exists" : createMessage("But Nothing happened"), 
    "take me to a place deep down below" : createMessage("?"), 
    "where your power is no longer relevant" : transition
};
var streak = 0;

function createUserInput() {
    // Create elements
    var div = document.createElement('div');
    var p = document.createElement('p');
    var input = document.createElement('input');

    // p setup
    p.innerHTML = terminalLine;

    // input setup
    input.type = "text";
    input.className = "terminal-input";
    input.id = "input-user";
    input.maxLength = "38";
    input.autocomplete = "off";


    // Div setup
    div.id = "input-div"
    div.appendChild(p);
    div.appendChild(input);

    var parentDiv = document.getElementById("parent")
    parentDiv.appendChild(div);
    addOnEnterListener('input-user');
    input.focus();
};

function createLog() {
    if (streak > 2) {
        return;
    }
    // Create Elements
    var div = document.createElement('div');
    var terminalText = document.createElement('p');
    var commandText = document.createElement('p');

    // div setup
    div.className = "log";

    // terminalText Setup
    terminalText.className = "log";
    terminalText.innerHTML = terminalLine;

    // commandText Setup
    var userInput = document.getElementById('input-user');
    commandText.className = "log command-input";
    commandText.innerHTML = userInput.value;

    // Remove child (not the abortion type)
    var parentDiv = document.getElementById('parent');
    var childDiv = document.getElementById('input-div');
    parentDiv.removeChild(childDiv);

    // Response setup
    var resp = handleResponse(userInput.value)();
    var respText = null;
    if(resp){
        respText = document.createElement('div');
        respText.className = "response"
        respText.innerHTML = resp;  
    }
    // Add terminalText and commandText and Response
    // to new div
    div.appendChild(terminalText);
    div.appendChild(commandText);
    if(respText){
        div.appendChild(respText);
    }

    var parentDiv = document.getElementById("parent");
    parentDiv.appendChild(div);

    createUserInput();
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function transition(){
    var elem = document.getElementById('parent');
    elem.parentNode.removeChild(elem);

    var newElement = document.createElement('div');
    newElement.className = 'transition';

    document.body.appendChild(newElement);
    await sleep(2500);
    window.location.href = "../../";
}

function addOnEnterListener(e){
    var element = document.getElementById(e);

    element.addEventListener("keyup", (event) => {
        if(event.key == "Enter"){
            console.log('a');
            createLog();
        }
    }
    );
};

function handleResponse(resp){
    resp = resp.toString().toLowerCase();
    var keys = Object.keys(responses);
    if (resp == keys[streak]){
        var key = keys[streak]
        streak += 1;
        return responses[key];
    } else if (streak == 0){
        return createMessage("You don't belong here, go back");
    } else {
        return createMessage("Wise choice.")
    }
};

function redirect(url){
    function _redirect(){
        window.location.href = url;
    }
    return _redirect
};

function createMessage(message) {
    function _createMessage(){
        return message;
    }
    return _createMessage;
};