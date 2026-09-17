import { getDestinationsData } from '../../lib/getDestinationsData';
import ProgramsClient from './ProgramsClient';

export default async function ProgramsPage() {
  const { destinations, universities, programs } = await getDestinationsData();

  // Enriched Programs data (joining with university and country info)
  const enrichedPrograms = programs.map(prog => {
    const uni = universities.find(u => u.slug === prog.university_slug || u.id === prog.university_slug);
    const country = uni ? destinations.find(d => d.slug === uni.country_slug || d.id === uni.country_slug) : null;
    return {
      ...prog,
      universityName: uni ? uni.name : prog.university_slug.toUpperCase(),
      universityRanking: uni ? uni.world_ranking : null,
      countryName: country ? country.name : 'Global',
      countryId: country ? country.id : '',
      countryFlag: country ? country.flag_emoji : '🌍',
      uniImage: uni?.image || ''
    };
  });

  return <ProgramsClient enrichedPrograms={enrichedPrograms} />;
}
