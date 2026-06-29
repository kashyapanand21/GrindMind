import json
import subprocess
from datetime import datetime, timedelta

def run_lemma_cmd(cmd):
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error running cmd {' '.join(cmd)}: {result.stderr}")
        return None
    try:
        return json.loads(result.stdout)
    except:
        return result.stdout.strip()

def get_records(table_name):
    res = run_lemma_cmd(["lemma", "record", "list", table_name])
    return res if isinstance(res, list) else []

def main():
    print("Generating Weekly Report...")

    # Fetch data
    solved = get_records("solved_problems")
    analyses = get_records("analyses")
    
    # Map analyses by problem_slug
    analyses_map = { a.get("problem_slug", ""): a for a in analyses }

    now = datetime.utcnow()
    seven_days_ago = now - timedelta(days=7)
    
    week_solves = []
    patterns_used = set()
    weak_areas = set()
    
    for problem in solved:
        slug = problem.get("problem_slug")
        date_solved_str = problem.get("date_solved")
        if not date_solved_str or not slug:
            continue
            
        try:
            date_solved = datetime.fromisoformat(date_solved_str.replace("Z", "+00:00"))
            date_solved = date_solved.replace(tzinfo=None)
        except ValueError:
            continue
            
        if date_solved >= seven_days_ago:
            week_solves.append(problem)
            
            # Extract patterns and weak areas from analysis
            analysis = analyses_map.get(slug, {})
            pattern = analysis.get("pattern_used", "Unknown")
            if pattern and pattern != "Unknown":
                patterns_used.add(pattern)
                
            approach = analysis.get("approach_type", "").lower()
            if "brute" in approach or "sub-optimal" in approach:
                topic = problem.get("topic_tags", "")
                if topic:
                    # Pick the primary topic to mark as a weak area
                    weak_areas.add(topic.split(",")[0].strip())

    report = {
        "report_date": now.isoformat(),
        "total_solved_this_week": len(week_solves),
        "patterns_practiced": list(patterns_used),
        "areas_to_improve": list(weak_areas)
    }
    
    print("--- WEEKLY REPORT ---")
    print(json.dumps(report, indent=2))
    print("---------------------")

if __name__ == "__main__":
    main()
