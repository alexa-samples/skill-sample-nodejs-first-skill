// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.

/////////////////////////////////
// Modules Definition
/////////////////////////////////

// ASK SDK
const Alexa = require('ask-sdk-core');
// ASK SDK adapter to connecto to Amazon S3
const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');
// i18n library dependency, we use it below in a localisation interceptor
const i18n = require('i18next');
// We import a language strings object containing all of our strings.
// The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG')
const languageStrings = require('./languageStrings');

/////////////////////////////////
// Handlers Definition
/////////////////////////////////

/**
 * Handles LaunchRequest requests sent by Alexa when a birthdate has been registered
 * Note : this type of request is send when the user invokes your skill without providing a specific intent.
 */
const HasBirthdayLaunchRequestHandler = {
    canHandle(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes() || {};
        
        const year = sessionAttributes.hasOwnProperty('year') ? sessionAttributes.year : 0;
        const month = sessionAttributes.hasOwnProperty('month') ? sessionAttributes.month : 0;
        const day = sessionAttributes.hasOwnProperty('day') ? sessionAttributes.day : 0;
        
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest' 
            && year 
            && month 
            && day;
    },
    async handle(handlerInput) {
        const {serviceClientFactory, requestEnvelope, attributesManager} = handlerInput;
        const deviceId = Alexa.getDeviceId(requestEnvelope)
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
                const errorSpeechText = handlerInput.t('ERROR_TIMEZONE_MSG');
                return handlerInput.responseBuilder.speak(errorSpeechText).getResponse();
            }
            console.log('error', error.message);
        }
        console.log('userTimeZone', userTimeZone);
        
        const oneDay = 24*60*60*1000;
        
        // getting the current date with the time
        const locale = Alexa.getLocale(requestEnvelope);
        const currentDateTime = new Date(new Date().toLocaleString(locale, {timeZone: userTimeZone}));
        // removing the time from the date because it affects our difference calculation
        const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
        let currentYear = currentDate.getFullYear();
        
        console.log('currentDateTime:', currentDateTime);
        console.log('currentDate:', currentDate);
        
        // getting the next birthday
        let nextBirthday = Date.parse(`${month} ${day}, ${currentYear}`);
        
        // adjust the nextBirthday by one year if the current date is after their birthday
        if (currentDate.getTime() > nextBirthday) {
            nextBirthday = Date.parse(`${month} ${day}, ${currentYear + 1}`);
            currentYear++;
        }
        
        // setting the default speakOutput to Happy xth Birthday!! 
        // Alexa will automatically correct the ordinal for you.
        // no need to worry about when to use st, th, rd
        const age = currentYear - year;
        let speakOutput = handlerInput.t('HAPPY_BIRTHDAY_MSG', {count: age});
        if (currentDate.getTime() !== nextBirthday) {
            const diffDays = Math.round(Math.abs((currentDate.getTime() - nextBirthday)/oneDay));
            speakOutput = handlerInput.t('WELCOME_BACK_MSG', {count: diffDays, age: age});
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/**
 * Handles LaunchRequest requests sent by Alexa when no birthdate has been registered
 * Note : this type of request is send when the user invokes your skill without providing a specific intent.
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME_MSG');
        const repromptOutput = handlerInput.t('WELCOME_REPROMPT_MSG');   

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

/**
 * Handles CaptureBirthdayIntent requests sent by Alexa (when a user specify a birthdate)
 * Note : this request is sent when the user makes a request that corresponds to CaptureBirthdayIntent intent defined in your intent schema.
 */
const BirthdayIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureBirthdayIntent';
    },
    async handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;

        const year = Alexa.getSlotValue(requestEnvelope, 'year');
        const month = Alexa.getSlotValue(requestEnvelope, 'month');
        const day = Alexa.getSlotValue(requestEnvelope, 'day');
        
        const birthdayAttributes = {
            "year": year,
            "month": month,
            "day": day
            
        };
        attributesManager.setPersistentAttributes(birthdayAttributes);
        await attributesManager.savePersistentAttributes();    
        
        const speakOutput = handlerInput.t('REGISTER_BIRTHDAY_MSG', {month: month, day: day, year:year});
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/**
 * Handles AMAZON.HelpIntent requests sent by Alexa 
 * Note : this request is sent when the user makes a request that corresponds to AMAZON.HelpIntent intent defined in your intent schema.
 */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) ==='AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * Handles AMAZON.CancelIntent & AMAZON.StopIntent requests sent by Alexa 
 * Note : this request is sent when the user makes a request that corresponds to AMAZON.CancelIntent & AMAZON.StopIntent intents defined in your intent schema.
 */
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('GOODBYE_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = handlerInput.t('REFLECTOR_MSG', {intentName: intentName});

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speakOutput = handlerInput.t('ERROR_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/////////////////////////////////
// Interceptors Definition
/////////////////////////////////

/**
 * This request interceptor will log all incoming requests in the associated Logs (CloudWatch) of the AWS Lambda functions
 */
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    }
};

/**
 * This response interceptor will log all outgoing responses in the associated Logs (CloudWatch) of the AWS Lambda functions
 */
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

/**
 * This request interceptor will bind a translation function 't' to the handlerInput
 */
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};

/* *
 * This request interceptor will load the persistent attributes as sessions attributes whatever handler is called.
 * 
 * Note: Below we use async and await ( more info: javascript.info/async-await )
 * It's a way to wrap promises and wait for the result of an external async operation
 * Like getting and saving the persistent attributes
 * */
const LoadBirthdayInterceptor = {
    async process(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = await attributesManager.getPersistentAttributes() || {};
        
        const year = sessionAttributes.hasOwnProperty('year') ? sessionAttributes.year : 0;
        const month = sessionAttributes.hasOwnProperty('month') ? sessionAttributes.month : 0;
        const day = sessionAttributes.hasOwnProperty('day') ? sessionAttributes.day : 0;
        
        if (year && month && day) {
            attributesManager.setSessionAttributes(sessionAttributes);
        }
    }
}

/////////////////////////////////
// SkillBuilder Definition
/////////////////////////////////

/**
 * The SkillBuilder acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom.
 */
exports.handler = Alexa.SkillBuilders.custom()
    .withPersistenceAdapter(
        new persistenceAdapter.S3PersistenceAdapter({bucketName:process.env.S3_PERSISTENCE_BUCKET})
    )
    .addRequestHandlers(
        HasBirthdayLaunchRequestHandler,
        LaunchRequestHandler,
        BirthdayIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalisationRequestInterceptor,
        LoggingRequestInterceptor,
        LoadBirthdayInterceptor
    )
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();
