// ===== 診断データ =====

// 15問の質問
const questions = [
    // セクション1: 他者評価への執着
    {
        id: 1,
        text: "他人からの批判や意見が気になって、行動をためらうことがある"
    },
    {
        id: 2,
        text: "誰かに嫌われたくないために、本当の気持ちを抑えることがある"
    },
    {
        id: 3,
        text: "SNSで他人の反応が気になり、投稿内容を変えることがある"
    },
    {
        id: 4,
        text: "周囲の期待に応えられないと、自分を責める傾向がある"
    },
    {
        id: 5,
        text: "有名人や身近な人の意見に強く影響を受けることが多い"
    },
    // セクション2: 行動基準
    {
        id: 6,
        text: "やりたいことが何か、はっきり分かっていない"
    },
    {
        id: 7,
        text: "判断するときは「一般的には」「みんなは」という基準を参考にする"
    },
    {
        id: 8,
        text: "自分の意見よりも、周囲の意見に合わせることが多い"
    },
    {
        id: 9,
        text: "誘われると断りにくく、本当はしたくないこともやってしまう"
    },
    {
        id: 10,
        text: "人生の大きな決断でも、親や友人のアドバイスに頼ってしまう"
    },
    // セクション3: 自己認識
    {
        id: 11,
        text: "自分の強みが何か、よく分からない"
    },
    {
        id: 12,
        text: "将来のビジョンや目標が曖昧である"
    },
    {
        id: 13,
        text: "何をやりたいのか迷ったときに、自分に問い直す習慣がない"
    },
    {
        id: 14,
        text: "自分の価値観が何か、明確には答えられない"
    },
    {
        id: 15,
        text: "人生において「譲れない価値」を持っていない"
    }
];

// 結果タイプ定義
const resultTypes = {
    typeA: {
        name: "🔴 他人軸が強いタイプ",
        scoreRange: [15, 30],
        message: "現在、多くの決断を周囲の期待や評価に委ねてしまっていますね。これはあなたが周囲を大切にする優しい人だからこそ。ただ、このままでは自分の人生を生きているとは言えません。",
        actions: [
            "小さなことから「自分の気持ちを優先する」習慣をつける",
            "「これは自分が本当にやりたいのか？」と自問する時間を増やす",
            "1人で過ごす時間を意識的に作る"
        ],
        ctaText: "あなたの自分軸を育てるために、7日間のメール講座で段階的に学んでいきませんか？"
    },
    typeB: {
        name: "🟡 混合型",
        scoreRange: [31, 50],
        message: "場面によって自分軸と他人軸のバランスが変わっていますね。これは実は多くの人の状態です。重要なのは「いつ他人軸になるのか」を認識し、大切な場面では自分軸を優先できるようになることです。",
        actions: [
            "「どんなときに他人軸になるのか」を観察する",
            "自分の価値観を言語化する練習をする",
            "信頼できる人との対話を通じて自分を知る"
        ],
        ctaText: "このバランスをさらに自分軸寄りにシフトさせるための実践的なメール講座をご用意しています。"
    },
    typeC: {
        name: "🟢 バランス型",
        scoreRange: [51, 65],
        message: "他人の意見を参考にしつつも、自分軸を持って行動できていますね。このバランス感覚はとても大切です。ここからは、この自分軸をさらに磨き、より確かなものにしていく段階です。",
        actions: [
            "現在の自分軸を大事にしながら、さらに磨き続ける",
            "他者を支援する立場になることで、人生がより豊かになる",
            "自分の選択が本当に自分軸から来ているか、定期的に振り返る"
        ],
        ctaText: "あなたの自分軸をさらに強化し、人生を充実させるための次のステップをお届けします。"
    },
    typeD: {
        name: "🔵 自分軸が強いタイプ",
        scoreRange: [66, 75],
        message: "あなたは自分の人生を主体的に生きていますね。自分軸が確立されているあなただからこそ、その選択に迷いがなく、人生が充実しているはずです。",
        actions: [
            "その自分軸を大事にしながら、他者の意見も柔軟に受け入れる",
            "自分の経験や学びを、周囲とシェアして社会に貢献する",
            "さらに高いレベルの自己実現へ向けて、自分軸を進化させ続ける"
        ],
        ctaText: "自分軸から社会へ貢献するあなたのための、次なるステップをお届けします。"
    }
};

// ===== グローバル変数 =====
let currentQuestionIndex = 0;
const answers = new Array(15).fill(null); // 各質問の回答を記録
let currentScore = 0;

// ===== DOM要素 =====
const topSection = document.getElementById('topSection');
const quizSection = document.getElementById('quizSection');
const resultSection = document.getElementById('resultSection');

const startBtn = document.getElementById('startBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');

const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const currentQuestionText = document.getElementById('currentQuestion');
const progressFill = document.querySelector('.progress-fill');

const resultIcon = document.getElementById('resultIcon');
const resultType = document.getElementById('resultType');
const resultMessage = document.getElementById('resultMessage');
const actionsList = document.getElementById('actionsList');
const scoreValue = document.getElementById('scoreValue');
const scoreProgress = document.getElementById('scoreProgress');
const ctaButton = document.getElementById('ctaButton');
const ctaText = document.getElementById('ctaText');

