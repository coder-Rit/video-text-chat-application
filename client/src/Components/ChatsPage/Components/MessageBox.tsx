 

// function optionButtons() {
//     return (
//         <div className="chat__conversation-board__message__options"><button
//             className="btn-icon chat__conversation-board__message__option-button option-item emoji-button"><svg
//                 className="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg"
//                 width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//                 <circle cx="12" cy="12" r="10"></circle>
//                 <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
//                 <line x1="9" y1="9" x2="9.01" y2="9"></line>
//                 <line x1="15" y1="9" x2="15.01" y2="9"></line>
//             </svg></button>
//             <button
//                 className="btn-icon chat__conversation-board__message__option-button option-item more-button"><svg
//                     className="feather feather-more-horizontal sc-dnqmqq jxshSx"
//                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
//                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
//                     strokeLinejoin="round" aria-hidden="true">
//                     <circle cx="12" cy="12" r="1"></circle>
//                     <circle cx="19" cy="12" r="1"></circle>
//                     <circle cx="5" cy="12" r="1"></circle>
//                 </svg></button>
//         </div>
//     )
// }

const MessageBox = (props: any) => {
    const { idx, res, main } = props
    return (
        <div key={idx} className={res ? "chat__conversation-board__message-container reversed" : "chat__conversation-board__message-container"}>

            <div className="chat__conversation-board__message__context">
                <div className="chat__conversation-board_message_box">
                    {main}
                    
                </div>
            </div>

            
            {/* {optionButtons()} */}

        </div>
    )
}

export default MessageBox