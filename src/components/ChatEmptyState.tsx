import "./ChatEmptyState.css"

function ChatEmptyState() {
  return ( 
    <div className="empty-state-container">
      <img src="./chat-empty-state.png" alt="" />
      <p>Avvia una chat o selezionane una nella lista qui a sinistra per leggerne il dettaglio</p>
    </div>
   );
}

export default ChatEmptyState;