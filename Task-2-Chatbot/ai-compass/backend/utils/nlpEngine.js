import natural from 'natural';
import stopword from 'stopword';
import { stemmer } from 'stemmer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

// ============================================================
// GREETINGS & SMALL TALK DETECTION
// ============================================================

const greetings = [
  'hello', 'hi', 'hey', 'greetings', 'sup', 'howdy', 'yo',
  'good morning', 'good afternoon', 'good evening', 'what\'s up',
  'how are you', 'how are you doing', 'hey there', 'hi there'
];

const smallTalk = {
  'thanks': "You're welcome! 😊 I'm glad I could help. If you have any more questions about AI, feel free to ask!",
  'thank you': "You're welcome! 😊 I'm always here to help you discover and learn about AI.",
  'ok': "Great! Let me know if you need any help with AI concepts or tools.",
  'okay': "Great! Let me know if you need any help with AI concepts or tools.",
  'nice': "I'm glad you liked it! 🎉 Anything else you'd like to know about AI?",
  'cool': "Awesome! 😎 Let me know if you have more questions about AI.",
  'bye': "Goodbye! 👋 It was great helping you. Come back anytime to discover more AI tools and concepts!",
  'goodbye': "Goodbye! 👋 It was great helping you. Come back anytime to discover more AI tools and concepts!"
};

// ============================================================
// INTENT PATTERNS - EXPANDED
// ============================================================

