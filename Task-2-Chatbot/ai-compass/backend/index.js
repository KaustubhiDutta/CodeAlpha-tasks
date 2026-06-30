import express from 'express';
import cors from 'cors';
import faqRoutes from './routes/faq.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://code-alpha-tasks-chat.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// Root route handler - This fixes the "/" error
app.get('/', (req, res) => {
  res.json({
    message: 'AI Compass API is running',
    version: '1.0.0',
    endpoints: {
      'POST /api/faq/query': 'Query the AI tool database',
      'GET /api/faq/trending': 'Get trending AI tools',
      'GET /api/faq/categories': 'Get all categories',
      'GET /api/faq/all': 'Get all FAQs',
      'GET /api/health': 'Health check'
    },
    status: 'ok'
  });
});

// Routes
app.use('/api/faq', faqRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AI Compass API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler - Should be LAST
app.use((req, res) => {
  console.log(`❌ Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ 
    error: 'Route not found',
    path: req.url,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 AI Compass Server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET  /                  - API Info`);
  console.log(`   POST /api/faq/query     - Query AI tools`);
  console.log(`   GET  /api/faq/trending  - Trending tools`);
  console.log(`   GET  /api/faq/categories - All categories`);
  console.log(`   GET  /api/faq/all       - All FAQs`);
  console.log(`   GET  /api/health        - Health check`);
});