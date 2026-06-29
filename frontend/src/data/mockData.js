// ─── Dashboard Stats ────────────────────────────────────────────────────────
export const dashboardStats = {
  currentStreak: 76,
  totalSolved: 342,
  nextRevisionHours: 4,
  pendingRevisions: 3,
};

// ─── Skill Gap Radar Data ────────────────────────────────────────────────────
export const radarData = [
  { subject: "Arrays", value: 85, fullMark: 100 },
  { subject: "DP", value: 62, fullMark: 100 },
  { subject: "Graphs", value: 28, fullMark: 100 },
  { subject: "Trees", value: 70, fullMark: 100 },
  { subject: "Backtrack", value: 45, fullMark: 100 },
];

export const masteryBars = [
  { label: "Arrays / Hashing", value: 85, color: "#f5a623" },
  { label: "Dynamic Programming", value: 62, color: "#f5a623" },
  { label: "Graphs (Critical Gap)", value: 28, color: "#e74c3c", critical: true },
  { label: "Trees", value: 70, color: "#f5a623" },
  { label: "Backtracking", value: 45, color: "#f5a623" },
];

// ─── Recent Agent Analysis ───────────────────────────────────────────────────
export const recentAnalysis = [
  {
    id: 1,
    problem: "Course Schedule II",
    pattern: "Topological Sort",
    complexity: "O(V + E)",
    status: "Optimal",
  },
  {
    id: 2,
    problem: "Pacific Atlantic Water Flow",
    pattern: "Graph DFS/BFS",
    complexity: "O(m × n × max(m,n))",
    status: "Sub-optimal",
  },
  {
    id: 3,
    problem: "Network Delay Time",
    pattern: "Dijkstra's",
    complexity: "O(E log V)",
    status: "Optimal",
  },
];

// ─── Today's Revision ────────────────────────────────────────────────────────
export const todaysRevision = [
  {
    id: 1,
    title: "3Sum",
    difficulty: "Medium",
    tag: "Two Pointers",
    timeAgo: "14d ago",
    urgent: false,
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    tag: "Stack",
    timeAgo: "30d ago",
    urgent: false,
  },
  {
    id: 3,
    title: "Longest Path in a DAG",
    difficulty: "Hard",
    tag: "Graph DP",
    timeAgo: null,
    urgent: true,
    label: "Focus Gap",
  },
];

// ─── Full Revision Queue ─────────────────────────────────────────────────────
export const revisionQueue = [
  {
    id: 1,
    title: "3Sum",
    difficulty: "Medium",
    tag: "Two Pointers",
    daysAgo: 14,
    priority: "High",
    pattern: "Two Pointers",
    attempts: 2,
    nextReview: "Today",
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    tag: "Stack",
    daysAgo: 30,
    priority: "Medium",
    pattern: "Stack",
    attempts: 1,
    nextReview: "Today",
  },
  {
    id: 3,
    title: "Longest Path in a DAG",
    difficulty: "Hard",
    tag: "Graph DP",
    daysAgo: 21,
    priority: "Critical",
    pattern: "Graph DP",
    attempts: 3,
    nextReview: "Today",
  },
  {
    id: 4,
    title: "Word Break II",
    difficulty: "Hard",
    tag: "DP",
    daysAgo: 18,
    priority: "High",
    pattern: "Dynamic Programming",
    attempts: 2,
    nextReview: "Tomorrow",
  },
  {
    id: 5,
    title: "Kth Largest Element",
    difficulty: "Medium",
    tag: "Heap",
    daysAgo: 10,
    priority: "Medium",
    pattern: "Heap / Priority Queue",
    attempts: 1,
    nextReview: "In 2 days",
  },
  {
    id: 6,
    title: "Alien Dictionary",
    difficulty: "Hard",
    tag: "Topological Sort",
    daysAgo: 25,
    priority: "High",
    pattern: "Graph",
    attempts: 3,
    nextReview: "Tomorrow",
  },
];

