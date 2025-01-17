function makeCode() {
    const selection = window.getSelection(); 
    if (selection.rangeCount > 0) { 
        const range = selection.getRangeAt(0); 
        const parentNode = range.commonAncestorContainer.parentNode; 
        if (parentNode.nodeName === 'CODE') {  // if there is code already -> remove it
            // Remove the <code> element 
            const textNode = document.createTextNode(parentNode.textContent); 
            parentNode.parentNode.replaceChild(textNode, parentNode); 
        } 
        else { // else if there is no code
            // Wrap the selected text in a <code> element 
            const codeNode = document.createElement('code'); 
            codeNode.textContent = range.toString(); 
            range.deleteContents(); 
            range.insertNode(codeNode);
        }
    }
}

function formatText(command) {
    if (command == 'insertHTML') {
        makeCode();
    }
    else {
        document.execCommand(command, false, null);
    }
}
