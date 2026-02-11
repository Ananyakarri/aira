import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Heart, Brain, TrendingUp, Calendar, AlertCircle, Smartphone } from 'lucide-react';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  icon: any;
}

interface MoodEntry {
  date: string;
  mood: number;
  stressLevel: number;
  notes: string;
}

export default function DashboardPage() {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    { id: '1', name: 'Heart Rate', value: 72, unit: 'bpm', status: 'good', icon: Heart },
    { id: '2', name: 'Stress Level', value: 45, unit: '%', status: 'warning', icon: Brain },
    { id: '3', name: 'Activity', value: 6500, unit: 'steps', status: 'good', icon: Activity },
    { id: '4', name: 'Sleep Quality', value: 78, unit: '%', status: 'good', icon: TrendingUp },
  ]);

  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { date: '2026-01-22', mood: 7, stressLevel: 4, notes: 'Feeling good today' },
    { date: '2026-01-21', mood: 6, stressLevel: 6, notes: 'Bit stressed at work' },
    { date: '2026-01-20', mood: 8, stressLevel: 3, notes: 'Great day!' },
  ]);

  const [currentMood, setCurrentMood] = useState(5);
  const [currentStress, setCurrentStress] = useState(5);
  const [deviceConnected, setDeviceConnected] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleLogMood = () => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      stressLevel: currentStress,
      notes: '',
    };
    setMoodHistory([newEntry, ...moodHistory]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-primary/10 to-highlightyellow/10 py-16">
          <div className="max-w-[100rem] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
                Your Health Dashboard
              </h1>
              <p className="font-paragraph text-xl text-foreground/80 max-w-3xl">
                Track your mental and physical health metrics, monitor your mood, and get personalized insights.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Device Integration Section */}
        <section className="w-full py-12 bg-background">
          <div className="max-w-[100rem] mx-auto px-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle className="font-heading text-2xl">Device Integration</CardTitle>
                      <CardDescription className="font-paragraph">
                        Connect your wearable devices to track health data
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={() => setDeviceConnected(!deviceConnected)}
                    variant={deviceConnected ? 'default' : 'outline'}
                    className="h-12"
                  >
                    {deviceConnected ? 'Connected' : 'Connect Device'}
                  </Button>
                </div>
              </CardHeader>
              {deviceConnected && (
                <CardContent>
                  <p className="font-paragraph text-sm text-green-600">
                    ✓ Device connected successfully. Real-time data collection active.
                  </p>
                </CardContent>
              )}
            </Card>
          </div>
        </section>

        {/* Main Dashboard Content */}
        <section className="w-full py-12">
          <div className="max-w-[100rem] mx-auto px-6">
            <Tabs defaultValue="metrics" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
                <TabsTrigger value="mood">Mood Tracker</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              {/* Health Metrics Tab */}
              <TabsContent value="metrics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {healthMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-2 hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <metric.icon className={`w-8 h-8 ${getStatusColor(metric.status)}`} />
                            <span className={`text-xs font-paragraph ${getStatusColor(metric.status)}`}>
                              {metric.status.toUpperCase()}
                            </span>
                          </div>
                          <CardTitle className="font-heading text-lg mt-4">{metric.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="font-heading text-3xl text-foreground">
                              {metric.value}
                              <span className="text-lg font-paragraph text-foreground/60 ml-1">
                                {metric.unit}
                              </span>
                            </p>
                            <Progress value={metric.value > 100 ? 100 : metric.value} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">User State Detection</CardTitle>
                    <CardDescription className="font-paragraph">
                      AI-powered analysis of your current mental and physical state
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-heading text-lg text-blue-900 mb-2">Current State Analysis</h4>
                          <p className="font-paragraph text-blue-800">
                            Based on your recent data, you're showing moderate stress levels. 
                            Consider taking a break or trying our AI stress relief chat.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border-2 rounded-lg">
                        <p className="font-paragraph text-sm text-foreground/60 mb-1">Mental State</p>
                        <p className="font-heading text-xl text-foreground">Moderate Stress</p>
                      </div>
                      <div className="p-4 border-2 rounded-lg">
                        <p className="font-paragraph text-sm text-foreground/60 mb-1">Physical State</p>
                        <p className="font-heading text-xl text-foreground">Good Condition</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Mood Tracker Tab */}
              <TabsContent value="mood" className="space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Log Your Mood</CardTitle>
                    <CardDescription className="font-paragraph">
                      Track how you're feeling today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                          Mood Level: {currentMood}/10
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={currentMood}
                          onChange={(e) => setCurrentMood(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs font-paragraph text-foreground/60 mt-1">
                          <span>Very Low</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                      <div>
                        <label className="font-paragraph text-sm text-foreground/80 mb-2 block">
                          Stress Level: {currentStress}/10
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={currentStress}
                          onChange={(e) => setCurrentStress(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs font-paragraph text-foreground/60 mt-1">
                          <span>Very Low</span>
                          <span>Very High</span>
                        </div>
                      </div>
                    </div>
                    <Button onClick={handleLogMood} className="w-full h-12">
                      Log Today's Mood
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Mood History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {moodHistory.map((entry, index) => (
                        <div key={index} className="p-4 border-2 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-paragraph text-sm text-foreground/60">
                              {entry.date}
                            </span>
                            <Calendar className="w-4 h-4 text-foreground/40" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-paragraph text-xs text-foreground/60">Mood</p>
                              <p className="font-heading text-lg">{entry.mood}/10</p>
                            </div>
                            <div>
                              <p className="font-paragraph text-xs text-foreground/60">Stress</p>
                              <p className="font-heading text-lg">{entry.stressLevel}/10</p>
                            </div>
                          </div>
                          {entry.notes && (
                            <p className="font-paragraph text-sm text-foreground/80 mt-2">
                              {entry.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Health Reports & Analysis</CardTitle>
                    <CardDescription className="font-paragraph">
                      Comprehensive insights into your mental health journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                        <p className="font-paragraph text-sm text-green-700 mb-1">Average Mood</p>
                        <p className="font-heading text-4xl text-green-900">7.0</p>
                        <p className="font-paragraph text-xs text-green-600 mt-2">↑ 12% from last week</p>
                      </div>
                      <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                        <p className="font-paragraph text-sm text-yellow-700 mb-1">Avg Stress</p>
                        <p className="font-heading text-4xl text-yellow-900">4.3</p>
                        <p className="font-paragraph text-xs text-yellow-600 mt-2">↓ 8% from last week</p>
                      </div>
                      <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <p className="font-paragraph text-sm text-blue-700 mb-1">Check-ins</p>
                        <p className="font-heading text-4xl text-blue-900">23</p>
                        <p className="font-paragraph text-xs text-blue-600 mt-2">This month</p>
                      </div>
                    </div>

                    <div className="p-6 border-2 rounded-lg">
                      <h4 className="font-heading text-xl mb-4">AI-Generated Insights</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <p className="font-paragraph text-foreground/80">
                            Your mood tends to be higher on days with more physical activity
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <p className="font-paragraph text-foreground/80">
                            Stress levels peak on weekdays, consider scheduling relaxation time
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <p className="font-paragraph text-foreground/80">
                            You've maintained consistent check-ins - great progress!
                          </p>
                        </li>
                      </ul>
                    </div>

                    <Button variant="outline" className="w-full h-12">
                      Download Full Report (PDF)
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
