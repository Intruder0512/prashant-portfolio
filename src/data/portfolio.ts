/**
 * Central portfolio data for Prashant Yadav — Agentic AI Delivery Lead & Architect.
 * Source of truth: "Prashant Yadav — Solution Delivery and AI Lead" resume (Oct 2026),
 * plus details carried over from the previous prashantyadav.tech site.
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
  seriesTag: 'AGENTIC AI DELIVERY LEAD & ARCHITECT',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A YADAV ORIGINAL',
  role: 'Chapter Lead — AI Development & Delivery',
  shortRole: 'AI Development & Delivery Lead',
  tagline: ['AI Architecture', 'Agentic AI', 'Platform Engineering · DevSecOps · Multi-Cloud'],
  intro: `Senior technology leader with ${yearsExp} years across cloud infrastructure, platform engineering, DevSecOps, AI architecture and delivery — now building BHP India’s AI engineering chapter and owning delivery continuity for its key operating-model initiatives.`,
  longIntro:
    'Expertise in multi-cloud AI architecture (AWS, Azure and Google Cloud), agentic AI and RAG systems, MCP tool orchestration, Kubernetes platform engineering, DevSecOps and stakeholder management across global enterprise environments. International conference speaker, ISO 42001 certified, MBA in Business Analytics.',
  quote:
    'Modern enterprise platforms aren’t built in silos — application architecture, data architecture and AI orchestration only deliver real value when they’re connected and governed as one system.',
  location: 'Noida, India',
  email: 'connect@prashantyadav.tech',
  languages: 'English · Hindi',
  links: {
    linkedin: 'https://www.linkedin.com/in/prashant-yadav-a6120115/',
    github: 'https://github.com/Intruder0512' as string,
  },
  /** Resume PDF served from public/assets/. Leave empty to fall back to "Save as PDF" of the on-page resume. */
  resumePdf: '/assets/Prashant_Yadav_Resume.pdf' as string,
  resumeFileName: 'Prashant_Yadav_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Prashant Yadav',
  },
  /**
   * Cloudflare Web Analytics (free, cookie-free, no consent banner needed).
   * Paste the token from dash.cloudflare.com → Analytics & Logs → Web Analytics → Add a site
   * (choose "manual JS snippet" and copy the value of "token"). Leave empty to disable.
   */
  analytics: { cloudflareToken: '' as string },
  focus: ['Agentic AI & MCP', 'AI Architecture', 'Delivery Leadership', 'Platform Engineering', 'Multi-Cloud (AWS · Azure · GCP)', 'Edge AI'],
};

export const education = [
  {
    school: 'IMT-CDL Ghaziabad',
    place: 'India',
    degree: 'MBA — Business Analytics',
    short: 'MBA, Business Analytics',
    period: '2022',
  },
  {
    school: 'IEC CET (UPTU)',
    place: 'Greater Noida',
    degree: 'B.Tech — Information Technology',
    short: 'B.Tech, Information Technology',
    period: '2007',
  },
];

export type Role = { company: string; role: string; place: string; period: string; growth?: string; points: string[] };

export const experience: Role[] = [
  {
    company: 'BHP India Technical Centre (via TCS)',
    role: 'Chapter Lead — AI Development & Acting Delivery Lead',
    place: 'Gurugram',
    period: 'Aug 2026 – Present',
    points: [
      'Chapter Lead: building BHP India’s AI engineering chapter from the ground up — hiring, mentoring and developing AI engineers; setting engineering standards, coding practices, review governance and capability roadmaps.',
      'AI Architecture: driving design, development and deployment of GenAI, agentic AI, RAG and ML solutions across BTC squads; promoting GCP Vertex AI, AWS Bedrock and Azure OpenAI adoption across the centre.',
      'Delivery Leadership: took ownership of BTC India delivery continuity when the India Delivery Manager departed — single point of contact for delivery accountability across BTC’s key programmes.',
      'Vespa: leading stakeholder engagement for the operating-model initiative defining how BHP global demand managers raise resource requests, how BTC allocates engineers, and how delivered work is scoped, tracked and charged to business cost centres.',
      'Turmeric Tool Connect: managing the AI-powered interface demand managers use globally to access BTC capabilities; coordinating with global BHP stakeholders on delivery alignment and resource planning.',
      'Capability Planning: skills forecasting for the AI chapter 12–18 months ahead; converting bench capacity into capability investment through structured learning programmes and POCs.',
      'Agentic AI for internal tooling: designing internal AI agents that let engineering teams, demand managers and operations staff work with enterprise systems through task-driven AI interfaces.',
      'myBOS Coach: leading integration of the multi-agent AI system into myBOS Coach (BHP Operating System) — AI coaching, workflow automation and natural-language interfaces to drive BOS adoption across global operations.',
    ],
  },
  {
    company: 'Judge India Solutions Pvt. Ltd. (The Judge Group)',
    role: 'Senior Solutions Architect · Employee #002',
    place: 'Noida',
    period: 'Aug 2016 – Aug 2026',
    growth: 'System Administrator (2016–17) → Cloud Support Engineer (2017–18) → Solutions Architect (2018–20) → Senior Solutions Architect (2020–26)',
    points: [
      'Architected enterprise data fusion platforms on Azure (ADF, ADLS Gen2, Synapse, Document Intelligence, AI Search, OpenAI) unifying finance, staffing, payroll, timesheet and document data into governed intelligence layers.',
      'Designed agentic AI and RAG solutions on AWS Bedrock, Azure OpenAI and vector databases (Pinecone, FAISS); built multi-agent orchestration with ReAct reasoning loops, HITL gates, Step Functions governance and immutable audit trails.',
      'Built a Model Context Protocol (MCP) tool orchestration hub for dynamic capability discovery and multi-agent tool chaining — chain latency cut from 870 ms to 380 ms with parallel tool execution and session caching.',
      'Architected a multi-tenant Kubernetes platform on Nutanix HCI for the ICAR national LMS — 1M+ learners across 76 universities — including an AI content-generation layer (Bedrock, Polly, Transcribe, Translate, Rekognition).',
      'Led DevSecOps transformation at DRDO — an air-gapped ecosystem on Tuleap, Jenkins, Gitea, SonarQube and Nexus with RBAC, LDAP governance, ARM cross-compilation pipelines and audit logging.',
      'Delivered a CARLA-based automotive digital twin for Siemens CES — four-layer integration (simulation, middleware, embedded, HMI); 70% faster provisioning through Terraform IaC and Jenkins CI/CD.',
      'Designed Safelite L1 health-check automation — a six-layer detect-and-recover system with a 90-second full detection-to-recovery cycle across 8 systems.',
      'Built the Visionext ARM edge AI surveillance platform (AWS IoT Core, Greengrass, Lambda, SageMaker) — 28 ms on-device inference with EfficientDet-Lite on ARM.',
      'Led ISO 42001 AIMS certification — AI policy, data-quality assessments, VAPT, risk registers, HITL governance and BCP artefacts for enterprise AI systems.',
      'Architecture design authority across POCs, RFPs and enterprise implementations; drove cloud cost optimisation through rightsizing, caching and per-tenant cost attribution.',
    ],
  },
  {
    company: 'Multiple Organizations',
    role: 'Independent IT Consultant — Infrastructure & BPO Setup',
    place: 'Noida',
    period: 'Aug 2012 – Aug 2016',
    points: [
      'Delivered complete BPO infrastructure — dialers, VOIP systems and networking hardware — for multiple startups; directed backend technology operations as Working Director over 15–20 member technical teams.',
    ],
  },
  {
    company: 'Dell Perot Systems TSI India Pvt. Ltd.',
    role: 'Sr. Client Support Associate',
    place: 'Noida',
    period: 'Jun 2010 – Aug 2012',
    points: [
      'Enterprise IT asset and application support for Dell employees; BMC Remedy incident management with SLA-driven resolution; transitioned US hardware support operations to India.',
    ],
  },
  {
    company: 'Cyfuture India Pvt. Ltd. / iGATE Global Solutions',
    role: 'L2 Technician / Sr. Technical Support Analyst',
    place: 'Noida',
    period: 'Feb 2009 – May 2010',
    points: ['Supervised L1 resources for PPC and SEO technical sales; enterprise technical support for Royal Bank of Canada internal users.'],
  },
];

