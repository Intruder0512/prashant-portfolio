/**
 * Central portfolio data for Prashant Yadav — THE ARCHITECT.
 * Content carried over from the previous prashantyadav.tech site (index.php).
 * Every component reads from this file: update it here and the whole site follows.
 */
import legacy from './legacy.json';

export type Palette = { from: string; via: string; to: string; accent: string };

/** Career start — experience years are calculated from this, so they never go stale. */
const CAREER_START = new Date(2009, 1, 1);
const now = new Date();
export const yearsExp =
  now.getFullYear() - CAREER_START.getFullYear() - (now.getMonth() < CAREER_START.getMonth() ? 1 : 0);

export const profile = {
  fullName: 'Prashant Yadav',
  displayName: 'Prashant Yadav',
  firstName: 'PRASHANT',
  seriesTag: 'THE ARCHITECT',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A YADAV ORIGINAL',
  role: 'Senior Solutions Architect',
  tagline: ['Agentic AI', 'Data Architecture', 'Cloud · Kubernetes · Edge'],
  intro:
    'Connecting application, data and AI architecture into one governed platform — large-scale cloud platforms, enterprise data architectures and agentic AI / GenAI systems across enterprise, government and defense environments.',
  longIntro:
    'From hybrid lakehouses (S3 · Glue · MWAA · Redshift · Kafka) and multi-agent RAG platforms on AWS Bedrock and Azure OpenAI, to multi-tenant Kubernetes serving 1M+ users, air-gapped defense DevSecOps and ARM edge AI pipelines — the focus is always delivery: scalable, secure and production-ready.',
  quote:
    'Modern enterprise platforms aren’t built in silos — application architecture, data architecture and AI orchestration only deliver real value when they’re connected and governed as one system.',
  location: 'Noida, India',
  email: 'prashuyadav@outlook.com',
  languages: 'English · Hindi',
  links: {
    linkedin: 'https://www.linkedin.com/in/prashant-yadav-a6120115/',
    github: '' as string,
  },
  /**
   * Optional: drop your resume PDF into public/assets/ and set the path here, e.g.
   * '/assets/Prashant_Yadav_Resume.pdf'. While it's empty, "Download" prints the on-page resume to PDF.
   */
  resumePdf: '' as string,
  resumeFileName: 'Prashant_Yadav_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Prashant Yadav',
  },
  focus: ['Data Architecture', 'Agentic AI & GenAI', 'Hybrid Cloud', 'Kubernetes', 'Edge AI'],
};

export const education = [
  {
    school: 'IMT-CDL Ghaziabad',
    place: 'Noida',
    degree: 'PGE Master of Business Administration — Business Analytics',
    short: 'MBA, Business Analytics',
    period: '2021 – 2022',
  },
  {
    school: 'Dr. A.P.J. Abdul Kalam Technical University (IEC CET)',
    place: 'Greater Noida',
    degree: 'Bachelor of Technology — Information Technology',
    short: 'B.Tech, Information Technology',
    period: '2002 – 2006',
  },
];

export type Role = { company: string; role: string; place: string; period: string; points: string[] };

export const experience: Role[] = [
  {
    company: 'BHP India Technical Centre',
    role: 'Chapter Lead — AI Development',
    place: 'Gurugram',
    period: 'Aug 2026 – Present',
    points: [
      'Leading the AI Development chapter at BHP’s India Technical Centre — building agentic AI agents for internal tools and workflows.',
      'Integrating a multi-agent AI system into BHP’s enterprise operating platform.',
      'Owning delivery of the Technical Centre’s demand operating model — how global BHP teams raise demand and how work is scoped, allocated, delivered and charged back.',
      'Product ownership of the AI tool BHP demand managers worldwide use to request Technical Centre resources.',
    ],
  },
  {
    company: 'Judge India Solutions Pvt. Ltd.',
    role: 'Senior Manager — Solutions Architect',
    place: 'Noida',
    period: 'Sep 2025 – Jul 2026',
    points: [
      'Architected enterprise data platforms — S3 lakehouse (Raw / Silver / Gold), Redshift warehouse, AWS Glue + MWAA Airflow pipelines, and streaming ingestion via Kafka, Kinesis and IoT Core.',
      'Designed agentic AI / GenAI platforms on AWS Bedrock and Azure OpenAI — multi-agent orchestration with classification, retrieval (RAG), summarization, compliance and response agents.',
      'Built RAG pipelines on vector databases (OpenSearch, Pinecone, FAISS) with chunking, embeddings, prompt guardrails and tenant-scoped retrieval.',
      'Implemented enterprise AI governance — PII masking, tenant isolation, prompt registry, model versioning, drift monitoring, eval harness, audit logging and human-in-loop validation.',
      'Solved production GenAI challenges — retry storms and queue buildup mitigated with queue isolation, circuit breakers, dead-letter queues, retry backoff and graceful degradation.',
      'Architected digital twin and simulation platforms for automotive and defense systems with AWS-based vSoC environments (ARM + GPU), secure VPCs, CI/CD and automation.',
      'Delivered ADAS simulation pipelines using CARLA, ROS2 and distributed compute; defense-grade DevSecOps with Jenkins, Gitea, Nexus and Ansible.',
    ],
  },
  {
    company: 'Judge India Solutions Pvt. Ltd.',
    role: 'Solutions Architect',
    place: 'Noida',
    period: 'Oct 2023 – Dec 2025',
    points: [
      'Delivered a Kubernetes-based national LMS platform across 76 universities, supporting 1M+ users with multi-tenant deployment and centralized governance on Nutanix HCI.',
      'Designed the Visionext ARM Edge AI pipeline integrating AWS IoT Core, Greengrass, Lambda, S3, SageMaker, MQTT and MongoDB for real-time analytics.',
      'Built CI/CD pipelines with Jenkins, SonarQube and Trivy; automated DEV / UAT / PROD deployments improving release stability.',
      'Implemented cloud monitoring (Prometheus, Grafana, CloudWatch, ELK / OpenSearch), HA architecture and cost-optimization strategies across business units.',
      'Architected ARM virtualization integrated with AWS IoT Core, IoT Greengrass, Lambda and SageMaker for distributed real-time analytics and edge intelligence.',
    ],
  },
  {
    company: 'Judge India Solutions Pvt. Ltd.',
    role: 'Senior Technology Architect',
    place: 'Noida',
    period: 'Jun 2022 – Sep 2023',
    points: [
      'Led enterprise infrastructure architecture and compliance delivery (ISO, CMMI), acting as architecture design authority across POCs, RFPs and enterprise implementations.',
      'Designed HA systems on AWS with auto-scaling, multi-AZ failover and disaster recovery — EC2 snapshots, S3 backup storage and automated failover.',
      'Containerized workloads with Docker and led production deployment for the Tata Sky Self-Help Portal with Docker-based CI/CD automation.',
      'Implemented Azure Active Directory, Keycloak SSO, AWS IAM and KMS encryption, strengthening authentication, identity governance and access control.',
    ],
  },
  {
    company: 'Judge India Solutions Pvt. Ltd.',
    role: 'Deputy Manager — Information Technology',
    place: 'Noida',
    period: 'Sep 2019 – Jun 2022',
    points: [
      'Led enterprise IT infrastructure modernization and cloud migration across multiple business units.',
      'Migrated Exchange to Office 365 and on-prem servers to Azure — modernizing identity architecture and reducing operational overhead.',
      'Designed and implemented Business Continuity Planning (BCP) frameworks during pandemic disruptions — zero downtime for distributed teams.',
      'Managed network infrastructure, firewalls, VPNs, ISP coordination and IT asset lifecycle governance across multi-site deployments.',
      'Optimized cloud spending through monitoring, rightsizing and utilization analytics.',
    ],
  },
  {
    company: 'Judge India Solutions Pvt. Ltd.',
    role: 'Assistant Manager — IT',
    place: 'Noida',
    period: 'Aug 2016 – Oct 2019',
    points: [
      'Managed enterprise IT operations — networking, firewalls and system deployment for 200+ employees across multiple offices.',
      'Ensured IT policy implementation, security controls and business support across delivery, AI/ML, sales and operations teams.',
      'Directed vendor evaluation and procurement negotiations for optimized infrastructure and operational continuity.',
    ],
  },
  {
    company: 'Geetarsh Solutions Pvt. Ltd.',
    role: 'Director & Freelance IT Consultant',
    place: 'Noida',
    period: 'Aug 2012 – Oct 2016',
    points: [
      'Led end-to-end BPO and IT infrastructure setup for 4+ organizations — dialers, VOIP, networking hardware and CRM integrations.',
      'Designed scalable infrastructure blueprints for inbound and outbound technical-support business models.',
      'Directed 15–20 member technical teams as Working Director; managed procurement, hardware sourcing and technology budgets.',
    ],
  },
  {
    company: 'Dell Perot Systems TSI India',
    role: 'Sr. Client Support Associate',
    place: 'Noida',
    period: 'Jun 2010 – Aug 2012',
    points: [
      'Delivered enterprise IT asset and application support for Dell employees globally with SLA-driven incident resolution.',
      'Managed BMC Remedy incident management — ticketing, escalation and request-lifecycle governance.',
      'Led the transition of US hardware support operations to India and a knowledge-base migration.',
    ],
  },
  {
    company: 'Cyfuture India Pvt. Ltd.',
    role: 'L2 Technician',
    place: 'Noida',
    period: 'Aug 2009 – May 2010',
    points: [
      'Supervised 10+ L1 resources managing PPC and SEO technical-sales performance across two locations.',
      'Designed training modules for technical-sales transitions and structured onboarding.',
    ],
  },
  {
    company: 'IGATE Global Solutions',
    role: 'Sr. Technical Support Analyst',
    place: 'Noida',
    period: 'Feb 2009 – Jul 2009',
    points: [
      'Technical support for Royal Bank of Canada internal enterprise users.',
      'Administered the McAfee Endpoint Security portal across a secure banking environment.',
    ],
  },
];

