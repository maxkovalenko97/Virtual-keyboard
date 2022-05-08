import {objOfKeys} from './objOfKeys.js';


class Keyboard {
    constructor() {
        this.allKeys = null;
        this.inputArea = null;
        this.properties = {
            capsLock: false,
            shift: false,
            language: 'en',
            value: '',
        }
    }
    
    init() {
        this.wrapper = document.createElement('div');
        this.keyboardContainer = document.createElement('div');
        this.title = document.createElement('h1');
        this.description = document.createElement('p');
        this.inputKeyboard = document.createElement('textarea');

        if(localStorage.getItem('keyboard-language') == null) {
            localStorage.setItem('keyboard-language', 'en');
        }
        this.properties.language = localStorage.getItem('keyboard-language');

        this.wrapper.classList.add('wrapper');
        this.keyboardContainer.classList.add('keyboard');
        this.title.classList.add('main-title');
        this.description.classList.add('description');
        this.inputKeyboard.classList.add('textarea');
        
        this.keyboardContainer.append(this._createKeys());

        this.inputArea = this.inputKeyboard;
        this.allKeys = this.keyboardContainer.querySelectorAll('.keyboard-key');
        this.title.innerText = "Virtual Keyboard";
        this.description.innerText = `For changing language you can use special button on virtual keyboard or combination LeftShift + LeftCtrl. \n 
                                    Keyboard created for Windows OS.`


        this.wrapper.appendChild(this.title);
        this.wrapper.appendChild(this.inputKeyboard);
        this.wrapper.appendChild(this.keyboardContainer);
        this.wrapper.appendChild(this.description);

        document.body.appendChild(this.wrapper);

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

                if(el.name !== 'CapsLock' && el.name !== 'ShiftLeft' && el.name !== 'ShiftRight') {
                    key.addEventListener('mousedown', () => {
                        key.classList.add('active');
                    });
                    key.addEventListener('mouseup', () => {
                        key.classList.remove('active');
                    })
                }

                switch (el.name) {
                    case "Space" : 
                        key.addEventListener('click', () => {
                            this.properties.value += " ";
                            this._printToInput();
                        }); 
                        break;

                    case "Backspace" : 
                        key.addEventListener('click', () => {
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                            this._printToInput();
                        }); 
                        break;

                    case "CapsLock" : 
                        key.addEventListener('click', () => {
                            this._toggleCapsLock();
                        }); 
                        break;

                    case "ShiftLeft" :
                    case "ShiftRight" :
                        key.addEventListener('click', () => {
                            this._showShift();
                        }); 
                        break;   

                    case "Enter":
                        key.addEventListener('click',() => {
                            this.properties.value += "\n";
                            this._printToInput();
                        });
                        break;

                    case 'ChangeLang' : 
                        key.addEventListener('click',()=> {
                            this._changeLanguage();
                        });
                        break;
                                            
                    default :
                        key.addEventListener('click', () => {
                            this.properties.value += key.textContent;
                            this._printToInput();
                        });
                       
                }

                keyboardRow.append(key);
            });
        
            keyboardRows.append(keyboardRow);
        }
        return keyboardRows;
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

    _showShift() {
        this.properties.shift = !this.properties.shift;
        if(!this.properties.language) {
            for(let key of this.allKeys) {
                key.textContent = this.properties.shift ? key.dataset.shiften : key.dataset.en;
            }
        }
        if(this.properties.language) {
            for(let key of this.allKeys) {
                key.textContent = this.properties.shift ? key.dataset.shiftru : key.dataset.ru;
            }
        }
        
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



    _printToInput() {
        this.inputArea.textContent = this.properties.value;
    }

    
}


let start = new Keyboard();
start.init();