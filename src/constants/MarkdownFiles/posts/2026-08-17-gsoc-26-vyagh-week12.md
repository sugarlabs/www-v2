---
title: "GSoC '26 Week 12 Update by Shubham Sharma"
excerpt: "Sugar was deleting a child's saved reflection, Jo got its real instructions and an ending, peer reflection ran between two machines, AI settings landed in the control panel, and fourteen pull requests went upstream"
category: "DEVELOPER NEWS"
date: "2026-08-17"
slug: "2026-08-17-gsoc-26-vyagh-week12"
author: "@/constants/MarkdownFiles/authors/shubham-sharma.md"
description: "GSoC'26 Contributor at SugarLabs (AI Reflection in the Sugar Journal)"
tags: "gsoc26,sugarlabs,week12,vyagh"
image: "assets/Images/GSOCxJournal.webp"
---

<!-- markdownlint-disable -->

**Project:** [AI Reflection in the Sugar Journal](https://github.com/sugarlabs/GSoC/blob/master/Ideas-2026.md#ai-reflection-in-the-sugar-journal)  
**Mentors:** [Walter Bender](https://github.com/walterbender), [Ibiam Chihurumnaya](https://github.com/chimosky)  
**Assisting Mentors:** [Diwangshu Kakoty](https://github.com/Commanderk3), [Mebin J Thattil](https://github.com/mebinthattil), [Harshit Verma](https://github.com/therealharshit), [Aman Naik](https://github.com/AmanNaik)  
**Reporting Period:** 2026-08-10 - 2026-08-16  

---

Quick context if you're new here: this project puts a small AI buddy called Jo into the Sugar Journal. The whole idea, going back to [week 0](news/all/2026-05-23-gsoc-26-vyagh-week00), is to ask a child one good question about something they made and then get out of the way. Twelve weeks in, this was the week where most of that finally got tested on real conversations and real machines instead of just my own assumptions.

Short version of the week: found a real Sugar bug, gave Jo its actual instructions and a proper ending, got peer reflection running between two machines, put the AI settings into Sugar's control panel, and pushed the summer's Journal work upstream.

## Goals for This Week

- Cut the Journal work into changes a volunteer reviewer can actually read, and open them
- Replace the placeholder instructions Jo has been running on since week 7
- Give the reflection conversation a real ending, and a note that survives to the next session
- Take the peer-reflection brief to the mentors and build the smallest piece of it
- Make the AI something you can see and switch in Sugar's own settings

---

## This Week's Progress

### 1. Sugar was deleting a child's saved reflection

A Journal entry came back with its saved conversation replaced by a one-line stub and its next-time note wiped. At startup, no activity open, nobody touching it. The same thing had killed a demo entry a few days before and I'd blamed my own code.

Turns out it wasn't my code. Sugar stores an entry's metadata as one file per key, and the datastore deletes any key an incoming save doesn't mention. An activity's `save()` just writes back whatever metadata it loaded at open time, never re-reading the disk first. So anything added while the activity is open gets wiped on the next save. Same root cause as the known bug where the Portfolio activity overwrites an entry's description.

For now I've got a guard on the shell side. It holds, but it's a stopgap:

- **Re-read and merge before writing**, instead of trusting what was loaded at open time
- **Refuse to write less than what's stored**
- **Merge back anything that vanishes**, through a watcher

The real fix belongs in the datastore, delete a key when a caller asks, never by omission, and I've drafted that proposal for Walter. One change in one file, and it'd cover every activity, not just mine.

This one changed how I work, honestly. I'd been treating Sugar's storage layer as solid ground. It isn't, so now I check what the platform actually does before trusting it, not after something disappears.

Related, from the same area: last week's fix kept reflections off copies made to an external drive, and it missed a case: copying an entry between two external drives dragged the private conversation along.

### 2. Jo got its real instructions, and an ending

#### The real instructions

Jo's been running on a placeholder since week 7. This week it got the real thing, built partly off Khanmigo's published failure modes: kids pushing for the answer, an AI ignoring what the kid said, engagement dying once it feels like homework. No real children are involved in any of this yet, both sides of every test conversation are written by a model.

My first version barely beat the placeholder. Reading the conversations turned up two problems the per-turn grading had scored near perfect:

- **Yes-or-no questions slipping in**, which Jo's own rules forbid
- **Jo drifting into the story a kid wrote instead of the kid's making of it.** In one conversation about a dog diary, Jo spent four turns asking what the dog did next.

That gave me a rule I've kept since: read the conversations first, grade at the end. Two more rounds got a version worth adopting, and I wrote down what a whole good conversation looks like, nineteen rules on how Jo opens, builds, paces, stops and closes. Biggest finding was pacing. Pushing for more is the best-documented way this kind of tutoring goes wrong, and a short answer from a child isn't a failure to fix.

#### Warmth, settled

One rule flipped along the way. Back in [week 9](news/all/2026-07-27-gsoc-26-vyagh-week09) I'd left a question open: does warm acknowledgment count as the judging Jo's meant to stay out of? Went back through the twenty-six examples Walter marked good or bad, and the answer's no. Jo's instructions used to say never praise, not even "great job". Now they say never grade the work and never suggest improvements, but a brief warm line reacting to what the kid just said is fine, as long as the question stays the substance.

Worth separating from [week 8](news/all/2026-07-20-gsoc-26-vyagh-week08): back then I dropped a similar rule from the scorer, but Jo's own instructions still banned praise, which week 9 flagged. This closes that gap.

#### An ending

Jo can end a conversation now. After a few exchanges it offers to wrap up. Say yes and you get one closing question and a short goodbye, after which Jo stops calling the AI entirely. Ask to stop and the goodbye comes right away.

Say no and you keep going. That part was broken, and I only found it by asking a dumb-sounding question: what actually happens if the kid refuses? The offer was being made and the answer thrown away, so "no, keep talking" got the goodbye anyway. A refusal now buys four more exchanges, twice at most. The rule underneath is the constructionist one: the conversation runs on the child's clock. And the only way to check Jo actually did that was to ask what happens when a child pushes back.

Two things I'm not claiming. I couldn't find a single study or product that tests a good ending with children on their own creative work, so "the child decides when it's over" is my call and it's untested. And the wrap-up turn itself still breaks Jo's own rule, because the offer comes out as a yes-or-no question. From a real test run:

> Would you like to keep talking about your sounds, or are you ready to stop?

Not fixed yet.

### 3. Two engines, and the tests that grade them

#### Two engines, compared

I've been carrying two reflection engines: the one inside Sugar, and an older standalone one where I worked out the instructions and ending above. This week I ran them head to head, two capable models plus four small ones a school could run locally, with a second model scoring each transcript blind to which engine made it.

On the capable models the difference sat inside the noise. Ten cases can't separate a six-four split from a coin toss.

The small models were decisive, and both engines failed there for the same reason: each one shoves a convention into plain text and trusts the model to respect it.

- **Mine appends an end-of-conversation marker.** One 12B model spat that marker out in its first reply, ending the conversation before the child said anything, all ten times.
- **The older engine labels who's speaking.** Two models just parroted the labels back.

Neither failure can happen once those are typed fields instead of prose. And where both engines hit the floor, mine still asked the better questions on most cases.

So the plan is a rebuild: keep my typed connection to the model, take the older engine's offer-based ending over my silent turn cap, merge the question-writing. That's just a recommendation for now. Ten cases per model with a scripted child and four small models isn't enough data to settle it.

#### The conversation-level test, rebuilt

The other instrument, the one grading whole conversations, got rebuilt too. Last week I confirmed it rewards a question that just echoes the kid's words back. Checking it before fixing it found something worse: parts of it were written with the private test conversations in view, close enough to be quoting them. Same mistake I'd already caught once in the line-level checker. So I rewrote it from the published research alone and re-scored.

The construct problems are fixed, but the results still aren't evidence it works: scores move too much between runs, it leans on one overused example, and the case it was built to catch still scores near the top. I'm still not using it to shape what Jo says.

### 4. Peer reflection, working between two machines

#### Sharing an entry

Peer reflection sat queued behind the single-child work from week 6 to week 9, and last week I dropped the networked version because presence between two machines wasn't reliable. Section 8 explains why: a missing Debian package, not the design. So the networked route is back. Walter's direction was to let a child broadcast openness to collaborate on one Journal entry, the way they already can for a whole activity, with another child leaving a comment the way we review each other's pull requests. Both halves exist now, and two machines have run it end to end.

An entry gets its own share switch. Flip it on and the entry advertises itself to the neighbourhood, showing up on other machines as a Journal entry. A friend opens it and gets a page with the title, description, tags, and what made it. That's everything that crosses the wire. Nothing lands in the friend's own Journal, and the page disappears when the owner flips the switch off.

![One machine's neighbourhood view: two classmates and, lower left, a shared Journal entry. Resting on it shows "my rockit to the moon, a shared Journal entry".](/assets/Developers/vyagh/gsoc26-week12-shared-entry-neighbourhood.webp)

The friend can leave one question, and it lands in the owner's comments, where Sugar already keeps what people say about an entry. Next time that entry's conversation opens, Jo reads the question out in the friend's name. The answers stay on the machine, out of anything sent to a service and out of the saved note. A peer can ask and nothing more: there's no way in the page to rate the work.

![A test entry switched to let friends look, with Jo's rail on the right passing on a question left in the comments by Ana, an invented classmate.](/assets/Developers/vyagh/gsoc26-week12-peer-question.webp)

#### What broke, and what still needs designing

I attacked it twice:

- **The voicing had never worked at all.** It never read the entry's comments. Three smaller bugs came out alongside it.
- **The wire had ways to break.** Adverts, retractions, an activity's own save and a copied entry each found one.

And two limits I'm keeping in view:

- **The filter only checks the shape of a question**, so an unkind one in question form still passes.
- **Jo re-voicing a comment on its own is the wrong default** no matter how well it works. It sits behind the share switch and still wants a real design.

None of the sharing work is in the pull requests yet, and this retires the "Friends wondered" area from week 5.

Also noticed: "a peer can ask, never rate" is just Jo's own rule pointed at a different person. Watching the same rule hold for a friend's question is the best sign so far that it was the right thing to build the project around.

#### The nearby nudge

The nearby-nudge, where Jo suggests talking to someone in the room, got one change from Walter: it can fire at a random point, not just when Jo runs out of questions. Building it surfaced a privacy bug, the name of the person a child talked to and what they said were riding along in every later request to the service.

### 5. AI settings, in Sugar's own control panel

So far the AI has been a thing living in my code. Now there's an AI section in Sugar's control panel: a checkbox for the server, an address, a key. It checks the connection itself, so a wrong address tells you right there.

![The new AI section in Sugar's control panel: a checkbox for the server, an address, a hidden key, and a connection check reporting the server ready.](/assets/Developers/vyagh/gsoc26-week12-ai-settings.webp)

The checkbox only governs the server. Jo's offline side stays on regardless, so a machine with no network and no key still opens the panel and asks from the built-in bank. Sugar runs on machines without reliable internet, and reflection shouldn't be gated on having any. Four dull fixes made the panel safe to type into, the worst being a key file briefly readable by anyone on the machine. Whether reflection starts switched on is the mentors' call, which partly answers a week 9 question.

Where this config really belongs is bigger than my project. I put two shapes to Ibiam:

- **A library** every activity imports
- **One shell-level service** holding config and keys, the way the datastore already works

He leaned toward the second, the service's job is issuing and managing keys, close to his own idea of a laptop logging in with its private key. What I built is the narrow slice: the Journal reads a file the panel writes, and no other activity can call it yet. That layer stays outside my project till the project itself is done.

### 6. The Journal work went out for review

Last week these views worked and were verified on real Sugar. Making them readable by someone else took the rest.

- **I'd been over-commenting.** Cut every comment a Sugar reviewer with nothing but the public repo couldn't check.
- **The two views shared a pile of near-identical plumbing.** Now one shared base, following Sugar's own pattern.
- **The custom scroll handling went**, so they scroll like the rest of Sugar.

Hunting for anything else safe to cut turned up one dead line; everything left is doing work.

The working history was unreviewable, so I rebuilt the finished result as a small ordered series, gated on the tree coming out identical to before. Then three passes over it myself, one of which overturned two conclusions from the pass before. Converting the tests to Sugar's own style mattered more than it looked: Sugar's `make test` runs `unittest` discovery, which never collected the plain test functions I'd been adding all week.

Three passes each catching things the last one missed fits a pattern this project keeps rubbing in: my first read of my own work, code, test, or Jo's instructions, is never the last word.

Then it went out: fourteen pull requests, all open now. Eleven stack against Sugar in order, from small unrelated bug fixes up through the shared drawing helpers, the two views and their toggle, the offline reflection engine, the moment card, Jo's rail, the redesigned entry page, the closing invitation, and the AI settings panel on top. Three stand alone: rescaling the object chooser's previews, keeping reflections out of the Journal's search index, and raising the size of the preview image an entry stores.

None reviewed yet. Four Sugar bugs I found are still written up and unsent, the oldest a rename that kills the Journal's keyboard shortcuts for the rest of the session.

### 7. Collaboration was broken on Debian 13

This one's outside my project. I went there because peer reflection needs two machines that can see each other, and mine couldn't.

Sugar's peer presence runs on `telepathy-salut`, which Debian last shipped in version 11. Debian 12 and 13 don't carry it, Sugar's session still asks for it, and there's no fallback, so presence silently never comes up. Ibiam pointed me at [an open issue](https://github.com/sugarlabs/sugar/issues/996) on Sugar's telepathy dependencies, filed back in March 2025.

Switching to Fedora or an older Debian would've dodged the problem instead of fixing it, so I rebuilt the package from upstream source, with patches from Fedora's build plus one of my own for Debian 13, and installed the network daemon it needs, which was missing entirely. Two machines see each other now.

Whether Sugar should carry this itself is the real question. I put it to Ibiam; his answer was that carrying just the parts Sugar needs would be acceptable. That's a packaging change and not mine to make alone.

The same rig also lets me test [an identity-key fix](https://github.com/sugarlabs/sugar/pull/1014) other contributors proposed for [a related issue](https://github.com/sugarlabs/sugar/issues/1004).

### 8. Two smaller changes

**The closing invite got gated.** The invitation that pops up when a child closes an activity was firing every single time. Sugar makes a new Journal entry on every launch, so "did anything new happen" always said yes. Open something by accident, close it, and Jo still asked you to reflect on it.

Now it has to be earned twice over: the entry needs a file in it, and the child needs at least a minute in the activity. Resume something for half a minute and quit, nothing appears.

![The Home view just after closing a drawing activity, with a note in the corner: "Saved to your Journal. Want to look back at it with Jo?"](/assets/Developers/vyagh/gsoc26-week12-close-invite.webp)

It stays an offer. One note at a time, fades if ignored, never blocks the activity from closing. There's no keyboard path to it yet, an accessibility gap I'm flagging myself.

**The marks and the writing spot got redrawn.** Devin reviewed the moment card and the marks a child can put on a moment. The marks moved out of the save-note popup so it asks one thing. The glyphs got redrawn from Sugar's own artwork: tricky now uses the Maze activity's icon, which Walter suggested, and wonder uses the question emblem Sugar ships. Proud stays a flag, not a star, so it doesn't double up with the Journal's own favourite star.

The spot where a child writes about a moment was white text on white with no visible invitation. Now it's a painted band with a pencil and a cursor already blinking in it.

Stepping back for a second. Twelve weeks ago the whole idea was: give a child a good question, get out of the way, trust that to be enough. This week was the first time that idea got tested by something other than me agreeing with myself, in Jo's ending, in a peer's question standing in for Jo's, and in three separate places where a more careful read of my own earlier work turned up something wrong.

The idea held up. I trust it more now than I did in May, and I trust my own first pass at things a lot less.

---

## Key Learnings

- **A bug that only ever hit my own feature turned out to be Sugar's.** I spent the first occurrence assuming my own code had a race in it.
- **Grading every turn well isn't the same as the conversation being good.** Both problems in Jo's first real instructions scored near perfect turn by turn. I found them by reading.
- **A test that has seen its own answers is not a test.** Second time I've caught this here, in a different instrument, after already knowing to look.
- **A feature can pass review and still be dead.** The peer-question voicing was thoroughly built and never once read the comments it was meant to read.
- **Both my engines broke on small models for the same reason.** Each wrote a convention into plain text and trusted the model to respect it, and small models just don't.
- **Working correctly and being the right default are separate questions.** The peer voicing worked, and having it on by default was still wrong.

---

## What's Still Open

- Get the fourteen open pull requests through review, and send the four remaining Sugar bugs to the maintainers
- Send Walter the proposal that the datastore stop deleting metadata keys by omission
- Fix Jo's wrap-up question, which currently breaks Jo's own rule about yes-or-no questions
- Rebuild the engine on a typed connection to the model, carrying the offer-based ending across, and find it a home in Sugar Labs
- Design how Jo should offer to voice a friend's question instead of doing it automatically
- Decide whether reflection starts switched on
- Give the later-visit follow-up a sense of time passing, and handle a question bank that's empty on the first visit
- Get a second person to hand-label the depth anchor sheet
- Turn the safety reading into something concrete, starting with the question I raised in week 9 and still can't answer: what Jo should say if a child says something like feeling sad. That needs settling before any of this goes near a child.

---

## Resources & References

- **The Journal series:** [sugar #1111](https://github.com/sugarlabs/sugar/pull/1111) through [#1123](https://github.com/sugarlabs/sugar/pull/1123), eleven stacked pull requests
- **Object chooser previews:** [sugar #1122](https://github.com/sugarlabs/sugar/pull/1122)
- **Sugar's telepathy dependencies:** [sugar #996](https://github.com/sugarlabs/sugar/issues/996)
- **The identity key:** [sugar #1004](https://github.com/sugarlabs/sugar/issues/1004) and [sugar #1014](https://github.com/sugarlabs/sugar/pull/1014)
- **Keeping reflections out of search:** [sugar-datastore #30](https://github.com/sugarlabs/sugar-datastore/pull/30)
- **A larger preview image:** [sugar-toolkit-gtk3 #520](https://github.com/sugarlabs/sugar-toolkit-gtk3/pull/520)
- **Week 11 blog:** [GSoC '26 Week 11 Update](news/all/2026-08-10-gsoc-26-vyagh-week11)
- **Week 10 blog:** [GSoC '26 Week 10 Update](news/all/2026-08-03-gsoc-26-vyagh-week10)

---

## Acknowledgments

Thanks to Walter for the direction on entry-level sharing and peer comments, the Maze-icon suggestion, and the marked examples that settled the warmth question. Thanks to Ibiam for his continued guidance. Thanks to Devin for reviewing the moment card and the marks. Thanks to Diwangshu, Mebin, Harshit, and Aman for their continued input.

---

## Connect with Me

- GitHub: [@vyagh](https://github.com/vyagh)
- Email: [vyagh.vy@gmail.com](mailto:vyagh.vy@gmail.com)

---
