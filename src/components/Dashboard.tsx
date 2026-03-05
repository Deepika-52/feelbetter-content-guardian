
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, ShieldOff, Youtube, MessageSquare } from 'lucide-react';
import PlatformCard from './PlatformCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
interface DashboardProps {
  isActive: boolean;
  blockedContentCount: number;
  protectionLevel: number;
}

const Dashboard = ({ isActive, blockedContentCount, protectionLevel }: DashboardProps) => {
  const { toast } = useToast();
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const platforms = [
    {
      name: 'YouTube',
      icon: Youtube,
      enabled: true,
      blockedToday: 15,
      description: 'Filter out negative video content and harmful comments'
    },
    {
      name: 'Instagram',
      icon: MessageSquare,
      enabled: true,
      blockedToday: 23,
      description: 'Hide triggering posts and protect your feed'
    }
  ];

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <Card className={isActive ? 'border-fb-primary/50' : 'border-fb-danger/50'}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            {isActive ? (
              <>
                <Shield className="mr-2 h-5 w-5 text-fb-primary" />
                Protection Active
              </>
            ) : (
              <>
                <ShieldOff className="mr-2 h-5 w-5 text-fb-danger" />
                Protection Disabled
              </>
            )}
          </CardTitle>
          <CardDescription>
            {isActive 
              ? 'FeelBetter is actively filtering your content' 
              : 'Your content is not being filtered'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Protection Level</span>
              <span className="font-medium">{protectionLevel}%</span>
            </div>
            <Progress value={protectionLevel} className="h-2" />
          </div>
          
          <div className="mt-4 text-sm">
            <div className="flex justify-between items-center mb-1">
              <span>Content Blocked Today</span>
              <span className="font-medium text-fb-primary">{blockedContentCount}</span>
            </div>
            <p className="text-muted-foreground text-xs mt-1">
              FeelBetter has protected you from {blockedContentCount} potentially harmful content items today
            </p>
          </div>
        </CardContent>
      </Card>

      <h3 className="font-medium text-lg mt-6 mb-2">Protected Platforms</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <PlatformCard key={platform.name} platform={platform} />
        ))}
      </div>

      <Card className="mt-6 bg-gradient-to-r from-fb-primary/10 to-fb-primary/5 border-fb-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">🧠 How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            FeelBetter scans content in real-time, detecting potentially harmful or triggering material using AI and keyword analysis. Negative content is automatically blurred or hidden, while positive content remains visible.
          </p>
          <Button 
            className="mt-4 bg-white text-fb-primary hover:bg-white/90 border border-fb-primary/20"
            onClick={() => setLearnMoreOpen(true)}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>

      <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🧠 How FeelBetter Works</DialogTitle>
            <DialogDescription>
              Understanding the technology behind your mental wellness shield
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <p><strong>1. Real-Time Scanning</strong> — FeelBetter continuously monitors content on YouTube and Instagram, analyzing titles, captions, and comments as they appear.</p>
            <p><strong>2. AI Keyword Detection</strong> — Our algorithm detects harmful keywords and phrases related to depression, anxiety, violence, and other triggering topics.</p>
            <p><strong>3. Sentiment Analysis</strong> — Beyond keywords, we analyze the overall tone and sentiment of content to catch subtle negativity.</p>
            <p><strong>4. Content Filtering</strong> — Harmful content is blurred or hidden from your feed, keeping only positive and educational material visible.</p>
            <p><strong>5. Trusted Contact Alerts</strong> — If harmful content exceeds your set threshold, FeelBetter automatically notifies your trusted contact via email or SMS.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
