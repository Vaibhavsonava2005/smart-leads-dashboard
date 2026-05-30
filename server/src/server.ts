import app from './app';
import { connectDB } from './config/db';
import { ENV } from './config/env';
import { User } from './models/user.model';
import { UserRole } from './interfaces/auth.interface';

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@servicehive.com';
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    if (ENV.NODE_ENV === 'production') {
      console.warn('ADMIN_PASSWORD not set — skipping admin seed in production');
      return;
    }
    // In development, skip seeding if no password is provided
    console.warn('ADMIN_PASSWORD not set — skipping admin seed');
    return;
  }

  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: adminPassword,
      role: UserRole.ADMIN
    });
    console.log(`Seeded default admin user: ${adminEmail}`);
  }
};

const startServer = async () => {
  await connectDB();
  await seedAdmin();

  app.listen(ENV.PORT, () => {
    console.log(`Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`);
  });
};

startServer();
