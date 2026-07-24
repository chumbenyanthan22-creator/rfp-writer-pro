const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.post('/api/proposals/generate', (req, res) => {
  const { rfpContent, language, industry } = req.body;

  const proposalText = `
📄 PROPOSAL GENERATED

Industry: ${industry || 'General'}
Language: ${language || 'English'}

Based on your RFP:
${rfpContent ? rfpContent.substring(0, 200) + '...' : 'No RFP content provided'}

EXECUTIVE SUMMARY:
We are pleased to submit our proposal. Our team brings extensive expertise.

✅ Ready for submission!
  `;

  res.json({
    success: true,
    proposal: {
      id: Date.now(),
      content: proposalText,
      language: language || 'English',
      industry: industry || 'General'
    },
    creditsRemaining: 4
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
