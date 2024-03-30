import React from 'react';
import axios from 'axios';

import { Transition } from 'react-transition-group';
import { useState, useEffect, useRef } from 'react';

import { triage } from './triage';

export default function HeroMain() {
    
    /** Function declarations **/

    // obj - iterable
    function updateBubbles(obj) {
        const nextBubbles = [
            ...chatBubbles,
            ...obj,
        ];

        setChatBubbles(nextBubbles);
    }
    function SubmitTriageInput(nextStage=null, currStage=null) {
        // console.log(triageInput.length);

        if (stage !== "cta" && triageInput.length > 0) {
            
            nextStage ? setStage(nextStage) : setStage(triage[stage]["nextStage"]);

            const updatedTriageAnswers = {...triageAnswers, [currStage ? currStage : stage] : triageInput};
            setTriageAnswers(updatedTriageAnswers);

            updateBubbles([<ArkTriageAnswer/>]);
            setTriageInput("");
        }
    }

    /** Functional components **/
    function ArkTriageQuestion({id}) {
        return (
            <h2
                id={id}
                className="display-7 p-3 text-start fw-light mb-4"
                style={{
                    maxWidth: "60%",
                    borderRadius: "10px",
                    backgroundColor: "#d6d6d6",
                }}
            >
                {triage[stage]["question"]}
            </h2>
        )
    }

    function ArkTriageAnswer() {
        return (
            <div className="d-flex flex-row justify-content-end">
                <h2
                    className="display-7 p-3 text-end fw-light mb-4"
                    style={{
                        maxWidth: "60%",
                        borderRadius: "10px",
                        backgroundColor: "#54a7ff",
                        color: "white",
                    }}
                >
                    {triageInput}
                </h2>
            </div>
        )
    }

    function ArkTriageContacts() {
        return (
            <div
                className="my-3 d-flex flex-column justify-content-start w-50 mx-auto"
            >
                <div className="d-flex flex-row mb-3">
                    <ArkContactButton label="Live Chat"/>
                    <ArkContactButton label="Text"/>
                </div>
                <div className="d-flex flex-row mt-3">
                    <ArkContactButton label="Phone call"/>
                    <ArkContactButton label="Email"/>
                </div>
            </div>
        )
    }

    function ArkContactButton({label}) {
        return (
            <button
                className="btn btn-info p-3 mx-3 w-50"
                onClick={() => {
                    setTriageInput(label);
                    setAutoInput(true);
                }}
            >
                <h4 className="fw-light">
                    {label}
                </h4>
            </button>
        )
    }

    /** Variables **/
    // this variable is set to prevent React's unique key error.
    // It has no function at present.
    let chatId = 0;

    /** Constant objects **/

    /* States */
    const [stage,setStage] = useState("init");
    const [triageInput,setTriageInput] = useState("");
    const [triageAnswers,setTriageAnswers] = useState({});
    const [chatBubbles, setChatBubbles] = useState([]);

    /* Toggles */
    const [inputVisible, setInputVisible] = useState(true);
    const [contact,setContact] = useState(false);
    const [autoInput,setAutoInput] = useState(false);
    const [titleHead,setTitleHead] = useState(false);
    const [subTitleHead,setSubTitleHead] = useState(false);
    const [showChat,setShowChat] = useState(false);
    const [showInput,setShowInput] = useState(false);

    /* Refrences */
    const inputEndRef = useRef();

    /* Numerical */
    const duration = 1500;
    const titleDelay = 500;
    const subDelay = 250;

    /* Dicts */
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 1,
    };
    
    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 }
    };

    /* Functions */
    const scrollToBottom = () => {
        inputEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    /** Effects **/
    useEffect(() => {

        if (stage === "contact") {
            setInputVisible(false);
            setContact(true);
        }

        updateBubbles(stage === "contact" ? [<ArkTriageQuestion/>,<ArkTriageContacts/>] : [<ArkTriageQuestion />]);

        if (stage === "cta") {
            setTriageAnswers({...triageAnswers, end: true})
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stage]);

    useEffect(() => {
        if (autoInput && contact) {

            switch (triageInput) {
                case "Live Chat":
                    SubmitTriageInput("contact-live-chat","contact");
                    setInputVisible(false);
                    break;
                case "Text":
                    SubmitTriageInput("contact-text","contact");
                    setInputVisible(true);
                    break;
                case "Phone call":
                    SubmitTriageInput("contact-phone","contact");
                    setInputVisible(true);
                    break;
                case "Email":
                    SubmitTriageInput("contact-email","contact");
                    setInputVisible(true);
                    break;
                default:
                    SubmitTriageInput();
                    break;
            }
            setAutoInput(false);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[triageInput,autoInput]);

    useEffect(() => {
        if (triageAnswers.end) {
            // Execute call to action for the team
            // This should be the POST action to the backend

            axios.post('http://a21492cd1de484c3ab1f0ae46b63acb1-436188089.us-east-2.elb.amazonaws.com:8000/relay/request-info/', triageAnswers);
            // axios.post('http://ark-health-server.us-east-1.elasticbeanstalk.com/relay/request-info/', triageAnswers); // doesn't work without significant effort
        }
    }, [triageAnswers]);

    useEffect(() => {
        // console.log(chatBubbles.length)
        scrollToBottom()
    }, [chatBubbles]);

    useEffect(() => {
        setTitleHead(true);
    },[]);

    /** Render **/
    return (
        <div className="d-flex flex-column justify-content-start h-100">
            <div className="d-flex flex-column flex-fill justify-content-start px-5">
                <div
                    style={{
                        height: "40%"
                    }}
                    className="d-flex flex-column justify-content-end"
                >
                    <Transition in={titleHead} timeout={duration+titleDelay} onEntered={() => setSubTitleHead(true)}>
                        {state => (
                            <h1
                                style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}
                                className='display-3 fw-lighter mt-2 mx-auto'
                            >
                                Clinical trials are intimidating
                            </h1>
                        )}
                    </Transition>
                    <Transition in={subTitleHead} timeout={duration+subDelay} onEntered={() => setShowChat(true)}>
                        {state => (
                            <h1
                                style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}
                                className='display-5 fw-lighter mb-5 mt-2 mx-auto'
                            >
                                Don't worry, we're here to help
                            </h1>
                        )}
                    </Transition>
                </div>
                
                <div className="d-flex flex-column w-75 mx-auto">
                    <Transition in={showChat} timeout={duration} onEntered={() => setShowInput(true)}>
                        {state => (
                            <div
                                style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}
                            >
                                {chatBubbles.map(bubble =>
                                    <div key={chatId++}>{bubble}</div>
                                )}
                            </div>
                        )}
                    </Transition>
                    <Transition in={showInput} timeout={duration}>
                        {state => (
                            <div
                                style={{
                                    minHeight: "72px",
                                    border: "2px solid rgb(180,180,180)",
                                    borderRadius: "10px",
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}
                                className="d-flex input-group input-group-lg mb-3 w-100 mx-auto"
                            >
                                <input
                                    aria-label={triage[stage]["label"]}
                                    aria-describedby="ark-input"
                                    autoFocus
                                    className="h-100 form-control shadow-none"
                                    disabled={inputVisible ? "" : true}
                                    id="triage-input"
                                    placeholder=""
                                    type="text"
                                    value={triageInput}
                                    onChange={e => {setTriageInput(e.target.value);}}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            SubmitTriageInput();
                                        };
                                    }}
                                    style = {{
                                        border: 0
                                    }}
                                />

                                <div className="d-flex input-group-append p-1 flex-column">
                                    <button
                                        className="btn btn-outline-secondary my-auto"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            border: 0,
                                            backgroundColor: "#8699f7",
                                            borderRadius: "24px"
                                        }}
                                        type="button"
                                        disabled={inputVisible ? "" : true}
                                        onClick={() => SubmitTriageInput()}
                                    >
                                        <img alt="send button" src={process.env.PUBLIC_URL + '/images/arrow_up.svg'} />
                                    </button>
                                </div>
                                <div ref={inputEndRef}></div>
                            </div>
                        )}
                    </Transition>
                </div>
            </div>
        </div>
    );
}