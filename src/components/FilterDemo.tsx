
import React from 'react';
import { Card } from '@/components/ui/card';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  isHarmful: boolean;
  category: 'youtube' | 'instagram';
  harmType?: string;
}

interface FilterDemoProps {
  isActive: boolean;
  sensitivityLevel: number;
}

const FilterDemo = ({ isActive, sensitivityLevel }: FilterDemoProps) => {
  const contentItems: ContentItem[] = [
    {
      id: 1,
      title: 'How to manage daily stress and anxiety',
      description: 'Tips and techniques for managing stress in your daily life',
      isHarmful: false,
      category: 'youtube'
    },
    {
      id: 2,
      title: 'Why I feel so depressed all the time',
      description: 'Personal vlog about dealing with depression and negative thoughts',
      isHarmful: true,
      category: 'youtube',
      harmType: 'Depression'
    },
    {
      id: 3,
      title: 'Motivational morning routine for success',
      description: 'Start your day with positivity and achieve your goals',
      isHarmful: false,
      category: 'instagram'
    },
    {
      id: 4,
      title: 'Violent video games and their impact',
      description: 'Exploring the connection between gaming and aggressive behavior',
      isHarmful: true,
      category: 'youtube',
      harmType: 'Violence'
    },
    {
      id: 5,
      title: 'Mindfulness meditation for beginners',
      description: 'Simple techniques to become more present and reduce anxiety',
      isHarmful: false,
      category: 'instagram'
    }
  ];

  // Filter content based on sensitivity level
  const visibleContent = contentItems.filter(item => {
    if (!isActive) return true;
    if (!item.isHarmful) return true;
    
    // Basic algorithm: higher sensitivity means more content gets filtered
    const threshold = 100 - sensitivityLevel;
    return Math.random() * 100 > threshold;
  });

  return (
    <div className="p-4 border-t mt-4">
      <h3 className="font-medium text-lg mb-4">Live Content Filter Demo</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This demonstrates how FeelBetter would filter your social media feed in real-time.
        {isActive ? ' Harmful content is automatically blurred or removed.' : ' Currently disabled.'}
      </p>
      
      <div className="space-y-4 mt-6">
        {contentItems.map(item => {
          const isFiltered = isActive && item.isHarmful && !visibleContent.includes(item);
          
          return (
            <Card 
              key={item.id} 
              className={`p-4 ${isFiltered ? 'blur-content bg-red-50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">
                    {isFiltered ? 'Content filtered for your wellbeing' : item.title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {isFiltered ? (
                      <>Reason: <span className="text-fb-danger font-medium">{item.harmType}</span></>
                    ) : (
                      item.description
                    )}
                  </div>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-gray-100">
                  {item.category === 'youtube' ? 'YouTube' : 'Instagram'}
                </div>
              </div>
              {isFiltered && (
                <div className="mt-2 text-xs text-fb-primary">
                  FeelBetter has protected you from potentially harmful content
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FilterDemo;
