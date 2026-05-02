const User = require('../models/User');

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || 'Admin';

  if (!adminEmail || !adminPassword) {
    console.warn('Admin bootstrap skipped: ADMIN_EMAIL or ADMIN_PASSWORD missing');
    return;
  }

  const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });

  if (existingAdmin) {
    console.log(`Admin ready: ${existingAdmin.email}`);
    return;
  }

  await User.create({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
  });

  console.log(`Admin account created: ${adminEmail}`);
};

module.exports = ensureAdminUser;
