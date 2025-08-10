import fs from 'fs';
import path from 'path';
const envLocal = path.resolve('.env.local');
const envExample = path.resolve('.env.example');
if (!fs.existsSync(envLocal)) {
  if (!fs.existsSync(envExample)) {
    console.error('Missing .env.example'); process.exit(1);
  }
  fs.copyFileSync(envExample, envLocal);
  console.log('Created .env.local from .env.example');
  console.log('Fill GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / NEXTAUTH_SECRET.');
} else {
  console.log('.env.local already exists.');
}