// ─── Problem History ─────────────────────────────────────────────────────────
export const problemHistory = [
  {
    id: 1,
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
    pattern: "Hash Table",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    agentNote: "Optimal implementation.",
    agentNoteType: "success",
    expanded: false,
  },
  {
    id: 2,
    number: 146,
    title: "LRU Cache",
    difficulty: "Medium",
    pattern: "Design, Doubly-Linked List",
    timeComplexity: "O(1)",
    spaceComplexity: "O(N)",
    agentNote: "Review eviction logic overhead.",
    agentNoteType: "warning",
    expanded: true,
    agentAnalysis: `Your approach used a combination of a Hash Map and a Doubly-Linked List, which correctly achieves the O(1) time complexity for both get and put operations. However, the space overhead is slightly higher than optimal due to redundant node allocations during the eviction phase.`,
    code: `def put(self, key: int, value: int) -> None:
    if key in self.cache:
        self.remove(self.cache[key])
    node = Node(key, value)
    self.insert(node)
    self.cache[key] = node
    if len(self.cache) > self.capacity:
        lru = self.left.next
        self.remove(lru)
        del self.cache[lru.key]  # High overhead on eviction`,
    optimizationStrategy: `Instead of deleting and re-creating nodes when a key exists, update the node's value and move it to the head. For evictions, reuse the LRU node object by updating its key/value and moving it to the MRU position to reduce Garbage Collection pauses.`,
    highlightLine: 8,
  },
  {
    id: 3,
    number: 42,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    pattern: "Two Pointers",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    agentNote: "Perfect space optimization.",
    agentNoteType: "success",
    expanded: false,
  },
  {
    id: 4,
    number: 200,
    title: "Number of Islands",
    difficulty: "Medium",
    pattern: "DFS, Matrix",
    timeComplexity: "O(M×N)",
    spaceComplexity: "O(M×N)",
    agentNote: "Consider BFS for shorter call stack.",
    agentNoteType: "info",
    expanded: false,
  },
  {
    id: 5,
    number: 207,
    title: "Course Schedule",
    difficulty: "Medium",
    pattern: "Topological Sort",
    timeComplexity: "O(V+E)",
    spaceComplexity: "O(V+E)",
    agentNote: "Clean cycle detection.",
    agentNoteType: "success",
    expanded: false,
  },
];

// ─── Skill Map — Pattern Cards ────────────────────────────────────────────────
export const patternCards = [
  {
    id: 1,
    title: "Sliding Window",
    mastery: 82,
    solved: 45,
    complexity: "O(N)",
    color: "#00d4d4",
  },
  {
    id: 2,
    title: "Binary Search",
    mastery: 91,
    solved: 62,
    complexity: "O(LOG N)",
    color: "#f5a623",
  },
  {
    id: 3,
    title: "Graph (DFS/BFS)",
    mastery: 54,
    solved: 28,
    complexity: "O(V+E)",
    color: "#f5a623",
  },
  {
    id: 4,
    title: "Recursion & Memo",
    mastery: 68,
    solved: 34,
    complexity: "VARIES",
    color: "#f5a623",
  },
];

export const criticalWeakZones = [
  { label: "Dynamic Prog.", mastery: 21 },
  { label: "Backtracking", mastery: 34 },
];

export const patternAffinities = [
  "You solve 65% of array problems using Two Pointers, even when a Hash Map yields O(1) lookups.",
  "Heavy reliance on Sorting (O(N log N)) detected in greedy approaches where O(N) frequency counts suffice.",
];

export const approachDistribution = [
  { name: "Brute Force", value: 38, color: "#444" },
  { name: "Sub-Optimal", value: 15, color: "#8B6914" },
  { name: "Optimal", value: 42, color: "#00d4d4" },
  { name: "Creative", value: 5, color: "#f5a623" },
];

// ─── AI Chat ─────────────────────────────────────────────────────────────────
export const initialMessages = [
  {
    id: 1,
    role: "user",
    content:
      "Explain why my solution for LRU Cache was sub-optimal. I used an array instead of a linked list.",
  },
  {
    id: 2,
    role: "agent",
    content: `Using an array for an LRU Cache fundamentally violates the O(1) time complexity requirement for both \`get\` and \`put\` operations.\n\nWhen a cache capacity is reached in an array-based implementation, removing the least recently used item (typically at index 0) requires shifting all subsequent elements down by one position. This operation takes O(N) time, where N is the capacity.`,
    recommendedStructure: {
      title: "Recommended Structure",
      body: "A Hash Map combined with a Doubly Linked List.\n• Hash Map: Provides O(1) node access.\n• Doubly Linked List: Provides O(1) node removal and insertion (for maintaining usage order).",
    },
    contextLinks: ["#146. LRU Cache", "Your Attempt (2 days ago)"],
    analyzing: false,
  },
];

export const chatRecommendations = [
  {
    id: 1,
    title: "Course Schedule",
    difficulty: "MED",
    note: "Weakness detected in Topo Sort recognition (Graphs).",
    type: "warning",
  },
  {
    id: 2,
    title: "Word Break",
    difficulty: "MED",
    note: "Follow up to your recent 1D DP review.",
    type: "info",
  },
  {
    id: 3,
    title: "Merge k Sorted Lists",
    difficulty: "HARD",
    note: "Test implementation speed for Priority Queue/Heaps.",
    type: "info",
  },
];
