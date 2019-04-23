# Cake Walk

## Module 1: Build A Simple Skill In 5 Minutes

The files in this folder represent how Calk Walk should appear at the end of this module. If you're stuck you can compare your files with these to figure out where you went wrong. You can also use these files to skip head.

### Step-by-step Instructions

1. First, create an account on [developer.amazon.com/alexa](http://developer.amazon.com/alexa).
2. Next navigate to the [developer console](https://developer.amazon.com/alexa/console/ask)
    1. Click 'Create Skill'.
    2. Name your skill 'Cake Walk'.
    3. Select 'Custom' and 'Hosted Skill'.
    4. The infrastructure to support your skill will be provisioned - this will take a few moments.
3. Skills are composed of a front end and a back end. The front end is where you map spoken phrases (what the user says, which we call “utterances”) into a desired action, which we call an “intent”. The intent is what you want to have happen as a result of what the user said. It's up to you in your back end to decide how to handle the user's intent. 
4. The first thing a user will want to do with your skill is open it! Opening your skill, in this case, is their intent. Opening a skill is a special kind of intent known as a **LaunchRequest** that is built into the experience, so you don't need to define it in your front end. However, you do have to respond to it in your back end skill code.
5. The user is likely to say something like “Alexa, open Cake walk!” The built-in launch request will understand this intent. It's up to us to go to the back end and define how to handle it. 
6. Click **Code**
7. A handler is the SDK's way of defining a reaction to a user's request. There are two pieces to a handler 1.) a **canHandle** and  2.) a **handle**. The canHandle function is where you define whether or not the particular handler can deal with the incoming user request. For example, if your skill receives a LaunchRequest, the canHandle function within each handler determines whether or not that handler can service the request. In this case, the user wants to launch the skill. So the canHandle function within the LaunchRequestHandler will 'raise it's hand' to let the SDK know “I can handle this!” In computer terms, the canHandle returns 'True' to confirm that it can do the work.
8. So what do we want to happen after user launches the Cake Walk skill? - How should the skill respond? In this case we want the skill to simply confirm that the user accessed it. Let's have the skill respond "Hello! I am Cakewalk. That was a piece of cake! Bye!" 
9. To make the skill respond, we need to zero in on the handle function within the LaunchRequestHandler. This handle function will use something in the SDK called responseBuilder to compose and return the response to the user when they say “Open cake walk”. You'll notice that there are already some lines of code there. Let's briefly examine each one. 
    1. First, you'll see a variable called speechText. This is set to contain the string of words the skill should say back to the user when they launch the skill. Right now what it says doesn't really make sense for our skill. So, let's change it! For those who aren't familiar with programming, strings are encapsulated in double or single quotes. So, to change the string, just replace the text within the quotes to say “Hello! I am Cakewalk. That was a piece of cake! Bye!”
    2. Underneath the speech text, you'll see a line that begins with the word return. We'll get back to what this means in just a moment. Following the return you'll see `handler.responseBuilder`. Remember that we mentioned this earlier? This helpful piece of the SDK will build our response to the user.
    3. On the next line you'll see `.speak(speechText)`. Recognize speechText? Calling the `.speak()` function and passing speechText to it, tells responseBuilder to speak the value of speechText back to the user.
    4. Next, there's a line called reprompt. If our skill were going to listen for the user's response, we would use this. In this case, we want the skill to speak, and then exit. So, we'll omit this line of code for now. The easy way to do that is to place a double slash `//` in front of it.
    5. Last, you'll see `.getResponse()`. This converts the responseBuilder's work into the response that our skill will return. You can think of it like hitting the send button. 
10. Boom! We've built the code that will service our skill's LaunchRequest! Before doing anything else, we need to save our changes, and deploy the code. 
    1. Click save
    2. Click deploy (wait for it to deploy)
11. Now we can test! Click on the **Test** tab. First we'll need to enable our skill for testing. Click on the drop-down menu and select **Development** - You have not published your skill to the store, but you can test it out by using it from this console in development mode. 
    1. There are two ways to test. You can type to the skill what the user is saying (be careful, spelling matters!) or, you can speak to the skill by clicking and holding on the microphone icon and speaking. 
    2. Our skill, Cake Walk, has one intent. That special intent known as the **LaunchRequest** responds to the user when they ask Alexa to open or launch the skill. The user will say, “Alexa, open Cake Walk.” Cake Walk is the name of our skill, and also the 'invocation name'. When we named the skill, it's invocation name was automatically set to “cake walk”. This can be changed from the invocation name settings area of the **Build** tab - but we'll leave it as is. Go ahead and try using the skill with “Alexa, open Cake Walk”.
    3. You can see, and hopefully hear, Alexa responding in the way that we programmed!
12. Congratulations! You've built your first Alexa skill.
13. What do you say we make our skill more interactive?

When you're ready check out [Module 2: Collect Slots Turn-by-turn](../module-2/README.md).

### Contents

*  [en-US.json](./en-US.json)
*  [index.js](./index.js)

#### en-US.json 
---
This is your skill's interaction model. You can use this file to create your voice user interface. To use this file:

1. From the [alexa developer console](https://developer.amazon.com) click on the **Build** tab.
2. On the left hand side click on **JSON Editor**. 
3. Copy the contents of [en-US.json](./en-US.json) and paste it over the contents of the editor.
4. Click **Save Model**
5. Click **Build Model**

#### index.js
---
This is your skill's backend code. It's the logic that handles the requests that are sent to your skill. To use this file:

1. From the [alexa developer console](https://developer.amazon.com) click on the **code** tab.
2. Open the **index.js** file by selecting the tab or double-clicking on the file name on the right-hand side.
3. Copy the contents of [index.js](./index.js) paste it over the data in your browser.
4. Click **Save**.
5. Click **Deploy**.