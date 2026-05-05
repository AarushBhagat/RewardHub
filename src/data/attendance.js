// Daily attendance records
export const attendance = [
  {
    date: "2023-11-10",
    employeeId: "EMP001",
    status: "Present",
    checkIn: "09:02 AM",
    scoreImpact: 10
  },
  {
    date: "2023-11-10",
    employeeId: "EMP002",
    status: "Late",
    checkIn: "10:15 AM",
    scoreImpact: -5
  },
  {
    date: "2023-11-10",
    employeeId: "EMP003",
    status: "Present",
    checkIn: "08:55 AM",
    scoreImpact: 10
  },
  {
    date: "2023-11-09",
    employeeId: "EMP001",
    status: "Present",
    checkIn: "09:00 AM",
    scoreImpact: 10
  },
  {
    date: "2023-11-09",
    employeeId: "EMP002",
    status: "Absent",
    checkIn: null,
    scoreImpact: -20
  },
  {
    date: "2023-11-09",
    employeeId: "EMP003",
    status: "Remote",
    checkIn: "09:10 AM",
    scoreImpact: 8
  },
  {
    date: "2023-11-08",
    employeeId: "EMP001",
    status: "Late",
    checkIn: "10:30 AM",
    scoreImpact: -5
  },
  {
    date: "2023-11-08",
    employeeId: "EMP002",
    status: "Present",
    checkIn: "08:50 AM",
    scoreImpact: 10
  },
  {
    date: "2023-11-08",
    employeeId: "EMP003",
    status: "Absent",
    checkIn: null,
    scoreImpact: -20
  },
  {
    date: "2023-11-07",
    employeeId: "EMP001",
    status: "Present",
    checkIn: "09:05 AM",
    scoreImpact: 10
  },
  {
    date: "2023-11-07",
    employeeId: "EMP002",
    status: "Remote",
    checkIn: "09:00 AM",
    scoreImpact: 8
  },
  {
    date: "2023-11-07",
    employeeId: "EMP003",
    status: "Present",
    checkIn: "08:58 AM",
    scoreImpact: 10
  }
];

// Monthly summary (kept separately for dashboard stats)
export const attendanceSummary = {
  present: 85,
  absent: 5,
  late: 8,
  remote: 2
};
