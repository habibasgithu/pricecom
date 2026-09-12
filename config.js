// =====================================================================
// CONFIG — put YOUR affiliate IDs and API keys here (or use a .env file)
// =====================================================================
// Where to get each one is explained in README.md

require('dotenv').config();

module.exports = {
  amazon: {
    // Amazon Associates tracking ID, e.g. "yourtag-20"
    affiliateTag: process.env.AMAZON_AFFILIATE_TAG || 'bibasuae-21',
    // Product Advertising API keys (only needed once Associates approves you)
    accessKey: process.env.AMAZON_ACCESS_KEY || '',
    secretKey: process.env.AMAZON_SECRET_KEY || '',
    partnerTag: process.env.AMAZON_PARTNER_TAG || '',
  },
  ebay: {
    // eBay Partner Network (EPN) campaign ID
    campaignId: process.env.EBAY_CAMPAIGN_ID || 'YOUR-EBAY-CAMPAIGN-ID',
    // eBay Browse API app credentials (developer.ebay.com)
    clientId: process.env.EBAY_CLIENT_ID || '',
    clientSecret: process.env.EBAY_CLIENT_SECRET || '',
  },
  walmart: {
    // Walmart affiliate program runs through Impact.com — this is your Impact "SubId" / affiliate ID
    affiliateId: process.env.WALMART_AFFILIATE_ID || 'YOUR-WALMART-AFFILIATE-ID',
  },
  temu: {
    // Temu affiliate links also come from a network (e.g. Impact/CJ) — put your tracking param here
    affiliateId: process.env.TEMU_AFFILIATE_ID || 'YOUR-TEMU-AFFILIATE-ID',
  },
  // Optional: image recognition provider for "search by photo".
  // Get a key from https://cloud.google.com/vision or AWS Rekognition.
  vision: {
    provider: process.env.VISION_PROVIDER || 'none', // 'google' | 'aws' | 'none'
    apiKey: process.env.VISION_API_KEY || '',
  },
};
