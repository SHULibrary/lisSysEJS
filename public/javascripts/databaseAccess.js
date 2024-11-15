
let dbButton = document.querySelector('#runDB');
dbButton.onclick = runCode;

function runCode(){
  const db = new sqlite3.Database(path.join(__dirname, 'data', 'libData.db'), (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database');
  }
  
});
}