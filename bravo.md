# [dev] bravo
> make a web game...twice!

## overview 

### user story
- **as a** visitor to your github profile
- **i want** a game
- **so that** i haz funz

### narrative

You'll create a 
- ✨NEW REPO (let dev alfa rest for a bit), 
- use some new libraries/frameworks (jQ, jQUI, BS5 icons), 
- spend a lil' time planning (wiki/wireframe, issues/screenshots 🥷🏼), 
- & make 2 versions: 
  - 📝 concept (simple, by hand) & 
  - 🤖full (AI-assisted)

### minimum acceptance criteria 
> The smallest set of measurable requirements that must be met for a user story, feature, or deliverable to be considered complete and acceptable to the stakeholder or product owner

- a title/top nav bar with an icon 
  - nav between "concept" and "full game" mode  
- a "game board" section (`<div>`?), no mobile-responsiveness required. 
- user can enter their name & receive a greeting (guest mode too if no name)
  - guests get a random name 
- a score + leaderboard sections: see your scores and top scores
  - any other user info? date/time, IP, broswer, ...?  
  - hardcode some in...use `sessoinStorage`...`cheatMode()` in console?
  - a BS5 modal
- game play
  - guest or username
  - play: start, reset, (hint?) 
  - a clear ending: win, lose, score
- a footer
  - links to this game's REPO, your GitHub profile, anything else you want
  
## tasks

### 1️⃣ plan 
-  brainstorm 🧠🌪️ some game ideas
  - create a new GitHub issue: title, some notes in the first comment. 
  - then a comment for FIVE screenshot, game ideas: good, bad, ugly...whatever.
  - here's my example: https://github.com/barrycumbie/bravo-webgame/issues/1
  - link to this from your README
- create a wireframe: use a tool or draw & snap a pic
- save it in your GitHub repo, create new wiki page. 
  - if you don't see the `wiki` option, check your settings that it is toggled on ✅
  - link to this from your README

### 2️⃣ dev the concept

- create your new GitHub repo w/a README & enable GitHub Pages (save it in ⚙️)
- clone, pull, or downnload (.zip) to your local devbox & vsCode
- build the standard frontend web structure: `assets/js, assets/css, pages/, index.html...`
- give it a go! 
  - try hittin as many of the _MACs_ as you can
  - keep it simple: match one term instead of 6, move your gamepiece in one direction with no obstacles, etc. 
  
### 3️⃣ dev the full game
- using AI and/or more of you 🧠,
- level 🆙: more levels, toggle modes, better game play, cooler UI/Ux

### 4️⃣ finish out the `README`

```md

# game title
> short tagline

## authorship
- name + link to your GitHub Profile, date, version

## user story 
- **as a** ...be creative, the more specific the better 
- **i want** ...
- **so that** ...

## narrative
a bit more wordy blurb about the game...

> lasers, shotguns, & grenades, oh my! 
Step into adventure as the Brave Knight vs. The Dumb Dragon. Watch out for the Dragon's fart attack whilst dodging fiersome chickens. Use your arsenal to battle through increasingly harder levels. 

## about the app

### each of these as lvl-3 headings...

- links to wiki/wireframe & issue/game ideas
- a `tree` of your directory structure 
- a list of tech & tools 
  - e.g., vsCode (live server, todo, prettier), HTML (emmet), CSS (normalize, bs5 & bs icons), js (jQ, jQui), GitHub (repo, readme/markdwon, wiki, issues, GitHub pages)...others? 
- a code snippet: use triple backticks and code syntax highlighting to show off a cool portion of your code, 
  - e.g., this button's click (show html code) hit's this event (show js) calls this f/n (more js) and updates the dom
- validation & accessibilty
 - links & reports using Nu & Lighthouse
- finally, create & link to sprint 99/future ideas
  - create a milestone: sprint 99
  - create at least 3 issues for future ideas & label them as sprint 99 milestone 
```

### 5️⃣ update Profile & submit
- update your GitHub profile with links to both the REPO & APP
- **submit** a link to your profile app