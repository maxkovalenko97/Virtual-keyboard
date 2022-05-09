import {objOfKeys} from './objOfKeys.js';


class Keyboard {
    constructor() {
        this.allKeys = null;
        this.inputKeyboard = null;
        this.properties = {
            capsLock: false,
            shift: false,
            language: 'en',
            flagForLang: false,
            flagForShift: true,
        }
    }
    
    init() {
        this.wrapper = document.createElement('div');
        this.keyboardContainer = document.createElement('div');
        this.title = document.createElement('h1');
        this.description = document.createElement('p');
        this.inputKeyboard = document.createElement('textarea');

        this.wrapper.classList.add('wrapper');
        this.keyboardContainer.classList.add('keyboard');
        this.title.classList.add('main-title');
        this.description.classList.add('description');
        this.inputKeyboard.classList.add('textarea');
        
        this.title.innerText = "Virtual Keyboard";
        this.description.innerText = `Для смены языка можно использывать комбинацию клавиш LeftCtrl + LeftAlt на физической клавиатуре или специальную клавишу смены языка на виртуальной. \n Клавиатура сделана для Windows.`

        //for saving language before reload
        if(localStorage.getItem('keyboard-language') == null) {
            localStorage.setItem('keyboard-language', 'en');
        }
        this.properties.language = localStorage.getItem('keyboard-language');
 
        //create Keys to Container         
        this.keyboardContainer.append(this._createKeys());
        
        //save Obj of Keys 
        this.allKeys = this.keyboardContainer.querySelectorAll('.keyboard-key');
        this._addMouseEvents(this.allKeys);
        
        this.wrapper.appendChild(this.title);
        this.wrapper.appendChild(this.inputKeyboard);
        this.wrapper.appendChild(this.keyboardContainer);
        this.wrapper.appendChild(this.description);

        document.body.appendChild(this.wrapper);

        document.addEventListener('keydown', (e) => this._keydownKeyboard(e));
        document.addEventListener('keyup', (e) => this._keyupKeyboard(e));
        document.addEventListener('keypress',(e) => this._keypressKeyboard(e));

        this.inputKeyboard.onkeydown = (e) => {
            e.preventDefault();
        } 
    }

    _createKeys() {
        let keyboardRows = document.createDocumentFragment();

        for(let i=0; i<5; i++) {
            let keyboardRow = document.createElement('div');
            keyboardRow.classList.add('keyboard-row');

            objOfKeys[i].forEach(el => {
                let key = document.createElement('div');
                key.classList.add('keyboard-key');
                key.classList.add(el.name);
                key.innerText = (this.properties.language == 'ru') ? el.rus : el.en;
                key.setAttribute('data-ru',el.rus);
                key.setAttribute('data-en',el.en);
                key.setAttribute('data-shiftRu', el.rusShift);
                key.setAttribute('data-shiftEn', el.shift);
                key.id = el.name;
                (el.SpecialKey)? key.classList.add('special-key') : null;

                keyboardRow.append(key);
            });
        
            keyboardRows.append(keyboardRow);
        }
        return keyboardRows;
    }

    _addMouseEvents(keys) {
        keys.forEach(key => {
            this._addBacklight(key);
        
            switch (key.id) {
                case "Backspace" : 
                    key.addEventListener('click', () => { this._toBackspace() }); 
                break;

                case "Tab" : 
                    key.addEventListener('click', () => { this._printToInput('    ') }); 
                break;

                case "Delete" :
                    key.addEventListener('click', () => { this._toDelete(); }); 
                break;

                case "Space" : 
                    key.addEventListener('click', () => { this._toSpace()}); 
                break;

                case "CapsLock" : 
                    key.addEventListener('click', () => { this._toggleCapsLock()}); 
                break;
                
                case "Enter":
                    key.addEventListener('click',() => { this._printToInput("\n")});
                break;

                case 'ChangeLang' : 
                    key.addEventListener('click',()=> { this._changeLanguage() });
                break;

                case "ShiftLeft" :
                case "ShiftRight" :
                    key.addEventListener('click', () => { this._showShift(key, true) }); 
                break;

                case "ControlLeft" : case "ControlRight" : case "AltLeft" : case "AltRight" : case "MetaLeft" : 
                this.inputKeyboard.focus()
                break;

                default :
                    key.addEventListener('click', () => { this._printToInput(key.textContent) });
            }
        })
        
    }

