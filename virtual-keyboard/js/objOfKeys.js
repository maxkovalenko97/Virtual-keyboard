const objOfKeys = [
  [
    {
      en: '`', rus: 'ё', name: 'Backquote', shift: '~', rusShift: 'Ё',
    },
    {
      en: '1', rus: '1', name: 'Digit1', shift: '!', rusShift: '!',
    },
    {
      en: '2', rus: '2', name: 'Digit2', shift: '@', rusShift: '"',
    },
    {
      en: '3', rus: '3', name: 'Digit3', shift: '#', rusShift: '№',
    },
    {
      en: '4', rus: '4', name: 'Digit4', shift: '$', rusShift: ';',
    },
    {
      en: '5', rus: '5', name: 'Digit5', shift: '%', rusShift: '%',
    },
    {
      en: '6', rus: '6', name: 'Digit6', shift: '^', rusShift: ':',
    },
    {
      en: '7', rus: '7', name: 'Digit7', shift: '&', rusShift: '?',
    },
    {
      en: '8', rus: '8', name: 'Digit8', shift: '*', rusShift: '*',
    },
    {
      en: '9', rus: '9', name: 'Digit9', shift: '(', rusShift: '(',
    },
    {
      en: '0', rus: '0', name: 'Digit0', shift: ')', rusShift: ')',
    },
    {
      en: '-', rus: '-', name: 'Minus', shift: '_', rusShift: '_',
    },
    {
      en: '=', rus: '=', name: 'Equal', shift: '+', rusShift: '+',
    },
    {
      en: 'Backspace', rus: 'Backspace', name: 'Backspace', shift: 'Backspace', rusShift: 'Backspace', SpecialKey: true,
    },
  ],
  [{
    en: 'Tab', rus: 'Tab', name: 'Tab', shift: 'Tab', rusShift: 'Tab', SpecialKey: true,
  },
  {
    en: 'q', rus: 'й', name: 'KeyQ', shift: 'Q', rusShift: 'Й',
  },
  {
    en: 'w', rus: 'ц', name: 'KeyW', shift: 'W', rusShift: 'Ц',
  },
  {
    en: 'e', rus: 'у', name: 'KeyE', shift: 'E', rusShift: 'У',
  },
  {
    en: 'r', rus: 'к', name: 'KeyR', shift: 'R', rusShift: 'К',
  },
  {
    en: 't', rus: 'е', name: 'KeyT', shift: 'T', rusShift: 'Е',
  },
  {
    en: 'y', rus: 'н', name: 'KeyY', shift: 'Y', rusShift: 'Н',
  },
  {
    en: 'u', rus: 'г', name: 'KeyU', shift: 'U', rusShift: 'Г',
  },
  {
    en: 'i', rus: 'ш', name: 'KeyI', shift: 'I', rusShift: 'Ш',
  },
  {
    en: 'o', rus: 'щ', name: 'KeyO', shift: 'O', rusShift: 'Щ',
  },
  {
    en: 'p', rus: 'з', name: 'KeyP', shift: 'P', rusShift: 'З',
  },
  {
    en: '[', rus: 'х', name: 'BracketLeft', shift: '{', rusShift: 'Х',
  },
  {
    en: ']', rus: 'ъ', name: 'BracketRight', shift: '}', rusShift: 'Ъ',
  },
  {
    en: '\\', rus: '\\', name: 'Backslash', shift: '|', rusShift: '/',
  },
  {
    en: 'Del', rus: 'Del', name: 'Delete', shift: 'Del', rusShift: 'Del', SpecialKey: true,
  },
  ],
  [{
    en: 'CapsLock', rus: 'CapsLock', name: 'CapsLock', shift: 'CapsLock', rusShift: 'CapsLock', SpecialKey: true,
  },
  {
    en: 'a', rus: 'ф', name: 'KeyA', shift: 'A', rusShift: 'Ф',
  },
  {
    en: 's', rus: 'ы', name: 'KeyS', shift: 'S', rusShift: 'Ы',
  },
  {
    en: 'd', rus: 'в', name: 'KeyD', shift: 'D', rusShift: 'В',
  },
  {
    en: 'f', rus: 'а', name: 'KeyF', shift: 'F', rusShift: 'А',
  },
  {
    en: 'g', rus: 'п', name: 'KeyG', shift: 'G', rusShift: 'П',
  },
  {
    en: 'h', rus: 'р', name: 'KeyH', shift: 'H', rusShift: 'Р',
  },
  {
    en: 'j', rus: 'о', name: 'KeyJ', shift: 'J', rusShift: 'О',
  },
  {
    en: 'k', rus: 'л', name: 'KeyK', shift: 'K', rusShift: 'Л',
  },
  {
    en: 'l', rus: 'д', name: 'KeyL', shift: 'L', rusShift: 'Д',
  },
  {
    en: ';', rus: 'ж', name: 'Semicolon', shift: ':', rusShift: 'Ж',
  },
  {
    en: '\'', rus: 'э', name: 'Quote', shift: '"', rusShift: 'Э',
  },
  {
    en: 'Enter', rus: 'Enter', name: 'Enter', shift: 'Enter', rusShift: 'Enter', SpecialKey: true,
  },
  ],
  [{
    en: 'Shift', rus: 'Shift', name: 'ShiftLeft', shift: 'Shift', rusShift: 'Shift', SpecialKey: true,
  },
  {
    en: 'z', rus: 'я', name: 'KeyZ', shift: 'Z', rusShift: 'Я',
  },
  {
    en: 'x', rus: 'ч', name: 'KeyX', shift: 'X', rusShift: 'Ч',
  },
  {
    en: 'c', rus: 'с', name: 'KeyC', shift: 'C', rusShift: 'С',
  },
  {
    en: 'v', rus: 'м', name: 'KeyV', shift: 'V', rusShift: 'М',
  },
  {
    en: 'b', rus: 'и', name: 'KeyB', shift: 'B', rusShift: 'И',
  },
  {
    en: 'n', rus: 'т', name: 'KeyN', shift: 'N', rusShift: 'Т',
  },
  {
    en: 'm', rus: 'ь', name: 'KeyM', shift: 'M', rusShift: 'Ь',
  },
  {
    en: ',', rus: 'б', name: 'Comma', shift: '<', rusShift: 'Б',
  },
  {
    en: '.', rus: 'ю', name: 'Period', shift: '>', rusShift: 'Ю',
  },
  {
    en: '/', rus: '.', name: 'Slash', shift: '?', rusShift: ',',
  },
  {
    en: '▲', rus: '▲', name: 'ArrowUp', shift: '▲', rusShift: '▲', SpecialKey: true,
  },
  {
    en: 'Shift', rus: 'Shift', name: 'ShiftRight', shift: 'Shift', rusShift: 'Shift', SpecialKey: true,
  },
  ],
  [{
    en: 'Ctrl', rus: 'Ctrl', name: 'ControlLeft', shift: 'Ctrl', rusShift: 'Ctrl', SpecialKey: true,
  },
  {
    en: 'Win', rus: 'Win', name: 'MetaLeft', shift: 'Win', rusShift: 'Win', SpecialKey: true,
  },
  {
    en: 'Alt', rus: 'Alt', name: 'AltLeft', shift: 'Alt', rusShift: 'Alt', SpecialKey: true,
  },
  {
    en: 'Ru', rus: 'En', name: 'ChangeLang', shift: 'Ru', rusShift: 'En', SpecialKey: true,
  },
  {
    en: ' ', rus: ' ', name: 'Space', shift: ' ', rusShift: ' ', SpecialKey: true,
  },
  {
    en: 'Alt', rus: 'Alt', name: 'AltRight', shift: 'Alt', rusShift: 'Alt', SpecialKey: true,
  },
  {
    en: '◄', rus: '◄', name: 'ArrowLeft', shift: '◄', rusShift: '◄', SpecialKey: true,
  },
  {
    en: '▼', rus: '▼', name: 'ArrowDown', shift: '▼', rusShift: '▼', SpecialKey: true,
  },
  {
    en: '►', rus: '►', name: 'ArrowRight', shift: '►', rusShift: '►', SpecialKey: true,
  },
  {
    en: 'Ctrl', rus: 'Ctrl', name: 'ControlRight', shift: 'Ctrl', rusShift: 'Ctrl', SpecialKey: true,
  },
  ],
];

export { objOfKeys };
