const express = require('express');
const { Configuration, OpenAI } = require('openai');
require('dotenv').config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/generate', async (req, res) => {
  const { profile, jobDescription } = req.body;

  if (!profile || !jobDescription) {
    return res.status(400).json({ error: 'Missing profile or job description' });
  }

  try {
    const prompt = `
Based on the profile data below and the job description, generate a professional resume tailored for this job.

Job Description:
${jobDescription}

Profile:
Name: ${profile.name}
Email: ${profile.email}
Phone: ${profile.phone}
LinkedIn: ${profile.linkedin}
City: ${profile.city}, ${profile.state}

Education:
${profile.education.map(e => `- ${e.degree} from ${e.university} (${e.date})`).join('\n')}

Experience:
${profile.experience.map(e => `- ${e.role} at ${e.company} (${e.date})`).join('\n')}

Generate a resume with 8 to 9 bullet points for each company, focusing on deep-tech project development experience.
`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o"
    });

    const resume = completion.choices[0].message.content;
    res.json({ resume });
  } catch (err) {
    console.error('OpenAI error:', err.message);
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});

module.exports = router;
