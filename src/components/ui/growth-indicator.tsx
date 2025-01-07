import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface GrowthIndicatorProps {
    growth: number;
    className?: string;
  }
  
  export function GrowthIndicator({ growth, className }: GrowthIndicatorProps) {
    if (growth <= 0.5) return null;
    
    const getIndicators = () => {
      if (growth > 0.9) return Array(3).fill(null);
      if (growth > 0.7) return Array(2).fill(null);
      return [null];
    };
  
    const getTooltipText = () => {
      if (growth > 0.9) return "Exceptional growth compared to other SONAR artists";
      if (growth > 0.7) return "Strong growth compared to other SONAR artists";
      return "Above average growth compared to other SONAR artists";
    };
  
    const color = growth > 0.7 ? "text-emerald-500" : "text-emerald-400";
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn("flex items-center gap-0.5 ml-2", color, className)}>
              {getIndicators().map((_, i) => (
                <ArrowUpRight key={i} className="w-4 h-4" />
              ))}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {getTooltipText()}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }