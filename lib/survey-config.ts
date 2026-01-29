export type ChartType = "bar" | "horizontal-bar" | "pie" | "wordcloud" | "citations" | "tags"

export interface SurveyQuestion {
  key: string
  title: string
  description: string
  chartType: ChartType
  showCounts?: boolean
}

export interface Category {
  id: string
  title: string
  shortTitle: string
  description: string
  icon: string
  dataFile: string
  questions: SurveyQuestion[]
}

export const SURVEY_YEARS = ["2024-2025", "2025-2026"] as const
export type SurveyYear = (typeof SURVEY_YEARS)[number]

export function isValidSurveyYear(year: string): year is SurveyYear {
  return SURVEY_YEARS.includes(year as SurveyYear)
}

export const categories: Category[] = [
  {
    id: "community",
    title: "DataTalks.Club Community Involvement",
    shortTitle: "Community",
    description: "Awareness and participation in DataTalks.Club activities and courses.",
    icon: "users",
    dataFile: "survey2026_dtc_interaction_stats.json",
    questions: [
      {
        key: "if_datatalksclub_had_any_impact_on_you_what_should_we_know_about_it_main_impact_categories",
        title: "How DataTalks.Club Has Impacted Members",
        description: "51% say they got more confident, and 46% learned practical production skills. Career growth (34%), community connections (29%), and better learning focus (26%) are also big wins.",
        chartType: "tags",
      },
      {
        key: "if_datatalksclub_had_any_impact_on_you_what_should_we_know_about_it_skills_domains_learned",
        title: "Skills & Domains Members Have Learned Through DataTalks.Club",
        description: "49% learned Data Engineering, then ML (31%) and MLOps (29%). AI/LLMs and production practices (both 17%) show people are picking up the latest stuff.",
        chartType: "horizontal-bar",
      },
      {
        key: "if_datatalksclub_had_any_impact_on_you_what_should_we_know_about_it_tools_technologies_mentioned",
        title: "Tools & Technologies Members Learned Through DataTalks.Club",
        description: "Docker (17%) is the most mentioned, then Airflow and Terraform (both 11%). dbt (9%) and PySpark (6%) show people are learning the modern data stack.",
        chartType: "tags",
      },
      {
        key: "if_datatalksclub_had_any_impact_on_you_what_should_we_know_about_it_unique_high_signal_outcomes",
        title: "Notable Achievements & Career Outcomes",
        description: "Some people did really cool stuff, like career transformations (9%), freelance/professional wins (6%), and even publishing books (3%).",
        chartType: "horizontal-bar",
      },
      {
        key: "if_datatalksclub_had_any_impact_on_you_what_should_we_know_about_it_direct_citations_verbatim",
        title: "Member Testimonials: Direct Quotes About DataTalks.Club Impact",
        description: "Real quotes from people about how DataTalks.Club changed their learning, boosted their confidence, and helped them get hands-on with new tech.",
        chartType: "citations",
      },
      {
        key: "which_of_the_following_community_activities_are_you_aware_of_select_all_that_apply",
        title: "Awareness of Community Activities",
        description: "93% know about our courses,we're basically an education platform. Webinars (72%) and workshops (64%) are also popular. We've got podcasts, competitions, and more, but the specialized stuff is less well-known.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_datatalksclub_activities_have_you_personally_participated_in_select_all_that_apply",
        title: "Participation in Community Activities",
        description: "78% of people who know about us actually joined in. Courses are the most popular (78%), then webinars (44%) and workshops (33%).",
        chartType: "horizontal-bar",
      },
      {
        key: "have_you_taken_any_of_the_following_courses_offered_by_the_community_select_all_that_apply",
        title: "Course Participation",
        description: "65% took Data Engineering Zoomcamp, our most popular course. ML Engineering (46%) is next, then AI Dev Tools (28%), MLOps (26%), and LLM (26%).",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_plan_to_take_any_of_these_courses_in_the_next_year_select_all_that_apply",
        title: "Planned Course Participation",
        description: "48% plan to take Data Engineering Zoomcamp next year, with LLM Zoomcamp (38%) and AI Dev Tools (37%) also popular. People are still interested.",
        chartType: "horizontal-bar",
      },
    ],
  },
  {
    id: "ml-mlops",
    title: "Machine Learning & MLOps",
    shortTitle: "ML & MLOps",
    description: "Tools, practices, and challenges in ML engineering and operations.",
    icon: "cpu",
    dataFile: "survey2026_ml_mlops_stats.json",
    questions: [
      {
        key: "how_many_ml_models_do_you_currently_have_in_production",
        title: "How many ML models do you currently have in production?",
        description: "45% have 2–5 models and 21% have 5+, so about two-thirds have multiple models in production. 17% have none and 17% have just one; plenty of teams are still in early or experimental mode.",
        chartType: "bar",
      },
      {
        key: "which_tools_do_you_use_for_deploying_ml_models_select_all_that_apply",
        title: "Which tools do you use for deploying ML models?",
        description: "Azure ML (34%) and Kubernetes (31%) lead, with AWS SageMaker (28%) close behind. 17% don't deploy models at all. Cloud platforms and K8s are the go-to; TensorFlow Serving, MLflow, and Databricks show up but at lower rates.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_use_any_tools_to_monitor_ml_models_in_production_select_all_that_apply",
        title: "Do you use any tools to monitor ML models in production?",
        description: "37% use Prometheus and Grafana,the classic observability stack. 30% don't monitor models at all, which is risky. Custom scripts (22%) and ELK (15%) are common; Evidently and WhyLabs are used by a smaller slice.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_tools_do_you_use_for_model_training_and_experimentation",
        title: "Which tools do you use for model training and experimentation?",
        description: "MLflow dominates at 61%,it's the default for experiment tracking. 32% don't use dedicated tools (notebooks and scripts instead). TensorBoard, W&B, Kubeflow, and framework-specific setups show up at lower percentages.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_tools_do_you_use_for_model_or_data_versioning_select_all_that_apply",
        title: "Which tools do you use for model or data versioning?",
        description: "MLflow again leads at 65%; it's the standard for model and experiment versioning. 35% don't use versioning tools. Git and DVC are used by a small share,versioning is still under-adopted compared to training tools.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_workflow_orchestration_tools_do_you_use_for_ml_pipelines_select_all_that_apply",
        title: "Which workflow orchestration tools do you use for ML pipelines?",
        description: "Airflow is on top at 58%,it's the default for pipeline orchestration. 23% don't use orchestration tools. Prefect (15%) and Dagster (12%) are next; Kestra, Kubeflow, and AWS Step Functions also appear.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_cicd_tools_do_you_use_for_ml_workflows_select_all_that_apply",
        title: "Which CI/CD tools do you use for ML workflows?",
        description: "GitLab CI/CD leads at 50%, with MLflow (32%) often used in the ML loop. 25% don't use CI/CD for ML. GitHub Actions (14%) and Jenkins (7%) are the other common options,ML CI/CD is still catching on.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_use_any_feature_stores_select_all_that_apply",
        title: "Do you use any feature stores?",
        description: "63% don't use feature stores,they're not mainstream yet. Among those who do, AWS SageMaker (17%), Databricks (13%), and Vertex AI (13%) lead. Custom and Feast show up at low percentages.",
        chartType: "horizontal-bar",
      },
      {
        key: "how_often_do_you_retrain_your_models_in_production",
        title: "How often do you retrain your models in production?",
        description: "48% don't retrain,models are often deployed and left as-is. 28% retrain when performance drops and 20% on a schedule (weekly, monthly). Only 4% do continuous/online learning. Retraining is a clear gap for many teams.",
        chartType: "bar",
      },
      {
        key: "where_do_you_run_your_ml_workloads_select_all_that_apply",
        title: "Where do you run your ML workloads?",
        description: "AWS (46%) and Azure (38%) are the top clouds; 38% also use on-prem. GCP is at 19%. Many use a mix of cloud and on-prem, hybrid and multi-cloud are common for ML.",
        chartType: "horizontal-bar",
      },
      {
        key: "how_many_people_are_in_your_ml_teams",
        title: "How many people are in your ML team(s)?",
        description: "Most teams are small: 48% have 1–5 people and 30% have 6–10. 7% have no dedicated ML team (0). Larger teams (21–50, 51+) are a minority, ML is often owned by small, focused groups.",
        chartType: "bar",
      },
      {
        key: "do_you_have_a_centralized_mlops_team",
        title: "Do you have a centralized MLOps team?",
        description: "68% don't have a dedicated MLOps team,ML and MLOps are usually embedded in product or data teams. The 32% with a centralized team are often bigger orgs that have invested in MLOps as a function.",
        chartType: "pie",
      },
      {
        key: "how_would_you_describe_your_mlops_maturity",
        title: "How would you describe your MLOps maturity?",
        description: "33% have standardized deployment and monitoring; 30% have some production models and 30% are mostly manual or experiments-only. Only 7% mention advanced MLOps (CI/CD, automated retraining, clear ownership). Maturity is spread out, no single dominant stage.",
        chartType: "bar",
      },
      {
        key: "for_the_mlmlops_tools_you_use_how_would_you_describe_their_role",
        title: "For the ML/MLOps tools you use, how would you describe their role?",
        description: "36% say experimental/pilot only; 32% use them regularly but not critically, and 32% say they're mission-critical. It's an even split,tools are either critical or still in exploration for most teams.",
        chartType: "bar",
      },
      {
        key: "which_ml_or_mlops_tools_do_you_plan_to_adopt_or_expand_in_the_next_12_months",
        title: "Which ML or MLOps tools do you plan to adopt or expand in the next 12 months?",
        description: "Plans are fragmented, each option is ~8% (only 12 respondents). MLflow, Airflow, Prefect, Kestra, Feast, Kubeflow, Azure ML, W&B, and CI/CD come up. People are still exploring; no single tool dominates the roadmap.",
        chartType: "tags",
      },
      {
        key: "what_are_your_biggest_challenges_in_ml_engineering_and_mlops_select_all_that_apply",
        title: "What are your biggest challenges in ML engineering and MLOps?",
        description: "Deployment complexity (69%) and lack of skills (54%) are the top two. Monitoring (46%), data quality (35%), and scaling pipelines (35%) follow. Integration (31%), compliance (27%), and cost (23%) round it out, getting models live and keeping them healthy is the main pain.",
        chartType: "tags",
      },
    ],
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    shortTitle: "Data Engineering",
    description: "Cloud platforms, tools, and challenges in data engineering workflows.",
    icon: "database",
    dataFile: "survey2026_data_engineering_stats.json",
    questions: [
      {
        key: "do_you_work_with_data_engineering_tools_or_practices",
        title: "Working with Data Engineering Tools",
        description: "Everyone's doing data engineering, it's the foundation for analytics, ML, and BI. No real split here; data work is table stakes for most teams.",
        chartType: "pie",
      },
      {
        key: "which_data_storage_solutions_do_you_use_select_all_that_apply",
        title: "Which data storage solutions do you use? (Select all that apply)",
        description: "Relational databases lead at 76%, Postgres, MySQL, etc. are everywhere. Data lakes (65%) and warehouses (57%) are next; 30% use lakehouses. NoSQL (19%) and vector DBs (9%) are for specific use cases. Most teams run a mix.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_data_warehouse_solutions_do_you_use_select_all_that_apply",
        title: "Which data warehouse solutions do you use? (Select all that apply)",
        description: "BigQuery (34%) and Snowflake (32%) are neck and neck, the cloud warehouse space is split. Redshift (17%), Synapse (15%), and ClickHouse (15%) follow. No single winner; depends on cloud and scale.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_data_lake_solutions_do_you_use_select_all_that_apply",
        title: "Which data lake solutions do you use? (Select all that apply)",
        description: "S3 leads at 48%, it's the default for object storage. Azure Data Lake (33%) and GCS (28%) are next; 17% still use HDFS. Cloud object storage has mostly replaced on-prem lakes.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_use_any_lakehouse_architecture_solutions_select_all_that_apply",
        title: "Do you use any lakehouse architecture solutions? (Select all that apply)",
        description: "34% use Databricks and 34% don't use lakehouse at all, split down the middle. Delta Lake (20%) and Iceberg (12%) are the main open formats; Hudi and Fabric show up at single digits. Lakehouse is still emerging for many teams.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_workflow_orchestration_tools_do_you_use_to_manage_data_pipelines_select_all_that_apply",
        title: "Which workflow orchestration tools do you use to manage data pipelines? (Select all that apply)",
        description: "Airflow dominates at 46%, it's the default for pipeline orchestration. 19% don't use orchestration tools. Step Functions (15%), Prefect (10%), and Kestra (6%) are next; Dagster and others are niche. Airflow is still the standard.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_data_integration_or_etl_elt_tools_do_you_use_select_all_that_apply",
        title: "Which data integration or ETL/ELT tools do you use? (Select all that apply)",
        description: "dbt leads at 46%, the modern data stack is dbt-first. 22% don't use ETL/ELT tools; dlt (20%), Airbyte (9%), and Fivetran (7%) follow. Transform-in-warehouse with dbt has won for a lot of teams.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_frameworks_do_you_use_for_data_processing_select_all_that_apply",
        title: "Which frameworks do you use for data processing? (Select all that apply)",
        description: "Pandas is on top at 70%, still the go-to for Python data work. Spark (58%) for scale; 14% don't use dedicated frameworks. Polars (8%) and Flink (6%) are growing. Pandas + Spark covers most use cases.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_use_any_data_observability_or_monitoring_tools_for_your_pipelines_select_all_that_apply",
        title: "Do you use any data observability or monitoring tools for your pipelines? (Select all that apply)",
        description: "77% don't use data observability tools, big gap compared to application monitoring. Great Expectations (5%) and a long tail of custom or niche tools (Datadog, Datafold, Monte Carlo, etc.) show up. Data observability is still under-adopted.",
        chartType: "horizontal-bar",
      },
      {
        key: "how_do_you_ensure_data_quality_in_your_workflows_select_all_that_apply",
        title: "How do you ensure data quality in your workflows? (Select all that apply)",
        description: "53% do manual checks and 51% have automated tests in pipelines, most teams use both. 19% don't have dedicated data quality practices. Automated validation tools like Great Expectations (16%) are used by a smaller share. Quality is often manual or pipeline-embedded.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_data_governance_tools_or_practices_do_you_use_select_all_that_apply",
        title: "Which data governance tools or practices do you use? (Select all that apply)",
        description: "51% don't use data governance tools, another clear gap. Data cataloging (37%) is the most common practice; Apache Atlas and commercial tools (Collibra, Alation, Purview) show up at low rates. Governance is still manual or skipped for many.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_work_with_real_time_data_processing",
        title: "Do you work with real-time data processing?",
        description: "43% don't do real-time; 31% have minimal requirements and 27% use dedicated frameworks (Kafka, Flink). Batch is still the norm for most; real-time is for a subset of use cases.",
        chartType: "bar",
      },
      {
        key: "which_cloud_platforms_do_you_use_for_data_engineering_workloads_select_all_that_apply",
        title: "Cloud Platforms for Data Engineering",
        description: "AWS leads at 40%, with Azure close behind at 35%. 27% are on-premise and 25% use GCP, lots of multi-cloud and hybrid. Platform-agnostic tools matter because people run workloads everywhere.",
        chartType: "horizontal-bar",
      },
      {
        key: "how_would_you_describe_your_data_engineering_maturity",
        title: "How would you describe your data engineering maturity?",
        description: "46% are emerging, scheduled pipelines, partial standardization. 33% are established with orchestration, monitoring, versioning; 15% are still ad-hoc. Only 6% say advanced (governed platform, SLAs, self-serve). Most teams are in the middle of the maturity curve.",
        chartType: "bar",
      },
      {
        key: "for_the_data_engineering_tools_you_use_how_would_you_describe_their_role",
        title: "Role of Data Engineering Tools",
        description: "62% say their data tools are mission-critical, when pipelines break, everything breaks. 25% use them regularly but not for core workloads, and only 12% are still in experimental mode. Most teams are past the pilot stage.",
        chartType: "bar",
      },
      {
        key: "what_are_your_biggest_challenges_in_data_engineering_select_all_that_apply",
        title: "Challenges in Data Engineering",
        description: "Data quality is the top concern at 57%, garbage in, garbage out. Scaling pipelines (51%) and integrating heterogeneous sources (49%) are next; cost (45%) and lack of standards or governance (39%) round it out. You need both good tech and clear ownership.",
        chartType: "tags",
      },
      {
        key: "how_many_people_are_in_your_data_engineering_teams",
        title: "Data Engineering Team Size",
        description: "49% have 1–5 people, small teams are the norm. 15% have no dedicated data engineering team (0), and 13% each have 6–10 or 11–20. Larger teams (21–50, 51+) are a minority. Modern tools let small teams own a lot.",
        chartType: "bar",
      },
      {
        key: "which_data_engineering_tools_or_technologies_do_you_plan_to_adopt_or_expand_in_the_next_12_months",
        title: "Which data engineering tools or technologies do you plan to adopt or expand in the next 12 months?",
        description: "Databricks (23%) and Apache Spark (20%) lead the adoption list, with cloud platforms (20%) and workflow orchestration like Airflow/Prefect/Kestra (17%) next. Snowflake (13%), observability (13%), and governance/quality tools (10%) are also on the roadmap. Plans are spread, teams are investing across the stack.",
        chartType: "tags",
      },
    ],
  },
  {
    id: "ai-engineering",
    title: "AI Engineering & LLMs",
    shortTitle: "AI & LLMs",
    description: "Tools, frameworks, and challenges in building AI and LLM-based applications.",
    icon: "sparkles",
    dataFile: "survey2026_ai_engineering_stats.json",
    questions: [
      {
        key: "do_you_work_with_ai_engineering_tools_or_frameworks_including_building_llm_based_applications",
        title: "Working with AI Engineering / LLM Tools",
        description: "It's split,43% are building LLM apps, but 57% haven't started yet. Still early days, so lots of room to grow.",
        chartType: "pie",
      },
      {
        key: "how_many_ai_or_llm_based_systems_do_you_currently_have_in_production",
        title: "AI/LLM Systems in Production",
        description: "41% have 2-5 systems in production,moving past experiments. But 21% have nothing in production yet, and another 21% only have one. Most teams are still figuring out how to scale.",
        chartType: "bar",
      },
      {
        key: "for_the_ai_engineering_tools_and_frameworks_you_use_how_would_you_describe_their_role",
        title: "Role of AI Engineering Tools",
        description: "40% use AI tools for critical production stuff, while 37% are still experimenting. About a quarter use them regularly but not for anything mission-critical. The industry is transitioning from experiments to real production.",
        chartType: "bar",
      },
      {
        key: "what_are_your_biggest_challenges_in_building_or_operating_aillm_systems",
        title: "Challenges in AI/LLM Systems",
        description: "79% are worried about evaluation and reliability,can you trust what the AI outputs? Integration (66%) and cost (55%) are also big headaches. You need good tech, money, and organizational buy-in to make AI work.",
        chartType: "tags",
      },
      {
        key: "for_which_use_cases_do_you_currently_employ_aillms_based_applications_select_all_that_apply",
        title: "For which use cases do you currently employ AI/LLMs-based applications? (Select all that apply)",
        description: "Document processing is the most popular use case (71%),LLMs are great at extracting info from messy docs. Knowledge base Q&A (65%) shows RAG is becoming standard. Customer support (53%) and code generation (47%) are also common. Companies are moving from simple stuff to more complex agentic workflows (41%) and autonomous agents (32%) as they get more experience.",
        chartType: "tags",
      },
      {
        key: "which_managed_llm_services_or_cloud_based_providers_do_you_use_select_all_that_apply",
        title: "Which managed LLM services or cloud-based providers do you use? (Select all that apply)",
        description: "OpenAI is the clear winner at 62%,ChatGPT's API is basically the default. But 18% are self-hosting, which is interesting. AWS Bedrock (15%), Anthropic (12%), and Google (12%) are also popular. Lots of companies use multiple providers to avoid vendor lock-in.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_self_host_open_source_models_select_all_that_apply",
        title: "Do you self-host open-source models? (Select all that apply)",
        description: "59% don't self-host,managed services are just easier. Among those who do, vLLM is popular (18%) for efficient inference. Some build custom stacks (12%). Self-hosting is mainly for companies that need privacy, want to save money at scale, or need custom models.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_ai_application_patterns_do_you_use_select_all_that_apply",
        title: "Which AI application patterns do you use? (Select all that apply)",
        description: "76% start with simple prompts,easiest way to get started. RAG (71%) is the next step for connecting LLMs to your own data. Tool calling (35%) and multi-step workflows (35%) are more advanced. Fine-tuning (29%) and hybrid systems (21%) are for the pros. There's a clear progression from simple to complex.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_frameworks_or_libraries_do_you_use_to_build_or_orchestrate_ai_applications_select_all_that_apply",
        title: "Which frameworks or libraries do you use to build or orchestrate AI applications? (Select all that apply)",
        description: "LangChain is the most popular at 56%,it's basically the standard. But 34% don't use any frameworks, either building custom stuff or keeping it simple. Some companies build their own (19%) for competitive reasons or specific needs. The field is still figuring out what works best.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_use_any_of_the_following_vector_databases_for_llm_powered_applications_select_all_that_apply",
        title: "Do you use any of the following vector databases for LLM-powered applications? (Select all that apply)",
        description: "28% don't use vector databases,probably doing simple embeddings or skipping RAG. Elasticsearch leads at 28% (people using what they already have). Chroma, pgvector, and Qdrant are all around 19%,no clear winner. Pinecone (16%) is popular for managed services. People pick based on what they already have, scale needs, or specific features.",
        chartType: "horizontal-bar",
      },
      {
        key: "how_do_you_generate_or_manage_embeddings_select_all_that_apply",
        title: "How do you generate or manage embeddings? (Select all that apply)",
        description: "44% use open-source models,cheaper and models like sentence-transformers work well. Managed APIs (28%) are easier, and 28% mix both approaches. 13% aren't using embeddings at all. Depends on scale, budget, and what you need.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_evaluate_or_test_aillm_outputs_systematically",
        title: "Do you evaluate or test AI/LLM outputs systematically?",
        description: "38% do manual evaluation, but 31% don't evaluate at all,that's risky for production. Only 17% have automated evaluation. This matches the fact that 79% say evaluation is their biggest challenge,people know it's a problem but haven't solved it yet. We need better tools and practices.",
        chartType: "bar",
      },
      {
        key: "do_you_use_any_tools_to_monitor_aillm_systems_in_production_select_all_that_apply",
        title: "Do you use any tools to monitor AI/LLM systems in production? (Select all that apply)",
        description: "48% use custom monitoring, but 41% don't monitor at all,that's dangerous for production. Specialized tools like LangSmith (10%) and Evidently AI (10%) aren't widely adopted yet. Most people build custom stuff because existing tools don't handle LLM-specific things like prompt performance or token usage.",
        chartType: "horizontal-bar",
      },
      {
        key: "where_do_you_run_ai_llm_workloads_select_all_that_apply",
        title: "Where do you run AI / LLM workloads? (Select all that apply)",
        description: "47% use cloud-managed services,easiest option. 33% run custom stuff in the cloud for more control. 30% are on-premise for privacy, compliance, or cost reasons. 10% do hybrid. Depends on what your company needs.",
        chartType: "horizontal-bar",
      },
      {
        key: "how_do_you_access_or_provision_gpus_for_training_fine_tuning_or_running_llms",
        title: "How do you access or provision GPUs for training/fine-tuning or running LLMs?",
        description: "57% use cloud GPUs,easiest way to get started. 24% have their own GPUs, usually for cost savings at scale or data privacy. 14% are CPU-only, probably using smaller models. Specialized inference providers (5%) are still niche. Most people prefer managed solutions because GPUs are complicated.",
        chartType: "bar",
      },
      {
        key: "do_you_have_a_dedicated_genaillm_team_in_your_organization",
        title: "Do you have a dedicated GenAI/LLM team in your organization?",
        description: "56% don't have dedicated AI teams,most AI work happens in existing data or engineering teams. The 44% with dedicated teams are probably bigger companies or ones that really prioritize AI. The field is still new, so companies are figuring out the best structure.",
        chartType: "pie",
      },
      {
        key: "how_would_you_describe_your_ai_engineering_maturity",
        title: "How would you describe your AI engineering maturity?",
        description: "53% are in early production with basic standards, and 27% are still experimenting,most companies are still learning. Only 10% have solid monitoring and evaluation practices, and another 10% have advanced platform capabilities. The field is moving fast, and most teams are still building the basics.",
        chartType: "bar",
      },
      {
        key: "which_ai_engineering_tools_or_technologies_do_you_plan_to_adopt_or_expand_in_the_next_12_months",
        title: "Which AI engineering tools or technologies do you plan to adopt or expand in the next 12 months?",
        description: "People are planning to focus on monitoring and observability,they know there are gaps. Fine-tuning and autonomous agents are also on the roadmap. Plans are pretty diverse (each around 7%), which makes sense since teams are at different stages. The focus on observability matches the fact that evaluation and monitoring are top concerns.",
        chartType: "tags",
      },
    ],
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots & Prompt-Based Tools",
    shortTitle: "AI Chatbots",
    description: "Usage patterns and productivity impact of AI assistants and coding tools.",
    icon: "message-circle",
    dataFile: "survey2026_ai_chatbots_stats.json",
    questions: [
      {
        key: "do_you_use_ai_chatbots_or_prompt_based_ai_tools_eg_chatgpt_claude_gemini_perplexity_for_personal_or_professional_productivity",
        title: "AI Chatbot Usage for Productivity",
        description: "96% of people use AI chatbots,one of the fastest tech adoptions ever. They've become essential tools for problem-solving, research, and basically everything.",
        chartType: "pie",
      },
      {
        key: "how_often_do_you_use_ai_chatbots_or_prompt_based_ai_tools",
        title: "Frequency of AI Chatbot Usage",
        description: "53% use chatbots multiple times a day, and another 32% use them daily. They're not a novelty anymore,they're just part of how people work, like search engines became essential.",
        chartType: "bar",
      },
      {
        key: "how_long_have_you_been_using_ai_chatbots_or_prompt_based_tools",
        title: "Duration of AI Chatbot Usage",
        description: "32% have been using them for 1-2 years, and 28% are veterans with 2+ years,early ChatGPT adopters. 21% are new (3-6 months), so people are still jumping in as the tools get better.",
        chartType: "bar",
      },
      {
        key: "chat_applications_which_chat_based_applications_do_you_use",
        title: "Chat Applications Used",
        description: "ChatGPT is still on top at 84%, but lots of people use multiple tools,66% use Gemini, 42% use Claude, and 38% use Perplexity. People pick different tools for different tasks.",
        chartType: "horizontal-bar",
      },
      {
        key: "in_which_context_do_you_mostly_use_these_tools",
        title: "Context of AI Tool Usage",
        description: "47% use AI equally for work and personal stuff, while 44% mostly use it for work. These tools are flexible enough to handle both.",
        chartType: "bar",
      },
      {
        key: "how_has_using_ai_chatbots_affected_your_productivity",
        title: "AI Chatbot Impact on Productivity",
        description: "50% say productivity increased a lot, and 39% saw slight improvements,89% positive impact overall. The few who didn't see gains might be using AI for things it's not great at, or still figuring out how to use it effectively.",
        chartType: "bar",
      },
      {
        key: "which_best_describes_how_you_interact_with_ai_chatbots",
        title: "AI Chatbot Interaction Style",
        description: "52% do iterative back-and-forth conversations,treating AI like a partner you need to refine ideas with. Long sessions and structured prompts show people are getting good at using these tools effectively.",
        chartType: "bar",
      },
      {
        key: "how_comfortable_are_you_using_ai_chatbots_for_work_related_tasks",
        title: "Comfort Level with AI for Work (1-5 Scale)",
        description: "55% are super comfortable (5/5), and most others are at 4 or 3. People trust AI for work stuff now, which lets them use it for more ambitious tasks.",
        chartType: "bar",
      },
      {
        key: "which_ai_powered_coding_tools_do_you_use_regularly_select_all_that_apply",
        title: "AI-Powered Coding Tools",
        description: "GitHub Copilot is #1 at 59%,great IDE integration helps. But 50% still use ChatGPT while coding, and Claude (42%) is popular for code analysis. Most developers use multiple tools depending on what they need.",
        chartType: "horizontal-bar",
      },
      {
        key: "where_do_you_primarily_use_ai_when_coding",
        title: "Primary Location for AI Coding Assistance",
        description: "40% still use external chat tools,browser-based AI is flexible. IDE chat (25%) and inline suggestions (23%) are growing though. The market is still figuring out the best way to integrate AI into coding.",
        chartType: "bar",
      },
      {
        key: "for_which_coding_tasks_do_you_use_ai",
        title: "Coding Tasks Using AI Assistance",
        description: "AI is great for the annoying stuff,debugging (73%), boilerplate (69%), and explaining code (67%). Documentation and refactoring are also popular. It helps across the whole dev lifecycle, not just writing code.",
        chartType: "horizontal-bar",
      },
      {
        key: "how_has_ai_affected_your_coding_productivity",
        title: "AI Impact on Coding Productivity",
        description: "53% say coding productivity increased a lot, and 33% saw slight improvements,86% positive impact. Coding is a great use case for AI, probably because code is structured and you can tell when it works.",
        chartType: "bar",
      },
    ],
  },
]

