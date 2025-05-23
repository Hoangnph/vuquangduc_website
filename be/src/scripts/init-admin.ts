import { createStrapi } from '@strapi/strapi';

async function initializeAdmin() {
  try {
    const strapi = await createStrapi().load();

    // Login as admin
    const adminEmail = process.env.STRAPI_ADMIN_EMAIL || 'admin@vuquangduc.com';
    const adminPassword = process.env.STRAPI_ADMIN_PASSWORD || 'Admin@2024!';

    console.log('Logging in as admin...');
    const response = await strapi.admin.services.auth.login({
      email: adminEmail,
      password: adminPassword,
    });

    if (response.token) {
      console.log('Successfully logged in as admin');
      console.log('Admin token:', response.token);
    }

    // Initialize content types and permissions here
    // Example:
    // await strapi.query('api::article.article').create({
    //   data: {
    //     title: 'Welcome to Architect Portfolio',
    //     content: 'This is your first article.',
    //     publishedAt: new Date(),
    //   },
    // });

    await strapi.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error initializing admin:', error);
    process.exit(1);
  }
}

initializeAdmin(); 