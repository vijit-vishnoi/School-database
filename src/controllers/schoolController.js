const SchoolService = require('../services/schoolService');
const schoolService = new SchoolService();

class SchoolController {
  async create(req, res) {
    try {
      const response = await schoolService.createSchool(req.body);
      return res.status(201).json({
        success: true,
        message: "School created successfully",
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        err: error.explanation || {},
      });
    }
  }

  async getAll(req, res) {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLng = parseFloat(req.query.longitude);

    if (isNaN(userLat) || isNaN(userLng)) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude query parameters are required and must be valid numbers.",
      });
    }

    const schools = await schoolService.getAllSchoolsSortedByDistance(userLat, userLng);
    return res.status(200).json({
      success: true,
      message: "Schools fetched and sorted by proximity successfully",
      data: schools,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: error.message,
    });
  }
}


  async getById(req, res) {
    try {
      const id = req.params.id;
      const school = await schoolService.getSchoolById(id);
      return res.status(200).json({
        success: true,
        message: "School fetched successfully",
        data: school,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        err: error.explanation || {},
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const updatedSchool = await schoolService.updateSchool(id, req.body);
      return res.status(200).json({
        success: true,
        message: "School updated successfully",
        data: updatedSchool,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        err: error.explanation || {},
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const response = await schoolService.deleteSchool(id);
      return res.status(200).json({
        success: true,
        message: response.message,
        data: {},
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        err: error.explanation || {},
      });
    }
  }
}

module.exports = new SchoolController();