export const orgCount = 6;

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
    client: 'Azure · Enterprise Data Fusion',
    genre: 'Data Lakehouse • GenAI • RAG',
    logline: 'Fragmented finance, staffing, HR, payroll and contract data unified into one governed Azure intelligence layer — and made answerable in plain language.',
    stack: ['Azure Data Factory', 'ADLS Gen2', 'Document Intelligence', 'Azure Synapse', 'Microsoft Fabric', 'Azure AI Search', 'Azure OpenAI', 'Purview', 'Power BI', 'Entra ID', 'Key Vault', 'Azure Monitor', 'Azure DevOps'],
    build: [
      'Unified finance, staffing, HR, payroll, timesheets, CRM, invoices, purchase orders and contracts into a governed layer on ADLS Gen2 with Raw, Processed and Curated zones.',
      'Multi-source ingestion with Azure Data Factory — parameterised pipelines, watermark and CDC incremental loads and event-driven triggers; Azure Document Intelligence (pre-built and custom-trained models) for invoice, PO and contract OCR.',
      'ELT in Azure Synapse and Microsoft Fabric — entity resolution, master-data alignment, schema evolution and curated datasets: Resource Allocation, Billing Status, Invoice Matching, Project Margin and Payroll Reconciliation.',
      'Natural-language query intelligence with Azure AI Search (hybrid BM25 + vector + semantic ranking) and Azure OpenAI — citation-grounded, role-aware answers — plus internal Power BI finance dashboards on US staffing data — margins, placements, billing and utilisation.',
      'Enterprise security and governance: Entra ID, Managed Identities, Private Endpoints, RBAC, Key Vault, PII masking, Azure Monitor audit trails, and Purview cataloguing with end-to-end lineage.',
    ],
    features: ['Raw / Processed / Curated zones', 'CDC & watermark incremental loads', 'Document Intelligence OCR', 'Entity resolution & MDM', 'Hybrid + semantic retrieval', 'Purview lineage'],
    metrics: [
      { value: '9', label: 'business data domains unified' },
      { value: '5', label: 'curated business datasets' },
      { value: '3', label: 'governed lake zones' },
      { value: 'Hybrid', label: 'BM25 + vector + semantic ranking' },
    ],
    featured: true,
    blueprint: 'databridge-azure',
    palette: ocean,
    motif: 'layers',
  },
  {
    id: 'hr-policy-rag',
    title: 'HR Policy RAG Assistant',
    client: 'Azure GenAI',
    genre: 'GenAI • Enterprise RAG',
    logline: 'Employees ask about policies, leave, benefits and SOPs in plain language — and get cited, role-aware, hallucination-guarded answers.',
    stack: ['Azure OpenAI', 'Azure AI Search', 'Document Intelligence', 'Azure Functions', 'Blob Storage', 'Entra ID', 'Application Insights', 'Azure DevOps'],
    build: [
      'Two-pipeline architecture: ingestion (Blob Storage event triggers → Azure Functions → Document Intelligence OCR) and query (Entra ID auth → normalisation → embedding → hybrid retrieval → security trimming → grounded generation).',
      'Structure-aware chunking (300–500 tokens, 50–80 token overlap) on section boundaries, enriched with policy category, section, effective date, department and access classification; embeddings indexed in Azure AI Search with HNSW.',
      'Version retention for historical policy auditability, a 0.80 faithfulness gate, prompt-injection mitigation, low temperature (0.1–0.2) for compliance accuracy, and fallback responses when evidence is insufficient.',
    ],
    features: ['Security trimming at query time', 'Citation per answer', 'Faithfulness gate', 'Policy version history', 'Prompt-injection mitigation'],
    metrics: [
      { value: '0.91', label: 'faithfulness score' },
      { value: '85%', label: 'auto-resolution rate' },
      { value: '0.80', label: 'faithfulness gate before answering' },
      { value: '300–500', label: 'token structure-aware chunks' },
    ],
    featured: true,
    blueprint: 'hrrag-azure',
    palette: violet,
    motif: 'nodes',
  },
  {
    id: 'mcp-hub',
    title: 'MCP Tool Orchestration Hub',
    client: 'Enterprise · MCP',
    genre: 'Agentic AI • Tooling',
    logline: 'An MCP server that exposes AI capabilities as dynamically discoverable tools for multi-agent systems — and chains them fast.',
    stack: ['Python', 'FastAPI', 'MCP Protocol', 'AWS Bedrock', 'DynamoDB', 'Kubernetes'],
    build: [
      'Built a Model Context Protocol server exposing AI capabilities as dynamically discoverable tools across multi-agent systems.',
      'Cut 3-tool chain latency from 870 ms to 380 ms with parallel tool execution and session caching.',
      'Tenant isolation enforced on every tool call through JWT validation.',
    ],
    features: ['Dynamic capability discovery', 'Multi-agent tool chaining', 'Parallel tool execution', 'Session caching', 'Per-call JWT tenant isolation'],
    metrics: [
      { value: '870→380', label: 'ms for a 3-tool chain' },
      { value: '56%', label: 'lower chain latency' },
      { value: 'Per call', label: 'JWT tenant isolation' },
    ],
    featured: true,
    palette: ember,
    motif: 'mesh',
  },
  {
    id: 'lms-ai',
    title: 'LMS AI Platform',
    client: 'ICAR National LMS · AWS',
    genre: 'Agentic AI • Media AI',
    logline: 'An agentic AI enrichment layer for a national LMS serving 1M+ learners across 76 universities.',
    stack: ['AWS Bedrock', 'Amazon Textract', 'Amazon Polly', 'Transcribe', 'Translate', 'Rekognition', 'SageMaker', 'OpenSearch', 'Step Functions', 'Nutanix HCI'],
    build: [
      'AWS Bedrock agentic platform with a ReAct reasoning loop, HITL gates and Step Functions governance for structured, multi-step content generation.',
      'Amazon Textract extracts text and structure from course material so Bedrock can summarise chapters and generate learning content.',
      'Multilingual content pipeline with Amazon Polly, Transcribe, Translate and Rekognition across 6 regional Indian languages.',
      'Served from the multi-tenant Kubernetes platform on Nutanix HCI, with tenant isolation enforced at platform level and an AIMS / ISO 42001 audit trail.',
    ],
    features: ['ReAct agent loop', 'Chapter summarisation with Textract + Bedrock', 'Human-in-loop review gates', 'Neural TTS & captions', 'Pre-publication moderation', 'Tenant isolation'],
    metrics: [
      { value: '1M+', label: 'learners on the platform' },
      { value: '76', label: 'universities' },
      { value: '6', label: 'regional Indian languages' },
      { value: '40–60%', label: 'less content-authoring time' },
    ],
    featured: true,
    blueprint: 'lmsai',
    palette: crimson,
    motif: 'tenants',
  },
  {
    id: 'gcp-doc-intel',
    title: 'Document Intelligence Agent',
    client: 'Google Cloud · POC',
    genre: 'GenAI • RAG • Multi-Agent',
    logline: 'A self-updating RAG and multi-agent system on Google Cloud — drop a scanned PDF in a bucket and it is OCR’d, embedded, indexed and answerable within minutes.',
    stack: ['Vertex AI Vector Search', 'Gemini 2.5 Flash', 'Document AI', 'Cloud Functions', 'Eventarc', 'Cloud Run', 'Firestore', 'Pub/Sub', 'Cloud Storage', 'Python'],
    build: [
      'Cloud Storage ingestion → Document AI OCR (auto-split into ≤28-page batches) → Vertex AI embeddings (text-embedding-005, 768-dim) → Vector Search index (STREAM_UPDATE, cosine distance, Tree-AH).',
      'Gemini 2.5 Flash grounded generation with two-layer confidence filtering — a deterministic keyword scan plus an LLM judgement.',
      '3-agent orchestration: Cache Agent (Firestore persistent lookup) → Search Agent (vector retrieval + confidence check) → Fallback Agent (Gemini general knowledge, clearly labelled).',
      'Eventarc-triggered 2nd-gen Cloud Functions for automatic ingestion, with full per-stage latency instrumentation.',
    ],
    features: ['Continuous auto-ingestion', 'Scanned-PDF OCR at book scale', 'Cache → Search → Fallback agents', 'Two-layer confidence routing', 'Per-stage latency telemetry'],
    metrics: [
      { value: '1,433', label: 'scanned pages ingested' },
      { value: '548', label: 'chunks embedded & indexed' },
      { value: '768', label: 'dimension embeddings' },
      { value: '3', label: 'cooperating agents' },
    ],
    featured: true,
    github: 'https://github.com/Intruder0512/doc-intel-agent',
    palette: ocean,
    motif: 'nodes',
  },
  {
    id: 'siemens-digital-twin',
    title: 'CARLA Automotive Digital Twin',
    client: 'Siemens · CES',
    genre: 'Automotive • Simulation • IaC',
    logline: 'A four-layer automotive digital twin — simulation, middleware, embedded and HMI — presented at Embedded World Nuremberg 2025.',
    stack: ['CARLA', 'AGL', 'Android Automotive', 'Qt HMI', 'AWS EC2', 'Terraform', 'Jenkins', 'Docker', 'Kubernetes'],
    build: [
      'Designed a four-layer automotive digital twin: simulation, middleware, embedded and HMI.',
      'Solved hardware-dependent embedded-component challenges through a CARLA plugin architecture.',
      'Reduced provisioning time by 70% with Terraform IaC and Jenkins CI/CD; presented at Embedded World Nuremberg 2025.',
    ],
    features: ['Four-layer integration', 'CARLA plugin architecture', 'AGL & Android Automotive', 'Infrastructure as code'],
    metrics: [
      { value: '70%', label: 'faster provisioning' },
      { value: '4', label: 'integrated layers' },
      { value: 'EW 2025', label: 'presented in Nuremberg' },
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
    logline: '28 ms on-device inference on ARM — with MQTT streaming to AWS and Greengrass managing a distributed camera fleet.',
    stack: ['ARM Cortex', 'TensorFlow Lite', 'EfficientDet-Lite', 'AWS IoT Core', 'IoT Greengrass', 'Lambda', 'SageMaker', 'MQTT', 'GitHub Actions'],
    build: [
      'Edge AI pipeline achieving 28 ms on-device inference on ARM Cortex with EfficientDet-Lite.',
      'MQTT event streaming to AWS IoT Core with SageMaker real-time analytics, and Greengrass fleet management for distributed camera-node updates.',
      'GitHub Actions CI/CD to build and deploy the platform.',
      'Recognised with the Star Performer of the Year and Cloud Architecture Leadership awards (2024).',
    ],
    features: ['On-device inference', 'Edge-to-cloud MQTT', 'Greengrass fleet updates', 'Real-time analytics'],
    metrics: [
      { value: '28 ms', label: 'on-device inference latency' },
      { value: '2', label: 'awards in 2024' },
    ],
    featured: true,
    blueprint: 'edgeai',
    palette: jade,
    motif: 'edge',
  },
  {
    id: 'drdo-devsecops',
    title: 'Air-Gapped DevSecOps',
    client: 'DRDO',
    genre: 'Defense • DevSecOps',
    logline: 'A secure software factory for classified software delivery — no internet, full governance.',
    stack: ['Tuleap ALM', 'Jenkins', 'Gitea', 'SonarQube', 'Nexus', 'ARM GNU toolchain', 'LDAP'],
    build: [
      'Designed a secure air-gapped DevSecOps ecosystem for defense infrastructure — Tuleap ALM, Jenkins, Gitea, SonarQube and Nexus.',
      'LDAP-based RBAC, ARM cross-compilation pipelines, audit logging and SCM governance for classified software delivery.',
    ],
    features: ['Fully air-gapped toolchain', 'ARM cross-compilation', 'Quality gates', 'RBAC + LDAP governance', 'Audit logging'],
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
    id: 'icar-lms',
    title: 'National Multi-Tenant LMS',
    client: 'ICAR',
    genre: 'Kubernetes • Platform Engineering',
    logline: 'Multi-tenant Kubernetes on Nutanix HCI serving 1M+ learners across 76 universities — each with its own domain, logo and isolated data.',
    stack: ['Kubernetes', 'Nutanix HCI', 'Keycloak SSO', 'PostgreSQL', 'Redis', 'Jenkins', 'Prometheus', 'Grafana'],
    build: [
      'Architected multi-tenant Kubernetes on Nutanix HCI supporting 1M+ learners across 76 universities in four zones.',
      'Tenant isolation, per-tenant domains and branding, Keycloak SSO with RBAC and 2FA, CI/CD automation and centralised governance.',
    ],
    features: ['76 tenants · per-tenant domain & logo', 'Tenant isolation', 'Keycloak SSO', 'CI/CD with security scans'],
    metrics: [
      { value: '1M+', label: 'learners' },
      { value: '76', label: 'universities' },
    ],
    blueprint: 'lms',
    palette: jade,
    motif: 'tenants',
  },
  {
    id: 'safelite',
    title: 'L1 Health Check Automation',
    client: 'Safelite',
    genre: 'SRE • Automation',
    logline: 'Six layers of automated checks and recovery replace manual L1 monitoring across 8 critical systems.',
    stack: ['Playwright', 'Axios', 'IMAP', 'Pixel-match', 'ServiceNow', 'SSH'],
    build: [
      'Six-layer monitoring and recovery: Playwright UI checks, Axios REST health, IMAP mailbox checks, pixel-match visual state, ServiceNow incident auto-creation and SSH recovery.',
      'Replaced manual L1 checks across 8 critical systems with a 90-second full detection-to-recovery cycle.',
    ],
    features: ['UI, API, mailbox & visual checks', 'Automatic ServiceNow incidents', 'Self-healing via SSH'],
    metrics: [
      { value: '90 s', label: 'detection-to-recovery cycle' },
      { value: '8', label: 'critical systems covered' },
      { value: '6', label: 'monitoring layers' },
    ],
    palette: ember,
    motif: 'flow',
  },
  {
    id: 'langgraph-finops',
    title: 'FinOps Cost Investigator',
    client: 'LangGraph · POC',
    genre: 'Agentic AI • Multi-Agent • FinOps',
    logline: 'A LangGraph multi-agent proof of concept that investigates a cloud bill — finds cost spikes and idle resources, recommends savings, and waits for human approval before drafting a cleanup script it never runs.',
    stack: ['LangGraph', 'LangChain Core', 'Gemini 2.5 Flash', 'Python', 'pandas', 'Pydantic', 'pytest'],
    build: [
      'Supervisor pattern on a LangGraph StateGraph: the supervisor routes between an LLM tool-calling analyst, a deterministic anomaly detector and a recommender, over one typed state with append-only reducers so no worker can overwrite another’s evidence.',
      'Numbers come from code, not the model: pandas tools compute totals, trends and trailing-median spike and idle detection; Gemini only chooses tools, explains results and returns Pydantic-validated recommendations.',
      'Human-in-the-loop approval with interrupt() and a checkpointer — a remediation script is drafted only after explicit approval, filtered to an allow-list of gcloud commands, labelled DRAFT and never executed.',
      'Guardrails in code rather than prompts: validated supervisor routing with a fixed-order fallback, step and tool-loop caps, schema validation and rule-based fallbacks when LLM calls fail.',
      'Tested offline with 13 tests and a scripted fake LLM — routing, tool loops, approval and rejection paths, and script sanitising — with a defined path to BigQuery billing export, a durable checkpointer and Cloud Run.',
    ],
    features: ['Supervisor + specialist agents', 'Tool calling with ToolNode', 'Deterministic spike & idle detection', 'Pydantic structured outputs', 'interrupt() human approval gate', 'Draft-only, allow-listed scripts'],
    metrics: [
      { value: '3', label: 'specialist agents under a supervisor' },
      { value: '13', label: 'offline tests with a fake LLM' },
      { value: '0', label: 'figures calculated by the LLM' },
      { value: '1', label: 'human approval gate before any script' },
    ],
    featured: true,
    blueprint: 'finops',
    github: 'https://github.com/Intruder0512/finops-langgraph',
    palette: amber,
    motif: 'mesh',
  },
  {
    id: 'indic-voice',
    title: 'Indic Voice Translator & Dubber',
    client: 'Open source · POC',
    genre: 'Speech AI • Self-hosted • Open Source',
    logline: 'Self-hosted speech-to-speech translation and video dubbing for 21 Indic languages — Whisper, IndicTrans2 and Parler-TTS on a single GPU, with no cloud APIs.',
    stack: ['Whisper', 'IndicTrans2', 'Indic Parler-TTS', 'PyTorch', 'FastAPI', 'Gradio', 'ffmpeg', 'Docker', 'GitHub Actions'],
    build: [
      'Three-model pipeline: Whisper small transcribes English in 30-second windows, IndicTrans2 (distilled 200M) translates in batched 700-character chunks, and Indic Parler-TTS speaks each target language in 220-character chunks.',
      'Video dubbing with sync correction: ffprobe compares durations, then the dub is copied, padded with silence or time-stretched with chained ffmpeg atempo filters to match the original video.',
      'Two interfaces — a Gradio UI for people and a FastAPI server for machines with an async job queue, bearer-token auth, a single GPU lock that serialises inference, and TTL sweeps for old outputs.',
      'Shipped as a reproducible package: pinned lock file, one-step setup script, CUDA 12.1 Docker image, systemd units, and GitHub Actions CI for lint, syntax and Docker builds.',
    ],
    features: ['21 Indic languages', 'Up to 4 targets in one pass', 'Dubbed video re-synced to length', 'Models stay warm on one GPU', 'REST API with job queue', 'MIT licensed'],
    metrics: [
      { value: '21', label: 'Indic languages supported' },
      { value: '0.42×', label: 'real-time factor per language on an A10' },
      { value: '~25 s', label: 'to dub a 1-minute clip into one language' },
      { value: '~9 GB', label: 'VRAM with all three models resident' },
    ],
    featured: true,
    blueprint: 'voice',
    github: 'https://github.com/Intruder0512/voice-translation-poc',
    palette: violet,
    motif: 'flow',
  },
  {
    id: 'agri-edge',
    title: 'Physical AI at the Edge',
    client: 'AI Summit 2026',
    genre: 'Edge AI • AgriTech',
    logline: 'Physical AI on deterministic MPU + MCU edge hardware — presented on the AI Impact Summit stage and demonstrated to the Union Minister at AI Summit 2026.',
    stack: ['TensorFlow Lite', 'ARM', 'MPU + MCU', 'Arduino UNO Q', 'Qualcomm', 'MQTT', 'AWS IoT'],
    build: [
      'Hybrid deterministic Edge AI architecture integrating ARM platforms, TensorFlow Lite and AWS IoT for real-time distributed intelligence.',
      'Real-time actuation with MQTT telemetry benchmarking inference latency.',
    ],
    features: ['On-device inference', 'Deterministic actuation', 'Latency telemetry'],
    metrics: [],
    blueprint: 'edgeai',
    palette: jade,
    motif: 'chip',
  },
  {
    id: 'edge-cloud-showcase',
    title: 'Edge Cloud Showcase',
    client: 'Embedded World 2025',
    genre: 'Edge • IoT',
    logline: 'AWS IoT Greengrass and Lambda-based distributed edge intelligence on ARM hardware, demonstrated in Nuremberg.',
    stack: ['IoT Greengrass', 'Lambda', 'ARM'],
    build: ['Demonstrated AWS IoT Greengrass and Lambda-based distributed edge intelligence on ARM hardware at one of the world’s largest embedded systems exhibitions.'],
    features: ['International exhibition demo', 'Edge-cloud convergence'],
    metrics: [],
    palette: ocean,
    motif: 'edge',
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
    build: ['Migrated Exchange, file server and Active Directory to Office 365 and Azure, modernising identity architecture for enterprise workforce continuity.'],
    features: ['Identity modernisation', 'Workforce continuity'],
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
    features: ['Containerised releases', 'Faster, safer deployments'],
    metrics: [],
    palette: ember,
    motif: 'flow',
  },
];

