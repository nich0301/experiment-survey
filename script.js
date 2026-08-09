// ==========================================
// Google Apps Script Web App URL
// ==========================================

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbw9m1FcRZsF90GUV1DN5FBKn_aOifHixPW2CulXo-V2wDz-nkdmbpoYw57DurO0Ib52/exec";


// ==========================================
// Condition Mapping
// ==========================================
//
// 這裡只是把後端回傳的 Condition
// 拆成兩個實驗因子供資料分析使用。
// 不負責 Randomization。
//
// ==========================================

const conditionMap = {

  1: {
    text_emotion: 0,
    avatar_realism: 0
  },

  2: {
    text_emotion: 0,
    avatar_realism: 1
  },

  3: {
    text_emotion: 1,
    avatar_realism: 0
  },

  4: {
    text_emotion: 1,
    avatar_realism: 1
  }

};


// ==========================================
// 四組正式實驗材料
// ==========================================

const scenarios = {

  1: `
    <div class="scenario-box">

      <img
        src="images/c1_01.png"
        class="stimulus-image"
        alt="實驗情境畫面 1"
      >

      <img
        src="images/c1_02.png"
        class="stimulus-image"
        alt="實驗情境畫面 2"
      >

      <img
        src="images/c1_03.png"
        class="stimulus-image"
        alt="實驗情境畫面 3"
      >

    </div>
  `,


  2: `
    <div class="scenario-box">

      <img
        src="images/c2_01.png"
        class="stimulus-image"
        alt="實驗情境畫面 1"
      >

      <img
        src="images/c2_02.png"
        class="stimulus-image"
        alt="實驗情境畫面 2"
      >

      <img
        src="images/c2_03.png"
        class="stimulus-image"
        alt="實驗情境畫面 3"
      >

    </div>
  `,


  3: `
    <div class="scenario-box">

      <img
        src="images/c3_01.png"
        class="stimulus-image"
        alt="實驗情境畫面 1"
      >

      <img
        src="images/c3_02.png"
        class="stimulus-image"
        alt="實驗情境畫面 2"
      >

      <img
        src="images/c3_03.png"
        class="stimulus-image"
        alt="實驗情境畫面 3"
      >

    </div>
  `,


  4: `
    <div class="scenario-box">

      <img
        src="images/c4_01.png"
        class="stimulus-image"
        alt="實驗情境畫面 1"
      >

      <img
        src="images/c4_02.png"
        class="stimulus-image"
        alt="實驗情境畫面 2"
      >

      <img
        src="images/c4_03.png"
        class="stimulus-image"
        alt="實驗情境畫面 3"
      >

    </div>
  `

};


// ==========================================
// 正式問卷
// ==========================================