// 2024-2025 survey config: same categories (except Community — no 2025 DTC data), dataFile and questions match 2025 data.
export const categories2025: Category[] = [
  {
    id: "ml-mlops",
    title: "Machine Learning & MLOps",
    shortTitle: "ML & MLOps",
    description: "Tools, practices, and challenges in ML engineering and operations.",
    icon: "cpu",
    dataFile: "survey2025_ml_mlops_stats.json",
    questions: [
      { key: "how_many_ml_models_do_you_currently_have_in_production", title: "How many ML models do you currently have in production?", description: "45% have 2–5 models; 25% have none and 18% have one. 12% have 5+. Many teams were still early in production in 2024–2025.", chartType: "bar" },
      { key: "which_tools_do_you_use_for_deploying_ml_models_select_all_that_apply", title: "Which tools do you use for deploying ML models?", description: "38% don't deploy models. Among those who do, Kubernetes and SageMaker (27% each) lead; Google AI Platform (22%) and Azure ML (18%) follow. TensorFlow Serving (10%) is next.", chartType: "horizontal-bar" },
      { key: "do_you_use_any_tools_to_monitor_ml_models_in_production_select_all_that_apply", title: "Do you use any tools to monitor ML models in production?", description: "58% don't monitor models. Prometheus and Grafana (21%), custom scripts (11%), and ELK (9%) are the most used. Monitoring was a clear gap.", chartType: "horizontal-bar" },
      { key: "which_tools_do_you_use_for_model_training_and_experimentation", title: "Which tools do you use for model training and experimentation?", description: "55% don't use dedicated tools; MLflow (34%) leads among those who do. W&B (13%) and TensorBoard (10%) follow. Many relied on notebooks or scripts.", chartType: "horizontal-bar" },
      { key: "which_tools_do_you_use_for_model_or_data_versioning_select_all_that_apply", title: "Which tools do you use for model or data versioning?", description: "58% don't use versioning tools. MLflow (32%) leads; W&B (11%) and DVC (11%) have smaller shares. Versioning was under-adopted.", chartType: "horizontal-bar" },
      { key: "which_workflow_orchestration_tools_do_you_use_for_ml_pipelines_select_all_that_apply", title: "Which workflow orchestration tools do you use for ML pipelines?", description: "54% don't use orchestration. Airflow (34%) dominates; Step Functions (8%), Kubeflow (7%), and Prefect (6%) follow. Orchestration was not yet widespread.", chartType: "horizontal-bar" },
      { key: "which_cicd_tools_do_you_use_for_ml_workflows_select_all_that_apply", title: "Which CI/CD tools do you use for ML workflows?", description: "50% don't use CI/CD for ML. GitLab CI/CD (27%) and Jenkins (15%) lead. Traditional DevOps tools dominated over ML-native pipelines.", chartType: "horizontal-bar" },
      { key: "do_you_use_any_feature_stores_select_all_that_apply", title: "Do you use any feature stores?", description: "75% don't use feature stores. SageMaker (12%), Databricks (11%), and Vertex AI (8%) lead among adopters. Feature stores were not mainstream.", chartType: "horizontal-bar" },
      { key: "how_often_do_you_retrain_your_models_in_production", title: "How often do you retrain your models in production?", description: "44% don't retrain; 29% retrain when needed and 23% on a schedule. Only 3% do continuous learning. Retraining was mostly reactive.", chartType: "bar" },
      { key: "where_do_you_run_your_ml_workloads_select_all_that_apply", title: "Where do you run your ML workloads?", description: "AWS (40%), Azure (29%), and GCP (21%) lead; 21% use on-premise and 11% hybrid. Cloud dominated but on-prem and hybrid were still common.", chartType: "horizontal-bar" },
      { key: "how_many_people_are_in_your_ml_teams", title: "How many people are in your ML team(s)?", description: "45% have 1–5 people and 35% have 6–10. 10% have no dedicated team (0). Small teams were the norm; few had 11+ or 51+.", chartType: "bar" },
      { key: "do_you_have_a_centralized_mlops_team", title: "Do you have a centralized MLOps team?", description: "81% don't have a dedicated MLOps team; ML operations were mostly distributed. Only 19% had a centralized team.", chartType: "pie" },
      { key: "how_would_you_describe_your_mlops_maturity", title: "How would you describe your MLOps maturity?", description: "35% have some production models but mostly manual; 30% are experiments-only. 28% have standardized deployment and monitoring; 7% advanced. Maturity was spread out.", chartType: "bar" },
      { key: "for_the_mlmlops_tools_you_use_how_would_you_describe_their_role", title: "For the ML/MLOps tools you use, how would you describe their role?", description: "39% say experimental only; 31% use them regularly but not critically, and 30% say mission-critical. Tools were either critical or still in exploration.", chartType: "bar" },
      { key: "which_ml_or_mlops_tools_do_you_plan_to_adopt_or_expand_in_the_next_12_months", title: "Which ML or MLOps tools do you plan to adopt or expand in the next 12 months?", description: "MLflow (23%) and Airflow (18%) lead adoption plans; Kubernetes/Docker (12%), feature stores (10%), and monitoring (9%) follow. Plans were diverse.", chartType: "tags" },
      { key: "what_are_your_biggest_challenges_in_ml_engineering_and_mlops_select_all_that_apply", title: "What are your biggest challenges in ML engineering and MLOps?", description: "Deployment complexity (60%) and lack of skills (50%) are the top two. Monitoring (42%), data quality (35%), and scaling (33%) follow. Same pain points as today.", chartType: "tags" },
    ],
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    shortTitle: "Data Engineering",
    description: "Cloud platforms, tools, and challenges in data engineering workflows.",
    icon: "database",
    dataFile: "survey2025_data_engineering_stats.json",
    questions: [
      {
        key: "which_data_storage_solutions_do_you_use_select_all_that_apply",
        title: "Which data storage solutions do you use? (Select all that apply)",
        description: "Relational databases lead at 71%, with warehouses and lakehouses both at 54%. Data lakes (50%), NoSQL (28%), and vector DBs (19%) follow. Most teams run a mix of traditional and modern storage.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_data_warehouse_solutions_do_you_use_select_all_that_apply",
        title: "Which data warehouse solutions do you use? (Select all that apply)",
        description: "BigQuery (39%) and Snowflake (32%) lead. Redshift (25%) and Synapse (20%) are next; ClickHouse (8%) has a smaller share. Cloud warehouses are consolidated around the major vendors.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_data_lake_solutions_do_you_use_select_all_that_apply",
        title: "Which data lake solutions do you use? (Select all that apply)",
        description: "S3 leads at 53%, with GCS (34%) and Azure Data Lake (31%) next. HDFS (19%) is still present but cloud object storage dominates.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_use_any_lakehouse_architecture_solutions_select_all_that_apply",
        title: "Do you use any lakehouse architecture solutions? (Select all that apply)",
        description: "58% don't use lakehouse; among adopters, Databricks (31%) leads. Iceberg (13%) and Delta Lake (12%) are the main open formats. Lakehouse was still emerging for many teams.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_workflow_orchestration_tools_do_you_use_to_manage_data_pipelines_select_all_that_apply",
        title: "Which workflow orchestration tools do you use to manage data pipelines? (Select all that apply)",
        description: "Airflow dominates at 48%; 36% don't use orchestration. Step Functions (12%), Mage (7%), Prefect (7%), and Dagster (5%) follow. Airflow was the standard.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_data_integration_or_etl_elt_tools_do_you_use_select_all_that_apply",
        title: "Which data integration or ETL/ELT tools do you use? (Select all that apply)",
        description: "dbt leads at 34%; 46% don't use ETL/ELT tools. Airbyte (8%), Fivetran (8%), dlt (7%), and Talend (5%) follow. Many still relied on custom or manual solutions.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_frameworks_do_you_use_for_data_processing_select_all_that_apply",
        title: "Which frameworks do you use for data processing? (Select all that apply)",
        description: "Pandas (70%) and Spark (47%) lead; 15% don't use dedicated frameworks. Flink (8%), Beam (5%), and Dask (4%) have smaller footprints.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_use_any_data_observability_or_monitoring_tools_for_your_pipelines_select_all_that_apply",
        title: "Do you use any data observability or monitoring tools for your pipelines? (Select all that apply)",
        description: "77% don't use data observability tools. Great Expectations (10%) and Monte Carlo (6%) are the most noted; Soda and Databand are at low rates. Observability was under-adopted.",
        chartType: "horizontal-bar",
      },
      {
        key: "how_do_you_ensure_data_quality_in_your_workflows_select_all_that_apply",
        title: "How do you ensure data quality in your workflows? (Select all that apply)",
        description: "49% do manual checks and 39% have automated tests; 27% have no dedicated practices. Validation tools like Great Expectations (23%) are used by a smaller share.",
        chartType: "horizontal-bar",
      },
      {
        key: "which_data_governance_tools_or_practices_do_you_use_select_all_that_apply",
        title: "Which data governance tools or practices do you use? (Select all that apply)",
        description: "65% don't use data governance tools. Manual cataloging (20%) is most common; Apache Atlas (6%), Collibra (5%), and Alation (4%) have limited use. Governance was a clear gap.",
        chartType: "horizontal-bar",
      },
      {
        key: "do_you_work_with_real_time_data_processing",
        title: "Do you work with real-time data processing?",
        description: "46% don't do real-time; 28% have minimal requirements and 26% use dedicated frameworks (Kafka, Flink). Batch was still the norm for most.",
        chartType: "bar",
      },
      {
        key: "which_cloud_platforms_do_you_use_for_data_engineering_workloads_select_all_that_apply",
        title: "Cloud Platforms for Data Engineering",
        description: "AWS (47%), Azure (35%), and GCP (34%) lead; 22% use on-premise. Multi-cloud and hybrid were common.",
        chartType: "horizontal-bar",
      },
      {
        key: "what_are_your_biggest_challenges_in_data_engineering_select_all_that_apply",
        title: "Challenges in Data Engineering",
        description: "Data quality (69%) and integration of sources (60%) are the top two. Scaling pipelines (54%) and security/compliance (40%) follow. Same themes as today.",
        chartType: "tags",
      },
      {
        key: "how_many_people_are_in_your_data_engineering_teams",
        title: "Data Engineering Team Size",
        description: "50% have 1–5 people; 24% have no dedicated team (0). 6–10 and 11–20 are about 9% and 8%; larger teams (21–50, 51+) are a minority. Small teams were the norm.",
        chartType: "bar",
      },
    ],
  },
  {
    id: "ai-engineering",
    title: "AI Engineering & LLMs",
    shortTitle: "AI & LLMs",
    description: "Tools, frameworks, and challenges in building AI and LLM-based applications.",
    icon: "sparkles",
    dataFile: "survey2025_ai_engineering_stats.json",
    questions: [
      { key: "how_many_ai_or_llm_based_systems_do_you_currently_have_in_production", title: "AI/LLM Systems in Production", description: "54% have no LLM systems in production; 28% have one. 16% have 2–5 and 2% have 5+. Most organizations were still in experimentation phase.", chartType: "bar" },
      { key: "for_which_use_cases_do_you_currently_employ_aillms_based_applications_select_all_that_apply", title: "For which use cases do you currently employ AI/LLMs-based applications? (Select all that apply)", description: "Code generation (62%) and Q&A on knowledge bases (58%) lead. Document summarization (55%) and content generation (31%) follow. Customer support (25%) and data annotation (17%) are next. Use cases were focused on productivity.", chartType: "tags" },
      { key: "which_managed_llm_services_or_cloud_based_providers_do_you_use_select_all_that_apply", title: "Which managed LLM services or cloud-based providers do you use? (Select all that apply)", description: "OpenAI dominates at 73%; Anthropic (24%) is next. 21% don't use managed services. AWS Bedrock (11%) and Groq (12%) have smaller shares. Managed services were clearly preferred.", chartType: "horizontal-bar" },
      { key: "do_you_self_host_open_source_models_select_all_that_apply", title: "Do you self-host open-source models? (Select all that apply)", description: "74% don't self-host. Among those who do, vLLM (9%) and custom inference stacks (9%) lead. Self-hosting was niche, mainly for control or cost reasons.", chartType: "horizontal-bar" },
      { key: "which_ai_application_patterns_do_you_use_select_all_that_apply", title: "Which AI application patterns do you use? (Select all that apply)", description: "50% use prompt-based applications; 50% don't customize. Fine-tuning was uncommon—73% don't fine-tune; 16% fine-tune self-hosted and 12% fine-tune managed. Customization was split.", chartType: "horizontal-bar" },
      { key: "which_frameworks_or_libraries_do_you_use_to_build_or_orchestrate_ai_applications_select_all_that_apply", title: "Which frameworks or libraries do you use to build or orchestrate AI applications? (Select all that apply)", description: "58% don't use AI frameworks. LangChain (34%) leads; LlamaIndex (17%) follows. Many relied on custom or ad hoc solutions rather than standardized frameworks.", chartType: "horizontal-bar" },
      { key: "do_you_use_any_of_the_following_vector_databases_for_llm_powered_applications_select_all_that_apply", title: "Do you use any of the following vector databases for LLM-powered applications? (Select all that apply)", description: "59% don't use vector databases. Elasticsearch (21%) leads; Chroma (16%) and Pinecone (12%) follow. pgvector (8%) and Qdrant (7%) have smaller shares. Vector DBs were still emerging.", chartType: "horizontal-bar" },
      { key: "how_do_you_generate_or_manage_embeddings_select_all_that_apply", title: "How do you generate or manage embeddings? (Select all that apply)", description: "44% use open-source models; 28% use managed APIs and 28% mix both. 13% don't use embeddings. Depends on scale and budget.", chartType: "horizontal-bar" },
      { key: "do_you_evaluate_or_test_aillm_outputs_systematically", title: "Do you evaluate or test AI/LLM outputs systematically?", description: "51% have no formal evaluation; 38% do manual evaluation. Only 11% have automated evaluation. Evaluation was a clear gap.", chartType: "bar" },
      { key: "do_you_use_any_tools_to_monitor_aillm_systems_in_production_select_all_that_apply", title: "Do you use any tools to monitor AI/LLM systems in production? (Select all that apply)", description: "74% don't monitor AI systems. W&B (12%) and LangSmith (10%) lead; Evidently AI (5%) follows. Observability was under-adopted.", chartType: "horizontal-bar" },
      { key: "where_do_you_run_ai_llm_workloads_select_all_that_apply", title: "Where do you run AI / LLM workloads? (Select all that apply)", description: "55% use cloud-managed services; 23% run custom cloud infrastructure. 12% are on-premise and 10% hybrid. Cloud dominated.", chartType: "horizontal-bar" },
      { key: "how_do_you_access_or_provision_gpus_for_training_fine_tuning_or_running_llms", title: "How do you access or provision GPUs for training/fine-tuning or running LLMs?", description: "55% find GPU provisioning not applicable. Among those who use GPUs, cloud (AWS 39%, Azure 23%, GCP 16%) dominates; 12% use on-premise. Cloud GPUs were preferred.", chartType: "bar" },
      { key: "do_you_have_a_dedicated_genaillm_team_in_your_organization", title: "Do you have a dedicated GenAI/LLM team in your organization?", description: "76% don't have a dedicated GenAI team; AI work was integrated into existing teams. Only 24% had specialized teams.", chartType: "pie" },
      { key: "how_would_you_describe_your_ai_engineering_maturity", title: "How would you describe your AI engineering maturity?", description: "42% are experimentation-only; 35% are early production. 15% are established and 8% advanced. Most teams were still learning.", chartType: "bar" },
      { key: "for_the_ai_engineering_tools_and_frameworks_you_use_how_would_you_describe_their_role", title: "Role of AI Engineering Tools", description: "40% say experimental only; 30% say mission-critical and 30% use regularly but not critical. Tools were either critical or still exploratory.", chartType: "bar" },
      { key: "which_ai_engineering_tools_or_technologies_do_you_plan_to_adopt_or_expand_in_the_next_12_months", title: "Which AI engineering tools or technologies do you plan to adopt or expand in the next 12 months?", description: "Monitoring and observability (23%) lead adoption plans; fine-tuning (15%) and autonomous agents (13%) follow. LangChain/LangSmith (10%) and vector databases (9%) are next. Focus on production readiness.", chartType: "tags" },
      { key: "what_are_your_biggest_challenges_in_building_or_operating_aillm_systems", title: "Challenges in AI/LLM Systems", description: "Evaluation and reliability (79%) is the top challenge. Integration (65%), cost (55%), and organizational readiness (55%) follow. Security (52%), latency (48%), data quality (45%), and skills (41%) round it out. Same pain points as today.", chartType: "tags" },
    ],
  },
  {
    ...categories[4],
    dataFile: "survey2025_ai_chatbots_stats.json",
    questions: [
      { key: "how_often_do_you_use_ai_for_work_or_personal_tasks", title: "How often do you use AI for work or personal tasks?", description: "About 70% use AI daily; 27% weekly and 3% monthly. Most community members engage with AI tools daily.", chartType: "pie" },
      { key: "how_long_have_you_been_using_ai", title: "How long have you been using AI?", description: "70% have been using AI for a year or more (40% for 1–2 years, 30% for 2+ years). 26% are at 6 months–1 year; 4% less than 6 months.", chartType: "pie" },
      { key: "if_you_use_ai_for_what_kind_of_tasks_do_you_use_them", title: "If you use AI, for what kind of tasks do you use them?", description: "Coding (88%) and research (72%) lead; brainstorming (69%) and personal productivity (59%) follow. Content generation (47%) and data analysis (40%) are next.", chartType: "horizontal-bar" },
      { key: "which_chatbased_applications_do_you_use", title: "Which chat-based applications do you use?", description: "ChatGPT leads at 92%; Google Gemini (43%) and Anthropic Claude (33%) are used alongside it. A few key players dominate.", chartType: "horizontal-bar" },
      { key: "which_ides_or_plugins_do_you_use_for_development", title: "Which IDEs or plugins do you use for development?", description: "GitHub Copilot is most popular (78%); Cursor has a smaller but growing share (20%). AI-driven coding assistance is standard in the tech community.", chartType: "horizontal-bar" },
    ],
  },
]

