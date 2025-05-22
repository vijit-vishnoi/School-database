const db = require('../config/db');

class SchoolRepository {
  async create(school) {
    const [result] = await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [school.name, school.address, school.latitude, school.longitude]
    );
    return result.insertId;
  }

  async findAll() {
    const [rows] = await db.execute('SELECT * FROM school');
    return rows;
  }

  async findAllSortedByDistance(lat, lng) {
  const query = `
    SELECT *,
      (6371 * acos(
        cos(radians(?)) * cos(radians(latitude)) *
        cos(radians(longitude) - radians(?)) +
        sin(radians(?)) * sin(radians(latitude))
      )) AS distance
    FROM school
    ORDER BY distance ASC
  `;
  const [rows] = await db.execute(query, [lat, lng, lat]);
  return rows;
}



  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM schools WHERE id = ?', [id]);
    return rows[0];
  }

  async update(id, school) {
    await db.execute(
      'UPDATE schools SET name = ?, address = ?, latitude = ?, longitude = ? WHERE id = ?',
      [school.name, school.address, school.latitude, school.longitude, id]
    );
  }

  async delete(id) {
    await db.execute('DELETE FROM schools WHERE id = ?', [id]);
  }
}

module.exports = new SchoolRepository();
