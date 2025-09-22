(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/constants/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recentSessions",
    ()=>recentSessions,
    "subjects",
    ()=>subjects,
    "subjectsColors",
    ()=>subjectsColors,
    "voices",
    ()=>voices
]);
const subjects = [
    "maths",
    "language",
    "science",
    "history",
    "coding",
    "economics"
];
const subjectsColors = {
    science: "#E5D0FF",
    maths: "#FFDA6E",
    language: "#BDE7FF",
    coding: "#FFC8E4",
    history: "#FFECC8",
    economics: "#C8FFDF"
};
const voices = {
    male: {
        casual: "pNInz6obpgDQGcFmaJgB",
        formal: "EXAVITQu4vr4xnSDxMaL",
        enthusiastic: "VR6AewLTigWG4xSOukaG",
        patient: "pNInz6obpgDQGcFmaJgB" // Adam - Patient male voice
    },
    female: {
        casual: "EXAVITQu4vr4xnSDxMaL",
        formal: "sarah",
        enthusiastic: "VR6AewLTigWG4xSOukaG",
        patient: "EXAVITQu4vr4xnSDxMaL" // Bella - Patient female voice
    }
};
const recentSessions = [
    {
        id: "1",
        subject: "science",
        name: "Neura the Brainy Explorer",
        topic: "Neural Network of the Brain",
        duration: 45,
        color: "#E5D0FF"
    },
    {
        id: "2",
        subject: "maths",
        name: "Countsy the Number Wizard",
        topic: "Derivatives & Integrals",
        duration: 30,
        color: "#FFDA6E"
    },
    {
        id: "3",
        subject: "language",
        name: "Verba the Vocabulary Builder",
        topic: "English Literature",
        duration: 30,
        color: "#BDE7FF"
    },
    {
        id: "4",
        subject: "coding",
        name: "Codey the Logic Hacker",
        topic: "Intro to If-Else Statements",
        duration: 45,
        color: "#FFC8E4"
    },
    {
        id: "5",
        subject: "history",
        name: "Memo, the Memory Keeper",
        topic: "World Wars: Causes & Consequences",
        duration: 15,
        color: "#FFECC8"
    },
    {
        id: "6",
        subject: "economics",
        name: "The Market Maestro",
        topic: "The Basics of Supply & Demand",
        duration: 10,
        color: "#C8FFDF"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "configureAssistant",
    ()=>configureAssistant,
    "getSubjectColor",
    ()=>getSubjectColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/index.ts [app-client] (ecmascript)");
;
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const getSubjectColor = (subject)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subjectsColors"][subject];
};
const configureAssistant = (voice, style)=>{
    var _voices_voice;
    const voiceId = ((_voices_voice = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voices"][voice]) === null || _voices_voice === void 0 ? void 0 : _voices_voice[style]) || "sarah";
    const vapiAssistant = {
        name: "Companion",
        firstMessage: "Hello, let's start the session. Today we'll be talking about {{topic}}.",
        transcriber: {
            provider: "deepgram",
            model: "nova-2",
            language: "en"
        },
        voice: {
            provider: "11labs",
            voiceId: voiceId,
            // Improved voice settings for better continuity
            stability: 0.6,
            similarityBoost: 0.7,
            speed: 1.0,
            style: 0.3,
            useSpeakerBoost: true,
            // Additional voice settings
            optimizeStreamingLatency: 2
        },
        model: {
            provider: "openai",
            model: "gpt-4",
            temperature: 0.7,
            maxTokens: 150,
            messages: [
                {
                    role: "system",
                    content: "You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.\n\n                    Tutor Guidelines:\n                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.\n                    Keep the conversation flowing smoothly while maintaining control.\n                    From time to time make sure that the student is following you and understands you.\n                    Break down the topic into smaller parts and teach the student one part at a time.\n                    Keep your style of conversation {{ style }}.\n                    Keep your responses short and conversational, like in a real voice conversation.\n                    Speak naturally and pause appropriately between sentences.\n                    Do not include any special characters in your responses - this is a voice conversation.\n                    Always end your responses with a question or prompt to keep the conversation flowing.\n              "
                }
            ]
        }
    };
    return vapiAssistant;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/vapi.sdk.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "vapi",
    ()=>vapi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vapi$2d$ai$2f$web$2f$dist$2f$vapi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@vapi-ai/web/dist/vapi.js [app-client] (ecmascript)");
;
const vapi = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vapi$2d$ai$2f$web$2f$dist$2f$vapi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](("TURBOPACK compile-time value", "17665d8a-66ff-4fe4-8099-0532453c90fd"));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/constants/soundwaves.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"nm\":\"Render\",\"ddd\":0,\"h\":250,\"w\":250,\"meta\":{\"g\":\"LottieFiles AE 3.1.1\"},\"layers\":[{\"ty\":4,\"nm\":\"Arrow Outlines 4\",\"sr\":1,\"st\":0,\"op\":300.00001221925,\"ip\":0,\"hd\":false,\"ddd\":0,\"bm\":0,\"hasMask\":false,\"ao\":0,\"ks\":{\"a\":{\"a\":0,\"k\":[13,15.5,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[170,170,100],\"ix\":6},\"sk\":{\"a\":0,\"k\":0},\"p\":{\"a\":0,\"k\":[100.5,126,0],\"ix\":2},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"sa\":{\"a\":0,\"k\":0},\"o\":{\"a\":0,\"k\":100,\"ix\":11}},\"ef\":[],\"shapes\":[{\"ty\":\"sh\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Group\",\"nm\":\"Path 1\",\"ix\":1,\"d\":1,\"ks\":{\"a\":1,\"k\":[{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":0.667,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,13.618],[12.471,14.676]]}],\"t\":0},{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":0.667,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,8.103],[12.471,18.868]]}],\"t\":30},{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":0.667,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,8.324],[12.471,19.235]]}],\"t\":45},{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":0.667,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.515,4.206],[12.515,25.853]]}],\"t\":70},{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":0.667,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,8.985],[12.471,17.912]]}],\"t\":83},{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":0.667,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.515,5.309],[12.544,24.088]]}],\"t\":97},{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":1,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.456,7.588],[12.456,20.044]]}],\"t\":109},{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":1,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.456,6.265],[12.456,21]]}],\"t\":121},{\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,13.618],[12.471,14.676]]}],\"t\":128.000005213547}],\"ix\":2}},{\"ty\":\"st\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Graphic - Stroke\",\"nm\":\"Stroke 1\",\"lc\":2,\"lj\":1,\"ml\":4,\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":4,\"ix\":5},\"c\":{\"a\":0,\"k\":[0.9922,0.949,0.9922,1],\"ix\":3}},{\"ty\":\"sh\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Group\",\"nm\":\"Path 2\",\"ix\":3,\"d\":1,\"ks\":{\"a\":0,\"k\":{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]},\"ix\":2}}],\"ind\":1},{\"ty\":4,\"nm\":\"Arrow Outlines 3\",\"sr\":1,\"st\":0,\"op\":300.00001221925,\"ip\":0,\"hd\":false,\"ddd\":0,\"bm\":0,\"hasMask\":false,\"ao\":0,\"ks\":{\"a\":{\"a\":0,\"k\":[13,15.5,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[170,170,100],\"ix\":6},\"sk\":{\"a\":0,\"k\":0},\"p\":{\"a\":0,\"k\":[146.75,126,0],\"ix\":2},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"sa\":{\"a\":0,\"k\":0},\"o\":{\"a\":0,\"k\":100,\"ix\":11}},\"ef\":[],\"shapes\":[{\"ty\":\"sh\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Group\",\"nm\":\"Path 1\",\"ix\":1,\"d\":1,\"ks\":{\"a\":1,\"k\":[{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.581,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,13.618],[12.471,14.676]]}],\"t\":0},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,13.765],[12.441,18.353]]}],\"t\":30},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,13.618],[12.471,13.721]]}],\"t\":45},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.529,7.074],[12.5,15.191]]}],\"t\":70},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.456,5.529],[12.441,16.735]]}],\"t\":83},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.544,7.147],[12.515,15.044]]}],\"t\":97},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.592,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.456,3.103],[12.471,21.809]]}],\"t\":109},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.893,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]}],\"t\":122},{\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,13.618],[12.471,14.676]]}],\"t\":129.000005254278}],\"ix\":2}},{\"ty\":\"st\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Graphic - Stroke\",\"nm\":\"Stroke 1\",\"lc\":2,\"lj\":1,\"ml\":4,\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":4,\"ix\":5},\"c\":{\"a\":0,\"k\":[0.9922,0.949,0.9922,1],\"ix\":3}},{\"ty\":\"sh\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Group\",\"nm\":\"Path 2\",\"ix\":3,\"d\":1,\"ks\":{\"a\":0,\"k\":{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]},\"ix\":2}}],\"ind\":2},{\"ty\":4,\"nm\":\"Arrow Outlines 2\",\"sr\":1,\"st\":0,\"op\":300.00001221925,\"ip\":0,\"hd\":false,\"ddd\":0,\"bm\":0,\"hasMask\":false,\"ao\":0,\"ks\":{\"a\":{\"a\":0,\"k\":[13,15.5,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[170,170,100],\"ix\":6},\"sk\":{\"a\":0,\"k\":0},\"p\":{\"a\":0,\"k\":[116.75,126,0],\"ix\":2},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"sa\":{\"a\":0,\"k\":0},\"o\":{\"a\":0,\"k\":100,\"ix\":11}},\"ef\":[],\"shapes\":[{\"ty\":\"sh\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Group\",\"nm\":\"Path 1\",\"ix\":1,\"d\":1,\"ks\":{\"a\":1,\"k\":[{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":0,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,13.618],[12.471,14.676]]}],\"t\":0},{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":0,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]}],\"t\":24},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,4.647],[12.441,25.706]]}],\"t\":41},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]}],\"t\":55},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,6.118],[12.471,20.412]]}],\"t\":70},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.456,1.926],[12.456,22.838]]}],\"t\":87},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,7.735],[12.471,20.265]]}],\"t\":101},{\"o\":{\"x\":0.333,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]}],\"t\":115},{\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,13.618],[12.471,14.676]]}],\"t\":134.000005457932}],\"ix\":2}},{\"ty\":\"st\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Graphic - Stroke\",\"nm\":\"Stroke 1\",\"lc\":2,\"lj\":1,\"ml\":4,\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":4,\"ix\":5},\"c\":{\"a\":0,\"k\":[0.9922,0.949,0.9922,1],\"ix\":3}},{\"ty\":\"sh\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Group\",\"nm\":\"Path 2\",\"ix\":3,\"d\":1,\"ks\":{\"a\":0,\"k\":{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]},\"ix\":2}}],\"ind\":3},{\"ty\":4,\"nm\":\"Arrow Outlines\",\"sr\":1,\"st\":0,\"op\":300.00001221925,\"ip\":0,\"hd\":false,\"ddd\":0,\"bm\":0,\"hasMask\":false,\"ao\":0,\"ks\":{\"a\":{\"a\":0,\"k\":[13,15.5,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[170,170,100],\"ix\":6},\"sk\":{\"a\":0,\"k\":0},\"p\":{\"a\":0,\"k\":[131.75,126,0],\"ix\":2},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"sa\":{\"a\":0,\"k\":0},\"o\":{\"a\":0,\"k\":100,\"ix\":11}},\"ef\":[],\"shapes\":[{\"ty\":\"sh\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Group\",\"nm\":\"Path 1\",\"ix\":1,\"d\":1,\"ks\":{\"a\":1,\"k\":[{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.581,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,13.618],[12.471,14.676]]}],\"t\":0},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.5,2],[12.5,28.5]]}],\"t\":30},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]}],\"t\":45},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.5,2],[12.5,28.5]]}],\"t\":70},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]}],\"t\":83},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.5,2],[12.5,28.5]]}],\"t\":97},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,5.75],[12.471,21.809]]}],\"t\":109},{\"o\":{\"x\":0.973,\"y\":0},\"i\":{\"x\":0.24,\"y\":1},\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]}],\"t\":125},{\"s\":[{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.471,13.618],[12.471,14.676]]}],\"t\":132.00000537647}],\"ix\":2}},{\"ty\":\"st\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Graphic - Stroke\",\"nm\":\"Stroke 1\",\"lc\":2,\"lj\":1,\"ml\":4,\"o\":{\"a\":0,\"k\":100,\"ix\":4},\"w\":{\"a\":0,\"k\":4,\"ix\":5},\"c\":{\"a\":0,\"k\":[0.9922,0.949,0.9922,1],\"ix\":3}},{\"ty\":\"sh\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Group\",\"nm\":\"Path 2\",\"ix\":3,\"d\":1,\"ks\":{\"a\":0,\"k\":{\"c\":false,\"i\":[[0,0],[0,0]],\"o\":[[0,0],[0,0]],\"v\":[[12.441,11.118],[12.441,16.735]]},\"ix\":2}}],\"ind\":4},{\"ty\":4,\"nm\":\"cir 1\",\"sr\":1,\"st\":0,\"op\":300.00001221925,\"ip\":0,\"hd\":false,\"ddd\":0,\"bm\":0,\"hasMask\":false,\"ao\":0,\"ks\":{\"a\":{\"a\":0,\"k\":[0,0,0],\"ix\":1},\"s\":{\"a\":1,\"k\":[{\"o\":{\"x\":0.775,\"y\":0},\"i\":{\"x\":0.206,\"y\":1},\"s\":[111.8,111.8,100],\"t\":0},{\"o\":{\"x\":0.665,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[120,120,100],\"t\":30},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.206,\"y\":1},\"s\":[111.8,111.8,100],\"t\":60},{\"o\":{\"x\":0.665,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[120,120,100],\"t\":71.289},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.206,\"y\":1},\"s\":[111.8,111.8,100],\"t\":82.576},{\"o\":{\"x\":0.665,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[120,120,100],\"t\":97.628},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.667,\"y\":1},\"s\":[111.8,111.8,100],\"t\":107.661},{\"s\":[111.8,111.8,100],\"t\":134.000005457932}],\"ix\":6},\"sk\":{\"a\":0,\"k\":0},\"p\":{\"a\":0,\"k\":[126.539,126.166,0],\"ix\":2},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"sa\":{\"a\":0,\"k\":0},\"o\":{\"a\":0,\"k\":100,\"ix\":11}},\"ef\":[],\"shapes\":[{\"ty\":\"gr\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Group\",\"nm\":\"Ellipse 1\",\"ix\":1,\"cix\":2,\"np\":3,\"it\":[{\"ty\":\"el\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Ellipse\",\"nm\":\"Ellipse Path 1\",\"d\":1,\"p\":{\"a\":0,\"k\":[0,0],\"ix\":3},\"s\":{\"a\":0,\"k\":[99.367,99.367],\"ix\":2}},{\"ty\":\"fl\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Graphic - Fill\",\"nm\":\"Fill 1\",\"c\":{\"a\":0,\"k\":[0.1255,0.1529,0.1725,1],\"ix\":4},\"r\":1,\"o\":{\"a\":0,\"k\":100,\"ix\":5}},{\"ty\":\"tr\",\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"p\":{\"a\":0,\"k\":[-1.539,-1.166],\"ix\":2},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"o\":{\"a\":0,\"k\":100,\"ix\":7}}]}],\"ind\":5},{\"ty\":4,\"nm\":\"cir 2\",\"sr\":1,\"st\":0,\"op\":300.00001221925,\"ip\":0,\"hd\":false,\"ddd\":0,\"bm\":0,\"hasMask\":false,\"ao\":0,\"ks\":{\"a\":{\"a\":0,\"k\":[0,0,0],\"ix\":1},\"s\":{\"a\":1,\"k\":[{\"o\":{\"x\":0.775,\"y\":0},\"i\":{\"x\":0.206,\"y\":1},\"s\":[110,110,100],\"t\":0},{\"o\":{\"x\":0.665,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[194.775,194.775,100],\"t\":34},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.206,\"y\":1},\"s\":[150,150,100],\"t\":60},{\"o\":{\"x\":0.665,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[194.775,194.775,100],\"t\":71.289},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.206,\"y\":1},\"s\":[150,150,100],\"t\":82.576},{\"o\":{\"x\":0.665,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[194.775,194.775,100],\"t\":97.628},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[150,150,100],\"t\":117},{\"s\":[110,110,100],\"t\":123.966255049249}],\"ix\":6},\"sk\":{\"a\":0,\"k\":0},\"p\":{\"a\":0,\"k\":[126.539,126.166,0],\"ix\":2},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"sa\":{\"a\":0,\"k\":0},\"o\":{\"a\":0,\"k\":100,\"ix\":11}},\"ef\":[],\"shapes\":[{\"ty\":\"gr\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Group\",\"nm\":\"Ellipse 1\",\"ix\":1,\"cix\":2,\"np\":3,\"it\":[{\"ty\":\"el\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Ellipse\",\"nm\":\"Ellipse Path 1\",\"d\":1,\"p\":{\"a\":0,\"k\":[0,0],\"ix\":3},\"s\":{\"a\":0,\"k\":[99.367,99.367],\"ix\":2}},{\"ty\":\"fl\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Graphic - Fill\",\"nm\":\"Fill 1\",\"c\":{\"a\":0,\"k\":[0.1255,0.1529,0.1725,1],\"ix\":4},\"r\":1,\"o\":{\"a\":0,\"k\":10,\"ix\":5}},{\"ty\":\"tr\",\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"p\":{\"a\":0,\"k\":[-1.539,-1.166],\"ix\":2},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"o\":{\"a\":0,\"k\":100,\"ix\":7}}]}],\"ind\":6},{\"ty\":4,\"nm\":\"cir 3\",\"sr\":1,\"st\":0,\"op\":300.00001221925,\"ip\":0,\"hd\":false,\"ddd\":0,\"bm\":0,\"hasMask\":false,\"ao\":0,\"ks\":{\"a\":{\"a\":0,\"k\":[0,0,0],\"ix\":1},\"s\":{\"a\":1,\"k\":[{\"o\":{\"x\":0.775,\"y\":0},\"i\":{\"x\":0.206,\"y\":1},\"s\":[110,110,100],\"t\":0},{\"o\":{\"x\":0.665,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[230,230,100],\"t\":34},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.206,\"y\":1},\"s\":[190,190,100],\"t\":60},{\"o\":{\"x\":0.665,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[230,230,100],\"t\":71.289},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.206,\"y\":1},\"s\":[190,190,100],\"t\":82.576},{\"o\":{\"x\":0.665,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[230,230,100],\"t\":97.628},{\"o\":{\"x\":0.167,\"y\":0},\"i\":{\"x\":0.274,\"y\":1},\"s\":[190,190,100],\"t\":118},{\"s\":[110,110,100],\"t\":134.000005457932}],\"ix\":6},\"sk\":{\"a\":0,\"k\":0},\"p\":{\"a\":0,\"k\":[126.539,126.166,0],\"ix\":2},\"r\":{\"a\":0,\"k\":0,\"ix\":10},\"sa\":{\"a\":0,\"k\":0},\"o\":{\"a\":0,\"k\":100,\"ix\":11}},\"ef\":[],\"shapes\":[{\"ty\":\"gr\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Group\",\"nm\":\"Ellipse 1\",\"ix\":1,\"cix\":2,\"np\":3,\"it\":[{\"ty\":\"el\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Shape - Ellipse\",\"nm\":\"Ellipse Path 1\",\"d\":1,\"p\":{\"a\":0,\"k\":[0,0],\"ix\":3},\"s\":{\"a\":0,\"k\":[99.367,99.367],\"ix\":2}},{\"ty\":\"fl\",\"bm\":0,\"hd\":false,\"mn\":\"ADBE Vector Graphic - Fill\",\"nm\":\"Fill 1\",\"c\":{\"a\":0,\"k\":[0.1255,0.1529,0.1725,1],\"ix\":4},\"r\":1,\"o\":{\"a\":0,\"k\":5,\"ix\":5}},{\"ty\":\"tr\",\"a\":{\"a\":0,\"k\":[0,0],\"ix\":1},\"s\":{\"a\":0,\"k\":[100,100],\"ix\":3},\"sk\":{\"a\":0,\"k\":0,\"ix\":4},\"p\":{\"a\":0,\"k\":[-1.539,-1.166],\"ix\":2},\"r\":{\"a\":0,\"k\":0,\"ix\":6},\"sa\":{\"a\":0,\"k\":0,\"ix\":5},\"o\":{\"a\":0,\"k\":100,\"ix\":7}}]}],\"ind\":7}],\"v\":\"4.8.0\",\"fr\":29.9700012207031,\"op\":135.000005498663,\"ip\":0,\"assets\":[]}"));}),
"[project]/lib/actions/data:1986fe [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7fa10ba1f295bb6520ffff0d21cca5afa213553614":"addToSessionHistory"},"lib/actions/companion.actions.ts",""] */ __turbopack_context__.s([
    "addToSessionHistory",
    ()=>addToSessionHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var addToSessionHistory = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7fa10ba1f295bb6520ffff0d21cca5afa213553614", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addToSessionHistory"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY29tcGFuaW9uLmFjdGlvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQge2F1dGh9IGZyb20gXCJAY2xlcmsvbmV4dGpzL3NlcnZlclwiO1xuaW1wb3J0IHtjcmVhdGVTdXBhYmFzZUNsaWVudH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDb21wYW5pb24gPSBhc3luYyAoZm9ybURhdGE6IENyZWF0ZUNvbXBhbmlvbikgPT4ge1xuICAgIC8vIENoZWNrIGlmIFN1cGFiYXNlIGVudmlyb25tZW50IHZhcmlhYmxlcyBhcmUgY29uZmlndXJlZFxuICAgIGlmICghcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIHx8ICFwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1N1cGFiYXNlIGVudmlyb25tZW50IHZhcmlhYmxlcyBub3QgY29uZmlndXJlZC4gQ2Fubm90IGNyZWF0ZSBjb21wYW5pb24uJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHsgdXNlcklkOiBhdXRob3IgfSA9IGF3YWl0IGF1dGgoKTtcbiAgICBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZVN1cGFiYXNlQ2xpZW50KCk7XG5cbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbSgnY29tcGFuaW9ucycpXG4gICAgICAgIC5pbnNlcnQoey4uLmZvcm1EYXRhLCBhdXRob3IgfSlcbiAgICAgICAgLnNlbGVjdCgpO1xuXG4gICAgaWYoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignU3VwYWJhc2UgZXJyb3IgY3JlYXRpbmcgY29tcGFuaW9uOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZighZGF0YSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdObyBkYXRhIHJldHVybmVkIGZyb20gY29tcGFuaW9uIGNyZWF0aW9uJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhWzBdO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0QWxsQ29tcGFuaW9ucyA9IGFzeW5jICh7IGxpbWl0ID0gMTAsIHBhZ2UgPSAxLCBzdWJqZWN0LCB0b3BpYyB9OiBHZXRBbGxDb21wYW5pb25zKSA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzIGFyZSBjb25maWd1cmVkXG4gICAgaWYgKCFwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwgfHwgIXByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzIG5vdCBjb25maWd1cmVkLiBSZXR1cm5pbmcgZW1wdHkgYXJyYXkuJyk7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZVN1cGFiYXNlQ2xpZW50KCk7XG5cbiAgICBsZXQgcXVlcnkgPSBzdXBhYmFzZS5mcm9tKCdjb21wYW5pb25zJykuc2VsZWN0KCk7XG5cbiAgICBpZihzdWJqZWN0ICYmIHRvcGljKSB7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkuaWxpa2UoJ3N1YmplY3QnLCBgJSR7c3ViamVjdH0lYClcbiAgICAgICAgICAgIC5vcihgdG9waWMuaWxpa2UuJSR7dG9waWN9JSxuYW1lLmlsaWtlLiUke3RvcGljfSVgKVxuICAgIH0gZWxzZSBpZihzdWJqZWN0KSB7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkuaWxpa2UoJ3N1YmplY3QnLCBgJSR7c3ViamVjdH0lYClcbiAgICB9IGVsc2UgaWYodG9waWMpIHtcbiAgICAgICAgcXVlcnkgPSBxdWVyeS5vcihgdG9waWMuaWxpa2UuJSR7dG9waWN9JSxuYW1lLmlsaWtlLiUke3RvcGljfSVgKVxuICAgIH1cblxuICAgIHF1ZXJ5ID0gcXVlcnkucmFuZ2UoKHBhZ2UgLSAxKSAqIGxpbWl0LCBwYWdlICogbGltaXQgLSAxKTtcblxuICAgIGNvbnN0IHsgZGF0YTogY29tcGFuaW9ucywgZXJyb3IgfSA9IGF3YWl0IHF1ZXJ5O1xuXG4gICAgaWYoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignU3VwYWJhc2UgZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcGFuaW9ucyB8fCBbXTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldENvbXBhbmlvbiA9IGFzeW5jIChpZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVTdXBhYmFzZUNsaWVudCgpO1xuXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oJ2NvbXBhbmlvbnMnKVxuICAgICAgICAuc2VsZWN0KClcbiAgICAgICAgLmVxKCdpZCcsIGlkKTtcblxuICAgIGlmKGVycm9yKSByZXR1cm4gY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgcmV0dXJuIGRhdGFbMF07XG59XG5cbmV4cG9ydCBjb25zdCBhZGRUb1Nlc3Npb25IaXN0b3J5ID0gYXN5bmMgKGNvbXBhbmlvbklkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB7IHVzZXJJZCB9ID0gYXdhaXQgYXV0aCgpO1xuICAgIGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlU3VwYWJhc2VDbGllbnQoKTtcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKCdzZXNzaW9uX2hpc3RvcnknKVxuICAgICAgICAuaW5zZXJ0KHtcbiAgICAgICAgICAgIGNvbXBhbmlvbl9pZDogY29tcGFuaW9uSWQsXG4gICAgICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgIH0pXG5cbiAgICBpZihlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRSZWNlbnRTZXNzaW9ucyA9IGFzeW5jIChsaW1pdCA9IDEwKSA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzIGFyZSBjb25maWd1cmVkXG4gICAgaWYgKCFwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwgfHwgIXByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzIG5vdCBjb25maWd1cmVkLiBSZXR1cm5pbmcgZW1wdHkgYXJyYXkuJyk7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZVN1cGFiYXNlQ2xpZW50KCk7XG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oJ3Nlc3Npb25faGlzdG9yeScpXG4gICAgICAgIC5zZWxlY3QoYGNvbXBhbmlvbnM6Y29tcGFuaW9uX2lkICgqKWApXG4gICAgICAgIC5vcmRlcignY3JlYXRlZF9hdCcsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgICAgICAubGltaXQobGltaXQpXG5cbiAgICBpZihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdTdXBhYmFzZSBlcnJvcjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhPy5tYXAoKHsgY29tcGFuaW9ucyB9KSA9PiBjb21wYW5pb25zKSB8fCBbXTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJTZXNzaW9ucyA9IGFzeW5jICh1c2VySWQ6IHN0cmluZywgbGltaXQgPSAxMCkgPT4ge1xuICAgIGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlU3VwYWJhc2VDbGllbnQoKTtcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbSgnc2Vzc2lvbl9oaXN0b3J5JylcbiAgICAgICAgLnNlbGVjdChgY29tcGFuaW9uczpjb21wYW5pb25faWQgKCopYClcbiAgICAgICAgLmVxKCd1c2VyX2lkJywgdXNlcklkKVxuICAgICAgICAub3JkZXIoJ2NyZWF0ZWRfYXQnLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAgICAgLmxpbWl0KGxpbWl0KVxuXG4gICAgaWYoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcblxuICAgIHJldHVybiBkYXRhLm1hcCgoeyBjb21wYW5pb25zIH0pID0+IGNvbXBhbmlvbnMpO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0VXNlckNvbXBhbmlvbnMgPSBhc3luYyAodXNlcklkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZVN1cGFiYXNlQ2xpZW50KCk7XG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oJ2NvbXBhbmlvbnMnKVxuICAgICAgICAuc2VsZWN0KClcbiAgICAgICAgLmVxKCdhdXRob3InLCB1c2VySWQpXG5cbiAgICBpZihlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbmV4cG9ydCBjb25zdCBuZXdDb21wYW5pb25QZXJtaXNzaW9ucyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IHVzZXJJZCwgaGFzIH0gPSBhd2FpdCBhdXRoKCk7XG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzIGFyZSBjb25maWd1cmVkXG4gICAgaWYgKCFwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwgfHwgIXByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZKSB7XG4gICAgICAgIC8vIElmIG5vIGRhdGFiYXNlIGNvbmZpZ3VyZWQsIGFsbG93IHVubGltaXRlZCBjb21wYW5pb25zIGZvciBub3dcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVTdXBhYmFzZUNsaWVudCgpO1xuICAgIGxldCBsaW1pdCA9IDEwOyAvLyBEZWZhdWx0IGxpbWl0IGZvciBmcmVlIHVzZXJzXG5cbiAgICBpZihoYXMoeyBwbGFuOiAncHJvJyB9KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYoaGFzKHsgZmVhdHVyZTogXCIzX2NvbXBhbmlvbl9saW1pdFwiIH0pKSB7XG4gICAgICAgIGxpbWl0ID0gMztcbiAgICB9IGVsc2UgaWYoaGFzKHsgZmVhdHVyZTogXCIxMF9jb21wYW5pb25fbGltaXRcIiB9KSkge1xuICAgICAgICBsaW1pdCA9IDEwO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKCdjb21wYW5pb25zJylcbiAgICAgICAgLnNlbGVjdCgnaWQnLCB7IGNvdW50OiAnZXhhY3QnIH0pXG4gICAgICAgIC5lcSgnYXV0aG9yJywgdXNlcklkKVxuXG4gICAgaWYoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignU3VwYWJhc2UgZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBBbGxvdyBjcmVhdGlvbiBpZiBkYXRhYmFzZSBlcnJvclxuICAgIH1cblxuICAgIGNvbnN0IGNvbXBhbmlvbkNvdW50ID0gZGF0YT8ubGVuZ3RoIHx8IDA7XG5cbiAgICBpZihjb21wYW5pb25Db3VudCA+PSBsaW1pdCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8vIEJvb2ttYXJrc1xuZXhwb3J0IGNvbnN0IGFkZEJvb2ttYXJrID0gYXN5bmMgKGNvbXBhbmlvbklkOiBzdHJpbmcsIHBhdGg6IHN0cmluZykgPT4ge1xuICBjb25zdCB7IHVzZXJJZCB9ID0gYXdhaXQgYXV0aCgpO1xuICBpZiAoIXVzZXJJZCkgcmV0dXJuO1xuICBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZVN1cGFiYXNlQ2xpZW50KCk7XG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJib29rbWFya3NcIikuaW5zZXJ0KHtcbiAgICBjb21wYW5pb25faWQ6IGNvbXBhbmlvbklkLFxuICAgIHVzZXJfaWQ6IHVzZXJJZCxcbiAgfSk7XG4gIGlmIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgfVxuICAvLyBSZXZhbGlkYXRlIHRoZSBwYXRoIHRvIGZvcmNlIGEgcmUtcmVuZGVyIG9mIHRoZSBwYWdlXG5cbiAgcmV2YWxpZGF0ZVBhdGgocGF0aCk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUJvb2ttYXJrID0gYXN5bmMgKGNvbXBhbmlvbklkOiBzdHJpbmcsIHBhdGg6IHN0cmluZykgPT4ge1xuICBjb25zdCB7IHVzZXJJZCB9ID0gYXdhaXQgYXV0aCgpO1xuICBpZiAoIXVzZXJJZCkgcmV0dXJuO1xuICBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZVN1cGFiYXNlQ2xpZW50KCk7XG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJib29rbWFya3NcIilcbiAgICAuZGVsZXRlKClcbiAgICAuZXEoXCJjb21wYW5pb25faWRcIiwgY29tcGFuaW9uSWQpXG4gICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpO1xuICBpZiAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIH1cbiAgcmV2YWxpZGF0ZVBhdGgocGF0aCk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuLy8gSXQncyBhbG1vc3QgdGhlIHNhbWUgYXMgZ2V0VXNlckNvbXBhbmlvbnMsIGJ1dCBpdCdzIGZvciB0aGUgYm9va21hcmtlZCBjb21wYW5pb25zXG5leHBvcnQgY29uc3QgZ2V0Qm9va21hcmtlZENvbXBhbmlvbnMgPSBhc3luYyAodXNlcklkOiBzdHJpbmcpID0+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVTdXBhYmFzZUNsaWVudCgpO1xuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwiYm9va21hcmtzXCIpXG4gICAgLnNlbGVjdChgY29tcGFuaW9uczpjb21wYW5pb25faWQgKCopYCkgLy8gTm90aWNlIHRoZSAoKikgdG8gZ2V0IGFsbCB0aGUgY29tcGFuaW9uIGRhdGFcbiAgICAuZXEoXCJ1c2VyX2lkXCIsIHVzZXJJZCk7XG4gIGlmIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgfVxuICAvLyBXZSBkb24ndCBuZWVkIHRoZSBib29rbWFya3MgZGF0YSwgc28gd2UgcmV0dXJuIG9ubHkgdGhlIGNvbXBhbmlvbnNcbiAgcmV0dXJuIGRhdGEubWFwKCh7IGNvbXBhbmlvbnMgfSkgPT4gY29tcGFuaW9ucyk7XG59OyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNlNBK0VhIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/CompanionComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/vapi.sdk.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lottie$2d$react$2f$build$2f$index$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lottie-react/build/index.umd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$soundwaves$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/constants/soundwaves.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$1986fe__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/actions/data:1986fe [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-off.js [app-client] (ecmascript) <export default as PhoneOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
var CallStatus = /*#__PURE__*/ function(CallStatus) {
    CallStatus["INACTIVE"] = "INACTIVE";
    CallStatus["CONNECTING"] = "CONNECTING";
    CallStatus["ACTIVE"] = "ACTIVE";
    CallStatus["FINISHED"] = "FINISHED";
    return CallStatus;
}(CallStatus || {});
const CompanionComponent = (param)=>{
    let { companionId, subject, topic, name, userName, userImage, style, voice } = param;
    _s();
    const [callStatus, setCallStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("INACTIVE");
    const [isSpeaking, setIsSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const lottieRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CompanionComponent.useEffect": ()=>{
            if (lottieRef) {
                if (isSpeaking) {
                    var _lottieRef_current;
                    (_lottieRef_current = lottieRef.current) === null || _lottieRef_current === void 0 ? void 0 : _lottieRef_current.play();
                } else {
                    var _lottieRef_current1;
                    (_lottieRef_current1 = lottieRef.current) === null || _lottieRef_current1 === void 0 ? void 0 : _lottieRef_current1.stop();
                }
            }
        }
    }["CompanionComponent.useEffect"], [
        isSpeaking,
        lottieRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CompanionComponent.useEffect": ()=>{
            const onCallStart = {
                "CompanionComponent.useEffect.onCallStart": ()=>{
                    console.log('Call started');
                    setCallStatus("ACTIVE");
                }
            }["CompanionComponent.useEffect.onCallStart"];
            const onCallEnd = {
                "CompanionComponent.useEffect.onCallEnd": ()=>{
                    console.log('Call ended');
                    setCallStatus("FINISHED");
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$1986fe__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addToSessionHistory"])(companionId);
                }
            }["CompanionComponent.useEffect.onCallEnd"];
            const onMessage = {
                "CompanionComponent.useEffect.onMessage": (message)=>{
                    console.log('Message received:', message);
                    if (message.type === 'transcript' && message.transcriptType === 'final') {
                        const newMessage = {
                            role: message.role,
                            content: message.transcript
                        };
                        setMessages({
                            "CompanionComponent.useEffect.onMessage": (prev)=>[
                                    newMessage,
                                    ...prev
                                ]
                        }["CompanionComponent.useEffect.onMessage"]);
                    }
                }
            }["CompanionComponent.useEffect.onMessage"];
            const onSpeechStart = {
                "CompanionComponent.useEffect.onSpeechStart": ()=>{
                    console.log('Speech started');
                    setIsSpeaking(true);
                }
            }["CompanionComponent.useEffect.onSpeechStart"];
            const onSpeechEnd = {
                "CompanionComponent.useEffect.onSpeechEnd": ()=>{
                    console.log('Speech ended');
                    setIsSpeaking(false);
                }
            }["CompanionComponent.useEffect.onSpeechEnd"];
            const onError = {
                "CompanionComponent.useEffect.onError": (error)=>{
                    console.error('VAPI Error:', error);
                    setCallStatus("FINISHED");
                }
            }["CompanionComponent.useEffect.onError"];
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on('call-start', onCallStart);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on('call-end', onCallEnd);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on('message', onMessage);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on('error', onError);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on('speech-start', onSpeechStart);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].on('speech-end', onSpeechEnd);
            return ({
                "CompanionComponent.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off('call-start', onCallStart);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off('call-end', onCallEnd);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off('message', onMessage);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off('error', onError);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off('speech-start', onSpeechStart);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].off('speech-end', onSpeechEnd);
                }
            })["CompanionComponent.useEffect"];
        }
    }["CompanionComponent.useEffect"], [
        companionId
    ]);
    const toggleMicrophone = ()=>{
        const isMuted = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].isMuted();
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].setMuted(!isMuted);
        setIsMuted(!isMuted);
    };
    const handleCall = async ()=>{
        setCallStatus("CONNECTING");
        try {
            // Check microphone permissions first
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            console.log('✅ Microphone access confirmed');
            stream.getTracks().forEach((track)=>track.stop());
            const assistantConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["configureAssistant"])(voice, style);
            console.log('🎤 Starting call with config:', assistantConfig);
            const assistantOverrides = {
                variableValues: {
                    subject,
                    topic,
                    style
                },
                clientMessages: [
                    "transcript"
                ],
                serverMessages: []
            };
            // @ts-expect-error - vapi.start method signature may not match expected types
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].start(assistantConfig, assistantOverrides);
            console.log('✅ Call started successfully');
        } catch (error) {
            console.error('❌ Failed to start call:', error);
            // Provide specific error messages
            if (error instanceof Error) {
                if (error.name === 'NotAllowedError') {
                    alert('Microphone access denied. Please allow microphone access and try again.');
                } else if (error.name === 'NotFoundError') {
                    alert('No microphone found. Please connect a microphone and try again.');
                } else if (error.name === 'NotSupportedError') {
                    alert('Voice features not supported in this browser. Please use Chrome, Firefox, or Safari.');
                } else {
                    alert("Voice error: ".concat(error.message));
                }
            } else {
                alert('Unknown voice error occurred. Please check console for details.');
            }
            setCallStatus("FINISHED");
        }
    };
    const handleDisconnect = ()=>{
        setCallStatus("FINISHED");
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vapi$2e$sdk$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vapi"].stop();
    };
    const getSubjectIcon = (subject)=>{
        const icons = {
            mathematics: "🔢",
            science: "🔬",
            history: "📚",
            language: "🌍",
            coding: "💻",
            economics: "💰"
        };
        return icons[subject.toLowerCase()] || "📖";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card p-8 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-32 h-32 mx-auto rounded-3xl flex items-center justify-center text-6xl mb-4 relative overflow-hidden",
                                        style: {
                                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSubjectColor"])(subject) + '20'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('absolute inset-0 flex items-center justify-center transition-opacity duration-1000', callStatus === "FINISHED" || callStatus === "INACTIVE" ? 'opacity-100' : 'opacity-0', callStatus === "CONNECTING" && 'opacity-100 animate-pulse'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-6xl",
                                                    children: getSubjectIcon(subject)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CompanionComponent.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/CompanionComponent.tsx",
                                                lineNumber: 176,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('absolute inset-0 flex items-center justify-center transition-opacity duration-1000', callStatus === "ACTIVE" ? 'opacity-100' : 'opacity-0'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lottie$2d$react$2f$build$2f$index$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    lottieRef: lottieRef,
                                                    animationData: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$soundwaves$2e$json__$28$json$29$__["default"],
                                                    autoplay: false,
                                                    className: "w-full h-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CompanionComponent.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/CompanionComponent.tsx",
                                                lineNumber: 187,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold mb-2",
                                        children: name
                                    }, void 0, false, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: [
                                            subject,
                                            " • ",
                                            topic
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CompanionComponent.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center space-x-2 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-3 h-3 rounded-full", callStatus === "ACTIVE" ? "bg-green-500 animate-pulse" : callStatus === "CONNECTING" ? "bg-yellow-500 animate-pulse" : "bg-gray-400")
                                    }, void 0, false, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-muted-foreground",
                                        children: callStatus === "ACTIVE" ? isSpeaking ? "Speaking..." : "Listening..." : callStatus === "CONNECTING" ? "Connecting..." : "Ready"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CompanionComponent.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            callStatus === "ACTIVE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-muted-foreground text-center mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Microphone: ",
                                            isMuted ? "Muted" : "Active"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Voice Activity: ",
                                            isSpeaking ? "Detected" : "Waiting"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CompanionComponent.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            callStatus === "INACTIVE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: async ()=>{
                                        try {
                                            const stream = await navigator.mediaDevices.getUserMedia({
                                                audio: true
                                            });
                                            console.log('✅ Microphone test successful');
                                            alert('Microphone is working! You can start a voice session.');
                                            stream.getTracks().forEach((track)=>track.stop());
                                        } catch (error) {
                                            console.error('❌ Microphone test failed:', error);
                                            const message = error instanceof Error ? error.message : 'Unknown error';
                                            alert("Microphone test failed: ".concat(message));
                                        }
                                    },
                                    className: "btn-secondary text-sm px-4 py-2",
                                    children: "🎤 Test Microphone"
                                }, void 0, false, {
                                    fileName: "[project]/components/CompanionComponent.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/CompanionComponent.tsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CompanionComponent.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: userImage,
                                        alt: userName,
                                        width: 80,
                                        height: 80,
                                        className: "w-20 h-20 rounded-2xl mx-auto mb-4 object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 254,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-semibold",
                                        children: userName
                                    }, void 0, false, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CompanionComponent.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full p-4 rounded-xl border-2 border-dashed transition-all duration-200 flex items-center justify-center space-x-3", callStatus !== "ACTIVE" ? "border-muted text-muted-foreground cursor-not-allowed" : isMuted ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" : "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"),
                                        onClick: toggleMicrophone,
                                        disabled: callStatus !== "ACTIVE",
                                        children: [
                                            isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CompanionComponent.tsx",
                                                lineNumber: 279,
                                                columnNumber: 26
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CompanionComponent.tsx",
                                                lineNumber: 279,
                                                columnNumber: 59
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: isMuted ? 'Microphone Off' : 'Microphone On'
                                            }, void 0, false, {
                                                fileName: "[project]/components/CompanionComponent.tsx",
                                                lineNumber: 280,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 267,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full p-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-3", callStatus === "ACTIVE" ? "bg-red-600 hover:bg-red-700" : callStatus === "CONNECTING" ? "bg-yellow-600 cursor-not-allowed" : "btn-gradient"),
                                        onClick: callStatus === "ACTIVE" ? handleDisconnect : handleCall,
                                        disabled: callStatus === "CONNECTING",
                                        children: callStatus === "CONNECTING" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "w-5 h-5 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CompanionComponent.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Connecting..."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CompanionComponent.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true) : callStatus === "ACTIVE" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__["PhoneOff"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CompanionComponent.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "End Session"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CompanionComponent.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CompanionComponent.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Start Learning Session"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CompanionComponent.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CompanionComponent.tsx",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CompanionComponent.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CompanionComponent.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/CompanionComponent.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                className: "w-5 h-5 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/components/CompanionComponent.tsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold",
                                children: "Conversation"
                            }, void 0, false, {
                                fileName: "[project]/components/CompanionComponent.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CompanionComponent.tsx",
                        lineNumber: 321,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-muted/50 rounded-xl p-4 max-h-64 overflow-y-auto",
                        children: messages.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: messages.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-start space-x-3 p-3 rounded-lg", message.role === 'assistant' ? "bg-primary/5" : "bg-accent/5"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", message.role === 'assistant' ? "bg-primary/10" : "bg-accent/10"),
                                            children: message.role === 'assistant' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                className: "w-4 h-4 text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CompanionComponent.tsx",
                                                lineNumber: 342,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                className: "w-4 h-4 text-accent"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CompanionComponent.tsx",
                                                lineNumber: 344,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/CompanionComponent.tsx",
                                            lineNumber: 337,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-muted-foreground mb-1",
                                                    children: message.role === 'assistant' ? name.split(' ')[0] : userName
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CompanionComponent.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm leading-relaxed",
                                                    children: message.content
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CompanionComponent.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/CompanionComponent.tsx",
                                            lineNumber: 347,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, index, true, {
                                    fileName: "[project]/components/CompanionComponent.tsx",
                                    lineNumber: 330,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/CompanionComponent.tsx",
                            lineNumber: 328,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 text-muted-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                    className: "w-12 h-12 mx-auto mb-4 opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/components/CompanionComponent.tsx",
                                    lineNumber: 358,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Start a conversation to see the transcript here"
                                }, void 0, false, {
                                    fileName: "[project]/components/CompanionComponent.tsx",
                                    lineNumber: 359,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CompanionComponent.tsx",
                            lineNumber: 357,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/CompanionComponent.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/CompanionComponent.tsx",
                lineNumber: 320,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/CompanionComponent.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CompanionComponent, "77/gX2gR1e8tUrqEYlTepsveccQ=");
_c = CompanionComponent;
const __TURBOPACK__default__export__ = CompanionComponent;
var _c;
__turbopack_context__.k.register(_c, "CompanionComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_18ab5599._.js.map