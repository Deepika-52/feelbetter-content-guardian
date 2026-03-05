
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BellOff, Bell, Eye, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsProps {
  onSensitivityChange: (value: number) => void;
  sensitivityLevel: number;
}

const Settings = ({ onSensitivityChange, sensitivityLevel }: SettingsProps) => {
  const [emailContact, setEmailContact] = React.useState('');
  const [phoneContact, setPhoneContact] = React.useState('');
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [phoneAlerts, setPhoneAlerts] = React.useState(false);
  const [contactTab, setContactTab] = React.useState('email');
  const [alertThreshold, setAlertThreshold] = React.useState<'low' | 'medium' | 'high'>('medium');
  const { toast } = useToast();

  const handleSave = () => {
    if (emailAlerts && !emailContact && contactTab === 'email') {
      toast({ title: "Missing email", description: "Please enter a trusted contact email", variant: "destructive" });
      return;
    }
    if (phoneAlerts && !phoneContact && contactTab === 'phone') {
      toast({ title: "Missing phone", description: "Please enter a trusted contact phone number", variant: "destructive" });
      return;
    }
    toast({
      title: "Settings saved ✓",
      description: `Sensitivity: ${getSensitivityLabel(sensitivityLevel)} | Alerts: ${alertThreshold} threshold`,
    });
  };

  const getSensitivityLabel = (value: number) => {
    if (value <= 30) return "Low";
    if (value <= 70) return "Medium";
    return "High";
  };

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Content Filter Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Eye className="mr-2 h-5 w-5 text-fb-primary" />
            Content Filter Settings
          </CardTitle>
          <CardDescription>Customize how FeelBetter filters your content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="sensitivity">Content Sensitivity</Label>
              <span className="text-sm font-medium">{getSensitivityLabel(sensitivityLevel)}</span>
            </div>
            <Slider
              id="sensitivity"
              min={0}
              max={100}
              step={10}
              value={[sensitivityLevel]}
              onValueChange={(value) => onSensitivityChange(value[0])}
              className="data-[state=active]:bg-fb-primary"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Adjust how sensitive the content filter should be. Higher sensitivity will filter more content.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="keywords">Filter Harmful Keywords</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically detect and hide content with harmful keywords
                </p>
              </div>
              <Switch id="keywords" defaultChecked className="data-[state=checked]:bg-fb-primary" />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sentimentAnalysis">Sentiment Analysis</Label>
                <p className="text-sm text-muted-foreground">
                  Use AI to detect negative sentiment in content
                </p>
              </div>
              <Switch id="sentimentAnalysis" defaultChecked className="data-[state=checked]:bg-fb-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Bell className="mr-2 h-5 w-5 text-fb-primary" />
            Trusted Contact Alerts
          </CardTitle>
          <CardDescription>Set up alerts for when harmful content is detected</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={contactTab} onValueChange={setContactTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone SMS</TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="emailContact">Trusted Contact Email</Label>
                <Input
                  id="emailContact"
                  type="email"
                  placeholder="email@example.com"
                  value={emailContact}
                  onChange={(e) => setEmailContact(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This person will be notified if harmful content is detected frequently
                </p>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="emailAlerts" 
                  checked={emailAlerts} 
                  onCheckedChange={setEmailAlerts}
                  className="data-[state=checked]:bg-fb-primary"
                />
                <Label htmlFor="emailAlerts">Enable email alerts</Label>
              </div>
            </TabsContent>
            <TabsContent value="phone" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="phoneContact">Trusted Contact Phone</Label>
                <Input
                  id="phoneContact"
                  type="tel"
                  placeholder="+1 (123) 456-7890"
                  value={phoneContact}
                  onChange={(e) => setPhoneContact(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This person will receive SMS alerts if harmful content is detected frequently
                </p>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="phoneAlerts" 
                  checked={phoneAlerts} 
                  onCheckedChange={setPhoneAlerts}
                  className="data-[state=checked]:bg-fb-primary"
                />
                <Label htmlFor="phoneAlerts">Enable SMS alerts</Label>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="alertThreshold">Alert Threshold</Label>
                <p className="text-sm text-muted-foreground">
                  Send alerts only when harmful content exceeds:
                </p>
              </div>
              <div className="flex items-center space-x-1">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <Button 
                    key={level}
                    variant="outline" 
                    size="sm" 
                    className={`h-8 px-2 capitalize ${alertThreshold === level ? 'bg-fb-primary text-white hover:bg-fb-primary/90' : ''}`}
                    onClick={() => {
                      setAlertThreshold(level);
                      toast({ title: `Alert threshold set to ${level}`, description: `Alerts will trigger at ${level} sensitivity` });
                    }}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Button className="w-full mt-6 bg-fb-primary hover:bg-fb-primary/90" onClick={handleSave}>
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
