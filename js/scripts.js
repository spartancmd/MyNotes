const start_page = `
    <img src="icon.png" height="200px" >
            <h1>MyNotes</h1>
            <div>A programm that allows you to write and save notes in your web browser!</div>
`;

const toolbar = `        
            <div class="toolbar">
            <button class="toolbar_content" onclick="saveNote()"><img src="editor_icons/save.png"></button>
            <button class="toolbar_content" onclick="deleteNote()"><img src="editor_icons/delete.png"></button>
            <label for="input_note_name">Enter the note name:</label>
            <input class="toolbar_content" id="input_note_name" type="text" placeholder="F.e. Bucket list">
            <hr>
            <button class="toolbar_content" onclick="formatText('bold')" ><b>B</b></button> 
            <button class="toolbar_content" onclick="formatText('italic')"><i>I</i></button>
            <button class="toolbar_content" onclick="formatText('underline')"><u>U</u></button>
            <button class="toolbar_content" onclick="formatText('insertOrderedList')"><img src="editor_icons/ol.png" ></button>
            <button class="toolbar_content" onclick="formatText('insertUnorderedList')"><img src="editor_icons/ul.png"></button>
            <button class="toolbar_content" onclick="formatText('insertHTML')">&lt;/&gt;</button>
                       
            <select onchange="formatText(this.value)">
                <option value="justifyLeft"><img src"editor_icons/align_left">Align-left</option>
                <option value="justifyCenter">Align-center</option>
                <option value="justifyRight">Align-right</option>
            </select>
        </div>
`;

let curKey = null; // needed to orient which note is currently opened

function renderPage() {
    generateButtons();

    curKey = 0;
}

function openNote(key) {
    curKey = key
    let note = JSON.parse(localStorage.getItem(curKey)); // getting the note by the key
    let mainSection = document.getElementById("main_section");
    
    mainSection.innerHTML = toolbar + `
        <div class="editor" contenteditable="true" placeholder="Type your notes here!">${note.content}</div>
    `;
}



function deleteNote() {
    localStorage.removeItem(curKey);
    renderPage();

    let mainSection = document.getElementById("main_section");
    mainSection.innerHTML = start_page;
}



function saveNote() {
    let note = JSON.parse(localStorage.getItem(curKey)); // getting the note by the key
    let textField = document.getElementsByClassName("editor");
    let noteNameField = document.getElementById("input_note_name");

    if (noteNameField.value) {
        note.noteName = noteNameField.value;
    }

    note.content = textField[0].innerHTML;
    localStorage.setItem(curKey, JSON.stringify(note));

    generateButtons(); // not renderPage() because it the curKey gets set 0 
    openNote(curKey);
}

function generateButtons() {
    let scrollMenu = document.getElementById("scroll_menu");
    scrollMenu.innerHTML = "";

    let i = localStorage.length - 1;
    while (i >= 0) {
        curKey = localStorage.key(i);  
        if (curKey) {   // if the key exists
            let note = JSON.parse(localStorage.getItem(curKey)); // make the key content to an object
            let newButton = document.createElement("button");   // creating the button element (in the code at the moment)
            newButton.textContent = note.noteName;  // getting the noteName 
            newButton.value = curKey;   // setting the current key as the button's value
            newButton.setAttribute("onclick", "openNote(this.value)")

            scrollMenu.prepend(newButton); // putting the button in the scroll menu
        }

        i--;
    }
}



function createNote() {
    let mainSection = document.getElementById("main_section");
    let scrollMenu = document.getElementById("scroll_menu");
    
    console.log("Created mainSection and scrollMenu obj");
    mainSection.innerHTML = toolbar + `
        <div class="editor" contenteditable="true" placeholder="Type your notes here!"></div>
        `;

    console.log("Created text field and toolbar");

    let newButtonName = generateUniqueButtonName(scrollMenu, "MyNote");
    let key = generateUniqueKey("Note");
    curKey = key;

    let note = {
        noteName: newButtonName,
        content: ""
    };

    localStorage.setItem(key, JSON.stringify(note)); 

    let newButton = document.createElement("button");
    newButton.textContent = newButtonName;
    newButton.value = key;
    newButton.setAttribute("onclick", "openNote(this.value)")

    scrollMenu.prepend(newButton);
    
    console.log("created the button");
}


function generateUniqueKey(baseName) { 
    let key; 
    let counter = 0; 

    do { 
        key = `${baseName}_${counter}`; 
        counter++; 
    } while (localStorage.getItem(key) !== null); 
    
    return key;
}

function generateUniqueButtonName(container, baseName) {
        let i = 1;
        let buttonNames = Array.from(container.querySelectorAll("button")).map(button => button.textContent);
    
        while (buttonNames.includes(`${baseName}${i}`)) {
            i++;
        }
    
        return `${baseName}${i}`;
}