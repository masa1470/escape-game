document.addEventListener('DOMContentLoaded', () => {
    const imageElement = document.querySelector('.image img'); // 対象の img 要素
    const spotlightLayer = document.querySelector('.spotlight-layer'); // スポットライト用のレイヤー
    const textArea = document.getElementById('textArea'); // メッセージ表示エリア

    // ローカルストレージから懐中電灯と電池をチェック
    const hasFlashlight = localStorage.getItem("item3") === "kaityudentou";
    const hasBattery = localStorage.getItem("item9") === "denthi";

    // 懐中電灯と電池が揃っている場合のみスポットライトを有効化
    if (hasFlashlight && hasBattery) {
        imageElement.addEventListener('mousemove', function (e) {
            const rect = imageElement.getBoundingClientRect();
            const x = e.clientX - rect.left; // img 内の X 座標
            const y = e.clientY - rect.top;  // img 内の Y 座標

            // スポットライト効果を更新
            spotlightLayer.style.background = `
                radial-gradient(circle at ${x}px ${y}px, 
                rgba(255, 255, 255, 0.1) 0px, 
                rgba(255, 255, 255, 0.25) 5px, 
                rgba(0, 0, 0, 0.1) 120px)
            `;

            // Spotlight の表示範囲を画像サイズ内に限定
            spotlightLayer.style.width = `${rect.width}px`;
            spotlightLayer.style.height = `${rect.height}px`;
            spotlightLayer.style.left = `${rect.left}px`;
            spotlightLayer.style.top = `${rect.top}px`;
        });

        // マウスが img 要素外に出た場合
        imageElement.addEventListener('mouseleave', () => {
            spotlightLayer.style.background = "none"; // スポットライトを消去
        });
    } else {
        // スポットライトを無効化し、メッセージを表示
        spotlightLayer.style.background = "none";
        if (textArea) {
            textArea.innerText = "";
        }
    }
    // BGMを再生
    const bgm = document.getElementById("bgm");
    if (bgm) {
        bgm.play().catch(error => {
            console.log("BGMの再生がブロックされました: ", error);
        });
    }
});

// 初期のテキストを定義
const texts = [
    "暗いな・・・", // 最初のテキスト
    "足元に気を付けよう・・・",  
];

let currentTextIndex = 0;  // 現在のテキストインデックス

document.addEventListener("DOMContentLoaded", function() {
    const hasSeenIntro = localStorage.getItem("hasSeenStairsIntro");
    if (hasSeenIntro === "true") {
        return;
    }

    const textArea = document.getElementById('textArea');
    if (textArea) {
        textArea.innerText = texts[currentTextIndex];

        textArea.addEventListener('click', function() {
            currentTextIndex++;
            if (currentTextIndex < texts.length) {
                textArea.innerText = texts[currentTextIndex];
            } else {
                textArea.innerText = ""; 
                localStorage.setItem("hasSeenStairsIntro", "true");
            }
        });
    }
});

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

// ページ遷移処理
document.getElementById("backbutton").addEventListener("click", function() {
    window.location.href = "living.html";
});

document.getElementById("topbutton").addEventListener("click", function () {
    window.location.href = "entrance.html";
});
