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
    pt: {
        translation: {
            WELCOME_MSG: `Olá! Boas vindas à skill Feliz Aniversário. Quando é o seu aniversário?`,
            WELCOME_REPROMPT_MSG: `Eu nasci no dia 6 de novembro de 2014. Quando você nasceu?`,
            WELCOME_BACK_MSG: `Que bom que você está de volta! Parece que falta {{count}} dia até o seu <say-as interpret-as="ordinal">{{age}}</say-as> aniversário.`,
            WELCOME_BACK_MSG_plural: `Que bom que você está de volta! Parece que faltam {{count}} dias até o seu <say-as interpret-as="ordinal">{{age}}</say-as> aniversário.`,
            HAPPY_BIRTHDAY_MSG: `Feliz <say-as interpret-as="ordinal">{{age}}</say-as> aniversário!`,
            REGISTER_BIRTHDAY_MSG: `Obrigada, eu vou lembrar que você nasceu no dia {{day}} de {{month}} de {{year}}.`,
            HELP_MSG: `Você pode me dizer o dia em que você nasceu e eu vou me lembrar. Você também pode dizer, "anote meu aniversário" eu irei guiar sua interação. Qual deles você quer tentar?`,
            GOODBYE_MSG: `Tchau!`,
            REFLECTOR_MSG: `Você acabou de acionar o {{intentName}}`,
            ERROR_MSG: `Desculpe, eu não entendi o que você falou. Pode reformular?`,
            ERROR_TIMEZONE_MSG: `Não consegui determinar seu fuso horário. Por favor verifique as configurações de seu aparelho e certifique-se de que um fuso horário está selecionado. Depois disso, reinicie a skill e tente novamente!`
        }
    },
    de: {
        translation: {
            WELCOME_MSG: `Hallo! Herzlich willkommen zu Herzlichen Glückwunsch. Wann hast du Geburtstag?`,
            WELCOME_REPROMPT_MSG: `Ich bin am 6. November 2014 geboren. Wann bist du geboren?`,
            WELCOME_BACK_MSG: `Willkommen zurück. Es sieht so aus, als ob noch {{count}} Tag bis zu Deinem {{age}}. Geburtstag verbleibt.`,
            WELCOME_BACK_MSG_plural: `Willkommen zurück. Es sieht so aus, als ob noch {{count}} Tage zu Deinem {{age}}. Geburtstag verbleiben.`,
            HAPPY_BIRTHDAY_MSG: `Alles Gute zum {{age}}. Geburtstag!`,
            REGISTER_BIRTHDAY_MSG: `Danke, ich werde mir merken, dass du am {{day}} {{month}} {{year}} geboren wurdest.`,
            HELP_MSG: `Du kannst mir sagen, wann du Geburtstag hast und ich werde es mir merken. Du kannst auch einfach "merke dir meinen Geburtstag" sagen und ich werde dir weiterhelfen. Was würdest du gerne probieren?`,
            GOODBYE_MSG: `Tschüss!`,
            REFLECTOR_MSG: `Du hast gerade {{intentName}} gestartet.`,
            ERROR_MSG: `Sorry, ich konnte nicht verstehen was du gesagt hast. Kannst du das bitte umformulieren?`,
            ERROR_TIMEZONE_MSG: `Ich kann deine Zeitzone nicht bestimmen. Bitte überprüfe deine Geräteoptionen und stelle sicher, dass eine Zeitzone ausgeewählt ist. Öffne danach den Skill wieder und probiere es erneut!`
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
    es: {
        translation: {
            WELCOME_MSG: `Hola! Bienvenidos a Feliz Cumpleaños. Cual es tu fecha de nacimiento?`,
            WELCOME_REPROMPT_MSG: `Yo nací el 6 de noviembre 2014. Y tú?`,
            WELCOME_BACK_MSG: `Hola otra vez! Falta {{count}} día para que cumplas {{age}} año.`, 
            WELCOME_BACK_MSG_plural: `Hola otra vez! Faltan {{count}} días para que cumplas {{age}} años.`,
            HAPPY_BIRTHDAY_MSG: `Feliz Cumpleaños! Hoy cumples {{count}} año!`,
            HAPPY_BIRTHDAY_MSG_plural: `Feliz Cumpleaños! Hoy cumples {{count}} años!`,
            REGISTER_BIRTHDAY_MSG: `Gracias, me acordaré de tu fecha de nacimiento: {{day}} {{month}} {{year}}.`,
            HELP_MSG: `Puedo apuntarme tu fecha de nacimiento. Dime la fecha o dime de acordarme de tu cumpleaños. Qué prefieres?`,
            GOODBYE_MSG: `Hasta luego!`,
            REFLECTOR_MSG: `Has invocado {{intentName}}`,
            ERROR_MSG: `Perdona, no entendido. Puedes repetir?`,
            ERROR_TIMEZONE_MSG: `No he potido determinar tu zona horaria. Verifica la configuración de tu dispositivo, y intenta otra vez.`
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
    },
    "hi-IN": {
        translation: {
            WELCOME_MSG: `नमस्ते. Cake Walk में आपका स्वागत. आपका जनमदिन कब हैं?`,
            WELCOME_REPROMPT_MSG: `मेरा जन्म 6 नवंबर, 2014 को हुआ था. आप कब पैदा हुए थे?`,
            WELCOME_BACK_MSG: `वापसी पर स्वागत है. आपके {{age}} वे जनमदिन तक {{count}} दिन हैं`,
            WELCOME_BACK_MSG_plural: `आपके {{age}} वे जनमदिन तक {{count}} दिन हैं`,
            HAPPY_BIRTHDAY_MSG: `{{age}} वां जन्मदिन मुबारक हो`,
            REGISTER_BIRTHDAY_MSG: `शुक्रिया. मुझे याद होगा कि आप {{month}} {{day}} {{year}} मैं पैदा हुए थेैं`,
            HELP_MSG: `आप मुझे अपनी जन्मतिथि बता सकते हैं और मैं note कर लूंगा. आप यह भी कह सकते हैं, "मेरा जन्मदिन register करें. आप कौन सा प्रयास करना चाहेंगे?`,
            GOODBYE_MSG: `अलवादी `,
            REFLECTOR_MSG: `आपने {{intentName}} trigger किया हैं `,
            ERROR_MSG: `Sorry, मैं वो समझ नहीं पायी. क्या आप दोहरा सकते हैं `,
            ERROR_TIMEZONE_MSG: `Sorry. मैं आपके समयक्षेत्र का निर्धारण नहीं कर सकता. आपकी Device Settings में timezone select कर दो और एक और बार skill खोलो.`
        }
    }
}
