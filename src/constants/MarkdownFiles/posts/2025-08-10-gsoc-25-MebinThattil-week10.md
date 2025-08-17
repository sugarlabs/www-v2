---
title: "GSoC ’25 Week 10 Update by Mebin J Thattil"
excerpt: "Deploying SugarAI"
category: "DEVELOPER NEWS"
date: "2025-08-10"
slug: "2025-08-10-gsoc-25-mebinthattil-week10"
author: "@/constants/MarkdownFiles/authors/mebin-thattil.md"
tags: "gsoc25,sugarlabs,week10,mebinthattil,speak_activity"
image: "assets/Images/GSOCxSpeak.png"
---

# Week 10 Progress Report by Mebin J Thattil

**Project:** [Speak Activity](https://github.com/sugarlabs/speak)  
**Mentors:** [Chihurumnaya Ibiam](https://github.com/chimosky), [Kshitij Shah](https://github.com/kshitijdshah99)  
**Assisting Mentors:** [Walter Bender](https://github.com/walterbender), [Devin Ulibarri](https://github.com/pikurasa)  
**Reporting Period:** 2025-08-03 - 2025-08-10

---

## Goals for This Week

- **Goal 1:** Setup AWS for LLM deployment - SugarAI 

---

## This Week’s Progress

### **1. Deploy SugarAI**

There is only one final part left in the refactor of the Speak Activity, and those are the LLM powered features. For this we need to have the LLM hosted somewhere.
So it was time to deploy SugarAI on our AWS.

So here is what I did:
- Spin up an EC2 instance that uses g5 large GPUs. This instance is being run under my AWS-Sugarlabs account. So if someone is reading this as documentation and there is an issue with the service and you need to reach out to me, do so by shooting me a mail at : [mail@mebin.in](mailto:mail@mebin.in).
- Ran the following code to setup the instance and pull SugarAI:
```bash
# Add Docker's official GPG key:
apt-get update -y
apt-get install -y ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

groupadd docker
usermod -aG docker $USER
systemctl enable docker.service
systemctl enable containerd.service

git clone https://github.com/sugarlabs/sugar-ai.git && cd sugar-ai
docker build -t sugar-ai .
docker run --gpus all -it --rm sugar-ai
```
- This runs the docker container and can be accessed locally on `port 8000`.
- The inbound security rules of the EC2 were set to allow incoming requests only on port `443(HTTPS)` and `22(SSH)`.
- After this I locally tested if the API was working. It was, but only locally on the EC2 for now. 
- In order to make it publically available I would have to create a nginx proxy from `port 8000` to `port 443` and also get SSL certificates.
- I then created a static IP using AWS's elastic IP so we could create an `A record` for this service, which would be needed to issue the SSL certificate.


---

## Next Week’s Roadmap

- Nginx proxy pass
- SSL Certificates
- A record creation and launch of [ai.sugarlabs.org](https://ai.sugarlabs.org)
- Google OAuth and Github OAuth for login

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for their ongoing support.

---