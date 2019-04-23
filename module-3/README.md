# Cake Walk 

## Module 3: Add Memory To Your Skill

The files in this folder represent how Calk Walk should appear at the end of this module. If you're stuck you can compare your files with these to figure out where you went wrong. You can also use these files to skip head.

### Step-by-step Instructions


1. In this section we'll work on remembering the user's birthday. What's the point of collecting information from the user if we aren't going to remember it? Think about this from the user's perspective. If you ask them for their birthday once, and then continue to ask every subsequent time they use the skill, they're going to get frustrated! 
    
    Right now, we have the birth day, month and year within our code. The problem is that after our code finishes running, it forgets what those value. To solve the problem we're going to save them to S3 from our code. This way, we can read them between user sessions. 
    
    Start by going back into the code tab within Cake Walk. 
2. The SDK provides a useful mechanism for saving information across sessions. This is called the AttributesManager. Using attributes manager, the code you'll write to read and write data can remain the same if you later decide that you need to save data somewhere differently than you are now. What does that mean? 
    
    The back end code for Alexa skills can live on any HTTPS server on the internet. Most of the time, developers write and host their back end code using Amazon Web Services. While building Cake Walk, we've been writing our code here in the developer console using Alexa Hosted Skills, but in reality, that code is running on AWS. It's a great way to learn to build for Alexa and even to publish simple skills before you have a large audience. However, if your skill becomes popular, you may want to consider moving your back end code from here in the console, over to your own AWS resources. 
    
    Why bring this up? In a nutshell, when you use Alexa Hosted Skills for your back end code, if you want to persist data, it will be stored in a service called Amazon S3. Conversely, if you choose to build your back end on your own AWS instance, it may make more sense to save data using a service called Dynamo DB. If you don't know the difference between the two, don't worry. The important takeaway is that the code we're writing now, will work with either S3 or DynamoDB if you decide to migrate to your own AWS account later on.
3. With that out of the way, let's get started leveraging the AttributesManager to save our user's birthday. Start by double clicking on the package.json file in the left pane of the code tab. 
4. First, you'll notice that it says hello-world in the name field. **Go ahead and change that to cake-walk.**
    1. Locate the “dependencies” section. We're going to add a dependency to the list that is already there. It's easiest to put this at the bottom of the current list. Here's what you'll paste in: "**ask-sdk-s3-persistence-adapter": "^2.0.0**". You'll also need to add a comma '**,**' to the end of the line above. Here is what the whole file should look like when you're done:  

    ```
    { 
        "name": "cake-walk", 
        "version": "0.9.0", 
        "description": "alexa utility for quickly building skills", 
        "main": "index.js", 
        "scripts": { "test": "echo \"Error: no test specified\" && exit 1" }, 
        "author": "Amazon Alexa", 
        "license": "ISC", 
        "dependencies": { 
            "ask-sdk-core": "^2.0.7", 
            "ask-sdk-model": "^1.4.1", 
            "aws-sdk": "^2.326.0", 
            "ask-sdk-s3-persistence-adapter": "^2.0.0" 
        } 
    }
    ```
5. After verifying this change, go ahead and save now, just to be sure this change sticks. 
6. Click over to the index.js file in the left panel and click save.
7. We've just added a dependency that will allow us to use AttributesManager to save and read user data using Amazon S3. Now in our code, we need to import that dependency. Basically, we're going to let our code know that the dependency exists. Here's how:
    1. In your index.js, right below the line that reads `const Alexa = require('ask-sdk-core');`, you're going to add a similar line:
    
        `const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');`
    2. One more quick change. Scroll to the bottom of your index.js file. Locate the line that says 
        `exports.handler = Alexa.SkillBuilders.custom()`, add a new line and enter the following: 
        1. `.withPersistenceAdapter(
                new persistenceAdapter.S3PersistenceAdapter({bucketName:process.env.S3_PERSISTENCE_BUCKET})
            )`
        2. Here's how it should look now:
        
         ```
         exports.handler = Alexa.SkillBuilders.custom() 
             .withPersistenceAdapter( 
                 new persistenceAdapter.S3PersistenceAdapter({bucketName:process.env.S3_PERSISTENCE_BUCKET})
             )
         ```
             
    3. Great! You're now all set up to use AttributesManager to save and read data to Amazon S3. 
