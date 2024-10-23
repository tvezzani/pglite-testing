import { PGlite } from '@electric-sql/pglite'
import { Repl } from '@electric-sql/pglite-repl'

function PgInterface() {
  const pg = new PGlite()

  return (
    <>
      <Repl pg={pg} />
    </>
  )
}

export default PgInterface;