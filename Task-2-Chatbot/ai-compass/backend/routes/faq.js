import express from 'express';
import { 
  findBestMatch, 
  detectIntent, 
  getDatasetForIntent,
  getDatasetNames,
  preprocessText,
  detectGreeting,
  detectSmallTalk,
  generateFallbackResponse
} from '../utils/nlpEngine.js';
import { trendingTools } from '../data/faqDataset.js';

const router = express.Router();

// ============================================================
// MAIN QUERY ENDPOINT
// ============================================================

router.post('/query', (req, res) => {
  try {
    const { query, topic } = req.body;
    
    console.log('📝 Received query:', query);
    console.log('📂 Selected topic:', topic || 'auto');
    
    // Validate query
    if (!query || query.trim().length < 2) {
      return res.json({
        answer: "Please enter a more specific question. I can help with:\n\n• AI Concepts (What is AI?)\n• AI Tools (Best AI for coding)\n• Tool Comparisons (ChatGPT vs Claude)\n• AI Trends (Latest AI news)\n• AI Careers (How to become an AI engineer)",
        confidence: 0,
        relatedQuestions: ["What is AI?", "Best AI for coding", "ChatGPT vs Claude"],
        isFallback: true
      });
    }

    const trimmedQuery = query.trim();
    
    // Check greetings
    if (detectGreeting(trimmedQuery)) {
      return res.json({
        answer: "Hello! 👋 Welcome to AI Compass.\n\nI'm here to help you with:\n\n📚 **Learn AI Concepts** - AI basics, Machine Learning, Deep Learning\n🤖 **Discover AI Tools** - Find the best AI tools for any task\n⚖️ **Compare AI Tools** - Side-by-side comparisons\n📈 **Explore AI Trends** - Latest AI news and breakthroughs\n🚀 **AI Career Roadmaps** - How to become an AI professional\n\nWhat would you like to explore today?",
        confidence: 100,
        relatedQuestions: ["What is AI?", "Best AI for coding", "ChatGPT vs Claude"],
        isGreeting: true
      });
    }
    
    // Check small talk
    const smallTalkResponse = detectSmallTalk(trimmedQuery);
    if (smallTalkResponse) {
      return res.json({
        answer: smallTalkResponse,
        confidence: 100,
        relatedQuestions: [],
        isSmallTalk: true
      });
    }
    
    // Detect intent
    let selectedIntent = topic;
    if (!selectedIntent) {
      selectedIntent = detectIntent(trimmedQuery);
    }
    
    console.log('🎯 Using intent:', selectedIntent);
    
    // Get dataset for intent
    let documents = getDatasetForIntent(selectedIntent);
    
    // If no documents found, try all datasets
    if (!documents || documents.length === 0) {
      console.log('⚠️ No documents found for intent, trying all datasets...');
      const allDatasets = getDatasetNames();
      for (const dataset of allDatasets) {
        const docs = getDatasetForIntent(dataset.id);
        if (docs && docs.length > 0) {
          documents = docs;
          break;
        }
      }
    }
    
    if (!documents || documents.length === 0) {
      return res.json({
        answer: "I couldn't find any learning content. Please try again later.",
        confidence: 0,
        relatedQuestions: [],
        isFallback: true
      });
    }
    
    // Convert to documents for matching
    const faqDocuments = documents.map(faq => ({
      id: faq?.id || Math.random(),
      text: `${faq?.question || ''} ${(faq?.tags || []).join(' ')} ${faq?.category || ''}`,
      original: faq || {}
    }));
    
    // Find best match
    const { bestIndex, confidence, relatedIndices, matchFound } = findBestMatch(trimmedQuery, faqDocuments);
    
    // Handle no match
    if (!matchFound) {
      console.log('❌ No match found, returning fallback');
      const fallback = generateFallbackResponse(selectedIntent);
      return res.json({
        answer: fallback.answer,
        confidence: 0,
        relatedQuestions: fallback.relatedQuestions || [],
        isFallback: true,
        intent: selectedIntent
      });
    }
    
    // Get best match
    const bestMatch = faqDocuments[bestIndex];
    
    // Get related questions
    const relatedQuestions = relatedIndices
      .map(idx => faqDocuments[idx]?.original?.question || '')
      .filter(q => q && q !== bestMatch?.original?.question)
      .slice(0, 3);
    
    // Build response
    const response = {
      answer: bestMatch?.original?.answer || "I couldn't find a specific match. Could you rephrase your question?",
      confidence: confidence || 0,
      category: bestMatch?.original?.category || 'General',
      toolLinks: bestMatch?.original?.toolLinks || [],
      relatedQuestions: relatedQuestions,
      queryProcessed: preprocessText(trimmedQuery),
      intent: selectedIntent,
      isFallback: false
    };
    
    console.log('✅ Sending response with confidence:', response.confidence);
    console.log('✅ Matched question:', bestMatch?.original?.question);
    res.json(response);
    
  } catch (error) {
    console.error('❌ Error processing query:', error);
    res.status(500).json({ 
      error: 'Internal server error. Please try again.' 
    });
  }
});

// ============================================================
// GET DATASETS
// ============================================================

router.get('/datasets', (req, res) => {
  try {
    const datasets = getDatasetNames();
    res.json(datasets);
  } catch (error) {
    console.error('❌ Error fetching datasets:', error);
    res.status(500).json({ error: 'Failed to fetch datasets' });
  }
});

// ============================================================
// GET TRENDING TOOLS
// ============================================================

router.get('/trending', (req, res) => {
  try {
    console.log('📊 Fetching trending tools');
    res.json(trendingTools || []);
  } catch (error) {
    console.error('❌ Error fetching trending:', error);
    res.status(500).json({ error: 'Failed to fetch trending tools' });
  }
});

// ============================================================
// GET CATEGORIES
// ============================================================

router.get('/categories', (req, res) => {
  try {
    const datasets = getDatasetNames();
    const categories = datasets.map(d => d.label);
    res.json(categories);
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default router;