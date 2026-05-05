export const rewards = [
  {
    id: "REW001",
    employeeId: "EMP001",
    points: 50,
    reason: "100% Attendance for October",
    date: "2023-11-01",
    issuedBy: "Admin"
  },
  {
    id: "REW002",
    employeeId: "EMP003",
    points: 100,
    reason: "Top Performer of the Month",
    date: "2023-11-02",
    issuedBy: "Admin"
  },
  {
    id: "REW003",
    employeeId: "EMP002",
    points: 20,
    reason: "Great peer feedback",
    date: "2023-11-05",
    issuedBy: "AI Engine"
  }
];

export const rewardTiers = [
  { name: "Bronze", minPoints: 100, maxPoints: 499, color: "bronze" },
  { name: "Silver", minPoints: 500, maxPoints: 999, color: "silver" },
  { name: "Gold", minPoints: 1000, maxPoints: 1999, color: "gold" },
  { name: "Diamond", minPoints: 2000, maxPoints: 99999, color: "diamond" }
];
