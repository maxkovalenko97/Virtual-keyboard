const BODY = document.querySelector('body');

const WRAPPER = document.createElement('div');
WRAPPER.classList.add('wrapper');

const H1 = document.createElement('h1');
H1.classList.add('main-title');
H1.innerText = 'Virtual Keyboard';

const TEXTAREA = document.createElement('textarea');
TEXTAREA.classList.add('textarea');

const KEYBOARD = document.createElement('div');
KEYBOARD.classList.add('keyboard');

const BUTTONS = [['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
                 ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del'],
                 ['CapsLock', 'a','s','d', 'f','g','h','j','k','l',';','\''],
                 ['Shift','z','x','c','v','b','n','m', ',','.','/','ARROW_UP','Shift'],
                 ['Ctrt','Win','Alt','Space', 'Alt','ARROW_LEFT','ARROW_DOWN','ARROW_RIGHT', 'Ctrl']
                ];

BODY.append(WRAPPER);
WRAPPER.append(H1);
WRAPPER.append(TEXTAREA);
WRAPPER.append(KEYBOARD);

for(let i=0; i<5; i++) {
    let keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard-row');
    keyboardRow.id = `row-${i+1}`;
    KEYBOARD.append(keyboardRow);

    for(let k=0; k<BUTTONS[i].length; k++) {
        let key = document.createElement('div');
        key.classList.add('keyboard-key');
        key.innerText = `${BUTTONS[i][k]}`;
        keyboardRow.append(key);
    }
}


