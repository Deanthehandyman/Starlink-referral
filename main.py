import os
import logging
import facebook
from dotenv import load_dotenv
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from content_engine import ContentEngine

load_dotenv()
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger(__name__)

def post_to_facebook():
    try:
        token = os.getenv('FB_PAGE_ACCESS_TOKEN')
        page_id = os.getenv('FB_PAGE_ID')
        message = ContentEngine().generate_post()
        graph = facebook.GraphAPI(access_token=token)
        graph.put_object(parent_object=page_id, connection_name='feed', message=message)
        logger.info(f"✅ Posted to Facebook: {message[:50]}...")
    except Exception as e:
        logger.error(f"❌ Post failed: {e}")

if __name__ == "__main__":
    import sys
    
    # Manual Test Mode: Run 'python main.py test' to post immediately
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        post_to_facebook()
    else:
        scheduler = BlockingScheduler(timezone="CST6CDT")
        
        for hour in [8, 13, 18]:
            scheduler.add_job(post_to_facebook, CronTrigger(hour=hour, minute=0))
        
        logger.info("Dean's Bot Started. Scheduling for 8AM, 1PM, 6PM CST.")
        scheduler.start()
