import path from "path";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: path.join(__dirname, "../.env") });

const environmentSchema = z.object({
  ACCESS_TOKEN_SECRET: z.string().min(64),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  RETRY_COUNT: z.coerce.number().int().positive(),
});

let protoconfig: z.infer<typeof environmentSchema>;

try {
  protoconfig = environmentSchema.parse(process.env);
} catch (e) {
  const err = e as z.ZodError;
  for (const issue of err.issues) {
    if (issue.message === "Required")
      console.error(`${issue.path} is required`);
    else console.error(`${issue.path}: ${issue.message}`);
  }
  throw new Error("Environment variables are not setup correctly");
}

export const config = protoconfig;
