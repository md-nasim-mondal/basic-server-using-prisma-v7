// prisma.config.ts
import { defineConfig } from '@prisma/config';
import 'dotenv/config'; // .env ফাইল লোড করার জন্য জরুরি

export default defineConfig({
  // স্কিমা ফাইলের লোকেশন (এখন ফোল্ডার বা ফাইল পাথ হতে পারে)
  schema: 'prisma/schema',
  
  // ডাটাবেস কানেকশন এখানেই দিতে হবে
  datasource: {
    url: process.env.DATABASE_URL, 
  },
  
  // ক্লায়েন্ট জেনারেশন আউটপুট (Optional, ডিফল্ট node_modules)
  // generator: {
  //   output: 'node_modules/.prisma/client',
  // }
});