const intentPatterns = {
  'ai-basics': {
    keywords: ['what is ai', 'artificial intelligence', 'ai basics', 'how does ai work', 'types of ai', 'history of ai', 'applications of ai', 'agi', 'ai vs ml', 'neural network', 'llm', 'what is an llm', 'ai agents', 'future of ai', 'ai hallucinations', 'what is artificial intelligence', 'define ai', 'ai definition'],
    weight: 1.0
  },
  'learning-ai': {
    keywords: ['how to learn ai', 'learn ai', 'ai roadmap', 'learning ai', 'ai courses', 'learn machine learning', 'learn deep learning', 'ai for beginners', 'free ai courses', 'ai learning path', 'how to start ai', 'ai projects', 'learn programming ai', 'coding for ai'],
    weight: 1.0
  },
  'machine-learning': {
    keywords: ['machine learning', 'ml', 'supervised learning', 'unsupervised learning', 'reinforcement learning', 'ml algorithms', 'model training', 'overfitting', 'regression', 'classification', 'decision tree', 'random forest', 'svm', 'knn', 'what is ml'],
    weight: 1.0
  },
  'deep-learning': {
    keywords: ['deep learning', 'neural networks', 'cnn', 'rnn', 'transformer', 'lstm', 'attention mechanism', 'computer vision', 'transfer learning', 'fine-tuning', 'backpropagation', 'what is deep learning'],
    weight: 1.0
  },
  'generative-ai': {
    keywords: ['generative ai', 'gen ai', 'gpt', 'dall-e', 'midjourney', 'stable diffusion', 'text to image', 'text to video', 'ai art', 'ai music', 'suno', 'runway', 'pika', 'creative ai', 'what is generative ai'],
    weight: 1.0
  },
  'prompt-engineering': {
    keywords: ['prompt engineering', 'prompting', 'zero-shot', 'few-shot', 'chain-of-thought', 'prompt templates', 'effective prompts', 'prompt design', 'llm prompting', 'what is prompt engineering'],
    weight: 1.0
  },
  'tool-discovery': {
    keywords: ['best ai tools', 'top ai tools', 'ai tools for', 'recommend ai', 'find ai tools', 'free ai tools', 'ai for coding', 'ai for design', 'ai for writing', 'ai for video', 'ai for presentations', 'ai for research', 'ai for students', 'ai for business', 'what is the best ai', 'ai tool recommendation'],
    weight: 1.0
  },
  'tool-comparison': {
    keywords: ['vs', 'compare', 'comparison', 'better', 'chatgpt vs', 'claude vs', 'gemini vs', 'copilot vs', 'cursor vs', 'midjourney vs', 'dall-e vs', 'runway vs', 'pika vs', 'which is better', 'difference between', 'compare ai'],
    weight: 1.0
  },
  'ai-news': {
    keywords: ['latest ai', 'new ai', 'ai launch', 'ai release', 'ai breakthrough', 'ai update', 'openai update', 'anthropic update', 'google ai', 'ai trends', 'ai news', 'recent ai', 'ai innovations', 'what\'s new in ai'],
    weight: 1.0
  },
  'ai-careers': {
    keywords: ['ai career', 'ai engineer', 'machine learning engineer', 'data scientist', 'prompt engineer', 'ai job', 'ai salary', 'career in ai', 'ai roadmap', 'skills for ai', 'become ai engineer', 'ml engineer roadmap', 'how to become', 'ai jobs'],
    weight: 1.0
  },
  'coding-tools': {
    keywords: ['coding ai', 'programming ai', 'code assistant', 'github copilot', 'cursor', 'codeium', 'tabnine', 'debugging ai', 'code generation', 'web development ai', 'app development ai', 'react ai', 'python ai', 'javascript ai', 'best ai for coding'],
    weight: 1.0
  },
  'writing-tools': {
    keywords: ['writing ai', 'copywriting ai', 'content writing ai', 'blog writing ai', 'essay ai', 'grammar ai', 'storytelling ai', 'scriptwriting ai', 'email writing ai', 'best ai for writing'],
    weight: 1.0
  },
  'design-tools': {
    keywords: ['design ai', 'graphic design ai', 'logo ai', 'ui ux ai', 'presentation ai', 'slide ai', 'prototyping ai', 'best ai for design'],
    weight: 1.0
  },
  'image-generation': {
    keywords: ['image generation', 'ai art', 'image generator', 'midjourney', 'dall-e', 'stable diffusion', 'illustrations', 'anime ai', 'product images', 'marketing creatives', 'best ai image generator'],
    weight: 1.0
  },
  'video-generation': {
    keywords: ['video generator', 'ai video', 'runway', 'pika', 'synthesia', 'heygen', 'avatar', 'animation', 'youtube ai', 'short form video', 'best ai video generator'],
    weight: 1.0
  },
  'research-tools': {
    keywords: ['research ai', 'note taking ai', 'study ai', 'summarizer ai', 'ai search', 'meeting ai', 'perplexity', 'elicit', 'best ai for research'],
    weight: 1.0
  },
  'student-hub': {
    keywords: ['student ai', 'assignment ai', 'homework ai', 'exam prep ai', 'project ideas ai', 'learn programming ai', 'best ai for students', 'ai for studying'],
    weight: 1.0
  },
  'business-tools': {
    keywords: ['business ai', 'startup ai', 'marketing ai', 'sales ai', 'customer support ai', 'automation ai', 'entrepreneur ai', 'hubspot', 'zapier', 'best ai for business'],
    weight: 1.0
  },
  'ai-ethics': {
    keywords: ['ai safety', 'ai risks', 'ai bias', 'ai privacy', 'responsible ai', 'ai ethics', 'is ai safe', 'ai concerns'],
    weight: 1.0
  }
};

// ============================================================
// DATASET LOADING
// ============================================================

const datasetsPath = path.join(__dirname, '../datasets');
let datasetCache = {};

export function loadDataset(name) {
  if (datasetCache[name]) {
    return datasetCache[name];
  }
  
  try {
    const filePath = path.join(datasetsPath, `${name}.json`);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(data);
      datasetCache[name] = parsed;
      console.log(`✅ Loaded dataset: ${name} (${parsed.length} entries)`);
      return parsed;
    } else {
      console.log(`⚠️ Dataset not found: ${name}`);
    }
  } catch (error) {
    console.error(`❌ Error loading dataset ${name}:`, error);
  }
  return [];
}

// ============================================================
// PREPROCESSING
// ============================================================

