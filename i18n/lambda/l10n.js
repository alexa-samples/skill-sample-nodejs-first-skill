/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    en: {
        translation: {
            WELCOME_MSG: `Hello! Welcome to Cake walk. What is your birthday?`,
            WELCOME_REPROMPT_MSG: `I was born Nov. 6th, 2014. When were you born?`,
            WELCOME_BACK_MSG: `Welcome back. It looks like there is {{count}} day until your {{age}}th birthday.`,
            WELCOME_BACK_MSG_plural: `Welcome back. It looks like there are {{count}} days until your {{age}}th birthday.`,
            HAPPY_BIRTHDAY_MSG: `Happy {{age}}th birthday!`,
            REGISTER_BIRTHDAY_MSG: `Thanks, I'll remember that you were born {{month}} {{day}} {{year}}.`,
            HELP_MSG: `You can tell me your date of birth and I'll take note. You can also just say, "register my birthday" and I will guide you. Which one would you like to try?`,
            GOODBYE_MSG: `Goodbye!`,
            REFLECTOR_MSG: `You just triggered {{intentName}}`,
            ERROR_MSG: `Sorry, I couldn't understand what you said. Can you reformulate?`,
            ERROR_TIMEZONE_MSG: `I can't determine your timezone. Please check your device settings and make sure a timezone was selected. After that please reopen the skill and try again!`
        }
    },
    fr: {
        translation: {
            WELCOME_MSG: `Bonjour! Bienvenue sur le Génie des Anniversaires. Quelle est votre date de naissance ?`,
            WELCOME_REPROMPT_MSG: `Je suis née le 6 novembre 2014. Et vous, quand êtes-vous né ?`,
            WELCOME_BACK_MSG: `Content de vous revoir! Il vous reste {{count}} jour avant d'avoir {{age}} ans.`,
            WELCOME_BACK_MSG_plural: `Content de vous revoir! Il vous reste {{count}} jours avant d'avoir {{age}} ans.`,
            HAPPY_BIRTHDAY_MSG: `Joyeux Anniversaire! Aujourd'hui, vous avez {{count}} an!`,
            HAPPY_BIRTHDAY_MSG_plural: `Joyeux Anniversaire! Aujourd'hui, vous avez {{count}} ans!`,
            REGISTER_BIRTHDAY_MSG: `Merci, je vais me rappeler que vous êtes né le {{day}} {{month}} {{year}}.`,
            HELP_MSG: `Je peux me souvenir de votre date de naissance. Dites-moi votre jour, mois et année de naissance ou bien dites-moi simplement "enregistre mon anniversaire" et je vous guiderai. Quel est votre choix ?`,
            GOODBYE_MSG: `Au revoir!`,
            REFLECTOR_MSG: `Vous avez invoqué l'intention {{intentName}}`,
            ERROR_MSG: `Désolé, je n'ai pas compris. Pouvez-vous reformuler ?`,
            ERROR_TIMEZONE_MSG: `Je n'ai pas réussi à déterminer votre fuseau horaire. Veuillez vérifier les paramètres de votre appareil et réessayez.`
        }
    },
    "fr-CA": {
        translation: {
            WELCOME_MSG: `Bonjour! Bienvenue sur le Génie des Fêtes. Quelle est votre date de naissance ?`,
            HAPPY_BIRTHDAY_MSG: `Bonne Fête! Aujourd'hui, vous avez {{count}} an!`,
            HAPPY_BIRTHDAY_MSG_plural: `Bonne Fête! Aujourd'hui, vous avez {{count}} ans!`,
            HELP_MSG: `Je peux me souvenir de votre date de naissance. Dites-moi votre jour, mois et année de naissance ou bien dites-moi simplement "sauve ma fête" et je vous guiderai. Quel est votre choix ?`,
        }
    },
    it: {
        translation: {
            WELCOME_MSG: `Ciao! Benvenuti a Buon Compleanno. Qual'è la tua data di nascita?`,
            WELCOME_REPROMPT_MSG: `Io sono nata il 6 novembre 2014. E tu invece?`,
            WELCOME_BACK_MSG: `Ciao di nuovo! Manca {{count}} giorno a quando avrai {{age}} anni.`,
            WELCOME_BACK_MSG_plural: `Ciao di nuovo! Mancano {{count}} giorni a quando avrai {{age}} anni.`,
            HAPPY_BIRTHDAY_MSG: `Buon compleanno! Oggi compi {{count}} anno!`,
            HAPPY_BIRTHDAY_MSG_plural: `Buon compleanno! Oggi compi {{count}} anni!`,
            REGISTER_BIRTHDAY_MSG: `Grazie, mi ricorderò la tua data di nascita: {{day}} {{month}} {{year}}.`,
            HELP_MSG: `Posso segnarmi la tua data di nascita. Dimmi pure la data oppure dimmi di ricordami il tuo compleanno. Cosa preferisci?`,
            GOODBYE_MSG: `A presto!`,
            REFLECTOR_MSG: `Hai invocato l'intento {{intentName}}`,
            ERROR_MSG: `Scusa, non ho capito. Puoi ripetere?`,
            ERROR_TIMEZONE_MSG: `Non ho potuto determinare il tuo fuso orario. Verifica la configurazione del tuo dispositivo, e riprova.`
        }
    },
    "ja-JP": {
        translation: {
            WELCOME_MSG: `こんにちは、ケークウォークへようこそ。あなたの誕生日はいつですか？`,
            WELCOME_REPROMPT_MSG: `私は2004年10月6日に生まれました。あなたの誕生日はいつですか？`,
            WELCOME_BACK_MSG: `おかえりなさい。{{age}}歳のお誕生日まで、あと{{count}}日です。`,
            WELCOME_BACK_MSG_plural: `おかえりなさい。{{age}}歳のお誕生日まで、残り{{count}}日です。`,
            HAPPY_BIRTHDAY_MSG: `{{age}}歳のお誕生日、おめでとうございます！`,
            REGISTER_BIRTHDAY_MSG: `ありがとうございます。誕生日は {{year}}年 {{month}}月 {{day}}日ですね？`,
            HELP_MSG: `あなたの誕生日を言うと、その日付を記憶します。もしくは、「私の誕生日を登録して」と言うと、詳しくご案内します。どちらにしますか？`,
            GOODBYE_MSG: `さようなら`,
            REFLECTOR_MSG: `{{intentName}}がトリガーされました。`,
            ERROR_MSG: `ごめんなさい、うまく理解できませんでした。もう一度言ってみてください。`,
            ERROR_TIMEZONE_MSG: `タイムゾーンを特定できませんでした。Alexaアプリでデバイスの設定を開き、タイムゾーンが正しく選択されていることを確認したあとで、もう一度試してください。`
        }
    }
}
