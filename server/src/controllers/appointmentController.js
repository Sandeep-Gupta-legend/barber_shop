const Appointment = require('../models/Appointment');

const getAppointments = async (req, res) => {
  const appointments = await Appointment.find()
    .populate('service', 'name price duration')
    .sort({ createdAt: -1 });

  return res.json(appointments);
};

const createAppointment = async (req, res) => {
  const {
    customerName,
    customerEmail,
    customerPhone,
    service,
    date,
    time,
    notes,
  } = req.body;

  if (!customerName || !customerEmail || !customerPhone || !service || !date || !time) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    const appointment = await Appointment.create({
      customerName,
      customerEmail,
      customerPhone,
      service,
      date,
      time,
      notes: notes || '',
    });

    const populated = await appointment.populate('service', 'name price duration');
    return res.status(201).json(populated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Selected slot is already booked for this service' });
    }

    throw error;
  }
};

const updateAppointmentStatus = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  const { status } = req.body;

  if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  appointment.status = status;
  await appointment.save();

  const populated = await Appointment.findById(appointment._id).populate('service', 'name price duration');
  return res.json(populated);
};

const deleteAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  await appointment.deleteOne();
  return res.json({ message: 'Appointment removed' });
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
};
