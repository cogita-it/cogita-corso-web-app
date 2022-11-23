import "./Chat.css";
import ChatList from "../components/ChatList";
import { useEffect, useState } from "react";
import ChatDetails from "../components/ChatDetails";
import { ChatPreview } from "../models/ChatPreview";
import { getChatPreviews } from "../services/ChatPreviewService";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User"
import { getUser } from "../services/UserService"

function Chat() {
  const [selectedChat, setSelectedChat] = useState<ChatPreview>();
  const [user, setUser] = useState<User>();
  const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verify if there's a session
    const userId = localStorage.getItem("userId")
    if (userId) {
      getChatPreviews((previews) => {
        setChatPreviews(previews);
      });
      getUser(userId).then((user_) => {
        if (user_) {
          setUser(user_)
        } else {
          navigate("../login");    
        }
      })
    } else {
      navigate("../login");
    }
  }, []);

  return (
    <div className="chat-container">
      {user &&
      <>
      <ChatList
        chatPreviews={chatPreviews}
        user={user}
        onChatSelected={(preview) => setSelectedChat(preview)}
      />
      <ChatDetails user={user} chat={selectedChat} />
      </>
      }
    </div>
  );
}

export default Chat;
