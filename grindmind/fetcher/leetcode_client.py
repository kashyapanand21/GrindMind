import requests
import json
import sys
from datetime import datetime

LEETCODE_GRAPHQL = "https://leetcode.com/graphql"

HEADERS = {
    "Content-Type": "application/json",
    "Referer": "https://leetcode.com",
    "User-Agent": "Mozilla/5.0"
}

def get_recent_submissions(username, limit=20):
    payload = {
        "query": """
        query recentAcSubmissions($username: String!, $limit: Int!) {
          recentAcSubmissionList(username: $username, limit: $limit) {
            id
            title
            titleSlug
            timestamp
            lang
            runtime
            memory
          }
        }
        """,
        "variables": {"username": username, "limit": limit}
    }
    response = requests.post(LEETCODE_GRAPHQL, json=payload, headers=HEADERS)
    data = response.json()
    return data.get("data", {}).get("recentAcSubmissionList", [])

def get_problem_details(title_slug):
    payload = {
        "query": """
        query problemDetail($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            difficulty
            topicTags {
              name
            }
          }
        }
        """,
        "variables": {"titleSlug": title_slug}
    }
    response = requests.post(LEETCODE_GRAPHQL, json=payload, headers=HEADERS)
    data = response.json()
    return data.get("data", {}).get("question", {})

def fetch_and_print(username):
    print(f"Fetching submissions for {username}...")
    submissions = get_recent_submissions(username)

    if not submissions:
        print("No submissions found or profile is private.")
        return

    print(f"Found {len(submissions)} recent accepted submissions:")
    print("-" * 60)

    for sub in submissions:
        slug = sub["titleSlug"]
        details = get_problem_details(slug)

        topic_tags = ", ".join([t["name"] for t in details.get("topicTags", [])])
        date_solved = datetime.fromtimestamp(int(sub["timestamp"])).isoformat()

        record = {
            "username": username,
            "problem_name": sub["title"],
            "problem_slug": slug,
            "difficulty": details.get("difficulty", "Unknown"),
            "topic_tags": topic_tags,
            "date_solved": date_solved,
            "submission_status": "Accepted",
            "language": sub["lang"],
            "runtime": sub.get("runtime", ""),
            "memory": sub.get("memory", "")
        }

        print(json.dumps(record, indent=2))
        print("-" * 60)

if __name__ == "__main__":
    username = sys.argv[1] if len(sys.argv) > 1 else "your_leetcode_username"
    fetch_and_print(username)
