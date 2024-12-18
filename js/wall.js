document.addEventListener('DOMContentLoaded', function() {
    // 'passwordwallVerified' が true ならギミックを無効化
    if (localStorage.getItem('passwordwallVerified') === 'true') {
        // ギミック部分を無効化または非表示にする
        const wallContainer = document.getElementById('wallContainer');
        if (wallContainer) {
            wallContainer.style.display = 'none';  // ギミックの部分を非表示にする
        }
        return;  // ギミック処理を終了
    }

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
    const itemSlot = document.getElementById('slot10');
    const itemImage = itemSlot.querySelector('img');

    // 対応する文字リスト
    const charList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // 各フィールドの現在のインデックスを管理
    const values = [0, 0, 0, 0];

    // 3回間違えた回数をローカルストレージから取得（初期値は0）
    let wrongAttempts = parseInt(localStorage.getItem('wrongAttempts')) || 0;
    const maxAttempts = 2;

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
        const correctPassword = '5322';

        if (currentPassword === correctPassword) {
            textArea.textContent = 'パスワードを認証しました';

            // 1秒後に鍵を入手
            setTimeout(function() {
                textArea.textContent = '鍵を入手しました';
                itemImage.style.display = 'block';

                // アイテムを保存
                localStorage.setItem('item10', 'key'); // 鍵を保存
                localStorage.setItem('passwordwallVerified', 'true');

                // ボタンを無効化
                upButtons.forEach(button => (button.disabled = true));
                downButtons.forEach(button => (button.disabled = true));
                numberFields.forEach(field => (field.readOnly = true));
                checkButton.disabled = true;
            }, 500);
        } else {
            wrongAttempts += 1;

            // ローカルストレージに間違えた回数を保存
            localStorage.setItem('wrongAttempts', wrongAttempts);

            if (wrongAttempts >= maxAttempts) {
                localStorage.setItem('passwordwallVerified', 'false');
                localStorage.setItem('item10', 'key'); // 鍵を保存
                // 2回間違えた場合、1秒後にmyroom.htmlに遷移
                textArea.textContent = '残念だったね';

                setTimeout(function() {
                    window.location.href = 'myroom.html';
                }, 1000);
            } else {
                textArea.textContent = 'パスワードが違います';

                // 1.5秒後にメッセージを消す
                setTimeout(function() {
                    textArea.textContent = '';
                }, 1500);
            }
        }
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



// 左遷移ボタンのクリックイベント
document.getElementById("leftbutton").addEventListener("click", function() {
    // myroom.htmlに遷移
    window.location.href = "myroom.html";
});