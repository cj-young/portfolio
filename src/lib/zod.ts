import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is requried").email("Invalid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(20_000, "Message cannot be more than 20,000 characters"),
  _honey: z.string().optional(),
});

export type ContactInfo = z.infer<typeof contactSchema>;