const questionnaire = {


  // ========================================
  // Page 2
  // 語言線索操弄檢核
  // ========================================

  manipulationText: [

    [
      "TXT_MC1",
      "與 AI 旅遊助理溝通時是否具有人情味？"
    ],

    [
      "TXT_MC2",
      "與 AI 旅遊助理溝通時是否感覺到溫暖？"
    ]

  ],


  // ========================================
  // Page 2
  // 化身線索操弄檢核
  // ========================================

  manipulationAvatar: [

    [
      "AVR_MC1",
      "我認為此 AI 旅遊助理的化身影像具有真實感。"
    ],

    [
      "AVR_MC2",
      "我認為此 AI 旅遊助理的化身影像看起來像真實的旅遊服務人員。"
    ],

    [
      "AVR_MC3",
      "我認為此 AI 旅遊助理具有明確的人物化形象。"
    ]

  ],


  // ========================================
  // Page 3
  //
  // 能力信任
  // 正直信任
  // 知覺風險
  // 旅遊期待
  // 後悔預期
  // ========================================

  page3: [


    // 能力信任

    [
      "CT1",
      "我認為 AI 旅遊助理值得信賴。"
    ],

    [
      "CT2",
      "我認為 AI 旅遊助理能準確地履行其規劃建議與承諾。"
    ],

    [
      "CT3",
      "我認為 AI 旅遊助理將使用者的利益視為首要考量。"
    ],


    // 正直信任

    [
      "IT1",
      "我認為 AI 旅遊助理提供的旅遊資訊是真實的。"
    ],

    [
      "IT2",
      "我認為 AI 旅遊助理在提供旅遊資訊時是誠實的。"
    ],

    [
      "IT3",
      "我認為 AI 旅遊助理會信守其所做出的承諾。"
    ],


    // 知覺風險

    [
      "PR1",
      "我認為向 AI 旅遊助理提供個人資訊具有一定的風險。"
    ],

    [
      "PR2",
      "我認為向 AI 旅遊助理提供個人資訊存在許多不確定性。"
    ],

    [
      "PR3",
      "我認為向 AI 旅遊助理提供個人資訊可能帶來潛在的損失。"
    ],


    // 旅遊期待

    [
      "EXP1",
      "使用 AI 旅遊助理規劃行程，我應該會對這趟旅程感到快樂。"
    ],

    [
      "EXP2",
      "使用 AI 旅遊助理規劃行程，我應該會對這趟旅程感到愉悅。"
    ],

    [
      "EXP3",
      "使用 AI 旅遊助理規劃行程，我應該會對這趟旅程感到滿足。"
    ],


    // 後悔預期

    [
      "REG1",
      "我擔心若採納 AI 旅遊助理提供的旅遊建議，之後可能出現更好的旅遊方案，而讓我感到後悔。"
    ],

    [
      "REG2",
      "我擔心若採納 AI 旅遊助理提供的旅遊建議，實際的旅遊體驗可能不如預期，而讓我感到後悔。"
    ],

    [
      "REG3",
      "我擔心若未採納 AI 旅遊助理提供的旅遊建議，之後可能需要付出較高的旅遊成本，而讓我感到後悔。"
    ],

    [
      "REG4",
      "我擔心若未採納 AI 旅遊助理提供的旅遊建議，事後發現其建議其實是較好的選擇，而讓我感到後悔。"
    ]

  ],


  // ========================================
  // Page 4
  //
  // 依賴意圖
  // 驗證意圖
  // 預訂意圖
  // ========================================

  page4: [


    // 依賴意圖

    [
      "REL1",
      "我對於 AI 旅遊助理所提供的旅遊建議感到放心。"
    ],

    [
      "REL2",
      "我會毫不猶豫地參考 AI 旅遊助理所提供的旅遊建議。"
    ],

    [
      "REL3",
      "我對於 AI 旅遊助理所提供的旅遊建議感到安心。"
    ],

    [
      "REL4",
      "我對於 AI 旅遊助理所提供的旅遊建議感到信賴，並會據以依賴與參考。"
    ],


    // 驗證意圖

    [
      "VER1",
      "面對 AI 旅遊助理所提供的行程建議時，我會主動搜尋行程內容的原始資料出處。"
    ],

    [
      "VER2",
      "面對 AI 旅遊助理所提供的行程建議時，我會檢查行程中的相關資訊是否有更新。"
    ],

    [
      "VER3",
      "面對 AI 旅遊助理所提供的行程建議時，我會查核該行程背後之資訊來源或官方網站的可靠度。"
    ],


    // 預訂意圖

    [
      "BOOK1",
      "我認為使用 AI 旅遊助理協助規劃旅遊，是我規劃旅程的重要方式之一。"
    ],

    [
      "BOOK2",
      "未來規劃旅遊時，我打算更加依賴 AI 旅遊助理協助我進行旅遊規劃與預訂。"
    ],

    [
      "BOOK3",
      "規劃旅遊時，我打算使用 AI 旅遊助理，協助我做出更完善且便利的旅遊預訂決策。"
    ],

    [
      "BOOK4",
      "我認同 AI 旅遊助理所提供的優點，並願意將其運用於旅遊規劃與預訂。"
    ],

    [
      "BOOK5",
      "選擇旅遊產品或服務時，我打算有效運用 AI 旅遊助理協助我進行旅遊預訂。"
    ],

    [
      "BOOK6",
      "若需要預訂旅遊產品或服務，我會優先考慮使用 AI 旅遊助理協助我完成旅遊預訂。"
    ]

  ]

};


