import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { processAIChat } from './src/server/geminiService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side AI assistant route
app.post('/api/ai/assistant', async (req, res) => {
  try {
    const result = await processAIChat(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Server error processing AI chat:', error);
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

// Serve Vite build assets
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`PupLume server running on http://0.0.0.0:${PORT}`);
});
