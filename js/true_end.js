document.addEventListener("DOMContentLoaded", () => {
    const darkScreen = document.getElementById("dark-screen");
    const textArea = document.getElementById("textArea");
    const bgm = document.getElementById("bgm"); // BGMの要素を取得

    const typeText = (element, text, delay, callback) => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index]; // 1文字ずつ追加
                index++;
            } else {
                clearInterval(interval); // 文字列がすべて表示されたら停止
                if (callback) callback(); // コールバック関数があれば実行
            }
        }, delay);
    };

    // BGMを再生する
    if (bgm) {
        bgm.play().catch(error => {
            console.log("BGMの再生がブロックされました: ", error);
        });
    }

    // ステップ1: 初期の真っ暗画面（数秒後にフェードアウト）
    setTimeout(() => {
        darkScreen.style.transition = "opacity 3s ease-in-out"; // アニメーション開始
        darkScreen.style.opacity = "0"; // 画面をフェードアウト
    }, 2000); // 2秒後にフェードアウト開始

    // ステップ2: フェードアウト後にテキストエリアで文字を一文字ずつ表示
    darkScreen.addEventListener("transitionend", () => {
        textArea.style.display = "block"; // テキストエリアを表示
        typeText(textArea, "おはようございます。気分はどうですか？", 100, () => {
            // テキストの表示完了後
            setTimeout(() => {
                textArea.textContent = ""; // テキストエリアをクリア
                typeText(textArea, "・・・・・・・・・・・・・え?", 200, () => {
                    // すべての文字の表示が終わった後、画面を暗転
                    setTimeout(() => {
                        darkScreen.style.transition = "opacity 3s ease-in-out";
                        darkScreen.style.opacity = "1"; // 画面を暗くする
                    }, 1000); // 1秒後に暗転開始
                });
            }, 1000); // 最初のメッセージが表示された後、1秒待ってクリア
        });
    });

    // ステップ3: 「TRUE End」メッセージの表示
    setTimeout(() => {
        darkScreen.innerHTML = "<div id='true-end-message'>TRuE End</div>";
        darkScreen.style.display = "flex"; // 再表示
        darkScreen.classList.add("fade-in"); // フェードイン
    }, 9000); // 9秒後に「TRUE End」を表示 

    // ステップ4: ゲーム終了（必要ならここで処理を追加）
    setTimeout(() => {
        console.log("ゲーム終了");
    }, 12000); // 12秒後に終了
});
