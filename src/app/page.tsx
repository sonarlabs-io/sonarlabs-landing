"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  Search, 
  Sparkles, 
  Building2,
  Share2,
  Target,
  Mail
} from 'lucide-react';
import { InstagramIcon, LinkedInIcon } from '@/components/ui/social-icons';
import { event } from '@/lib/analytics';

const DEMO_SEARCHES = [
  {
    query: "indie rock bands with gen z following in london",
    results: [
      { 
        name: "Keyside", 
        genres: ["indie rock", "britpop"], 
        score: 75.5, 
        spotify_url: "https://open.spotify.com/artist/5MeZ5u4TlMBV5juRYYqVVo",
        image: "https://i.scdn.co/image/ab6761610000e5eb2cd4b37edc117cc3fe725ef3"
      },
      { 
        name: "Getdown Services", 
        genres: ["indie rock", "alternative"], 
        score: 64.0, 
        spotify_url: "https://open.spotify.com/artist/4OTD2AbOu5iBqSWk3NfwG5",
        image: "https://i.scdn.co/image/ab6761610000e5ebc0042fe6ea4ddcf66cb8f987"
      }
    ]
  },
  {
    query: "rising pop female singers in Paris",
    results: [
      { 
        name: "Mawey", 
        genres: ["pop", "slam"], 
        score: 73.8, 
        spotify_url: "https://open.spotify.com/artist/74OZtJsSDkcqqVUZ1SoWeG",
        image: "https://i.scdn.co/image/ab6761610000e5ebac8ff2c8d1e55a701458faa7"
      },
      { 
        name: "Filiz", 
        genres: ["pop", "r&b", "hip-hop"], 
        score: 61.4, 
        spotify_url: "https://open.spotify.com/artist/5IotvmXP4j1DikGWocffKz",
        image: "https://i.scdn.co/image/ab6761610000e5eb699711959a531e87269983cf"
      }
    ]
  },
  {
    query: "latin artists with a millennials audience in LA",
    results: [
      { 
        name: "Roberto el Diablo", 
        genres: ["latin rock", "alternative"], 
        score: 75.9, 
        spotify_url: "https://open.spotify.com/artist/26cvfioUoHGNfAjZzaIWIA",
        image: "https://i.scdn.co/image/ab6761610000e5ebb03820b8867b50c7ccc8b3e1"
      },
      { 
        name: "Yelofi", 
        genres: ["latin", "pop"], 
        score: 67.9, 
        spotify_url: "https://open.spotify.com/artist/7mEO0Yt5N9MMzD8I1u7KQM",
        image: "https://i.scdn.co/image/ab6761610000e5ebe05c220d1bf3c1fadcc5c402"
      }
    ]
  }
];

const DEMO_ARTISTS = [
  { 
    name: "Gia Darcy",
    genres: ["indie pop", "folk"],
    score: 69.8,
    spotify_url: "https://open.spotify.com/artist/5asUNjuXqcxAs2PmpQxGK1",
    image: "https://i.scdn.co/image/ab6761610000e5ebd8bf2eb22a94c68af52f4ba3",
    drivers: ["viral on YouTube", "stage presence", "new EP"]
  },
  { 
    name: "Mountains in the Sea", 
    genres: ["indie rock", "blues"], 
    score: 76.6, 
    spotify_url: "https://open.spotify.com/artist/50Kp4ZEm61EGHyYgnfTL7Z",
    image: "https://i.scdn.co/image/ab6761610000e5ebf8c46b4a12767257f6454c54",
    drivers: ["contemporary sounds", "fan engagement", "cross-platform"]
  },
  { 
    name: "Tommy Ragen", 
    genres: ["indie", "hip-hop"], 
    score: 85.7, 
    spotify_url: "https://open.spotify.com/artist/7k8S06V36x8zYOwtn6zl9K",
    image: "https://i.scdn.co/image/ab6761610000e5eb815546a863a1d5ebd8296741",
    drivers: ["hollywood background", "editorial momentum", "live shows"]
  }
];

