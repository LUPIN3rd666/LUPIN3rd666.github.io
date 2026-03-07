// 草药功效字典（用于生成说明）
const herbInfo = {
  "艾草":"温经散寒、安神助眠。",
  "薄荷":"清凉提神，缓解闷热。",
  "薰衣草":"安神放松，适合枕边使用。",
  "陈皮":"理气和中，带淡淡果香。",
  "丁香":"温中散寒，驱虫提味。",
  "菊花":"清肝明目，香气清雅。",
  "香茅":"天然驱蚊，清新不刺鼻。",
  "玫瑰花":"调和情绪，柔和花香。",
  "桂花":"甜润香气，中和药味。",
  "藿香":"化湿醒脾，净化空气。",
  "金银花":"清热解毒，淡雅香气。",
  "薄荷脑":"强烈清凉感，少量使用。",
  "百合":"安神润燥，香气柔和。",
  "茉莉花":"馥郁花香，提振心情。",
  "当归":"活血养血，略带甜香。",
  "川芎":"活血行气，药香浓郁。",
  "甘草":"调和诸药，柔化香气。",
  "花椒":"温中散寒，驱虫提味。",
  "薄荷叶":"清凉提神，适合搭配花香。",
  "紫苏":"理气和胃，香气清新。"
};

// 生成香囊配方说明
function generate() {
  const checkboxes = document.querySelectorAll(".herb-list input[type=checkbox]:checked");
  const resultDiv = document.getElementById("result");
  let herbs = [];
  checkboxes.forEach(cb => herbs.push(cb.value));

  if (herbs.length === 0) {
    resultDiv.innerHTML = "你还没有选择任何草药。建议选择 3–4 种草药进行搭配。";
    return;
  }
  if (herbs.length > 5) {
    resultDiv.innerHTML = "你选择的草药有点多了，建议控制在 3–4 种，这样香气更有层次。<br><br>当前选择：" + herbs.join("、");
    return;
  }

  let base = "你选择的草药有：" + herbs.join("、") + "。<br><br>";
  let theme = "";
  if (herbs.includes("薰衣草") || herbs.includes("百合") || herbs.includes("茉莉花")) {
    theme = "偏向安神放松，适合放在床头或书桌旁，陪你度过加班后的慢时刻。";
  } else if (herbs.includes("香茅") || herbs.includes("薄荷") || herbs.includes("薄荷脑")) {
    theme = "偏向清凉驱蚊，适合夏季或窗边使用，让夜晚少一点蚊子。";
  } else if (herbs.includes("金银花") || herbs.includes("藿香") || herbs.includes("陈皮")) {
    theme = "偏向净化空气，适合衣柜、玄关或鞋柜，带来淡淡清新。";
  } else {
    theme = "综合型香囊，适合随身或办公桌，兼具香气层次与陪伴感。";
  }

  let eco = "<br><br>环保说明：建议搭配可降解内芯与可重复使用外壳，使用结束后草本可作为厨余或可降解垃圾分类投放。";
  resultDiv.innerHTML = base + theme + eco;
}

// 点击草药标签高亮并滚动到对应气泡
window.addEventListener("DOMContentLoaded", function () {
  const labels = document.querySelectorAll(".herb-list label");
  labels.forEach(label => {
    label.addEventListener("click", function (e) {
      const herb = label.getAttribute("data-herb");
      const card = document.getElementById("info-" + herb);
      if (card) {
        document.querySelectorAll(".herb-info-card").forEach(c => c.classList.remove("highlight"));
        card.classList.add("highlight");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => card.classList.remove("highlight"), 2000);
      }
    });
  });
});
