"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.db.query("api::post.post").findOne({
      where: { slug: id },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