// Helper function to get categories for a specific year
export function getCategoriesForYear(year: SurveyYear): Category[] {
  return year === "2024-2025" ? categories2025 : categories
}

// Demographics questions for the overview page

// 2024-2025 demographics questions with accurate descriptions
export const demographicsQuestions2025: SurveyQuestion[] = [
  {
    key: "where_are_you_located_region",
    title: "Geographic Distribution by Region",
    description: "North America leads at 37%, with Europe (25%) and Asia (24%) close behind. Africa (7%), South America (4%), and Middle East (2%) round out the global distribution.",
    chartType: "horizontal-bar",
  },
  {
    key: "what_is_your_job_role",
    title: "Job Roles of Survey Respondents",
    description: "Data Engineers (29%) and Data Scientists (19%) lead. Data/Product Analysts (17%), ML Engineers (14%), and Software Engineers (13%) follow. Diverse mix of data and AI roles.",
    chartType: "horizontal-bar",
  },
  {
    key: "what_is_your_current_gradelevel_in_your_organization",
    title: "Career Level Distribution",
    description: "Senior-level (41%) and entry-level (35%) dominate. Lead/Head roles (10%) and mid-level (3%) follow; Directors (2%), Students (3%), Freelancers (2%), and Executives (1%) are smaller groups.",
    chartType: "bar",
  },
  {
    key: "how_large_is_your_organization",
    title: "Organization Size",
    description: "Large enterprises (1000+, 30%) lead; 201-500 employees (18%) and freelancers (15%) are next. Smaller companies (51-200, 11-50, 1-10) and academic (2%) round it out.",
    chartType: "horizontal-bar",
  },
  {
    key: "which_industry_or_sector_best_describes_your_organization",
    title: "Industry Sector Distribution",
    description: "Technology/Software (41%) dominates. Finance (9%), Education/Research (9%), Healthcare (8%), and Retail/E-commerce (8%) follow. Manufacturing (5%), Telecom (5%), and Government (4%) are next.",
    chartType: "horizontal-bar",
  },
  {
    key: "how_would_you_describe_your_organizations_overall_aiml_adoption_stage",
    title: "AI/ML Adoption Stage in Organizations",
    description: "30% have some production use cases; 29% have multiple production use cases. 22% are just exploring and 16% are mostly proofs of concept. 6% say AI/ML is core; 2% don't use AI/ML.",
    chartType: "bar",
  },
]

