#input_type_name: UpdateRevisionQueueInput
#output_type_name: UpdateRevisionQueueResult
#function_name: update_revision_queue

from pydantic import BaseModel
from lemma_sdk import FunctionContext
import json
import subprocess
from datetime import datetime, timedelta

class UpdateRevisionQueueInput(BaseModel):
    pass

class UpdateRevisionQueueResult(BaseModel):
    ok: bool

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

async def update_revision_queue(ctx: FunctionContext, data: UpdateRevisionQueueInput) -> UpdateRevisionQueueResult:
    print("Starting update_revision_queue function...")

    # Fetch data
    solved = get_records("solved_problems")
    analyses = get_records("analyses")
    existing_queue = get_records("revision_queue")
    
    # Map analyses by problem_slug
    analyses_map = { a["problem_slug"]: a for a in analyses if "problem_slug" in a }
    existing_queue_slugs = { q["problem_slug"] for q in existing_queue if "problem_slug" in q }

    now = datetime.utcnow()
    
    for problem in solved:
        slug = problem.get("problem_slug")
        if not slug:
            continue
            
        date_solved_str = problem.get("date_solved")
        if not date_solved_str:
            continue
            
        # Parse ISO date safely
        try:
            # Handle standard ISO formats
            date_solved = datetime.fromisoformat(date_solved_str.replace("Z", "+00:00"))
            # Make naive for easy comparison (assuming UTC)
            date_solved = date_solved.replace(tzinfo=None)
        except ValueError:
            continue
            
        days_ago = (now - date_solved).days
        
        analysis = analyses_map.get(slug, {})
        approach_type = analysis.get("approach_type", "").lower()
        
        needs_revision = False
        priority = "Low"
        reason = ""
        
        # Rule 1: Brute force approaches need quicker review (e.g., 3 days)
        if "brute" in approach_type or "sub-optimal" in approach_type:
            if days_ago >= 3:
                needs_revision = True
                priority = "Critical"
                reason = "Sub-optimal / Brute force approach needs improvement"
        
        # Rule 2: Spaced repetition for standard problems (7 days)
        elif days_ago >= 7:
            needs_revision = True
            priority = "High" if days_ago >= 14 else "Medium"
            reason = "Spaced repetition (7+ days)"
            
        if needs_revision:
            if slug in existing_queue_slugs:
                print(f"[{slug}] already in revision queue.")
                continue
                
            # Insert into revision_queue
            new_record = {
                "username": problem.get("username", "system"),
                "problem_slug": slug,
                "problem_name": problem.get("problem_name", slug),
                "due_date": now.isoformat() + "Z",
                "priority": priority,
                "reason": reason,
                "status": "pending"
            }
            
            print(f"Adding [{slug}] to revision queue. Reason: {reason}")
            data_str = json.dumps(new_record)
            subprocess.run(["lemma", "record", "create", "revision_queue", "--data", data_str])

    print("Revision queue update complete.")
    return UpdateRevisionQueueResult(ok=True)
