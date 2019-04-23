# Cake Walk

## Module 2: Collect Slots Turn-by-turn

The files in this folder represent how Calk Walk should appear at the end this module. If you're stuck you can compare your files with these to figure out where you went wrong. You can also use these files to skip ahead.

### Step-by-step Instructions

1. We're going to make some adjustments to the back end, or logic, of our skill. The first thing we want to do to make our skill more useful is to have Alexa collect some information from the user. Let's collect the user's birthday! 
2. To make this happen, we'll need to change the logic that we specified previously so that after Alexa speaks to the user, she then poses a question. “What is your birthday?” 
3. Remember when we passed speechText to the .speak() function? We can simply update the string there, to instead say, “Hello, I am Cakewalk. What is your birthday?”
4. That's not all, though. Remember that currently after Alexa speaks, the skill exists. We need to somehow, tell Alexa to listen for the user to respond. It'd be pretty weird to ask someone a question and then walk away. Right? 
5. To do that, we'll first remove the slash marks that commented out the .reprompt() portion of our skill code out. Go ahead and delete the double slash marks now. 
6. Reprompt does two things. First, it tells the skill to wait for the user to reply, rather than simply exiting. Second, it allows you to specify a way to ask the user again, in the event that they don't respond initially. 
7. It's a best practice to make your reprompt different from your initial speech output. The user may not have responded for a variety of reasons. You want to pose the initial question, but do so in a natural way. Let's specify the reprompt text now.
8. Let's add a new variable called repromptText. You can create a new line under the speechText variable. Set repromptText equal to the string “I was born November sixth, two thousand fifteen. When were you born?” 
9. You'll notice that in the reprompt we gave a subtle example of what we expect the user to say, by having Alexa provide her own birthday in the format we're looking for. Providing subtle examples like this is a best practice.
10. Now that we've specified repromptText, we'll pass it to the .reprompt() function.
11. There is a potential complication with asking the user for their birthday. They might respond to “What is your birthday” in all kinds of ways. For example, they might choose to give only the month and day. “I was born on July 12th.” Or, they might say “next Tuesday!”. We won't try to cover all of the different ways a user might respond here, but we'll challenge you at the end of this course to account for them. For now, let's focus on a way to ensure that Alexa is able to collect the month, day and year from the user.
12. Go ahead and save, then deploy the changes we've made here in the **Code** tab. This is a good habit to get into.
13. We'll now go back to the **Build** tab to make some adjustments to our skill's front end. Specifically, we need to create an Intent that will interpret how the user responds to our birthday question.
14. First, let's create an intent. When you name intents, think about what it is that the intent is going to do for the user. In this case, our intent is going to capture the user's birthday, so, we'll call it birthday intent. Typically, we smash words together with each new word in upper case: BirthdayIntent.
    1. Click the add button next to intents. 
    2. Select, create custom intent, and type BirthdayIntent. Click the button to create the intent. 


15. Now, we'll begin to add utterances to the intent. These utterances are what we expect the user to say in response to the birthday question. So for example, the user might say, “I was born on November seventh, nineteen eighty three.” So we'll add that utterance to the BirthdayIntent by typing it in exactly the way we expect the user to say it. **Note: When typing numbers into the simulator you must spell out the numbers. eleven not 11.** 
16. But, what about those folks who respond to the question differently? What if they say, “In July.” In that case, we've collected the month... but what we really want, is the entire birthday. What about the day and the year?
17. With Alexa you have the ability to break utterances down into their components. In the case of the utterance “I was born on November seventh, nineteen eighty three” there are three key pieces of information we need to collect. These are what we call 'slots'. So, step one will be to let Alexa know which words are slots, and what kind of slots they are.
18. Let's start with the month slot. In the utterance, we'll replace the word representing the month (November) with the word month inside curly braces. Like this “I was born on {month} seventh, nineteen eighty three.” By adding curly braces, you have created a slot called month. Do this for the other variable pieces of information, too. Your utterance should now look like “I was born on {month} {day} {year}.”
19. The user may omit the preamble of “I was born on...”. You can account for this by adding a second utterance of simply {month} {day} {year}. 
20. To be through, make sure you account for all of these potential slot combinations by adding them as utterances:  
    
    ```
    {month} {day}
    {month} {day} {year}
    {month} {year}
    I was born on {month} {day} 
    I was born on {month} {day} {year}
    I was born on {month} {year}
    ```
