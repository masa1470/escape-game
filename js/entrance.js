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
});



// 初期のテキストを定義
const entranceTexts = [
    "!?・・・",
    "ここから出られる!!!",
];

let entranceCurrentTextIndex = 0;

// ページ読み込み時の処理
document.addEventListener("DOMContentLoaded", function() {
    const hasSeenEntranceIntro = localStorage.getItem("hasSeenEntranceIntro");

    if (hasSeenEntranceIntro === "true") {
        console.log("玄関のテキストはすでに表示済みです");
        return;
    }

    const textArea = document.getElementById('textArea');
    if (textArea) {
        textArea.innerText = entranceTexts[entranceCurrentTextIndex];

        textArea.addEventListener('click', function() {
            entranceCurrentTextIndex++;

            if (entranceCurrentTextIndex < entranceTexts.length) {
                textArea.innerText = entranceTexts[entranceCurrentTextIndex];
            } else {
                textArea.innerText = "";
                localStorage.setItem("hasSeenEntranceIntro", "true");
            }
        });
    } else {
        console.error("entrance.html の textArea が見つかりませんでした");
    }
});

// ボタンがクリックされたときにアイテムを表示し、ボタンを非表示にする関数
document.getElementById("bagbutton").addEventListener("click", function () {
    // アイテム5の画像を表示する
    const itemSlot = document.getElementById("slot5");
    const itemImage = itemSlot.querySelector("img");

    // このボタンを非表示にする
    this.style.display = "none";

    // アイテムの画像があれば表示
    if (itemImage) {
        itemImage.style.display = "block"; // アイテムを表示する
    }

    // メッセージを表示
    const messageArea = document.getElementById("textArea");
    messageArea.textContent = "リモコンを入手しました"; // テキストを更新

    // 少し遅延させて次のメッセージを表示
    setTimeout(function() {
    messageArea.textContent = ""; // テキストを追加
    }, 2000);  // 2秒後に次のテキストを表示
    
    // アイテムをlocalStorageに保存
    localStorage.setItem("item5", "rimokonn"); // アイテム5（リモコン）の状態を保存
    localStorage.setItem("bagbuttonentranceVisible", "false"); // ボタンの状態も保存
    console.log("item5 saved to localStorage: ", localStorage.getItem("item5"));
});

// ページ読み込み時にボタンの状態を確認し、非表示にする
window.addEventListener("load", function () {
    const button = document.getElementById("bagbutton");
    const buttonVisible = localStorage.getItem("bagbuttonentranceVisible");

    // ボタンが非表示に設定されていれば、ボタンを非表示にする
    if (buttonVisible === "false") {
        button.style.display = "none";
    }
    // BGMを再生
    const bgm = document.getElementById("bgm");
    if (bgm) {
        bgm.play().catch(error => {
            console.log("BGMの再生がブロックされました: ", error);
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

// stairs.htmlへの遷移処理
document.getElementById("backbutton").addEventListener("click", function() {
    window.location.href = "stairs.html";
});

document.addEventListener('DOMContentLoaded', function () {
    const hintoButton = document.getElementById("hintobutton");
    const overlay = document.getElementById("image-overlay");
    const overlayImage = document.getElementById("overlay-image");

    // ローカルストレージのキーを確認して条件を満たす場合にボタンを表示
    const hasFlashlight = localStorage.getItem("item3") || localStorage.getItem("kaityudentou");
    const hasBattery = localStorage.getItem("item9") || localStorage.getItem("denthi");

     // kuizuの画像表示の処理
     const suuziButton = document.getElementById("topbutton");
     if (suuziButton) {
         suuziButton.addEventListener("click", function () {
             overlayImage.src = "/assets/img/kuizu.png"; // 画像のパス
             overlayImage.classList.remove("large-image"); // 大きな画像クラスを削除
             overlay.style.display = "flex"; // オーバーレイを表示
         });
     }

    if (hintoButton) {
        if (hasFlashlight && hasBattery) {
            hintoButton.style.display = "block"; // ボタンを表示
        } else {
            hintoButton.style.display = "none"; // ボタンを非表示
        }

        // ボタンがクリックされた時の画像表示処理
        hintoButton.addEventListener("click", function () {
            overlayImage.src = "/assets/img/hinto.png"; // 画像のパス
            overlayImage.classList.add("large-image"); // 大きな画像クラスを追加
            overlay.style.display = "flex"; // オーバーレイを表示
        });
    }

    // オーバーレイをクリックしたら非表示にする
    if (overlay) {
        overlay.addEventListener("click", function () {
            overlay.style.display = "none"; // オーバーレイを隠す
        });
    }
});

// エンディング処理
document.addEventListener('DOMContentLoaded', function() {
    const dkeyButton = document.getElementById('dkeybutton'); // ボタンのIDを指定
    const textArea = document.getElementById('textArea'); // テキストエリアのIDを指定
    // BGMを再生
    const keybgm = document.getElementById("keybgm");

    dkeyButton.addEventListener('click', function() {
        // ローカルストレージからitem10を取得
        const item10 = localStorage.getItem('item10');

        // item10がkeyでない場合
        if (item10 !== 'key') {
            keybgm.play().catch(error => {
                console.log("BGMの再生がブロックされました: ", error);
            });
            setTimeout(function() {
            textArea.textContent = '鍵がかかっている'; // テキストエリアにメッセージを表示
             }, 1000);
            // 1秒後にテキストを消す
            setTimeout(function() {
                textArea.textContent = '';
            }, 2000);
        } else {
            // 必要なアイテムとフラグが揃っているかチェック
            const hasKey = localStorage.getItem('item3') === 'kaityudentou';
            const hasItem9 = localStorage.getItem('item9') === 'denthi';
            const hasAnsweredPhone = localStorage.getItem('answeredPhone') === 'true';
            const isPasswordwallVerified = localStorage.getItem('passwordwallVerified') === 'true';

            // エンディングの条件を分岐
            if (hasKey && hasItem9 && hasAnsweredPhone && isPasswordwallVerified) {
                // True End
                window.location.href = 'true_end.html'; // True End のページへ遷移
            } else if (hasKey && hasItem9 && hasAnsweredPhone && !isPasswordwallVerified) {
                // Normal End
                window.location.href = 'normal_end.html'; // Normal End のページへ遷移
            } else {
                // Bad End
                window.location.href = 'bad_end.html'; // Bad End のページへ遷移
            }
        }
    });
});
