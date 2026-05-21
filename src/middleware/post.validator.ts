import { body } from "express-validator";

export const createPostValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("TITLE_IS_REQUIRED")
    .isLength({ min: 3, max: 200 })
    .withMessage("TITLE_MUST_BE_3_200_CHARACTERS"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("CONTENT_IS_REQUIRED")
    .isLength({ min: 10 })
    .withMessage("CONTENT_MUST_BE_AT_LEAST_10_CHARACTERS"),

  body("published")
    .optional()
    .isBoolean()
    .withMessage("PUBLISHED_MUST_BE_BOOLEAN"),
];

export const updatePostValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("TITLE_MUST_BE_3_200_CHARACTERS"),

  body("content")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("CONTENT_MUST_BE_AT_LEAST_10_CHARACTERS"),

  body("published")
    .optional()
    .isBoolean()
    .withMessage("PUBLISHED_MUST_BE_TRUE_OR_FALSE"),
];