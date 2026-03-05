
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, ExternalLink, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Platform {
  name: string;
  icon: LucideIcon;
  enabled: boolean;
  blockedToday: number;
  description: string;
}

interface PlatformCardProps {
  platform: Platform;
}

const youtubeContent = [
  { title: '10 Minute Morning Yoga for Beginners', safe: true, channel: 'Yoga With Adriene', views: '2.1M' },
  { title: 'Why everyone is depressed nowadays', safe: false, channel: 'DarkThoughts', views: '890K', harmType: 'Depression' },
  { title: 'Study With Me - 3 Hour Focus Session', safe: true, channel: 'StudyMD', views: '1.5M' },
  { title: 'Most violent moments in sports history', safe: false, channel: 'CrashTV', views: '3.2M', harmType: 'Violence' },
  { title: 'How to Build Confidence as a Student', safe: true, channel: 'TED-Ed', views: '4.7M' },
];

const instagramContent = [
  { title: '"Believe in yourself today ✨" - @motivatedaily', safe: true, type: 'Post', likes: '12.4K' },
  { title: '"Nobody cares about you..." - @sadquotes', safe: false, type: 'Reel', likes: '45K', harmType: 'Negativity' },
  { title: '"My morning smoothie recipe 🥤" - @healthyeats', safe: true, type: 'Story', likes: '8.2K' },
  { title: '"Self harm awareness..." - @darkfeed', safe: false, type: 'Post', likes: '22K', harmType: 'Self-harm' },
  { title: '"Cute puppies compilation 🐶" - @dailypets', safe: true, type: 'Reel', likes: '98K' },
];

const PlatformCard = ({ platform }: PlatformCardProps) => {
  const [enabled, setEnabled] = React.useState(platform.enabled);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const { toast } = useToast();

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    toast({
      title: checked ? `${platform.name} protection enabled` : `${platform.name} protection disabled`,
      description: checked 
        ? `Content filtering is now active on ${platform.name}` 
        : `Content on ${platform.name} will no longer be filtered`,
    });
  };

  const content = platform.name === 'YouTube' ? youtubeContent : instagramContent;

  return (
    <>
      <Card className="card-hover-effect cursor-pointer" onClick={() => setPreviewOpen(true)}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base font-medium">{platform.name}</CardTitle>
            <CardDescription className="text-xs mt-1">{platform.description}</CardDescription>
          </div>
          <platform.icon className="h-5 w-5 text-fb-primary" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <Badge variant="secondary" className="bg-fb-primary/10 text-fb-primary hover:bg-fb-primary/20">
                {platform.blockedToday} blocked today
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs gap-1"
                onClick={(e) => { e.stopPropagation(); setPreviewOpen(true); }}
              >
                <Eye className="h-3 w-3" /> Preview
              </Button>
              <Switch 
                checked={enabled} 
                onCheckedChange={handleToggle} 
                className="data-[state=checked]:bg-fb-primary"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <platform.icon className="h-5 w-5 text-fb-primary" />
              {platform.name} Feed Preview
            </DialogTitle>
            <DialogDescription>
              {enabled 
                ? 'FeelBetter is filtering harmful content from this feed' 
                : 'Protection is disabled — all content is shown unfiltered'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            {content.map((item, i) => {
              const isBlocked = enabled && !item.safe;
              return (
                <div
                  key={i}
                  className={`rounded-lg border p-3 transition-all ${
                    isBlocked 
                      ? 'bg-destructive/5 border-destructive/20 blur-[2px] hover:blur-none' 
                      : 'bg-card hover:bg-accent/50'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isBlocked ? 'text-destructive' : ''}`}>
                        {isBlocked ? '⚠️ Content hidden by FeelBetter' : item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {platform.name === 'YouTube' 
                          ? `${(item as any).channel} • ${(item as any).views} views`
                          : `${(item as any).type} • ${(item as any).likes} likes`
                        }
                      </p>
                    </div>
                    {isBlocked && (
                      <Badge variant="destructive" className="text-[10px] shrink-0">
                        {(item as any).harmType}
                      </Badge>
                    )}
                    {item.safe && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-[10px] shrink-0">
                        Safe
                      </Badge>
                    )}
                  </div>
                  {isBlocked && (
                    <p className="text-[11px] text-muted-foreground mt-2 italic">
                      Hover to reveal • This content was flagged for: {(item as any).harmType}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-fb-primary/5 border border-fb-primary/20 text-xs text-center">
            {enabled 
              ? `✅ ${content.filter(c => !c.safe).length} harmful items blocked • ${content.filter(c => c.safe).length} safe items shown`
              : '⚠️ Enable protection to start filtering harmful content'
            }
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlatformCard;
