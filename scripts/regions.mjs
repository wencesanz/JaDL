// Region table for the build scripts. Must match REGIONS / regionOf() in
// social.js: the first country listed for a studio decides its region, and
// studios with no country get no region (shown as "Worldwide" on the site).
export const REGIONS = [
  ['Iberia', ['Spain', 'Portugal']],
  ['UK & Ireland', ['England', 'Scotland', 'Wales', 'Northern Ireland', 'Ireland']],
  ['North America', ['USA', 'Canada']],
  ['Nordics', ['Sweden', 'Denmark', 'Norway', 'Finland', 'Iceland']],
  ['Oceania', ['Australia', 'New Zealand']],
  ['Rest of Europe', ['Germany', 'France', 'The Netherlands', 'Switzerland', 'Italy', 'Austria', 'Belgium', 'Greece', 'Poland', 'Czech Republic', 'Romania', 'Ukraine', 'Hungary', 'Croatia', 'Slovenia', 'Estonia', 'Lithuania', 'Latvia', 'Slovakia', 'Malta', 'North Macedonia', 'Luxembourg', 'Bulgaria', 'Serbia']],
];
export function regionOf(country) {
  const c = String(country || '').split(',')[0].trim().toLowerCase();
  if (!c) return '';
  for (const [name, list] of REGIONS) if (list.some((x) => x.toLowerCase() === c)) return name;
  return 'Rest of the world';
}
export const REGION_PLACE = { 'UK & Ireland': 'the UK & Ireland', 'Nordics': 'the Nordic countries', 'Rest of Europe': 'the rest of Europe', 'Rest of the world': 'the rest of the world' };
