import type { Artist, DemoSearch, DemoArtist, RawArtist } from '@/types';

export async function loadDemoSearches(): Promise<DemoSearch[]> {
  try {
    const artists = await loadTopArtists();
    
    // Define search queries with matching criteria
    const searchQueries = [
      {
        query: "indie rock bands with gen z following in london",
        criteria: (artist: Artist) => 
          artist.genres.some(g => g.includes('indie rock')) && 
          artist.demographics.some(d => d.includes('gen z')) && 
          artist.location.some(l => l.toLowerCase().includes('london'))
      },
      {
        query: "rising pop female singers in Paris",
        criteria: (artist: Artist) => 
          artist.genres.some(g => g.includes('pop')) && 
          artist.location.some(l => l.toLowerCase().includes('paris'))
      },
      {
        query: "latin artists with a millennials audience in LA",
        criteria: (artist: Artist) => 
          artist.genres.some(g => g.includes('latin')) && 
          artist.demographics.some(d => d.includes('millennials')) && 
          artist.location.some(l => l.toLowerCase().includes('los angeles'))
      }
    ];

    return searchQueries.map(query => ({
      query: query.query,
      results: artists
        .filter(query.criteria)
        .slice(0, 2)
        .map(artist => ({
          name: artist.name,
          genres: artist.genres.slice(0, 2),
          score: artist.score,
          spotify_url: artist.spotify_url || '',
          image: artist.image_url || ''
        }))
    }));
  } catch (error) {
    console.error('Error loading demo searches:', error);
    return [];
  }
}

export async function loadDemoArtists(): Promise<DemoArtist[]> {
  try {
    const artists = await loadTopArtists();
    
    // Define artists with specific characteristics similar to original hardcoded data
    const demoArtistCriteria = [
      {
        name: "Tommy Ragen",
        criteria: (artist: Artist) => 
          artist.name.toLowerCase() === 'tommy ragen' ||
          (artist.genres.some(g => g.includes('indie')) && 
           artist.genres.some(g => g.includes('hip-hop')))
      },
      {
        name: "Mountains in the Sea",
        criteria: (artist: Artist) => 
          artist.name.toLowerCase().includes('mountain') ||
          (artist.genres.some(g => g.includes('indie rock')) && 
           artist.genres.some(g => g.includes('blues')))
      },
      {
        name: "Gia Darcy",
        criteria: (artist: Artist) => 
          artist.name.toLowerCase().includes('gia') ||
          (artist.genres.some(g => g.includes('indie pop')) && 
           artist.genres.some(g => g.includes('folk')))
      }
    ];

    return demoArtistCriteria.map(artistCriteria => {
      const matchedArtist = artists.find(artistCriteria.criteria) || artists[0];
      return {
        name: matchedArtist.name,
        genres: matchedArtist.genres.slice(0, 2),
        score: matchedArtist.score,
        spotify_url: matchedArtist.spotify_url || '',
        image: matchedArtist.image_url || '',
        drivers: [
          matchedArtist.monthlyListenersGrowth ? 
            `${matchedArtist.monthlyListenersGrowth} stream growth` : 
            'platform momentum',
          matchedArtist.demographics?.[0] || 'emerging talent',
          matchedArtist.location?.[0] || 'global reach'
        ]
      };
    });
  } catch (error) {
    console.error('Error loading demo artists:', error);
    return [];
  }
}

function processRawArtist(record: Partial<RawArtist>): Artist {
  // Process genres with null checks and filtering
  const genres = [
    record['Genre 1'],
    record['Genre 2'],
    record['Genre 3'],
    ...(record.genres?.split('|') || [])
  ]
    .filter((g): g is string => Boolean(g))
    .map(g => g.trim());

  // Process demographics with null checks and filtering
  const demographics = [
    record.age_group,
    ...(record.demographics?.split(',') || [])
  ]
    .filter((d): d is string => Boolean(d))
    .map(d => d.trim());

  // Process location with null checks and filtering
  const location = [
    record.top_city,
    record.top_country
  ]
    .filter((l): l is string => Boolean(l))
    .map(l => l.trim());

  return {
    id: String(record.id || ''),
    name: record.name || '',
    genres,
    score: parseFloat(record.popularity || '0') || 70,
    spotify_url: record.spotify_url || '',
    image_url: record.image_url || '',
    demographics,
    location,
    monthlyListeners: parseInt(String(record.sp_monthly_listeners)) || 0,
    monthlyListenersGrowth: record.sp_monthly_listeners_30d_growth || '0',
    followers: parseInt(String(record.sp_followers)) || 0,
    followersGrowth: record.sp_followers_30d_growth || '0',
    totalReleases: Number(record.total_releases) || 0
  };
}

export async function loadTopArtists(): Promise<Artist[]> {
  try {
    const response = await fetch('/data/top-artists.csv');
    if (!response.ok) throw new Error('Failed to fetch top artists');
    
    const csvData = await response.text();
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const records = lines.slice(1).map(line => {
      const values = line.split(',');
      const record = headers.reduce((obj, header, index) => {
        obj[header] = values[index]?.trim() ?? '';
        return obj;
      }, {} as Record<string, string>) as unknown as Partial<RawArtist>;
      
      return record;
    });

    return records
      .slice(0, 15) // Increased to give more options for matching
      .map(processRawArtist)
      .filter(artist => artist.name && artist.image_url);
      
  } catch (error) {
    console.error('Error loading top artists:', error);
    return [];
  }
}