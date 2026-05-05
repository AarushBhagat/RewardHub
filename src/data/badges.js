export const badges = [
  {
    id: "B001",
    name: "Star Performer",
    description: "Awarded for being the top performer of the month.",
    icon: "🌟",
    bonusPoints: 100,
    triggerRule: "Top monthly score",
    earnedBy: ["EMP003", "EMP001"]
  },
  {
    id: "B002",
    name: "Perfect Attendance",
    description: "Awarded for 100% attendance in a month.",
    icon: "📅",
    bonusPoints: 50,
    triggerRule: "100% attendance",
    earnedBy: ["EMP001", "EMP002"]
  },
  {
    id: "B003",
    name: "Team Player",
    description: "Awarded for receiving exceptional peer feedback.",
    icon: "🤝",
    bonusPoints: 30,
    triggerRule: "5+ positive reviews",
    earnedBy: ["EMP002"]
  },
  {
    id: "B004",
    name: "Innovator",
    description: "Awarded for proposing a new idea that was implemented.",
    icon: "💡",
    bonusPoints: 75,
    triggerRule: "Approved proposal",
    earnedBy: []
  }
];