export function preprocessText(text) {
  if (!text) return '';
  
  try {
    const lower = text.toLowerCase();
    let tokens = tokenizer.tokenize(lower);
    
    if (!tokens) tokens = [];
    
    tokens = stopword.removeStopwords(tokens);
    
    tokens = tokens.map(token => {
      try {
        return stemmer(token);
      } catch (e) {
        return token;
      }
    });
    
    tokens = tokens.filter(token => token && token.trim().length > 0);
    
    return tokens.join(' ');
  } catch (error) {
    console.error('Preprocessing error:', error);
    return text.toLowerCase();
  }
}

// ============================================================
// GREETING DETECTION
// ============================================================

export function detectGreeting(query) {
  const queryLower = query.toLowerCase().trim();
  
  for (const greeting of greetings) {
    if (queryLower === greeting || queryLower.startsWith(greeting + ' ') || queryLower.endsWith(' ' + greeting)) {
      return true;
    }
  }
  
  return false;
}

// ============================================================
// SMALL TALK DETECTION
// ============================================================

export function detectSmallTalk(query) {
  const queryLower = query.toLowerCase().trim();
  
  for (const [key, response] of Object.entries(smallTalk)) {
    if (queryLower === key || queryLower.includes(key)) {
      return response;
    }
  }
  
  return null;
}

// ============================================================
// INTENT DETECTION - IMPROVED
// ============================================================

export function detectIntent(query) {
  const queryLower = query.toLowerCase();
  let scores = {};
  
  for (const [intent, pattern] of Object.entries(intentPatterns)) {
    let score = 0;
    for (const keyword of pattern.keywords) {
      if (queryLower.includes(keyword)) {
        score += pattern.weight * 2; // Higher weight for exact matches
      }
    }
    // Check for partial matches
    const words = queryLower.split(' ');
    for (const word of words) {
      if (word.length > 3) {
        for (const keyword of pattern.keywords) {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 0.5;
          }
        }
      }
    }
    scores[intent] = score;
  }
  
  let bestIntent = 'tool-discovery';
  let bestScore = 0;
  
  for (const [intent, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }
  
  // If score is too low, try to detect from common patterns
  if (bestScore < 1) {
    // Check for learning-related queries
    if (queryLower.includes('learn') || queryLower.includes('how to') || queryLower.includes('roadmap')) {
      bestIntent = 'learning-ai';
    } else if (queryLower.includes('best') || queryLower.includes('tool') || queryLower.includes('recommend')) {
      bestIntent = 'tool-discovery';
    }
  }
  
  console.log(`🎯 Detected intent: ${bestIntent} (score: ${bestScore})`);
  return bestIntent;
}

// ============================================================
// GET DATASET FOR INTENT
// ============================================================

export function getDatasetForIntent(intent) {
  const datasetMap = {
    'ai-basics': 'ai-basics',
    'learning-ai': 'learning-ai',
    'machine-learning': 'machine-learning',
    'deep-learning': 'machine-learning',
    'generative-ai': 'generative-ai',
    'prompt-engineering': 'prompt-engineering',
    'tool-discovery': 'tool-discovery',
    'tool-comparison': 'tool-comparison',
    'ai-news': 'ai-news',
    'ai-careers': 'ai-careers',
    'coding-tools': 'coding-tools',
    'writing-tools': 'writing-tools',
    'design-tools': 'design-tools',
    'image-generation': 'image-generation',
    'video-generation': 'video-generation',
    'research-tools': 'research-tools',
    'student-hub': 'student-hub',
    'business-tools': 'business-tools',
    'ai-ethics': 'ai-ethics'
  };
  
  const datasetName = datasetMap[intent] || 'tool-discovery';
  const data = loadDataset(datasetName);
  return data;
}

// ============================================================
// GET ALL DATASET NAMES
// ============================================================

