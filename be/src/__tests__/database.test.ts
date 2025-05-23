import type { Strapi as StrapiType } from '@strapi/strapi';
import Strapi from '@strapi/strapi';

let strapi: StrapiType;

beforeAll(async () => {
  strapi = await Strapi().load();
});

afterAll(async () => {
  await strapi.destroy();
});

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    const isConnected = await strapi.db.connection.isAlive();
    expect(isConnected).toBe(true);
  });

  it('should have correct database configuration', () => {
    const config = strapi.config.get('database.connection');
    expect(config.client).toBe('postgres');
    expect(config.connection.database).toBe('architect_portfolio');
    expect(config.connection.user).toBe('strapi');
  });
});

describe('Admin Authentication', () => {
  it('should login admin user successfully', async () => {
    const response = await strapi.admin.services.auth.login({
      email: process.env.STRAPI_ADMIN_EMAIL || 'admin@vuquangduc.com',
      password: process.env.STRAPI_ADMIN_PASSWORD || 'Admin@2024!',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user.email).toBe(process.env.STRAPI_ADMIN_EMAIL || 'admin@vuquangduc.com');
  });
}); 