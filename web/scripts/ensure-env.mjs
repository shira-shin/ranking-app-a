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
  console.log('自分でClient ID/Secretを入れてください (NEXTAUTH_SECRET も設定)');
} else {
  console.log('.env.local already exists.');
}
