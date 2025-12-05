/**
 * List available OpenAI models
 */

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

// Load .env.local file
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim();
        if (key && value) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();

async function listModels() {
  const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ OpenAI API key not found. Please set VITE_OPENAI_API_KEY or OPENAI_API_KEY in .env.local');
    process.exit(1);
  }

  console.log('🔑 API Key found:', apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4));
  console.log('\n📋 Fetching available models...\n');

  const openai = new OpenAI({ apiKey });

  try {
    const models = await openai.models.list();
    
    // Filter GPT models
    const gptModels = models.data
      .filter(model => model.id.includes('gpt'))
      .sort((a, b) => a.id.localeCompare(b.id));

    console.log(`✅ Found ${gptModels.length} GPT models:\n`);
    
    gptModels.forEach(model => {
      console.log(`  • ${model.id}`);
      console.log(`    Created: ${new Date(model.created * 1000).toLocaleDateString()}`);
      console.log(`    Owner: ${model.owned_by}`);
      console.log('');
    });

    // Highlight recommended models for translation
    console.log('\n🌟 Recommended models for translation:');
    const recommended = [
      'gpt-4o',
      'gpt-4o-mini', 
      'gpt-4-turbo',
      'gpt-4',
    ];

    recommended.forEach(modelId => {
      const found = gptModels.find(m => m.id === modelId);
      if (found) {
        console.log(`  ✓ ${modelId}`);
      }
    });

  } catch (error: any) {
    console.error('❌ Error fetching models:', error.message);
    if (error.status) {
      console.error(`   Status: ${error.status}`);
    }
    process.exit(1);
  }
}

listModels();
