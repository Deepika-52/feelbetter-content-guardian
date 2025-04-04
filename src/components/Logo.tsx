
import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ size = 'md', className }: LogoProps) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 28
  };

  return (
    <div className={cn('flex items-center gap-2 font-bold', sizes[size], className)}>
      <Shield className="text-fb-primary" size={iconSizes[size]} />
      <span>
        Feel<span className="text-fb-primary">Better</span>
      </span>
    </div>
  );
};

export default Logo;
