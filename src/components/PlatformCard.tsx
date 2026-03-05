
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
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

const PlatformCard = ({ platform }: PlatformCardProps) => {
  const [enabled, setEnabled] = React.useState(platform.enabled);
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

  return (
    <Card className="card-hover-effect">
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
          <Switch 
            checked={enabled} 
            onCheckedChange={handleToggle} 
            className="data-[state=checked]:bg-fb-primary" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
