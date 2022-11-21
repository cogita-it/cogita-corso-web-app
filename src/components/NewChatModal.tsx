import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./NewChatModal.css";
import { User } from "../models/User"
import { getUsers } from "../services/UserService"

interface Props {
  open: boolean;
  onUserSelected: (user: User) => void
  onClose: () => void
}


function NewChatModal(props: Props) {
  const [users, setUsers] = useState<User[]>([]);

  const onUserSelected = (user: User) => {
    props.onUserSelected(user)
    props.onClose()
  }

  useEffect(() => {
    // Download users through a promie
    getUsers((users) => setUsers(users.filter(u => u.userId != localStorage.getItem("userId"))))
  }, []);

  return (
    <Popup open={props.open} modal closeOnDocumentClick onClose={() => props.onClose()}>
      <div className="new-chat-container">
        <p>Scegli un utente con cui parlare</p>
        {users.map(user => {return(
          <div onClick={() => onUserSelected(user)} className="new-chat-contact-container">
            <p>{user.name}</p>
          </div>
        )})}
        <div onClick={() => props.onClose()} className="new-chat-contact-container new-chat-close-modal">
          <p>Chiudi</p>
        </div>
      </div>
    </Popup>
  );
}

export default NewChatModal;
