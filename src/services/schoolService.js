const db = require('../config/db'); // Your DB connection
const schoolRepository = require('../repository/schoolRepository');


class SchoolService {
  async createSchool(data) {
    const { name, address, latitude, longitude } = data;

    // Validate required fields
    if (!name || !address) {
      throw {
        statusCode: 400,
        message: "Name and address are required",
        explanation: "Missing required fields"
      };
    }

    const lat = latitude ? parseFloat(latitude) : null;
    const long = longitude ? parseFloat(longitude) : null;

    const result = await db.query(
      "INSERT INTO school (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, lat, long]
    );

    return { id: result.insertId, name, address, latitude: lat, longitude: long };
  }

  async getAllSchools() {
    const [rows] = await db.query("SELECT * FROM school");
    return rows;
  }

  async getAllSchoolsSortedByDistance(lat, lng) {
  return await schoolRepository.findAllSortedByDistance(lat, lng);
}


  async getSchoolById(id) {
    const [rows] = await db.query("SELECT * FROM school WHERE id = ?", [id]);
    if (rows.length === 0) {
      throw {
        statusCode: 404,
        message: `School with id ${id} not found`,
        explanation: "Invalid school ID"
      };
    }
    return rows[0];
  }

  async updateSchool(id, data) {
    const { name, address, latitude, longitude } = data;

    // Optional: check if school exists before updating
    const existing = await this.getSchoolById(id);

    // Validate required fields if you want to enforce on update as well
    if (!name || !address) {
      throw {
        statusCode: 400,
        message: "Name and address are required",
        explanation: "Missing required fields"
      };
    }

    const lat = latitude ? parseFloat(latitude) : null;
    const long = longitude ? parseFloat(longitude) : null;

    await db.query(
      "UPDATE school SET name = ?, address = ?, latitude = ?, longitude = ? WHERE id = ?",
      [name, address, lat, long, id]
    );

    // Return updated record (or minimal info)
    return { id, name, address, latitude: lat, longitude: long };
  }

  async deleteSchool(id) {
    // Optional: check if school exists before deleting
    await this.getSchoolById(id);

    await db.query("DELETE FROM school WHERE id = ?", [id]);
    return { message: `School with id ${id} deleted successfully` };
  }
}

module.exports = SchoolService;
