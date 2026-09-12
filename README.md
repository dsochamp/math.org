# math-org | [math-org.vercel.app](https://math-org.vercel.app)

![Image of Website](https://user-cdn.hackclub-assets.com/01a081a6-f1d7-7544-9d02-1618944ff22b/Screenshot%202026-09-08%20at%207.32.52%E2%80%AFpm.png)

## TL;DR

math.org works on a BYOK (Bring Your Own Key) basis and coordinates with the Gemini 3.6 Flash model, the result of which is the production of detailed simulations and thorough explanations relating to the particular topic that is entered into the system. 

*Requires your own personal Gemini 3.6 Flash API key. Documentation for obtaining this key can be found here: [Gemini API Docs | Get Started](https://ai.google.dev/gemini-api/docs/get-started)*

## How to use it

math.org is easy to use.  First, you’ll need an API key from Google AI Studio. This should hopefully be included in the environment in a future release. Simply paste the key into the first input field. The second input is the topic you’re struggling with, be <strong>specific</strong> and avoid broad topics like *“Physics”* and instead focus on a particular aspect like *“the relationship between Kinetic and Potential Energy”*. The third input is a website you’d like the AI to use for information, this could be a textbook PDF or an article. Finally, you can write exactly what aspect you don’t understand so the AI can focus on explaining that specific part.  The third and fourth inputs are optional. You can leave them blank if you’d like the AI to find the information independently. 


## Tech Stack

The back-end of math.org uses javascript to communicate with the Gemini 3.6 Flash model using a ```fetch()``` command to the Generate Content API. 

The rest of the website is coded using HTML and CSS, utilizing HTML ids to connect the DOM Javascript, HTML and CSS. 

## Future

Sooner editions of math.org should hopefully include adding a longer chat for you to ask follow-up questions and create more advanced simulations using a Gemini Pro Model for more advanced code.

<hr>

#### Sometimes AI can write inaccurate explanations or hallucinate certain topics, sometime it would help if you double-checked or cross-verified the information in the simulation.

### dsochamp / Project 1 Aug 2026
