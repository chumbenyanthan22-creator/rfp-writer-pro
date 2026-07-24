const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.post('/api/proposals/generate', (req, res) => {
  const { rfpContent, language, industry } = req.body;
  
  try {
    const proposal = {
      id: Date.now(),
      content: `Based on your RFP:\n\n${rfpContent.substring(0, 200)}...\n\nEXECUTIVE SUMMARY:\n- We are pleased to submit our proposal. Our team brings extensive expertise in ${industry || 'this industry'}\n\nTECHNICAL APPROACH:\n- Our methodology combines industry best practices with innovative solutions.\n\nPRICING:\n- Competitive pricing structure optimized for value delivery.`,
      language: language || 'English',
      industry: industry || 'General',
      created_at: new Date().toISOString()
    };
    
    res.json({ success: true, proposal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`RFP Writer Pro server running on port ${PORT}`);
});
