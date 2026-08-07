// ==============================
// 1. 取得或建立受試者 ID
// ==============================

let participantId = localStorage.getItem("participant_id");

if (!participantId) {
    participantId = crypto.randomUUID();
    localStorage.setItem("participant_id", participantId);
}


// ==============================
// 2. 隨機分派實驗組別
// ==============================

let condition = localStorage.getItem("condition");

if (!condition) {
    // 隨機產生 1、2、3、4
    condition = Math.floor(Math.random() * 4) + 1;

    // 儲存在瀏覽器，避免重新整理後換組
    localStorage.setItem("condition", condition);
}


// ==============================
// 3. 定義四種實驗情境
// ==============================

const scenarios = {

    1: `
        <h2>情境 A</h2>
        <p>
        您目前看到的是第一種實驗情境。
        </p>
    `,

    2: `
        <h2>情境 B</h2>
        <p>
        您目前看到的是第二種實驗情境。
        </p>
    `,

    3: `
        <h2>情境 C</h2>
        <p>
        您目前看到的是第三種實驗情境。
        </p>
    `,

    4: `
        <h2>情境 D</h2>
        <p>
        您目前看到的是第四種實驗情境。
        </p>
    `
};


// ==============================
// 4. 顯示受試者被分派到的情境
// ==============================

document.getElementById("condition-content").innerHTML =
    scenarios[condition];


// ==============================
// 5. 測試用：在 Console 顯示資訊
// ==============================

console.log("Participant ID:", participantId);
console.log("Condition:", condition);
