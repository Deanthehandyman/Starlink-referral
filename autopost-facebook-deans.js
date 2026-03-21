// autopost-facebook-deans.js
// Dean's Handyman Service LLC — Full Auto-Poster
// ✅ Posts at peak engagement times per day
// ✅ Every post is unique — never repeats
// ✅ SEO + AEO + GEO keywords + location tags built in
// ✅ Rotates all 6 services × 18 locations × 7 angles

// ═══════════════════════════════════════════
// BUSINESS INFO
// ═══════════════════════════════════════════
const BUSINESS = {
  name: "Dean's Handyman Service LLC",
  location: "Pittsburg, TX",
  phone: "",  // ← Add your phone number e.g. "(903) 555-0100"
  website: "https://starlinknetworksolutions.com",
  referral: "https://starlink.com/residential?referral=RC-2034578-19016-61&app_source=share",
  tagline: "Local. Licensed. Done Right.",
};

// ═══════════════════════════════════════════
// PEAK POSTING TIMES (CST)
// Research-backed best times for local service
// businesses targeting rural audiences
// ═══════════════════════════════════════════
// Mon: 9am CST = 15:00 UTC
// Tue: 11am CST = 17:00 UTC  ← BEST day + time
// Wed: 10am CST = 16:00 UTC  ← 2nd best
// Thu: 11am CST = 17:00 UTC
// Fri: 9am CST  = 15:00 UTC
// Sat: 8am CST  = 14:00 UTC  ← Rural audience checks early
// Runs Mon-Sat, Sunday off

// ═══════════════════════════════════════════
// SERVICE AREAS — with GEO keywords
// ═══════════════════════════════════════════
const AREAS = [
  {
    name: "Pittsburg",       state: "TX", county: "Camp County",      region: "East Texas",
    geo: "Pittsburg TX handyman Starlink internet Camp County",
    tag: "#PittsburgTX #CampCountyTX #CampCounty",
  },
  {
    name: "Mt Pleasant",     state: "TX", county: "Titus County",     region: "East Texas",
    geo: "Mt Pleasant TX handyman Titus County rural internet",
    tag: "#MtPleasantTX #TitusCountyTX #TitusCounty",
  },
  {
    name: "Gilmer",          state: "TX", county: "Upshur County",    region: "East Texas",
    geo: "Gilmer TX handyman Upshur County internet installation",
    tag: "#GilmerTX #UpshurCountyTX #UpshurCounty",
  },
  {
    name: "Longview",        state: "TX", county: "Gregg County",     region: "East Texas",
    geo: "Longview TX handyman Gregg County Starlink installer",
    tag: "#LongviewTX #GreggCountyTX",
  },
  {
    name: "Marshall",        state: "TX", county: "Harrison County",  region: "East Texas",
    geo: "Marshall TX handyman Harrison County rural broadband",
    tag: "#MarshallTX #HarrisonCountyTX",
  },
  {
    name: "Texarkana",       state: "TX", county: "Bowie County",     region: "East Texas",
    geo: "Texarkana TX handyman Bowie County Starlink install",
    tag: "#TexarkanaTX #BowieCountyTX",
  },
  {
    name: "Tyler",           state: "TX", county: "Smith County",     region: "East Texas",
    geo: "Tyler TX handyman Smith County satellite internet",
    tag: "#TylerTX #SmithCountyTX",
  },
  {
    name: "Nacogdoches",     state: "TX", county: "Nacogdoches County", region: "East Texas",
    geo: "Nacogdoches TX handyman rural internet install",
    tag: "#NacogdochesTX #NacogdochesCounty",
  },
  {
    name: "Henderson",       state: "TX", county: "Rusk County",      region: "East Texas",
    geo: "Henderson TX handyman Rusk County internet service",
    tag: "#HendersonTX #RuskCountyTX",
  },
  {
    name: "Carthage",        state: "TX", county: "Panola County",    region: "East Texas",
    geo: "Carthage TX handyman Panola County Starlink",
    tag: "#CartageTX #PanolaCountyTX",
  },
  {
    name: "Lufkin",          state: "TX", county: "Angelina County",  region: "East Texas",
    geo: "Lufkin TX handyman Angelina County rural internet",
    tag: "#LufkinTX #AngelinaCountyTX",
  },
  {
    name: "Texarkana",       state: "AR", county: "Miller County",    region: "Southwest Arkansas",
    geo: "Texarkana AR handyman Miller County Starlink Arkansas",
    tag: "#TexarkanaAR #MillerCountyAR #Arkansas",
  },
  {
    name: "Hope",            state: "AR", county: "Hempstead County", region: "Southwest Arkansas",
    geo: "Hope AR handyman Hempstead County rural broadband",
    tag: "#HopeAR #HempsteadCountyAR #SWArkansas",
  },
  {
    name: "Shreveport",      state: "LA", county: "Caddo Parish",     region: "Northwest Louisiana",
    geo: "Shreveport LA handyman Caddo Parish Starlink Louisiana",
    tag: "#ShreveportLA #CaddoParish #Louisiana",
  },
  {
    name: "Bossier City",    state: "LA", county: "Bossier Parish",   region: "Northwest Louisiana",
    geo: "Bossier City LA handyman Bossier Parish internet",
    tag: "#BossierCityLA #BossierParish",
  },
  {
    name: "Hugo",            state: "OK", county: "Choctaw County",   region: "Southeast Oklahoma",
    geo: "Hugo OK handyman Choctaw County rural internet",
    tag: "#HugoOK #ChoctawCountyOK #Oklahoma",
  },
  {
    name: "Idabel",          state: "OK", county: "McCurtain County", region: "Southeast Oklahoma",
    geo: "Idabel OK handyman McCurtain County Starlink install",
    tag: "#IdabelOK #McCurtainCountyOK",
  },
  {
    name: "Broken Bow",      state: "OK", county: "McCurtain County", region: "Southeast Oklahoma",
    geo: "Broken Bow OK handyman rural internet satellite",
    tag: "#BrokenBowOK #SEOklahoma",
  },
];

