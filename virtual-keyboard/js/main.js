import {objOfKeys} from './objOfKeys.js';
import {arrOfKeys} from './arrOfKeys.js';

const BODY = document.querySelector('body');

const WRAPPER = document.createElement('div');
WRAPPER.classList.add('wrapper');

const H1 = document.createElement('h1');
H1.classList.add('main-title');
H1.innerText = 'Virtual Keyboard';

const TEXTAREA = document.createElement('textarea');
TEXTAREA.classList.add('textarea');
TEXTAREA.setAttribute('autofocus', true);

const KEYBOARD = document.createElement('div');
KEYBOARD.classList.add('keyboard');

BODY.append(WRAPPER);
WRAPPER.append(H1);
WRAPPER.append(TEXTAREA);
WRAPPER.append(KEYBOARD);

pendKeyboard('en', 'low');

function pendKeyboard(language, caseType){
    let type = 'en';
    if(language == 'en' && caseType == 'low') type = 'en';
    if(language == 'en' && caseType == 'high') type = 'shift';
    if(language == 'rus' && caseType == 'low') type = 'rus';
    if(language == 'rus' && caseType == 'high') type = 'rusShift';

    for(let i=0; i<5; i++) {
        let keyboardRow = document.createElement('div');
        keyboardRow.classList.add('keyboard-row');
        keyboardRow.id = `row-${i+1}`;
        KEYBOARD.append(keyboardRow);
    
        for(let k=0; k<objOfKeys[i].length; k++) {
            let key = document.createElement('div');
            key.classList.add('keyboard-key');
            key.classList.add(`${objOfKeys[i][k].name}`)
            type == 'en' ? key.innerText = `${objOfKeys[i][k].en}` :
            type == 'rus'? key.innerText = `${objOfKeys[i][k].rus}` :
            type == 'shift'? key.innerText = `${objOfKeys[i][k].shift}` :
            type == 'rusShift' ? key.innerText = `${objOfKeys[i][k].rusShift}` : 
            key.innerText = `${objOfKeys[i][k].en}`;
            ;
            keyboardRow.append(key);
        }
    }
}


let keyboard_keys = document.querySelectorAll('.keyboard-key');
let capsLockOn = 0;


window.addEventListener('keydown', function(e) {
    for(let i=0; i<keyboard_keys.length; i++) {
        if(keyboard_keys[i].classList.contains(e.code) && e.code !== 'CapsLock') {
            keyboard_keys[i].classList.add('active');
        }
        else if (keyboard_keys[i].classList.contains(e.code) && e.code == 'CapsLock') {
            keyboard_keys[i].classList.toggle('active');
            capsLockOn == 0 ? capsLockOn = 1 : capsLockOn = 0;
            toCaps(capsLockOn);
        }
    }
});

window.addEventListener('keyup', function(e) {
    for(let i=0; i<keyboard_keys.length; i++) {
        if(keyboard_keys[i].classList.contains(e.code) && e.code !== 'CapsLock') {
            keyboard_keys[i].classList.remove('active');
            keyboard_keys[i].classList.add('remove');
        }
    }
});

function toCaps(capsLockOn) {
    if(capsLockOn == 1) {
        let keys = document.querySelectorAll(keys);
        for(let i=0; i<keys.length; i++) {
            keys[i].innerText = arrOfKeys
        } 
    }
}


