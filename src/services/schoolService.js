const db = require('../config/db'); 
const schoolRepository = require('../repository/schoolRepository');


class SchoolService {
  async createSchool(data) {
    const { name, address, latitude, longitude } = data;

    
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

    
    const existing = await this.getSchoolById(id);

    
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

    
    return { id, name, address, latitude: lat, longitude: long };
  }

  async deleteSchool(id) {
    
    await this.getSchoolById(id);

    await db.query("DELETE FROM school WHERE id = ?", [id]);
    return { message: `School with id ${id} deleted successfully` };
  }
}

module.exports = SchoolService;
