# Cake Walk

## Module 4: Use The Settings API

The files in this folder represent how Calk Walk should appear at the end of this module. If you're stuck you can compare your files with these to figure out where you went wrong. You can also use these files to skip Module 1, 2 and 3.

### Step-by-step Instructions

1. In this module we'll teach Cake Walk to calculate the number of days until the user's birthday based upon their device's time zone setting. To do this, we'll first need to write the code that will ask their device what time zone it's in using the Settings API. Then, we'll just do a little math before composing the response for Alexa to speak. 
2. In order to query the settings API, we will need to provide the device id that the customer is using. The device ID is provided in every request that comes to our skill code. You shouldn't store this value in S3 because your customer may have more than one echo device, and each id is unique to the skill enablement. If the user were to enable and disable Cake Walk, they will get a new device id even though the physical device didn't change. We can access the device ID through the requestEnvelope with  `handlerInput.requestEnvelope.context.System.device.deviceId` . Let's add that to our code. In our **HasBirthdayLaunchRequestHandler** go to the first line of the **handle** function and paste the following:
    `const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;`
3. Now that we have captured the device ID, we need to pass it to the user profile settings API. So how do we call an API? Well, you'll need the URL of the API, an authorization token, the device ID (the one you just saved), and a library to make the call. That sounds like a lot of work! Luckily the SDK makes our life easier. It has a built-in **ServiceClient** that does this for you. All you need to do configure and use it. 
4. To configure the **ServiceClient** locate the line that starts with `exports.handler = Alexa.SkillBuilders.custom()` and paste the following on a new line below it:
    `.withApiClient(new Alexa.DefaultApiClient())`
5. Now let's go back to our **HasBirthdayLaunchRequestHandler**'s **handle** function and below the **deviceID** paste **const serviceClientFactory = handlerInput.serviceClientFactory;** This is what's known as a factory. It's sole purpose is to build things for you. We will use it to build the user profile settings service client. But before we do that, there's a chance that an error can happen when we do this, so we will need to wrap the code in a **try/catch** block. What's that you ask? It's a way to ensure that our skill code doesn't crash if we encounter an error. You wrap the code that could crash starting with the **try** keyword wrapping the block with **{}.** If the code within the curly braces crashes, the code in the **catch** block will run. In our **try** block we will use the **serviceClientFactory** to get the user profile settings service client, ups service client, and pass the device ID to the the **getSystemTimeZone** function to get the time zone for that device. Our **catch** block will log the error message using **console.log** and return an error message response that Alexa will say to the user. Locate the line that starts with **const day = sessionAttributes.hasOwnProperty('day') ? sessionAttributes.day : 0;** in your **handle** function and paste the following code:

    ```
    let userTimeZone;
    try {
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
        userTimeZone = await upsServiceClient.getSystemTimeZone(deviceId);
    } catch (error) {
        if (error.name !== 'ServiceError') {
            return handlerInput.responseBuilder.speak("There was a problem connecting to the service.").getResponse();
        }
        console.log('error', error.message);
    }
    ```
6. Since we're using the API to get the timezone, it could take a while to get a response, so we should fetch that information asynchronously. By this point we have used async / await keyword combination to get the persistent attributes. We again use that here to get the timezone from the API. we've already included the await keyword, so now we need to add the async keyword to the beginning of our handle function. Let's do that now. Add async to the **HasbirthdayLaunchrequest** handler's handle function. it should look like this: **async handle(handlerInput)**
7. Now that we have our time zone, let's use it to get the current date. To do that we can use the **date** function. Below our code we pasted in the previous step, paste the following line: 
 
   ```
   const currentDateTime = new Date(new Date().toLocaleString("en-US", {timeZone: userTimeZone}));
   ```    
   This will return the correct date according to the timezone we captured from the user's device. 
   
8. We didn't ask our users down to the second that they were born, so we are going to wish them a happy birthday at midnight on their birthday in their timezone. So we are going to drop the seconds in our date by recreating the date by extracting the year, month and day from our **currentDateTime**. Below the code we pasted in the previous step, paste the following:

    ```
    const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
    ```
    
9. Now we need to get the user's next birthday. To do that we need to do two things. We'll combine the year and month of their birthday with the current year. If their birthday has passed, then we'll need to make an adjustment by adding another year to the birthday. Paste the following code below the code you added in the previous step:
 
    ```
    let nextBirthday = Date.parse(`${month} ${day}, ${currentYear}`);
    
    if (currentDate.getTime() > nextBirthday) {
        nextBirthday = Date.parse(`${month} ${day}, ${currentYear + 1}`);
    }
    ```