// Helper function to get demographics questions for a specific year
export function getDemographicsQuestionsForYear(year: SurveyYear): SurveyQuestion[] {
  return year === "2024-2025" ? demographicsQuestions2025 : demographicsQuestions
}

export const demographicsQuestions: SurveyQuestion[] = [
  {
    key: "where_are_you_located_region",
    title: "Geographic Distribution by Region",
    description: "Asia (32%) and Europe (30%) lead responses, followed by North America (14%) and Africa (13%). South America (10%) also has good representation.",
    chartType: "horizontal-bar",
  },
  {
    key: "what_is_your_job_role",
    title: "Job Roles of Survey Respondents",
        description: "Data Engineers are the biggest group, followed by Data Scientists and Data/Product Analysts. Pretty typical mix of data and AI roles.",
    chartType: "horizontal-bar",
  },
  {
    key: "what_is_your_current_gradelevel_in_your_organization",
    title: "Career Level Distribution",
        description: "Mid-level folks are the biggest group, then entry-level and senior. Leadership roles (Lead, Head, Director) are a smaller slice.",
    chartType: "bar",
  },
  {
    key: "how_large_is_your_organization",
    title: "Organization Size",
        description: "Most people work at big companies (1000+ employees). Smaller companies and freelancers are also well represented.",
    chartType: "horizontal-bar",
  },
  {
    key: "which_industry_or_sector_best_describes_your_organization",
    title: "Industry Sector Distribution",
        description: "Tech/Software is the biggest industry, then Retail/E-commerce and Finance/Banking. Education/Research and Healthcare are also well represented.",
    chartType: "horizontal-bar",
  },
  {
    key: "how_would_you_describe_your_organizations_overall_aiml_adoption_stage",
    title: "AI/ML Adoption Stage in Organizations",
        description: "AI/ML maturity varies a lot. The biggest group has multiple production use cases, but others are still exploring or have AI/ML as core to what they do.",
    chartType: "bar",
  },
]

