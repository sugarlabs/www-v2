---
title: "GSoC ’25 Week 07 Update by Aditya Kumar Singh"
excerpt: "Enhanced shared mode synchronization for Tour and Doctor activities, improved scoring visualization, and camera state persistence in the 3D Human Activity."
category: "DEVELOPER NEWS"
date: "2025-06-30"
slug: "2025-06-30-gsoc-25-AdityaKrSingh26-week07"
author: "@/constants/MarkdownFiles/authors/aditya-singh.md"
tags: "gsoc25,sugarlabs,week07,AdityaKrSingh26"
image: "assets/Images/GSOC.png"
---

<!-- markdownlint-disable -->

# Week 07 Progress Report by Aditya Kumar Singh

**Project:** [Sugarizer](https://github.com/llaske/sugarizer)   
**Mentors:** [Lionel Laské](https://github.com/llaske)   
**Assisting Mentors:** [Samarth Bagga](https://github.com/SamarthBagga)   
**Reporting Period:** 2025-06-19 - 2025-06-25   

---

## Goals for This Week

- **Goal 1:** Implement shared mode synchronization for Tour activity  
- **Goal 2:** Enhance Doctor mode to show XO Icons and name with real-time scoring visualization  
- **Goal 3:** Persist camera zoom and orientation across sessions   
- **Goal 4:** Add support for side and back view positioning in Tour   

---

## This Week’s Achievements

1. **Shared Tour Mode**  
    - Implemented broadcast message `tourStep` carrying the part index & name; the host fires it and peers replay it to keep camera position and mesh highlight in lock-step.  
    - Added graceful join-in-progress sync: newcomers receive the current step and camera pose on `syncAllPaintData`, so nobody is “mid-tour-lost”.  
    ![Shared tour mode](https://i.ibb.co/TDsVpPpN/image.png)
    ```javascript
        // Broadcast tour step to other users
        presence.sendMessage(presence.getSharedInfo().id, {
            user: presence.getUserInfo(),
            action: "tourStep",
            content: {
                index: tourIndex,
                partName: part.name
            }
        });

        // Sync handler
        function syncTourStep(index, partName) {
            const part = bodyParts[index];
            const currentMesh = currentModel.getObjectByName(part.mesh);
            
            // Highlight mesh
            currentMesh.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color("#ffff00"),
                emissive: "#ffff00",
                emissiveIntensity: 0.2
            });

            // Position camera
            camera.position.set(
                part.position[0], 
                part.position[1], 
                part.position[2] + 5
            );
            camera.lookAt(part.position[0], part.position[1], part.position[2]);
        } 

2. **Shared Doctor Mode**  
    - Re-used the Presence layer from Paint mode to emit nextQuestion / answer / scoreUpdate events.  
    - First-correct-gets-the-point logic now lives entirely on the host  
    - Peer-to-peer visual feedback: *correct click flashes the mesh green, wrong click red*; scores float next to each user’s XO badge  
        ![Doctor mode screen](https://i.ibb.co/XxMzh5NS/image.png)   
        ![Doctor mode Wrong answer](https://i.ibb.co/vvYyyZ0v/image.png)   
        ![Doctor mode Correct answer](https://i.ibb.co/NgDVpG7f/image.png)   


3. **Camera & Zoom Persistence**  
   - Stored `cameraPosition`, `cameraTarget`, and `cameraFov` in the Journal JSON when the Stop icon is pressed.   
   - On activity resume we restore both orbit target and FOV, giving users continuity—especially useful after deep-dive zooms into organs.  
     ```javascript
        // Saving camera state
        function saveCameraState() {
            return {
                position: {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z
                },
                target: {
                x: orbit.target.x,
                y: orbit.target.y,
                z: orbit.target.z
                },
                fov: camera.fov
            };
        }
        // Restoring camera state
        function restoreCameraState(state) {
            camera.position.set(state.position.x, state.position.y, state.position.z);
            orbit.target.set(state.target.x, state.target.y, state.target.z);
            camera.fov = state.fov;
            camera.updateProjectionMatrix();
            orbit.update();
        }

4. Side and Back View Support for Tour
- Extended body part data (`organParts.json`) to include `sideView` and `frontView` flags.
- Tour camera now automatically adjusts orientation:
  - **Side view** → +X
  - **Back view** → −Z
  - **Front view** → +Z (default)
- Created adaptive camera logic in `activity.js` to interpret these flags.
        ![Side View](https://i.ibb.co/JW5JNMVD/image.png)   
        ![Back View](https://i.ibb.co/kZLLt0F/image.png)   


---

## Key Learnings

- Three.js Camera Control: Mastered advanced camera manipulation techniques
- Real-time Sync Patterns: Developed robust synchronization for 3D interactions
- Educational UX: Learned principles for effective learning feedback systems

---

## Next Week’s Roadmap

- Write Weekly Blog Post summarizing progress, screenshots, and key learnings.   
- Fix remaining issues for Human body mentioned in PR
- Start to implement the dashboard features of the stickman activity: draw, move
- Start with implementing the Frame part of the stickman activity, add a frame, remove a frame,

---

## Acknowledgments

Thank you to my mentors, the Sugar Labs community, and fellow GSoC contributors for ongoing support.

---
