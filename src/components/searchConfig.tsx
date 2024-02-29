// import { CloudRegion, Environment } from "@yext/search-headless-react";

const searchConfig = {
  apiKey: import.meta.env.YEXT_PUBLIC_API_KEY,
  experienceKey: import.meta.env.YEXT_PUBLIC_EXP_KEY,
  locale: "en",
  // verticalKey: "restaurants",
  // cloudRegion: CloudRegion.US,
  // environment: Environment.SANDBOX,
};

export default searchConfig;
