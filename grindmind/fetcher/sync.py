import sys
import os
import subprocess
import json
from leetcode_client import get_recent_submissions, get_problem_details
from datetime import datetime

def get_existing_slugs():
    result = subprocess.run(
        ["lemma", "record", "list", "solved_problems"],
        capture_output=True, text=True
    )
    slugs = set()
    try:
        data = json.loads(result.stdout)
        for row in data:
            slugs.add(row.get("problem_slug", ""))
    except:
        pass
    return slugs

def push_record(record):
    data_str = json.dumps(record)
    result = subprocess.run(
        ["lemma", "record", "create", "solved_problems", "--data", data_str],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        print(f"  Inserted: {record['problem_name']}")
    else:
        print(f"  Failed: {record['problem_name']} — {result.stderr.strip()}")

def sync(username):
    print(f"Starting sync for {username}...")
    
    existing_slugs = get_existing_slugs()
    print(f"Already have {len(existing_slugs)} problems in database.")
    
    submissions = get_recent_submissions(username, limit=20)
    if not submissions:
        print("No submissions found or profile is private.")
        return

    new_count = 0
    for sub in submissions:
        slug = sub["titleSlug"]
        if slug in existing_slugs:
            print(f"  Skipping (already exists): {sub['title']}")
            continue

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

        push_record(record)
        new_count += 1

    print(f"\nSync complete. {new_count} new problems added.")

if __name__ == "__main__":
    username = sys.argv[1] if len(sys.argv) > 1 else "your_leetcode_username"
    sync(username)