import {objOfKeys} from './objOfKeys.js';


class Keyboard {
    constructor() {
        this.allKeys = null;
        this.inputKeyboard = null;
        this.properties = {
            capsLock: false,
            shift: false,
            language: 'en',
            value: '',
            flagForLang: false,
            flagForShift: false,
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

        //for saving language before reload
        if(localStorage.getItem('keyboard-language') == null) {
            localStorage.setItem('keyboard-language', 'en');
        }
        this.properties.language = localStorage.getItem('keyboard-language');

        
        
        this.keyboardContainer.append(this._createKeys());

        this.allKeys = this.keyboardContainer.querySelectorAll('.keyboard-key');
        this.title.innerText = "Virtual Keyboard";
        this.description.innerText = `For changing language you can use special button on virtual keyboard or combination LeftCtrl + LeftAlt. \n 
                                    Keyboard created for Windows OS.`
        


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

        this.inputKeyboard.focus();
        // this.inputKeyboard.addEventListener('keypress', () => {})

    }

    _createKeys() {
        let keyboardRows = document.createDocumentFragment();

        for(let i=0; i<5; i++) {
            let keyboardRow = document.createElement('div');
            keyboardRow.classList.add('keyboard-row');
            keyboardRow.id = `row-${i+1}`;

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

                if(el.name !== 'CapsLock') {
                    key.addEventListener('mousedown', () => {
                        key.classList.add('active');
                    });
                    key.addEventListener('mouseup', () => {
                        key.classList.remove('active');
                        
                    })
                }

                switch (el.name) {
                    case "Space" : 
                    key.addEventListener('click', () => { this._toSpace();}); 
                    break;

                    case "Backspace" : 
                        key.addEventListener('click', () => { this._toBackspace(); }); 
                    break;

                    case "Delete" :
                        key.addEventListener('click', () => { this._toDelete(); }); 
                    break;
                    case "CapsLock" : 
                        key.addEventListener('click', () => { this._toggleCapsLock();}); 
                    break;

                    case "ShiftLeft" :
                    case "ShiftRight" :
                        key.addEventListener('click', () => {
                            this._showShift();
                        }); 
                        break;   

                    case "Enter":
                        key.addEventListener('click',() => {
                            this._printToInput("\n");
                        });
                        break;

                    case 'ChangeLang' : 
                        key.addEventListener('click',()=> {
                            this._changeLanguage();
                        });
                    break;
                                            
                    default :
                        key.addEventListener('click', () => {
                            this._printToInput(key.textContent);
                        });
                       
                }
                keyboardRow.append(key);
            });
        
            keyboardRows.append(keyboardRow);
        }
        return keyboardRows;
    }



    _showShift() {
        this.properties.shift = !this.properties.shift;
        if(this.properties.language == 'en') {
            for(let key of this.allKeys) {
                key.textContent = this.properties.shift ? key.dataset.shiften : key.dataset.en;
            }
            this.properties.flagForShift = false;
            return;
        }
        if(this.properties.language == 'ru') {
            for(let key of this.allKeys) {
                key.textContent = this.properties.shift ? key.dataset.shiftru : key.dataset.ru;
            }
            this.properties.flagForShift = false;
            return;
        }
        
    }





    

    _keydownKeyboard(e) {
        this.inputKeyboard.focus();

        if(e.code == 'CapsLock') {
            this._toggleCapsLock();
            return;
        }

        document.getElementById(e.code).classList.add('active');

    
        if(e.code == 'AltLeft') this.properties.flagForLang = true;
        if(e.code == 'ControlLeft' && this.properties.flagForLang) {
            this._changeLanguage();
            this.properties.flagForLang = false;
            return;
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
            this.properties.flagForShift = true;
            if(this.properties.flagForShift) {
                this.properties.flagForShift = false;
                this._showShift();
            }
            return;
        }

        // document.getElementById(e.code).classList.add('active');

            this.inputKeyboard.value += document.getElementById(e.code).innerHTML;
    
        
    }

    _keyupKeyboard(e) {
        if(e.code !== 'CapsLock') {
            document.getElementById(e.code).classList.remove('active');
        }

        if(e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
            this._showShift();
            return;
        }
        
    }

    _keypressKeyboard(e) {
        e.preventDefault();
    }



    _changeLanguage(){
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
}


let start = new Keyboard();
start.init();