// ==========================================
// 建立 7 點 Likert 題
// ==========================================

function createLikertQuestion(id, text) {

  return `
    <div
      class="question"
      data-question="${id}"
    >

      <p class="question-text">
        ${text}
      </p>


      <div class="scale-endpoints">

        <span>
          非常不同意
        </span>

        <span>
          非常同意
        </span>

      </div>


      <div class="likert-scale">

        ${[1, 2, 3, 4, 5, 6, 7]
          .map(value => `

            <label>

              <input
                type="radio"
                name="${id}"
                value="${value}"
              >

              <span>
                ${value}
              </span>

            </label>

          `)
          .join("")}

      </div>


      <div class="error-message">
        此題尚未作答
      </div>

    </div>
  `;

}


// ==========================================
// 建立一般單選題
// ==========================================

function createChoiceQuestion(
  id,
  text,
  options
) {

  return `
    <div
      class="question"
      data-question="${id}"
    >

      <p class="question-text">
        ${text}
      </p>


      <div class="choice-list">

        ${options
          .map(option => `

            <label class="choice-option">

              <input
                type="radio"
                name="${id}"
                value="${option.value}"
              >

              <span>
                ${option.label}
              </span>

            </label>

          `)
          .join("")}

      </div>


      <div class="error-message">
        此題尚未作答
      </div>

    </div>
  `;

}


// ==========================================
// 產生所有量表題目
// ==========================================

function renderQuestions() {

  const txtContainer =
    document.getElementById(
      "TXT_MC_questions"
    );


  if (txtContainer) {

    txtContainer.innerHTML =
      questionnaire
        .manipulationText
        .map(q =>
          createLikertQuestion(
            q[0],
            q[1]
          )
        )
        .join("");

  }


  const avatarContainer =
    document.getElementById(
      "AVR_MC_questions"
    );


  if (avatarContainer) {

    avatarContainer.innerHTML =
      questionnaire
        .manipulationAvatar
        .map(q =>
          createLikertQuestion(
            q[0],
            q[1]
          )
        )
        .join("");

  }


  const page3Container =
    document.getElementById(
      "page3-questions"
    );


  if (page3Container) {

    page3Container.innerHTML =
      questionnaire
        .page3
        .map(q =>
          createLikertQuestion(
            q[0],
            q[1]
          )
        )
        .join("");

  }


  const page4Container =
    document.getElementById(
      "page4-questions"
    );


  if (page4Container) {

    page4Container.innerHTML =
      questionnaire
        .page4
        .map(q =>
          createLikertQuestion(
            q[0],
            q[1]
          )
        )
        .join("");

  }

}


// ==========================================
// 基本資料
// ==========================================

