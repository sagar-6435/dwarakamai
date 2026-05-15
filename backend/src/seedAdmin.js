const User = require("./models/User");

module.exports = async function seedAdmin() {
  const { SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME } = process.env;
  if (!SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD) return;

  const exists = await User.findOne({ email: SEED_ADMIN_EMAIL });
  if (exists) {
    console.log(`Admin already exists: ${SEED_ADMIN_EMAIL}`);
    return;
  }

  await User.create({
    name: SEED_ADMIN_NAME || "Admin",
    email: SEED_ADMIN_EMAIL,
    password: SEED_ADMIN_PASSWORD,
    role: "admin",
  });
  console.log(`Admin seeded: ${SEED_ADMIN_EMAIL}`);
};
