const { BadRequestError } = require("../expressError");

// dataToUpdate is an object containing key: value pairs
//
// keys is an array of a given object's own enumerable property names

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {username: 'testuser1', weight: 100} => ['"username"=$1', '"weight"=$2']

  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
