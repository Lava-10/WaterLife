import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Calculator = () => {
  const [showerTime, setShowerTime] = useState("");
  const [dishwashingTime, setDishwashingTime] = useState("");
  const [gardeningTime, setGardeningTime] = useState("");
  const [showTips, setShowTips] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTips(true);
  };

  const data = [
    {
      name: 'Shower',
      minutes: Number(showerTime) || 0,
    },
    {
      name: 'Dishwashing',
      minutes: Number(dishwashingTime) || 0,
    },
    {
      name: 'Gardening',
      minutes: Number(gardeningTime) || 0,
    },
  ];

  const waterSavingTips = [
    "Take shorter showers - aim for 5 minutes or less",
    "Install a water-efficient showerhead",
    "Use a dishwasher instead of hand washing when possible",
    "Water your garden early morning or late evening to reduce evaporation",
    "Install a drip irrigation system for your garden",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-ocean-600">Water Usage Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shower">Average daily shower time (minutes)</Label>
              <Input
                id="shower"
                type="number"
                value={showerTime}
                onChange={(e) => setShowerTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dishwashing">Average daily dishwashing time (minutes)</Label>
              <Input
                id="dishwashing"
                type="number"
                value={dishwashingTime}
                onChange={(e) => setDishwashingTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gardening">Average daily garden watering time (minutes)</Label>
              <Input
                id="gardening"
                type="number"
                value={gardeningTime}
                onChange={(e) => setGardeningTime(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700">
              Get Tips
            </Button>
          </form>

          {showTips && (
            <div className="mt-8 space-y-8">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ocean-600">Water Saving Tips:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {waterSavingTips.map((tip, index) => (
                    <li key={index} className="text-gray-600">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;