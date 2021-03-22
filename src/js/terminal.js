const terminalLine = "https://d4ve-p.github.io/my-website $nyan >";
createUserInput();

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
    input.maxLength = 20;

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
        respText = document.createElement('p');
        respText.innerHTML = resp;
        respText.className = "response"
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
    var response = {
        "about me" : redirect('https://d4ve-p.github.io/my-website/content/aboutme.html'),
        "social media": redirect('https://d4ve-p.github.io/my-website/content/socialmedia.html'),
        "help" : createMessage("Lists of available commands:<br>-Help<br>-About me<br>-Social Media"),
    }
    if ((resp in response) === false){
        return createMessage("Command not found");
    }
    return response[resp];
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