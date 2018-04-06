let keybindings = {};

function registerKeybinding(input, action) {
    keybindings[input] = action;
}

function removeKeybinding(input) {
    if (input in keybindings) {
        delete keybindings[input];
    }
}

function replaceKeybinding(inputA, inputB) {
    if (inputA in keybindings && inputB in keybindings) {
        let input = keybindings[inputA];
        keybindings[inputA] = keybindings[inputB];
        keybindings[inputB] = input;
    }
}