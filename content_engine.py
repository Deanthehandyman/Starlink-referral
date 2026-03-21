import random
import json

class ContentEngine:
    def __init__(self, config_path='config.json'):
        with open(config_path, 'r') as f:
            self.data = json.load(f)

    def generate_post(self):
        biz = self.data['business_info']
        area = random.choice(self.data['service_areas'])
        category = random.choice(list(self.data['services'].keys()))
        service = random.choice(self.data['services'][category])
        
        templates = [
            f"📍 Serving {area}! Need {service} done right? {biz['name']} is ready to help. {biz['offers']} Call {biz['phone']} today!",
            f"Don't let that {service} project sit any longer. We're currently in the {area} area. Book your slot at {biz['website']}.",
            f"Starlink acting up in {area}? We specialize in pro-grade mounting and cable routing. 🛰️ Fast speeds, no mess. Dial {biz['phone']}.",
            f"Quick update for our neighbors in {area}: We have openings this week for {service}. Support local! {biz['phone']}"
        ]
        
        return random.choice(templates)
