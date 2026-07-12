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
    expiresAt: z.string().datetime().optional(),

    password: z.string().min(6).optional(),
});

const updateLinkSchema = z
  .object({
    originalUrl: z.string().url().optional(),

    alias: z
      .string()
      .min(3)
      .max(30)
      .regex(
        /^[a-zA-Z0-9-]+$/,
        "Alias can contain only letters, numbers and hyphens"
      )
      .optional(),
  })
  .refine(
    (data) => data.originalUrl || data.alias,
    {
      message: "At least one field is required",
    }
  );

module.exports = {
  createLinkSchema,updateLinkSchema
};