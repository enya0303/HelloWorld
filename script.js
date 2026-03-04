// 1. 定義多國語言資料庫 (Data Model)
const i18n = {
    'en': { text: 'Hello World', langCode: 'en-US', name: 'English' },
    'zh': { text: '你好，世界', langCode: 'zh-TW', name: '繁體中文' },
    'ja': { text: 'こんにちは、世界', langCode: 'ja-JP', name: '日本語' },
    'ko': { text: '안녕하세요, 세상', langCode: 'ko-KR', name: '한국어' },
    'es': { text: 'Hola Mundo', langCode: 'es-ES', name: 'Español' },
    'fr': { text: 'Bonjour le monde', langCode: 'fr-FR', name: 'Français' },
    'de': { text: 'Hallo Welt', langCode: 'de-DE', name: 'Deutsch' }
};

// 2. 選取 DOM 元素
const greetingEl = document.getElementById('greeting-text');
const langSelect = document.getElementById('lang-selector');
const speakBtn = document.getElementById('speak-btn');

// 3. 初始化函式：動態生成選單並偵測使用者語言
function init() {
    // 生成下拉選單選項
    Object.keys(i18n).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = i18n[key].name;
        langSelect.appendChild(option);
    });

    // 偵測瀏覽器語言 (例如: 'zh-TW' -> 'zh')
    const userLang = navigator.language.slice(0, 2);
    // 如果字典裡有這個語言就選它，否則預設英文
    const defaultLang = i18n[userLang] ? userLang : 'en';
    
    langSelect.value = defaultLang;
    updateGreeting(defaultLang);
}

// 4. 更新畫面文字邏輯
function updateGreeting(langKey) {
    const data = i18n[langKey];
    greetingEl.style.opacity = 0; // 簡單的淡出效果
    
    setTimeout(() => {
        greetingEl.textContent = data.text;
        greetingEl.style.opacity = 1; // 淡入
    }, 200);
}

// 5. 強大功能：文字轉語音 (Text-to-Speech)
function speakGreeting() {
    const currentKey = langSelect.value;
    const data = i18n[currentKey];

    // 使用 Web Speech API
    const utterance = new SpeechSynthesisUtterance(data.text);
    utterance.lang = data.langCode;
    utterance.rate = 0.9; // 語速稍微放慢一點點，聽起來較自然
    
    window.speechSynthesis.cancel(); // 停止當前任何正在說的話
    window.speechSynthesis.speak(utterance);
}

// 6. 事件監聽
langSelect.addEventListener('change', (e) => updateGreeting(e.target.value));
speakBtn.addEventListener('click', speakGreeting);

// 啟動程式
init();