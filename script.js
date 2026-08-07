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
    <h1>情境 A</h1>

    <p>
      這裡放 Condition 1 的正式實驗刺激。
    </p>
  `,

  2: `
    <h1>情境 B</h1>

    <p>
      這裡放 Condition 2 的正式實驗刺激。
    </p>
  `,

  3: `
    <h1>情境 C</h1>

    <p>
      這裡放 Condition 3 的正式實驗刺激。
    </p>
  `,

  4: `
    <h1>情境 D</h1>

    <p>
      這裡放 Condition 4 的正式實驗刺激。
    </p>
  `
};


// ==========================================
// Page elements
// ==========================================

const consentPage =
  document.getElementById("consent-page");

const scenarioPage =
  document.getElementById("scenario-page");

const questionnairePage =
  document.getElementById("questionnaire-page");

const consentBtn =
  document.getElementById("consent-btn");

const scenarioNextBtn =
  document.getElementById("scenario-next-btn");

const conditionContent =
  document.getElementById("condition-content");

const loadingMessage =
  document.getElementById("loading-message");


// ==========================================
// Consent button
// ==========================================

consentBtn.addEventListener(
  "click",
  async function () {

    // 防止使用者重複點擊
    consentBtn.disabled = true;
    consentBtn.textContent = "載入中...";


    // --------------------------------------
    // 先檢查是否曾經完成 randomization
    // --------------------------------------

    const savedParticipantId =
      localStorage.getItem("participant_id");

    const savedCondition =
      localStorage.getItem("condition");


    // --------------------------------------
    // 如果已經有分組資料
    // 不重新呼叫 Apps Script
    // --------------------------------------

    if (savedParticipantId && savedCondition) {

      showScenario(savedCondition);

      consentPage.classList.add("hidden");
      scenarioPage.classList.remove("hidden");

      return;
    }


    // --------------------------------------
    // 新受試者：呼叫 Apps Script
    // --------------------------------------

    try {

      const response =
        await fetch(WEB_APP_URL);

      if (!response.ok) {

        throw new Error(
          "Server error: " +
          response.status
        );
      }


      const data =
        await response.json();


      if (!data.success) {

        throw new Error(
          data.error ||
          "Randomization failed"
        );
      }


      // ------------------------------------
      // 儲存 participant 與 condition
      // ------------------------------------

      localStorage.setItem(
        "participant_id",
        data.participant_id
      );

      localStorage.setItem(
        "condition",
        data.condition
      );


      // ------------------------------------
      // 顯示實驗情境
      // ------------------------------------

      showScenario(data.condition);

      consentPage.classList.add("hidden");

      scenarioPage.classList.remove("hidden");


      console.log(
        "Participant ID:",
        data.participant_id
      );

      console.log(
        "Condition:",
        data.condition
      );


    } catch (error) {

      console.error(error);

      alert(
        "系統目前無法載入研究內容，請稍後再試。"
      );

      consentBtn.disabled = false;
      consentBtn.textContent =
        "我同意參與研究";
    }

  }
);


// ==========================================
// 顯示情境
// ==========================================

function showScenario(condition) {

  const conditionNumber =
    Number(condition);


  if (!scenarios[conditionNumber]) {

    conditionContent.innerHTML =
      "<p>無法辨識實驗組別。</p>";

    return;
  }


  loadingMessage.classList.add("hidden");

  conditionContent.innerHTML =
    scenarios[conditionNumber];

  scenarioNextBtn.classList.remove("hidden");
}


// ==========================================
// Scenario → Questionnaire
// ==========================================

scenarioNextBtn.addEventListener(
  "click",
  function () {

    scenarioPage.classList.add("hidden");

    questionnairePage.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);
