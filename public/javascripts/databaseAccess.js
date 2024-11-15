
let dbButton = document.querySelector('#submit-button');
dbButton.onclick = () => {
  const db = new sqlite3.Database(path.join(__dirname, 'data', 'libData.db'), (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database');
  }
  
});
}