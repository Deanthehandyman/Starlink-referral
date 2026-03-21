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

def get_page_access_token():
    """Fetch page access token from user token"""
    try:
        user_token = os.getenv('FB_USER_ACCESS_TOKEN')
        page_id = os.getenv('FB_PAGE_ID')
        
        # Query the Graph API to get page access token
        graph = facebook.GraphAPI(access_token=user_token)
        accounts = graph.get_object('me/accounts', fields='id,access_token')
        
        # Find the matching page ID
        for account in accounts.get('data', []):
            if account['id'] == page_id:
                return account['access_token']
        
        logger.error(f"Page ID {page_id} not found in user accounts")
        return None
    except Exception as e:
        logger.error(f"Failed to get page access token: {e}")
        return None

def post_to_facebook():
    try:
        page_id = os.getenv('FB_PAGE_ID')
        
        # Try to use page token directly first
        page_token = os.getenv('FB_PAGE_ACCESS_TOKEN')
        
        # If no page token, fetch it from user token
        if not page_token:
            page_token = get_page_access_token()
            if not page_token:
                logger.error("❌ No page access token available")
                return
        
        message = ContentEngine().generate_post()
        graph = facebook.GraphAPI(access_token=page_token)
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
