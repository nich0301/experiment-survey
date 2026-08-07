// 先查看受試者是否已經被分組
let condition = localStorage.getItem("condition");

// 如果還沒有分組，就隨機產生 1～4
if (!condition) {
  condition = Math.floor(Math.random() * 4) + 1;
  localStorage.setItem("condition", condition);
}

// 四種實驗情境
const scenarios = {
  1: `
    <h2>情境 A</h2>
    <p>
      這裡放第一組受試者會看到的實驗刺激。
    </p>
  `,

  2: `
    <h2>情境 B</h2>
    <p>
      這裡放第二組受試者會看到的實驗刺激。
    </p>
  `,

  3: `
    <h2>情境 C</h2>
    <p>
      這裡放第三組受試者會看到的實驗刺激。
    </p>
  `,

  4: `
    <h2>情境 D</h2>
    <p>
      這裡放第四組受試者會看到的實驗刺激。
    </p>
  `
};

// 顯示對應情境
document.getElementById("condition-content").innerHTML =
  scenarios[condition];


// 送出按鈕
document.getElementById("submit-btn").addEventListener("click", function () {

  const trust = document.querySelector(
    'input[name="trust"]:checked'
  );

  if (!trust) {
    alert("請先完成題目。");
    return;
  }

  console.log({
    condition: condition,
    trust: trust.value
  });

  alert("問卷已完成！");
});
