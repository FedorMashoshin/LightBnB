const properties = require('./json/properties.json');
const users = require('./json/users.json');

const pg = require('pg');
const Pool = pg.Pool;

const options = {
  user: 'vagrant',
  password: '123',
  database: 'light_bnb',
  host: 'localhost'
}

const pool = new Pool(options);
pool.connect();


/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const userEmailQuery = `SELECT * FROM users WHERE email = $1`;

const getUserWithEmail = function(email) {
    return pool.query(userEmailQuery, [email])
      .then(res => res ? res.rows[0] : null)
      .catch(err => console.err('Query error', err));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const userIDQuery = `SELECT * FROM users WHERE id = $1`;

const getUserWithId = function(id) {
  return pool.query(userIDQuery, [id])
      .then(res => res ? res.rows[0] : null)
      .catch(err => console.err('Query error', err));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

 const addUserQuery = `
 INSERT INTO users(name, email, password)
 VALUES($1, $2, $3)
 RETURNING *;
 `;
const addUser =  function(user) {
  return pool.query(addUserQuery, [user.name, user.email, user.password])
  .then(res => {
    res.rows[0];
  })
  .catch(err => console.err('Query error', err));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const allReservationsQuery = `
SELECT * FROM properties
JOIN reservations ON properties.id = property_id
JOIN users ON users.id = guest_id
WHERE guest_id = $1;
`;

const getAllReservations = function(guest_id, limit = 10) {
return pool.query(allReservationsQuery,[guest_id])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

 /*
1 - Setup an array to hold any parameters that may be available for the query.
2 - Start the query with all information that comes before the WHERE clause.
3 - Check if a city has been passed in as an option. Add the city to the params array and create a WHERE clause for the city.
  + We can use the length of the array to dynamically get the $n placeholder number. Since this is the first parameter, it will be $1.
  + The % syntax for the LIKE clause must be part of the parameter, not the query.
4 - Add any query that comes after the WHERE clause.
5 - Console log everything just to make sure we've done it right.
6 - Run the query. */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, AVG(rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  } 


  if (options.owner_id) {
    queryParams.push(options.owner_id);
    if (queryParams.length > 1) {
      queryString += ` AND `;
    } else {
      queryString += ` WHERE `;
    }
    queryString += `owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    if (queryParams.length > 1) {
      queryString += ` AND `;
    } else {
      queryString += ` WHERE `;
    }
    queryString += ` cost_per_night > $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    if (queryParams.length > 1) {
      queryString += ` AND `;
    } else {
      queryString += ` WHERE `;
    }
    queryString += ` cost_per_night < $${queryParams.length}`;
  }

  queryString += ` GROUP BY properties.id `;

  if (options. minimum_rating) {
    queryParams.push(options. minimum_rating);
    queryString += `   
    HAVING AVG(rating) >= $${queryParams.length}`;
  };

  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(options, 'queryString: ', queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addPropertyQuery = `
 INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
 VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
 RETURNING *;
 `;

const addProperty = function(property) {
  return pool.query(addPropertyQuery, [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])
  .then(res => {
    res.rows[0];
  })
  .catch(err => console.err('Query error', err));
}
exports.addProperty = addProperty;
