// ページ読み込み時にボタンの状態を確認し、非表示にする
window.addEventListener("load", function () {
    // BGMを再生
    const bgm = document.getElementById("bgm");
      // 一度だけ再生したかを確認するフラグ
    const bgmPlayed = localStorage.getItem("bedbgmPlayed");
    if (bgm) {
        bgm.play().catch(error => {
            console.log("BGMの再生がブロックされました: ", error);
        });
    }
    // フラグが設定されていない場合のみ再生する
    if (!bgmPlayed) {
        setTimeout(() => {
            const bedbgm = document.getElementById("bedbgm");
            if (bedbgm) {
                bedbgm.play().catch(error => {
                    console.log("BGMの再生がブロックされました: ", error);
                });
                // 再生したことをフラグに保存
                localStorage.setItem("bedbgmPlayed", "true");
            }
        }, 5000); // 6秒後に再生
    }
    const button = document.getElementById("bagbutton");
    const buttonVisible = localStorage.getItem("bagbuttonentranceVisible");

    // ボタンが非表示に設定されていれば、ボタンを非表示にする
    if (buttonVisible === "false") {
        button.style.display = "none";
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


    // バックボタンを取得
    const passButton = document.getElementById("passbutton");
    const passwordVerified = localStorage.getItem("passwordVerified");

    // フラグが設定されていれば、バックボタンを非表示
    if (passButton && passwordVerified === "true") {
        passButton.style.display = 'none';
    }

    // 懐中電灯ボタンを取得
    const boxButton = document.getElementById("boxbutton");
    const passwordboxVerified = localStorage.getItem("passwordboxVerified");

    // フラグが設定されていれば、懐中電灯ボタンを非表示
    if (boxButton && passwordboxVerified === "true") {
        boxButton.style.display = 'none';
    };



// ボタンがクリックされたときにアイテムを表示し、ボタンを非表示にする関数
document.getElementById("bagbutton").addEventListener("click", function () {
    // アイテム7の画像を表示する
    const itemSlot = document.getElementById("slot7");
    const itemImage = itemSlot.querySelector("img");

    // このボタンを非表示にする
    this.style.display = "none";

    // アイテムの画像があれば表示
    if (itemImage) {
        itemImage.style.display = "block"; // アイテムを表示する
    }

    // メッセージを表示
    const messageArea = document.getElementById("textArea");
    messageArea.textContent = "カッターを入手しました"; // テキストを更新

    // 少し遅延させて次のメッセージを表示
    setTimeout(function() {
    messageArea.textContent = ""; // テキストを追加
    }, 2000);  // 2秒後に次のテキストを表示
    
    // アイテムをlocalStorageに保存
    localStorage.setItem("item7", "cutter"); // アイテム7（カッター）の状態を保存
    localStorage.setItem("bagbuttonVisible", "false"); // ボタンの状態も保存
    console.log("item7 saved to localStorage: ", localStorage.getItem("item7"));
});

// ページ読み込み時にボタンの状態を確認し、非表示にする
window.addEventListener("load", function () {
    const button = document.getElementById("bagbutton");
    const buttonVisible = localStorage.getItem("bagbuttonVisible");

    // ボタンが非表示に設定されていれば、ボタンを非表示にする
    if (buttonVisible === "false") {
        button.style.display = "none";
    }
});



// top.htmlへの遷移処理
document.getElementById("topbutton").addEventListener("click", function () {
    window.location.href = "stairs.html";
});

// right.htmlへの遷移処理
document.getElementById("rightbutton").addEventListener("click", function() {
    // myroom.htmlに遷移
    window.location.href = "myroom.html";
});

// pass.htmlへの遷移処理
document.getElementById("passbutton").addEventListener("click", function() {
    // pass.htmlに遷移
    window.location.href = "pass.html";
});

// box.htmlへの遷移処理
document.getElementById("boxbutton").addEventListener("click", function() {
    // box.htmlに遷移
    window.location.href = "box.html";
});

// wiring.htmlへの遷移処理
document.getElementById("wiringbutton").addEventListener("click", function () {
    window.location.href = "wiring.html";
});

// suuziの画像表示の処理
document.addEventListener('DOMContentLoaded', function () {
    const suuziButton = document.getElementById("suuzibutton");
    const overlay = document.getElementById("image-overlay");
    const overlayImage = document.getElementById("overlay-image");

    suuziButton.addEventListener("click", function () {
        overlayImage.src = "/assets/img/suuzi.png"; // 画像のパスを指定
        overlay.style.display = "flex"; // 表示する
    });

    // オーバーレイをクリックしたら非表示にする
    overlay.addEventListener("click", function () {
        overlay.style.display = "none";
    });
});

window.addEventListener("load", function () {
    const keyButton = document.getElementById("keybutton");
    const messageArea = document.getElementById("textArea");

    // ローカルストレージの状態を確認
    const item4 = localStorage.getItem("item4"); // 鍵を所持しているか確認
    const doorUnlocked = localStorage.getItem("doorUnlocked"); // ドアが解錠済みか確認

    // ドアが解錠済みでない場合、鍵を所持していればボタンを表示
    if (doorUnlocked === "true") {
        keyButton.style.display = "block"; // ボタンを表示
        setTimeout(() => {
            messageArea.textContent = ""; // メッセージを消去
        }, 2000);
    } else if (item4 === "key") {
        keyButton.style.display = "block"; // ボタンを表示
    } else {
        keyButton.style.display = "none"; // ボタンを非表示
    }
    

    // ボタンがクリックされたときの処理
    keyButton.addEventListener("click", function () {
        if (doorUnlocked !== "true" && item4 === "key") {
            // 初回鍵を使用
            messageArea.textContent = "鍵を使った";

            // 鍵を使用したことを記録
            localStorage.setItem("doorUnlocked", "true"); // ドアを解錠済みに設定

            // 少し遅れてページ遷移
            setTimeout(function () {
                messageArea.textContent = ""; // テキストを消す

                // ローカルストレージから鍵を削除
                localStorage.removeItem("item4");
                console.log("item4 removed from localStorage");

                // bedroom.htmlに遷移
                window.location.href = "bedroom.html";
            }, 2000); // 2秒後に遷移
        } else {
            // すでに解錠済みの場合はすぐに遷移
            window.location.href = "bedroom.html";
        }
    });
});