export const orgCount = new Set(experience.map((e) => e.company)).size;

export type Metric = { value: string; label: string };
export type Motif = 'layers' | 'nodes' | 'tenants' | 'road' | 'chip' | 'shield' | 'edge' | 'mesh' | 'cloud' | 'flow';

export type Project = {
  id: string;
  title: string;
  /** Client / programme — shown as the badge on the card. */
  client: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Featured projects get the big cinematic cards; the rest appear in "More Productions". */
  featured?: boolean;
  /** Id of an architecture diagram in the Blueprints section. */
  blueprint?: string;
  github?: string;
  palette: Palette;
  motif: Motif;
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };
const ember: Palette = { from: '#1f0a04', via: '#7a2a0c', to: '#0a0605', accent: '#ff8a5c' };

export const projects: Project[] = [
  {
    id: 'data-bridge',
    title: 'Data Bridge Platform',
    client: 'AWS · Finance & Staffing',
    genre: 'Data Lakehouse • GenAI • RAG',
    logline: 'Five fragmented finance and staffing systems unified into one governed AWS lakehouse — then made conversational with grounded, cited RAG.',
    stack: ['S3 Medallion', 'AWS Glue PySpark', 'AWS DMS', 'Amazon Textract', 'OpenSearch', 'Amazon Bedrock', 'Lake Formation', 'QuickSight'],
    build: [
      'Unified 5+ fragmented finance and staffing systems into a governed S3 Medallion Lakehouse (Bronze / Silver / Gold) using AWS Glue PySpark ELT, CDC via AWS DMS and incremental loads with Glue Job Bookmarks — enabling schema evolution and raw-data retention for reprocessing.',
      'Automated document extraction (Amazon Textract async + SNS), entity resolution in PySpark across HR, CRM and payroll systems, and KPI calculation (billing margin, PO balance, approval lag) with Glue Data Quality validation at every layer.',
      'Layered Amazon Bedrock RAG on top — Titan Embeddings v2 (1536-dim), OpenSearch HNSW + BM25 hybrid retrieval with security trimming, and Claude 3 Sonnet generating grounded answers with invoice / PO / timesheet citations.',
      'QuickSight SPICE dashboards with IAM row-level security for finance managers.',
    ],
    features: ['S3 Bronze / Silver / Gold lakehouse', 'CDC with AWS DMS', 'Textract document extraction', 'Cross-system entity resolution', 'Hybrid BM25 + k-NN retrieval', 'Cited, grounded answers', 'Row-level security dashboards'],
    metrics: [
      { value: '5+', label: 'source systems unified' },
      { value: '3', label: 'medallion layers — Bronze, Silver, Gold' },
      { value: '1536', label: 'dimension Titan v2 embeddings' },
      { value: 'Hybrid', label: 'BM25 + HNSW k-NN retrieval' },
    ],
    featured: true,
    blueprint: 'databridge',
    palette: ocean,
    motif: 'layers',
  },
  {
    id: 'hr-policy-rag',
    title: 'HR Policy RAG Assistant',
    client: 'Amazon Bedrock',
    genre: 'GenAI • Enterprise RAG',
    logline: 'Employees ask questions about policies and SOPs in plain language — and get cited, role-aware answers that never leak what they can’t see.',
    stack: ['Amazon Bedrock', 'Claude 3 Sonnet', 'Titan Embeddings v2', 'OpenSearch', 'Amazon Textract', 'Bedrock Guardrails'],
    build: [
      'Built an enterprise HR Policy RAG Assistant: Textract async ingestion and structure-aware chunking (300–500 tokens, 50–80 overlap at section boundaries) so a rule is never separated from its exception.',
      'Titan Embeddings v2 (1536-dim) with OpenSearch hybrid BM25 + k-NN retrieval, and field-level security trimming applied DURING retrieval — never post-filtering.',
      'Bedrock Claude 3 Sonnet at temperature 0.1 with citation enforcement per factual claim, relevance-threshold fallback and a <5% hallucination target on ground-truth eval sets.',
    ],
    features: ['Structure-aware chunking', 'Security trimming at query time', 'Citation per factual claim', 'Relevance-threshold fallback', 'Policy version audit', 'Guardrails for prompt injection & PII'],
    metrics: [
      { value: '<5%', label: 'hallucination target on ground-truth evals' },
      { value: '0.1', label: 'model temperature — factual & consistent' },
      { value: '300–500', label: 'token structure-aware chunks' },
      { value: '1536', label: 'dimension embeddings on both sides' },
    ],
    featured: true,
    blueprint: 'hrrag',
    palette: violet,
    motif: 'nodes',
  },
  {
    id: 'lms-ai',
    title: 'LMS AI Platform',
    client: 'National LMS · AWS',
    genre: 'GenAI • Microservices • Media AI',
    logline: 'An AI layer for a national LMS serving 1M+ learners across 76 universities — seven independent AI microservices on Kubernetes.',
    stack: ['Amazon Bedrock', 'Amazon Polly', 'Amazon Transcribe', 'Amazon Translate', 'SageMaker', 'Rekognition', 'Step Functions', 'Kubernetes'],
    build: [
      'Designed a 7-microservice AI layer: content generation (Bedrock Claude 3), audio synthesis (Polly Neural TTS in 8 Indian languages), video transcription + WebVTT captions (Transcribe + Step Functions), translation with custom terminology, Rekognition moderation, a RAG gateway and SageMaker recommendations.',
      'Step Functions video-enrichment pipeline: moderation → transcription → WebVTT → chunking → embedding → indexing.',
      'Governance built in — Bedrock Guardrails, per-tenant KMS CMKs, VPC PrivateLink, human-in-loop SQS review queues, per-tenant budget caps and an AIMS / ISO 42001 audit trail.',
    ],
    features: ['7 HPA-scaled AI microservices', 'Polly Neural TTS · 8 Indian languages', 'Automated WebVTT captions', 'Pre-publication moderation', 'Human-in-loop faculty review', 'AIMS / ISO 42001 audit trail'],
    metrics: [
      { value: '1M+', label: 'learners on the platform' },
      { value: '76', label: 'universities' },
      { value: '7', label: 'independent AI microservices' },
      { value: '40–60%', label: 'less content-authoring time' },
      { value: '95%', label: 'caption coverage' },
    ],
    featured: true,
    blueprint: 'lmsai',
    palette: crimson,
    motif: 'tenants',
  },
  {
    id: 'icar-lms',
    title: 'National Multi-Tenant LMS',
    client: 'ICAR',
    genre: 'Kubernetes • Platform Engineering',
    logline: 'Kubernetes clusters on Nutanix HCI serving 1M+ users across 76 universities — each with its own domain, logo and logically separated data.',
    stack: ['Kubernetes', 'Nutanix HCI', 'Keycloak SSO', 'PostgreSQL', 'Redis', 'Jenkins', 'Prometheus', 'Grafana'],
    build: [
      'Architected Kubernetes clusters on Nutanix HCI supporting 1M+ users across 76 universities in four zones (North, East, West, South).',
      'Single-database multi-tenancy with row-level tenant isolation, per-tenant domains and branding, and Keycloak SSO with RBAC and 2FA.',
      'Built CI/CD automation for scalable multi-tenant deployments with centralized governance, plus Prometheus / Grafana observability and Velero backup & DR.',
    ],
    features: ['76 tenants · per-tenant domain & logo', 'Row-level tenant isolation', 'Keycloak SSO · RBAC · 2FA', 'Jenkins CI/CD with security scans', 'Velero backup & DR'],
    metrics: [
      { value: '1M+', label: 'users supported' },
      { value: '76', label: 'universities' },
      { value: '4', label: 'zones — North, East, West, South' },
      { value: 'ACE', label: 'Award for Kubernetes infrastructure excellence' },
    ],
    featured: true,
    blueprint: 'lms',
    palette: jade,
    motif: 'tenants',
  },
  {
    id: 'siemens-vsoc',
    title: 'Automotive vSoC Cloud',
    client: 'Siemens · CES 2026',
    genre: 'Automotive • ARM • Cloud',
    logline: 'An AWS simulation platform on ARM Graviton4 and GPU nodes for Siemens’ CES 2026 automotive demonstrations.',
    stack: ['AWS', 'ARM Graviton4', 'GPU nodes', 'EKS', 'CodePipeline', 'Amazon ECR', 'Trivy', 'VPC PrivateLink', 'CARLA', 'ROS2'],
    build: [
      'Architected an AWS-based vSoC simulation platform — ARM Graviton4 EC2 (Prod / QA / Dev) plus GPU nodes for CARLA / ROS2 simulation workloads.',
      'Multi-stage CodePipeline with ARM cross-compilation, Amazon ECR, Trivy CVE scanning and deployment to EKS.',
      'VPC PrivateLink isolation, KMS encryption, IAM least-privilege and CloudWatch + X-Ray observability — 70% provisioning-time reduction versus on-prem.',
    ],
    features: ['ARM Graviton4 + GPU fleet', 'ARM cross-compilation pipeline', 'CVE scanning before deploy', 'Private networking end to end', 'Cloud-embedded convergence validation'],
    metrics: [
      { value: '70%', label: 'faster provisioning vs on-prem' },
      { value: '3', label: 'environments — Prod, QA, Dev' },
      { value: 'CES', label: '2026 international demonstrations' },
    ],
    featured: true,
    blueprint: 'automotive',
    palette: amber,
    motif: 'road',
  },
  {
    id: 'visionext-edge',
    title: 'ARM Edge AI Surveillance',
    client: 'Visionext',
    genre: 'Edge AI • IoT • Computer Vision',
    logline: 'Real-time analytics from ARM edge devices to the cloud — MQTT image pipelines with SageMaker inference.',
    stack: ['AWS IoT Core', 'IoT Greengrass', 'Lambda', 'S3', 'SageMaker', 'MQTT', 'MongoDB'],
    build: [
      'Designed an ARM edge AI pipeline integrating AWS IoT Core, Greengrass, Lambda, S3 and SageMaker for real-time analytics.',
      'Implemented an MQTT image pipeline with SageMaker inference and MongoDB for real-time processing.',
      'Recognized with the Star Performer of the Year and Cloud Architecture Leadership awards (2024).',
    ],
    features: ['Edge-to-cloud MQTT pipeline', 'Greengrass local runtime', 'SageMaker inference', 'Real-time analytics'],
    metrics: [
      { value: '2', label: 'awards in 2024' },
      { value: 'Edge → Cloud', label: 'real-time inference pipeline' },
    ],
    featured: true,
    blueprint: 'edgeai',
    palette: ember,
    motif: 'edge',
  },
  {
    id: 'drdo-devsecops',
    title: 'Air-Gapped DevSecOps',
    client: 'DRDO',
    genre: 'Defense • DevSecOps',
    logline: 'A secure software factory for air-gapped defense infrastructure — no internet, full governance.',
    stack: ['Tuleap', 'Jenkins', 'Gitea', 'SonarQube', 'Nexus', 'LDAP', 'Ansible'],
    build: [
      'Designed a secure DevSecOps stack using Tuleap, Jenkins, Gitea, SonarQube and Nexus in air-gapped defense infrastructure.',
      'Automated ARM GNU 64 cross-compilation pipelines with RBAC and LDAP-based governance controls.',
    ],
    features: ['Fully air-gapped toolchain', 'ARM64 cross-compilation', 'Quality gates with SonarQube', 'RBAC + LDAP governance'],
    metrics: [
      { value: '0', label: 'internet dependencies — fully air-gapped' },
      { value: '5', label: 'integrated tools in the software factory' },
    ],
    featured: true,
    blueprint: 'devsecops',
    palette: crimson,
    motif: 'shield',
  },
  {
    id: 'gcp-doc-intel',
    title: 'Document Intelligence Agent',
    client: 'Google Cloud · POC',
    genre: 'GenAI • RAG • Multi-Agent',
    logline: 'A self-updating RAG and multi-agent system on Google Cloud — drop a scanned PDF in a bucket and it is OCR’d, embedded, indexed and answerable within minutes.',
    stack: ['Vertex AI Gemini', 'Vertex AI Vector Search', 'Document AI', 'Cloud Functions', 'Eventarc', 'Cloud Run', 'Firestore', 'Cloud Storage', 'Python', 'Streamlit'],
    build: [
      'Event-driven ingestion: uploads to Cloud Storage trigger a 2nd-gen Cloud Function via Eventarc — Document AI OCR (with PDF splitting to stay within sync page limits), chunking, Gemini embeddings and streaming upserts to Vertex AI Vector Search.',
      'Three-agent answer pipeline with Gemini function calling: a Cache Agent (Firestore-backed, persists across sessions), a Search Agent over Vector Search, and a Fallback Agent that answers from general knowledge — clearly labelled — when the documents don’t cover the question.',
      'Two-stage answer confidence: a deterministic “no information” check plus a Gemini judge, so weak or generic retrieval falls through to the Fallback Agent instead of passing as grounded.',
      'Observability built in — every answer reports which agent responded and a per-stage latency breakdown (cache, planner, retrieval, generation, confidence check), with temperature 0.2 for consistent, source-grounded output.',
    ],
    features: ['Continuous auto-ingestion', 'Scanned-PDF OCR at book scale', 'Cache → Search → Fallback agents', 'Source-cited answers', 'Two-stage confidence routing', 'Per-stage latency telemetry'],
    metrics: [
      { value: '1,433', label: 'scanned pages ingested from two books' },
      { value: '548', label: 'chunks embedded & indexed' },
      { value: '3', label: 'cooperating agents' },
      { value: '5', label: 'latency stages tracked per answer' },
    ],
    featured: true,
    palette: ocean,
    motif: 'nodes',
  },
  {
    id: 'langgraph-finops',
    title: 'FinOps Cost Investigator',
    client: 'LangGraph · POC',
    genre: 'Agentic AI • FinOps',
    logline: 'A LangGraph multi-agent proof of concept where specialised agents work together to investigate cloud-cost questions.',
    stack: ['LangGraph', 'LangChain', 'Python', 'Multi-agent'],
    build: ['Built a multi-agent FinOps cost-investigator proof of concept on LangGraph — specialised agents orchestrated as a graph to investigate cloud-cost questions.'],
    features: ['Graph-orchestrated agents', 'Cloud-cost investigation'],
    metrics: [],
    palette: amber,
    motif: 'mesh',
  },
  {
    id: 'arm-css',
    title: 'ARM CSS ADAS Simulation',
    client: 'Siemens · CES 2026',
    genre: 'Automotive • Simulation',
    logline: 'ADAS simulation workloads migrated to ARM CSS — firmware and cloud-scale simulation on the same architecture family.',
    stack: ['ARM CSS', 'CARLA', 'ROS2', 'SageMaker'],
    build: [
      'Led migration of ADAS simulation workloads to ARM CSS architecture for Siemens CES 2026.',
      'Built a distributed CARLA + ROS2 simulation pipeline with SageMaker for sensor-fusion model training and inference — enabling real-time closed-loop testing of autonomous-driving stacks at scale.',
    ],
    features: ['Embedded-cloud convergence', 'Distributed CARLA + ROS2', 'Sensor-fusion training'],
    metrics: [],
    blueprint: 'automotive',
    palette: amber,
    motif: 'chip',
  },
  {
    id: 'agri-edge',
    title: 'Hybrid Edge AI Agriculture',
    client: 'AI Summit 2026',
    genre: 'Edge AI • AgriTech',
    logline: 'Crop-vs-weed detection on a deterministic MPU + MCU edge architecture — demonstrated to the Union Minister at AI Summit 2026.',
    stack: ['TensorFlow Lite', 'MPU + MCU', 'MQTT', 'Arduino', 'Qualcomm'],
    build: [
      'Engineered an MPU + MCU deterministic Edge AI architecture using TensorFlow Lite for crop vs weed detection.',
      'Implemented real-time actuation with MQTT telemetry benchmarking inference latency.',
    ],
    features: ['On-device inference', 'Deterministic actuation', 'Latency telemetry'],
    metrics: [],
    blueprint: 'edgeai',
    palette: jade,
    motif: 'chip',
  },
  {
    id: 'intelligence-mesh',
    title: 'Distributed Intelligence Mesh',
    client: 'AI Summit · Speaker',
    genre: 'Edge • Orchestration',
    logline: 'Heterogeneous workload orchestration across single-board computers and MPU + MCU systems, with live failover.',
    stack: ['Workload orchestration', 'SBC', 'Micro cluster'],
    build: ['Presented heterogeneous workload orchestration comparing single SBC and MPU + MCU architectures, with a live failover micro cluster and deterministic workload isolation.'],
    features: ['Live failover micro cluster', 'Deterministic workload isolation'],
    metrics: [],
    palette: violet,
    motif: 'mesh',
  },
  {
    id: 'edge-cloud-showcase',
    title: 'Edge Cloud Showcase',
    client: 'Embedded World 2025',
    genre: 'Edge • IoT',
    logline: 'Distributed edge intelligence on AWS IoT Greengrass and Lambda, demonstrated in Nuremberg, Germany.',
    stack: ['IoT Greengrass', 'Lambda', 'Edge intelligence'],
    build: ['Demonstrated an AWS IoT Greengrass and Lambda-based distributed edge intelligence platform at the international exhibition in Nuremberg, Germany.'],
    features: ['International exhibition demo', 'Edge-cloud convergence'],
    metrics: [],
    palette: ocean,
    motif: 'edge',
  },
  {
    id: 'aws-dr',
    title: 'AWS DR Framework',
    client: 'Enterprise',
    genre: 'Cloud • Resilience',
    logline: 'Disaster recovery for business continuity — snapshots, backups and automated failover.',
    stack: ['EC2 Snapshots', 'S3 Backup', 'Automated failover'],
    build: ['Designed an AWS disaster recovery architecture leveraging EC2 snapshots, S3 backup storage and automated failover strategies for enterprise business continuity.'],
    features: ['Automated failover', 'Backup to S3'],
    metrics: [],
    blueprint: 'aws',
    palette: ocean,
    motif: 'cloud',
  },
  {
    id: 'o365-azure',
    title: 'O365 & Azure Migration',
    client: 'Enterprise',
    genre: 'Cloud • Identity',
    logline: 'Exchange, file servers and Active Directory moved to Office 365 and Azure.',
    stack: ['Office 365', 'Azure AD', 'Identity'],
    build: ['Migrated Exchange, file server and Active Directory to Office 365 and Azure, modernizing identity architecture for enterprise workforce continuity.'],
    features: ['Identity modernization', 'Workforce continuity'],
    metrics: [],
    palette: violet,
    motif: 'cloud',
  },
  {
    id: 'tata-sky',
    title: 'Self-Help Portal',
    client: 'Tata Sky',
    genre: 'Containers • CI/CD',
    logline: 'Production deployment and Docker-based CI/CD for a high-traffic customer portal.',
    stack: ['Docker', 'CI/CD', 'Production'],
    build: ['Led production deployment for the Tata Sky Self-Help Portal and implemented Docker-based CI/CD automation improving deployment reliability and release speed.'],
    features: ['Containerized releases', 'Faster, safer deployments'],
    metrics: [],
    palette: ember,
    motif: 'flow',
  },
  {
    id: 'uksc-lms',
    title: 'Cloud-Native LMS',
    client: 'UKSC',
    genre: 'Kubernetes • Pipelines',
    logline: 'A Kubernetes-based LMS with automated DEV → UAT → PROD pipelines.',
    stack: ['Kubernetes', 'DEV / UAT / PROD', 'Pipelines'],
    build: ['Deployed a Kubernetes-based LMS platform with automated DEV-UAT-PROD pipelines, improving release stability and reducing manual deployment overhead.'],
    features: ['Three-stage promotion', 'Less manual deployment'],
    metrics: [],
    blueprint: 'k8s',
    palette: jade,
    motif: 'flow',
  },
];

