//siquel, kiedy live?
const siquel = "debil";
const gej = document.getElementById("siquelOP");
console.log(gej.innerText);

function openImg() {
  document.querySelector("html>body>main>#beanz").style.display = "block";
}

////////////////////////
//  ANIMOWANE LITERY  //
////////////////////////

const letters = document.getElementsByClassName("animated-letters");

for (let i = letters.length - 1; i >= 0; i--) {
  letters[i].addEventListener("mouseover", () => {
    letters[i].classList.add("animation");
    setTimeout(function () {
      letters[i].classList.remove("animation");
    }, 700);
  });
}

////////////
//  PATHS //
////////////
const lawFilePath = "./assets/data/law.json";
const namesPath = "./assets/data/role_users.json";
const newsPath = "./assets/data/news.json";

//////////////////
//  LOADING LAW //
//////////////////

document.querySelector("html>body>footer>p>#year").innerText =
  new Date().getFullYear();

readTextFile(lawFilePath, function (text) {
  //////////////////////////////
  // CHALLANGE: UNDERSTAND IT //
  //       GOOD LUCK :)       //
  //////////////////////////////
  var data = JSON.parse(text);
  let law_content = document.querySelector("#law-content");
  law_content.innerHTML = "";
  let article_iter = 1;
  let chapter_iter = 1;
  data.constitution.forEach((value) => {
    let { title, content } = value;
    if (title.includes("%CHAPTER_NO%")) {
      title = title.replace("%CHAPTER_NO%", chapter_iter);
      chapter_iter++;
    }
    law_content.appendChild(genDivider(title));

    let ol = document.createElement("ol");
    content.forEach((value) => {
      let art = document.createElement("span");
      art.classList.add("article");
      artTitle = value.main;
      if (artTitle.includes("%ART_NO%")) {
        artTitle = artTitle.replace("%ART_NO%", article_iter);
        article_iter++;
      }
      art.innerHTML = "<p class='articleTitle'>" + artTitle + "</p>";

      if (value.article !== undefined) {
        let ol1 = document.createElement("ol");
        value.article.forEach((article) => {
          let li1 = document.createElement("li");
          li1.innerText = article.main;

          if (article.underlist !== undefined) {
            let ul = document.createElement("ul");
            article.underlist.forEach((punkt) => {
              let li2 = document.createElement("li");
              li2.innerText = punkt;
              ul.appendChild(li2);
            });
            li1.appendChild(ul);
          }

          ol1.appendChild(li1);
        });
        art.appendChild(ol1);
      }

      ol.appendChild(art);
    });
    law_content.appendChild(ol);
  });
  let dataWrapper = document.createElement("div");
  dataWrapper.classList.add("constitution-info");
  dataWrapper.appendChild(genDivider("informacje"));
  let data_elem = document.createElement("p");
  data_elem.innerHTML = `Data ostatniej modyfikacji konstytucji: <date>${data.last_modified}</date>`;
  dataWrapper.appendChild(data_elem.cloneNode(true));
  data.additional_info.forEach((additionalInfo) => {
    let info_elem = data_elem.cloneNode(true);
    info_elem.innerHTML = additionalInfo;
    dataWrapper.appendChild(info_elem);
  });
  law_content.appendChild(dataWrapper);
});
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function genDivider(content) {
  let parent = document.createElement("div");
  parent.classList.add("divider", "disableHover");
  let child = document.createElement("span");
  let child1 = document.createElement("span");
  child1.classList.add("content");
  child1.innerText = content;

  parent.appendChild(child.cloneNode(true));
  parent.appendChild(child1);
  parent.appendChild(child.cloneNode(true));

  return parent;
}

////////////////
//  GIGA CHAD //
////////////////

window.addEventListener("resize", () => {
  if (window.innerWidth <= 700) {
    window.location.href = "wynocha.html";
  }
});

/////////////////
//  DROPDOWNS  //
/////////////////
const dropdowns = document.querySelectorAll(".dropdown");
const dropdown_btns = document.querySelectorAll(".dropdown__header-button");

dropdown_btns.forEach((value) => {
  value.addEventListener("click", (e) => {
    let dropdown = e.target.parentElement.parentElement;
    switchDropdown(dropdown);
  });
});

