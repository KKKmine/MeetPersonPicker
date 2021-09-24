chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        chrome.scripting.insertCSS({
            target: {tabId: tabId},
            files: ["style.css"]
        });
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: initEvent,
        });
    }
})

function initEvent() {
    const PEOPLE_LIST_ID = "tt-c8";
    const PEOPLE_SUBLIST_CLASS = "GvcuGe";
    const PERSON_NAME_CLASS = "ZjFb7c";
    const BUTTON_TOOLTIP_CLASS = "EY8ABd-OWXEXe-TAWMXe";
    const SHARE_SCREEN_CLASS = "iJq2Ce";
    
    //console.log("Meet Picker: Listen Meet");
    const listen = setInterval(() => {
        if (document.getElementById(PEOPLE_LIST_ID) != null) {
            init();
            clearInterval(listen);
        }
    }, 2000);

    function init() {
        // Load List
        document.getElementById(PEOPLE_LIST_ID).parentNode.getElementsByTagName("button")[0].click();
    
        // Create Button
        const cloneBtn = document.getElementsByClassName(SHARE_SCREEN_CLASS)[0];
        const handBtn = cloneBtn.cloneNode(true);
        handBtn.id = "hand";
        handBtn.getElementsByClassName("google-material-icons")[0].innerHTML = "emoji_people";
        handBtn.getElementsByClassName(BUTTON_TOOLTIP_CLASS)[0].innerHTML = "Pick a hand raised person"
        handBtn.getElementsByClassName(BUTTON_TOOLTIP_CLASS)[0].id = "tt-28";
        handBtn.getElementsByClassName(BUTTON_TOOLTIP_CLASS)[0].previousSibling.setAttribute("data-tooltip-id", "tt-28");
        handBtn.addEventListener("mousedown", pick);
        cloneBtn.parentNode.insertBefore(handBtn, cloneBtn);

        const personBtn = cloneBtn.cloneNode(true);
        personBtn.id = "all";
        personBtn.getElementsByClassName("google-material-icons")[0].innerHTML = "man";
        personBtn.getElementsByClassName(BUTTON_TOOLTIP_CLASS)[0].innerHTML = "Pick a person"
        personBtn.getElementsByClassName(BUTTON_TOOLTIP_CLASS)[0].id = "tt-29";
        personBtn.getElementsByClassName(BUTTON_TOOLTIP_CLASS)[0].previousSibling.setAttribute("data-tooltip-id", "tt-29");
        personBtn.addEventListener("mousedown", pick);
        cloneBtn.parentNode.insertBefore(personBtn, cloneBtn);

        // Close List
        document.getElementById(PEOPLE_LIST_ID).parentNode.getElementsByTagName("button")[0].click();
    }

    function pick(e) {
        const list = document.getElementsByClassName(PEOPLE_SUBLIST_CLASS);
        
        let result = document.getElementById("pick");
        if (result != null) result.remove();

        result = document.createElement("div");
        result.id = "pick";
        result.classList.add("popup");
        result.addEventListener("click", result.remove);
        document.body.appendChild(result);
        
        if (list.length == 1 && e.currentTarget.id == "hand") {
            result.innerHTML = "No one is raised his hand";
        } else {
            const listId = e.currentTarget.id == "all" && list.length > 1 ? 1 : 0;
            const names = list[listId].getElementsByClassName(PERSON_NAME_CLASS);
            const rand = Math.floor(Math.random() * names.length);
        
            //console.log("Pick: " + names[rand].innerHTML);
            result.innerHTML = "Pick: " + names[rand].innerHTML;
        }
        result.style.left = (e.currentTarget.offsetLeft - result.offsetWidth / 2 + 20) + "px";
    }
}