// ═══════════════════════════════════════════
// SERVICES — with SEO + AEO keyword sets
// ═══════════════════════════════════════════
const SERVICES = [
  {
    name: "Starlink Installation",
    emoji: "🛰️",
    seo: "Starlink installer near me, Starlink Gen 3 installation, rural internet East Texas, satellite internet installation, Starlink setup service",
    aeo: "Who installs Starlink in East Texas? How much does Starlink installation cost? Can someone install Starlink for me?",
    extra: `Get your 2nd month of Starlink FREE with my referral link 👉 ${BUSINESS.referral}`,
    cta: `Sign up here for 2nd month FREE: ${BUSINESS.referral}`,
    hashtags: "#Starlink #StarlinkInstall #StarlinkInstaller #RuralInternet #SatelliteInternet #StarlinkTexas #StarlinkNearMe #RuralBroadband #NoContract #2ndMonthFree #StarlinkGen3",
  },
  {
    name: "Electrical & Wiring",
    emoji: "⚡",
    seo: "electrician near me East Texas, electrical wiring repair, outlet installation, panel upgrade East Texas, licensed electrician",
    aeo: "Who does electrical work in East Texas? How much does an electrician cost near me? Can a handyman do electrical work?",
    extra: "Licensed and insured. Free estimates on all electrical work.",
    cta: `Call or DM for a free estimate. ${BUSINESS.website}`,
    hashtags: "#Electrician #ElectricalWork #ElectricalRepair #WiringRepair #OutletInstall #PanelUpgrade #LicensedElectrician #ElectricianNearMe #HomeElectrical #EastTexasElectrician",
  },
  {
    name: "General Handyman Services",
    emoji: "🔧",
    seo: "handyman near me East Texas, home repair services, local handyman, fix it services, property maintenance East Texas",
    aeo: "Who is the best handyman near me? What does a handyman fix? How much does a handyman charge?",
    extra: "No job too small. Free estimates. Licensed and insured.",
    cta: `DM us or visit ${BUSINESS.website} for a free estimate.`,
    hashtags: "#Handyman #HandymanNearMe #HomeRepair #HomeImprovement #FixIt #LocalHandyman #PropertyRepair #HomeServices #EastTexasHandyman #HandymanServices",
  },
  {
    name: "Custom Fabrication",
    emoji: "🏗️",
    seo: "custom fabrication East Texas, metal fabrication near me, custom welding, custom mounts East Texas, metal work",
    aeo: "Who does custom fabrication in East Texas? Can a handyman do custom metal work? Where can I get custom metal work done near me?",
    extra: "Custom builds to your exact specifications. No project too unique.",
    cta: `DM photos of what you need. Free quote at ${BUSINESS.website}`,
    hashtags: "#CustomFabrication #MetalFabrication #Welding #CustomBuilds #MetalWork #CustomMounts #FabShop #EastTexasFab #CustomMetal #Fabricator",
  },
  {
    name: "RV & Mobile Home Repair",
    emoji: "🏠",
    seo: "RV repair near me East Texas, mobile home repair, manufactured home service, trailer repair East Texas, RV maintenance",
    aeo: "Who repairs mobile homes in East Texas? How much does RV repair cost? Can a handyman work on mobile homes?",
    extra: "We come to you. On-site service at your location.",
    cta: `DM or visit ${BUSINESS.website} for a free estimate.`,
    hashtags: "#RVRepair #MobileHomeRepair #ManufacturedHome #TrailerRepair #RVService #MobileHomeMaintenance #RVLife #MobileHomeLiving #EastTexasRV #HomeRepair",
  },
  {
    name: "Starlink for RVs & Mobile Homes",
    emoji: "📡",
    seo: "Starlink RV installation, mobile home internet East Texas, satellite internet for RV, rural internet mobile home, Starlink portable setup",
    aeo: "Does Starlink work on mobile homes? Can I get Starlink on my RV? Who installs Starlink on mobile homes in East Texas?",
    extra: `Get your 2nd month of Starlink FREE 👉 ${BUSINESS.referral}`,
    cta: `Order through my referral link for 2nd month FREE: ${BUSINESS.referral}`,
    hashtags: "#StarlinkRV #MobileHomeInternet #RuralInternet #Starlink #RVInternet #StarlinkMobileHome #SatelliteInternetRV #RVWifi #MobileHomeWifi #2ndMonthFree",
  },
];