function renderDemographics() {

  const container =
    document.getElementById(
      "demographic-questions"
    );


  if (!container) {
    return;
  }


  const demographics = [


    // D1

    {
      id: "D1",

      text:
        "是否有使用過 AI 旅遊助理（如 ChatGPT、Gemini 等）進行旅遊規劃？",

      options: [

        {
          value: "1",
          label: "是"
        },

        {
          value: "2",
          label: "否"
        }

      ]
    },


    // D2

    {
      id: "D2",

      text:
        "您的性別為何？",

      options: [

        {
          value: "1",
          label: "男性"
        },

        {
          value: "2",
          label: "女性"
        },

        {
          value: "3",
          label: "其他"
        },

        {
          value: "4",
          label: "不願透露"
        }

      ]
    },


    // D3

    {
      id: "D3",

      text:
        "您的年齡為何？",

      options: [

        {
          value: "1",
          label: "20 歲（含）以下"
        },

        {
          value: "2",
          label: "21 歲～30 歲"
        },

        {
          value: "3",
          label: "31 歲～40 歲"
        },

        {
          value: "4",
          label: "41 歲～50 歲"
        },

        {
          value: "5",
          label: "51 歲～60 歲"
        },

        {
          value: "6",
          label: "61 歲（含）以上"
        }

      ]
    },


    // D4

    {
      id: "D4",

      text:
        "您的教育程度為何？",

      options: [

        {
          value: "1",
          label: "高中（職）以下"
        },

        {
          value: "2",
          label: "專科"
        },

        {
          value: "3",
          label: "大學"
        },

        {
          value: "4",
          label: "研究所（含）以上"
        }

      ]
    },


    // D5

    {
      id: "D5",

      text:
        "您的平均年收入為何？",

      options: [

        {
          value: "1",
          label: "36 萬以下"
        },

        {
          value: "2",
          label: "36 萬～50 萬"
        },

        {
          value: "3",
          label: "50 萬～65 萬"
        },

        {
          value: "4",
          label: "65 萬～75 萬"
        },

        {
          value: "5",
          label: "75 萬以上"
        }

      ]
    },


    // D6

    {
      id: "D6",

      text:
        "過去一年自由行次數為何？",

      options: [

        {
          value: "1",
          label: "0 次"
        },

        {
          value: "2",
          label: "1～2 次"
        },

        {
          value: "3",
          label: "3～4 次"
        },

        {
          value: "4",
          label: "5 次以上"
        }

      ]
    },


    // D7

    {
      id: "D7",

      text:
        "使用生成式人工智慧工具（如 ChatGPT、Gemini 等）之頻率為何？",

      options: [

        {
          value: "1",
          label: "從未使用"
        },

        {
          value: "2",
          label: "每月不到 1 次"
        },

        {
          value: "3",
          label: "每月 1–3 次"
        },

        {
          value: "4",
          label: "每週 1–3 次"
        },

        {
          value: "5",
          label: "每週 4 次以上（含每天）"
        }

      ]
    },


    // D8

    {
      id: "D8",

      text:
        "使用 AI 旅遊助理協助規劃旅遊行程之頻率為何？",

      options: [

        {
          value: "1",
          label: "從未使用"
        },

        {
          value: "2",
          label: "很少使用"
        },

        {
          value: "3",
          label: "偶爾使用"
        },

        {
          value: "4",
          label: "經常使用"
        },

        {
          value: "5",
          label: "非常頻繁使用"
        }

      ]
    },


    // D9

    {
      id: "D9",

      text:
        "自評使用生成式人工智慧工具之熟練程度為何？",

      options: [

        {
          value: "1",
          label: "非常不熟練"
        },

        {
          value: "2",
          label: "不太熟練"
        },

        {
          value: "3",
          label: "普通"
        },

        {
          value: "4",
          label: "熟練"
        },

        {
          value: "5",
          label: "非常熟練"
        }

      ]
    },


    // D10

    {
      id: "D10",

      text:
        "過去在規劃旅遊時，您對於網路搜尋到的旅遊資訊，習慣進行「交叉比對與查證」的頻率為何？",

      options: [

        {
          value: "1",
          label: "從不"
        },

        {
          value: "2",
          label: "很少"
        },

        {
          value: "3",
          label: "偶爾"
        },

        {
          value: "4",
          label: "經常"
        },

        {
          value: "5",
          label: "總是"
        }

      ]
    }

  ];


  container.innerHTML =
    demographics
      .map(q =>
        createChoiceQuestion(
          q.id,
          q.text,
          q.options
        )
      )
      .join("");

}


// ==========================================
// 顯示頁面 + 進度條
// ==========================================

