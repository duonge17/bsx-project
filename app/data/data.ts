const orderBookData = [
  { price: 56785, size: 0.45, own: false },
  { price: 56672, size: 0.77, own: false },
  { price: 56809, size: 0.33, own: false },
  { price: 56742, size: 0.12, own: false },
  { price: 56690, size: 0.95, own: false },
  { price: 56800, size: 0.65, own: false },
  { price: 56722, size: 0.88, own: false },
  { price: 56661, size: 0.25, own: false },
  { price: 56830, size: 0.50, own: false },
  { price: 56713, size: 0.20, own: false },
  { price: 56811, size: 0.40, own: false },
  { price: 56767, size: 0.55, own: false },
  { price: 56804, size: 0.80, own: false },
  { price: 56725, size: 0.35, own: false },
  { price: 56687, size: 0.70, own: false },
  { price: 56829, size: 0.90, own: false },
  { price: 56757, size: 0.15, own: false },
  { price: 56821, size: 0.60, own: false },
  { price: 56694, size: 0.75, own: false },
  { price: 56816, size: 0.85, own: false },
  { price: 56748, size: 0.30, own: false },
  { price: 56802, size: 0.68, own: false },
  { price: 56678, size: 0.22, own: false },
  { price: 56810, size: 0.95, own: false },
  { price: 56737, size: 0.45, own: false },
  { price: 56805, size: 0.58, own: false },
  { price: 56681, size: 0.50, own: false },
  { price: 56819, size: 0.77, own: false },
  { price: 56762, size: 0.40, own: false },
  { price: 56812, size: 0.90, own: false },
  { price: 56756, size: 0.35, own: false },
  { price: 56808, size: 0.80, own: false },
  { price: 56696, size: 0.15, own: false },
  { price: 56740, size: 0.70, own: false },
  { price: 56665, size: 0.25, own: false },
  { price: 56807, size: 0.55, own: false },
  { price: 56784, size: 0.60, own: false },
  { price: 56820, size: 0.85, own: false },
  { price: 56698, size: 0.50, own: false },
  { price: 56801, size: 0.90, own: false },
  { price: 56753, size: 0.40, own: false },
  { price: 56814, size: 0.65, own: false },
  { price: 56729, size: 0.78, own: false },
  { price: 56690, size: 0.22, own: false },
  { price: 56813, size: 0.47, own: false },
  { price: 56744, size: 0.83, own: false },
  { price: 56825, size: 0.62, own: false },
  { price: 56716, size: 0.71, own: false },
  { price: 56811, size: 0.54, own: false },
  { price: 56699, size: 0.88, own: false },
  { price: 56800, size: 0.95, own: false },
  { price: 56733, size: 0.42, own: false },
  { price: 56809, size: 0.76, own: false },
  { price: 56675, size: 0.34, own: false },
];
  const tradeHistory = [
    { price: 56785, size: 0.45, time: "12:34:56" },
    { price: 56672, size: 0.77, time: "08:15:23" },
    { price: 56809, size: 0.33, time: "14:22:11" },
    { price: 56742, size: 0.12, time: "16:01:47" },
    { price: 56690, size: 0.95, time: "09:30:05" },
    { price: 56800, size: 0.65, time: "11:44:32" },
    { price: 56722, size: 0.88, time: "13:57:18" },
    { price: 56661, size: 0.25, time: "10:10:10" },
    { price: 56830, size: 0.50, time: "15:23:45" },
    { price: 56713, size: 0.20, time: "17:32:29" },
    { price: 56811, size: 0.40, time: "12:45:12" },
    { price: 56767, size: 0.55, time: "14:57:55" },
    { price: 56804, size: 0.80, time: "16:23:17" },
    { price: 56725, size: 0.35, time: "09:20:45" },
    { price: 56687, size: 0.70, time: "11:05:30" },
    { price: 56829, size: 0.90, time: "13:45:50" },
    { price: 56757, size: 0.15, time: "15:23:05" },
    { price: 56821, size: 0.60, time: "17:10:40" },
    { price: 56694, size: 0.75, time: "09:54:15" },
    { price: 56816, size: 0.85, time: "12:22:59" },
    { price: 56748, size: 0.30, time: "14:47:30" },
    { price: 56802, size: 0.68, time: "16:05:28" },
    { price: 56678, size: 0.22, time: "18:18:18" },
    { price: 56810, size: 0.95, time: "08:23:00" },
    { price: 56737, size: 0.45, time: "10:15:45" },
    { price: 56805, size: 0.58, time: "12:32:22" },
    { price: 56681, size: 0.50, time: "14:50:15" },
    { price: 56819, size: 0.77, time: "16:01:01" },
    { price: 56762, size: 0.40, time: "18:20:33" },
    { price: 56812, size: 0.90, time: "08:25:12" },
    { price: 56756, size: 0.35, time: "10:35:28" },
    { price: 56808, size: 0.80, time: "12:42:11" },
    { price: 56696, size: 0.15, time: "14:55:05" },
    { price: 56740, size: 0.70, time: "16:01:25" },
    { price: 56665, size: 0.25, time: "18:22:17" },
    { price: 56807, size: 0.55, time: "08:30:50" },
    { price: 56784, size: 0.60, time: "10:45:37" },
    { price: 56820, size: 0.85, time: "12:50:23" },
    { price: 56698, size: 0.50, time: "14:30:55" },
    { price: 56801, size: 0.90, time: "16:40:22" },
    { price: 56753, size: 0.40, time: "18:12:43" },
    { price: 56814, size: 0.65, time: "08:22:31" },
    { price: 56729, size: 0.78, time: "10:30:40" },
    { price: 56690, size: 0.22, time: "12:40:20" },
    { price: 56813, size: 0.47, time: "14:55:15" },
    { price: 56744, size: 0.83, time: "16:01:03" },
    { price: 56825, size: 0.62, time: "18:10:22" },
    { price: 56716, size: 0.71, time: "08:22:22" },
    { price: 56811, size: 0.54, time: "10:35:18" },
    { price: 56699, size: 0.88, time: "12:47:50" },
    { price: 56800, size: 0.95, time: "14:55:33" },
    { price: 56733, size: 0.42, time: "16:05:01" },
    { price: 56809, size: 0.76, time: "18:15:42" },
    { price: 56675, size: 0.34, time: "08:23:56" },
];

export {tradeHistory,orderBookData}