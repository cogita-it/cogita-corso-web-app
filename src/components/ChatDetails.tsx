import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../models/ChatMessage";
import { ChatPreview } from "../models/ChatPreview";
import { getMessages, sendMessage } from "../services/ChatMessageService";
import { createOrUpdateChat } from "../services/ChatPreviewService";
import "./ChatDetails.css";
import ChatEmptyState from "./ChatEmptyState";
import { User } from "../models/User";

interface Props {
  chat?: ChatPreview;
  user: User;
}

function ChatDetails(props: Props) {
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (props.chat) {
      getMessages(props.chat?.chatID, (messages: ChatMessage[]) => {
        setChatMessages(messages);
      });
    }
  }, [props.chat]);

  const onScrollToLastMessage = () => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputContent, setInputContent] = useState("");

  useEffect(() => {
    onScrollToLastMessage();
  }, [chatMessages]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onSend(inputContent);
    }
  };

  let onSend = (content: string) => {
    if (content) {
      let newMsg: ChatMessage = {
        who: props.user.userId,
        content: content,
        sentAt: new Date().getTime().toString(),
      };

      if (props.chat) {
        sendMessage(newMsg, props.chat.chatID);
        const chatPreview_: ChatPreview = {
          name1: props.chat!.name1,
          name2: props.chat!.name2,
          chatID: props.chat!.chatID,
          userID: props.chat!.userID,
          lastMessage: newMsg.content,
          sentAt: newMsg.sentAt,
        };
        createOrUpdateChat(props.user.userId, props.chat!.chatID, chatPreview_);
        setInputContent("");
      }
    } else {
      alert("Non puoi inviare un messaggio vuoto");
    }
  };

  const senderName = props.user.name;

  return (
    <div className="chat-details-container">
      {props.chat ? (
        <>
          <div className="chat-bubbles-container">
            {chatMessages.map((msg, index) => {
              const who_ = props.user.userId == msg.who ? "me" : "sender";
              return (
                <div className={"chat-bubble chat-bubble-" + who_}>
                  <div className={"chat-bubble-pic chat-bubble-pic-" + who_}>
                    {who_ == "me" ? props.user.name[0] : (senderName == props.chat!.name1 ? props.chat!.name2 : props.chat!.name1)[0]}
                  </div>
                  <div ref={lastMessageRef}>
                    {who_ == "me" && (
                      <span>
                        <p className="chat-bubble-name">{senderName + " (Tu)"}</p>
                        <p className="chat-bubble-content">{msg.content}</p>
                      </span>
                    )}
                    {who_ == "sender" && (
                      <span>
                        <p className="chat-bubble-name">{senderName == props.chat!.name1 ? props.chat!.name2 : props.chat!.name1}</p>
                        <p className="chat-bubble-content">{msg.content}</p>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="textinput-box-container">
            <input
              value={inputContent}
              onKeyDown={handleKeyDown}
              placeholder={"Invia un messaggio"}
              onChange={(evt) => setInputContent(evt.target.value)}
            ></input>
            <div
              onClick={() => {
                onSend(inputContent);
              }}
              className="send-message-btn"
            >
              <p>Invia</p>
            </div>
          </div>
        </>
      ) : (
        <ChatEmptyState />
      )}
    </div>
  );
}

export default ChatDetails;
