const NAME = "Nick";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format. 
const SHORTCUT_STARTER = 'tab' 

// How much time in milliseconds after pressing shortcut starter.
// Also change --SHORTCUT_TIMEOUT in styles.css.
const SHORTCUT_TIMEOUT = 1500;

// Links for page and shortcut key
const MASTER_MAP = [
    {
        "groupName": "Social",
        "items":[
            {"name": "Mail", "shortcutKey": "z", "url": "http://mail.trochalakis.com"},
            {"name": "Facebook", "shortcutKey": "x", "url": "https://www.facebook.com"},
           	{"name": "Reddit", "shortcutKey": "r", "url": "https://www.reddit.com/"}
        ]
    },
    {
        "groupName": "Tools",
        "items":[
            {"name": "Cloud", "shortcutKey": "q", "url": "http://cloud.trochalakis.com"},
            {"name": "Item B", "shortcutKey": "w", "url": "https://google.com/?q=w"},
            {"name": "Item C", "shortcutKey": "e", "url": "https://google.com/?q=e"}
        ]
    },
	{
        "groupName": "Entertainment",
        "items":[
            {"name": "Netflix", "shortcutKey": "q", "url": "https://www.netflix.com/"},
            {"name": "Hulu", "shortcutKey": "w", "url": "https://www.hulu.com/"},
            {"name": "Youtube", "shortcutKey": "e", "url": "https://www.youtube.com/"},
			{"name": "Spotify", "shortcutKey": "e", "url": "https://open.spotify.com/"}
        ]
    },
    {
        "groupName": "Work",
        "items":[
            {"name": "Item D", "shortcutKey": "a", "url": "https://google.com/?q=a"},
            {"name": "Item E", "shortcutKey": "s", "url": "https://google.com/?q=s"},
            {"name": "Item F", "shortcutKey": "d", "url": "https://google.com/?q=d"}
        ]
    },
    {
        "groupName": "Entertainment",
        "items":[
            {"name": "Item D", "shortcutKey": "a", "url": "https://google.com/?q=a"},
            {"name": "Item E", "shortcutKey": "s", "url": "https://google.com/?q=s"},
            {"name": "Item F", "shortcutKey": "d", "url": "https://google.com/?q=d"}
        ]
    },
    {
        "groupName": "Money",
        "items":[
            {"name": "Wells Fargo", "shortcutKey": "z", "url": "https://www.wellsfargo.com/"},
            {"name": "Discover", "shortcutKey": "x", "url": "https://www.discover.com/"},
            {"name": "BECU", "shortcutKey": "c", "url": "https://www.netflix.com"}
        ]
    }
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++){
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl.key;
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main(){
    setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main();