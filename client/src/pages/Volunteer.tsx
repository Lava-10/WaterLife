import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Trophy } from "lucide-react";

const Volunteer = () => {
  const cleanupDrives = [
    {
      id: 1,
      title: "Beach Cleanup at Jericho Beach",
      location: "Jericho Beach, Vancouver",
      date: "2025-02-01",
      participants: 15,
      spotsLeft: 5,
    },
    {
      id: 2,
      title: "Beach Restoration Project",
      location: "Kitsilano, Vancouver",
      date: "2025-02-15",
      participants: 8,
      spotsLeft: 12,
    },
  ];

  const leaderboard = [
    { name: "Sarah Johnson", points: 450, events: 12 },
    { name: "Mike Chen", points: 380, events: 10 },
    { name: "Emma Davis", points: 320, events: 8 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-ocean-600">Upcoming Cleanup Drives</h2>
          {cleanupDrives.map((drive) => (
            <Card key={drive.id}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{drive.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{drive.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(drive.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {drive.spotsLeft} spots left
                  </span>
                  <Button className="bg-ocean-600 hover:bg-ocean-700">
                    Join Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((leader, index) => (
                  <div
                    key={leader.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-ocean-600">
                        #{index + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold">{leader.name}</h4>
                        <p className="text-sm text-gray-600">
                          {leader.events} events completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-ocean-600">
                        {leader.points}
                      </span>
                      <p className="text-sm text-gray-600">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;