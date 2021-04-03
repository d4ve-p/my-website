const elementId = {
    "instagram" : "https://www.instagram.com/d4ve_p/", 
    "twitter" : "https://twitter.com/tdaepv", 
    "myanimelist" : "https://myanimelist.net/profile/dave_p", 
    "back" : "../index.html"
};

for (key in elementId) {
    addListener(key);
};

function addListener(id) {
    var element = document.getElementById(id);
    element.addEventListener("click", redirectUrl(elementId[id]));
};

function redirectUrl(url){
    function _redirectUrl(){
        window.location.href = url;
    }
    return _redirectUrl
};
