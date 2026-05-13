import { body, param } from "express-validator";

export const createCommentValidator = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("INVALID_CONTENT")
    .isLength({ max: 1000 })
    .withMessage("COMMENT_TOO_LONG"),

  body("name")
  .optional({ checkFalsy: true })
  .trim()
  .isLength({ min: 5 })
  .withMessage("USERNAME_TOO_SHORT"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("INVALID_EMAIL_FORMAT"),
];

export const updateCommentValidator = [
  param("id")
    .notEmpty()
    .withMessage("INVALID_COMMENT_ID"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("INVALID_CONTENT"),
];

export const postIdParamValidator = [
  param("postId")
    .notEmpty()
    .withMessage("INVALID_POST_ID"),
];