/** THE CAST — signature tech stack, drawn as layers from models down to the edge. */
export type StackLayer = { id: string; layer: string; role: string; tools: string[]; palette: Palette };

export const techStack: StackLayer[] = [
  { id: 'models', layer: 'Models & GenAI', role: 'The reasoning layer', tools: ['Amazon Bedrock · Claude · Titan', 'Azure OpenAI', 'Vertex AI · Gemini', 'SageMaker', 'TensorFlow Lite'], palette: crimson },
  { id: 'agents', layer: 'Agents & Orchestration', role: 'How the agents think and coordinate', tools: ['LangGraph', 'LangChain', 'Gemini function calling', 'Bedrock Agents · ReAct', 'Step Functions', 'Human-in-loop queues'], palette: violet },
  { id: 'retrieval', layer: 'Retrieval & Knowledge', role: 'Grounding answers in real data', tools: ['OpenSearch hybrid (BM25 + k-NN)', 'Vertex AI Vector Search', 'Pinecone', 'FAISS', 'Amazon Textract', 'Document AI'], palette: ocean },
  { id: 'data', layer: 'Data Platform', role: 'Lakehouse, streams and stores', tools: ['S3 medallion lakehouse', 'AWS Glue · PySpark', 'Airflow / MWAA', 'Kafka · Kinesis', 'Redshift · Athena', 'BigQuery', 'PostgreSQL', 'Firestore · DynamoDB'], palette: amber },
  { id: 'cloud', layer: 'Cloud & Platform', role: 'Where it all runs', tools: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes · EKS', 'Docker · Helm', 'Terraform', 'Cloud Run · Lambda', 'Nutanix HCI'], palette: jade },
  { id: 'devsecops', layer: 'DevSecOps & Observability', role: 'Shipping safely, seeing everything', tools: ['Jenkins', 'SonarQube · Trivy', 'Gitea · Nexus', 'Keycloak · Azure AD', 'Prometheus · Grafana', 'CloudWatch · X-Ray'], palette: ember },
  { id: 'edge', layer: 'Edge & Embedded', role: 'Intelligence at the device', tools: ['ARM · Graviton', 'AWS IoT Core · Greengrass', 'MQTT', 'CARLA · ROS2', 'Raspberry Pi · NXP i.MX'], palette: crimson },
  { id: 'code', layer: 'Languages & UI', role: 'Hands on the keyboard', tools: ['Python', 'Streamlit', 'React', 'SQL', 'Bash'], palette: violet },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

export type Achievement = { id: string; title: string; org: string; detail: string; laurel: string; year: string; link?: string };

export const achievements: Achievement[] = [
  {
    id: 'speaker',
    title: 'Edge AI & Distributed Systems Speaker',
    org: 'AI Summit & Embedded World',
    detail: 'Demonstrated hybrid deterministic edge platforms to international audiences in Nuremberg and on AI Summit stages.',
    laurel: 'Speaker',
    year: '2025',
  },
  {
    id: 'star-performer',
    title: 'Star Performer of the Year',
    org: 'Visionext / Judge India Solutions',
    detail: 'For major contribution to the Visionext project and delivery excellence in high-impact AWS edge-cloud infrastructure.',
    laurel: 'Star Performer',
    year: '2024',
  },
  {
    id: 'cloud-leadership',
    title: 'Cloud Architecture Leadership Award',
    org: 'Visionext',
    detail: 'For architecting scalable AWS edge-cloud infrastructure on the Visionext platform.',
    laurel: 'Leadership',
    year: '2024',
  },
  {
    id: 'ace',
    title: 'Kubernetes Infrastructure Excellence — ACE Award',
    org: 'ICAR',
    detail: 'For strong contribution to platform and infrastructure success supporting 76 universities nationwide.',
    laurel: 'ACE Award',
    year: '2023',
  },
  {
    id: 'dell',
    title: 'Enterprise Support Excellence',
    org: 'Dell Perot Systems',
    detail: 'For consistently accelerating SLA resolution and improving operational efficiency in global enterprise support.',
    laurel: 'Excellence',
    year: '2012',
  },
];

export const leadership = [
  'Speaker & demonstrator at Embedded World 2025, Nuremberg, Germany.',
  'Speaker at AI Summit — presented the Distributed Intelligence Mesh and hybrid edge architectures.',
  'Edge AI demo to Hon’ble Union Minister Shri Ashwini Vaishnaw at AI Summit 2026.',
  'Edge AI research on ARM platforms, TensorFlow Lite and MPU + MCU deterministic systems.',
  'Technology evangelism across DevOps, edge computing and cloud-native architectures.',
];

export type NewsItem = {
  id: string;
  event: string;
  title: string;
  detail: string;
  by: string;
  tags: string;
  link: string;
  image?: string;
  palette: Palette;
};

export const news: NewsItem[] = [
  {
    id: 'ai-summit-minister',
    event: 'AI Summit 2026',
    title: 'Edge AI demo to the Union Minister',
    detail: 'Showcased how embedded intelligence powers smart agriculture — Edge AI on Arduino + Qualcomm hardware, demonstrated to Hon’ble Union Minister Shri Ashwini Vaishnaw.',
    by: 'Prashant Yadav',
    tags: '#EdgeAI · #EmbeddedAI · #AIoT · #PrecisionAgriculture',
    link: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7432359053441454081',
    palette: jade,
  },
  {
    id: 'ai-summit-judge',
    event: 'AI Summit 2026',
    title: 'Judge India Solutions showcase',
    detail: 'Edge-cloud convergence and embedded AI innovation demonstrated to industry leaders and government officials.',
    by: 'Judge India Solutions',
    tags: '#AISummit2026 · #EdgeAI · #DeepTech',
    link: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7430628431408627712',
    palette: violet,
  },
  {
    id: 'ew-nuremberg',
    event: 'Embedded World 2025',
    title: 'Nuremberg showcase',
    detail: 'Edge-cloud innovation and ARM-based AI demos on a global stage in Nuremberg, Germany.',
    by: 'Nitish Kumar',
    tags: '#EmbeddedWorld2025 · #EdgeAI · #IoT',
    link: 'https://www.linkedin.com/posts/ni30chauhan_embeddedworld2025-judgeindiasolutions-thejudgegroup-ugcPost-7305693379147747329-2Uvl',
    image: '/assets/ew02.webp',
    palette: amber,
  },
  {
    id: 'ew-official',
    event: 'Embedded World 2025',
    title: 'Edge–cloud convergence at scale',
    detail: 'Official exhibition coverage of Judge India Solutions at Embedded World 2025 — international engineering visibility for edge-cloud convergence.',
    by: 'Judge India Solutions',
    tags: '#EmbeddedWorld2025 · #EdgeCloud',
    link: 'https://www.linkedin.com/posts/judge-india-solutions_embeddedworld2025-judgeindiasolutions-thejudgegroup-ugcPost-7305598140559060993-UhsU',
    image: '/assets/ew01.webp',
    palette: ocean,
  },
];

export type Skill = { name: string; mono?: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

const s = (...names: string[]): Skill[] => names.map((name) => ({ name }));

export const skillCategories: SkillCategory[] = [
  {
    id: 'architecture',
    title: 'Architecture',
    subtitle: 'Solution, data & enterprise',
    skills: s('Solution Architecture', 'Data Architecture', 'Enterprise Architecture', 'Cloud Architecture', 'Architecture Governance', 'RFP Solution Design'),
  },
  {
    id: 'ai',
    title: 'Agentic AI',
    subtitle: 'GenAI, RAG & guardrails',
    skills: [
      { name: 'Multi-Agent Orchestration', mono: 'Ma', note: 'Core' },
      ...s('LangGraph', 'LangChain', 'Function Calling', 'RAG Pipelines', 'AWS Bedrock', 'Azure OpenAI', 'Vertex AI · Gemini', 'SageMaker', 'Vector Databases', 'OpenSearch · Pinecone · FAISS', 'Vertex AI Vector Search', 'Prompt Engineering', 'LLM Evaluation', 'Hallucination Mitigation', 'AI Guardrails', 'Model Versioning & Drift'),
    ],
  },
  {
    id: 'data',
    title: 'Data Platform',
    subtitle: 'Lakehouse & streaming',
    skills: s('Data Lakehouse', 'AWS Glue · ETL', 'Airflow / MWAA', 'Apache NiFi', 'Redshift · Athena', 'Kafka · Kinesis', 'Apache Spark', 'Data Lineage & Catalog', 'Schema Evolution', 'Data Governance', 'PII Masking · RBAC'),
  },
  {
    id: 'cloud',
    title: 'Cloud & Platform',
    subtitle: 'AWS, Kubernetes & IaC',
    skills: [
      { name: 'Kubernetes / EKS', mono: 'K8', note: 'Core' },
      ...s('AWS (EC2, VPC, IAM)', 'Google Cloud', 'Cloud Run · Cloud Functions', 'Lambda · S3 · Route53', 'CloudWatch · API GW · KMS', 'Hybrid Cloud', 'Helm', 'Multi-Tenant Platforms', 'Terraform / IaC', 'Docker', 'Nutanix HCI', 'Disaster Recovery', 'Cloud Cost Optimization'),
    ],
  },
  {
    id: 'devsecops',
    title: 'DevSecOps',
    subtitle: 'Pipelines & identity',
    skills: s('CI/CD Pipelines', 'Jenkins · SonarQube · Trivy', 'Nexus · Gitea · Tuleap', 'Air-Gapped Platforms', 'Azure AD · Keycloak SSO'),
  },
  {
    id: 'edge',
    title: 'Edge AI',
    subtitle: 'Embedded & simulation',
    skills: s('Edge AI', 'ARM Virtualization', 'IoT Core · Greengrass', 'TensorFlow Lite', 'Computer Vision', 'Digital Twin', 'CARLA Simulation'),
  },
  {
    id: 'ops',
    title: 'Data & Observability',
    subtitle: 'Stores, messaging & monitoring',
    skills: s('PostgreSQL', 'MongoDB', 'Redis', 'MQTT', 'Prometheus · Grafana', 'ELK / OpenSearch', 'Azure / O365'),
  },
  {
    id: 'leadership',
    title: 'Leadership',
    subtitle: 'People, business & strategy',
    skills: s('Strategic Thinking', 'Public Speaking', 'Stakeholder Communication', 'Vendor Management', 'Budget Reporting', 'POC Development', 'IT Governance', 'Technology Strategy', 'Python (Automation)', 'React.js', 'ChatGPT · Claude · Copilot'),
  },
];

/** Where each skill shows up — revealed on hover / tap. */
export const skillEvidence: Record<string, string[]> = {
  'Multi-Agent Orchestration': ['Agentic AI platforms on Bedrock & Azure OpenAI', 'Agents for BHP internal tools'],
  'RAG Pipelines': ['HR Policy RAG Assistant', 'Data Bridge Platform', 'LMS AI Platform', 'Document Intelligence Agent'],
  LangGraph: ['FinOps Cost Investigator POC'],
  'Function Calling': ['Document Intelligence Agent — Fallback Agent'],
  'Vertex AI · Gemini': ['Document Intelligence Agent'],
  'Vertex AI Vector Search': ['Document Intelligence Agent'],
  'Google Cloud': ['Document Intelligence Agent'],
  'Cloud Run · Cloud Functions': ['Event-driven ingestion — Document Intelligence Agent'],
  'AWS Bedrock': ['HR Policy RAG Assistant', 'Data Bridge Platform', 'LMS AI Platform'],
  'AI Guardrails': ['Bedrock Guardrails — prompt injection & PII'],
  'Hallucination Mitigation': ['<5% hallucination target — HR Policy RAG'],
  'Data Lakehouse': ['Data Bridge Platform — S3 Bronze / Silver / Gold'],
  'AWS Glue · ETL': ['Data Bridge Platform'],
  'Kubernetes / EKS': ['National Multi-Tenant LMS — 1M+ users', 'Siemens vSoC Cloud', 'ACE Award 2023'],
  'Multi-Tenant Platforms': ['76 universities on one platform'],
  'Nutanix HCI': ['National Multi-Tenant LMS'],
  'Disaster Recovery': ['AWS DR Framework'],
  'Air-Gapped Platforms': ['DRDO Air-Gapped DevSecOps'],
  'Jenkins · SonarQube · Trivy': ['National LMS CI/CD', 'Siemens vSoC pipeline'],
  'Nexus · Gitea · Tuleap': ['DRDO Air-Gapped DevSecOps'],
  'Edge AI': ['Visionext Edge AI', 'Hybrid Edge AI Agriculture', 'Embedded World 2025'],
  'IoT Core · Greengrass': ['Visionext Edge AI', 'Edge Cloud Showcase'],
  'TensorFlow Lite': ['Hybrid Edge AI Agriculture'],
  'CARLA Simulation': ['Siemens vSoC Cloud', 'ARM CSS ADAS Simulation'],
  'Digital Twin': ['Automotive & defense simulation platforms'],
  'Azure / O365': ['O365 & Azure Migration'],
  'Public Speaking': ['Embedded World 2025', 'AI Summit 2026'],
  Docker: ['Tata Sky Self-Help Portal'],
};

export type Episode = { code: string; title: string; description: string; tags: string[]; runtime: string; palette: Palette };
export type Season = { number: number; title: string; period: string; synopsis: string; episodes: Episode[] };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Groundwork',
    period: '2002 – 2010',
    synopsis: 'An IT degree, then straight into enterprise support — banking, endpoints and the discipline of SLAs.',
    episodes: [
      { code: 'S01 E01', title: 'The Engineer', description: 'B.Tech in Information Technology at IEC CET, Greater Noida (Dr. A.P.J. Abdul Kalam Technical University).', tags: ['B.Tech', 'IT'], runtime: '2002 – 2006', palette: amber },
      { code: 'S01 E02', title: 'First Login', description: 'Sr. Technical Support Analyst at IGATE — supporting Royal Bank of Canada users and administering McAfee endpoint security.', tags: ['IGATE', 'Banking', 'Security'], runtime: 'Feb – Jul 2009', palette: ocean },
      { code: 'S01 E03', title: 'The Lead', description: 'L2 Technician at Cyfuture — supervising 10+ L1 resources across two locations and designing training modules.', tags: ['Cyfuture', 'Team lead'], runtime: 'Aug 2009 – May 2010', palette: violet },
    ],
  },
  {
    number: 2,
    title: 'Global Support',
    period: '2010 – 2012',
    synopsis: 'Dell Perot Systems — global enterprise support, BMC Remedy and moving US hardware support operations to India.',
    episodes: [
      { code: 'S02 E01', title: 'The Transition', description: 'Led the transition of US hardware support operations to India and a knowledge-base migration.', tags: ['Dell Perot Systems', 'BMC Remedy'], runtime: 'Jun 2010 – Aug 2012', palette: crimson },
      { code: 'S02 E02', title: 'The Recognition', description: 'Enterprise Support Excellence award for accelerating SLA resolution in global enterprise support.', tags: ['Award', '2012'], runtime: '2012', palette: amber },
    ],
  },
  {
    number: 3,
    title: 'The Founder Arc',
    period: '2012 – 2016',
    synopsis: 'Director at Geetarsh Solutions — building BPO and IT infrastructure from the ground up for 4+ organizations.',
    episodes: [
      { code: 'S03 E01', title: 'The Builder', description: 'End-to-end BPO setups — dialers, VOIP, networking hardware and CRM integrations for 4+ organizations.', tags: ['BPO', 'VOIP', 'Networking'], runtime: 'Aug 2012 – Oct 2016', palette: jade },
      { code: 'S03 E02', title: 'The Director', description: 'Working Director of 15–20 member technical teams — procurement, budgets and structured IT workflows.', tags: ['Leadership', 'Budgets'], runtime: 'Geetarsh Solutions', palette: ember },
    ],
  },
  {
    number: 4,
    title: 'The Infrastructure Era',
    period: '2016 – 2022',
    synopsis: 'Employee #002 at Judge India Solutions — running enterprise IT, then leading the move to the cloud.',
    episodes: [
      { code: 'S04 E01', title: 'The Operator', description: 'Assistant Manager IT — networking, firewalls and deployments for 200+ employees across multiple offices.', tags: ['Enterprise IT', 'Security'], runtime: 'Aug 2016 – Oct 2019', palette: ocean },
      { code: 'S04 E02', title: 'The Migration', description: 'Deputy Manager IT — Exchange to Office 365, on-prem servers to Azure, and zero-downtime BCP through the pandemic.', tags: ['Azure', 'O365', 'BCP'], runtime: 'Sep 2019 – Jun 2022', palette: violet },
      { code: 'S04 E03', title: 'The Analyst', description: 'PGE MBA in Business Analytics from IMT-CDL Ghaziabad.', tags: ['MBA', 'Analytics'], runtime: '2021 – 2022', palette: amber },
    ],
  },
  {
    number: 5,
    title: 'The Architect',
    period: '2022 – 2025',
    synopsis: 'From design authority to Solutions Architect — Kubernetes at national scale, edge AI and international stages.',
    episodes: [
      { code: 'S05 E01', title: 'The Design Authority', description: 'Senior Technology Architect — HA on AWS, Docker CI/CD for Tata Sky, Keycloak SSO and KMS, ISO / CMMI delivery.', tags: ['AWS', 'Docker', 'IAM'], runtime: 'Jun 2022 – Sep 2023', palette: crimson },
      { code: 'S05 E02', title: 'One Million Users', description: 'Kubernetes on Nutanix HCI for 76 universities and 1M+ users — and the ACE Award for infrastructure excellence.', tags: ['Kubernetes', 'ICAR', 'ACE Award'], runtime: 'Oct 2023 →', palette: jade },
      { code: 'S05 E03', title: 'The Edge', description: 'Visionext ARM edge AI pipeline — Star Performer of the Year and the Cloud Architecture Leadership Award.', tags: ['Edge AI', 'IoT', '2 Awards'], runtime: '2024', palette: ember },
      { code: 'S05 E04', title: 'Nuremberg', description: 'Speaker and demonstrator at Embedded World 2025 in Germany.', tags: ['Embedded World', 'Speaker'], runtime: '2025', palette: ocean },
    ],
  },
  {
    number: 6,
    title: 'Data & Agentic AI',
    period: '2025 – 2026',
    synopsis: 'Senior Manager, Solutions Architect — lakehouses, multi-agent RAG, automotive simulation and defense DevSecOps.',
    episodes: [
      { code: 'S06 E01', title: 'The Lakehouse', description: 'Data Bridge Platform — 5+ systems unified into a governed S3 medallion lakehouse with RAG on top.', tags: ['Glue', 'Textract', 'Bedrock'], runtime: '2025 – 2026', palette: ocean },
      { code: 'S06 E02', title: 'The Agents', description: 'Multi-agent RAG platforms on Bedrock and Azure OpenAI with guardrails, eval harnesses and human-in-loop.', tags: ['Agentic AI', 'RAG', 'Governance'], runtime: '2025 – 2026', palette: violet },
      { code: 'S06 E03', title: 'CES 2026', description: 'Siemens vSoC cloud on ARM Graviton4 + GPU — 70% faster provisioning — and ARM CSS ADAS simulation.', tags: ['Siemens', 'ARM', 'CARLA'], runtime: '2025 – 2026', palette: amber },
      { code: 'S06 E04', title: 'The Minister', description: 'Edge AI for smart agriculture demonstrated to the Union Minister at AI Summit 2026.', tags: ['AI Summit', 'Edge AI'], runtime: '2026', palette: jade },
    ],
  },
  {
    number: 7,
    title: 'Now Streaming',
    period: '2026 –',
    synopsis: 'Chapter Lead for AI Development at BHP’s India Technical Centre.',
    episodes: [
      { code: 'S07 E01', title: 'The Chapter Lead', description: 'Building agentic AI agents for internal tools and integrating multi-agent AI into BHP’s enterprise operating platform.', tags: ['BHP', 'Agentic AI'], runtime: 'Aug 2026 – Present', palette: crimson },
      { code: 'S07 E02', title: 'The Operating Model', description: 'Owning delivery of the Technical Centre’s demand operating model and the AI tool global demand managers use to request resources.', tags: ['Delivery', 'Product'], runtime: 'In production', palette: violet },
      { code: 'S07 E03', title: 'The Agent Builder', description: 'Hands-on agent frameworks — a Google Cloud Document Intelligence Agent (Vertex AI, Document AI, Vector Search) and a LangGraph multi-agent FinOps POC.', tags: ['Google Cloud', 'LangGraph', 'Gemini'], runtime: '2026', palette: ocean },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Users served', title: '1M+', detail: 'Kubernetes LMS · 76 universities', palette: jade },
  { label: 'In the industry', title: `${yearsExp}+ Years`, detail: 'Since February 2009', palette: amber },
  { label: 'Biggest stage', title: 'Embedded World', detail: 'Speaker · Nuremberg, 2025', palette: ocean },
  { label: 'Demo to the Minister', title: 'AI Summit 2026', detail: 'Edge AI for smart agriculture', palette: crimson },
  { label: 'Provisioning time', title: '−70%', detail: 'Siemens vSoC cloud platform', palette: amber },
  { label: 'Hallucination target', title: '<5%', detail: 'HR Policy RAG on Bedrock', palette: violet },
  { label: 'Star Performer', title: '2024', detail: 'Visionext · Judge India Solutions', palette: ember },
  { label: 'Architectures delivered', title: '15+', detail: 'Lakehouse · Agentic AI · K8s · Edge', palette: ocean },
  { label: 'Indian languages', title: '8', detail: 'Neural TTS in the LMS AI layer', palette: jade },
  { label: 'Now playing', title: 'Chapter Lead', detail: 'AI Development · BHP', palette: crimson },
];

/** Slides for the "▶ Play Intro" highlight reel. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  { kicker: 'The pilot', title: `${yearsExp}+ years`, lines: ['From L2 support in 2009 to Senior Solutions Architect', `${experience.length} roles across ${orgCount} organizations`] },
  { kicker: 'The builder', title: 'Founder arc', lines: ['Director at Geetarsh Solutions', 'BPO & IT infrastructure for 4+ organizations', '15–20 member technical teams'] },
  { kicker: 'Scale', title: 'One million users', lines: ['Kubernetes on Nutanix HCI', '76 universities · 4 zones · per-tenant domains'], chips: ['Kubernetes', 'Keycloak', 'Jenkins', 'Prometheus'] },
  { kicker: 'Data & AI', title: 'Grounded answers', lines: ['Governed S3 lakehouses with Glue, DMS & Textract', 'Multi-agent RAG on Bedrock & Azure OpenAI', '<5% hallucination target · citations per claim'], chips: ['Bedrock', 'OpenSearch', 'Glue', 'Azure OpenAI'] },
  { kicker: 'On stage', title: 'Nuremberg → New Delhi', lines: ['Speaker · Embedded World 2025', 'Edge AI demo to the Union Minister · AI Summit 2026'] },
  { kicker: 'Awards', title: 'Recognized', lines: ['Star Performer of the Year · 2024', 'Cloud Architecture Leadership · 2024', 'Kubernetes Excellence ACE Award · 2023'] },
  { kicker: 'Now streaming', title: 'Chapter Lead', lines: ['AI Development · BHP India Technical Centre', 'Agentic AI for enterprise tools'] },
];

// --- Blueprints (architecture diagrams), interview field guide and "how it works" flows ---

export type Blueprint = {
  id: string;
  label: string;
  group: string;
  badges: string[];
  legend: { color: string; label: string }[];
  tips: number;
};
export const blueprints = legacy.blueprints as Blueprint[];

export type QA = { q: string; a: string };
export type GuideCategory = { category: string; title: string; items: QA[] };
export const interviewGuide: GuideCategory[] = (legacy.interview as GuideCategory[]).map((c) => ({
  ...c,
  items: c.items.filter((it, i, all) => all.findIndex((o) => o.q === it.q) === i),
}));

export type FlowStep = { title: string; desc: string; tech: string };
export type Flow = { title: string; sub: string; steps: FlowStep[]; takeaway: string };
export const flows = legacy.flows as Flow[];

export const libraries = [
  {
    title: 'AI & GenAI Architecture Library',
    meta: 'Data Fusion · RAG · Agentic AI · Bedrock · Guardrails · 50+ Q&A',
    href: '/library/Prashant_Enterprise_AI_Architecture_Interview_Library.md',
  },
  {
    title: 'Kubernetes & Cloud Architecture Library',
    meta: 'K8s HA · Ingress · Cloud · Solution Architecture · Scenarios · 100+ Q&A',
    href: '/library/Prashant_Kubernetes_Cloud_Solution_Architecture_Interview_Library.md',
  },
];

// --- Viewer profiles & section metadata ---

export type ProfileId = 'prashant' | 'recruiter' | 'engineer' | 'explorer';
export type SectionId = 'about' | 'journey' | 'originals' | 'blueprints' | 'picks' | 'stack' | 'skills' | 'moments' | 'news' | 'guide' | 'story';

export const viewerProfiles: { id: ProfileId; name: string; blurb: string; color: string; order: SectionId[] }[] = [
  {
    id: 'prashant',
    name: 'Prashant',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'blueprints', 'stack', 'picks', 'skills', 'moments', 'news', 'guide', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, awards & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'stack', 'skills', 'originals', 'about', 'journey', 'news', 'blueprints', 'picks', 'guide'],
  },
  {
    id: 'engineer',
    name: 'Engineer',
    blurb: 'Architectures & projects first',
    color: '#46e3a8',
    order: ['stack', 'blueprints', 'originals', 'skills', 'guide', 'journey', 'moments', 'about', 'picks', 'news', 'story'],
  },
  {
    id: 'explorer',
    name: 'Explorer',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'news', 'originals', 'moments', 'about', 'blueprints', 'stack', 'skills', 'guide', 'story'],
  },
];

const episodeCount = seasons.reduce((n, x) => n + x.episodes.length, 0);

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Philosophy & focus', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${episodeCount} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Productions • ${featuredProjects.length} Originals`, palette: crimson },
  blueprints: { nav: 'Blueprints', card: 'Architectures', meta: `${blueprints.length} Interactive diagrams`, palette: ocean },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 highlights', palette: jade },
  stack: { nav: 'Tech Stack', card: 'The Cast', meta: `${techStack.length} Layers • ${techStack.reduce((n, l) => n + l.tools.length, 0)} Technologies`, palette: violet },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Genres`, palette: ocean },
  moments: { nav: 'Awards', card: 'Awards', meta: `${achievements.length} Awards • Speaker`, palette: crimson },
  news: { nav: 'News', card: 'In the News', meta: `${news.length} Features • Embedded World & AI Summit`, palette: amber },
  guide: { nav: 'Field Guide', card: 'Field Guide', meta: `${interviewGuide.length} Q&A sets • 2 libraries`, palette: violet },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
