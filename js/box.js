document.addEventListener('DOMContentLoaded', function() {
    // ボタンと入力フィールドを取得
    const upButtons = [
        document.getElementById('upButton1'),
        document.getElementById('upButton2'),
        document.getElementById('upButton3'),
        document.getElementById('upButton4')
    ];
    const downButtons = [
        document.getElementById('downButton1'),
        document.getElementById('downButton2'),
        document.getElementById('downButton3'),
        document.getElementById('downButton4')
    ];
    const numberFields = [
        document.getElementById('number1'),
        document.getElementById('number2'),
        document.getElementById('number3'),
        document.getElementById('number4')
    ];
    const checkButton = document.getElementById('checkButton');
    const textArea = document.getElementById('textArea');
    const itemSlot = document.getElementById('slot3');
    const itemImage = itemSlot.querySelector('img');

    // 対応する文字リスト（自由に変更可能）
    const charList = ['a', 'b', 'c','d', 'e', 'f','g', 'h', 'i','j', 'k', 'l', 'm', 'n', 'o',
                      'p', 'q', 'r','s', 't', 'u','v', 'w', 'x','y', 'z','*', '?', '!', ];

    // 各フィールドの現在のインデックスを管理
    const values = [0, 0, 0, 0];

    // 上下ボタンのイベントを設定
    upButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            values[index] = (values[index] + 1) % charList.length; // インデックスを循環
            numberFields[index].value = charList[values[index]]; // フィールドを更新
        });
    });

    downButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            values[index] = (values[index] - 1 + charList.length) % charList.length; // インデックスを循環
            numberFields[index].value = charList[values[index]]; // フィールドを更新
        });
    });

    // 確認ボタンのクリックイベント
    checkButton.addEventListener('click', function() {
        // 現在の文字列を取得
        const currentPassword = values.map(index => charList[index]).join('');

        // 正解のパスワードを定義
        const correctPassword = '****';

        if (currentPassword === correctPassword) {
            textArea.textContent = 'パスワードを認証しました！';

            // 1秒後に懐中電灯を入手
            setTimeout(function() {
                textArea.textContent = '懐中電灯を入手しました';
                itemImage.style.display = 'block';

                // アイテムを保存
                localStorage.setItem('item3', 'kaityudentou'); // 懐中電灯を保存
                localStorage.setItem('passwordboxVerified', 'true');

                // ボタンを無効化
                upButtons.forEach(button => (button.disabled = true));
                downButtons.forEach(button => (button.disabled = true));
                numberFields.forEach(field => (field.readOnly = true));
                checkButton.disabled = true;
            }, 500);
        } else {
            textArea.textContent = 'パスワードが違います';

            // 1.5秒後にメッセージを消す
            setTimeout(function() {
                textArea.textContent = '';
            }, 1500);
        }
    });
});


  window.onload = function () {
    displayItems();

// アイテムがローカルストレージに保存されている場合、それを表示する関数
function displayItems() {
   // アイテム1（はさみ）を表示
   const item1 = localStorage.getItem("item1");
   if (item1 === "scissors") {
       const itemSlot1 = document.getElementById("slot1");
       const itemImage1 = itemSlot1.querySelector("img");
       if (itemImage1) {
           itemImage1.style.display = "block"; // アイテムを表示
       }
   } else {
       console.log("item1 is not scissors or does not exist."); // 存在しない場合のログ
   }

   // アイテム2（メモ）を表示
   const item2 = localStorage.getItem("item2");
   if (item2 === "memo") {
       const itemSlot2 = document.getElementById("slot2");
       const itemImage2 = itemSlot2.querySelector("img");
       if (itemImage2) {
           itemImage2.style.display = "block"; // アイテムを表示
       }
   }

   // アイテム3（懐中電灯）を表示
   const item3 = localStorage.getItem("item3");
   if (item3 === "kaityudentou") {
       const itemSlot3 = document.getElementById("slot3");
       const itemImage3 = itemSlot3.querySelector("img");
       if (itemImage3) {
           itemImage3.style.display = "block"; // アイテムを表示
       }
   }

    // アイテム4（鍵）を表示
    const item4 = localStorage.getItem("item4");
    if (item4 === "key") {
        const itemSlot4 = document.getElementById("slot4");
        const itemImage4 = itemSlot4.querySelector("img");
        if (itemImage4) {
            itemImage4.style.display = "block"; // アイテムを表示
        }
    }

      // アイテム5（リモコン）を表示
      const item5 = localStorage.getItem("item5");
      if (item5 === "rimokonn") {
          const itemSlot5 = document.getElementById("slot5");
          const itemImage5 = itemSlot5.querySelector("img");
          if (itemImage5) {
              itemImage5.style.display = "block"; // アイテムを表示
          }
      }


    // アイテム7（カッター）を表示
    const item7 = localStorage.getItem("item7");
    if (item7 === "cutter") {
        const itemSlot7 = document.getElementById("slot7");
        const itemImage7 = itemSlot7.querySelector("img");
        if (itemImage7) {
            itemImage7.style.display = "block"; // アイテムを表示
        }
    }
     // アイテム9（電池）を表示
     const item9 = localStorage.getItem("item9");
     if (item9 === "denthi") {
         const itemSlot9 = document.getElementById("slot9");
         const itemImage9 = itemSlot9.querySelector("img");
         if (itemImage9) {
             itemImage9.style.display = "block"; // アイテムを表示
         }
     }

     // アイテム10（鍵）を表示
     const item10 = localStorage.getItem("item10");
     if (item10 === "key") {
         const itemSlot10 = document.getElementById("slot10");
         const itemImage10 = itemSlot10.querySelector("img");
         if (itemImage10) {
             itemImage10.style.display = "block"; // アイテムを表示
         }
     }
 }
  // BGMを再生
  const bgm = document.getElementById("bgm");
  if (bgm) {
      bgm.play().catch(error => {
          console.log("BGMの再生がブロックされました: ", error);
      });
  }
};

  

  // top.htmlへの遷移処理
document.getElementById("topbutton").addEventListener("click", function () {
    window.location.href = "living.html";
});