const Pool = require('pg').Pool
const pool = new Pool({
  Player: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getPlayers = (request, response) => {
  pool.query('SELECT * FROM players ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPlayerById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM players WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createPlayer = (request, response) => {
  let  { name, position, clubname } = request.body
  let avatar = request.file;


  pool.query('INSERT INTO players (name, position, clubname, avatar) VALUES ($1, $2, $3, $4) RETURNING *', [ name, position, clubname, avatar], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(200).send(`Player added with ID: ${results.rows[0].id}`)
  })
}


const patialupdatePlayer = (request, response) => {
  const id = parseInt(request.params.id)
  let  { name, position, clubname } = request.body
 

  pool.query(
    'UPDATE players SET name = $1, position = $2, clubname =$3 WHERE id = $4 RETURNING *',
    [ name, position, clubname, id],
    (error, results) => {
      if (error) {
        throw error
      } 
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`Player not found`);
      } else {
  	 	  response.status(200).send(`Player modified with ID: ${results.rows[0].id}`)         	
      }
      
    }
  )
}


const updatePlayer = (request, response) => {
  const id = parseInt(request.params.id)
  
  const avatar = request.file;

  pool.query(
    'UPDATE players SET avatar =$1 WHERE id = $2 RETURNING *',
    [ avatar, id],
    (error, results) => {
      if (error) {
        throw error
      } 
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`Player not found`);
      } else {
  	 	  response.status(200).send(`Player modified with ID: ${results.rows[0].id}`)         	
      }
      
    }
  )
}

const deletePlayer = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM players WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Player deleted with ID: ${id}`)
  })
}

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  patialupdatePlayer
}
