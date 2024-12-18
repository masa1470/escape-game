document.addEventListener("DOMContentLoaded", () => {
    const darkScreen = document.getElementById("dark-screen");
    const textArea = document.getElementById("textArea");
    const bgm = document.getElementById("bgm"); // BGMの要素を取得

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
    }, 2000); // 1秒後にフェードアウト開始

    // ステップ2: フェードアウト後にテキストエリア表示
    darkScreen.addEventListener("transitionend", () => {
        // 3秒後に透明化が完了した後
        textArea.style.display = "block"; // テキストエリアを表示
        textArea.textContent = "ここは・・・";
        textArea.classList.add("fade-in"); // フェードインアニメーション

        // ステップ3: 文字が表示された後に画面を再度暗くする
        setTimeout(() => {
            // 文字が表示された後、画面を再度暗くする
            darkScreen.style.transition = "opacity 3s ease-in-out"; // 画面を暗くする
            darkScreen.style.opacity = "1"; // 画面を完全に暗くする
        }, 3000); // 3秒後に暗く開始
    });

    // ステップ4: 「Normal End」メッセージの表示（innerHTMLを使用）
    setTimeout(() => {
        darkScreen.innerHTML = "<div id='normal-end-message'>Normal End</div>"; // innerHTMLを使用
        darkScreen.style.display = "flex"; // 再表示
        darkScreen.classList.add("fade-in"); // フェードイン
    }, 7000); // 7秒後に「Normal End」を表示

    // ステップ5: ゲーム終了（必要ならここで処理を追加）
    setTimeout(() => {
        console.log("ゲーム終了");
    }, 10000); // 10秒後に終了
});
