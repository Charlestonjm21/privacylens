/*
 * Mock analysis results.
 *
 * The shape of these objects mirrors what the Groq pipeline will
 * return in M3, so the rendering code written against them will not
 * need to change when the real backend is connected.
 */

const RISK_LABELS = {
  1: "Minimal",
  2: "Low",
  3: "Moderate",
  4: "High",
  5: "Severe"
};

const CATEGORY_ORDER = [
  "dataCollected",
  "thirdPartySharing",
  "retention",
  "userRights",
  "tracking"
];

const CATEGORY_NAMES = {
  dataCollected: "Data collected",
  thirdPartySharing: "Third-party sharing",
  retention: "Retention",
  userRights: "User rights",
  tracking: "Tracking"
};

const MOCK_ANALYSES = {
  "example-social.com": {
    site: "example-social.com",
    analyzedAt: "2026-10-21",
    overallScore: 3.6,
    categories: {
      dataCollected: {
        score: 4,
        rationale: "Collects name, email, phone, precise location, and full device identifiers."
      },
      thirdPartySharing: {
        score: 5,
        rationale: "Shares with advertising partners and data brokers; no opt-out provided."
      },
      retention: {
        score: 3,
        rationale: "Holds data 24 months after account closure."
      },
      userRights: {
        score: 2,
        rationale: "Offers access, correction, and deletion requests via web form."
      },
      tracking: {
        score: 4,
        rationale: "Uses cookies, pixels, and cross-site fingerprinting."
      }
    },
    summary: "This policy carries above-average risk. The most serious issue is unrestricted sharing with advertising partners and data brokers, which you cannot opt out of. Collection is broad, including precise location and device identifiers, and tracking extends across other sites you visit. On the positive side, the policy does grant access, correction, and deletion rights through a request form."
  },

  "quiet-notes.app": {
    site: "quiet-notes.app",
    analyzedAt: "2026-10-19",
    overallScore: 1.8,
    categories: {
      dataCollected: {
        score: 2,
        rationale: "Collects email address and account settings only."
      },
      thirdPartySharing: {
        score: 1,
        rationale: "No third-party sharing except a named hosting provider."
      },
      retention: {
        score: 2,
        rationale: "Deletes all data within 30 days of account closure."
      },
      userRights: {
        score: 2,
        rationale: "Provides export and deletion directly in account settings."
      },
      tracking: {
        score: 2,
        rationale: "Uses a single session cookie; no analytics or ad tracking."
      }
    },
    summary: "This policy is unusually restrained. Collection is limited to what the service needs to function, there is no advertising or analytics tracking, and deletion is immediate and self-service. The only data leaving the company goes to a named infrastructure provider."
  }
};
