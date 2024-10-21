import { z } from "zod";

// Create Article Schema
export const createArticleSchema= z.object({
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "title should be of type string"
    })
    .min(2, {message: "title should be at least 2 characters long"})
    .max(200, {message: "title should be less than 200 characters"}),
    description: z.string({
        required_error: "description is required"
    }).min(10)
});

// Register Schema 
export const registerSchema = z.object({
    username: z.string().min(2).max(100), //.optional(),  إذا أردت أن يكون اسم المستخدم اختياري نضع هذه
    email: z.string().min(2).max(200).email(),
    password: z.string().min(6),
});

// Login Schema 
export const loginSchema = z.object({
    email: z.string().min(2).max(200).email(),
    password: z.string().min(6),
});

// create comment schema

export const createCommentSchema = z.object({
    text: z.string().min(2).max(500),
    articleId: z.number(),
});

// Update user Profile schema 
export const updateUserSchema = z.object({
    username: z.string().min(2).max(100).optional(),
    email: z.string().min(2).max(200).email().optional(),
    password: z.string().min(6).optional(),
});