8. Now that you're set up to read and save, let's get to work modifying the code that will save the user's birthday. Still working on the code tab, within the index.js file, locate your **BirthdayIntentHandler**. This is the handler we created in the last module. Before we make changes to it, we need to explain the concept of asynchronous code. If you're familiar, feel free to breeze past this piece. 
9. When code is run, it typically runs really fast, line-by-line. This is fantastic. A computer can do a whole lot of calculations a heck of a lot faster than we can. However, when a portion of the code needs to do something that takes time before moving on to the next line of operations, things can get gummed up. It would be better if the part of the code that takes time could start and run without stopping the rest of the code from moving on. This is what we call asynchronous code. The reason it's important here, is because saving and reading user data takes a little more time than the rest of our code to run. Thankfully, making a block of code asynchronous is really simple. Here's what you need to do:
    1. Look within your **BirthdayIntentHandler**. You should see, as we examined previously, a canHandle and a handle function. In front of the handle function you'll need to type the word **async** followed by a space. Here's what it should look like:
        1. `async handle(handlerInput)`
    2. Next, we'll make use of the **AttributesManager** by using it to save the user's birthday! To access it we need to add the following line to our code. 
        `const attributesManager = handlerInput.attributesManager;`
    3. In step 1 we mentioned that our skill code has the year, month and day. In order to save that data, we need to tell S3 what data it needs to save. To do that, we need to tell AttributesManager what the data is so that it can package it up and send it over to S3. Here's what that package looks like:
    
        ```
        const birthdayAttributes = {
                 "year" : year,
                 "month" : month,
                 "day" : day
        };
        ```
        
        It kind of looks like we're stating the obvious here: “month” : month. In reality what we're doing is mapping the variables we already declared in our code to corresponding values that we'll store in S3 when this code runs.
    4. Next, now that we've declared these variables as persistent attributesto be stored in S3, we can move on to actually saving the user's data to them. Here's how:
        1. First, we'll use the AttributesManager to set the data that we're going to save to S3. Add the following code on a new line right beneath the code we just finished.
            `attributesManager.setPersistentAttributes(birthdayAttributes);`
        2. Remember the **async** keyword we added earlier? Here we'll write the line of code that will take a little time to execute as we send the user's information off to S3. This line will begin with a corresponding keyword: **await**. Here's what it looks like:
            `await attributesManager.savePersistentAttributes();`
            *By using this keyword, we tell our code to pause and continue after the user's information is saved to S3. If we didn't include it, our code would continue running whether the data was saved to S3 successfully or not. That could result in the same “What's your birthday?” question the next time the user uses the skill - annoying!
10. Great, we're now saving the user's birthday to S3 when they give it. However, we're still asking them what their birthday is. Why? Because as far as our skill is concerned, when the user launches it, there are three empty slots that need to be filled. What we need to do, is read from the data we've stored to S3 before asking the user for their birthday. If we have that data, there's no need to ask for it. If we don't we'll go ahead and ask. Let's modify our code!
11. To make things easier, we'll create a new handler in our code. The handler will raise its hand in the case that we have previously saved a birthday into S3. The **canHandle** function and the **handle** function of this new handler will both be communicating with S3. Since they're doing the same thing, it's wasteful to repeat (why communicate twice when you can communicate once). To consolidate, we'll use something called an interceptor. This interceptor will... intercept... the request to read the birthday information stored in S3. The intercepter will run each time a request is sent to our skill.
    
    Let's create an interceptor now:
    
    1. Search your code for the line that looks like: `exports.handler = Alexa.SkillBuilders.custom()`
        Right above this line, go ahead and copy paste the following code (the interceptor):
        
        ```
        const LoadBirthdayInterceptor = {
            async process(handlerInput) {
                const attributesManager = handlerInput.attributesManager;
                const sessionAttributes = await attributesManager.getPersistentAttributes() || {};
        
                const year = sessionAttributes.hasOwnProperty('year') ? sessionAttributes.year : 0;
                const month = sessionAttributes.hasOwnProperty('month') ? sessionAttributes.month : 0;
                const day = sessionAttributes.hasOwnProperty('day') ? sessionAttributes.day : 0;
                
                if (year && month && day) {
                    attributesManager.setSessionAttributes(sessionAttributes);
                }
            }
        };
        ```
    2.  Search your code for `.withPersistenceAdapter`. It should be toward the bottom. Here, we'll add the following code which will register our interceptor. (Let the SDK know that it exists). Paste it on a new line right below the line that says `exports.handler = Alexa.SkillBuilders.custom()` and right above the line that says `.withPersistenceAdapter`. Here's the code:

        ```
        .addRequestInterceptors(
            LoadBirthdayInterceptor
        )
        ```
                   
    3. Finally, we'll add the new handler. You can place this handler below the *LaunchRequestHandler*. We'll call it *HasBirthdayLaunchRequestHandler*. Here's what the handler looks like. We'll explain what it's doing after you've added it.
        
        ```
        const HasBirthdayLaunchRequestHandler = {
            canHandle(handlerInput) {
            
            const attributesManager = handlerInput.attributesManager;
            const sessionAttributes = attributesManager.getSessionAttributes() || {};
            
            const year = sessionAttributes.hasOwnProperty('year') ? sessionAttributes.year : 0;
            const month = sessionAttributes.hasOwnProperty('month') ? sessionAttributes.month : 0;
            const day = sessionAttributes.hasOwnProperty('day') ? sessionAttributes.day : 0;
            
            return handlerInput.requestEnvelope.request.type === 'LaunchRequest' &&
                year &&
                month &&
                day;
            },
            handle(handlerInput) {
                const year = sessionAttributes.hasOwnProperty('year') ? sessionAttributes.year : 0;
                const month = sessionAttributes.hasOwnProperty('month') ? sessionAttributes.month : 0;
                const day = sessionAttributes.hasOwnProperty('day') ? sessionAttributes.day : 0;
             
                const speechText = Welcome back. It looks like there are X more days until your y-th birthday.;
             
             
                return handlerInput.responseBuilder
                    .speak(speechText)
                    .getResponse();
            }
        };
        ```
