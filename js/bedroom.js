// ページ読み込み時にボタンの状態を確認し、非表示にする
window.addEventListener("load", function () {

     // BGMを再生
     const bgm = document.getElementById("bgm");
     if (bgm) {
         bgm.play().catch(error => {
             console.log("BGMの再生がブロックされました: ", error);
         });
     }

    const button = document.getElementById("bagbutton");
    const buttonVisible = localStorage.getItem("bagbuttonentranceVisible");

    // ボタンが非表示に設定されていれば、ボタンを非表示にする
    if (buttonVisible === "false") {
        button.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // 一度だけ怖い画像を表示するフラグ
    const scaryImageShown = localStorage.getItem("scaryImageShown");

    // フラグが設定されていない場合のみ怖い画像を表示
    if (!scaryImageShown) {
        const overlay = document.getElementById("scary-image-overlay");

        // オーバーレイを表示
        overlay.style.display = "flex";

        // 1秒後にオーバーレイを非表示にする
        setTimeout(() => {
            overlay.style.display = "none";

            // 表示したことを記録
            localStorage.setItem("scaryImageShown", "true");
        }, 100); // 1秒後に非表示
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

// 音声オブジェクトをグローバル変数として定義
let ringtone;
let answerRingtone; // 新しい音声のための変数

// ボタンがクリックされたときにアイテムを表示し、ボタンを非表示にする処理
document.getElementById("item6Button").addEventListener("click", function () {
    // アイテム6の画像を表示する
    const itemSlot = document.getElementById("slot6");
    const itemImage = itemSlot.querySelector("img");

    // このボタンを非表示にする
    this.style.display = "none";

    // アイテムの画像があれば表示
    if (itemImage) {
        itemImage.style.display = "block"; // アイテムを表示する
    }

    // メッセージを表示
    const messageArea = document.getElementById("textArea");
    messageArea.textContent = "iPhoneを入手しました"; // テキストを更新

    // 少し遅延させて次のメッセージを表示
    setTimeout(function() {
        messageArea.textContent = ""; // メッセージをクリア
    }, 2000);  // 2秒後に次のテキストを表示
    
    // アイテムをlocalStorageに保存
    localStorage.setItem("item6", "iPhone"); // アイテム6（iPhone）の状態を保存
    localStorage.setItem("item6ButtonentranceVisible", "false"); // ボタンの状態も保存
    console.log("item6 saved to localStorage: ", localStorage.getItem("item6"));

    // 5秒後に着信音を鳴らし、電話の選択肢を表示
    setTimeout(function () {
        // 着信音を再生
        ringtone = new Audio("/assets/sound/Telephone-Ringtone01-2.mp3");  // 音声ファイルを指定
        ringtone.play();  // 音を再生

        // 電話の選択肢を表示
        document.getElementById("phone-overlay").style.display = "block"; // 電話の選択肢を表示
    }, 5000);
});

// 電話に出る選択肢
document.getElementById("answer-phone").addEventListener("click", function () {
    // 電話に出たことをlocalStorageに保存
    localStorage.setItem("answeredPhone", "true");
    console.log("電話に出ました。");

    // 音を停止
    if (ringtone) {
        ringtone.pause(); // 音を停止
        ringtone.currentTime = 0; // 音の再生位置を最初に戻す
    }

    // 新しい音声を再生
    answerRingtone = new Audio("/assets/sound/電話が切れる1.mp3");  // 新しい音声ファイルを指定
    answerRingtone.play();  // 電話を受けた後に音声を再生

    // 電話の選択肢を非表示にする
    document.getElementById("phone-overlay").style.display = "none";
});

// 電話を無視する選択肢
document.getElementById("ignore-phone").addEventListener("click", function () {
    // 電話を無視したことをlocalStorageに保存
    localStorage.setItem("answeredPhone", "false");
    console.log("電話を無視しました。");

    // 音を停止
    if (ringtone) {
        ringtone.pause(); // 音を停止
        ringtone.currentTime = 0; // 音の再生位置を最初に戻す
    }

    // 電話の選択肢を非表示にする
    document.getElementById("phone-overlay").style.display = "none";
});

// ページ読み込み時にボタンの状態を確認し、非表示にする処理
window.addEventListener("load", function () {
    const button = document.getElementById("item6Button");
    const buttonVisible = localStorage.getItem("item6ButtonentranceVisible");

    // ボタンが非表示に設定されていれば、ボタンを非表示にする
    if (buttonVisible === "false") {
        button.style.display = "none";
    }
});



// 左遷移ボタンのクリックイベント
document.getElementById("leftbutton").addEventListener("click", function() {
    // living.htmlに遷移
    window.location.href = "living.html";
});

// nazoの画像表示の処理
document.addEventListener('DOMContentLoaded', function () {
    const nazoButton = document.getElementById("nazobutton");
    const overlay = document.getElementById("image-overlay");
    const overlayImage = document.getElementById("overlay-image");

    nazoButton.addEventListener("click", function () {
        overlayImage.src = "/assets/img/nazo.png"; // 画像のパスを指定
        overlay.style.display = "flex"; // 表示する
    });

    // オーバーレイをクリックしたら非表示にする
    overlay.addEventListener("click", function () {
        overlay.style.display = "none";
    });
});