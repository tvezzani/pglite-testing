import './App.css';
import { PGlite } from '@electric-sql/pglite';
import { Repl } from '@electric-sql/pglite-repl'

const db = new PGlite()

await db.exec(`
  CREATE TABLE IF NOT EXISTS todo (
    id SERIAL PRIMARY KEY,
    task TEXT,
    done BOOLEAN DEFAULT false
  );
  INSERT INTO todo (task, done) VALUES ('Install PGlite from NPM', true);
  INSERT INTO todo (task, done) VALUES ('Load PGlite', true);
  INSERT INTO todo (task, done) VALUES ('Create a table', true);
  INSERT INTO todo (task, done) VALUES ('Insert some data', true);
  INSERT INTO todo (task) VALUES ('Update a task');
`)

let ret = await db.query(`
  SELECT * from todo WHERE id = 5;
`)

console.log("Example query results: ", ret.rows);

await db.query(
  'UPDATE todo SET task = $2, done = $3 WHERE id = $1',
  [5, 'Update a task using parametrised queries', true],
)

ret = await db.query(`
  SELECT * from todo WHERE id = 5;
`)

console.log("Example updated results: ", ret.rows);

function App() {
  return (
    <div className="App">
      <Repl pg={db} />
    </div>
  );
}

export default App;
