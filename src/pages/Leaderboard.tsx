
import MainLayout from "@/components/layout/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

// This would come from the API in a real application
const leaderboardData = [
  { rank: 1, username: "ml_master", score: 9850, problemsSolved: 127, achievements: ["Top Contributor", "Python Expert"] },
  { rank: 2, username: "data_ninja", score: 8920, problemsSolved: 115, achievements: ["Problem Solver"] },
  { rank: 3, username: "ai_explorer", score: 8450, problemsSolved: 98, achievements: ["Fast Learner"] },
  { rank: 4, username: "deep_learner", score: 7890, problemsSolved: 89, achievements: ["Consistent"] },
  { rank: 5, username: "neural_net", score: 7560, problemsSolved: 82, achievements: ["Rising Star"] },
];

const Leaderboard = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="flex items-center gap-2 mb-8">
          <Trophy className="h-8 w-8 text-amber-500" />
          <h1 className="text-4xl font-bold">Leaderboard</h1>
        </div>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Problems Solved</TableHead>
                <TableHead>Achievements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow key={user.rank} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {user.rank === 1 && "🥇"}
                    {user.rank === 2 && "🥈"}
                    {user.rank === 3 && "🥉"}
                    {user.rank > 3 && `#${user.rank}`}
                  </TableCell>
                  <TableCell className="font-semibold">{user.username}</TableCell>
                  <TableCell className="text-right">{user.score.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{user.problemsSolved}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      {user.achievements.map((achievement) => (
                        <Badge
                          key={achievement}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Leaderboard;
