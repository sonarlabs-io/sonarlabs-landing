export function convertToSpotifyUri(input: string): string {
    try {
      if (input.startsWith('spotify:artist:')) {
        return input;
      }
  
      if (input.includes('open.spotify.com')) {
        const match = input.match(/artist\/([a-zA-Z0-9]+)/);
        if (match && match[1]) {
          const artistId = match[1].split('?')[0];
          return `spotify:artist:${artistId}`;
        }
      }
  
      throw new Error('Invalid Spotify artist URL or URI');
    } catch (err) {
      throw new Error('Please enter a valid Spotify artist URL or URI');
    }
  }