function switchDropdown(dd) {
  dropdowns.forEach((value) => {
    if (!value.classList.contains("hidden") && value !== dd)
      value.classList.add("hidden");
  });
  dd.classList.toggle("hidden");
}

////////////////
//  TOOLTIPS  //
////////////////
let ranks = [];
for (let i = 1; i <= 18; i++) {
  ranks.push(document.getElementById("rank" + i));
}
let tooltips = new Array();

readTextFile(namesPath, async function (text) {
  var data = await JSON.parse(text);
  data.forEach((value) => {
    tooltips.push(value);
  });
  ranks.forEach((elem, i) => {
    elem.appendChild(genTooltip(tooltips[i].users));
  });
});

function genTooltip(content) {
  let tt = document.createElement("span");
  let title = document.createElement("div");
  title.classList.add("tooltip-title");
  let names = document.createElement("ul");
  title.innerText = "Klubowicze:";
  for (let i = 0; i < content.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = "<span class='bialasy'>" + content[i] + "</span>";
    names.appendChild(li);
  }

  tt.classList.add("tooltip");
  tt.appendChild(title.cloneNode(true));
  tt.appendChild(names.cloneNode(true));
  return tt;
}

/////////////////
//  CONTACT US //
/////////////////

let conBtn = document.getElementById("esubmit");
let conTxt = document.getElementById("econtent");
let conSub = document.getElementById("esubject");

conBtn.addEventListener("click", () => {
  window.location.href =
    "mailto:fanclubbgpc@gmail.com?subject=" +
    conSub.value +
    "&body=" +
    conTxt.value;

  conSub.value = "";
  conTxt.value = "";
});

////////////////
//  SIQUEL OP //
////////////////

const controls = document.querySelector("#controls-important");
let counter = 420;
controls.addEventListener("click", () => {
  counter++;
  if (counter == 430) {
    window.open("./assets/data/siquelop.txt", "_blank");
    counter = 420;
  }
});

////////////////
//    NEWSY   //
////////////////
let susACON = document.querySelector("#susART");
let susATIT = document.querySelector("#sus");
let bgfcACON = document.querySelector("#bgfcART");
let bgfcATIT = document.querySelector("#bgfc");

readTextFile(newsPath, async function (text) {
  let data = await JSON.parse(text);
  let bgfcART = data.bgfc[data.bgfc.length - 1];
  let susART = data.sus[data.sus.length - 1];

  let date = document.createElement("date");
  date.innerHTML = `Dodano: ${susART.date}`;

  susATIT.innerHTML = susART.article_name;
  susACON.appendChild(date);
  susACON.innerHTML += "<br>" + susART.article_content;

  let date2 = document.createElement("date");
  date2.innerHTML = `Dodano: ${bgfcART.date}`;

  bgfcATIT.innerHTML = bgfcART.article_name;
  bgfcACON.appendChild(date2);
  bgfcACON.innerHTML += "<br>" + bgfcART.article_content;
});

if (window.innerWidth <= 700) {
  window.location.href = "wynocha.html";
}

// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠋⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⠏⠀⢠⣦⡀⣤⣠⡄⢠⠦⡄⣠⠤⠀⣤⠀⡆⣤⣶⡀⠀⠈⠻⣿
// ⣿⣿⣿⣿⣿⣿⠀⠀⠟⠻⠃⠏⠉⠇⠸⠶⠋⠻⠾⠇⠙⠒⠃⠘⠾⠃⠀⠀⢀⣿
// ⣿⣿⣿⣿⣿⣿⣷⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣴⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⠷⣶⣶⣶⣶⣶⡆⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⠟⠉⠀⠀⠒⠀⠀⠀⠀⠉⢻⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⠀⠀⠀⠦⣀⣶⡶⠀⢤⣠⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣷⣤⣀⡲⠶⣶⣤⣔⣀⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⠿⠿⠃⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⠏⢀⠤⠄⠀⠀⢀⡈⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⡟⠀⠸⠦⣠⠘⠁⢨⠃⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⠃⠀⠑⠤⠤⠔⠚⢥⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⡿⠀⠀⠀⣀⣀⡀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⡇⠀⠀⣰⣿⣿⣿⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣧⣀⡀⠉⣻⣿⣧⣤⣤⣤⣤⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
