let button = document.getElementById("runDB");
button.addEventListener("click", () => runCommand());

function runCommand() {
  button.textContent = "ran";
}
