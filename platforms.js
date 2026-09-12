// =====================================================================
// PLATFORM ADAPTERS
// Each function takes a search query and returns an array of:
//   { title, price, image, url, platform }
// Right now they return MOCK data so the site works out of the box.
// Replace the body of each function with a real API call — see README.
// =====================================================================

const config = require('./config');

// ---------- AMAZON ----------
// Real version: use the Product Advertising API (PA-API 5.0) SearchItems
// operation once your Associates account is approved.
// Docs: https://webservices.amazon.com/paapi5/documentation/
async function searchAmazon(query) {
  // TODO: replace with real PA-API call using config.amazon.accessKey / secretKey
  return [
    {
      platform: 'Amazon',
      title: `${query} — (sample) Amazon listing`,
      price: '$24.99',
      image: 'https://via.placeholder.com/200x200?text=Amazon',
      url: `https://www.amazon.com/s?k=${encodeURIComponent(query)}`,
    },
  ];
}

// ---------- EBAY ----------
// Real version: use the eBay Browse API `item_summary/search` endpoint.
// Docs: https://developer.ebay.com/api-docs/buy/browse/overview.html
async function searchEbay(query) {
  // TODO: replace with real Browse API call using config.ebay.clientId / clientSecret
  return [
    {
      platform: 'eBay',
      title: `${query} — (sample) eBay listing`,
      price: '$19.50',
      image: 'https://via.placeholder.com/200x200?text=eBay',
      url: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}`,
    },
  ];
}

// ---------- WALMART ----------
// Walmart's official Open API for product search has gotten harder to access
// directly; most affiliates instead search via Walmart's site and wrap the
// resulting URL with their Impact.com tracking link (see addAffiliateLink below).
async function searchWalmart(query) {
  // TODO: replace with a real product lookup if/when you have API access
  return [
    {
      platform: 'Walmart',
      title: `${query} — (sample) Walmart listing`,
      price: '$21.88',
      image: 'https://via.placeholder.com/200x200?text=Walmart',
      url: `https://www.walmart.com/search?q=${encodeURIComponent(query)}`,
    },
  ];
}

// ---------- TEMU ----------
// IMPORTANT: Temu does not offer a public product-search API. Affiliates
// typically get pre-built deep links from their affiliate network dashboard
// (e.g. Impact, CJ) rather than querying Temu directly. So this adapter just
// builds a normal search-results link, which you then wrap with your
// affiliate network's tracking link once you have one.
async function searchTemu(query) {
  return [
    {
      platform: 'Temu',
      title: `${query} — (sample) Temu listing`,
      price: '$9.99',
      image: 'https://via.placeholder.com/200x200?text=Temu',
      url: `https://www.temu.com/search_result.html?search_key=${encodeURIComponent(query)}`,
    },
  ];
}

// =====================================================================
// AFFILIATE LINK INSERTION
// Wraps each platform's plain URL with your tracking ID/campaign so
// clicks are attributed to you.
// =====================================================================
function addAffiliateLink(result) {
  const url = new URL(result.url);

  switch (result.platform) {
    case 'Amazon':
      url.searchParams.set('tag', config.amazon.affiliateTag);
      break;
    case 'eBay':
      url.searchParams.set('campid', config.ebay.campaignId);
      break;
    case 'Walmart':
      // Real setup: generate this link via your Impact.com dashboard instead,
      // then store the resulting deep-link template. This is a placeholder.
      url.searchParams.set('affid', config.walmart.affiliateId);
      break;
    case 'Temu':
      url.searchParams.set('affid', config.temu.affiliateId);
      break;
  }

  return { ...result, url: url.toString() };
}

// =====================================================================
// IMAGE -> PRODUCT NAME
// "Search by photo" needs an image-recognition step first. Plug in
// Google Vision, AWS Rekognition, or similar here. Currently a stub.
// =====================================================================
async function identifyProductFromImage(imageBase64) {
  if (config.vision.provider === 'none') {
    throw new Error(
      'No vision provider configured. Set VISION_PROVIDER + VISION_API_KEY in .env, ' +
      'or have the visitor type the product name instead.'
    );
  }
  // TODO: call Google Vision (label/product search) or AWS Rekognition here,
  // and return your best-guess product name as a plain string.
  return 'sample product';
}

async function searchAllPlatforms(query) {
  const [amazon, ebay, walmart, temu] = await Promise.all([
    searchAmazon(query),
    searchEbay(query),
    searchWalmart(query),
    searchTemu(query),
  ]);
  return [...amazon, ...ebay, ...walmart, ...temu].map(addAffiliateLink);
}

module.exports = { searchAllPlatforms, identifyProductFromImage };
