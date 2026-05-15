const User = require('./models/User');

const seedAdmin = async () => {
  if (process.env.SEED_ADMIN !== 'true') return;

  const email = (process.env.SEED_ADMIN_EMAIL || '').toLowerCase().trim();
  const password = process.env.SEED_ADMIN_PASSWORD || '';
  const name = process.env.SEED_ADMIN_NAME || 'Admin';

  if (!email || !password) {
    console.warn('[Seed] SEED_ADMIN=true but SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD is missing — skipping');
    return;
  }

  if (password.length < 6) {
    console.warn('[Seed] SEED_ADMIN_PASSWORD must be at least 6 characters — skipping');
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`[Seed] Admin user ${email} already exists — skipping`);
    return;
  }

  await User.create({ name, email, password, role: 'admin' });
  console.log(`[Seed] Seeded admin user: ${email}`);
};

module.exports = seedAdmin;