export function getDatasetNames() {
  return [
    { id: 'general', label: 'General' },
    { id: 'ai-basics', label: 'AI Basics' },
    { id: 'learning-ai', label: 'Learning AI' },
    { id: 'machine-learning', label: 'Machine Learning' },
    { id: 'generative-ai', label: 'Generative AI' },
    { id: 'prompt-engineering', label: 'Prompt Engineering' },
    { id: 'tool-discovery', label: 'Tool Discovery' },
    { id: 'tool-comparison', label: 'Tool Comparisons' },
    { id: 'writing-tools', label: 'Writing Tools' },
    { id: 'coding-tools', label: 'Coding Tools' },
    { id: 'design-tools', label: 'Design Tools' },
    { id: 'image-generation', label: 'Image Generation' },
    { id: 'video-generation', label: 'Video Generation' },
    { id: 'research-tools', label: 'Research Tools' },
    { id: 'student-hub', label: 'Student Hub' },
    { id: 'business-tools', label: 'Business Tools' },
    { id: 'ai-news', label: 'AI News' },
    { id: 'ai-careers', label: 'AI Careers' },
    { id: 'ai-ethics', label: 'AI Ethics' }
  ];
}

// ============================================================
// EXACT MATCH CHECK
// ============================================================

function checkExactMatch(query, documents) {
  const queryLower = query.toLowerCase().trim().replace(/[?.,!]/g, '').trim();
  
  let bestMatch = null;
  let bestScore = 0;
  
  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];
    const questionLower = doc.original.question.toLowerCase().replace(/[?.,!]/g, '').trim();
    
    // Check exact match with question
    if (questionLower === queryLower) {
      return { index: i, score: 100, type: 'exact' };
    }
    
    // Check aliases
    if (doc.original.aliases) {
      for (const alias of doc.original.aliases) {
        const aliasLower = alias.toLowerCase().replace(/[?.,!]/g, '').trim();
        if (aliasLower === queryLower) {
          return { index: i, score: 95, type: 'alias' };
        }
        if (queryLower.includes(aliasLower) || aliasLower.includes(queryLower)) {
          const score = Math.min((queryLower.length / aliasLower.length) * 85, 90);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = i;
          }
        }
      }
    }
    
    // Check containment
    if (questionLower.includes(queryLower) || queryLower.includes(questionLower)) {
      const score = Math.min((queryLower.length / questionLower.length) * 80, 85);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = i;
      }
    }
    
    // Word-by-word match with higher weight
    const queryWords = queryLower.split(' ');
    const questionWords = questionLower.split(' ');
    let matchCount = 0;
    let totalWeight = 0;
    
    for (const word of queryWords) {
      if (word.length > 2) {
        totalWeight++;
        if (questionWords.some(qw => qw.includes(word) || word.includes(qw))) {
          matchCount++;
        }
      }
    }
    
    if (matchCount > 0 && totalWeight > 0) {
      const wordScore = (matchCount / totalWeight) * 80;
      if (wordScore > bestScore) {
        bestScore = wordScore;
        bestMatch = i;
      }
    }
  }
  
  if (bestMatch !== null && bestScore > 40) {
    return { index: bestMatch, score: bestScore, type: 'partial' };
  }
  
  return null;
}

// ============================================================
// TF-IDF MATCHING
// ============================================================