// Types for the new JSON structure
export interface SurveyDataPoint {
  value: string
  count: number
  percentage: number
  text?: string
}

export interface SurveySection {
  title: string
  responses: number
  missing: number
  distribution: SurveyDataPoint[]
}

export interface SurveyData {
  total_responses: number
  sections: SurveySection[]
}

// Type for the raw JSON structure (question titles as keys)
// 2025 survey data may omit total_responses and count (percentage-only).
type RawSurveyData = {
  [questionTitle: string]: {
    total_responses?: number
    options: Array<{
      option: string
      count?: number
      percentage?: number
      text?: string
    }>
  }
}

// Helper function to transform raw JSON data to SurveyData format
export function transformSurveyData(rawData: RawSurveyData): SurveyData {
  const sections: SurveySection[] = Object.entries(rawData).map(([title, questionData]) => {
    const totalResponses = questionData.total_responses ?? 0
    const distribution: SurveyDataPoint[] = questionData.options.map(option => ({
      value: option.option,
      count: option.count ?? 0,
      percentage: option.percentage ?? 0,
      text: option.text
    }))
    
    // Calculate missing responses (if any); skip when total_responses not set (e.g. 2025 percentage-only)
    const totalCount = distribution.reduce((sum, item) => sum + item.count, 0)
    const missing = totalResponses > 0 ? Math.max(0, totalResponses - totalCount) : 0
    
    return {
      title,
      responses: totalResponses,
      missing,
      distribution
    }
  })
  
  // Calculate total responses across all sections (use the max or sum)
  const totalResponses = sections.length > 0 
    ? Math.max(...sections.map(s => s.responses))
    : 0
  
  return {
    total_responses: totalResponses,
    sections
  }
}

// Helper function to convert survey section title to question key
export function titleToKey(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
}

// Helper function to process text responses into word frequencies for word clouds
export function processTextForWordCloud(
  sections: SurveySection[],
  questionKey: string,
  minWordLength: number = 3,
  maxWords: number = 50
): SurveyDataPoint[] {
  const section = findSectionByQuestion(sections, questionKey)
  if (!section) return []
  
  // Common stop words to filter out
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from',
    'as', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these',
    'those', 'you', 'your', 'we', 'our', 'they', 'their', 'it', 'its', 'i', 'me', 'my', 'myself',
    'he', 'him', 'his', 'she', 'her', 'hers', 'what', 'which', 'who', 'whom', 'where', 'when',
    'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
    'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can',
    'will', 'just', 'don', 'should', 'now'
  ])
  
  const wordCounts = new Map<string, number>()
  
  // Process each response
  section.distribution.forEach((item) => {
    const text = item.value.toLowerCase()
    // Split by whitespace and punctuation
    const words = text
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => 
        word.length >= minWordLength && 
        !stopWords.has(word) &&
        !/^\d+$/.test(word) // Filter out pure numbers
      )
    
    words.forEach(word => {
      const count = wordCounts.get(word) || 0
      wordCounts.set(word, count + item.count)
    })
  })
  
  // Convert to array and sort by frequency
  const wordArray = Array.from(wordCounts.entries())
    .map(([value, count]) => ({
      value,
      count,
      percentage: (count / section.responses) * 100
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, maxWords)
  
  return wordArray
}

// Helper function to determine chart type based on data
export function determineChartType(section: SurveySection): ChartType {
  const distribution = section.distribution
  if (distribution.length === 0) return "bar"
  
  // If only 2 options and they look like Yes/No, use pie
  if (distribution.length === 2) {
    const values = distribution.map(d => d.value.toLowerCase())
    const yesNoPatterns = ['yes', 'no', 'true', 'false', 'y', 'n']
    if (values.some(v => yesNoPatterns.includes(v))) {
      return "pie"
    }
  }
  
  // If 3-5 options, use bar
  if (distribution.length <= 5) {
    return "bar"
  }
  
  // For longer lists, use horizontal-bar
  return "horizontal-bar"
}

// Helper function to normalize text for matching
// Treat underscores as spaces so config keys (snake_case) match JSON titles (natural language)
function normalizeForMatching(text: string): string {
  return text
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Helper function to extract key words (remove common words)
function extractKeyWords(text: string): string[] {
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'you', 'your', 'we', 'our', 'they', 'their', 'it', 'its'])
  const words = normalizeForMatching(text).split(' ').filter(w => w.length > 2 && !commonWords.has(w))
  return words
}

// Helper function to find section by matching title with question key
export function findSectionByQuestion(
  sections: SurveySection[],
  questionKey: string
): SurveySection | undefined {
  const questionKeyWords = extractKeyWords(questionKey)
  
  // First try exact match after normalization
  const normalizedQuestionKey = normalizeForMatching(questionKey)
  let bestMatch = sections.find((section) => {
    const normalizedTitle = normalizeForMatching(section.title)
    return normalizedTitle === normalizedQuestionKey || 
           normalizedTitle.includes(normalizedQuestionKey) ||
           normalizedQuestionKey.includes(normalizedTitle)
  })
  
  if (bestMatch) return bestMatch
  
  // Then try word-based matching
  let bestScore = 0
  for (const section of sections) {
    const sectionKeyWords = extractKeyWords(section.title)
    const matchingWords = questionKeyWords.filter(qw => 
      sectionKeyWords.some(sw => sw.includes(qw) || qw.includes(sw))
    )
    const score = matchingWords.length / Math.max(questionKeyWords.length, sectionKeyWords.length)
    
    if (score > bestScore && score >= 0.3) { // At least 30% match
      bestScore = score
      bestMatch = section
    }
  }
  
  return bestMatch
}
