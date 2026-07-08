const { z } = require("zod");

const createLinkSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
  alias: z
    .string()
    .min(3, "Alias must be at least 3 characters")
    .max(30, "Alias cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9-]+$/,
      "Alias can contain only letters, numbers and hyphens"
    )
    .optional(),
});

module.exports = {
  createLinkSchema,
};