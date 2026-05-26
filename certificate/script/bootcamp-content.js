/**
 * Bootcamp-specific copy for certificate detail pages.
 * Add a new key matching `bootcamp_name` from the API to support future programs.
 */
const BOOTCAMP_CONTENT = {
  "Designing Digital Product per Stage and Metric": {
    title: "Designing Digital Product per Stage and Metric",
    tagline: "Fact based, move fast, measure what matter",
    learningDurationHours: 97,
    cta: {
      label: "Explore Designing Digital Product per Stage and Metric",
      href: "../designing-digital-produc-per-stage-and-metric.html",
    },
    whatYouWillLearn: [
      "Design digital products based on business stages, user behavior, and product metrics",
      "Make product decisions through data analysis, experimentation, and user insights",
      "Identify user problems, unmet needs, and market opportunities in Product Discovery",
      "Design and validate hypotheses through research, behavioral analysis, and experimentation",
      "Collaborate effectively across design, business, and engineering teams in Product Delivery",
      "Measure product metrics to evaluate product health, user behavior, and business impact",
      "Build Growth-oriented thinking by optimizing user lifecycle, and user expansion strategies",
      "Apply product analytics and UX frameworks to align UX goals with business outcomes",
      "CI/CD through tracking systems, feedback loops, and iteration",
    ],
    skills: [
      "Product Lifecycle Management", "Agile", "Value Propositions", "North Star Metric", "Market Opportunities",
      "Event Tracking", "User Journey Mapping", "Solution Design", "Behavior Analysis", "Data-Driven Decision Making",
      "Problem Solving", "Critical Thinking", "Experiment Design", "Product Strategy", "Cross-functional Collaboration",
      "Performance Metric", "Customer Retention", "Customer Analysis", "Statistical Analysis", "Digital Product Development"
    ]
  },

  "Applied UX Analytic": {
    title: "Applied UX Analytic",
    tagline: "Behavioral decision making for product team",
    learningDurationHours: 36,
    cta: {
      label: "Explore this bootcamp",
      href: "../applied-ux-analytic/index.html",
    },
    whatYouWillLearn: [
      "Making product and UX decisions under conditions of uncertainty",
      "Evaluating insight reliability and calculating confidence scoring",
      "Mastering core Product Metrics and implementing measurement frameworks",
      "Measuring and tracking the correlation between Product Metrics and UX Metrics",
      "Breaking down complex macro-metrics into actionable micro-signals",
      "Analyzing core product health: Retention, Adoption Rate, and Conversion Rate",
      "Mapping and measuring user actions across the entire Customer Journey",
      "Translating a user journey map into trackable behavioral signals",
      "Writing technical event tracking requirements and data schemas",
      "Standardizing event naming conventions and identifying user properties",
      "Verifying and auditing data quality to ensure analytical accuracy",
      "Conducting multi-step conversion analysis and friction/drop-off analysis",
      "Analyzing user flows, paths, retention rates, and cohort behavior",
      "Performing behavioral segmentation to isolate specific user groups",
      "Identifying unusual user behaviors and evaluating user engagement quality",
      "Designing statistical experiments, sampling methods, and setting statistical significance",
      "Calculating confidence intervals and understanding Type I and Type II errors",
      "Reading statistical software outputs and effectively visualizing data",
      "Using qualitative tools: Session replays, heatmap analysis, and usability testing",
      "Identifying expectation breakdowns and cognitive friction points in the UI",
      "Conducting heuristic evaluations and deep-dive user interviews",
      "Synthesizing qualitative and quantitative insights and resolving data contradictions",
      "Delivering professional tracking plans and structured behavioral analyses",
      "Effectively communicating user behaviors, product impact, and root causes",
      "Navigating trade-offs, conflicts, data uncertainty, and stakeholder biases",
      "Proposing prioritized product improvements based on data evidence",
      "Mastering data storytelling and defending recommendations to stakeholders"
    ],
    skills: [
      "UX Analytics",
      "Product Metrics",
      "Measurement Frameworks",
      "Retention Analysis",
      "Conversion Analysis",
      "User Journey Mapping",
      "Event Tracking",
      "Data Schemas",
      "Cohort Analysis",
      "Behavioral Segmentation",
      "A/B Testing",
      "Statistical Significance",
      "Confidence Intervals",
      "Heatmap Analysis",
      "Usability Testing",
      "Heuristic Evaluation",
      "Data Storytelling",
      "Prioritization",
      "Stakeholder Communication"
    ]
  },
};

/**
 * @param {string} bootcampName
 * @returns {object|null}
 */
function getBootcampContent(bootcampName) {
  return BOOTCAMP_CONTENT[bootcampName] || null;
}
