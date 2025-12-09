import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CourseData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const courseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    code: { type: Type.STRING, description: "Course code, e.g., CS224n" },
    title: { type: Type.STRING, description: "Official course title" },
    department: { type: Type.STRING, description: "Department name, e.g., Computer Science" },
    instructor: { type: Type.STRING, description: "Name of the professor (can be fictional or famous AI figure)" },
    description: { type: Type.STRING, description: "2-3 paragraphs describing the course in academic tone" },
    prerequisites: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    learningOutcomes: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    modules: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          weekNumber: { type: Type.INTEGER },
          topic: { type: Type.STRING },
          description: { type: Type.STRING },
          keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          readings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                author: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["Book", "Paper", "Article", "Video"] },
                description: { type: Type.STRING, description: "Brief summary of the reading and why it is relevant to this week." }
              },
              required: ["title", "author", "type", "description"]
            }
          }
        },
        required: ["weekNumber", "topic", "description", "keyConcepts", "readings"]
      }
    },
    assignments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING, description: "Detailed, step-by-step technical instructions for the assignment." },
          estimatedHours: { type: Type.INTEGER },
          technicalRequirements: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING }, 
            description: "Specific technical constraints (e.g. 'Use Python 3.8+', 'Max runtime 2s', 'Implement O(n log n) sort')"
          },
          relevantLinks: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Title of the resource, e.g. 'LeetCode: Two Sum'" },
                    url: { type: Type.STRING, description: "URL to the problem or resource" }
                },
                required: ["title", "url"]
            },
            description: "Links to relevant external practice problems (LeetCode, Kaggle, Project Euler) or documentation."
          }
        },
        required: ["title", "description", "estimatedHours", "technicalRequirements", "relevantLinks"]
      }
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
          deliverables: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "description", "technologies", "deliverables"]
      }
    },
    capstone: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Title like 'Industry-Scale Capstone Project'" },
        description: { type: Type.STRING, description: "Explanation that the project is open-ended but strictly constrained by technical requirements." },
        requirements: {
          type: Type.OBJECT,
          properties: {
            complexity: { type: Type.STRING, description: "Required technical complexity (e.g., Microservices, Custom Architecture)" },
            dataScale: { type: Type.STRING, description: "Data requirements (e.g., >10GB dataset, Real-time streaming)" },
            deployment: { type: Type.STRING, description: "Deployment requirements (e.g., Kubernetes, CI/CD, <100ms latency)" },
            industryStandards: { type: Type.STRING, description: "Compliance/Standards (e.g., GDPR, Unit Testing >80%, Documentation)" }
          },
          required: ["complexity", "dataScale", "deployment", "industryStandards"]
        },
        suggestedTopics: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 broad domains or problem areas students can choose from." },
        milestones: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Phases of development." },
        deliverables: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Final submission items (Code, Report, Demo)." }
      },
      required: ["title", "description", "requirements", "suggestedTopics", "milestones", "deliverables"]
    }
  },
  required: [
    "code",
    "title",
    "department",
    "instructor",
    "description",
    "prerequisites",
    "learningOutcomes",
    "modules",
    "assignments",
    "projects",
    "capstone"
  ]
};

export const generateCourse = async (topic: string, file?: { data: string; mimeType: string }): Promise<CourseData> => {
  const model = "gemini-2.5-flash"; 

  const systemInstruction = `
    You are a distinguished professor and curriculum designer at Stanford University.
    Design a comprehensive, world-class university course based on the user's input (syllabus file or topic description).

    The course should be rigorous, academic, and practical.
    
    Requirements:
    1. Structure the course into 8-12 weeks (modules).
    2. FOR EACH WEEK, provide a specific reading list (2-3 items) relevant to that week's topic. Use real academic papers, textbook chapters, or authoritative videos.
    3. Create challenging assignments. **IMPORTANT**: assignments must be deeply technical. Include specific constraints (memory, time complexity, specific libraries) and provide external links to similar practice problems (e.g. LeetCode, HackerRank, Kaggle, arXiv) where students can practice.
    4. Design 2-3 mid-sized projects.
    5. Design one massive Capstone Project. **CRITICAL**: The Capstone must be OPEN-ENDED (students choose their own specific topic) but strictly constrained by INDUSTRY STANDARDS. 
       - Do not simply assign "Build X". Instead, say "Build a system that solves a problem in domain Y, satisfying Z constraints."
       - You must define strict requirements for:
         * Technical Complexity (e.g., distributed systems, custom transformer models)
         * Data Scale (e.g., large datasets, high velocity streams)
         * Deployment (e.g., fully containerized, CI/CD pipeline, production monitoring)
         * Industry Standards (e.g., thorough documentation, testing coverage, security compliance).
    
    Tone: Academic, Professional, Inspiring.
  `;

  const parts: any[] = [];

  if (file) {
      parts.push({
          inlineData: {
              data: file.data,
              mimeType: file.mimeType
          }
      });
      parts.push({
          text: `Create the course website content based on this attached syllabus/document. Additional Instructions: ${topic || "Use the document provided."}`
      });
  } else {
      parts.push({
          text: `Create the course website content based on the following syllabus/topic input: "${topic}"`
      });
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: courseSchema,
        temperature: 0.3,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No data returned from Gemini");
    }

    return JSON.parse(text) as CourseData;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};