import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
// The key should be in a .env file as VITE_GEMINI_API_KEY
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (apiKey && apiKey !== 'your_api_key_here') {
  genAI = new GoogleGenerativeAI(apiKey);
}

export const runRewardAnalysis = async (employeesData, performanceData, attendanceData) => {
  if (!genAI) {
    console.warn("Gemini API Key missing. Returning mock AI analysis.");
    return mockAnalysis();
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      You are an expert HR AI Assistant for a Reward Management System.
      Analyze the following employee data to recommend the top 3 employees for rewards this month.
      Also, provide a brief bias detection report (check if rewards/performance scores seem fairly distributed across departments).
      
      Employees: ${JSON.stringify(employeesData)}
      Performance: ${JSON.stringify(performanceData)}
      Attendance: ${JSON.stringify(attendanceData)}
      
      Format your response as a JSON object with this structure:
      {
        "topRecommendations": [
          { "employeeId": "...", "name": "...", "reason": "...", "suggestedReward": "..." }
        ],
        "biasReport": {
          "isFair": true/false,
          "analysis": "..."
        },
        "generalInsights": "..."
      }
      
      Ensure the output is ONLY valid JSON. No markdown formatting blocks around it.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown blocks if Gemini ignores instructions
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateMotivation = async (userName) => {
  if (!genAI) {
    return `"Success is not final, failure is not fatal: it is the courage to continue that counts." — Winston Churchill`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Generate a short, powerful, single-sentence motivational quote for an employee named ${userName} to keep them engaged at work today. Do not include quotes around the text.`);
    return result.response.text();
  } catch (error) {
    return `"Every day is a new opportunity to excel."`;
  }
};

// Mock function in case no API key is provided
const mockAnalysis = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        topRecommendations: [
          { 
            employeeId: "EMP003", 
            name: "Mike Johnson", 
            reason: "Exceptional performance score of 94 and consistently exceeding sales targets.", 
            suggestedReward: "Diamond Tier Bonus" 
          },
          { 
            employeeId: "EMP001", 
            name: "John Doe", 
            reason: "Perfect 100% attendance rate in November and high teamwork ratings.", 
            suggestedReward: "Consistency Badge + 50 points" 
          },
          { 
            employeeId: "EMP002", 
            name: "Sarah Smith", 
            reason: "Improved task completion rate by 15% and received outstanding peer feedback.", 
            suggestedReward: "Silver Tier Boost" 
          }
        ],
        biasReport: {
          "isFair": true,
          "analysis": "Scores appear to be normally distributed across Engineering, Marketing, and Sales departments. No significant outliers suggesting departmental bias detected in this cycle."
        },
        generalInsights: "Overall team attendance is strong at 94%. Focus next month on improving innovation scores across the Engineering department."
      });
    }, 2500); // Simulate network delay
  });
};
