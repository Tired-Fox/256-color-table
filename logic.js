let previous_key = "";

function dialogClickHandler(e) {
  if (e.target.tagName !== "DIALOG")
    //This prevents issues with forms
    return;

  const rect = e.target.getBoundingClientRect();

  const clickedInDialog =
    rect.top <= e.clientY &&
    e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX &&
    e.clientX <= rect.left + rect.width;

  if (clickedInDialog === false) e.target.close();
}

document.addEventListener("click", dialogClickHandler);

function toggleSearch() {
  const search = document.getElementById("color-search");
  if (search.open) {
    search.close();
    search.value = "";
  } else {
    search.value = "";
    search.showModal();
  }
}

function search(value) {
  console.log(value);
  const element = document.getElementById(`xterm-${value}`)
  if (element) {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    toggleSearch();
    document.getElementById("color-info-box").close();
  }
}

function checkKeys(event) {
  switch (event.key) {
    case "/":
      // toggle search modal
      if (!document.getElementById("color-search").open) {
        toggleSearch();
      }
      break;
    case "P":
      event.preventDefault();
      if (previous_key === "Control") {
        // toggle search modal
        toggleSearch();
      }
      break;
    case "Enter":
      if (document.getElementById("color-search").open) {
        search(event.target.value);
        event.target.value = ""
      }
      break;
    default:
      // console.log(event.key);
      previous_key = event.key;
  }
}

document.addEventListener("keydown", checkKeys);

function closeColor(event) {
  let infoBox = document.getElementById("color-info-box");
  infoBox.close();
}

function openColor(num) {
  let infoBox = document.getElementById("color-info-box");
  let colorSample = document.getElementById("color-sample");

  let name = document.getElementById("color-name");
  let id = document.getElementById("color-id");
  let hex = document.getElementById("color-hex");
  let rgb = document.getElementById("color-rgb");
  let hsl = document.getElementById("color-hsl");

  let cname = document.getElementById(`code_name_${num}`);
  let cid = document.getElementById(`code_xterm_${num}`);
  let chex = document.getElementById(`code_hex_${num}`);
  let crgb = document.getElementById(`code_rgb_${num}`);
  let chsl = document.getElementById(`code_hsl_${num}`);

  console.log(cname);
  console.log(cid);
  console.log(chex);
  console.log(crgb);
  console.log(chsl);
  if (name && id && hex && rgb && hsl) {
    if (cname && cid && chex && crgb && chsl) {
      colorSample.style.backgroundColor = `${chex.value}`;
      name.textContent = cname.textContent;
      id.textContent = cid.textContent;
      hex.textContent = chex.value;
      rgb.textContent = crgb.value;
      hsl.textContent = chsl.value;
      infoBox.showModal();
    } else {
      alert("Couldn't find the appropriate color data");
    }
  }
}

function copyText(id) {
  // Get the text field
  var copyText = document.getElementById(id);

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.textContent);

  const text = copyText.textContent;

  // Alert the copied text
  setTimeout(() => {
    revertValue(id, text);
  }, 2000);
  copyText.textContent = "Copied!";
}

function revertValue(id, value) {
  element = document.getElementById(id);
  element.textContent = value;
}
