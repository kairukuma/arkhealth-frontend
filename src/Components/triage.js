export const triage = {
    "init" : {
        "question" : "What health challenge are you looking to tackle with a clinical trial?",
        "label" : "condition",
        "nextStage" : "address",
    },
    "address" : {
        "question" : "We want to find the closest clinical trial options for you, could you let us know your zip code?",
        "label" : "address",
        "nextStage" : "time",
    },
    "time" : {
        "question" : "How soon are you looking to start a clinical trial? (immediately, weeks, months, other)",
        "label" : "time",
        "nextStage" : "contact",
    },
    "contact" : {
        "question" : "We would love to get in touch to help you with your clinical trial, what's your preferred method for us to reach out?",
        "label" : "contact",
        "nextStage" : "cta",
    },
    "contact-live-chat": {
        "question" : "Great! Press the Zendesk widget in the bottom-right and we'll get started.",
        "label" : "contact",
        "nextStage" : "cta",
    },
    "contact-text": {
        "question" : "Great! What's a good phone number to receive text messages?",
        "label" : "contact",
        "nextStage" : "contact-text-availability",
    },
    "contact-text-availability": {
        "question" : "Thanks! When's a good time to text you?",
        "label" : "contact",
        "nextStage" : "cta",
    },
    "contact-phone": {
        "question" : "Great! What phone number should we call?",
        "label" : "contact",
        "nextStage" : "contact-phone-availability",
    },
    "contact-phone-availability": {
        "question" : "Thanks! When's a good time to call you?",
        "label" : "contact",
        "nextStage" : "cta",
    },
    "contact-email": {
        "question" : "Great! Please enter your email below.",
        "label" : "contact",
        "nextStage" : "cta",
    },
    "cta" : {
        "question" : "Someone will be in touch with you shortly. Thanks for using Ark Health!",
    }
}