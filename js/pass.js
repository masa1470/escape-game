    document.addEventListener('DOMContentLoaded', function() {
    // ボタンの要素を取得
    const upButton1 = document.getElementById('upButton1');
    const downButton1 = document.getElementById('downButton1');
    const upButton2 = document.getElementById('upButton2');
    const downButton2 = document.getElementById('downButton2');
    const number1 = document.getElementById('number1');
    const number2 = document.getElementById('number2');
    const checkButton = document.getElementById('checkButton');
    const feedback = document.getElementById('feedback');
  
    let value1 = 0;
    let value2 = 0;
  
    // 上ボタンのクリックイベント
    upButton1.addEventListener('click', function() {
      value1++;
      number1.value = value1;  // 入力フィールドに数値を設定
    });
  
    // 下ボタンのクリックイベント
    downButton1.addEventListener('click', function() {
      value1--;
      number1.value = value1;  // 入力フィールドに数値を設定
    });
  
    upButton2.addEventListener('click', function() {
      value2++;
      number2.value = value2;  // 入力フィールドに数値を設定
    });
  
    downButton2.addEventListener('click', function() {
      value2--;
      number2.value = value2;  // 入力フィールドに数値を設定
    });
  
 // 確認ボタンのクリックイベント
checkButton.addEventListener('click', function() {
  // メッセージを表示するエリアを取得
  const textArea = document.getElementById('textArea');
  const itemSlot = document.getElementById("slot4");
  const itemImage = itemSlot.querySelector("img");

  // 正解確認（仮に目標値が 5 と 3）
  if (value1 === 5 && value2 === 3) {
    textArea.textContent = 'パスワードを認証しました！';

    // 1秒後に電池を入手したメッセージを表示
    setTimeout(function() {
      textArea.textContent = '鍵を入手しました';

      // アイテム4（鍵）を表示
      itemImage.style.display = "block";

      // アイテムをlocalStorageに保存
      localStorage.setItem("item4", "key"); // アイテム4（鍵）の状態を保存

      // 一連の動作が完了したことを記録するフラグ
      localStorage.setItem("passwordVerified", "true");

      
      // パスワード入力機能を無効化する
      upButton1.disabled = true;
      downButton1.disabled = true;
      upButton2.disabled = true;
      downButton2.disabled = true;
      checkButton.disabled = true;
      number1.readOnly = true;
      number2.readOnly = true;
    }, 500); // 1000ミリ秒（1秒）後に実行
  } else {
    textArea.textContent = 'パスワードが違います';
  }

  // 2秒後にメッセージを非表示にする
  setTimeout(function() {
    textArea.textContent = ''; // メッセージを空にする
  }, 1500); // 2500ミリ秒後に実行
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