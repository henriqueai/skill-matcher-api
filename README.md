# Skill Matcher API

A simulated REST API environment to analyze developer profiles against target roles. 

This API helps assess how well a developer's skill set matches the requirements for a specific job position.

## 🚀 Endpoint

### POST `/api/v1/analyze`

#### Request Body:
```json
{
  "skills": ["JavaScript", "HTML", "CSS", "Git"],
  "targetRole": "Frontend Developer"
}
