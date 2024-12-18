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

document.addEventListener("DOMContentLoaded", () => {
    const darkScreen = document.getElementById("dark-screen");
    const textArea = document.getElementById("textArea");
    const bgm = document.getElementById("bgm"); // BGMの要素を取得
    const footstepSound = new Audio("/assets/sound/家の階段を駆け上る.mp3"); // 足音の音を追加

    // BGMがある場合、再生
    if (bgm) {
        bgm.play().catch(error => {
            console.log("BGMの再生がブロックされました: ", error);
        });
    }

    // ステップ1: 初期の真っ暗画面（長めに待機）
    setTimeout(() => {
        darkScreen.style.transition = "opacity 3s ease-in-out"; // アニメーション開始
        darkScreen.style.opacity = "0"; // 画面をフェードアウト
    }, 5000); // 8秒後にフェードアウト開始（長く設定）

    // ステップ2: 足音の音を再生
    setTimeout(() => {
        footstepSound.play().catch(error => {
            console.log("足音の再生がブロックされました: ", error);
        });
    }, 8000); // 画面が暗くなった後に足音を再生

    // ステップ3: 急に真っ暗になり、赤文字で「どこにいくの・・・？」を表示
    setTimeout(() => {
        darkScreen.style.transition = "opacity 2s ease-in-out"; // 急に暗くなる
        darkScreen.style.opacity = "1"; // 画面を完全に暗くする
        const badEndMessage = document.createElement("div");
        badEndMessage.id = "bad-end-message";
        badEndMessage.textContent = "どこにいくの・・・？";
        badEndMessage.style.color = "red"; // 赤文字に設定
        badEndMessage.style.fontSize = "40px"; // 大きな文字
        badEndMessage.style.textAlign = "center";
        badEndMessage.style.position = "absolute";
        badEndMessage.style.top = "40%";
        badEndMessage.style.left = "40%";
        badEndMessage.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(badEndMessage); // メッセージを画面に追加
    }, 10000); // 15秒後にメッセージ表示

    // ステップ4: 怖い画像を表示
    setTimeout(() => {
        const scaryImage = new Image();
        scaryImage.src = "/assets/img/kowai.jpg"; // 怖い画像のパス
        scaryImage.style.position = "absolute";
        scaryImage.style.top = "50%";
        scaryImage.style.left = "50%";
        scaryImage.style.transform = "translate(-50%, -50%)";
        scaryImage.style.width = "80%"; // 画像のサイズ調整

        // 画像が読み込まれた後に表示
        scaryImage.onload = function () {
            document.body.appendChild(scaryImage); // 画像を画面に追加
        };

        // 画像の読み込み失敗時のエラーハンドリング
        scaryImage.onerror = function () {
            console.log("画像の読み込みに失敗しました。パスを確認してください。");
        };
    }, 11000); // 18秒後に怖い画像表示

     // ステップ5: 「Normal End」メッセージの表示（innerHTMLを使用）
     setTimeout(() => {
        darkScreen.innerHTML = "<div id='bad-end-message'>Bad End</div>"; // innerHTMLを使用
        darkScreen.style.display = "flex"; // 再表示
        darkScreen.classList.add("fade-in"); // フェードイン
    }, 14000); // 7秒後に「bad End」を表示

    // ステップ6: ゲーム終了（必要ならここで処理を追加）
    setTimeout(() => {
        console.log("ゲーム終了");
    }, 15000); // 22秒後に終了
});
