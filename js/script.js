let popup = document.getElementById("popup");
let blure = document.getElementById("blured");
var inpKey = document.getElementById("takeKey");
let cardHide = document.getElementById("cards");
let messages1 = document.getElementById("msgs");
let send_icon = document.getElementById("sendicon");
let load_icon = document.getElementById("loadicon");
var activateLicense = JSON.parse(localStorage.getItem("activatelicense")) || [];
var isOpen = false;
var clickOutsideTimeout;
load_icon.style.display = "none";

window.addEventListener("click", function (event) {
  console.log("click");

  if (!blure.contains(event.target) && !popup.contains(event.target)) {
    closepopup();
    console.log("close");
  }
});
function autoResizeResponse() {
  const textareas = document.getElementsByClassName("msgTextarea");
  for (let i = 0; i < textareas.length; i++) {
    const textarea = textareas[i];
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }
}

const inptextarea = document.getElementById("myTextarea");

function autoResize() {
  const textarea = document.getElementById("myTextarea");
  const maxHeight = 200; // Maximum height in pixels

  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";

  if (textarea.scrollHeight > maxHeight) {
    textarea.style.overflowY = "scroll";
    textarea.style.height = maxHeight + "px";
  } else {
    textarea.style.overflowY = "hidden";
  }
}

function openPopup() {
  console.log("open");
  popup.classList.add("open_popup");
  blure.classList.add("blur_cont");
  blure.style.pointerEvents = "none";
  //isOpen = true;
}

function closepopup() {
  popup.classList.remove("open_popup");
  blure.classList.remove("blur_cont");
  inpKey.classList.remove("empty-textbox");
  blure.style.pointerEvents = "auto";
  inpKey.value = "";
  isOpen = false;
}

function addKey() {
  if (inpKey.value == "") {
    inpKey.classList.add("empty-textbox");
    return;
  } else {
    var keyText = inpKey.value.trim();

    if (keyText) {
      var licenseKey = {
        id: Date.now(),
        text: keyText,
      };

      activateLicense.push(licenseKey);

      localStorage.setItem("activatelicense", JSON.stringify(activateLicense));
    }
    popup.classList.remove("open_popup");
    blure.style.pointerEvents = "auto";
    blure.classList.remove("blur_cont");
    inpKey.classList.remove("empty-textbox");
    inpKey.style.background = "";
    inpKey.value = "";
  }
}

function takeMessage() {
  var activateLicense =
    JSON.parse(localStorage.getItem("activatelicense")) || [];
  const textarea = document.getElementById("myTextarea");

  if (activateLicense.length > 0) {
    if (textarea.value.trim() !== "") {
      scrollToTopBtn.classList.remove("show");
      scrollToBottomBtn.classList.remove("show");
      inptextarea.setSelectionRange(0, 0);
      inptextarea.style.height = "auto";
      load_icon.style.display = "flex";
      send_icon.style.display = "none";
      console.log("hi" + document.getElementById("myTextarea").value);
      var lastLicenseKey = activateLicense[activateLicense.length - 1];
      var textValue = lastLicenseKey.text;
      console.log("Text from the last value:", textValue);

      let payload = {
        text: document.getElementById("myTextarea").value,
        apiKey: textValue,
      };

      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      cardHide.classList.add("card_hide");
      messages1.classList.remove("response_msg");

      var msgElement = document.createElement("div");
      msgElement.className = "newMsgRow";
      msgElement.innerHTML = `
      <div class="msg">
        <div class="msgrw1">
          <div>
          <i class="usericon fa-sharp fa-solid fa-circle-user fa-xl" style="color: #d1d1d1;"></i>
          </div>
          <div class="tt3">${document.getElementById("myTextarea").value}</div>
          <textarea class="msgTextarea" oninput="autoResizeResponse()"></textarea>
          <button class="editbutton" data-toggle="tooltip" data-placement="bottom" title="Edit"><i class="fa-solid fa-pen-to-square fa-lg"></i></button>
        </div>
        <div class="twobuttons">
          <button class="submitnew">Submit & Save</button>
          <button class="cancel">Cancel</button>
        </div>
        <div class="msgrw2">
          <div>
            <i id="icn1" class="icon1 fa-solid fa-spinner fa-spin fa-xl" style="color: #d1d1d1;"></i>
            <span id="icn2" class="icon2 material-symbols-outlined">
            assistant
            </span>
          </div>
          <div class="tt4"></div>
          <div>
            <button id="copytext" class="copybtn">
            <i id="copysymbol" class="copysym fa-solid fa-copy fa-lg" data-toggle="tooltip" data-placement="bottom" title="Copy"></i>
              <div id="copied" class="copiedtext">
                <i class="fa-solid fa-check fa-sm"></i>  
                <div>Copied!</div>        
              </div>
            </button>
          </div>
        </div>
      </div>`;

      messages1.appendChild(msgElement);
       SpeakBrowser(document.getElementById("myTextarea").value);

      var tt4Div = msgElement.querySelector(".tt4");
      var icon1 = msgElement.querySelector("#icn1");
      var icon2 = msgElement.querySelector("#icn2");
      var copytext1 = msgElement.querySelector("#copytext");
      //var copySymbol = msgElement.querySelector("#copysymbol");
      //var copiedText = msgElement.querySelector("#copied");

      const copybutton = document.getElementsByClassName("copybtn");
      // let previousCopiedText = null;
      //let previousCopySymbol = null;

      for (let i = 0; i < copybutton.length; i++) {
        copybutton[i].addEventListener("click", function () {
          const div = this.parentElement.parentElement;

          const valuediv = div.querySelector(".tt4");
          const value = valuediv.innerHTML.trim();
          var proper = value.split("<br>");
          var proper1 = proper.map((proper) => `${proper}`).join("");

          navigator.clipboard
            .writeText(proper1)
            .then(() => {
              console.log("Copied:", proper1);
              copyPopupAlert();

              /*if (previousCopiedText && previousCopySymbol) {
                previousCopiedText.style.display = "none";
                previousCopySymbol.style.display = "flex";
              }*/

              //const copiedText = div.querySelector(".copiedtext");
              //const copySymbol = div.querySelector(".copysym");
              //copiedText.style.display = "flex";
              //copySymbol.style.display = "flex";

              //previousCopiedText = copiedText;
              //previousCopySymbol = copySymbol;
            })
            .catch((error) => {
              console.error("Copy failed:", error);
            });
        });
      }

      const editButton = document.getElementsByClassName("editbutton");

      for (let i = 0; i < editButton.length; i++) {
        editButton[i].addEventListener("click", function () {
          const div = this.parentElement;
          const parentdiv = this.parentElement.parentElement;
          const valuediv = div.querySelector(".tt3");
          const value = valuediv.innerHTML.trim();
          const textareamsg = div.querySelector(".msgTextarea");
          valuediv.style.display = "none";
          textareamsg.style.display = "flex";

          var twoButton = parentdiv.querySelector(".twobuttons");
          if (twoButton) {
            twoButton.style.display = "flex";
          }
          textareamsg.value = value;
          autoResizeResponse();

          console.log(textarea.value);
        });
      }

      const submitButtons = document.getElementsByClassName("submitnew");

      for (let i = 0; i < submitButtons.length; i++) {
        submitButtons[i].addEventListener("click", function () {
          const div = this.parentElement.parentElement;
          const valuediv = div.querySelector(".tt3");
          const textareamsg = div.querySelector(".msgTextarea");
          const twoButtons = div.querySelector(".twobuttons");
          const newdiv = div.querySelector(".tt4");
          var copytext1 = div.querySelector("#copytext");
          newdiv.innerHTML = " ";
          valuediv.innerHTML = textareamsg.value;

          var icon1 = div.querySelector("#icn1");
          var icon2 = div.querySelector("#icn2");
          icon1.style.display = "flex";
          icon2.style.display = "none";
          copytext1.style.display = "none";
          let payload = {
            text: textareamsg.value,
            apiKey: textValue,
          };
          console.log(textValue);
          let options = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(payload),
          };

          fetch("http://192.168.1.154:8989/api", options)
            .then((response) => response.json())
            .then((json) => {
              var jsonData = json.content;
              SpeakBrowser(jsonData);
              newdiv.innerHTML = properData(jsonData);
              Prism.highlightAll();
              icon1.style.display = "none";
              icon2.style.display = "flex";
              copytext1.style.display = "flex";
            });

          // const newtext = generateagain(textareamsg.value);
          // newdiv.innerHTML = newtext;
          valuediv.style.display = "flex";
          textareamsg.style.display = "none";
          twoButtons.style.display = "none";
        });
      }

      const cancelButton = document.getElementsByClassName("cancel");

      for (let i = 0; i < cancelButton.length; i++) {
        cancelButton[i].addEventListener("click", function () {
          const div = this.parentElement.parentElement;
          const valuediv = div.querySelector(".tt3");
          const textareamsg = div.querySelector(".msgTextarea");
          const twoButtons = div.querySelector(".twobuttons");

          valuediv.style.display = "flex";
          textareamsg.style.display = "none";
          twoButtons.style.display = "none";
        });
      }

      fetch("http://192.168.1.154:8989/api", options)
        .then((response) => response.json())
        .then((json) => {
          var jsonData = json.content;
          SpeakBrowser(jsonData);
          console.log(json);

          tt4Div.innerHTML = properData(jsonData);
          Prism.highlightAll();

          load_icon.style.display = "none"; // Hide the load icon
          send_icon.style.display = "flex";
          if (document.getElementById("myTextarea").value.trim() == "") {
            send_icon.classList.remove("sendiconafterwrite");
          }
          icon1.style.display = "none";
          icon2.style.display = "flex";
          copytext1.style.display = "flex";
        });

      document.getElementById("myTextarea").value = "";
      previousButton.style.backgroundColor = "";
      previousButton.style.color = "";
    } else {
      inptextarea.style.height = "auto";
      inptextarea.setSelectionRange(0, 0);
      document.getElementById("myTextarea").value = "";
      load_icon.style.display = "none"; // Hide the load icon
      send_icon.style.display = "flex";
      if (document.getElementById("myTextarea").value.trim() == "") {
        send_icon.classList.remove("sendiconafterwrite");
      }
    }
  } else {
    alertpopup();
  }
}

document.addEventListener("keyup", function (event) {
  if (document.getElementById("myTextarea").value.trim() == "") {
    send_icon.classList.remove("sendiconafterwrite");
  } else {
    send_icon.classList.add("sendiconafterwrite");
  }

  if (event.key === "Enter" && load_icon.style.display == "none") {
    takeMessage();
    console.log("Enterkey");
  }
});

function alertpopup() {
  $(".alert").addClass("show");
  $(".alert").removeClass("hide");
  $(".alert").addClass("showAlert");
  setTimeout(function () {
    $(".alert").removeClass("show");
    $(".alert").addClass("hide");
  }, 5000);
}

function closealert() {
  $(".close-btn").click(function () {
    $(".alert").removeClass("show");
    $(".alert").addClass("hide");
  });
}

window.addEventListener("scroll", function () {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  var scrollToBottomBtn = document.getElementById("scrollToBottomBtn");

  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  var viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  var totalHeight = document.documentElement.scrollHeight;

  var distanceFromBottom = totalHeight - (scrollPosition + viewportHeight);
  var distanceFromTop = scrollPosition;

  if (distanceFromBottom > 50 && totalHeight > viewportHeight) {
    scrollToBottomBtn.classList.add("show");
  } else {
    scrollToBottomBtn.classList.remove("show");
  }

  if (distanceFromTop > 50 && totalHeight > viewportHeight) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

var scrollToTopBtn = document.getElementById("scrollToTopBtn");
var scrollToBottomBtn = document.getElementById("scrollToBottomBtn");

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

scrollToBottomBtn.addEventListener("click", function () {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
});

function properData(jsonData) {
  /*var lines = jsonData.split("\n\n");
  var lines1 = lines.map((line) => `${line}`).join("");
  var nextlines = lines1.split("\n");
  var nextlines1 = nextlines
    .map((nextlines) => `${nextlines}`)
    .join("<br>");
  var star = nextlines1.split("**");
  var stars1 = star.map((star) => `${star}`).join("*");

  var extrastar = stars1.split("*");
  var extrastar1 = extrastar.map((extrastar) => `${extrastar}`).join("");

  var dash = extrastar1.split("`");
  var dash1 = dash.map((dash) => `${dash}`).join("");

  var quest = dash1.split("?");
  var quest1 = quest.map((quest) => `${quest}?`).join("<br>");

  let trimmedText = quest1.slice(0, -1);

  var threedash = trimmedText.split("---");
  var threedash1 = threedash.map((threedash) => `${threedash}`).join("");

  var fiveline = threedash1.split("|||||");
  var fiveline1 = fiveline.map((fiveline) => `${fiveline}`).join("");

  var standline = fiveline1.split("|");
  var standline1 = standline.map((standline) => `${standline}`).join("");*/

  const codeRegex = /```(\w+)\n([\s\S]+?)\n```/g;
  return jsonData.replace(
    codeRegex,
    '<pre><code class="language-$1">$2</code></pre>'
  );
}

function copyPopupAlert() {
  let duration = 3000;
  let copyAlert = document.getElementById("copy-alert");
  copyAlert.classList.add("copy_popup");

  setTimeout(() => {
    copyAlert.classList.remove("copy_popup");
  }, duration);
}
