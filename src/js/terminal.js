const terminalLine = "https://d4ve-p.github.io/my-website> $nyan ";
var divElement = document.getElementById("user-input");
var lineCount = 0;

function disableTextbox(id) {
    var toReplace = document.getElementById(id);
    var pReplacement = document.createElement("p");

    pReplacement.innerHTML = document.getElementById(id).value;
    pReplacement.className = "terminal-line";
    divElement.replaceChild(pReplacement, toReplace);

    return createMessage();
};

function newLine(prevId) {
    var message = document.createElement("p");
    message.innerHTML = disableTextbox(prevId);
    message.className = "reply-message";

    var newLine = document.createElement("input");
    var newLineLabel = document.createElement("label");

    var newId = "terminal" + lineCount

    newLine.type = "text"
    newLine.name = newId;
    newLine.id = newId;
    newLine.className = "terminal-input";
    newLine.maxLength = "10";
    newLine.autofocus = true;

    newLineLabel.htmlFor = newId;
    newLineLabel.innerHTML = terminalLine;

    divElement.appendChild(message);
    divElement.appendChild(newLineLabel);
    divElement.appendChild(newLine);
    addListener(newId);
};

function createMessage() {
    return "Commands are not available yet!"
}

function addListener(id) {
    var element = document.getElementById(id);
    element.addEventListener("keyup", (e) => {
        if(e.key == "Enter") {
            newLine(id);
        }
    })
}