function tfidfMatch(query, documents) {
  const processedQuery = preprocessText(query);
  
  if (!processedQuery || processedQuery.trim().length === 0) {
    return null;
  }
  
  const tfidf = new TfIdf();
  
  documents.forEach((doc, index) => {
    // Include question and aliases in the text for matching
    let text = doc.original.question;
    if (doc.original.aliases) {
      text += ' ' + doc.original.aliases.join(' ');
    }
    text += ' ' + (doc.original.category || '');
    text += ' ' + (doc.original.tags || []).join(' ');
    // Duplicate question for higher weight
    text += ' ' + doc.original.question;
    
    const processedDoc = preprocessText(text);
    if (processedDoc && processedDoc.trim()) {
      tfidf.addDocument(processedDoc);
    } else {
      tfidf.addDocument('');
    }
  });
  
  const queryTerms = processedQuery.split(' ').filter(term => term && term.trim().length > 0);
  const queryVector = {};
  
  queryTerms.forEach(term => {
    tfidf.tfidfs(term, (i, measure) => {
      if (measure > 0) {
        queryVector[term] = (queryVector[term] || 0) + measure;
      }
    });
  });
  
  if (Object.keys(queryVector).length === 0) {
    return null;
  }
  
  const docVectors = [];
  for (let i = 0; i < documents.length; i++) {
    const vector = {};
    const terms = tfidf.listTerms(i);
    if (terms) {
      terms.forEach(term => {
        vector[term.term] = term.tfidf;
      });
    }
    docVectors.push(vector);
  }
  
  function cosineSimilarity(vecA, vecB) {
    const terms = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
    let dot = 0, magA = 0, magB = 0;
    
    for (const term of terms) {
      const a = vecA[term] || 0;
      const b = vecB[term] || 0;
      dot += a * b;
      magA += a * a;
      magB += b * b;
    }
    
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
  }
  
  const similarities = docVectors.map((vec, idx) => ({
    index: idx,
    score: cosineSimilarity(queryVector, vec)
  }));
  
  similarities.sort((a, b) => b.score - a.score);
  
  return similarities;
}

// ============================================================
// KEYWORD FALLBACK
// ============================================================

function keywordMatch(query, documents) {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ').filter(w => w.length > 2);
  
  let bestScore = 0;
  let bestIndex = 0;
  const scores = [];
  
  documents.forEach((doc, idx) => {
    let score = 0;
    const questionLower = doc.original.question.toLowerCase();
    const tags = (doc.original.tags || []).join(' ').toLowerCase();
    const category = (doc.original.category || '').toLowerCase();
    const aliases = (doc.original.aliases || []).join(' ').toLowerCase();
    
    // Check each word with higher weight for question matches
    queryWords.forEach(word => {
      if (questionLower.includes(word)) score += 10;
      if (aliases.includes(word)) score += 7;
      if (tags.includes(word)) score += 4;
      if (category.includes(word)) score += 3;
    });
    
    // Check for phrase match with higher weight
    if (questionLower.includes(queryLower) || queryLower.includes(questionLower)) {
      score += 20;
    }
    
    scores.push({ index: idx, score });
    if (score > bestScore) {
      bestScore = score;
      bestIndex = idx;
    }
  });
  
  scores.sort((a, b) => b.score - a.score);
  
  const confidence = Math.min(Math.round((bestScore / (queryWords.length * 15)) * 100), 90);
  
  return {
    bestIndex,
    confidence: Math.max(confidence, 10),
    allScores: scores
  };
}

// ============================================================
// MAIN MATCH FUNCTION
// ============================================================

export function findBestMatch(query, documents, intent = null) {
  if (!query || !documents || documents.length === 0) {
    return {
      bestIndex: null,
      confidence: 0,
      relatedIndices: [],
      matchFound: false
    };
  }

  try {
    // Step 1: Check for exact match
    const exactMatch = checkExactMatch(query, documents);
    if (exactMatch && exactMatch.score > 50) {
      console.log(`✅ Found ${exactMatch.type} match with score: ${exactMatch.score}`);
      
      const relatedIndices = documents
        .map((_, idx) => idx)
        .filter(idx => idx !== exactMatch.index)
        .slice(0, 3);
      
      return {
        bestIndex: exactMatch.index,
        confidence: Math.min(exactMatch.score, 100),
        relatedIndices,
        matchFound: true
      };
    }
    
    // Step 2: TF-IDF matching
    const similarities = tfidfMatch(query, documents);
    if (similarities && similarities.length > 0) {
      const bestMatch = similarities[0];
      const confidence = Math.round(bestMatch.score * 100);
      
      // Lower threshold for better matching
      if (confidence >= 25) {
        console.log(`✅ TF-IDF match with confidence: ${confidence}%`);
        const relatedIndices = similarities
          .slice(1, 4)
          .map(s => s.index)
          .filter(idx => idx !== undefined && idx < documents.length);
        
        return {
          bestIndex: bestMatch.index,
          confidence: Math.min(confidence, 100),
          relatedIndices,
          matchFound: true
        };
      }
    }
    
    // Step 3: Keyword fallback
    console.log('⚠️ Low confidence in matching, trying keyword fallback...');
    const keywordResult = keywordMatch(query, documents);
    
    if (keywordResult.confidence >= 20) {
      const relatedIndices = keywordResult.allScores
        .slice(1, 4)
        .map(s => s.index)
        .filter(idx => idx !== keywordResult.bestIndex);
      
      return {
        bestIndex: keywordResult.bestIndex,
        confidence: keywordResult.confidence,
        relatedIndices,
        matchFound: true
      };
    }
    
    // No match found
    console.log('❌ No match found with sufficient confidence');
    return {
      bestIndex: null,
      confidence: 0,
      relatedIndices: [],
      matchFound: false
    };
    
  } catch (error) {
    console.error('NLP Engine Error:', error);
    return {
      bestIndex: null,
      confidence: 0,
      relatedIndices: [],
      matchFound: false
    };
  }
}

