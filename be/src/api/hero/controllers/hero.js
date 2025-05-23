module.exports = {
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findMany('api::hero.hero', {
        populate: ['bannerImage'],
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
      const entity = await strapi.entityService.update('api::hero.hero', id, {
        data,
        populate: ['bannerImage'],
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
}; 