    _keydownKeyboard(e) {
        if(!document.getElementById(e.code)){
            return;
        }

        this.inputKeyboard.focus();

        if(e.code == 'CapsLock') {
            this._toggleCapsLock();
            return;
        }

        if(e.code !== 'ShiftLeft' || e.code !== 'ShiftRight') {
            document.getElementById(e.code).classList.add('active')
        }
        

        if(e.code == 'AltLeft' || e.code == 'ControlLeft') {
            if(this._checkActive('AltLeft') && this._checkActive('ControlLeft')) {
                this._changeLanguage();
            }
        }

        if(e.code == 'Backspace') {
            this._toBackspace();
            return;
        }

        if(e.code == 'ControlLeft' || e.code == 'ControlRight' || e.code == 'AltLeft' || e.code == 'AltRight') {
            return;
        }

        if(e.code == 'Enter' ) {
            this._printToInput("\n");
            return;
        }

        if(e.code == 'Tab') {
            this._printToInput("    ");
            return;
        }

        if(e.code == 'Delete') {
            this._toDelete();
            return;
        }

        if(e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
            if(this.properties.flagForShift) {
                this.properties.flagForShift = false;
                this._showShift(e);
            }
            return;
        }
            this.inputKeyboard.value += document.getElementById(e.code).innerHTML;
    }

    _keyupKeyboard(e) {
        if(!document.getElementById(e.code)){
            return;
        }

        if(e.code !== 'CapsLock') {
            document.getElementById(e.code).classList.remove('active');
        }

        if(e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
            this.properties.flagForShift = true;
            this._showShift(e);
            return;
        }
        
    }

    _keypressKeyboard(e) {
        e.preventDefault();
    }

    _changeLanguage(){
        console.log(this.properties.shift);
            if(this.properties.shift) {
                this._showShift();
                document.getElementById('ShiftLeft').classList.remove('active');
            }
            
            this.properties.language = this.properties.language == 'en' ? 'ru' : 'en';
            localStorage.setItem('keyboard-language', this.properties.language);
    
            if (this.properties.capsLock == true) {
                for(let key of this.allKeys) {
                    key.textContent = this.properties.language == 'en' ? key.dataset.shiften : key.dataset.shiftru;
                }
            }
            else {
                for(let key of this.allKeys) {
                    key.textContent = this.properties.language == 'en' ? key.dataset.en : key.dataset.ru;
                }
            }
    }
    _printToInput(text) {
        this.inputKeyboard.value += text;
        this.inputKeyboard.focus();
    }

    _toBackspace() {
        this.inputKeyboard.value = this.inputKeyboard.value.substring(0, this.inputKeyboard.value.length - 1);
        this.inputKeyboard.focus();
    }

    _toSpace() {
            this.inputKeyboard.value += " ";
            this.inputKeyboard.focus();
    }

    _toDelete() {
        if (this.inputKeyboard.selectionStart === this.inputKeyboard.selectionEnd) {
            this.inputKeyboard.setRangeText('', this.inputKeyboard.selectionStart, this.inputKeyboard.selectionEnd + 1, 'end');
          } else if (this.inputKeyboard.selectionStart !== this.inputKeyboard.selectionEnd) {
            this.inputKeyboard.setRangeText('', this.inputKeyboard.selectionStart, this.inputKeyboard.selectionEnd, 'end');
          }
          this.inputKeyboard.focus();
    }

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        
        document.querySelector('.CapsLock').classList.toggle('active');

        for(let char of this.allKeys) {
            let code = char.textContent.charCodeAt(0);
            if(code >= 97 && code <= 122 || code >= 65 && code <= 90 && char.textContent.length <= 1 || 
               code >= 1040 && code <= 1103) {
                char.textContent = this.properties.capsLock ? char.textContent.toUpperCase() : char.textContent.toLowerCase();
            }
        }
    }
    _showShift(key, mouse) {
        if(mouse) {
            key.classList.toggle('active');
        }  
        
        this.properties.shift = !this.properties.shift;

        if(this.properties.language == 'en') {
            for(let key of this.allKeys) {
                key.textContent = this.properties.shift ? key.dataset.shiften : key.dataset.en;
            }
            return;
        }
        if(this.properties.language == 'ru') {
            for(let key of this.allKeys) {
                key.textContent = this.properties.shift ? key.dataset.shiftru : key.dataset.ru;
            }
            return;
        }
    }

    _checkActive(str) {
        return (document.getElementById(str).classList.contains('active'));
    }
    
    _addBacklight(key) {
        if(key.id !== 'CapsLock' && key.id !== 'ShiftLeft' && key.id !== 'ShiftRight') {
            key.addEventListener('mousedown', () => {
                key.classList.add('active');
                setTimeout(() => {
                    key.classList.remove('active');
                }, 300);
            });
            key.addEventListener('mouseup', () => {
                key.classList.remove('active');
                
            })
        }
    }

}


let start = new Keyboard();
start.init();