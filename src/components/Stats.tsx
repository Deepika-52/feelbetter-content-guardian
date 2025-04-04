
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatsProps {
  blockedContentCount: number;
}

const Stats = ({ blockedContentCount }: StatsProps) => {
  const [timeRange, setTimeRange] = React.useState('week');
  
  // Sample data for charts
  const weeklyData = [
    { name: 'Mon', youtube: 4, instagram: 6 },
    { name: 'Tue', youtube: 3, instagram: 5 },
    { name: 'Wed', youtube: 6, instagram: 8 },
    { name: 'Thu', youtube: 4, instagram: 7 },
    { name: 'Fri', youtube: 5, instagram: 9 },
    { name: 'Sat', youtube: 7, instagram: 11 },
    { name: 'Sun', youtube: 5, instagram: 8 },
  ];
  
  const monthlyData = [
    { name: 'Week 1', youtube: 22, instagram: 35 },
    { name: 'Week 2', youtube: 28, instagram: 42 },
    { name: 'Week 3', youtube: 31, instagram: 38 },
    { name: 'Week 4', youtube: 26, instagram: 44 },
  ];
  
  const getChartData = () => {
    return timeRange === 'week' ? weeklyData : monthlyData;
  };
  
  // Calculate total blocked content
  const getTotalBlocked = () => {
    return getChartData().reduce((acc, day) => acc + day.youtube + day.instagram, 0);
  };
  
  const getMostProtectedPlatform = () => {
    const youtubeTotalBlocked = getChartData().reduce((acc, day) => acc + day.youtube, 0);
    const instagramTotalBlocked = getChartData().reduce((acc, day) => acc + day.instagram, 0);
    
    return instagramTotalBlocked > youtubeTotalBlocked ? 'Instagram' : 'YouTube';
  };
  
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content Protection Statistics</CardTitle>
          <CardDescription>View how FeelBetter is protecting you</CardDescription>
          
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full mt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="week">Past Week</TabsTrigger>
              <TabsTrigger value="month">Past Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getChartData()}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="youtube" name="YouTube" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="instagram" name="Instagram" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Content Blocked</CardTitle>
            <CardDescription>Total filtered content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fb-primary">{getTotalBlocked()}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Items filtered during this period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Most Protected Platform</CardTitle>
            <CardDescription>Where we filtered the most content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fb-primary">{getMostProtectedPlatform()}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Platform with highest protection
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Content Categories Blocked</CardTitle>
          <CardDescription>Types of content FeelBetter protected you from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Anxiety-Inducing</span>
                <span>42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Depressive Content</span>
                <span>28%</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Violent Media</span>
                <span>15%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Other Negative Content</span>
                <span>15%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