21. Now that we've let Alexa know what slots need to be collected (and covered some of the different patterns that users might provide them in). We need to define what exactly those slots are. To do this, we'll assign a slot type to each slot. Scroll down below the space where you've been inputting utterances, and you'll see your slots have populated. Cool! 
22. To the right of each slot, there's a drop-down menu. This is where you can assign slot types to your slots.
23. There are two categories of slot types: custom and built in. Wherever possible, it is best to use built in slots. These are slot definitions that Amazon manages for you to use. Built in slots begin with AMAZON and include the title for what they define. For our {month} slot, we can set the drop-down menu to AMAZON.Month. In the event that there is not an applicable built in slot, you can create a custom slot and define the values it represents. We'll only be using built in slots for this course.
24. Go ahead and define the {day} and {year} slots with built in slot types. (AMAZON.Oridinal and AMAZON.FOUR_DIGIT_NUMBER)
25. Great! We have created an intent that collects the user's birth month, day and year — but we have not yet solved the problem where a user provides only one or two of the three necessary slot values. Let's work on that now. 
26. Slots can be required or optional. That is, if we need a given value from the user, we can designate a slot as required. Some slots may not be required, but marking a slot required triggers Alexa to actively work to “fill” it. The termto  to describe this is Dialog Management. When you mark any one slot within an intent as required, you automatically activate Dialog Management. 
27. Make all three slots (month, day and year) required.
    1.  Select the 'Edit Dialog' link for the {month} slot (to the right of the slot type drop down)
    2. Here, turn the toggle switch for “Is this slot required to fulfill the intent?” to on.
    3. A field called “Alexa speech prompts” will appear. Here, you'll enter the text Alexa will say in the event that the user fails to provide a slot value for month. In the field type “What month were you born in?”
    4. Do this same thing for the day and year slots.
28. Now, if the user responds with “July, nineteen eighty two” Alexa will recognize that the month and year slots have been filled, but the day slot has not. It must still be collected in order to have the user's entire birthday. For each unfilled slot, Alexa will ask the user, for the corresponding value. In this case, Alexa might say, “I was born on the sixth. What day were you born on?”
29. As you might have noticed, one of the great things about Dialog Management is that the skill doesn't break or get confused if the user leaves one piece of information out, or provides it out of the expected order. Instead, Alexa takes on the responsibility of collecting all of the information we designate as required to ensure a useful experience.
30. Excellent. We've put together an intent that will listen for the user's answer to Alexa's birthday question. When the user responds, Alexa will collect the user's birthday month, day and year. This information will be put into a JSON request and sent over to our skill's back-end code. 
31. Before we move on, there's a HelloWorld intent in our skill. That's a leftover from the starter template that we don't need. Go ahead and delete it by clicking the trash can next to it. Be careful to only do this on the **HelloWorldIntent**. You don't want to delete the **BirthdayIntent** that we just worked so hard on! Note that there are some other intents in the skill. These are required for every skill and provide the user a means to cancel, stop and get help. Do not remove these!
32. Alright! Let's go to the **Code** tab, now, and build a handler to decide what to do with the user's birthday!
33. Recall previously when we modified the **LaunchRequest** handler? This time, we're going to build a handler from scratch. This handler will handle the case where the user provides their birthday. We want to first acknowledge that they provided it. To do this, we'll need to build a handler that acknowledges and  handles the case where the user gives us their birthday. 
34. First thing's first. If you look at the code, you'll notice that there is a **HelloworldIntentHandler**. But, didn't we delete the **HelloWorldIntent**? Not entirely. The intent is gone from our front end, but the back-end handler is still there. No worries! To make things easier on ourselves, since we need a handler anyway, let's just rename the **HelloworldIntentHandler** to **BirthdayIntentHandler**! Now all we have to do is build out some new logic in the **BirthdayIntentHandler**.
35. Now, in the handler, within the canHandle function, locate the line that says:
    1. `return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'BirthdayIntent';`
    2. Part of this is incorrect. I bet you know what to change! (**HelloworldIntent** to **BirthdayIntent**)
    3. This change will ensure that the **canHandle** function will raise it's hand when a **BirthdayIntentRequest** comes through. 