const TOP_ARTISTS = [
  { 
    id: '1',
    name: "Celine Wanyi",
    genres: ["pop", "alternative"],
    spotify_url: "https://open.spotify.com/artist/6TDH7ncjLQmNKM1SdbggnZ",
    image_url: "https://i.scdn.co/image/ab6761610000e5eb6cb42a2ece230fbf3f3f31cb",
    demographics: ["25-34", "millennials"],
    location: ["Santiago", "Chile"],
    monthlyListeners: 7523,
    monthlyListenersGrowth: "737%"
  },
  { 
    id: '2',
    name: "Matías Gruener",
    genres: ["latin pop", "vocal"],
    spotify_url: "https://open.spotify.com/artist/5fc7s1URhIHCn6kz8AHiQH",
    image_url: "https://i.scdn.co/image/ab6761610000e5ebe65db34f24454a82ed20baf6",
    demographics: ["18-24", "gen z"],
    location: ["Mexico City", "Mexico"],
    monthlyListeners: 9338,
    monthlyListenersGrowth: "1000%"
  },
  { 
    id: '3',
    name: "Ashya",
    genres: ["soul", "r&b"],
    spotify_url: "https://open.spotify.com/artist/2zXUDghhOWr3brlPdwKxTR",
    image_url: "https://i.scdn.co/image/ab6761610000e5ebb8b968b9cb752382d5e9434d",
    demographics: ["25-34", "millennials"],
    location: ["Atlanta", "USA"],
    monthlyListeners: 6857,
    monthlyListenersGrowth: "269%"
  },
  { 
    id: '4',
    name: "Marie Jay",
    genres: ["pop", "folk"],
    spotify_url: "https://open.spotify.com/artist/3EfWdPE7TccXs99V0WuOZY",
    image_url: "https://i.scdn.co/image/ab6761610000e5eb384ec4c564f75e372f4c0345",
    demographics: ["18-24", "gen z"],
    location: ["Paris", "France"],
    monthlyListeners: 35469,
    monthlyListenersGrowth: "725%"
  },
  { 
    id: '5',
    name: "KALIL",
    genres: ["hip-hop", "r&b"],
    spotify_url: "https://open.spotify.com/artist/2dvRuyAsoUIYUNKnP2miWR",
    image_url: "https://i.scdn.co/image/ab6761610000e5eb01f4c5e959827532e8eeca4c",
    demographics: ["25-34", "millennials"],
    location: ["Casablanca", "Morocco"],
    monthlyListeners: 21332,
    monthlyListenersGrowth: "214%"
  }
];

