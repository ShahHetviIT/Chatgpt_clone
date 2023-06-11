// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkDBeAF6M_dGcnSD-K8XxtqPCdYJ9hLHk",
  authDomain: "better-bard.firebaseapp.com",
  databaseURL: "https://better-bard-default-rtdb.firebaseio.com",
  projectId: "better-bard",
  storageBucket: "better-bard.appspot.com",
  messagingSenderId: "184850636456",
  appId: "1:184850636456:web:65021afbb36b34ee966c9d",
  measurementId: "G-11JF55ZECK",
};

firebase.initializeApp(firebaseConfig);

var GetCategories = function () {
  var categoryRef = firebase.database().ref("/category");
  categoryRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log("Category", data);

    //document.getElementById("promptCards").innerHTML = "";

    for (const key in data) {
      const category = data[key];
      console.log(category);
      GetPrompts(category);
    }
  });
};

var convertToSlug = function (string) {
  return string
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, "-") // Replace whitespace with hyphens
    .replace(/[^a-zA-Z0-9-]/g, "") // Remove any non-alphanumeric characters except hyphens
    .replace(/-{2,}/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .trim(); // Remove leading and trailing whitespace (if any)
};

var GetPrompts = function (category) {
  var convertedCategory = convertToSlug(category);
  var promptRef = firebase.database().ref("/prompts/" + convertedCategory);
  promptRef.on("value", (snapshot) => {
    const data = snapshot.val();
    //console.log('Prompts', data);
    console.log("Prompts", data);

    // Create prompt cards for each prompt
    for (const key in data) {
      const prompt = data[key];
      CreatePrompts(prompt);
    }
  });
};

var CreatePrompts = function (category) {
  var card = document.createElement("div");
  card.className = "col-xl-4 col-lg-6 col-md-6 col-sm-6 col-10 rw1";
  card.innerHTML = `
    <div class="card1">
      <div class="cardcontent" onclick="getContent(this);">${category}</div>
    </div>
  `;

  console.log(category);

  document.getElementById("promptCards").appendChild(card);
};

// Test data
//GetCategories();

var previousButton = null;

function getButtonId(buttonId) {
  scrollToTopBtn.classList.remove("show");
  scrollToBottomBtn.classList.remove("show");
  if (previousButton) {
    previousButton.style.backgroundColor = "";
    previousButton.style.color = "";
  }

  buttonId.style.backgroundColor = "greenyellow";
  buttonId.style.color = "#000000";
  previousButton = buttonId;

  console.log(document.getElementById(buttonId.id).innerHTML.trim());
  var inputString = document.getElementById(buttonId.id).innerHTML.trim();
  document.getElementById("promptCards").innerHTML = "";
  messages1.classList.add("response_msg");
  cardHide.classList.remove("card_hide");
  if (inputString == "All") {
    GetCategories();
  } else {
    GetPrompts(inputString);
  }
}

function getContent(divContent) {
  document.getElementById("myTextarea").value = divContent.textContent;
  send_icon.classList.add("sendiconafterwrite");
  autoResize();
}

let newButtons = document.getElementById("allbuttons");

function getAllCategoryButton() {
  //console.log("button");

  var categoryRef = firebase.database().ref("/category");
  categoryRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log("Category", data);

    var buttons = document.createElement("div");
      buttons.className = "newbutton";
      buttons.innerHTML = `
        <button id="All" onclick="getButtonId(this);" type="button" class="btn btn-outline-light">All</button>`;

      newButtons.appendChild(buttons);

    for (const key in data) {
      const category = data[key];
      console.log(category);
      var idtag = category.split(" ");
      var idtag1 = idtag.map((idtag) => `${idtag}`).join("");
      console.log(idtag1);

      var buttons = document.createElement("div");
      buttons.className = "newbutton";
      buttons.innerHTML = `
        <button id="${idtag1}" onclick="getButtonId(this);" type="button" class="btn btn-outline-light">${category}</button>`;

      newButtons.appendChild(buttons);
    }
  });
}

getAllCategoryButton();