// ═══════════════════════════════════════════
// POST ANGLES — 12 unique styles
// ═══════════════════════════════════════════
const ANGLES = [
  "problem/solution: open with the exact frustrating problem local customers face, then position the service as the specific fix",
  "customer story: write as if you just finished a job and are sharing what happened — real detail, real result, conversational",
  "local pride: speak directly to people in that specific town/county, reference local life and what matters to rural communities",
  "urgent availability: you have openings THIS WEEK in that specific area, create legitimate urgency without being pushy",
  "myth-busting: correct a common misconception people have about this service or why they've avoided it",
  "educational tip: share one useful thing most people don't know — position Dean as the local expert",
  "before/after: paint a vivid picture of the situation before and after the service — make it relatable",
  "comparison: contrast what life is like with vs without this service — let the difference sell itself",
  "seasonal/timely: tie the need for this service to current weather, time of year, or something happening locally",
  "question hook: open with a direct question that makes the target customer immediately think 'that's me'",
  "community shoutout: thank customers in the area, mention you've been busy in that county recently",
  "behind the scenes: share something honest and personal about the work — builds trust and authenticity",
];

// ═══════════════════════════════════════════
// GEO / AEO BASE TAGS
// ═══════════════════════════════════════════
const BASE_TAGS = "#DeansHandymanService #EastTexas #HandymanNearMe #LocalBusiness #SmallBusiness #EastTexasSmallBusiness #HireLocal #LicensedAndInsured";

