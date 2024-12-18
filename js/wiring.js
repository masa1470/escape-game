document.addEventListener('DOMContentLoaded', function () {
    const wires = document.querySelectorAll('.wire');
    const textArea = document.getElementById('textArea'); // textArea を更新するための参照
    const itemSlot = document.getElementById('item7'); // アイテムスロットの参照
  
    // ローカルストレージでカッターを持っているか確認
    const hasCutter = localStorage.getItem('item7') === 'cutter';
  
    // ギミックが既にクリアされているか、失敗しているか確認
    const isCleared = localStorage.getItem('wirePuzzleCleared');
    const isFailed = localStorage.getItem('wirePuzzleFailed');
  
    if (isCleared) {
      textArea.textContent = "すでにクリア済みです";
      wires.forEach(wire => wire.style.pointerEvents = 'none'); // 配線を無効化
      return;
    }
  
    if (isFailed) {
      textArea.textContent = "配線を間違えたため、もう切れません";
      wires.forEach(wire => wire.style.pointerEvents = 'none'); // 配線を無効化
      return;
    }
  
    // 英語の色名から日本語の色名へのマッピング
    const colorMap = {
      red: "赤",
      white: "白",
      black: "黒"
    };
  
    // 正解の色を追跡するセット
    const correctColors = new Set(['red', 'white', 'black']);
    const cutColors = new Set();
  
    // 配線をクリックしたときの処理
    wires.forEach(wire => {
      wire.addEventListener('click', function () {
        // 配線を間違えた場合
        if (isFailed) {
          textArea.textContent = "配線を間違えたため、もう切れません"; // 失敗状態のメッセージ
          return; // それ以降の処理を止める
        }
  
        // カッターを持っていない場合
        if (!hasCutter) {
          textArea.textContent = "何か切るものはないか・・・";
          return;
        }
  
        const wireColor = this.dataset.color;
        const japaneseColor = colorMap[wireColor]; // 英語色名を日本語に変換
  
        // 正しい色を切った場合
        if (correctColors.has(wireColor)) {
          cutColors.add(wireColor);
          this.style.backgroundColor = 'gray'; // 切断された配線の見た目変更
          textArea.textContent = `${japaneseColor}の配線を切りました！`; // 日本語の色名を表示
  
          // 全ての正解色を切った場合
          if (cutColors.size === correctColors.size) {
            textArea.textContent = "電池を入手しました！";
            localStorage.setItem('item9', 'denthi'); // 電池を保存
            localStorage.setItem('wirePuzzleCleared', true); // ギミッククリア状態を保存
            itemSlot7.style.display = "none"; // アイテムスロットを非表示
            wires.forEach(wire => wire.style.pointerEvents = 'none'); // 配線無効化
          }
        } else {
          // 間違えた配線を切った場合
          textArea.textContent = "しまった・・・";
          localStorage.setItem('wirePuzzleFailed', true); // ギミック失敗状態を保存
          wires.forEach(wire => wire.style.pointerEvents = 'none'); // 配線を無効化
        }
      });
    });

    // テキストエリアをクリックしたときにテキストをクリアする
    textArea.addEventListener('click', function () {
      textArea.textContent = ''; // テキストエリアを空にする
    });
});

window.onload = function () {
  // アイテム表示を呼び出し
  displayItems();
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
 // BGMを再生
 const bgm = document.getElementById("bgm");
 if (bgm) {
     bgm.play().catch(error => {
         console.log("BGMの再生がブロックされました: ", error);
     });
 }
}


// living.htmlへの遷移処理
document.getElementById("backbutton").addEventListener("click", function() {
    // myroom.htmlに遷移
    window.location.href = "living.html";
});
