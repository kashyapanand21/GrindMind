#input_type_name: SaveAnalysisInput
#output_type_name: SaveAnalysisResult
#function_name: save_analysis

from pydantic import BaseModel
from lemma_sdk import FunctionContext, Pod
import json
import subprocess
from datetime import datetime

class SaveAnalysisInput(BaseModel):
    username: str
    problem_slug: str
    pattern_used: str
    time_complexity: str
    space_complexity: str
    approach_type: str
    coaching_note: str
    topic_tags: str = ""

class SaveAnalysisResult(BaseModel):
    ok: bool
    message: str

def run_lemma_cmd(cmd):
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error running cmd {' '.join(cmd)}: {result.stderr}")
        return None
    if not result.stdout.strip():
        return None
    try:
        return json.loads(result.stdout)
    except:
        return result.stdout.strip()

async def save_analysis(ctx: FunctionContext, data: SaveAnalysisInput) -> SaveAnalysisResult:
    now = datetime.utcnow().isoformat() + "Z"

    # 1. Save to analyses table
    analysis_record = {
        "problem_slug": data.problem_slug,
        "username": data.username,
        "pattern_used": data.pattern_used,
        "time_complexity": data.time_complexity,
        "space_complexity": data.space_complexity,
        "approach_type": data.approach_type,
        "coaching_note": data.coaching_note,
        "analysed_at": now
    }
    
    subprocess.run(["lemma", "record", "create", "analyses", "--data", json.dumps(analysis_record)])

    # 2. Update skill scores
    topics = [t.strip() for t in data.topic_tags.split(",") if t.strip()]
    if not topics:
        return SaveAnalysisResult(ok=True, message="Analysis saved, no topics to score.")

    # Fetch existing scores for this user
    all_scores = run_lemma_cmd(["lemma", "record", "list", "skill_scores"]) or []
    user_scores = { s["topic"]: s for s in all_scores if s.get("username") == data.username and "topic" in s }
    
    is_optimal = "brute" not in data.approach_type.lower() and "sub-optimal" not in data.approach_type.lower()

    for topic in topics:
        existing = user_scores.get(topic)
        if existing:
            new_total = existing.get("total_solved", 0) + 1
            new_optimal = existing.get("optimal_count", 0) + (1 if is_optimal else 0)
            score_delta = 10 if is_optimal else 2
            new_score = existing.get("score", 0) + score_delta
            
            update_data = {
                "total_solved": new_total,
                "optimal_count": new_optimal,
                "score": new_score,
                "last_updated": now
            }
            # The CLI needs the record ID to update
            record_id = existing.get("id")
            if record_id:
                subprocess.run(["lemma", "record", "update", "skill_scores", str(record_id), "--data", json.dumps(update_data)])
        else:
            new_record = {
                "username": data.username,
                "topic": topic,
                "score": 10 if is_optimal else 2,
                "total_solved": 1,
                "optimal_count": 1 if is_optimal else 0,
                "last_updated": now
            }
            subprocess.run(["lemma", "record", "create", "skill_scores", "--data", json.dumps(new_record)])
            
    return SaveAnalysisResult(ok=True, message="Analysis saved and skill scores updated.")