10. Now that we have the current date and the date of their next birthday, it's time to compute the difference. To do that, we will convert each date into the number of milliseconds since epoch time (this is not out of Star Trek. It's also known as UNIX time and it starts January 1, 1970) and take the absolute value of the difference in milliseconds. Then we'll need to convert the number of milliseconds back into days. One day in seconds is 24 hours times 60 minutes times 60 seconds times 1000 milliseconds. Altogether that's 8,640,000 seconds! Let's take a look at how that would appear in code:

    ```
    const oneDay = 24*60*60*1000;
    const diffDays = Math.round(Math.abs((currentDate.getTime() - nextBirthday)/oneDay));
    ```
    
    **Note:** Since our math to calculate the number of seconds in a day never changes we could also hardcode the value: `const oneDay = 8640000;`

   We will only perform this math when it's not their birthday so we'll wrap this code in an if statement that checks for *currentDate.getTime() !== nextBirthday*. We can write less complex code by setting the default value of our *speechText* to say happy birthday and then in our *if statement* which will run when it's not their birthday we can set the *speechText* to tell the user how many days until their next birthday. All together the code will look like this:
    
    ```
    const oneDay = 24*60*60*1000;
    let speechText = "Happy ${currentYear - year}th Birthday!";
    if (currentDate.getTime() !== nextBirthday) {
        const diffDays = Math.round(Math.abs((currentDate.getTime() - nextBirthday)/oneDay));
        speechText = `Welcome back. It looks like there are ${diffDays} days until your ${currentYear - year}th birthday.`;
    }
    ```
11. You may have noticed that we set the ordinal date to “th”. Alexa is super smart and will automatically convert 3th to third instead of thirth.
    Paste this code below the code you pasted in the previous step.    
12. Now that you've completed this the handle should appear as it does below:

   ```
   const HasBirthdayLaunchRequestHandler = {
    canHandle(handlerInput) {
        console.log(JSON.stringify(handlerInput.requestEnvelope.request));
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
    async handle(handlerInput) {
        
        const serviceClientFactory = handlerInput.serviceClientFactory;
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        
        const attributesManager = handlerInput.attributesManager;
        const sessionAttributes = attributesManager.getSessionAttributes() || {};
        
        const year = sessionAttributes.hasOwnProperty('year') ? sessionAttributes.year : 0;
        const month = sessionAttributes.hasOwnProperty('month') ? sessionAttributes.month : 0;
        const day = sessionAttributes.hasOwnProperty('day') ? sessionAttributes.day : 0;
        
        let userTimeZone;
        try {
            const upsServiceClient = serviceClientFactory.getUpsServiceClient();
            userTimeZone = await upsServiceClient.getSystemTimeZone(deviceId);    
        } catch (error) {
            if (error.name !== 'ServiceError') {
                return handlerInput.responseBuilder.speak("There was a problem connecting to the service.").getResponse();
            }
            console.log('error', error.message);
        }
        console.log('userTimeZone', userTimeZone);
        
        const oneDay = 24*60*60*1000;
        
        // getting the current date with the time
        const currentDateTime = new Date(new Date().toLocaleString("en-US", {timeZone: userTimeZone}));
        // removing the time from the date because it affects our difference calculation
        const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
        const currentYear = currentDate.getFullYear();
        
        console.log('currentDateTime:', currentDateTime);
        console.log('currentDate:', currentDate);
        
        // getting the next birthday
        let nextBirthday = Date.parse(`${month} ${day}, ${currentYear}`);
        
        // adjust the nextBirthday by one year if the current date is after their birthday
        if (currentDate.getTime() > nextBirthday) {
            nextBirthday = Date.parse(`${month} ${day}, ${currentYear + 1}`);
        }
        
        // setting the default speechText to Happy xth Birthday!! 
        // Alexa will automatically correct the ordinal for you.
        // no need to worry about when to use st, th, rd
        let speechText = `Happy ${currentYear - year}th birthday!`;
        if (currentDate.getTime() !== nextBirthday) {
            const diffDays = Math.round(Math.abs((currentDate.getTime() - nextBirthday)/oneDay));
            speechText = `Welcome back. It looks like there are ${diffDays} days until your ${currentYear - year}th birthday.`
        }
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
```

14. Try it out yourself. Go the test simulator and open the skill. By typing or saying, "Alexa, open cake walk". The skill should now tell you the number of days until your next birthday.

If for some reason your code is isn't working you can check out the final version [here](../final).



### Contents

*  [en-US.json](./en-US.json)
*  [index.js](./index.js)
*  [package.json](./package.json)

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

1. From the [alexa developer console](https://developer.amazon.com) click on the **Code** tab.
2. Open the **index.js** file by selecting the tab or double-clicking on the file name on the right-hand side.
3. Copy the contents of [en-US.json](./en-US.json) and paste it over the contents of the editor
4. Click **Save**.
5. Click **Deploy**.

#### package.json
---
This file describes your project. It includes various meta data inclucding the dependencies of your project. 

1. From the [alexa developer console](https://developer.amazon.com) click on the **code** tab.
2. Open the **package.json** file by selecting the tab or double-clicking on the file name on the right-hand side.
3. Copy the contents of [index.js](./index.js) paste it over the data in your browser.
4. Click **Save**.
5. Click **Deploy**.