// ============================================================
// GENERATE FALLBACK RESPONSE
// ============================================================

export function generateFallbackResponse(intent = null) {
  const fallbacks = {
    'ai-basics': {
      answer: "I couldn't find a specific answer about AI Basics. Try asking:\n• What is AI?\n• How does AI work?\n• What are the types of AI?\n\nOr select a specific topic from the Learning Hub.",
      confidence: 0,
      relatedQuestions: ["What is AI?", "How does AI work?", "What are the types of AI?"]
    },
    'learning-ai': {
      answer: "I couldn't find a specific answer about learning AI. Try asking:\n• How to learn AI?\n• AI roadmap for beginners\n• Best free AI courses\n\nOr select a specific topic from the Learning Hub.",
      confidence: 0,
      relatedQuestions: ["How to learn AI?", "AI roadmap for beginners", "Best free AI courses"]
    },
    'machine-learning': {
      answer: "I couldn't find a specific answer about Machine Learning. Try asking:\n• What is Machine Learning?\n• What are the types of ML?\n• What is supervised learning?\n\nOr select a specific topic from the Learning Hub.",
      confidence: 0,
      relatedQuestions: ["What is Machine Learning?", "What are the types of ML?", "What is supervised learning?"]
    },
    'tool-discovery': {
      answer: "I couldn't find a specific answer about AI tools. Try asking:\n• Best AI for coding\n• AI for presentations\n• AI for design\n\nOr explore the Category Explorer to discover tools.",
      confidence: 0,
      relatedQuestions: ["Best AI for coding", "AI for presentations", "AI for design"]
    },
    'tool-comparison': {
      answer: "I couldn't find a specific comparison. Try asking:\n• ChatGPT vs Claude\n• Cursor vs GitHub Copilot\n• Midjourney vs DALL-E\n\nOr explore the Tool Comparison section.",
      confidence: 0,
      relatedQuestions: ["ChatGPT vs Claude", "Cursor vs GitHub Copilot", "Midjourney vs DALL-E"]
    },
    'general': {
      answer: "I couldn't confidently understand your request. Try asking about:\n\n📚 **AI Concepts** - What is AI? Machine Learning? Deep Learning?\n🤖 **AI Tools** - Best AI for coding, design, writing, video\n⚖️ **Tool Comparisons** - ChatGPT vs Claude, Cursor vs Copilot\n📈 **AI Trends** - Latest AI news, new AI tools\n🚀 **AI Careers** - How to become an AI engineer, AI roadmap\n\nOr select a topic from the Learning Hub!",
      confidence: 0,
      relatedQuestions: ["What is AI?", "Best AI for coding", "ChatGPT vs Claude", "Latest AI news"]
    }
  };
  
  const fallback = fallbacks[intent] || fallbacks['general'];
  return fallback;
}