export default function LandingPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [searchVisible, setSearchVisible] = useState(true);
  const [artistVisible, setArtistVisible] = useState(true);
  
  const [isLoading] = useState(false);

  useEffect(() => {
    const CYCLE_DURATION = 6000; // Total time for each demo item
    const FADE_DURATION = 500;   // Time for fade transition
    
    const cycle = () => {
      // Hide current items
      setSearchVisible(false);
      setArtistVisible(false);
      
      // Wait for fade out, then update indices
      setTimeout(() => {
        setCurrentSearchIndex(prev => (prev + 1) % DEMO_SEARCHES.length);
        setCurrentArtistIndex(prev => (prev + 1) % DEMO_ARTISTS.length);
        
        // Show new items
        setSearchVisible(true);
        setArtistVisible(true);
      }, FADE_DURATION);
    };

    // Initial visibility
    setSearchVisible(true);
    setArtistVisible(true);

    // Set up the interval
    const interval = setInterval(cycle, CYCLE_DURATION);

    // Cleanup
    return () => {
      clearInterval(interval);
      setSearchVisible(true);
      setArtistVisible(true);
    };
  }, []);
  
  // Carousel scroll effect
  useEffect(() => {
    if (!carouselRef.current) return;
    
    let scrollPos = 0;
    const scrollSpeed = 1;
    
    const scroll = () => {
      if (!carouselRef.current) return;
      
      const scrollWidth = carouselRef.current.scrollWidth / 2;
      const clientWidth = carouselRef.current.clientWidth;
      
      scrollPos += scrollSpeed;
      if (scrollPos >= scrollWidth) {
        scrollPos = 0;
      }
      
      carouselRef.current.scrollLeft = scrollPos;
    };
  
    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      // Update scrolled state for background
      setScrolled(currentScrollY > 50);
      
      // Update header visibility
      if (currentScrollY > 100) {
        if (scrollDelta > 10) {
          setHideHeader(true);
        } else if (scrollDelta < -10) {
          setHideHeader(false);
        }
      } else {
        setHideHeader(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openSpotifyUrl = (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleWaitlistClick = () => {
    event({
      action: 'join_waitlist_click',
      category: 'conversion',
      label: 'hero_section'
    });
    window.open('https://form.typeform.com/to/AfyrqfcX', '_blank', 'noopener,noreferrer');
  };

  const handleDemoClick = () => {
    event({
      action: 'schedule_demo_click',
      category: 'conversion',
      label: 'hero_section'
    });
    window.open('https://cal.com/maxime-laharrague-x1ypf3/sonar', '_blank', 'noopener,noreferrer');
  };

  const handleSpotifyArtistClick = (artistName: string, section: string) => {
    event({
      action: 'artist_profile_click',
      category: 'engagement',
      label: `${section}_${artistName}`
    });
  };

  const handleNewsletterImpression = () => {
    event({
      action: 'newsletter_view',
      category: 'impression',
      label: 'footer_section'
    });
  };

  const handleSocialClick = (platform: string) => {
    event({
      action: 'social_link_click',
      category: 'engagement',
      label: platform
    });
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
      </div>

      {/* Stars & Artists Discovery Effect */}
      <div className="absolute inset-0 h-screen pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[85vh]">
          {/* Stars effect */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`bright-${i}`}
              className="absolute h-2 w-2 rounded-full bg-primary/60 blur-[1px] animate-twinkle hidden sm:block"
              style={{
                top: `${15 + Math.random() * 55}%`,
                right: `${Math.random() * 90}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
    
          {/* Smaller stars */}
          {[...Array(12)].map((_, i) => (
              <div
                key={`small-${i}`}
                className="absolute h-1 w-1 rounded-full bg-primary/40 animate-twinkle-slow hidden sm:block"
                style={{
                  top: `${10 + Math.random() * 60}%`,
                  right: `${Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 3}s`
                }}
              />
            ))}

            {/* Floating Artist Avatars */}
            {TOP_ARTISTS.slice(0, 5).map((artist, i) => (
              <div
                key={`artist-${i}`}
                className="absolute hidden sm:block"
                style={{
                  top: `${20 + Math.random() * 50}%`,
                  right: `${10 + Math.random() * 60}%`,
                }}
              >
                <div 
                  className="relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden shadow-lg animate-float-continuous"
                  style={{ animationDelay: `${i * -4}s` }}
                >
                  <img
                    src={artist.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative min-h-[90vh]">
          <div className="max-w-6xl mx-auto px-4 h-full flex flex-col">
            <div className="pt-8 flex-1 flex flex-col justify-center">
              <div className="max-w-3xl space-y-12">
                {/* Logo */}
                <div className="group cursor-pointer w-40">
                  <Image
                    src="/images/logo.svg"
                    alt="SONAR"
                    width={160}
                    height={57}
                    priority
                    className="object-contain"
                  />
                </div>
                
                {/* Hero Text Content */}
                <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
                  <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
                    <span className="inline-block">
                      AI talent scouting
                    </span>
                    <br />
                    <span className="inline-block">
                      for music.
                    </span>
                  </h1>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary leading-[1.2]">
                    <span className="inline-block">
                      The industry's most powerful
                    </span>
                    <br />
                    <span className="inline-block">
                      artist discovery engine.
                    </span>
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  {/* We build AI models to detect rising music creators, analyzing millions of data points across platforms to predict breakout potential with a high level of accuracy. */}
                  We build models to uncover high-potential artists and predict their future success, transforming how labels, brands and agencies find music talent.
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      size="lg" 
                      onClick={handleWaitlistClick}
                      className="group bg-primary hover:bg-primary/90 text-white relative overflow-hidden w-[200px] sm:w-[200px] mx-auto sm:mx-0"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Join our waitlist
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="group relative overflow-hidden w-[200px] sm:w-[200px] mx-auto sm:mx-0"
                      onClick={handleDemoClick}
                    >
                      Schedule a demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Demo Section */}
        <div className="relative -mt-4 sm:-mt-8 px-4 sm:px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Smart Search Demo */}
                <Card className="overflow-hidden shadow-xl bg-gradient-to-br from-background to-background/50">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                      <Search className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      <h3 className="text-lg sm:text-xl font-semibold">Smart Search</h3>
                    </div>
                    {/* Rest of the Smart Search content */}
                    <div className={`space-y-4 sm:space-y-6 transition-opacity duration-500 ${searchVisible ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="relative">
                        <Input
                          value={DEMO_SEARCHES[currentSearchIndex].query}
                          readOnly
                          className="bg-muted cursor-default pr-12 text-sm sm:text-base"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                      </div>
                      {/* Search results with adjusted padding */}
                      <div className="space-y-2 sm:space-y-3">
                        {DEMO_SEARCHES[currentSearchIndex].results.map((result, idx) => (
                          <div 
                            key={idx}
                            onClick={(event: React.MouseEvent) => {
                              handleSpotifyArtistClick(result.name, 'smart_search');
                              openSpotifyUrl(result.spotify_url, event);
                            }}
                            className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors group cursor-pointer"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors">
                                <img
                                  src={result.image}
                                  alt={result.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  {result.name}
                                </h4>
                                <div className="flex gap-2 mt-1">
                                  {result.genres.map((genre, gIdx) => (
                                    <span 
                                      key={gIdx}
                                      className="text-xs text-muted-foreground bg-background/50 px-2 py-0.5 rounded-full"
                                    >
                                      {genre}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className="font-semibold shrink-0 group-hover:bg-primary group-hover:text-white transition-colors"
                            >
                              {result.score.toFixed(1)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

              {/* Artist Score Demo */}
              <Card className="overflow-hidden shadow-xl bg-gradient-to-br from-background to-background/50">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    <h3 className="text-lg sm:text-xl font-semibold">Artist Score</h3>
                  </div>
                  <div className={`space-y-4 sm:space-y-6 transition-opacity duration-500 ${artistVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div 
                      className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
                      onClick={(event: React.MouseEvent) => {
                        handleSpotifyArtistClick(DEMO_ARTISTS[currentArtistIndex].name, 'artist_score');
                        openSpotifyUrl(DEMO_ARTISTS[currentArtistIndex].spotify_url, event);
                      }}
                    >
                      <img
                        src={DEMO_ARTISTS[currentArtistIndex].image}
                        alt={DEMO_ARTISTS[currentArtistIndex].name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors"
                      />
                      <div>
                        <h4 className="text-base sm:text-lg font-medium group-hover:text-primary transition-colors">
                          {DEMO_ARTISTS[currentArtistIndex].name}
                        </h4>
                        <div className="flex gap-2 mt-1">
                          {DEMO_ARTISTS[currentArtistIndex].genres.map((genre, idx) => (
                            <span 
                              key={idx}
                              className="text-xs text-muted-foreground bg-background/50 px-2 py-0.5 rounded-full"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                      <div className="text-4xl sm:text-5xl font-bold text-primary mb-3 sm:mb-4">
                        {DEMO_ARTISTS[currentArtistIndex].score.toFixed(1)}
                        <span className="text-lg sm:text-xl text-primary/60 ml-1">/100</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs sm:text-sm text-muted-foreground mb-2">Key Drivers</div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {DEMO_ARTISTS[currentArtistIndex].drivers.map((driver, idx) => (
                            <span 
                              key={idx}
                              className="text-xs font-medium bg-primary/10 text-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
                            >
                              {driver}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Customer Segments Section */}
        <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
            Trusted by music innovators
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-center mb-8 sm:mb-16 max-w-2xl mx-auto px-2">
            Join industry leaders leveraging AI-powered music discovery to stay ahead of trends
          </p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Record Labels & Management Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl blur-xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative bg-card p-4 sm:p-6 md:p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Labels & Artist Managers</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="leading-relaxed">
                    Improve your A&R process by identifying promising artists earlier and set yourself up to act fast.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span>Early-stage artist detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span>Growth trajectory analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span>Audience insights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Distributors Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl blur-xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative bg-card p-4 sm:p-6 md:p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Share2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Music Distributors</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="leading-relaxed">
                    Surface high-potential artists from your catalog to promotional partners and artist services teams.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span>Catalog prioritization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span>Service opportunity alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span>Cross-platform analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Brands & Agencies Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl blur-xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative bg-card p-4 sm:p-6 md:p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Brands & Agencies</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="leading-relaxed">
                    Connect with emerging artists that align perfectly with your brand values and target audience demographics.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span>Audience matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span>Brand affinity scoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span>Campaign analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Picks of the Week Section */}
        <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
            Our artist picks
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground text-center mb-6 sm:mb-8 md:mb-12 px-2">
            Our model detected strong growth signals for these emerging talents
          </p>
          <div className="relative overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex gap-3 sm:gap-6 overflow-x-hidden"
              style={{ 
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                paddingBottom: '20px'
              }}
            >
              {[...TOP_ARTISTS, ...TOP_ARTISTS].map((artist, index) => (
                <div 
                  key={`${artist.id}-${index}`}
                  className="flex-none w-60 sm:w-72 aspect-[4/5] cursor-pointer"
                  onClick={(event: React.MouseEvent) => {
                    handleSpotifyArtistClick(artist.name, 'picks_of_week');
                    openSpotifyUrl(artist.spotify_url || '', event);
                  }}
                >
                  <div className="relative h-full rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                    
                    {/* Artist Image */}
                    <img
                      src={artist.image_url}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Artist Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                      <h3 className="text-xl font-semibold mb-2">{artist.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {artist.genres?.slice(0, 2).map((genre, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {artist.demographics?.slice(0, 1).map((demo, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-primary/20 backdrop-blur-sm px-2 py-1 rounded-full"
                          >
                            {demo}
                          </span>
                        ))}
                        {artist.location?.slice(0, 1).map((loc, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-primary/20 backdrop-blur-sm px-2 py-1 rounded-full"
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-white/80">
                        {formatNumber(artist.monthlyListeners)} monthly listeners
                        {artist.monthlyListenersGrowth && (
                          <span className="ml-2 text-green-400">
                            +{artist.monthlyListenersGrowth}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto py-16 sm:py-24 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
            High accuracy
          </h2>
          <p className="text-sm sm:text-base text-center text-muted-foreground mb-8 sm:mb-16 px-2">
            Performance metrics of artists discovered by SONAR
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
            {/* Stream Growth */}
            <div className="group text-center px-2">
              <div className="space-y-2 sm:space-y-3">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 flex items-baseline justify-center">
                  <span>130</span>
                  <span className="text-xl sm:text-2xl md:text-3xl ml-0.5">%</span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium">Average Stream Growth</div>
                  <div className="text-xs text-muted-foreground mt-1">1 month after SONAR</div>
                </div>
              </div>
            </div>
            
            {/* Lead Time */}
            <div className="group text-center px-2">
              <div className="space-y-2 sm:space-y-3">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 flex items-baseline justify-center">
                  <span>3</span>
                  <span className="text-xl sm:text-2xl md:text-3xl ml-0.5"></span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium">Months</div>
                  <div className="text-xs text-muted-foreground mt-1">From top release to SONAR</div>
                </div>
              </div>
            </div>
            
            {/* Monthly Listeners */}
            <div className="group text-center px-2">
              <div className="space-y-2 sm:space-y-3">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 flex items-baseline justify-center">
                  <span>35</span>
                  <span className="text-xl sm:text-2xl md:text-3xl ml-0.5">K</span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium">Monthly Listeners</div>
                  <div className="text-xs text-muted-foreground mt-1">At time of detection</div>
                </div>
              </div>
            </div>
            
            {/* Release Cadence */}
            <div className="group text-center px-2">
              <div className="space-y-2 sm:space-y-3">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 flex items-baseline justify-center">
                  <span>6-10</span>
                  <span className="text-xl sm:text-2xl md:text-3xl ml-0.5"></span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium">Weeks</div>
                  <div className="text-xs text-muted-foreground mt-1">Release cadence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="relative bg-primary/5 border-t border-primary/10">
          <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-20">
            <div className="relative max-w-3xl mx-auto text-center space-y-8 sm:space-y-10">
              {/* Main CTAs */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-2">
                  Join the future of music discovery
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
                  Be among the first to discover and support tomorrow's breakthrough artists.
                  Our AI-powered platform gives you the edge in identifying emerging talent.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                  <Button 
                    size="lg" 
                    className="gap-2 w-[200px] sm:w-[200px] mx-auto sm:mx-0"
                    onClick={handleWaitlistClick}
                  >
                    Join our waitlist <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-black hover:bg-black/5 w-[200px] sm:w-[200px] mx-auto sm:mx-0"
                    onClick={handleDemoClick}
                  >
                    Schedule a demo
                  </Button>
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="max-w-md mx-auto pt-2 px-2">
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
                  Subscribe to our newsletter for weekly updates straight to your inbox
                </p>
                <div className="bg-transparent rounded-lg">
                  <iframe
                    src="https://sonarmusic.substack.com/embed"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    style={{ 
                      background: 'transparent',
                      borderRadius: '8px',
                      mixBlendMode: 'multiply'
                    }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative">
          <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
            <div className="relative max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
              {/* Brand Section */}
              <div className="space-y-3 sm:space-y-4">
                <Image
                  src="/images/logo.svg"
                  alt="SONAR"
                  width={100}
                  height={36}
                  className="mx-auto sm:w-[120px]"
                />
                <p className="text-muted-foreground text-sm px-6">
                  Predictive talent discovery for the music industry.
                </p>
                <p className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()} SONAR. All rights reserved.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-8 sm:gap-6 py-2">
                <a 
                  href="mailto:maxime@sonarlabs.io"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    handleSocialClick('email');
                    window.location.href = 'mailto:maxime@sonarlabs.io';
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="email"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/sonarlabs-io/" 
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    handleSocialClick('linkedin');
                    window.open('https://www.linkedin.com/company/sonarlabs-io/', '_blank', 'noopener,noreferrer');
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/sonar.labs" 
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    handleSocialClick('instagram');
                    window.open('https://www.instagram.com/sonar.labs', '_blank', 'noopener,noreferrer');
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }