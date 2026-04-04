# CVPilot Job Role Keyword Database
# Each role has 15-20 keywords
# These are the skills recruiters look for

JOB_ROLES = {
    "Data Analyst": [
        "python", "sql", "excel", "tableau",
        "power bi", "statistics", "pandas",
        "numpy", "data visualization", "r",
        "matplotlib", "seaborn", "data cleaning",
        "pivot table", "vlookup", "google analytics"
    ],

    "Data Scientist": [
        "python", "machine learning", "deep learning",
        "tensorflow", "pytorch", "scikit-learn",
        "pandas", "numpy", "statistics", "sql",
        "nlp", "computer vision", "feature engineering",
        "model deployment", "jupyter", "keras"
    ],

    "ML Engineer": [
        "python", "machine learning", "tensorflow",
        "pytorch", "scikit-learn", "mlops",
        "docker", "kubernetes", "aws", "model deployment",
        "fastapi", "rest api", "numpy", "pandas",
        "feature engineering", "deep learning"
    ],

    "Backend Developer": [
        "python", "fastapi", "django", "flask",
        "rest api", "sql", "postgresql", "mysql",
        "mongodb", "redis", "docker", "aws",
        "git", "authentication", "jwt", "microservices"
    ],

    "Frontend Developer": [
        "javascript", "react", "html", "css",
        "tailwind", "typescript", "redux",
        "responsive design", "git", "figma",
        "nextjs", "vite", "sass", "webpack",
        "api integration", "testing"
    ],

    "Full Stack Developer": [
        "javascript", "react", "nodejs", "python",
        "sql", "mongodb", "rest api", "git",
        "docker", "html", "css", "typescript",
        "aws", "authentication", "redux", "fastapi"
    ],

    "DevOps Engineer": [
        "docker", "kubernetes", "aws", "azure",
        "ci/cd", "jenkins", "git", "linux",
        "terraform", "ansible", "monitoring",
        "bash", "python", "nginx", "github actions"
    ],

    "Android Developer": [
        "java", "kotlin", "android", "android studio",
        "xml", "retrofit", "room database",
        "mvvm", "jetpack compose", "firebase",
        "git", "rest api", "material design",
        "gradle", "coroutines"
    ],

    "Cloud Engineer": [
        "aws", "azure", "gcp", "docker",
        "kubernetes", "terraform", "linux",
        "networking", "security", "s3",
        "ec2", "lambda", "ci/cd", "python",
        "monitoring", "bash"
    ],

    "Product Manager": [
        "product roadmap", "agile", "scrum",
        "user research", "wireframing", "figma",
        "jira", "stakeholder management", "kpi",
        "analytics", "a/b testing", "sql",
        "market research", "user stories", "sprint"
    ]
}

# Flat list of ALL unique keywords across all roles
ALL_KEYWORDS = list(set(
    keyword
    for keywords in JOB_ROLES.values()
    for keyword in keywords
))