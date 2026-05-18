import app from './app';
import { connectDB } from './config/db';
import { ENV } from './config/env';
import { User } from './models/user.model';
import { UserRole } from './interfaces/auth.interface';

const seedAdmin = async () => {
  const adminExists = await User.findOne({ email: 'admin@servicehive.com' });
  if (!adminExists) {
    await User.create({
      name: 'Admin User',
      email: 'admin@servicehive.com',
      password: 'password123',
      role: UserRole.ADMIN
    });
    console.log('Seeded default admin user: admin@servicehive.com / password123');
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
