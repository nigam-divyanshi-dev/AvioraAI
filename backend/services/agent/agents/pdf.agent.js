// package installed and used - PDFKit
// it is a documnet generation library for node

import { getModel } from "../config/llmModels.js"
import { generatePdf } from "../utils/generatePdf.js"
import { uploadToS3 } from "../utils/uploadToS3.js"
import { getFromS3 } from "../utils/getFromS3.js"
export const pdfAgent = async (state) => {
  try {
    const llm = await getModel("pdf")
    const prompt = 
    `
You are an expert document writer.

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT return explanations.

Structure:

{
"title":"",
"subtitle":"",
"sections":[
{
"heading":"",
"points":[]
}
]
}

Generate 4-8 sections.

Each section should have 3-6 concise bullet points.

Generate 4-8 sections.

The first section must be "Introduction".

The last section must be "Conclusion".

IMPORTANT:
The user's message is a request to create a document, NOT the topic itself.
Extract the actual subject (for example, from "generate pdf for virat kohli" the subject is "Virat Kohli").
Write the document's CONTENT about that subject: facts, background, achievements, details.
Do NOT write about how to make a PDF, document design, or tools.

User Request:

${state.prompt}

`;
    const res = await llm.invoke(prompt)
    const data = JSON.parse(res.content)
    const pdfBuffer = await generatePdf(data);

    const filename = `pdf-${Date.now()}.pdf`;
    await uploadToS3(filename, pdfBuffer, "application/pdf");

    const downloadUrl = await getFromS3(filename, 24 * 60);

    return {
      ...state,
      aiResponse: `# PDF Generated

**${data.title}**

📥 [Download PDF](${downloadUrl})

_Link expires in 10 minutes._`,
    };
  } catch (error) {
    console.log(error);
    return {
      ...state,
      aiResponse: "Failed to generate PDF",
    };
  }
};