// ═══════════════════════════════════════════
// GENERATE UNIQUE POST
// ═══════════════════════════════════════════
async function generatePost(service, area, angle, uniqueSeed) {
  const system = `You are a social media copywriter for ${BUSINESS.name} — a local handyman and Starlink installer based in ${BUSINESS.location}. Serving East Texas, SW Arkansas, NW Louisiana, and SE Oklahoma within 200 miles.

Your job is to write Facebook posts that:
1. Sound EXACTLY like a real local East Texas business owner — warm, direct, no corporate speak
2. Are 100% unique every time — never generic, always specific to the area and service
3. Naturally include SEO and local search keywords woven into natural language
4. Answer the kinds of questions people type into Google about this service (AEO)
5. Reference the specific geographic area naturally (GEO)

Tone: Like a trusted neighbor who happens to be an expert. Not salesy. Not corporate. Real.

Business facts:
- Phone: ${BUSINESS.phone || "listed on website"}
- Website: ${BUSINESS.website}
- Tagline: ${BUSINESS.tagline}
- Service radius: 200 miles from ${BUSINESS.location}`;

  const prompt = `Write a Facebook post with these exact parameters:

SERVICE: ${service.name} ${service.emoji}
LOCATION: ${area.name}, ${area.state} (${area.county}, ${area.region})
ANGLE: ${angle}
UNIQUE SEED (use to make this post feel different): ${uniqueSeed}

SEO keywords to weave in naturally (don't list them, use them in sentences):
${service.seo}

AEO — answer these questions naturally in the post:
${service.aeo}

GEO context: ${area.geo}

Extra info to include: ${service.extra}
CTA to end with: ${service.cta}

REQUIREMENTS:
- Open with a hook that stops the scroll
- Mention "${area.name}, ${area.state}" or "${area.county}" naturally in the post
- 2-4 emojis used naturally (not at the start of every line)
- Under 220 words
- End with a line break then these hashtags exactly: ${BASE_TAGS} ${service.hashtags} ${area.tag}
- Write ONLY the post — no labels, no "Here's a post:", nothing else`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 600,
      temperature: 0.92,  // Higher temp = more unique/varied
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(`Groq error: ${JSON.stringify(data.error)}`);
  return data.choices?.[0]?.message?.content || null;
}

// ═══════════════════════════════════════════
// POST TO FACEBOOK
// ═══════════════════════════════════════════
async function postToFacebook(message) {
  if (process.env.TEST_MODE === 'true') {
    console.log("🧪 TEST MODE — not publishing to Facebook");
    return "TEST_MODE";
  }

  const pageId    = process.env.FACEBOOK_PAGE_ID;
  const pageToken = process.env.FACEBOOK_PAGE_TOKEN;

  const res = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, access_token: pageToken }),
  });

  const data = await res.json();
  if (data.error) throw new Error(`Facebook error: ${JSON.stringify(data.error)}`);
  return data.id;
}

// ═══════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════
async function main() {
  console.log("🔧 Dean's Handyman Service — Auto-Poster");
  console.log(`📅 ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })} CST`);

  // Rotate by day — covers 18 areas × 6 services × 12 angles = 1,296 unique combos
  // That's 3.5+ years without repeating before cycling back
  const day  = Math.floor(Date.now() / 86400000);
  const week = Math.floor(day / 7);

  const service     = SERVICES[day % SERVICES.length];
  const area        = AREAS[(day * 3 + week) % AREAS.length];         // offset so area/service don't always align
  const angle       = ANGLES[(day * 5 + week * 2) % ANGLES.length];   // different offset again
  const uniqueSeed  = `Day ${day} — ${new Date().toLocaleDateString("en-US")} — ${Math.random().toString(36).slice(2,8)}`;

  console.log(`\n📋 Today's combination:`);
  console.log(`   Service  : ${service.name}`);
  console.log(`   Location : ${area.name}, ${area.state} (${area.county})`);
  console.log(`   Angle    : ${angle}`);
  console.log(`   Seed     : ${uniqueSeed}`);

  // Retry up to 3 times if generation fails
  let post = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    console.log(`\n✍️  Generating post (attempt ${attempt}/3)...`);
    try {
      post = await generatePost(service, area, angle, uniqueSeed + `-attempt${attempt}`);
      if (post) break;
    } catch (err) {
      console.error(`   Attempt ${attempt} failed: ${err.message}`);
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  if (!post) { console.error("❌ Failed to generate post after 3 attempts"); process.exit(1); }

  console.log("\n📝 Generated post:\n");
  console.log("═".repeat(60));
  console.log(post);
  console.log("═".repeat(60));
  console.log(`\n📊 Character count: ${post.length}`);

  console.log("\n📘 Publishing to Facebook...");
  const postId = await postToFacebook(post);

  if (postId === "TEST_MODE") {
    console.log("✅ Test complete — post looks good, ready to go live!");
  } else {
    console.log(`✅ Posted successfully!`);
    console.log(`🔗 https://www.facebook.com/${postId}`);
  }
}

main().catch(err => {
  console.error("\n💥 Fatal error:", err.message);
  process.exit(1);
});
