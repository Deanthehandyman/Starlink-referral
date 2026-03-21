// autopost-facebook-deans.js
// Dean's Handyman Service LLC — Full Auto-Poster (Auto-ID Version)

const BUSINESS = {
  name: "Dean's Handyman Service LLC",
  location: "Pittsburg, TX",
  phone: "281-917-9914",
  website: "https://deanshandymanservice.me",
  referral: "https://starlink.com/residential?referral=RC-2034578-19016-61&app_source=share",
  tagline: "Local. Clean. Honest. Done Right."
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
- Include 3-4 relevant local hashtags.
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

// NEW: Automatically figures out your Facebook Page ID using just your token!
async function getFacebookCredentials(envToken) {
  console.log("Attempting to auto-discover Facebook Page ID from Token...");
  try {
    let res = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${envToken}`);
    let data = await res.json();

    if (data.data && data.data.length > 0) {
      console.log(`✅ Discovered Page: ${data.data[0].name} (ID: ${data.data[0].id})`);
      return { pageId: data.data[0].id, accessToken: data.data[0].access_token };
    }

    res = await fetch(`https://graph.facebook.com/v19.0/me?access_token=${envToken}`);
    data = await res.json();

    if (data.id && data.name) {
      console.log(`✅ Discovered Page: ${data.name} (ID: ${data.id})`);
      return { pageId: data.id, accessToken: envToken };
    }
  } catch (err) {
    console.error("Error fetching page details:", err);
  }
  return null;
}

async function postToFacebook(content) {
  if (!content) return;

  const envToken = process.env.FACEBOOK_PAGE_TOKEN;
  if (!envToken) {
    console.error("Missing FACEBOOK_PAGE_TOKEN in environment variables.");
    return;
  }

  // Use the auto-discovery function instead of needing the ID secret
  const credentials = await getFacebookCredentials(envToken);
  
  if (!credentials) {
    console.error("❌ Could not resolve Page ID. The token might be expired.");
    return;
  }

  console.log("Posting to Facebook...");
  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${credentials.pageId}/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: content,
        access_token: credentials.accessToken
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
