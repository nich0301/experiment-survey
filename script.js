// ==========================================
// Google Apps Script Web App URL
// 把下面網址換成你自己的 /exec 網址
// ==========================================

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbw9m1FcRZsF90GUV1DN5FBKn_aOifHixPW2CulXo-V2wDz-nkdmbpoYw57DurO0Ib52/exec";

// ==============================
// 問卷開始時間
// ==============================

const startTime = new Date();


// ==============================
// Condition Mapping
// ==============================

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


// ==============================
// 四種情境
// ==============================

const scenarios = {

// ==============================
// 四種實驗情境
// 每個 Condition 包含 3 張連續圖片
// ==============================

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


// ==============================
// 題目設定
// ==============================

const questionnaire = {

  manipulationText: [
    ["TXT_MC1", "文字情緒操弄檢查題 1"],
    ["TXT_MC2", "文字情緒操弄檢查題 2"]
  ],

  manipulationAvatar: [
    ["AVR_MC1", "化身樣貌真實性操弄檢查題 1"],
    ["AVR_MC2", "化身樣貌真實性操弄檢查題 2"],
    ["AVR_MC3", "化身樣貌真實性操弄檢查題 3"]
  ],

  page3: [

    ["CT1", "能力信任題 1"],
    ["CT2", "能力信任題 2"],
    ["CT3", "能力信任題 3"],

    ["IT1", "正直信任題 1"],
    ["IT2", "正直信任題 2"],
    ["IT3", "正直信任題 3"],

    ["PR1", "知覺風險題 1"],
    ["PR2", "知覺風險題 2"],
    ["PR3", "知覺風險題 3"],

    ["EXP1", "旅遊期待題 1"],
    ["EXP2", "旅遊期待題 2"],
    ["EXP3", "旅遊期待題 3"],

    ["REG1", "後悔預期題 1"],
    ["REG2", "後悔預期題 2"],
    ["REG3", "後悔預期題 3"]

  ],

  page4: [

    ["REL1", "依賴意圖題 1"],
    ["REL2", "依賴意圖題 2"],
    ["REL3", "依賴意圖題 3"],
    ["REL4", "依賴意圖題 4"],

    ["VER1", "驗證意圖題 1"],
    ["VER2", "驗證意圖題 2"],
    ["VER3", "驗證意圖題 3"],

    ["BOOK1", "預訂意圖題 1"],
    ["BOOK2", "預訂意圖題 2"],
    ["BOOK3", "預訂意圖題 3"],
    ["BOOK4", "預訂意圖題 4"],
    ["BOOK5", "預訂意圖題 5"],
    ["BOOK6", "預訂意圖題 6"]

  ]

};


// ==============================
// 建立 Likert 題
// ==============================

function createLikertQuestion(id, text) {

  return `
    <div class="question">

      <p>${text}</p>

      <div class="likert-scale">

        <label>
          <input type="radio"
                 name="${id}"
                 value="1">
          1
        </label>

        <label>
          <input type="radio"
                 name="${id}"
                 value="2">
          2
        </label>

        <label>
          <input type="radio"
                 name="${id}"
                 value="3">
          3
        </label>

        <label>
          <input type="radio"
                 name="${id}"
                 value="4">
          4
        </label>

        <label>
          <input type="radio"
                 name="${id}"
                 value="5">
          5
        </label>

        <label>
          <input type="radio"
                 name="${id}"
                 value="6">
          6
        </label>

        <label>
          <input type="radio"
                 name="${id}"
                 value="7">
          7
        </label>

      </div>

    </div>
  `;
}


// ==============================
// 產生題目
// ==============================

function renderQuestions() {

  document.getElementById(
    "TXT_MC_questions"
  ).innerHTML =
    questionnaire.manipulationText
      .map(q => createLikertQuestion(q[0], q[1]))
      .join("");


  document.getElementById(
    "AVR_MC_questions"
  ).innerHTML =
    questionnaire.manipulationAvatar
      .map(q => createLikertQuestion(q[0], q[1]))
      .join("");


  document.getElementById(
    "page3-questions"
  ).innerHTML =
    questionnaire.page3
      .map(q => createLikertQuestion(q[0], q[1]))
      .join("");


  document.getElementById(
    "page4-questions"
  ).innerHTML =
    questionnaire.page4
      .map(q => createLikertQuestion(q[0], q[1]))
      .join("");

}

renderQuestions();


// ==============================
// 基本資料
// 目前先用測試欄位
// ==============================

document.getElementById(
  "demographic-questions"
).innerHTML = `

  <div class="question">
    <p>D1. 基本資料題 1</p>
    <input type="text" id="D1">
  </div>

  <div class="question">
    <p>D2. 基本資料題 2</p>
    <input type="text" id="D2">
  </div>

  <div class="question">
    <p>D3. 基本資料題 3</p>
    <input type="text" id="D3">
  </div>

  <div class="question">
    <p>D4. 基本資料題 4</p>
    <input type="text" id="D4">
  </div>

  <div class="question">
    <p>D5. 基本資料題 5</p>
    <input type="text" id="D5">
  </div>

  <div class="question">
    <p>D6. 基本資料題 6</p>
    <input type="text" id="D6">
  </div>

  <div class="question">
    <p>D7. 基本資料題 7</p>
    <input type="text" id="D7">
  </div>

  <div class="question">
    <p>D8. 基本資料題 8</p>
    <input type="text" id="D8">
  </div>

`;


// ==============================
// Page switching
// ==============================

function showPage(pageNumber) {

  document.querySelectorAll(".page")
    .forEach(page => {
      page.classList.add("hidden");
    });

  document.getElementById(
    `page-${pageNumber}`
  ).classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==============================
// Consent
// ==============================

document.getElementById(
  "consent-btn"
).addEventListener(
  "click",
  async function () {

    const button = this;

    button.disabled = true;
    button.textContent = "載入中...";


    const savedParticipantId =
      localStorage.getItem(
        "participant_id"
      );

    const savedCondition =
      localStorage.getItem(
        "condition"
      );


    if (
      savedParticipantId &&
      savedCondition
    ) {

      showScenario(savedCondition);

      showPage(2);

      return;
    }


    try {

      const response =
        await fetch(WEB_APP_URL);

      const data =
        await response.json();


      if (!data.success) {
        throw new Error(
          data.error
        );
      }


      localStorage.setItem(
        "participant_id",
        data.participant_id
      );

      localStorage.setItem(
        "condition",
        data.condition
      );


      showScenario(
        data.condition
      );

      showPage(2);


    } catch (error) {

      console.error(error);

      alert(
        "系統載入失敗，請稍後再試。"
      );

      button.disabled = false;

      button.textContent =
        "我同意參與研究";

    }

  }
);


// ==============================
// 顯示情境
// ==============================

function showScenario(condition) {

  document.getElementById(
    "condition-content"
  ).innerHTML =
    scenarios[Number(condition)];

}


// ==============================
// 檢查頁面是否全部作答
// ==============================

function validateQuestions(questionIds) {

  for (const id of questionIds) {

    const checked =
      document.querySelector(
        `input[name="${id}"]:checked`
      );

    if (!checked) {

      alert(
        "請完成所有題目後再進入下一頁。"
      );

      return false;
    }

  }

  return true;
}


// ==============================
// Page 2 → Page 3
// ==============================

document.getElementById(
  "page2-next"
).addEventListener(
  "click",
  function () {

    const ids = [
      "TXT_MC1",
      "TXT_MC2",
      "AVR_MC1",
      "AVR_MC2",
      "AVR_MC3"
    ];

    const AC1 =
      document.getElementById(
        "AC1"
      ).value;

    const AC2 =
      document.getElementById(
        "AC2"
      ).value;


    if (!AC1 || !AC2) {

      alert(
        "請完成所有題目。"
      );

      return;
    }


    if (
      !validateQuestions(ids)
    ) {
      return;
    }


    showPage(3);

  }
);


// ==============================
// Page 3 → Page 4
// ==============================

document.getElementById(
  "page3-next"
).addEventListener(
  "click",
  function () {

    const ids =
      questionnaire.page3
        .map(q => q[0]);


    if (
      !validateQuestions(ids)
    ) {
      return;
    }


    showPage(4);

  }
);


// ==============================
// 取得 Likert 回答
// ==============================

function getRadioValue(id) {

  const element =
    document.querySelector(
      `input[name="${id}"]:checked`
    );

  return element
    ? element.value
    : "";

}


// ==============================
// Submit
// ==============================

document.getElementById(
  "submit-btn"
).addEventListener(
  "click",
  async function () {

    const button = this;


    const page4Ids =
      questionnaire.page4
        .map(q => q[0]);


    if (
      !validateQuestions(page4Ids)
    ) {
      return;
    }


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
      conditionMap[condition];


    const submitTime =
      new Date();


    const duration =
      Math.round(
        (
          submitTime -
          startTime
        ) / 1000
      );


    const data = {

      action: "submit",

      participant_id:
        participantId,

      condition:
        condition,

      text_emotion:
        mapping.text_emotion,

      avatar_realism:
        mapping.avatar_realism,

      AC1:
        document.getElementById(
          "AC1"
        ).value,

      AC2:
        document.getElementById(
          "AC2"
        ).value

    };


    questionnaire.manipulationText
      .forEach(q => {
        data[q[0]] =
          getRadioValue(q[0]);
      });


    questionnaire.manipulationAvatar
      .forEach(q => {
        data[q[0]] =
          getRadioValue(q[0]);
      });


    questionnaire.page3
      .forEach(q => {
        data[q[0]] =
          getRadioValue(q[0]);
      });


    questionnaire.page4
      .forEach(q => {
        data[q[0]] =
          getRadioValue(q[0]);
      });


    for (
      let i = 1;
      i <= 8;
      i++
    ) {

      data[`D${i}`] =
        document.getElementById(
          `D${i}`
        ).value;

    }


    data.start_time =
      startTime.toISOString();

    data.submit_time =
      submitTime.toISOString();

    data.duration_seconds =
      duration;


    button.disabled = true;

    button.textContent =
      "送出中...";


    try {

      await fetch(
        WEB_APP_URL,
        {
          method: "POST",

          mode: "no-cors",

          headers: {
            "Content-Type":
              "text/plain"
          },

          body:
            JSON.stringify(data)
        }
      );


      button.textContent =
        "已送出";


      document.getElementById(
        "thank-you-message"
      ).classList.remove(
        "hidden"
      );


    } catch (error) {

      console.error(error);

      alert(
        "問卷送出失敗，請稍後再試。"
      );

      button.disabled = false;

      button.textContent =
        "送出問卷";

    }

  }
);
