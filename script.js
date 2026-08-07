// ==========================================
// Google Apps Script Web App URL
// 把下面網址換成你自己的 /exec 網址
// ==========================================

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbw9m1FcRZsF90GUV1DN5FBKn_aOifHixPW2CulXo-V2wDz-nkdmbpoYw57DurO0Ib52/exec";


// ==========================================
// 四種實驗情境
// ==========================================

const scenarios = {

  1: `
    <h2>情境 A</h2>
    <p>
      這裡是 Condition 1 的實驗刺激。
    </p>
  `,

  2: `
    <h2>情境 B</h2>
    <p>
      這裡是 Condition 2 的實驗刺激。
    </p>
  `,

  3: `
    <h2>情境 C</h2>
    <p>
      這裡是 Condition 3 的實驗刺激。
    </p>
  `,

  4: `
    <h2>情境 D</h2>
    <p>
      這裡是 Condition 4 的實驗刺激。
    </p>
  `
};


// ==========================================
// 頁面載入後開始執行
// ==========================================

document.addEventListener("DOMContentLoaded", async function () {

  const container =
    document.getElementById("condition-content");

  // 先顯示載入訊息
  container.innerHTML = `
    <p>正在載入研究內容，請稍候...</p>
  `;


  // ========================================
  // 1. 檢查這個瀏覽器是否已經分過組
  // ========================================

  const savedParticipantId =
    localStorage.getItem("participant_id");

  const savedCondition =
    localStorage.getItem("condition");


  // ========================================
  // 2. 如果已經分過組
  //    直接使用原本的 condition
  // ========================================

  if (savedParticipantId && savedCondition) {

    console.log("使用既有分派");

    console.log(
      "Participant ID:",
      savedParticipantId
    );

    console.log(
      "Condition:",
      savedCondition
    );

    showScenario(savedCondition);

    return;
  }


  // ========================================
  // 3. 如果是新受試者
  //    呼叫 Google Apps Script
  // ========================================

  try {

    const response =
      await fetch(WEB_APP_URL);

    if (!response.ok) {
      throw new Error(
        "伺服器回應錯誤：" + response.status
      );
    }


    // ======================================
    // 4. 取得 Apps Script 回傳的 JSON
    // ======================================

    const data =
      await response.json();


    // ======================================
    // 5. 檢查 randomization 是否成功
    // ======================================

    if (!data.success) {

      throw new Error(
        data.error ||
        "Randomization failed"
      );
    }


    // ======================================
    // 6. 儲存在瀏覽器
    // ======================================

    localStorage.setItem(
      "participant_id",
      data.participant_id
    );

    localStorage.setItem(
      "condition",
      data.condition
    );


    // ======================================
    // 7. 顯示受試者情境
    // ======================================

    console.log(
      "New Participant ID:",
      data.participant_id
    );

    console.log(
      "Assigned Condition:",
      data.condition
    );

    showScenario(data.condition);


  } catch (error) {

    console.error(
      "Randomization Error:",
      error
    );

    container.innerHTML = `
      <h2>系統暫時無法載入</h2>

      <p>
        研究內容載入失敗，請稍後重新整理頁面。
      </p>
    `;
  }

});


// ==========================================
// 顯示實驗情境
// ==========================================

function showScenario(condition) {

  const container =
    document.getElementById(
      "condition-content"
    );

  const conditionNumber =
    Number(condition);

  if (!scenarios[conditionNumber]) {

    container.innerHTML = `
      <p>無法辨識實驗組別。</p>
    `;

    return;
  }

  container.innerHTML =
    scenarios[conditionNumber];
}
