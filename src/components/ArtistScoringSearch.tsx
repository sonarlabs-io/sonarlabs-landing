import React, { useState } from 'react';
import { 
  Search, 
  Loader2, 
  X, 
  User,
  CheckCircle,
  Link,
  Sparkles,
  TrendingUp,
  Users,
  Music,
  Globe2,
  Radio,
  Info
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { ScoringResponse, ArtistScoringProps } from '@/types/artist';
import { fetchArtistScore } from '@/utils/api';
import { getThemeStyles } from '@/styles/components';
import { useTheme } from '@/contexts/ThemeContext';

export function ArtistScoringSearch({ onScoreCalculated, onError }: ArtistScoringProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResult, setSearchResult] = useState<ScoringResponse | null>(null);

  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      setError('Please enter an artist name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetchArtistScore(inputValue.trim());
      setSearchResult(response);
      onScoreCalculated?.(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching the artist score';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setInputValue('');
    setError('');
    setSearchResult(null);
  };

  const formatGrowth = (value: number) => {
    return value > 0 ? `+${value}%` : `${value}%`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      {/* Search Input */}
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            placeholder="Enter artist name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSearch()}
            className="w-full"
            disabled={isLoading}
          />
          {inputValue && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={resetSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button 
          onClick={handleSearch}
          disabled={isLoading}
          className={`${themeStyles.search.searchButton} w-full sm:w-24`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              <span>Search</span>
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results Section */}
      {searchResult && (
        <div className="space-y-6">
          {searchResult.message ? (
            <Alert className="bg-muted">
              <Info className="h-4 w-4" />
              <AlertDescription>
                {searchResult.message}
              </AlertDescription>
            </Alert>
          ) : searchResult.in_dataset && (
            <Alert>
              {/* <CheckCircle className="h-4 w-4" />
              <AlertTitle>Artist Found</AlertTitle>
              <AlertDescription>
                This artist is in our prediction dataset and has been scored successfully.
              </AlertDescription> */}
            </Alert>
          )}

          {/* Artist Overview Card */}
          <Card className="overflow-hidden">
            <div className="relative">
              {searchResult.artist.image_url && (
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ 
                    backgroundImage: `url(${searchResult.artist.image_url})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/90" />
                </div>
              )}
              
              <div className="relative z-10">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {searchResult.artist.image_url ? (
                      <img 
                        src={searchResult.artist.image_url} 
                        alt={searchResult.artist.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="flex items-center">
                        {searchResult.artist.name}
                      </CardTitle>
                      <CardDescription>
                        Artist Overview
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Music className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Genre:</span>
                      <div className="flex flex-wrap gap-1">
                        {searchResult.artist.genres.map((genre, idx) => (
                          <Badge key={idx} variant="secondary">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Monthly Listeners:</span>
                      <span className="font-medium">
                        {formatNumber(searchResult.artist.stats.monthly_listeners)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Listener Growth:</span>
                      <span className={`font-medium ${
                        searchResult.artist.stats.listeners_growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatGrowth(searchResult.artist.stats.listeners_growth)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Globe2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Top Market:</span>
                      <span className="font-medium">{searchResult.artist.audience.top_country}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Radio className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Total Releases:</span>
                      <span className="font-medium">{searchResult.artist.releases.total_releases}</span>
                    </div>

                    {searchResult.artist.spotify_url && (
                      <div className="flex items-center space-x-2">
                        <Link className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={searchResult.artist.spotify_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View on Spotify
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          {/* Score Card */}
          {searchResult.in_dataset && searchResult.score && (
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Breakthrough Score
                </CardTitle>
                <CardDescription>
                  Calculated based on {searchResult.score.factors.length} key factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div>
                    <span className="text-6xl font-bold">
                      {searchResult.score.score.toFixed(1)}
                    </span>
                    <span className="text-2xl">/100</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {searchResult.score.factors.map((factor, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant={factor.impact > 0 ? "default" : "secondary"}>
                              {factor.name}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{factor.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Similar Artists */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Similar Artists
              </CardTitle>
              <CardDescription>
                {searchResult.in_dataset ? 
                  "Artists with similar characteristics and trajectory" : 
                  "Artists with similar genre, gender, and location"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {searchResult.similar_artists.map((artist) => (
                    <div
                      key={artist.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {artist.image_url && (
                          <img 
                            src={artist.image_url} 
                            alt={artist.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{artist.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {artist.genres.slice(0, 2).map((genre, idx) => (
                              <span 
                                key={idx}
                                className="text-xs bg-muted px-1.5 py-0.5 rounded-full"
                              >
                                {genre}
                              </span>
                            ))}
                            {artist.gender[0] && (
                              <span className="text-xs bg-muted/50 px-1.5 py-0.5 rounded-full">
                                {artist.gender[0]}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge variant="secondary" className="mb-1">
                          Score: {artist.score.toFixed(1)}
                        </Badge>
                        {artist.location[0] && (
                          <span className="text-xs text-muted-foreground">
                            {artist.location[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}