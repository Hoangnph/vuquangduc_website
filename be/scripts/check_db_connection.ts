import strapi from '@strapi/strapi';

async function checkDbConnection() {
  console.log("Starting check DB connection…");
  let strapiInstance: any = null;
  try {
    // @ts-ignore
    strapiInstance = await strapi().load();
    const alive = await strapiInstance.db.connection.isAlive();
    console.log("Strapi DB connection alive:", alive);
  } catch (e) {
    console.error("Error checking DB connection:", e);
  } finally {
    if (strapiInstance) {
      await strapiInstance.destroy();
    }
  }
}

checkDbConnection(); 