// autopost-facebook-deans.js
// Dean's Handyman Service LLC — Full Auto-Poster
// ✅ Rotates 6 services × 18 locations × 7 angles
// ✅ SEO + AEO + GEO keywords built in

const BUSINESS = {
  name: "Dean's Handyman Service LLC",
  location: "Pittsburg, TX",
  phone: "281-917-9914", 
  website: "https://deanshandymanservice.me",
  referral: "https://starlink.com/residential?referral=RC-2034578-19016-61&app_source=share",
  tagline: "Local. Licensed. Done Right."
};

const SERVICES = [
  "Starlink Installation & Setup",
  "Electrical & Wiring",
  "General Handyman Services",
  "Custom Fabrication",
  "RV & Mobile Home Service",
  "Starlink for RVs & Mobile Homes"
];

const LOCATIONS = [
  "Pittsburg, TX", "Mt Pleasant, TX", "Gilmer, TX", "Longview, TX", 
  "Marshall, TX", "Texarkana, TX", "Tyler, TX", "Nacogdoches, TX", 
  "Henderson, TX", "Carthage, TX", "Lufkin, TX", "Texarkana, AR", 
  "Hope, AR", "Shreveport, LA", "Bossier City, LA", "Hugo, OK", 
  "Idabel, OK", "Broken Bow, OK"
];

const ANGLES = [
  "Problem/Solution", "Local Shoutout", "Social Proof", 
  "Urgency/Availability", "Educational", "Seasonal", "Before/After"
];

// Helper to grab random items from arrays
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function generatePost() {
  const service = getRandom(SERVICES);
  const location = getRandom(LOCATIONS);
  const angle = getRandom(ANGLES);

  const systemPrompt = `You are the expert social media manager for ${BUSINESS.name}. 
Write a highly engaging, authentic Facebook post offering ${service} in ${location}.
Use the "${angle}" marketing angle. 

CRITICAL REQUIREMENTS:
- Keep it sounding like a real, hard-working local Texan (authentic, not overly corporate).
- Include the phone number: ${BUSINESS.phone}
- Include the website: ${BUSINESS.website}
- If the service involves Starlink, also include this free-month referral link: ${BUSINESS.referral}
- Include 3-4 relevant local hashtags (e.g., #EastTexas, #DeansHandymanService, and the specific county/city).
- Do not use emojis excessively. Keep it professional but approachable.`;

  console.log(`Generating post for ${service} in ${location} using angle: ${angle}...`);

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 400,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Write today's Facebook post based on the instructions." }
        ]
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error("Error generating post with Groq:", error);
    return null;
  }
}

async function postToFacebook(content) {
  if (!content) {
    console.error("No content generated. Skipping Facebook post.");
    return;
  }

  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_PAGE_TOKEN;

  if (!pageId || !token) {
    console.error("Missing Facebook credentials in environment variables.");
    return;
  }

  console.log("Posting to Facebook...");
  
  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: content,
        access_token: token
      })
    });

    const data = await res.json();
    if (data.id) {
      console.log(`✅ Successfully posted to Facebook! Post ID: ${data.id}`);
    } else {
      console.error("❌ Failed to post to Facebook:", data);
    }
  } catch (error) {
    console.error("Error posting to Facebook API:", error);
  }
}

// Run the script
(async () => {
  const postContent = await generatePost();
  if (postContent) {
    console.log("\n--- GENERATED POST ---");
    console.log(postContent);
    console.log("----------------------\n");
    await postToFacebook(postContent);
  }
})();
