export const colorInfo = {
  RED: "FFADAD",
  ORANGE: "FFD6A5",
  YELLOW: "FDFFB6",
  GREEN: "CAFFBF",
  LIGHT_BLUE: "9BF6FF",
  BLUE: "A0C4FF",
  PURPLE: "BDB2FF",
  PINK: "FFC6FF",
  GRAY: "DEDEDE",
} as const;

export type colorInfoUnion = typeof colorInfo[keyof typeof colorInfo];

// export enum colorInfo {
//   "RED" = "FFADAD",
//   "ORANGE" = "FFD6A5",
//   "YELLOW" = "FDFFB6",
//   "GREEN" = "CAFFBF",
//   "LIGHT_BLUE" = "9BF6FF",
//   "BLUE" = "A0C4FF",
//   "PURPLE" = "BDB2FF",
//   "PINK" = "FFC6FF",
//   "GRAY" = "DEDEDE",
// }

export enum roleInfo {
  "FULL_TIME" = "직원",
  "PART_TIME" = "알바",
  "MANAGER" = "매니저",
}
