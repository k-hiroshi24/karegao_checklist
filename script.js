document.addEventListener('DOMContentLoaded', () => {
    // --- DOM要素の取得 ---
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');

    const startBtn = document.getElementById('start-btn');
    const answerButtons = document.querySelectorAll('.answer-btn');
    const restartBtn = document.getElementById('restart-btn');
    const backBtn = document.getElementById('back-btn'); // 戻るボタン

    const questionEl = document.getElementById('question');
    const categoryTitleEl = document.getElementById('category-title'); // カテゴリ表示用
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');

    // --- 質問項目（ダミー） ---
    const questions = [
        // 表情・顔編
        { category: '表情・顔編', text: '朝、顔色がくすんでいる' },
        { category: '表情・顔編', text: '口角が下がっている' },
        { category: '表情・顔編', text: '目の輝きが減ってきた' },
        { category: '表情・顔編', text: 'ほうれい線が深くなった' },
        { category: '表情・顔編', text: '頬がこけてきた／張りがない' },
        { category: '表情・顔編', text: '「笑ってるのに疲れて見える」と言われる' },
        { category: '表情・顔編', text: '眉間にしわが入りやすい' },
        { category: '表情・顔編', text: 'あごのたるみが気になる' },
        { category: '表情・顔編', text: '無意識にへの字口になっている' },
        { category: '表情・顔編', text: 'メイクをしても冴えない感じがする' },
        // 身体・感覚編
        { category: '身体・感覚編', text: '朝起きても疲れが残っている' },
        { category: '身体・感覚編', text: '日中ボーッとする時間が増えた' },
        { category: '身体・感覚編', text: '呼吸が浅いと自覚している' },
        { category: '身体・感覚編', text: '歩くとき足が重い／すり足になっている' },
        { category: '身体・感覚編', text: '姿勢が猫背気味、胸が開かない' },
        { category: '身体・感覚編', text: '頭皮が硬い・顔がむくみやすい' },
        { category: '身体・感覚編', text: '肩こり・首こりがいつもある' },
        { category: '身体・感覚編', text: '「背中に死んだ魚を背負ってる」と感じるときがある' },
        { category: '身体・感覚編', text: '疲れると声が小さくなる' },
        { category: '身体・感覚編', text: '睡眠が浅い、夜中に目が覚める' },
        // 心・行動編
        { category: '心・行動編', text: '心から笑う機会が減った' },
        { category: '心・行動編', text: '人に会うのがちょっと億劫' },
        { category: '心・行動編', text: '「やる気が出ない日」が週に何度もある' },
        { category: '心・行動編', text: '鏡を見るのがちょっと嫌' },
        { category: '心・行動編', text: '昔よりも「今の自分の顔」が好きじゃなくなっている' },
    ];

    // --- 変数定義 ---
    let currentQuestionIndex = 0;
    let yesCount = 0;
    let answerHistory = []; // 回答履歴を保存する配列

    // --- イベントリスナー ---
    startBtn.addEventListener('click', startQuiz);
    answerButtons.forEach(button => {
        button.addEventListener('click', handleAnswer);
    });
    restartBtn.addEventListener('click', restartQuiz);
    backBtn.addEventListener('click', goBack); // 戻るボタンのイベント

    // --- 関数定義 ---

    // クイズを開始する
    function startQuiz() {
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        currentQuestionIndex = 0;
        yesCount = 0;
        answerHistory = []; // 履歴をリセット
        showQuestion();
    }

    // 質問を表示し、プログレスバーを更新する
    function showQuestion() {
        const question = questions[currentQuestionIndex];
        categoryTitleEl.textContent = question.category;
        questionEl.textContent = question.text;
        updateProgress();
        // 最初の質問では戻るボタンを無効化
        backBtn.disabled = currentQuestionIndex === 0;
    }

    // 回答を処理する
    function handleAnswer(event) {
        const answer = event.target.dataset.answer;
        answerHistory.push(answer); // 回答を履歴に保存

        if (answer === 'yes') {
            yesCount++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    // 結果を表示する
    function showResult() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        let title = '';
        let text = '';
        let resultClass = '';

        if (yesCount <= 5) {
            title = 'イキイキ上級者';
            text = 'あなたはまだまだイキイキ顔！<br>日々の呼吸や姿勢の整いが、あなたの若々しさを支えています。<br>今の状態を保つために、「深い呼吸」「笑顔」「日常のボディケア」をぜひ続けてください。';
            resultClass = 'level-1';
        } else if (yesCount <= 10) {
            title = 'ちょい枯れ予備軍';
            text = '油断すると“枯れ顔”に傾くかも…？<br>ちょっと疲れが顔に出やすくなってきた頃。<br>呼吸が浅くなったり、笑顔が減っていませんか？<br>“見た目より中身”のケアを今から意識すると10年後に差が出ます！';
            resultClass = 'level-2';
        } else if (yesCount <= 15) {
            title = '酸素不足型 枯顔シグナル';
            text = '顔だけじゃない。体の中も“酸素不足”かもしれません。<br>呼吸、姿勢、顔の筋肉の動き…それぞれが弱くなると、表情まで枯れていきます。<br>今が“潤いの分かれ道”。日常の酸素循環を取り戻すケアを始めましょう。';
            resultClass = 'level-3';
        } else if (yesCount <= 20) {
            title = '枯顔リスク 高';
            text = '表情筋と回復力が、かなり弱ってきています。<br>「顔が疲れて見える」「メイクが乗らない」など、外見以上に中の巡りが止まり始めているサイン。<br>“顔から変える”のではなく、“酸素と回復力から変える”ケアを急ぎましょう。';
            resultClass = 'level-4';
        } else {
            title = '枯顔症候群 発症レベル';
            text = '顔も体も、内側から潤いを失いかけています。<br>化粧やマッサージではどうにもならない段階に来ているかも。<br>本気で変えるなら、体全体のリセットが必要です。今が変わる最大のチャンス！';
            resultClass = 'level-5';
        }

        resultTitle.textContent = title;
        resultText.innerHTML = text; // <br>を解釈するためにinnerHTMLを使用
        
        // 前のクラスを削除してから新しいクラスを追加
        resultTitle.className = '';
        resultTitle.classList.add(resultClass);
    }

    // １つ前の質問に戻る
    function goBack() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            const lastAnswer = answerHistory.pop(); // 直前の回答を取得
            if (lastAnswer === 'yes') {
                yesCount--; // yesカウントを減らす
            }
            showQuestion();
        }
    }

    // クイズをリセットする
    function restartQuiz() {
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }

    // プログレスバーとテキストを更新する
    function updateProgress() {
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
    }
});
