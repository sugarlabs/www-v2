---
title: "GSoC ’25 Week 11 Update by Mebin J Thattil"
excerpt: "Deploying SugarAI Continued"
category: "DEVELOPER NEWS"
date: "2025-08-17"
slug: "2025-08-17-gsoc-25-mebinthattil-week11"
author: "@/constants/MarkdownFiles/authors/mebin-thattil.md"
tags: "gsoc25,sugarlabs,week11,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.webp"
---

# Week 11 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-10 - 2025-08-17

---

## Goals for This Week

- **Goal 1:** Finish deployment of SugarAI and start with integration
  - **Subgoal 1:** Nginx proxy pass
  - **Subgoal 2:** SSL Certificates
  - **Subgoal 3:** `A record` creation and launch of [ai.sugarlabs.org](https://ai.sugarlabs.org)
  - **Subgoal 4:** Google OAuth and Github OAuth for login

---

## This Week’s Progress

### **1. Finishing up deployment**

- The nginx proxy was created. It maps `port 8000` to `port 443`, enabling HTTPS access.
The setup looks like:
```nginx
server {
    server_name ai.sugarlabs.org;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/ai.sugarlabs.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/ai.sugarlabs.org/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}

server {
    listen 443 ssl;
    server_name ai.sugarlabs.org;

    ssl_certificate /etc/letsencrypt/live/ai.sugarlabs.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ai.sugarlabs.org/privkey.pem;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
- Next, the SSL certificates were created using [Let's Encrypt and Certbot](https://letsencrypt.org/).
- An `A record` was created pointing to the static IP of our EC2 instance. The service can now be accessed at : [ai.sugarlabs.org](https://ai.sugarlabs.org/)
- The Google OAuth was set up and registered under the google cloud account of `mebin@sugarlabs.org`. The Github OAuth is yet to be done. (_If any changes / support is needed related to Google OAuth in the future, you can reach out to me at [mail@mebin.in](mailto:mail@mebin.in)_)


So finally SugarAI is live!! You can access it via the API. For docs take a look at the [README](https://github.com/sugarlabs/sugar-ai?tab=readme-ov-file#test-api-endpoints).

---

## Next Week’s Roadmap

- Integration of LLM as brains
- Write a `network_status.py` script or a function to check if user is connected to internet and decide which brain to use for chatbot (LLM / SLM) based on connectivity.
- Work on personas implementation and UI changes required for that.
- UI accomodation for accepting API key for SugarAI.

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for their ongoing support. Special thanks to [Krish](https://www.sugarlabs.org/authors/krish-pandya), who also helped with the deployment and development of SugarAI.

---