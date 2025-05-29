module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon', // Tắt middleware favicon để tránh lỗi ENOENT (không tìm thấy favicon.ico)
  'strapi::public',
]; 