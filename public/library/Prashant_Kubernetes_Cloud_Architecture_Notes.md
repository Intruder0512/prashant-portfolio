# Kubernetes, Cloud & Solution Architecture Notes

**Prashant Yadav | Agentic AI Delivery Lead & Architect**

Questions on Kubernetes, high availability, ingress and load balancing, cloud architecture and solution architecture, and how I approach them, with practical examples from enterprise LMS, cloud migration, DevSecOps, edge AI, data platforms and customer-facing architecture engagements.


## Category Index

1. [Kubernetes Architecture](#1-kubernetes-architecture) — 15 questions
2. [Kubernetes High Availability and Resilience](#2-kubernetes-high-availability-and-resilience) — 18 questions
3. [Load Balancers, Ingress and Traffic Management](#3-load-balancers-ingress-and-traffic-management) — 17 questions
4. [Cloud Architecture](#4-cloud-architecture) — 18 questions
5. [Solution and Enterprise Architecture](#5-solution-and-enterprise-architecture) — 20 questions
6. [Scenario-Based Architecture Questions](#6-scenario-based-architecture-questions) — 12 questions
7. [Rapid-Fire Questions](#7-rapid-fire-questions)

---

# 1. Kubernetes Architecture

## 1. What is Kubernetes, and why would you choose it?

Kubernetes is a container orchestration platform that automates application deployment, scheduling, scaling, service discovery, configuration management, and recovery. I choose it when an application contains multiple independently deployable services, needs repeatable deployment across environments, requires horizontal scaling, or must support rolling releases and self-healing.

I would not select Kubernetes merely because it is popular. For a small application with low change frequency, a managed application service, serverless platform, or a simpler container service may be cheaper and easier to operate. Kubernetes provides flexibility, but that flexibility introduces operational complexity.

## 2. Explain the main components of a Kubernetes cluster.

The control plane manages the desired state of the cluster. Its main components are:

- **kube-apiserver:** The entry point for all cluster operations.
- **etcd:** The strongly consistent datastore containing cluster state.
- **kube-scheduler:** Selects a suitable node for unscheduled pods.
- **kube-controller-manager:** Runs controllers that reconcile desired and actual state.
- **cloud-controller-manager:** Integrates Kubernetes with cloud networking, storage, and load balancers.

Worker nodes contain:

- **kubelet:** Ensures declared pods are running on the node.
- **container runtime:** Runs containers through the Container Runtime Interface.
- **kube-proxy or eBPF data plane:** Implements service networking and traffic forwarding.

## 3. What is the difference between a Pod, Deployment, StatefulSet and DaemonSet?

A **Pod** is the smallest deployable Kubernetes unit and can contain one or more tightly coupled containers.

A **Deployment** manages interchangeable stateless pod replicas and supports rolling updates and rollback. I use it for APIs, web front ends, and stateless workers.

A **StatefulSet** gives pods stable identities, ordered deployment, and persistent volume association. It is appropriate for stateful systems that genuinely need those guarantees, although I generally prefer managed databases outside the cluster for critical enterprise data.

A **DaemonSet** runs one pod on every eligible node. Typical uses include logging agents, security agents, storage drivers, and node-level monitoring.

## 4. How does Kubernetes scheduling work?

The scheduler first filters nodes that cannot run a pod due to resource limits, node selectors, affinity rules, taints, volume restrictions, or topology constraints. It then scores the remaining nodes and selects the best candidate.

I influence scheduling with:

- Resource requests and limits
- Node selectors and node affinity
- Pod affinity and anti-affinity
- Taints and tolerations
- Topology spread constraints
- Priority classes
- GPU and other extended resources

A common mistake is leaving resource requests undefined. Without realistic requests, the scheduler cannot make reliable placement decisions and the cluster becomes difficult to capacity-plan.

## 5. What are resource requests and limits?

A request is the amount of CPU or memory Kubernetes reserves for scheduling. A limit is the maximum amount a container may consume.

CPU above the limit is throttled. Memory above the limit can cause the container to be terminated with an out-of-memory error. I establish requests using observed application usage rather than guesses, then use Vertical Pod Autoscaler recommendations and monitoring data to refine them.

Setting every request equal to a high limit wastes capacity. Setting requests too low causes overcommitment and node pressure. The correct values reflect typical consumption, safe burst capacity, and application criticality.

## 6. How do services communicate inside Kubernetes?

A Kubernetes Service provides a stable virtual IP and DNS name in front of a changing set of pods selected by labels. Common service types are:

- **ClusterIP:** Internal-only access inside the cluster.
- **NodePort:** Exposes a port on every worker node; normally used as a building block rather than direct production exposure.
- **LoadBalancer:** Requests a cloud load balancer through the cloud provider integration.
- **ExternalName:** Maps a service name to an external DNS name.

For most internal application communication, I use ClusterIP services and DNS-based discovery. External HTTP traffic normally enters through an ingress controller or Gateway API implementation.

## 7. How do you manage configuration and secrets?

Non-sensitive configuration belongs in ConfigMaps or external configuration systems. Sensitive values should be held in a proper secret manager such as AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault.

Kubernetes Secrets are base64-encoded, not automatically secure. I enable encryption at rest for the Kubernetes API datastore, restrict RBAC, avoid mounting secrets into unnecessary workloads, use workload identity instead of static credentials, and rotate secrets. External Secrets Operator or a CSI secrets driver can retrieve values from the external secret manager at runtime.

## 8. How do you handle persistent storage in Kubernetes?

Kubernetes separates storage requests from infrastructure implementation through PersistentVolumes, PersistentVolumeClaims, StorageClasses, and the Container Storage Interface.

I select storage based on workload behavior:

- Block storage for single-writer transactional workloads
- Shared file storage for workloads requiring multiple readers or writers
- Object storage for documents, images, videos, backups, and data lakes

I also define reclaim policy, expansion support, snapshots, backup, performance tier, failure-domain placement, and restoration procedures. A persistent volume alone is not a backup strategy.

## 9. How would you structure namespaces in an enterprise cluster?

I usually separate namespaces by environment, product, tenant boundary, or operational ownership. Each namespace receives:

- ResourceQuota
- LimitRange
- NetworkPolicy
- RBAC bindings
- Pod security controls
- Cost and ownership labels
- Deployment policies

For strong isolation, regulatory requirements, or highly different operational lifecycles, I use separate clusters or cloud accounts/subscriptions rather than relying only on namespaces. Namespaces are a logical boundary, not a complete security boundary.

## 10. How do you secure a Kubernetes cluster?

I secure Kubernetes in layers:

1. Private or restricted API server access
2. Federated identity and least-privilege RBAC
3. Workload identity rather than static cloud credentials
4. NetworkPolicies and controlled egress
5. Pod Security Standards or policy enforcement
6. Signed and scanned container images
7. Secrets from an external vault
8. Encryption in transit and at rest
9. Admission policies for trusted registries, resource limits, and privileged workloads
10. Audit logging, runtime detection, patching, and vulnerability management

Security must be part of the platform baseline, not added after applications go live.

## 11. What is the difference between liveness, readiness and startup probes?

A **readiness probe** determines whether a pod should receive traffic. When it fails, the pod remains running but is removed from service endpoints.

A **liveness probe** determines whether the container is stuck and should be restarted.

A **startup probe** protects slow-starting applications from premature liveness failures. Until startup succeeds, liveness and readiness checks are delayed.

Poorly configured probes can create cascading failures. A liveness check should verify that the process can recover through restart, while readiness should reflect the application's ability to serve requests without making every temporary downstream dependency failure restart the pod.

## 12. What is the Kubernetes Operator pattern?

An Operator extends Kubernetes with a custom resource and controller that encodes operational knowledge. It continuously reconciles the desired state of a complex application, such as creating replicas, handling upgrades, managing backups, or performing failover.

I use Operators where lifecycle automation is complex and repeatable. I avoid introducing an Operator for simple deployment logic that standard resources and Helm can handle, because custom controllers increase the platform's operational surface.

## 13. Helm versus Kustomize: when would you use each?

Helm is a packaging and templating system. It is useful when distributing reusable applications with configurable values and dependency management.

Kustomize applies overlays and patches to plain Kubernetes manifests without introducing a template language. It works well for environment-specific customization where the base manifests should remain readable.

A practical approach is to use Helm for reusable third-party or product charts and Kustomize or GitOps overlays for organization-specific environment configuration.

## 14. How do you implement Kubernetes CI/CD?

The CI pipeline builds code, runs tests, scans dependencies and images, produces an immutable artifact, signs it, and pushes it to a trusted registry. The deployment stage updates a versioned manifest or Helm values repository.

For mature environments, I prefer GitOps using tools such as Argo CD or Flux. The cluster continuously reconciles against Git, providing clear change history, drift detection, rollback, and separation between build permissions and production deployment permissions.

## 15. How have you used Kubernetes in your projects?

I have used Kubernetes for multi-service LMS deployments, development and production environments, CI/CD-managed releases, ingress routing, background workers, monitoring, and multi-tenant platform design. In the ICAR LMS context, the platform used a control-plane and multiple worker nodes, with application services, Celery workers, ingress, database integration, object storage, and security controls.

My role has included platform architecture, deployment planning, troubleshooting, resource sizing, security hardening, release coordination, DR preparation, and translating business availability requirements into infrastructure and operational controls.

---

# 2. Kubernetes High Availability and Resilience

## 16. What does high availability mean in Kubernetes?

Kubernetes high availability means that failure of a node, control-plane component, pod, network path, or availability zone does not cause unacceptable service interruption. It includes more than running multiple replicas.

A complete HA design covers:

- Control-plane redundancy
- etcd quorum
- Worker node redundancy
- Replica distribution
- Load-balancer redundancy
- Storage and database availability
- DNS resilience
- Autoscaling
- Disruption controls
- Monitoring and tested recovery procedures

The business requirement must still be expressed as measurable service-level objectives, RTO, and RPO.

## 17. How would you design an HA Kubernetes control plane?

I would deploy at least three control-plane nodes across separate failure domains. The API servers would sit behind a highly available Layer-4 load balancer or managed control-plane endpoint. etcd would have an odd number of members, normally three or five, distributed to preserve quorum.

The scheduler and controller manager use leader election, so multiple instances can run while one remains active. I would also protect etcd with encrypted, regularly tested snapshots, restrict access, monitor latency and database size, and maintain version-skew compatibility during upgrades.

In managed Kubernetes such as EKS, AKS, or GKE, the provider operates the control plane, but the architect must still design worker nodes, network, storage, application, and regional resilience.

## 18. Why does etcd require an odd number of members?

etcd uses the Raft consensus protocol and requires a majority quorum. Three members tolerate one failure. Five members tolerate two. Four members still tolerate only one failure, so the fourth member increases cost and communication without increasing fault tolerance.

Quorum health is more important than raw member count. High network latency, disk latency, or placing a majority of members in one failure domain can undermine the design.

## 19. How do you make worker nodes highly available?

I distribute nodes across at least two or preferably three availability zones and use multiple node groups where appropriate. Applications receive multiple replicas spread across nodes and zones using topology spread constraints or pod anti-affinity.

I also use:

- Cluster Autoscaler or managed node auto-provisioning
- PodDisruptionBudgets
- Node health monitoring and automated replacement
- Separate node pools for system, general, memory-intensive, and GPU workloads
- Appropriate instance diversity
- Capacity reservations or on-demand baseline for critical workloads

Spot or preemptible nodes can reduce cost, but critical replicas should not depend entirely on interruptible capacity.

## 20. How do topology spread constraints improve HA?

Topology spread constraints instruct the scheduler to distribute replicas across topology domains such as hostname, zone, or region labels. They provide more predictable balance than simple anti-affinity and can control how much skew is acceptable.

For example, three API replicas can be distributed one per availability zone. This prevents a single zone failure from removing all replicas. I combine this with enough node capacity in each zone; scheduling rules cannot create capacity that does not exist.

## 21. What is a PodDisruptionBudget?

A PodDisruptionBudget limits the number of replicas that may be voluntarily unavailable during operations such as node drain, cluster upgrade, or autoscaler consolidation.

For a three-replica service, I might set `minAvailable: 2`. This prevents administrators or automation from evicting too many replicas simultaneously.

PDBs do not protect against involuntary failures such as a node crash. They also cannot help if the application has only one replica or if the cluster lacks capacity to reschedule pods.

## 22. How do you perform zero-downtime Kubernetes upgrades?

I first check version compatibility for the API, add-ons, ingress controller, CSI/CNI plugins, policies, and applications. I upgrade non-production environments first and validate workload behavior.

For worker upgrades, I create or update a new node group, cordon and drain old nodes gradually, respect PodDisruptionBudgets, and verify that replicas are healthy before continuing. I maintain spare capacity during the change and define rollback criteria.

For self-managed control planes, I preserve etcd snapshots and upgrade one control-plane node at a time within supported version-skew rules. Managed services reduce control-plane effort but not application validation.

## 23. How do you make an application highly available inside Kubernetes?

I design the application to be stateless where possible and deploy at least two or three replicas. Replicas are spread across nodes and zones. Readiness probes prevent traffic from reaching unhealthy pods, and rolling-update settings preserve available capacity.

I also configure:

- Horizontal Pod Autoscaler
- PodDisruptionBudget
- Resource requests and limits
- Graceful termination
- Retry with exponential backoff
- Connection draining
- Timeouts and circuit breakers
- External highly available database and object storage
- Observability and SLO alerts

Application HA fails if all replicas rely on one database, one storage path, one DNS server, or one external dependency without resilience.

## 24. What rolling-update settings do you use for critical services?

For a critical service, I commonly use a rolling update with a low `maxUnavailable`, often zero, and a controlled `maxSurge`, such as one additional replica or a percentage. The exact setting depends on capacity and startup time.

I add readiness gates, preStop hooks, sufficient termination grace period, and load-balancer deregistration time so in-flight requests can finish. The new version must become ready before old replicas are removed. For high-risk changes, canary or blue-green deployment is safer than a direct rolling update.

## 25. How do you handle node failure?

The node controller marks an unreachable node unhealthy, and pods are eventually rescheduled on healthy nodes. The recovery time depends on detection and eviction settings, storage attachment behavior, application startup, image availability, and spare capacity.

I reduce impact by running multiple replicas across nodes, maintaining capacity headroom, using local data only for disposable state, and monitoring node and pod health. Stateful applications need additional planning because volumes may take time to detach and reattach, and a storage-zone failure may block recovery.

## 26. How do you design storage HA for Kubernetes?

I first decide whether the state belongs inside the cluster. For enterprise databases, managed multi-zone services are often more reliable than self-hosted database pods.

For Kubernetes storage, I evaluate:

- Replication and failure-domain behavior
- ReadWriteOnce versus ReadWriteMany requirements
- Zone-aware provisioning
- Snapshot and backup support
- Recovery time for reattachment
- Performance and latency
- Data consistency
- Cross-region replication where needed

Storage HA, backup, and disaster recovery are separate concerns. Replication protects service continuity, while backup protects against corruption, deletion, and ransomware.

## 27. How do you design database availability for a Kubernetes application?

I usually place the primary database on a managed service such as Amazon Aurora/RDS Multi-AZ, Azure SQL, PostgreSQL Flexible Server, or Cloud SQL. This separates database lifecycle from cluster lifecycle and provides built-in replication, backups, patching, and failover.

The application uses connection pooling, timeouts, retry policies for transient failures, and secret rotation. I ensure the database connection limit is aligned with pod autoscaling; otherwise, scaling application replicas can exhaust database connections.

If a database must run inside Kubernetes, I use a proven Operator, anti-affinity, quorum design, persistent storage, backup, and tested failover—not a basic StatefulSet alone.

## 28. How do you manage autoscaling in an HA cluster?

I coordinate three scaling layers:

- **Horizontal Pod Autoscaler:** Changes pod replicas based on CPU, memory, or custom metrics.
- **Vertical Pod Autoscaler:** Recommends or adjusts resource requests.
- **Cluster Autoscaler or node auto-provisioning:** Adds or removes worker capacity.

Scaling policies must account for startup latency, downstream capacity, database connections, API quotas, and minimum replica counts. For event-driven workers, KEDA can scale from queue depth or other external metrics.

Autoscaling is not a substitute for capacity planning. Critical services require a safe minimum baseline even when traffic is low.

## 29. What is the role of graceful shutdown in Kubernetes HA?

When Kubernetes terminates a pod, the application must stop accepting new requests, complete or safely abandon in-flight work, close connections, and exit within the termination grace period.

I use a preStop hook or application signal handling, readiness transition, load-balancer connection draining, and an appropriate grace period. Background workers should acknowledge messages only after successful processing or support idempotent retry.

Without graceful termination, routine rolling updates can produce user-visible errors even when multiple replicas are available.

## 30. How do you prevent cascading failures?

I prevent cascading failure through isolation and controlled resource consumption:

- Timeouts on every remote call
- Bounded retries with exponential backoff and jitter
- Circuit breakers
- Bulkheads and separate worker pools
- Rate limiting and backpressure
- Queue-based asynchronous processing
- Resource limits and priority classes
- Dependency health monitoring
- Load shedding for non-critical work

Retries must be carefully designed. Unbounded retries can multiply traffic during an outage and make recovery harder.

## 31. What is multi-cluster Kubernetes architecture, and when is it justified?

A multi-cluster design uses separate Kubernetes clusters for stronger isolation, regional resilience, regulatory separation, or independent lifecycle management. Common patterns include separate clusters per environment, geography, business unit, or criticality tier.

It is justified when a single cluster would create an unacceptable blast radius or cannot meet latency and residency requirements. However, multi-cluster architecture increases deployment, identity, observability, networking, policy, and cost-management complexity.

I would use centralized GitOps and policy management, global traffic management, common observability, and a clear data replication strategy.

## 32. Active-active versus active-passive Kubernetes: how do you choose?

**Active-active** runs production capacity in multiple clusters or regions simultaneously. It provides lower failover time and can improve global latency, but requires traffic distribution, data conflict handling, and greater cost.

**Active-passive** keeps a secondary environment ready at a selected level—backup-and-restore, pilot light, or warm standby. It is simpler and cheaper but has a longer RTO.

The decision depends on business SLOs, data consistency, transaction behavior, regulatory constraints, and budget. I do not recommend active-active merely to make the architecture look advanced.

## 33. How do you back up and restore Kubernetes?

I back up both cluster resources and application data. Tools such as Velero can protect Kubernetes objects and coordinate volume snapshots, while databases need database-native consistent backups.

The recovery plan covers:

- Namespace and resource restoration
- Persistent volumes
- External databases
- Secret-manager references
- Container images and registries
- DNS and load-balancer configuration
- Infrastructure as code
- Encryption keys and certificates

I test restores into an isolated environment. A successful backup job does not prove that the service can be recovered.

---

# 3. Load Balancers, Ingress and Traffic Management

## 34. What is a load balancer?

A load balancer distributes traffic across healthy backend targets. It improves availability, scalability, maintenance flexibility, and fault isolation. Depending on the type, it can operate at Layer 4 using IP addresses and ports or Layer 7 using HTTP details such as host, path, header, method, and cookie.

A production design also considers health checks, TLS termination, connection draining, session behavior, source-IP requirements, logging, WAF integration, cross-zone behavior, and failure-domain placement.

## 35. Layer 4 versus Layer 7 load balancing: what is the difference?

A Layer-4 load balancer routes TCP or UDP connections based on network information. It is fast, protocol-agnostic, and suitable when the application must preserve end-to-end protocol behavior or use non-HTTP traffic.

A Layer-7 load balancer understands HTTP/HTTPS and can route using hostnames, paths, headers, query strings, or cookies. It can terminate TLS, redirect HTTP to HTTPS, integrate with WAF, and support application-aware policies.

I choose based on protocol, performance, routing complexity, static IP needs, client-IP requirements, and security controls.

## 36. What is Kubernetes Ingress?

Ingress is a Kubernetes API resource that defines external HTTP and HTTPS routing rules to services. An ingress controller such as NGINX Ingress, AWS Load Balancer Controller, Traefik, HAProxy, or an application gateway implementation watches these resources and configures the underlying proxy or cloud load balancer.

Ingress is not itself a load balancer. It is a desired-state configuration consumed by a controller. For newer, more expressive traffic management, Kubernetes Gateway API is increasingly preferable.

## 37. Ingress versus Gateway API: what is the difference?

Ingress provides basic HTTP routing but has limited extensibility and often depends on controller-specific annotations. Gateway API introduces explicit resources such as GatewayClass, Gateway, HTTPRoute, TCPRoute, and GRPCRoute.

It also separates responsibilities between infrastructure owners and application teams, supports richer routing, and improves portability. For a new enterprise platform, I would evaluate Gateway API first, provided the selected controller supports the required features and has operational maturity.

## 38. How does traffic reach a pod from the internet?

A typical path is:

1. DNS resolves the application hostname.
2. Traffic reaches a cloud or external load balancer.
3. The load balancer forwards to an ingress controller or Gateway implementation.
4. Routing rules select a Kubernetes Service.
5. The Service forwards to a ready pod endpoint.
6. The CNI and node networking deliver packets to the pod.

At each stage, I verify health checks, security groups or firewalls, service endpoints, readiness status, ingress rules, TLS certificates, and network policies.

## 39. What are AWS ALB, NLB and Gateway Load Balancer used for?

**Application Load Balancer** is a Layer-7 HTTP/HTTPS load balancer. I use it for host- and path-based routing, TLS termination, WebSocket, OIDC authentication, and WAF integration.

**Network Load Balancer** operates at Layer 4. I use it for TCP/UDP/TLS, static IP addresses, source-IP preservation, and high-throughput, low-latency workloads.

**Gateway Load Balancer** is designed to insert and scale virtual network appliances such as firewalls, intrusion prevention systems, and deep-packet inspection appliances into traffic paths.

## 40. What are the main Azure load-balancing services?

The main Azure services are:

- **Azure Load Balancer:** Regional Layer-4 load balancing for TCP and UDP.
- **Azure Application Gateway:** Regional Layer-7 routing, TLS termination, and Web Application Firewall.
- **Azure Front Door:** Global Layer-7 entry point, acceleration, WAF, and multi-region routing.
- **Traffic Manager:** DNS-based global traffic distribution.
- **Internal Load Balancer:** Private Layer-4 access inside a virtual network.

For AKS, I choose among these based on public versus private exposure, regional versus global scope, routing functionality, and security requirements.

## 41. What are the equivalent GCP traffic services?

Google Cloud provides global and regional Cloud Load Balancing services for HTTP(S), TCP proxy, SSL proxy, network passthrough, and internal traffic. Cloud Armor provides WAF and DDoS protections, while Cloud CDN accelerates content delivery.

Google's global external Application Load Balancer is particularly useful for globally distributed backends. For GKE, the Gateway or Ingress controllers provision and manage Google Cloud load-balancing resources from Kubernetes definitions.

## 42. When would you use NGINX Ingress instead of a cloud-native ingress controller?

I use NGINX Ingress when I need consistent behavior across clouds or on-premises environments, detailed proxy configuration, or features not conveniently exposed by the cloud-native controller.

I use a cloud-native controller when deep integration with managed load balancers, identities, WAF, certificates, and target registration reduces operational effort.

The trade-off is portability versus provider integration. I also consider controller lifecycle, performance, security updates, annotation complexity, and team familiarity.

## 43. How do health checks work across load balancers and Kubernetes?

There are usually two health layers:

- Kubernetes readiness decides whether a pod belongs in the Service endpoint set.
- The external load balancer checks the ingress controller, node, service, or pod target depending on integration mode.

These checks must align. A common failure occurs when the load balancer checks a path or port that differs from the application's readiness behavior. I define lightweight health endpoints, avoid dependency-heavy liveness checks, and confirm that deregistration timing matches pod termination behavior.

## 44. What is session affinity, and should you use it?

Session affinity, or sticky sessions, keeps a client mapped to the same backend using source IP or cookies. It can support legacy applications that store session state locally.

I prefer external session storage or stateless tokens so any replica can serve any request. Sticky sessions can create uneven load, complicate failover, and hide application design problems. I use them only where required and ensure failure behavior is understood.

## 45. How do you manage TLS certificates for Kubernetes applications?

I automate certificate issuance and renewal using a managed certificate service or cert-manager integrated with an approved certificate authority. Private applications may use an internal PKI, while public applications can use public certificates.

I decide where TLS terminates—global edge, cloud load balancer, ingress, service mesh, or application—and whether re-encryption or mutual TLS is required. Private keys are restricted, rotated, audited, and never embedded in images or source repositories.

## 46. How do you design global load balancing?

I use a global entry service such as Amazon Route 53 with CloudFront or Global Accelerator, Azure Front Door or Traffic Manager, or Google Cloud's global load balancer. Routing can be based on latency, geography, health, weight, or failover priority.

The data tier determines whether the design can truly be active-active. Stateless application routing is straightforward; transactional data replication and conflict resolution are not. DNS failover also depends on TTL and client caching, so it cannot guarantee instant failover.

## 47. How do you prevent load balancers from becoming a single point of failure?

Managed cloud load balancers are deployed across provider-managed infrastructure, but I still configure them across multiple availability zones, register targets in multiple zones, and monitor healthy target counts.

For self-managed proxies, I deploy multiple instances with a virtual IP, Layer-4 balancer, or DNS-based failover. I also protect configuration, automate deployment, test certificate renewal, and ensure the control path and data path are both resilient.

## 48. How do you troubleshoot a 502 or 503 from an ingress or load balancer?

I trace the request layer by layer:

1. DNS resolution and certificate validity
2. Load-balancer listener and routing rule
3. Target health and security rules
4. Ingress controller logs
5. Service selector and endpoint list
6. Pod readiness and application logs
7. Port and protocol alignment
8. Upstream timeout and connection limits
9. NetworkPolicy, firewall, or service mesh policy

A 502 generally indicates an invalid or failed upstream response. A 503 often indicates no healthy backend, unavailable service endpoints, overload, or maintenance state.

## 49. How do you route multiple applications through one ingress endpoint?

I use host-based routing such as `app.example.com` and `api.example.com`, path-based routing such as `/api` and `/portal`, or a combination. Each route points to a separate Kubernetes Service.

I define ownership, naming, certificate scope, rate limits, WAF rules, and deployment controls. Shared ingress reduces cost but increases blast radius. High-criticality or high-throughput applications may need dedicated ingress controllers or load balancers.

## 50. What is a service mesh, and does it replace an ingress controller?

A service mesh manages service-to-service traffic inside the platform. It can provide mutual TLS, retries, timeouts, traffic splitting, identity, and detailed telemetry through sidecars or node-level proxies.

An ingress controller primarily manages traffic entering the cluster. A mesh ingress gateway can perform that role, but a service mesh does not automatically remove the need for external load balancing or edge protection.

I introduce a service mesh only when its security and traffic-management value justifies the additional resource use and operational complexity.

---

# 4. Cloud Architecture

## 51. How do you approach a new cloud architecture?

I begin with business outcomes, users, transaction patterns, integrations, data classification, compliance, availability, latency, RTO, RPO, delivery timeline, and budget. I then create a current-state view and identify constraints.

The target architecture covers identity, account or subscription structure, network, compute, data, integration, security, observability, deployment, resilience, and cost governance. I document key decisions and alternatives, validate risky assumptions through focused proofs of concept, and define a phased migration or implementation roadmap.

## 52. What are the pillars of a well-architected cloud solution?

The recurring pillars are:

- Operational excellence
- Security
- Reliability
- Performance efficiency
- Cost optimization
- Sustainability

I also explicitly include governance, data management, compliance, and organizational readiness. Architecture quality is about balancing these concerns. Maximizing one dimension—such as availability—without considering cost and operational capability can produce an impractical design.

## 53. How do you design a cloud landing zone?

A landing zone establishes the controlled foundation for workloads. It includes:

- Organization, account, subscription, or project hierarchy
- Identity federation and privileged access
- Network topology and DNS
- Central logging and security monitoring
- Policy guardrails
- Encryption and key management
- Shared services
- Backup and DR standards
- Tagging and cost allocation
- Account or subscription vending

A landing zone should automate safe defaults while allowing controlled exceptions through governance rather than manual configuration drift.

## 54. Hub-and-spoke versus mesh networking: which do you prefer?

Hub-and-spoke centralizes shared connectivity, inspection, DNS, egress, and hybrid links in a hub, while application networks remain isolated spokes. It simplifies governance and is my default for many enterprises.

A full mesh provides direct connectivity but becomes difficult to manage as networks grow. At scale, I use cloud transit services such as AWS Transit Gateway, Azure Virtual WAN or hub virtual networks, and GCP Network Connectivity Center.

The design must avoid turning the hub into a throughput bottleneck or a single operational failure domain.

## 55. How do you choose between virtual machines, containers and serverless?

I choose based on workload characteristics:

- **Virtual machines:** Legacy software, custom operating-system needs, strong isolation, or applications unsuitable for containers.
- **Containers:** Portable services, consistent packaging, independent scaling, and long-running workloads.
- **Serverless functions:** Event-driven, short-duration, bursty work with minimal infrastructure management.
- **Managed application platforms:** Standard web/API workloads where speed and simplicity matter more than low-level control.

The correct answer is usually a combination. I avoid forcing every workload into Kubernetes or serverless.

## 56. How do you design for multi-zone availability?

I distribute stateless compute, load-balancer targets, and managed data services across availability zones. I remove zone-specific dependencies, use zone-aware storage, and ensure autoscaling can place capacity in healthy zones.

I also test what happens when an entire zone becomes unavailable. Some services are technically multi-zone but may still suffer capacity, quota, or connection issues during failover. Application connection handling and operational runbooks are part of the architecture.

## 57. How do you design cloud disaster recovery?

I classify workloads by business impact and assign RTO and RPO. I then choose among:

- Backup and restore
- Pilot light
- Warm standby
- Multi-region active-passive
- Multi-region active-active

Infrastructure is reproducible through code. Data replication, backup immutability, secret recovery, DNS failover, external integration dependencies, and operational access are all covered. I schedule recovery exercises and measure actual recovery, not theoretical recovery.

## 58. How do you secure a public cloud application?

I apply defense in depth:

- Edge protection with CDN, DDoS protection, and WAF
- Strong authentication and authorization
- Private application and data subnets
- Least-privilege workload identities
- Encryption and managed secrets
- Secure software supply chain
- Network segmentation and controlled egress
- Centralized logs and detection
- Vulnerability and configuration management
- Backup, incident response, and auditability

I also include application security controls such as input validation, secure headers, rate limiting, session management, and protection against common API threats.

## 59. How do you architect hybrid cloud connectivity?

I first define bandwidth, latency, availability, encryption, routing, and failover requirements. Site-to-site VPN can be used initially or as backup. Dedicated circuits such as AWS Direct Connect, Azure ExpressRoute, or Cloud Interconnect provide more predictable private connectivity.

I design redundant circuits through separate devices and locations, dynamic routing using BGP, centralized DNS resolution, IP address planning, traffic inspection, and clear route ownership. Hybrid identity and monitoring are equally important; connectivity alone does not create a usable hybrid platform.

## 60. How do you approach cloud migration?

I inventory applications, dependencies, data, users, infrastructure, licensing, compliance, and business criticality. I classify each workload using strategies such as rehost, replatform, refactor, repurchase, retain, retire, or relocate.

I create migration waves, establish the landing zone and connectivity first, automate deployment, define data synchronization and cutover, validate performance and security, and retain rollback options. A migration is complete only after operational ownership, monitoring, backup, cost controls, and decommissioning are addressed.

## 61. How do you avoid cloud vendor lock-in?

I avoid unnecessary lock-in, not all lock-in. Managed services often provide substantial business value. I document where provider-specific features are used and what an exit would cost.

Practical controls include portable data formats, API abstraction at genuine substitution points, containers for suitable workloads, infrastructure as code, externalized business logic, and tested export procedures. Building every component to run identically on three clouds usually creates a costly lowest-common-denominator platform.

## 62. How do you design observability?

I implement logs, metrics, traces, events, and user-experience monitoring with consistent correlation IDs. Dashboards are aligned to service-level indicators such as availability, latency, errors, throughput, queue depth, and dependency health.

Alerts should be actionable and tied to business impact, not every infrastructure fluctuation. I define ownership, escalation, retention, privacy controls, and runbooks. For distributed systems, tracing and structured logging are essential to follow a request across services.

## 63. What is an SLI, SLO and SLA?

An **SLI** is a measured indicator such as successful request percentage or 95th-percentile latency.

An **SLO** is the internal reliability target, such as 99.9% successful requests per month.

An **SLA** is the external or contractual commitment and may include financial consequences.

I use SLOs and error budgets to balance reliability and delivery speed. A service without an agreed reliability target either gets overengineered or fails business expectations.

## 64. How do you optimize cloud cost?

I establish cost ownership first through accounts, subscriptions, tags, budgets, and showback or chargeback. Then I optimize:

- Rightsizing
- Autoscaling
- Commitment discounts for stable demand
- Interruptible capacity for tolerant workloads
- Storage lifecycle and archival
- Managed service tier selection
- Data-transfer paths
- Logging retention
- Non-production scheduling
- License optimization

I assess cost per business transaction or user, not just the monthly bill. Cost reduction that violates SLOs or creates excessive operational risk is not optimization.

## 65. How do you design a multi-tenant cloud platform?

I identify the required isolation level. Options include shared application and database with tenant keys, separate schemas, separate databases, separate namespaces, or separate cloud accounts and clusters.

The architecture propagates tenant identity through every request and applies it at authentication, authorization, data access, caches, queues, logs, encryption, and billing. I include noisy-neighbor controls, tenant quotas, tenant-aware observability, and automated onboarding and offboarding.

For regulated or high-value tenants, stronger physical or account-level isolation may be required.

## 66. How do you manage cloud governance without blocking delivery?

I convert governance requirements into automated paved roads. Teams receive approved templates, modules, pipelines, base images, policies, and service catalogs. Policy-as-code blocks high-risk configurations early, while lower-risk findings can be reported and remediated.

Exceptions have owners, business justification, expiry dates, and compensating controls. The platform team measures adoption and lead time. Governance becomes effective when the secure path is also the easiest path.

## 67. What is your approach to infrastructure as code?

Infrastructure as code makes environments reproducible, reviewable, and testable. I use modular Terraform, CloudFormation, Bicep, or equivalent native tools depending on organizational standards.

I keep state protected, separate environments, run validation and security scanning, require peer review, and deploy through controlled pipelines. Manual production changes are either prohibited or detected and reconciled. Modules must be versioned and designed with clear inputs, outputs, and upgrade paths.

## 68. How do you design cloud architecture for regulated workloads?

I map regulations and organizational policies to technical controls. The architecture addresses data residency, classification, encryption, retention, access review, privileged administration, immutable audit logs, segregation of duties, vulnerability management, incident response, and third-party risk.

I maintain control evidence through automated configuration records and logs. Compliance is not just a document exercise; the platform must continuously demonstrate that controls remain effective.

---

# 5. Solution and Enterprise Architecture

## 69. What is the role of a Solution Architect?

A Solution Architect converts business objectives and requirements into an implementable end-to-end design. The role spans applications, data, integration, security, infrastructure, operations, cost, and delivery constraints.

The architect evaluates options, makes trade-offs explicit, aligns stakeholders, supports engineering teams, and protects architectural integrity through implementation. The role is not limited to producing diagrams; it includes validating assumptions, resolving design risks, and ensuring that the delivered solution meets functional and non-functional requirements.

## 70. What is the difference between a Solution Architect, Enterprise Architect and Cloud Architect?

A **Solution Architect** focuses on a specific business solution or programme and owns its end-to-end design.

An **Enterprise Architect** defines broader business and technology target states, principles, roadmaps, capability models, and portfolio alignment across the organization.

A **Cloud Architect** specializes in cloud platform design, landing zones, networking, security, resilience, migration, and cloud-native patterns.

In practice, senior roles overlap. I maintain solution-level accountability while ensuring the design aligns with enterprise principles and cloud platform standards.

## 71. How do you gather architecture requirements?

I conduct workshops with business, product, engineering, security, operations, data, and compliance stakeholders. I capture:

- Business outcomes and success measures
- User journeys and functional capabilities
- Transaction and data volumes
- Integrations and dependencies
- Security and compliance
- Availability, performance, scalability, RTO, and RPO
- Budget, timeline, skills, and technology constraints

I convert ambiguous statements into measurable requirements. For example, “the system must be fast” becomes a latency target at a defined load and percentile.

## 72. What are functional and non-functional requirements?

Functional requirements describe what the system must do: user registration, payment, content upload, invoice reconciliation, or policy search.

Non-functional requirements describe how well and under what constraints it must operate: availability, performance, scalability, security, accessibility, maintainability, recoverability, auditability, and cost.

Many failed systems meet functional requirements but fail production because non-functional requirements were not quantified or tested.

## 73. How do you make and document architecture decisions?

I use Architecture Decision Records. Each record contains the context, decision drivers, considered options, selected option, rationale, consequences, assumptions, and review date.

I evaluate options against business value, risk, security, reliability, cost, delivery time, operational skills, portability, and future change. This creates traceability and prevents teams from repeatedly reopening decisions without new evidence.

## 74. How do you balance ideal architecture and delivery deadlines?

I identify which controls are mandatory for safety, compliance, data integrity, and operability, and which improvements can be phased. I define a minimum viable architecture that has a credible path to the target state.

I do not trade away critical security, backup, audit, or recoverability merely to meet a date. For lower-risk capabilities, I document technical debt with owners and deadlines. The objective is controlled evolution, not perfection or reckless shortcuts.

## 75. How do you communicate architecture to technical and non-technical stakeholders?

I use different views for different audiences. Executives need business outcomes, risk, cost, roadmap, and key decisions. Engineering teams need component, sequence, deployment, data, security, and failure-mode detail. Operations teams need observability, support, recovery, and ownership views.

I avoid unexplained jargon and use scenarios to show how the system behaves. A good architecture document enables decisions and implementation; it is not judged by the number of boxes in the diagram.

## 76. How do you conduct an architecture review?

I first confirm the business context and non-functional requirements. Then I review application boundaries, data flow, integration, identity, security, failure modes, scaling, observability, deployment, backup, DR, cost, and operational ownership.

I ask for evidence behind capacity and availability assumptions. Findings are classified by severity, with clear recommendations and owners. The review should improve the solution collaboratively rather than function as a late-stage approval gate.

## 77. How do you handle disagreement between architects and engineering teams?

I bring the discussion back to requirements, constraints, and measurable decision criteria. I ask engineering teams to explain implementation complexity and operational impact, and I explain the business and risk drivers behind architectural controls.

Where uncertainty remains, I use a focused prototype, benchmark, threat model, or cost model. I document the decision and consequences. Architecture authority should come from evidence and accountability, not job title.

## 78. What is your approach to API architecture?

I design APIs around stable business capabilities rather than database tables. I define clear contracts, versioning, authentication, authorization, idempotency, pagination, error models, rate limits, timeouts, and observability.

I use synchronous APIs for immediate interactions and asynchronous messaging where operations are long-running, bursty, or require loose coupling. Public and partner APIs receive stronger lifecycle management, documentation, quotas, and backward-compatibility controls.

## 79. When do you choose synchronous versus asynchronous integration?

I use synchronous integration when the caller requires an immediate result and the dependency can meet the latency and availability requirement.

I use asynchronous messaging for long-running work, workload buffering, event distribution, resilience to temporary outages, and decoupled scaling. The design then requires idempotency, message ordering decisions, retry and dead-letter handling, correlation, and eventual-consistency awareness.

A common anti-pattern is building a long chain of synchronous services where one slow dependency causes an end-to-end outage.

## 80. How do you design an event-driven architecture?

I define meaningful business events, ownership, schemas, versioning, delivery guarantees, ordering needs, retention, and consumer responsibilities. Producers should not need to know every consumer.

Consumers are idempotent because most platforms provide at-least-once delivery. I use dead-letter handling, replay procedures, schema governance, correlation IDs, and observability. I distinguish notification events from events that contain sufficient state for independent processing.

## 81. How do you prevent a microservices architecture from becoming a distributed monolith?

I define services around business capabilities with clear data ownership. Services communicate through explicit contracts and can be deployed independently. I avoid shared databases, chatty synchronous calls, coordinated releases, and circular dependencies.

I also recognize that microservices are not automatically better. A modular monolith can be the correct starting point when the domain, team structure, and scale do not justify distributed-system complexity.

## 82. How do you approach data architecture within a solution?

I identify system-of-record ownership, transactional and analytical needs, data classification, lifecycle, quality, lineage, retention, and access patterns. I select storage based on workload rather than forcing every use case into one database.

For analytical platforms, I may use raw, processed, and curated data zones, metadata cataloging, quality controls, and governed consumption. For operational systems, I prioritize consistency, transaction behavior, indexes, backup, and recovery. Data ownership and governance remain explicit across integration boundaries.

## 83. How do you include security in solution architecture?

I use threat modeling early and identify assets, trust boundaries, actors, attack paths, and controls. Identity is the primary perimeter, supported by least privilege, network segmentation, encryption, secrets management, secure APIs, supply-chain controls, monitoring, and incident response.

I work with security teams during design instead of requesting approval just before release. Security requirements become testable acceptance criteria in the delivery backlog.

## 84. How do you evaluate build versus buy?

I compare strategic differentiation, functional fit, integration, customization, data control, security, compliance, scalability, vendor viability, licensing, implementation effort, operational cost, and exit strategy.

I buy commodity capability when a mature service meets requirements and does not create unacceptable dependency. I build capabilities that differentiate the business or require specialized control. The comparison uses total cost and risk over the expected lifecycle, not only the initial license or development price.

## 85. How do you manage technical debt?

I make technical debt visible and categorize it by security, reliability, scalability, maintainability, and delivery impact. Each debt item has an owner, consequence, remediation approach, and priority.

Some debt is deliberate and acceptable for a limited period. Hidden debt is dangerous. I reserve roadmap capacity for remediation and use incident data, change failure rate, and delivery delays to demonstrate its business cost.

## 86. How do you design for maintainability and operability?

I standardize deployment, configuration, logging, metrics, health checks, alerting, ownership labels, and runbooks. Components should have clear boundaries and documented contracts. I reduce unnecessary technology diversity and prefer managed services where they lower undifferentiated operational work.

Before launch, I confirm who supports the system, how incidents are diagnosed, how changes are rolled back, how data is restored, and how capacity is monitored. A design that only the original development team can operate is not enterprise-ready.

## 87. How do you measure whether an architecture is successful?

I link architecture outcomes to measurable indicators:

- Availability and latency SLO attainment
- Deployment frequency and change failure rate
- Recovery time
- Security findings and incident rates
- Cost per transaction or user
- Capacity and scaling behavior
- User adoption and business process improvement
- Operational workload and support tickets

Architecture is successful when it enables business outcomes sustainably, not simply when the implementation matches the original diagram.

## 88. Describe your architecture approach using one of your projects.

For the multi-tenant LMS, I began with user scale, university tenancy, security, content delivery, assessment, video conferencing, deployment, and DR requirements. The solution used a Kubernetes-based application platform, CI/CD, PostgreSQL, object storage, ingress, monitoring, and environment separation.

The architecture work included capacity sizing, tenant isolation, secure traffic management, release processes, security remediation, backup and DR planning, and coordination across application, infrastructure, testing, and customer teams. The important lesson was that platform architecture and operating model had to evolve together; technology alone could not provide reliability.

---

# 6. Scenario-Based Architecture Questions

## 89. A Kubernetes application is running, but users receive intermittent 503 errors. How would you investigate?

I would correlate the error time with ingress, load-balancer, service, pod, and node metrics. I would check:

1. Healthy target counts on the load balancer
2. Ingress controller error and upstream logs
3. Kubernetes Service endpoints
4. Readiness probe failures
5. Pod restarts, CPU throttling, memory pressure, and OOM events
6. HPA scaling delay
7. Node pressure or zone imbalance
8. Application connection pools and downstream database limits
9. Timeout and keep-alive settings
10. NetworkPolicy or service mesh errors

Intermittent 503s often result from readiness instability, no available endpoints during rollout, capacity saturation, or backend connection exhaustion.

## 90. One availability zone fails. What should happen in a well-designed Kubernetes platform?

Traffic management should stop routing to unhealthy targets. Application replicas in other zones should continue serving traffic. Failed pods should be recreated where capacity and storage allow. Autoscaling should add replacement capacity if necessary.

The data tier must remain available through multi-zone replication or failover. Monitoring should generate a meaningful incident alert. The system may operate with reduced redundancy, so the operations team must avoid risky changes until the failed zone recovers.

This scenario must be tested. Simply distributing nodes across zones does not prove the application will survive a zone failure.

## 91. A deployment causes downtime despite having three replicas. What could be wrong?

Possible causes include:

- `maxUnavailable` allowed too many old pods to stop
- New pods became “ready” before they were actually usable
- All replicas were scheduled on one node or zone
- The load balancer had slow target registration
- The application did not shut down gracefully
- A database migration was incompatible with the old version
- The cluster lacked capacity for surge pods
- Session state was stored locally
- The new version failed under real traffic

I would correct the rollout strategy, probes, topology rules, connection draining, capacity headroom, and deployment compatibility process.

## 92. The HPA creates more pods, but performance becomes worse. Why?

Scaling the application may overload a constrained dependency such as a database, external API, storage system, or message broker. More pods can also increase connection counts, cache misses, lock contention, and network traffic.

I would inspect end-to-end saturation metrics, database connections, queue depth, latency, throttling, and error rates. Scaling must be coordinated across the complete service chain. Sometimes the correct response is backpressure, caching, query optimization, or a hard maximum replica count—not unlimited pod creation.

## 93. How would you expose a private AKS or EKS application to selected corporate users?

I would keep cluster nodes and application endpoints private, connect the corporate network using VPN or dedicated private connectivity, and expose the application through an internal load balancer or private application gateway.

DNS would resolve privately, authentication would use the enterprise identity provider, and network rules would restrict permitted source networks. For browser access without full network extension, a zero-trust access proxy can be considered. Public IP exposure would not be the default merely for convenience.

## 94. How would you migrate a VM-based application to Kubernetes?

I would first assess whether Kubernetes is justified. I would identify process boundaries, state, local filesystem use, ports, dependencies, startup behavior, resource consumption, and operational scripts.

The migration sequence would include containerization, externalizing configuration and state, defining health checks, creating CI/CD, testing locally and in non-production, sizing resources, establishing observability, and designing ingress and persistence. I might initially move the application as a single containerized unit and decompose it later rather than combining migration with a risky full rewrite.

## 95. How would you design a public API platform for unpredictable traffic?

I would place DNS, CDN where relevant, DDoS protection, WAF, and an API gateway at the edge. Stateless services would run on autoscaling containers or serverless compute. Rate limits, quotas, authentication, idempotency, caching, and asynchronous queues would absorb bursts.

The data tier would use scalable managed services with controlled connection pooling. I would define SLOs, load-test burst scenarios, use multi-zone deployment, and implement cost guardrails so autoscaling does not create uncontrolled spend.

## 96. How would you design an HA LMS platform for one million learners?

I would use a multi-zone Kubernetes or managed container platform with separate node pools for web APIs, background workers, and system services. Static and media content would be served through object storage and CDN rather than application pods.

The database would use a managed multi-zone relational service with read scaling where suitable. Queues would decouple heavy content processing. Redis or an equivalent managed cache could handle sessions and high-read data. Ingress, WAF, autoscaling, observability, backup, and a tested DR environment would be mandatory.

Multi-tenancy would be enforced in identity, application logic, data access, storage paths, and operational reporting.

## 97. A customer asks for active-active across two regions. What questions would you ask?

I would ask:

- What RTO and RPO require active-active?
- Can users be pinned to a home region?
- Which data requires strong consistency?
- How are write conflicts resolved?
- Are all external dependencies available in both regions?
- What latency is acceptable?
- What happens during network partition?
- How will deployments and schema changes be coordinated?
- Is the customer prepared for the operational and cost increase?

Often the correct solution is active-active for stateless services and carefully selected active-passive or single-writer patterns for transactional data.

## 98. How would you troubleshoot pods stuck in Pending state?

I would inspect pod events and scheduler messages. Typical causes include:

- Insufficient CPU or memory
- Node selector or affinity mismatch
- Untolerated taint
- Unbound persistent volume
- Zone restriction
- GPU resource unavailable
- PodDisruptionBudget or autoscaler constraints
- Maximum pod density or IP exhaustion
- ResourceQuota violation

I would fix the underlying capacity or scheduling constraint rather than manually forcing placement.

## 99. How would you handle a database schema change during a zero-downtime deployment?

I would use an expand-and-contract pattern. First, introduce backward-compatible schema additions. Deploy application code that can operate with both old and new structures. Migrate or backfill data safely. Then move reads and writes to the new structure. Only after all old application versions are removed do I delete obsolete columns or constraints.

Long-running migrations are separated from pod startup. I monitor locks, replication lag, and transaction impact, and maintain a rollback path.

## 100. A cloud bill doubles after moving to Kubernetes. What would you examine?

I would inspect:

- Overprovisioned node groups
- Inflated pod requests
- Low node utilization due to scheduling constraints
- Unused load balancers and public IPs
- NAT Gateway or egress charges
- Cross-zone and cross-region traffic
- Excessive logs and metrics
- Persistent orphaned volumes and snapshots
- Non-production clusters running continuously
- GPU nodes left idle
- Missing autoscaler consolidation

Kubernetes can improve utilization, but poor requests, fragmented node pools, and unmanaged platform add-ons can make it more expensive than simpler hosting options.

---

# 7. Rapid-Fire Questions

## What is Kubernetes HA?

Redundant control plane, quorum-protected etcd, multi-zone worker capacity, distributed application replicas, resilient data services, health-aware traffic routing, and tested recovery procedures.

## Why use three control-plane nodes?

Three nodes allow etcd to maintain majority quorum after one member fails and allow redundant API servers and controllers.

## Does a Deployment guarantee high availability?

No. Replicas can still run on one node or zone, depend on one database, or all become unavailable during a bad rollout. HA requires topology, capacity, data, traffic, and operational controls.

## What does a readiness probe do?

It removes an unhealthy or unready pod from Service endpoints so it stops receiving traffic without necessarily restarting it.

## What does a liveness probe do?

It tells Kubernetes when a stuck container should be restarted.

## What is a PodDisruptionBudget?

A policy limiting voluntary disruption so maintenance or upgrades do not evict too many replicas simultaneously.

## What is the difference between ClusterIP and LoadBalancer?

ClusterIP exposes a service only inside the cluster. LoadBalancer asks the underlying platform to create an externally or internally reachable cloud load balancer.

## What is ingress?

A Kubernetes routing definition for incoming HTTP/HTTPS traffic, implemented by an ingress controller.

## ALB versus NLB?

ALB provides Layer-7 HTTP routing and WAF integration. NLB provides high-performance Layer-4 TCP/UDP/TLS routing, static IPs, and source-IP preservation.

## Azure Front Door versus Application Gateway?

Front Door is a global Layer-7 edge and multi-region routing service. Application Gateway is a regional Layer-7 load balancer and WAF inside or connected to an Azure virtual network.

## What is graceful termination?

Stopping new traffic, completing in-flight work, closing connections, and exiting safely when a pod is terminated.

## What is topology spread?

Scheduler rules that distribute replicas across nodes or availability zones to reduce correlated failure.

## What is an error budget?

The amount of unreliability permitted by an SLO. It helps balance reliability work with release velocity.

## What is RTO?

The maximum acceptable time to restore a service after disruption.

## What is RPO?

The maximum acceptable amount of data loss measured in time.

## What is a circuit breaker?

A pattern that temporarily stops calls to a failing dependency to prevent resource exhaustion and cascading failure.

## What is backpressure?

A mechanism that slows or rejects incoming work when downstream systems cannot safely process it.

## What is GitOps?

An operating model where Git stores the desired state and an automated controller reconciles the runtime environment to that state.

## What is a landing zone?

A governed cloud foundation containing identity, accounts or subscriptions, network, logging, security, policy, shared services, and cost controls.

## What is an ADR?

An Architecture Decision Record documenting the context, options, decision, rationale, and consequences of an important technical choice.

---

# Closing Positioning Statement

My architecture approach is to start with the business outcome and measurable non-functional requirements, then design the application, platform, data, security, integration, operations, and cost model as one system. In Kubernetes, high availability is not simply multiple replicas. It requires failure-domain distribution, resilient traffic management, reliable data services, controlled deployment, observability, and tested recovery.

My strongest practical examples come from Kubernetes-based LMS platforms, AWS infrastructure and migration, DevSecOps, edge AI, data and RAG architecture, and customer-facing solution design. I focus on designs that engineering teams can implement and operations teams can support, rather than architecture that only looks complete in a diagram.

---

**Prashant Yadav**  
Senior Solutions Architect | Cloud | Kubernetes | Data | AI Architecture