36. Now that the handler will raise it's hand to handle the **BirthdayIntent** request, we need to update the logic within the handler to confirm with the user that we heard their birthday. In this case we won't ask for them to confirm, we'll just read the birthday back to them. “Thanks, I'll remember that you were born on {month} {day} {year}.” There are a few steps:
    1. To save ourselves a lot of extra typing later on, we'll create three variables in the handler to save the slots that we've collected.
        1. `const year = handlerInput.requestEnvelope.request.intent.slots.year.value;`
        2. `const month = handlerInput.requestEnvelope.request.intent.slots.month.value;`
        3. `const day = handlerInput.requestEnvelope.request.intent.slots.day.value;`
    2. Next, we'll need to update the speechText so that we don't leave the user hanging. To do this, we'll use what is called a template literal. This will allow us to drop our brand new variables straight into a string. Here's what that looks like:
        1. ```const speechText = `Thanks, I'll remember that your birthday is ${month} ${day} ${year}.`
        ```
37. Before we do anything else, we need to update one more spot in this code. Remember when we changed **HelloworldIntentHandler** to **BirthdayIntentHandler**? In every Alexa skill that uses the SDK, there is a place to notify the SDK of the available handlers. This is called registering. Scroll down until you find a line that begins with the word exports. Under that line you will see a function called **.addRequestHandlers()**. Within that function you'll see the list of handlers in the skill - once again, **HelloworldIntentHandler** is listed. We need to change that to **BirthdayIntentHandler**. Otherwise the skill will throw an error!
38. Nice! Let's test to make sure that we have accurately collected it and can speak it back to them.
39. Click save and then Deploy. Your skill should take a moment to rebuild.
40. Click the test tab and give your skill a try. “Alexa, open cake walk.”
    1. Alexa should respond with a welcome, then prompt you for your birthday. 
    2. After you provide your birthday, Alexa should respond with “Thanks, I'll remember that you were born on {month} {day} {year}.”
    3. Go ahead and test what happens if you provide only the year, the year and the day, and other combinations. Alexa should prompt you for any slot values that you omit.
41. In the next iteration, we'll remember the user's birthday.

When you're ready check out [Module 3: Add Memory To Your Skill](../module-3/README.md).

### Contents

*  [en-US.json](./en-US.json)
*  [index.js](./index.js)

#### en-US.json 
---
This is your skill's interaction model. You can use this file to create your voice user interface. To use this file:

1. From the [alexa developer console](https://developer.amazon.com) click on the **Build** tab.
2. On the left hand side click on **JSON Editor**. 
3. Copy the contents of [en-US.json](./en-US.json) and paste it over the contents of the editor
4. Click **Save Model**
5. Click **Build Model**

#### index.js
---
This is your skill's backend code. It's the logic that handles the requests that are sent to your skill. To use this file:

1. From the [alexa developer console](https://developer.amazon.com) click on the **Code** tab.
2. Open the **index.js** file by selecting the tab or double-clicking on the file name on the right-hand side.
3. Copy the contents of [index.js](./index.js) paste it over the data in your browser.
4. Click **Save**.
5. Click **Deploy**.