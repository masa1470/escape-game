// 初期のテキストを定義
const texts = [
    "ここは・・・どこだ？？？",  // 最初のテキスト
    "辺りを探索してみよう・・・", // 次のテキスト
];

let currentTextIndex = 0; // 現在のテキストインデックス

window.onload = function () {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");

    if (hasSeenIntro === "true") {

    } else {
        // 初回テキストを表示する処理
        const textArea = document.getElementById("textArea");
        textArea.innerText = texts[currentTextIndex];
        textArea.addEventListener("click", function () {
            currentTextIndex++;
            if (currentTextIndex < texts.length) {
                textArea.innerText = texts[currentTextIndex];
            } else {
                textArea.innerText = "";
                localStorage.setItem("hasSeenIntro", "true");
            }
        });
    }
     // BGMを再生
     const bgm = document.getElementById("bgm");
     bgm.play();

};


// アイテムがローカルストレージに保存されている場合、それを表示する関数
function displayItems() {
    const items = [
        { id: "item1", key: "scissors", slot: "slot1" },
        { id: "item2", key: "memo", slot: "slot2" },
        { id: "item3", key: "kaityudentou", slot: "slot3" },
        { id: "item4", key: "key", slot: "slot4" },
        { id: "item5", key: "rimokonn", slot: "slot5" },
        { id: "item6", key: "iPhone", slot: "slot6" },
        { id: "item7", key: "cutter", slot: "slot7" },
        { id: "item9", key: "denthi", slot: "slot9" },
        { id: "item10", key: "key", slot: "slot10" }
    ];

    items.forEach(item => {
        const value = localStorage.getItem(item.id);
        if (value === item.key) {
            const slot = document.getElementById(item.slot);
            const itemImage = slot?.querySelector("img");
            if (itemImage) {
                itemImage.style.display = "block";
            }
        }
    });
}

// アイテム表示を呼び出し
displayItems();

// ボタンがクリックされたときにアイテムを表示し、ボタンを非表示にする関数
document.getElementById("imageButton").addEventListener("click", function () {
    // アイテム1の画像を表示する
    const itemSlot = document.getElementById("slot1");
    const itemImage = itemSlot.querySelector("img");

    // このボタンを非表示にする
    this.style.display = "none";

    // アイテムの画像があれば表示
    if (itemImage) {
        itemImage.style.display = "block"; // アイテムを表示する
    }

    // メッセージを表示
    const messageArea = document.getElementById("textArea");
    messageArea.textContent = "はさみを入手しました"; // テキストを更新

    // 少し遅延させて次のメッセージを表示
    setTimeout(function() {
    messageArea.textContent = ""; // テキストを追加
    }, 2000);  // 2秒後に次のテキストを表示
    
    // アイテムをlocalStorageに保存
    localStorage.setItem("item1", "scissors"); // アイテム1（はさみ）の状態を保存
    localStorage.setItem("imageButtonVisible", "false"); // ボタンの状態も保存
    console.log("item1 saved to localStorage: ", localStorage.getItem("item1"));
});

// ページ読み込み時にボタンの状態を確認し、非表示にする
window.addEventListener("load", function () {
    const button = document.getElementById("imageButton");
    const buttonVisible = localStorage.getItem("imageButtonVisible");

    // ボタンが非表示に設定されていれば、ボタンを非表示にする
    if (buttonVisible === "false") {
        button.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // wallbutton の要素を取得
    const wallButton = document.getElementById('wallbutton');
        
    // ローカルストレージでパスワードを3回間違えた情報を確認
    const passwordVerified = localStorage.getItem('passwordwallVerified');

    // パスワードを3回間違えた場合、wallbutton を非表示にする
     if (passwordVerified === 'false') {
        wallButton.style.display = 'none'; // wallbutton を非表示にする
    }
});

// envelope.htmlへの遷移処理
document.getElementById("envelopeButton").addEventListener("click", function () {
    window.location.href = "envelope.html";
});

// wall.htmlへの遷移処理
document.getElementById("wallbutton").addEventListener("click", function () {
    window.location.href = "wall.html";
});

// living.htmlへの遷移処理
document.getElementById("backbutton").addEventListener("click", function() {
    // myroom.htmlに遷移
    window.location.href = "living.html";
});

// リセットボタンのクリックイベント
document.getElementById("resetButton").addEventListener("click", function () {
    // ローカルストレージをリセット
    localStorage.clear();
    location.reload(); // ページを再読み込み
});
