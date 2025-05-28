module.exports = {
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findMany('api::about.about', {
        populate: ['avatar', 'images', 'video'],
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.update('api::about.about', id, {
        data,
        populate: ['avatar', 'images', 'video'],
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
}; 