12. In this code you'll see the usual canHandle and handle functions. In the canHandle we're checking to see whether we've saved the user's birthday into S3. If so, the handler will raise it's hand to let the SDK know that it can do the work (That we have the user's birthday and can handle doing what comes next.)
13. In the handle function within the handler, we simply tell Alexa to say `Welcome back. It looks like there are X more days until your y-th birthday.`
14. Here's a summary of what we've done. First, we adjusted our skill to use AttributesManager to save and read user information to S3. Then, we added the code necessary to our **BirthdayIntentHandler**  to save the user's birthday to S3. Last, we created a new handler (**HasBirthdayLaunchRequestHandler**) to handle the case where the user has already given us their birthday, so we don't need to ask for it again.
14. Let's click over to the **Test** tab to give our skill a try.
15. Try the following:
    1. Type or say, “open cake walk”
        1. Alexa should respond “Hello! I am Cakewalk. What is your birthday?”
    2. Tell Alexa your birth day, month and year. Feel free to try giving Alexa one or two of these, and ensure that she asks for and collects the rest of them.
        1. Alexa should respond “Thanks, I'll remember that you were born {whatever you told her was your birthday}.” Then the session will end. At this point, without all of the persistent stuff we added, the next time you invoke the skill, Alexa would ask for your birthday again. Since we made changes to store that information, the next time you open cake walk, she shouldn't as again. Let's test this.
    3. Say “open cake walk”
        1. Alexa should respond “Welcome back. It looks like there are X more days until your y-th birthday”
16. If you're quick, you'll realize that the way our code works right now, Alexa is literally saying x-th and y-th. Don't worry. In the next walkthrough we'll work on the code that will do the math so that our users don't have to!

Once you're ready you move on to [Module 4: Use the Settings API ](../module-4/README.md)

### Contents

*  [en-US.json](./en-US.json)
*  [index.js](./index.js)
*  [package.json](./package.json)
 
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
3. Copy the contents of [index.js](./index.js) and paste it over the data in your browser.
4. Click **Save**.
5. Click **Deploy**.

#### package.json
---
This file describes your project. It includes various meta data including the dependencies of your project. We are dependent on the [ASK SDK](https://ask-sdk-for-nodejs.readthedocs.io/en/latest/) which is automatically included when we created Alexa Hosted skill. We added a new dependency on the **ask-sdk-s3-persistence-adapter**, so we've updated in the code. To this this file:

1. From the [alexa developer console](https://developer.amazon.com) click on the **code** tab.
2. Open the **package.json** file by selecting the tab or double-clicking on the file name on the right-hand side.
3. Copy the contents of [package.json](./package.json) and paste it over the data in your browser.
4. Click **Save**.
5. Click **Deploy**.