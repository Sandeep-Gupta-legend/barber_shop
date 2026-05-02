const express = require('express');
const {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getAppointments).post(createAppointment);
router.route('/:id').patch(protect, updateAppointmentStatus).delete(protect, deleteAppointment);

module.exports = router;
