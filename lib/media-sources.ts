const CLOUDFRONT = 'https://d2yksyxv0l5gwz.cloudfront.net';

export const heroVideoSrc = `${CLOUDFRONT}/Reamo%20Website%20Header%20Video.mp4`;

const agentDemoCover = `${CLOUDFRONT}/Reamo%20Agent%20Demo%20Cover.png`;
const teamDemoCover = `${CLOUDFRONT}/Reamo%20Team%20Demo%20Cover.png`;

/** Homepage See Reamo card stills */
export const demoCardImages = {
  agent: agentDemoCover,
  team: teamDemoCover,
} as const;

/** Plan page demo players (/agent, /team) */
export const demoVideos = {
  agent: {
    src: `${CLOUDFRONT}/Reamo%20Agent%20Demo.mp4`,
    poster: agentDemoCover,
  },
  team: {
    src: `${CLOUDFRONT}/Reamo%20Team%20Demo.mp4`,
    poster: teamDemoCover,
  },
} as const;