function showPage(pageNumber) {

  const totalPages = 4;


  // 隱藏全部頁面

  document
    .querySelectorAll(".page")
    .forEach(page => {

      page.classList.add(
        "hidden"
      );

    });


  // 找到目標頁面

  const targetPage =
    document.getElementById(
      `page-${pageNumber}`
    );


  if (!targetPage) {

    console.warn(
      `找不到 page-${pageNumber}`
    );

    return;

  }


  targetPage.classList.remove(
    "hidden"
  );


  // ========================================
  // Progress
  // ========================================

  const progressMap = {

    1: 0,
    2: 33,
    3: 67,
    4: 100

  };


  const progress =
    progressMap[pageNumber];


  const pageIndicator =
    document.getElementById(
      "page-indicator"
    );


  if (pageIndicator) {

    pageIndicator.textContent =
      `第 ${pageNumber} / ${totalPages} 頁`;

  }


  const progressBar =
    document.getElementById(
      "progress-bar"
    );


  if (progressBar) {

    progressBar.style.width =
      `${progress}%`;

  }


  const progressPercent =
    document.getElementById(
      "progress-percent"
    );


  if (progressPercent) {

    progressPercent.textContent =
      `${progress}%`;

  }


  const progressTrack =
    document.querySelector(
      ".progress-track"
    );


  if (progressTrack) {

    progressTrack.setAttribute(
      "aria-valuenow",
      progress
    );

  }


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


// ==========================================
// 顯示後端分派的實驗 Condition
// ==========================================

function showScenario(condition) {

  const container =
    document.getElementById(
      "condition-content"
    );


  if (!container) {

    console.error(
      "找不到 condition-content"
    );

    return;

  }


  const scenario =
    scenarios[
      Number(condition)
    ];


  if (!scenario) {

    container.innerHTML =
      `
        <div class="system-error">
          無法辨識實驗組別，
          請重新整理頁面。
        </div>
      `;

    return;

  }


  container.innerHTML =
    scenario;

}


// ==========================================
// 取得 Radio Value
// ==========================================

function getRadioValue(id) {

  const element =
    document.querySelector(
      `input[name="${id}"]:checked`
    );


  return element
    ? element.value
    : "";

}


// ==========================================
// 必填檢查
// ==========================================

function validateQuestions(
  questionIds
) {

  let missingCount = 0;

  let firstMissing = null;


  questionIds.forEach(id => {

    const selected =
      document.querySelector(
        `input[name="${id}"]:checked`
      );


    const questionBox =
      document.querySelector(
        `[data-question="${id}"]`
      );


    if (!selected) {

      missingCount++;


      if (questionBox) {

        questionBox.classList.add(
          "question-error"
        );


        if (!firstMissing) {

          firstMissing =
            questionBox;

        }

      }

    } else {

      if (questionBox) {

        questionBox.classList.remove(
          "question-error"
        );

      }

    }

  });


  if (missingCount > 0) {

    alert(
      `尚有 ${missingCount} 題未完成，請完成標示的題目後再繼續。`
    );


    if (firstMissing) {

      firstMissing.scrollIntoView({

        behavior: "smooth",

        block: "center"

      });

    }


    return false;

  }


  return true;

}


// ==========================================
// 已完成者重新開啟問卷
// ==========================================

function showCompletedMessage() {

  const container =
    document.querySelector(
      ".container"
    );


  if (!container) {
    return;
  }


  container.innerHTML = `

    <div class="completion-card">

      <div class="completion-icon">
        ✓
      </div>

      <h2>
        問卷已完成
      </h2>

      <p>
        非常感謝您撥冗參與本研究並完成本次問卷。
      </p>

      <p>
        您的回答已送出，
        無需再次填寫。
      </p>

      <p>
        再次感謝您的支持與協助！
      </p>

    </div>

  `;

}


// ==========================================
// DOM 載入完成
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function () {


    // ======================================
    // 如果這個瀏覽器已完成問卷
    // ======================================

    if (
      localStorage.getItem(
        "survey_completed"
      ) === "true"
    ) {

      showCompletedMessage();

      return;

    }


    // 建立問卷

    renderQuestions();

    renderDemographics();

    showPage(1);



    // ======================================
    // Page 1
    // 同意參與 → 後端 Randomization
    // ======================================

    const consentButton =
      document.getElementById(
        "consent-btn"
      );


    if (consentButton) {

      consentButton.addEventListener(
        "click",
        async function () {

          const button =
            this;


          button.disabled =
            true;


          button.textContent =
            "載入中...";


          // ==================================
          // 先檢查是否已經被分派
          // ==================================

          const savedParticipantId =
            localStorage.getItem(
              "participant_id"
            );


          const savedCondition =
            localStorage.getItem(
              "condition"
            );


          // ==================================
          // 已經分過組
          // 不重新呼叫 doGet()
          // ==================================

          if (
            savedParticipantId &&
            savedCondition
          ) {

            if (
              !localStorage.getItem(
                "survey_start_time"
              )
            ) {

              localStorage.setItem(
                "survey_start_time",
                new Date()
                  .toISOString()
              );

            }


            showScenario(
              savedCondition
            );


            showPage(2);


            return;

          }


          // ==================================
          // 新受試者
          // 呼叫 Google Apps Script doGet()
          // ==================================

          try {

            const response =
              await fetch(
                WEB_APP_URL
              );


            if (!response.ok) {

              throw new Error(
                `Server error: ${response.status}`
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


            // ==================================
            // Code.gs 回傳
            //
            // participant_id
            // condition
            //
            // ==================================

            localStorage.setItem(
              "participant_id",
              data.participant_id
            );


            localStorage.setItem(
              "condition",
              data.condition
            );


            localStorage.setItem(
              "survey_start_time",
              new Date()
                .toISOString()
            );


            console.log(
              "Participant ID:",
              data.participant_id
            );


            console.log(
              "Condition:",
              data.condition
            );


            showScenario(
              data.condition
            );


            showPage(2);


          } catch (error) {

            console.error(
              error
            );


            alert(
              "系統載入失敗，請稍後再試。"
            );


            button.disabled =
              false;


            button.textContent =
              "我已閱讀並同意參與研究";

          }

        }
      );

    }



    // ======================================
    // Page 2 → Page 3
    // ======================================

    const page2NextButton =
      document.getElementById(
        "page2-next"
      );


    if (page2NextButton) {

      page2NextButton.addEventListener(
        "click",
        function () {

          const ids = [

            "AC1",
            "AC2",

            "TXT_MC1",
            "TXT_MC2",

            "AVR_MC1",
            "AVR_MC2",
            "AVR_MC3"

          ];


          if (
            !validateQuestions(ids)
          ) {

            return;

          }


          showPage(3);

        }
      );

    }



    // ======================================
    // Page 3 → Page 4
    // ======================================

    const page3NextButton =
      document.getElementById(
        "page3-next"
      );


    if (page3NextButton) {

      page3NextButton.addEventListener(
        "click",
        function () {

          const ids =
            questionnaire
              .page3
              .map(
                q => q[0]
              );


          if (
            !validateQuestions(
              ids
            )
          ) {

            return;

          }


          showPage(4);

        }
      );

    }



    // ======================================
    // Page 4 Submit
    // ======================================

    const submitButton =
      document.getElementById(
        "submit-btn"
      );


    if (submitButton) {

      submitButton.addEventListener(
        "click",
        async function () {

          const button =
            this;


          // ==================================
          // Page 4 量表題
          // ==================================

          const page4Ids =
            questionnaire
              .page4
              .map(
                q => q[0]
              );


          // ==================================
          // Demographics
          // ==================================

          const demographicIds = [

            "D1",
            "D2",
            "D3",
            "D4",
            "D5",
            "D6",
            "D7",
            "D8",
            "D9",
            "D10"

          ];


          const requiredIds = [

            ...page4Ids,

            ...demographicIds

          ];


          if (
            !validateQuestions(
              requiredIds
            )
          ) {

            return;

          }


          // ==================================
          // Participant
          // ==================================

          const participantId =
            localStorage.getItem(
              "participant_id"
            );


          const condition =
            Number(
              localStorage.getItem(
                "condition"
              )
            );


          const mapping =
            conditionMap[
              condition
            ];


          if (
            !participantId ||
            !mapping
          ) {

            alert(
              "找不到受試者分派資訊，請重新整理頁面後再試。"
            );


            return;

          }


          // ==================================
          // Time
          // ==================================

          const submitTime =
            new Date();


          const savedStartTime =
            localStorage.getItem(
              "survey_start_time"
            );


          const startTime =
            savedStartTime
              ? new Date(
                  savedStartTime
                )
              : new Date();


          const duration =
            Math.round(
              (
                submitTime -
                startTime
              )
              / 1000
            );


          // ==================================
          // 建立資料
          // ==================================

          const data = {

            action:
              "submit",

            participant_id:
              participantId,

            condition:
              condition,

            text_emotion:
              mapping
                .text_emotion,

            avatar_realism:
              mapping
                .avatar_realism,

            AC1:
              getRadioValue(
                "AC1"
              ),

            AC2:
              getRadioValue(
                "AC2"
              ),

            start_time:
              startTime
                .toISOString(),

            submit_time:
              submitTime
                .toISOString(),

            duration_seconds:
              duration

          };


          // ==================================
          // Attention Check
          //
          // AC1：
          // 1 = 澎湖
          //
          // AC2：
          // 3 = 三天兩夜
          // ==================================

          data.attention_pass =
            (
              data.AC1 === "1" &&
              data.AC2 === "3"
            );


          // ==================================
          // Manipulation Check
          // ==================================

          questionnaire
            .manipulationText
            .forEach(q => {

              data[q[0]] =
                getRadioValue(
                  q[0]
                );

            });


          questionnaire
            .manipulationAvatar
            .forEach(q => {

              data[q[0]] =
                getRadioValue(
                  q[0]
                );

            });


          // ==================================
          // Page 3
          // ==================================

          questionnaire
            .page3
            .forEach(q => {

              data[q[0]] =
                getRadioValue(
                  q[0]
                );

            });


          // ==================================
          // Page 4
          // ==================================

          questionnaire
            .page4
            .forEach(q => {

              data[q[0]] =
                getRadioValue(
                  q[0]
                );

            });


          // ==================================
          // Demographics
          // ==================================

          demographicIds
            .forEach(id => {

              data[id] =
                getRadioValue(
                  id
                );

            });


          // ==================================
          // 防止連續按送出
          // ==================================

          button.disabled =
            true;


          button.textContent =
            "送出中...";


          // ==================================
          // POST → Code.gs → Responses
          // ==================================

          try {

            await fetch(
              WEB_APP_URL,
              {

                method:
                  "POST",

                mode:
                  "no-cors",

                headers: {

                  "Content-Type":
                    "text/plain"

                },

                body:
                  JSON.stringify(
                    data
                  )

              }
            );


            // ==================================
            // 本機標記完成
            // ==================================

            localStorage.setItem(
              "survey_completed",
              "true"
            );


            button.textContent =
              "已送出";


            // ==================================
            // 顯示感謝訊息
            // ==================================

            const thankYou =
              document.getElementById(
                "thank-you-message"
              );


            if (thankYou) {

              thankYou
                .classList
                .remove(
                  "hidden"
                );


              thankYou
                .scrollIntoView({

                  behavior:
                    "smooth",

                  block:
                    "center"

                });

            }


          } catch (error) {

            console.error(
              error
            );


            alert(
              "問卷送出失敗，請稍後再試。"
            );


            button.disabled =
              false;


            button.textContent =
              "送出問卷";

          }

        }
      );

    }



    // ======================================
    // 作答後移除紅色提示
    // ======================================

    document.addEventListener(
      "change",
      function (event) {

        const input =
          event.target;


        if (
          input.matches(
            'input[type="radio"]'
          )
        ) {

          const questionBox =
            input.closest(
              ".question"
            );


          if (questionBox) {

            questionBox
              .classList
              .remove(
                "question-error"
              );

          }

        }

      }
    );

  }
);