const shareTwitter = document.getElementById('shareTwitter');
const shareLineBtn = document.getElementById('shareLineBtn');

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    startBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);

    shareTwitter.addEventListener('click', shareOnTwitter);
    shareLineBtn.addEventListener('click', shareOnLine);

    // メルマガ登録URLを設定（ユーザーが自分のURLに置き換える）
    const mailchimpUrl ='https://utage-system.com/p/Wgv0LketgpPn'; // ここを自分のフォームURLに置き換え
    ctaButton.href = mailchimpUrl;
});

// ===== クイズ開始 =====
function startQuiz() {
    topSection.classList.remove('visible');
    quizSection.classList.add('visible');
    currentQuestionIndex = 0;
    answers.fill(null);
    displayQuestion();
    updateNavigation();
}

// ===== 質問表示 =====
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.text;
    currentQuestionText.textContent = currentQuestionIndex + 1;

    // プログレスバー更新
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';

    // 選択肢を生成
    optionsContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const label = document.createElement('label');
        label.className = 'radio-option';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = i;
        if (answers[currentQuestionIndex] === i) {
            input.checked = true;
        }
        input.addEventListener('change', (e) => {
            answers[currentQuestionIndex] = parseInt(e.target.value);
            updateNavigation();
        });

        const span = document.createElement('span');
        span.className = 'radio-label';
        span.textContent = i === 1 ? '全く当てはまらない' :
                          i === 5 ? '非常に当てはまる' :
                          '';

        label.appendChild(input);
        label.appendChild(span);
        optionsContainer.appendChild(label);
    }
}

// ===== ナビゲーション更新 =====
function updateNavigation() {
    // 前へボタン
    prevBtn.disabled = currentQuestionIndex === 0;

    // 次へボタン
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isAnswered = answers[currentQuestionIndex] !== null;

    if (isLastQuestion && isAnswered) {
        nextBtn.textContent = '診断結果を見る';
    } else {
        nextBtn.textContent = '次へ';
    }

    nextBtn.disabled = !isAnswered;
}

// ===== 次の質問へ =====
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        updateNavigation();
    } else if (currentQuestionIndex === questions.length - 1) {
        // 診断完了 → 結果表示
        calculateScore();
        displayResult();
    }
}

// ===== 前の質問へ =====
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateNavigation();
    }
}

// ===== スコア計算 =====
function calculateScore() {
    // 1〜5の合計（15〜75点）
    const rawScore = answers.reduce((sum, val) => sum + val, 0);

    // 主導権スコア（逆算）: (75 - rawScore) + 15 = 15〜75
    // つまり、他人軸が強い（高スコア）ほど、主導権スコアが低くなる
    // 自分軸が強い（低スコア）ほど、主導権スコアが高くなる
    currentScore = (75 - rawScore) + 15;
}

// ===== 結果表示 =====
function displayResult() {
    quizSection.classList.remove('visible');
    resultSection.classList.add('visible');

    // スコアに応じて結果タイプを決定
    let selectedType = null;
    if (currentScore >= 15 && currentScore <= 30) {
        selectedType = resultTypes.typeA;
    } else if (currentScore >= 31 && currentScore <= 50) {
        selectedType = resultTypes.typeB;
    } else if (currentScore >= 51 && currentScore <= 65) {
        selectedType = resultTypes.typeC;
    } else if (currentScore >= 66 && currentScore <= 75) {
        selectedType = resultTypes.typeD;
    }

    // 結果を表示
    if (selectedType) {
        // アイコン
        const iconEmoji = selectedType.name.split(' ')[0];
        resultIcon.textContent = iconEmoji;

        // タイプ名
        resultType.textContent = selectedType.name;

        // メッセージ
        resultMessage.textContent = selectedType.message;

        // アクション
        actionsList.innerHTML = '';
        selectedType.actions.forEach(action => {
            const li = document.createElement('li');
            li.textContent = action;
            actionsList.appendChild(li);
        });

        // スコア表示
        scoreValue.textContent = currentScore;
        const scorePercent = ((currentScore - 15) / (75 - 15)) * 100;
        scoreProgress.style.width = scorePercent + '%';

        // CTA文言
        ctaText.textContent = selectedType.ctaText;
    }

    // ページトップへスクロール
    window.scrollTo(0, 0);
}

// ===== 診断をやり直す =====
function restartQuiz() {
    resultSection.classList.remove('visible');
    topSection.classList.add('visible');
    currentQuestionIndex = 0;
    answers.fill(null);
    currentScore = 0;
    window.scrollTo(0, 0);
}

// ===== SNS シェア機能 =====

// Twitter（X）シェア
function shareOnTwitter() {
    const text = encodeURIComponent(
        `【人生の主導権診断】\nあなたの主導権スコア：${currentScore}/75点\n\nあなたは自分軸で生きていますか？それとも他人軸ですか？\nたった15問で診断できます！\n\n`
    );
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, '_blank');
}

// LINE シェア
function shareOnLine() {
    const text = encodeURIComponent(
        `人生の主導権診断\nあなたのスコア：${currentScore}/75点\n\n自分軸vs他人軸\nあなたはどちらで生きていますか？\n`
    );
    const url = encodeURIComponent(window.location.href);
    const lineUrl = `https://line.me/R/msg/text/?${text}${url}`;
    window.open(lineUrl, '_blank');
}

// ===== ページロード時の処理 =====
window.addEventListener('load', () => {
    // アニメーション用にvisibleクラスを初期表示
    topSection.classList.add('visible');
});
