// 初期のテキストを定義
const texts = [
    "これは・・・", // 最初のテキスト
    "何か切るものはないか・・・",  
    // 追加のテキストをここに書くことができます
];

let currentTextIndex = 0;  // 現在のテキストインデックス

// ページ読み込み時の処理
document.addEventListener("DOMContentLoaded", function() {
    // ローカルストレージから表示フラグを取得
    const hasSeenIntro = localStorage.getItem("hasSeenEnvelopeIntro");

    // フラグが設定されていればテキスト表示をスキップ
    if (hasSeenIntro === "true") {
        console.log("テキストはすでに表示済みです");
        return; // テキスト表示処理を終了
    }

    // テキストエリアの設定
    const textArea = document.getElementById('textArea');
    if (textArea) {
        textArea.innerText = texts[currentTextIndex];

        // テキストエリアがクリックされた時のイベント
        textArea.addEventListener('click', function() {
            // 次のテキストを表示
            currentTextIndex++;

            // 次のテキストがあれば表示、それ以外は消す
            if (currentTextIndex < texts.length) {
                textArea.innerText = texts[currentTextIndex];
            } else {
                textArea.innerText = ""; // すべてのテキストが終わったら消す
                // テキストをすべて表示したらローカルストレージに記録
                localStorage.setItem("hasSeenEnvelopeIntro", "true");
            }
        });
    } else {
        console.error("textArea が見つかりませんでした");
    }
});

window.onload = function () {
    const button = document.querySelector("#envebutton");
    const buttonVisible = localStorage.getItem("envebuttonVisible");

    // ローカルストレージから状態を取得し、ボタンの表示を制御
    if (buttonVisible === "false") {
        button.style.display = "none";  // 非表示にする
    } else {
        button.style.display = "block";  // 表示する
    }

      // BGMを再生
      const bgm = document.getElementById("bgm");
      if (bgm) {
          bgm.play().catch(error => {
              console.log("BGMの再生がブロックされました: ", error);
          });
      }
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


// アイテム使用ボタンのイベントリスナーを設定
document.getElementById("envebutton").addEventListener("click", function() {
    // アイテム（ハサミ）がインベントリにあるかチェック
    let scissors = document.getElementById("slot1").querySelector("img");

    if (scissors && scissors.style.display !== "none") {
      // アイテムがある場合、封筒を開ける処理
      openEnvelope();
      // アイテムを使用済みにする（非表示）
      scissors.style.display = "none";
      // slot2（メモのアイテム）を表示
      document.getElementById("slot2").querySelector("img").style.display = "block";
    } else {
      // アイテムがない場合はメッセージを表示
      showMessage("何か切るものはないか・・？");

      // 少し遅延させて次のメッセージを表示
    setTimeout(function() {
        messageArea.textContent = ""; // テキストを追加
        }, 2000);  // 2秒後に次のテキストを表示
        
    }
  });
  
// 封筒を開ける処理
function openEnvelope() {   
    // テキストエリアにメッセージ表示
    showMessage("よし・・開いた！");

    // 封筒ボタンを非表示にする
    document.querySelector("#envebutton").style.display = "none";  // 封筒ボタンを非表示
    localStorage.setItem("envebuttonVisible", "false");  // ボタンの非表示状態を保存
     
    // アイテム(メモ）をlocalStorageに保存
     localStorage.setItem("item2", "memo");  // アイテム2（メモ）の状態を保存
     localStorage.setItem("imageButtonVisible", "false");  // ボタンの状態も保存
     

    // メモエリアの画像を表示
    let memoArea = document.createElement("img");
    memoArea.src = "/assets/img/memo.png";  // 画像のパスは正しいか確認
    memoArea.alt = "メモ";
    memoArea.id = "memoAreaImage";
    document.querySelector(".image").appendChild(memoArea);

    // メモ画像を前面に表示
    memoArea.style.display = "block";  // メモ画像を表示

    // 最初のメッセージの後に少し待ってから「これは・・・？」というメッセージを表示
    setTimeout(() => {
        showMessage("なんだこれ・・・？");
    }, 2000);  // 2秒の遅延

    // メモを入手したメッセージを表示
    setTimeout(() => {
        showMessage("メモを入手しました");
    }, 4500);  // 4.5秒後

    // メモ画像を非表示にする
    setTimeout(() => {
        memoArea.style.display = "none";  // メモ画像を消す
    }, 6000);  // メモ画像が表示されてから6秒後に非表示にする

    setTimeout(() => {
        showMessage("");
    }, 6500);  

    // ローカルストレージから "item1" を削除
    localStorage.removeItem("item1");

    // スロットの要素を取得して内容を空にする
    const slot1 = document.getElementById("slot1");
}

  // メッセージ表示関数
  function showMessage(message) {
    let textArea = document.getElementById("textArea");
    textArea.innerHTML = message;
  }
  
// 左遷移ボタンのクリックイベント
document.getElementById("leftbutton").addEventListener("click", function() {
    // myroom.htmlに遷移
    window.location.href = "myroom.html";
});