/** THE CAST — signature tech stack, drawn as layers from models down to the edge. */
export type StackLayer = { id: string; layer: string; role: string; tools: string[]; palette: Palette };

export const techStack: StackLayer[] = [
  { id: 'models', layer: 'Models & GenAI', role: 'The reasoning layer', tools: ['AWS Bedrock', 'Azure OpenAI', 'Vertex AI · Gemini', 'SageMaker', 'TensorFlow Lite · EfficientDet-Lite'], palette: crimson },
  { id: 'agents', layer: 'Agents & Orchestration', role: 'How the agents think and coordinate', tools: ['Model Context Protocol (MCP)', 'LangGraph', 'LangChain', 'ReAct · multi-agent', 'Gemini function calling', 'Step Functions', 'HITL governance'], palette: violet },
  { id: 'retrieval', layer: 'Retrieval & Knowledge', role: 'Grounding answers in real data', tools: ['Azure AI Search', 'OpenSearch', 'Vertex AI Vector Search', 'Pinecone', 'FAISS', 'Document Intelligence', 'Document AI', 'Textract'], palette: ocean },
  { id: 'data', layer: 'Data Platform', role: 'Lakehouse, pipelines and stores', tools: ['Azure Data Factory', 'ADLS Gen2', 'Synapse', 'Microsoft Fabric', 'Purview', 'AWS Glue', 'Redshift · Athena', 'Kafka · Kinesis', 'BigQuery', 'Firestore · DynamoDB'], palette: amber },
  { id: 'cloud', layer: 'Cloud & Platform', role: 'Where it all runs', tools: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes · EKS', 'Nutanix HCI', 'Docker · Helm', 'Terraform', 'Cloud Run · Lambda · Functions'], palette: jade },
  { id: 'devsecops', layer: 'DevSecOps & Security', role: 'Shipping safely', tools: ['Jenkins', 'GitHub Actions', 'Azure DevOps', 'SonarQube · Trivy', 'Nexus · Gitea · Tuleap', 'Entra ID · Keycloak', 'Key Vault · KMS', 'ISO 42001 AIMS'], palette: ember },
  { id: 'observability', layer: 'Observability & SRE', role: 'Seeing everything', tools: ['Prometheus · Grafana', 'CloudWatch', 'Azure Monitor · App Insights', 'ELK / OpenSearch', 'Playwright synthetic checks', 'ServiceNow'], palette: crimson },
  { id: 'edge', layer: 'Edge & Embedded', role: 'Intelligence at the device', tools: ['ARM Cortex', 'AWS IoT Core · Greengrass', 'MQTT', 'CARLA', 'AGL · Android Automotive', 'Qt HMI'], palette: violet },
  { id: 'code', layer: 'Code & BI', role: 'Hands on the keyboard', tools: ['Python', 'FastAPI', 'pandas · Pydantic · pytest', 'React.js', 'Power BI'], palette: ocean },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

export type Achievement = { id: string; title: string; org: string; detail: string; laurel: string; year: string; link?: string };

export const achievements: Achievement[] = [
  {
    id: 'ai-summit',
    title: 'Speaker & Demonstrator',
    org: 'AI Summit 2026 · India',
    detail: 'Hybrid deterministic Edge AI architectures integrating ARM platforms, TensorFlow Lite and AWS IoT for real-time distributed intelligence.',
    laurel: 'Speaker',
    year: '2026',
  },
  {
    id: 'embedded-world',
    title: 'Speaker & Demonstrator',
    org: 'Embedded World · Nuremberg',
    detail: 'AWS IoT Greengrass and Lambda-based distributed edge intelligence on ARM hardware at one of the world’s largest embedded systems exhibitions.',
    laurel: 'Speaker',
    year: '2025',
  },
  {
    id: 'iso-42001',
    title: 'ISO 42001 AIMS Certification Leadership',
    org: 'Enterprise AI governance',
    detail: 'AI policy, data-quality assessments, VAPT, risk registers, HITL governance frameworks and BCP artefacts for enterprise AI systems.',
    laurel: 'Certified',
    year: 'ISO 42001',
  },
  {
    id: 'cloud-leadership',
    title: 'Cloud Architecture Leadership',
    org: 'Visionext',
    detail: 'Recognised for delivering scalable AWS edge-cloud infrastructure.',
    laurel: 'Leadership',
    year: '2024',
  },
  {
    id: 'star-performer',
    title: 'Star Performer of the Year',
    org: 'Judge India Solutions',
    detail: 'For major contribution to the Visionext project and delivery excellence in high-impact AWS edge-cloud infrastructure.',
    laurel: 'Star Performer',
    year: '2024',
  },
  {
    id: 'k8s-excellence',
    title: 'Kubernetes Infrastructure Excellence',
    org: 'ICAR',
    detail: 'For architecting the national LMS Kubernetes platform supporting 1M+ learners across 76 universities.',
    laurel: 'ACE Award',
    year: '2023',
  },
];

export const leadership = [
  'Building BHP India’s AI engineering chapter — hiring, mentoring, standards and capability roadmaps.',
  'Acting Delivery Lead — single point of contact for delivery accountability across BTC’s key programmes.',
  'Speaker & demonstrator at AI Summit 2026 India and Embedded World 2025, Nuremberg.',
  'Edge AI demo to Hon’ble Union Minister Shri Ashwini Vaishnaw at the Qualcomm booth, AI Summit 2026.',
  'Architecture design authority across POCs, RFPs and enterprise implementations.',
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
  /** CSS object-position for the photo, e.g. 'center 20%'. */
  imagePosition?: string;
  /** LinkedIn embed URL — the card opens the post in an overlay. */
  embed?: { src: string; height: number };
  palette: Palette;
};

export const news: NewsItem[] = [
  {
    id: 'ai-summit-minister',
    event: 'AI Summit 2026',
    title: 'Edge AI demo to the Union Minister',
    detail: 'Hosted Hon’ble Union Minister Shri Ashwini Vaishnaw at the Qualcomm booth — showing how embedded intelligence and Edge AI on Arduino + Qualcomm hardware work in the real world.',
    by: 'Judge India Solutions',
    tags: '#AISummit2026 · #EdgeAI · #EmbeddedAI · #AIoT',
    link: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7430628431408627712',
    embed: { src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7430628431408627712?collapsed=1', height: 896 },
    image: '/assets/ai-summit-minister.webp',
    imagePosition: 'center 30%',
    palette: jade,
  },
  {
    id: 'ai-summit-stage',
    event: 'AI Impact Summit 2026',
    title: 'Physical AI & Edge AI — on stage',
    detail: 'On the AI Impact Summit main stage — presenting Physical AI and Edge AI running on Arduino UNO Q with Qualcomm: intelligence that senses, decides and acts on the device itself.',
    by: 'Prashant Yadav',
    tags: '#PhysicalAI · #EdgeAI · #EmbeddedAI · #AIImpactSummit',
    link: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7432359053441454081',
    embed: { src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7432359053441454081?collapsed=1', height: 550 },
    image: '/assets/ai-summit-stage.webp',
    imagePosition: 'center 40%',
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
    id: 'ai',
    title: 'AI & GenAI',
    subtitle: 'Agentic AI, RAG & MCP',
    skills: [
      { name: 'Agentic AI', mono: 'Ag', note: 'Core' },
      { name: 'Model Context Protocol', mono: 'MC', note: 'Core' },
      ...s('RAG Pipelines', 'Multi-Agent Orchestration', 'LangGraph', 'LangChain', 'LLMs', 'Vector Search', 'Vertex AI · Gemini', 'AWS Bedrock', 'Azure OpenAI', 'Prompt Engineering', 'ISO 42001 AIMS'),
    ],
  },
  {
    id: 'platform',
    title: 'Platform & Cloud',
    subtitle: 'Kubernetes, IaC & multi-cloud',
    skills: [
      { name: 'Kubernetes', mono: 'K8', note: 'Core' },
      ...s('Nutanix HCI', 'Multi-tenant Platforms', 'Docker', 'Helm', 'Terraform / IaC', 'AWS', 'Azure', 'Google Cloud', 'Platform Engineering'),
    ],
  },
  {
    id: 'leadership',
    title: 'Leadership & Delivery',
    subtitle: 'Chapters, delivery & stakeholders',
    skills: s('Chapter Leadership', 'Delivery Management', 'Stakeholder Engagement', 'People Development', 'Architecture Governance', 'RFP Leadership', 'Vendor Evaluation', 'Executive Communication'),
  },
  {
    id: 'devsecops',
    title: 'DevSecOps',
    subtitle: 'Pipelines & secure delivery',
    skills: s('Jenkins', 'GitHub Actions', 'Azure DevOps', 'SonarQube', 'Trivy', 'Nexus', 'Air-gapped DevSecOps', 'RBAC · LDAP', 'VAPT', 'ARM Cross-compilation'),
  },
  {
    id: 'data',
    title: 'Data Architecture',
    subtitle: 'Lakehouse, pipelines & governance',
    skills: s('Medallion Lakehouse', 'Azure Data Factory', 'ADLS Gen2', 'Synapse', 'Microsoft Fabric', 'AWS Glue', 'Redshift', 'Kafka · Kinesis', 'CDC', 'Schema Evolution', 'Data Lineage', 'Purview', 'MDM'),
  },
  {
    id: 'security',
    title: 'Security',
    subtitle: 'Identity, encryption & compliance',
    skills: s('IAM · RBAC', 'KMS · Key Vault', 'Zero Trust', 'PII Masking', 'Security Trimming', 'Private Endpoints', 'Audit Logging', 'ISO 42001'),
  },
  {
    id: 'observability',
    title: 'Observability & SRE',
    subtitle: 'Monitoring & resilience',
    skills: s('Prometheus · Grafana', 'CloudWatch', 'Azure Monitor', 'Application Insights', 'ELK / OpenSearch', 'SLO / SLA Design', 'Disaster Recovery', 'Incident Readiness'),
  },
  {
    id: 'edge',
    title: 'Edge AI & IoT',
    subtitle: 'Embedded intelligence',
    skills: s('TensorFlow Lite', 'EfficientDet-Lite', 'ARM Cortex', 'AWS IoT Core', 'Greengrass', 'MQTT', 'Real-time Edge Inference'),
  },
  {
    id: 'finops',
    title: 'FinOps & Code',
    subtitle: 'Cost, Python & Power BI',
    skills: s('Cloud Cost Optimisation', 'Rightsizing', 'Cost Attribution per Tenant', 'Quota Management', 'Python', 'FastAPI', 'React.js', 'Power BI'),
  },
];

/** Where each skill shows up — revealed on hover / tap. */
export const skillEvidence: Record<string, string[]> = {
  'Agentic AI': ['Agents for BHP internal tooling', 'myBOS Coach integration', 'LMS AI Platform'],
  'Model Context Protocol': ['MCP Tool Orchestration Hub — 870 → 380 ms'],
  'RAG Pipelines': ['HR Policy RAG Assistant', 'Data Bridge Platform', 'Document Intelligence Agent'],
  'Multi-Agent Orchestration': ['Document Intelligence Agent', 'MCP Tool Orchestration Hub'],
  LangGraph: ['FinOps Cost Investigator — supervisor, ToolNode, interrupt()'],
  LangChain: ['FinOps Cost Investigator — tools, bind_tools, structured output'],
  'Vertex AI · Gemini': ['Document Intelligence Agent'],
  'Vector Search': ['Pinecone & FAISS in Bedrock / Azure OpenAI RAG', 'Vertex AI Vector Search', 'Azure AI Search'],
  'AWS Bedrock': ['LMS AI Platform', 'MCP Tool Orchestration Hub'],
  'Azure OpenAI': ['HR Policy RAG Assistant', 'Data Bridge Platform'],
  'ISO 42001 AIMS': ['Led ISO 42001 AIMS certification'],
  Kubernetes: ['National Multi-Tenant LMS — 1M+ learners', 'Kubernetes Infrastructure Excellence award'],
  'Nutanix HCI': ['National Multi-Tenant LMS'],
  Terraform: ['Siemens digital twin — 70% faster provisioning'],
  'Terraform / IaC': ['Siemens digital twin — 70% faster provisioning'],
  'Google Cloud': ['Document Intelligence Agent'],
  'Chapter Leadership': ['BHP India AI engineering chapter'],
  'Delivery Management': ['Acting Delivery Lead — BHP Technical Centre'],
  'Stakeholder Engagement': ['Vespa operating model', 'Turmeric Tool Connect'],
  'Air-gapped DevSecOps': ['DRDO Air-Gapped DevSecOps'],
  'Azure Data Factory': ['Data Bridge Platform'],
  'Microsoft Fabric': ['Data Bridge Platform'],
  'Power BI': ['Internal finance dashboards — US staffing margins & placements'],
  Purview: ['Data Bridge Platform'],
  'Security Trimming': ['HR Policy RAG Assistant'],
  'EfficientDet-Lite': ['Visionext — 28 ms on-device inference'],
  Textract: ['LMS AI Platform — chapter extraction & summarisation'],
  'TensorFlow Lite': ['Visionext Edge AI', 'Physical AI at the Edge'],
  'Disaster Recovery': ['AWS DR Framework'],
  'Incident Readiness': ['Safelite L1 Health Check Automation'],
  FastAPI: ['MCP Tool Orchestration Hub', 'Indic Voice Translator — async job API'],
  'GitHub Actions': ['Visionext Edge AI — build & deployment'],
  'Azure DevOps': ['Data Bridge & HR Policy RAG — Azure Document Intelligence deployments'],
};

export type Episode = { code: string; title: string; description: string; tags: string[]; runtime: string; palette: Palette };
export type Season = { number: number; title: string; period: string; synopsis: string; episodes: Episode[] };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Groundwork',
    period: '– 2010',
    synopsis: 'An IT degree, then straight into enterprise support — banking users, endpoints and the discipline of SLAs.',
    episodes: [
      { code: 'S01 E01', title: 'The Engineer', description: 'B.Tech in Information Technology from IEC CET, Greater Noida (UPTU).', tags: ['B.Tech', 'IT'], runtime: '2007', palette: amber },
      { code: 'S01 E02', title: 'First Login', description: 'iGATE and Cyfuture — enterprise support for Royal Bank of Canada users, then supervising L1 resources for technical sales.', tags: ['iGATE', 'Cyfuture', 'Support'], runtime: 'Feb 2009 – May 2010', palette: ocean },
    ],
  },
  {
    number: 2,
    title: 'Global Support',
    period: '2010 – 2012',
    synopsis: 'Dell Perot Systems — global enterprise support, BMC Remedy and moving US hardware support operations to India.',
    episodes: [
      { code: 'S02 E01', title: 'The Transition', description: 'Transitioned US hardware support operations to India with SLA-driven incident management on BMC Remedy.', tags: ['Dell Perot Systems', 'BMC Remedy'], runtime: 'Jun 2010 – Aug 2012', palette: crimson },
    ],
  },
  {
    number: 3,
    title: 'The Founder Arc',
    period: '2012 – 2016',
    synopsis: 'Independent IT consultant — building BPO infrastructure from the ground up for multiple startups.',
    episodes: [
      { code: 'S03 E01', title: 'The Builder', description: 'Complete BPO infrastructure — dialers, VOIP systems and networking hardware — for multiple startups.', tags: ['BPO', 'VOIP', 'Networking'], runtime: 'Aug 2012 – Aug 2016', palette: jade },
      { code: 'S03 E02', title: 'The Director', description: 'Working Director over 15–20 member technical teams running backend technology operations.', tags: ['Leadership'], runtime: '15–20 engineers', palette: ember },
    ],
  },
  {
    number: 4,
    title: 'Employee #002',
    period: '2016 – 2020',
    synopsis: 'Joining Judge India Solutions as its second employee — and climbing from systems to cloud to architecture.',
    episodes: [
      { code: 'S04 E01', title: 'The Sysadmin', description: 'System Administrator at Judge India Solutions — Employee #002.', tags: ['Infrastructure'], runtime: '2016 – 2017', palette: ocean },
      { code: 'S04 E02', title: 'The Cloud Turn', description: 'Cloud Support Engineer — moving the business onto AWS and Azure.', tags: ['AWS', 'Azure'], runtime: '2017 – 2018', palette: violet },
      { code: 'S04 E03', title: 'The Architect', description: 'Solutions Architect — HA, disaster recovery, identity and containerised delivery.', tags: ['Architecture', 'DR', 'Docker'], runtime: '2018 – 2020', palette: amber },
    ],
  },
  {
    number: 5,
    title: 'Senior Architect',
    period: '2020 – 2025',
    synopsis: 'Senior Solutions Architect — national-scale Kubernetes, defense DevSecOps, edge AI and international stages.',
    episodes: [
      { code: 'S05 E01', title: 'One Million Learners', description: 'Multi-tenant Kubernetes on Nutanix HCI for ICAR — 76 universities, 1M+ learners — and the Kubernetes Infrastructure Excellence award.', tags: ['Kubernetes', 'ICAR'], runtime: '2023', palette: jade },
      { code: 'S05 E02', title: 'Air-Gapped', description: 'DevSecOps transformation at DRDO — a fully air-gapped software factory with ARM cross-compilation.', tags: ['DRDO', 'DevSecOps'], runtime: 'Defense', palette: crimson },
      { code: 'S05 E03', title: 'The Edge', description: 'Visionext ARM edge AI — 28 ms on-device inference — Star Performer of the Year and Cloud Architecture Leadership.', tags: ['Edge AI', '2 Awards'], runtime: '2024', palette: ember },
      { code: 'S05 E04', title: 'The Analyst', description: 'MBA in Business Analytics from IMT-CDL Ghaziabad.', tags: ['MBA'], runtime: '2022', palette: amber },
      { code: 'S05 E05', title: 'Nuremberg', description: 'Siemens CARLA digital twin presented at Embedded World 2025 — speaker and demonstrator.', tags: ['Embedded World', 'Siemens'], runtime: '2025', palette: ocean },
    ],
  },
  {
    number: 6,
    title: 'Data & Agentic AI',
    period: '2025 – 2026',
    synopsis: 'Azure data fusion, enterprise RAG, MCP tool orchestration and AI governance.',
    episodes: [
      { code: 'S06 E01', title: 'The Data Bridge', description: 'Finance, staffing, payroll and contract data unified on Azure into a governed, queryable intelligence layer.', tags: ['ADF', 'Synapse', 'Fabric'], runtime: 'Azure', palette: ocean },
      { code: 'S06 E02', title: 'Grounded', description: 'HR Policy RAG Assistant — 0.91 faithfulness and 85% auto-resolution.', tags: ['RAG', 'Azure OpenAI'], runtime: 'Azure', palette: violet },
      { code: 'S06 E03', title: 'The Protocol', description: 'MCP tool orchestration hub — 3-tool chains cut from 870 ms to 380 ms.', tags: ['MCP', 'FastAPI'], runtime: 'Agentic AI', palette: ember },
      { code: 'S06 E04', title: 'Governed', description: 'Led ISO 42001 AIMS certification for enterprise AI systems.', tags: ['ISO 42001'], runtime: 'AI governance', palette: jade },
      { code: 'S06 E05', title: 'The Minister', description: 'Physical AI and Edge AI on the AI Impact Summit stage — and a demo to the Union Minister at AI Summit 2026.', tags: ['AI Summit', 'Edge AI'], runtime: '2026', palette: crimson },
    ],
  },
  {
    number: 7,
    title: 'Now Streaming',
    period: '2026 –',
    synopsis: 'Chapter Lead for AI Development and Acting Delivery Lead at BHP’s India Technical Centre.',
    episodes: [
      { code: 'S07 E01', title: 'The Chapter Lead', description: 'Building BHP India’s AI engineering chapter from the ground up — hiring, mentoring, standards and roadmaps.', tags: ['BHP', 'Leadership'], runtime: 'Aug 2026 – Present', palette: crimson },
      { code: 'S07 E02', title: 'The Delivery Lead', description: 'Stepped up to own delivery continuity — Vespa operating model and Turmeric Tool Connect.', tags: ['Delivery', 'Stakeholders'], runtime: 'Acting', palette: violet },
      { code: 'S07 E03', title: 'The Coach', description: 'Integrating the multi-agent AI system into myBOS Coach, BHP’s enterprise operating platform.', tags: ['Agentic AI', 'myBOS'], runtime: 'In production', palette: jade },
      { code: 'S07 E04', title: 'The Agent Builder', description: 'Hands-on agent frameworks — a Google Cloud Document Intelligence Agent and a LangGraph multi-agent FinOps POC with a human approval gate.', tags: ['Google Cloud', 'LangGraph'], runtime: '2026', palette: ocean },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Now playing', title: 'Chapter Lead', detail: 'AI Development & Delivery · BHP', palette: crimson },
  { label: 'Learners served', title: '1M+', detail: 'Kubernetes LMS · 76 universities', palette: jade },
  { label: 'In the industry', title: `${yearsExp}+ Years`, detail: 'Since February 2009', palette: amber },
  { label: 'MCP tool chains', title: '870→380 ms', detail: 'Parallel execution & caching', palette: ember },
  { label: 'RAG faithfulness', title: '0.91', detail: 'HR Policy RAG · 85% auto-resolved', palette: violet },
  { label: 'Edge inference', title: '28 ms', detail: 'EfficientDet-Lite on ARM', palette: ocean },
  { label: 'Provisioning time', title: '−70%', detail: 'Siemens CARLA digital twin', palette: amber },
  { label: 'Demo to the Minister', title: 'AI Summit 2026', detail: 'Edge AI at the Qualcomm booth', palette: jade },
  { label: 'Biggest stage', title: 'Embedded World', detail: 'Speaker · Nuremberg 2025', palette: ocean },
  { label: 'AI governance', title: 'ISO 42001', detail: 'AIMS certification lead', palette: violet },
];

/** Slides for the "▶ Play Intro" highlight reel. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  { kicker: 'The pilot', title: `${yearsExp}+ years`, lines: ['From enterprise support in 2009 to AI Development & Delivery Lead', 'Employee #002 at Judge India — ten years, sysadmin to Senior Solutions Architect'] },
  { kicker: 'Scale', title: 'One million learners', lines: ['Multi-tenant Kubernetes on Nutanix HCI', '76 universities · per-tenant domains · AI content layer'], chips: ['Kubernetes', 'Nutanix', 'Bedrock'] },
  { kicker: 'Data & AI', title: 'Grounded answers', lines: ['Azure data fusion across finance, staffing & payroll', 'HR Policy RAG — 0.91 faithfulness, 85% auto-resolved'], chips: ['Azure OpenAI', 'AI Search', 'Fabric', 'Synapse'] },
  { kicker: 'Agents', title: 'The protocol', lines: ['MCP tool orchestration hub — 870 → 380 ms chains', 'Google Cloud multi-agent RAG · LangGraph FinOps POC'], chips: ['MCP', 'LangGraph', 'Vertex AI', 'Gemini'] },
  { kicker: 'On stage', title: 'Nuremberg → New Delhi', lines: ['Speaker · Embedded World 2025', 'Edge AI demo to the Union Minister · AI Summit 2026'] },
  { kicker: 'Governance', title: 'ISO 42001', lines: ['Led AIMS certification for enterprise AI systems', 'Kubernetes Excellence · Cloud Architecture Leadership · Star Performer'] },
  { kicker: 'Now streaming', title: 'Chapter Lead', lines: ['AI Development & Acting Delivery Lead', 'BHP India Technical Centre'] },
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
/**
 * The Data Bridge and HR Policy RAG diagrams show the earlier AWS designs; the delivered
 * versions run on Azure, so they are presented as reference architectures.
 */
const BLUEPRINT_OVERRIDES: Record<string, Partial<Blueprint>> = {
  databridge: { label: 'Data Fusion + RAG · AWS', group: 'Reference' },
  hrrag: { label: 'Policy RAG · Amazon Bedrock', group: 'Reference' },
};
const NEW_BLUEPRINTS: Blueprint[] = [
  {
    id: 'databridge-azure', label: 'Data Bridge · Azure Data Fusion', group: 'Real-world',
    badges: ['Data Bridge Platform · Real-World', 'ADF · ADLS Gen2 · Synapse · Fabric · AI Search · Azure OpenAI · Power BI', '9 data domains · 5 curated datasets · Purview lineage'],
    legend: [{ color: '#475569', label: 'Source systems' }, { color: '#1d4ed8', label: 'Ingestion' }, { color: '#b45309', label: 'Governed lake · Power BI' }, { color: '#16a34a', label: 'ELT · Curated datasets' }, { color: '#6d28d9', label: 'AI Search · Azure OpenAI' }, { color: '#dc2626', label: 'Security · Governance · Delivery' }],
    tips: 25,
  },
  {
    id: 'hrrag-azure', label: 'HR Policy RAG · Azure OpenAI', group: 'Real-world',
    badges: ['HR Policy RAG Assistant · Real-World', 'Document Intelligence · Azure AI Search · Azure OpenAI · Entra ID', '0.91 faithfulness · 85% auto-resolution'],
    legend: [{ color: '#b45309', label: 'Ingestion' }, { color: '#0891b2', label: 'Document Intelligence' }, { color: '#16a34a', label: 'Chunking · Retrieval' }, { color: '#6d28d9', label: 'Embeddings · Generation' }, { color: '#1d4ed8', label: 'Identity' }, { color: '#dc2626', label: 'Security trimming' }],
    tips: 10,
  },
  {
    id: 'finops', label: 'FinOps Investigator · LangGraph', group: 'POC & Code',
    badges: ['FinOps Cost Investigator · Proof of Concept', 'LangGraph · LangChain Core · Gemini 2.5 Flash · pandas · Pydantic', 'Supervisor · ToolNode · interrupt() approval · 13 offline tests'],
    legend: [{ color: '#6d28d9', label: 'Supervisor · State' }, { color: '#1d4ed8', label: 'Analyst agent' }, { color: '#0891b2', label: 'Tools' }, { color: '#16a34a', label: 'Deterministic rules · Script' }, { color: '#b45309', label: 'Recommender' }, { color: '#dc2626', label: 'Human approval' }],
    tips: 17,
  },
  {
    id: 'voice', label: 'Indic Voice Dubbing · Open Source', group: 'POC & Code',
    badges: ['Indic Voice Translator & Dubber · Open Source', 'Whisper · IndicTrans2 · Parler-TTS · FastAPI · Gradio', '21 languages · 0.42× real-time per language · one GPU'],
    legend: [{ color: '#1d4ed8', label: 'Speech recognition' }, { color: '#16a34a', label: 'Translation · Delivery' }, { color: '#b45309', label: 'Speech synthesis' }, { color: '#dc2626', label: 'A/V sync' }, { color: '#6d28d9', label: 'Interfaces · Output' }],
    tips: 14,
  },
];
const GROUP_ORDER = ['Real-world', 'POC & Code', 'Reference'];
export const blueprints = [...NEW_BLUEPRINTS, ...(legacy.blueprints as Blueprint[]).map((b) => ({ ...b, ...BLUEPRINT_OVERRIDES[b.id] }))]
  .sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group));

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
    title: 'Enterprise & AI Architecture Notes',
    meta: 'AWS · Azure · AI infrastructure · Platform · Delivery leadership · 115 questions',
    href: '/library/Prashant_AI_Architecture_Notes.md',
  },
  {
    title: 'Kubernetes, Cloud & Solution Architecture Notes',
    meta: 'K8s HA · Ingress · Cloud · Solution architecture · Scenarios · 100+ questions',
    href: '/library/Prashant_Kubernetes_Cloud_Architecture_Notes.md',
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
  guide: { nav: 'Arch Notes', card: 'Architecture Notes', meta: `${interviewGuide.length} topics • 2 downloadable notes`, palette: violet },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
