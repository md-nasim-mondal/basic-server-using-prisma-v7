// prisma.config.ts
import { defineConfig } from '@prisma/config';
import 'dotenv/config'; // Essential for loading the .env file

export default defineConfig({
  // Schema file location (can be a folder or file path)
  schema: 'prisma/schema',
  
  // Database connection settings
  datasource: {
    url: process.env.DATABASE_URL, 
  },
  
  // Client generation output (Optional, defaults to node_modules)
  // generator: {
  //   output: 'node_modules/.prisma/client',
  // }
});