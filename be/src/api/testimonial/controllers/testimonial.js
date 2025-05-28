module.exports = {
  async find(ctx) {
    try {
      const { query } = ctx;
      const { sort = 'order:asc', isActive = true, limit = 3 } = query;
      let sortObj = { order: 'asc' };
      if (typeof sort === 'string' && sort.includes(':')) {
        const [field, direction] = sort.split(':');
        sortObj = { [field]: direction };
      }
      const entities = await strapi.entityService.findMany('api::testimonial.testimonial', {
        filters: { isActive },
        sort: sortObj,
        populate: ['avatar'],
        limit: Number(limit),
      });
      return entities;
    } catch (err) {
      ctx.body = err;
    }
  },
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.entityService.findOne('api::testimonial.testimonial', id, {
        populate: ['avatar'],
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.create('api::testimonial.testimonial', {
        data,
        populate: ['avatar'],
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
      const entity = await strapi.entityService.update('api::testimonial.testimonial', id, {
        data,
        populate: ['avatar'],
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
  async delete(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.entityService.delete('api::testimonial.testimonial', id);
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
}; 