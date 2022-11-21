import { getDatabase, ref, onValue, set} from "firebase/database";
import { ChatPreview } from "../models/ChatPreview";

export function getChatPreviews(onResult: (previews: ChatPreview[]) => void) {
    const userId = localStorage.getItem("userId")
    const db = getDatabase();

    const chatsRef = ref(db, "chats/" + userId);
    onValue(chatsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const keys = Object.keys(data)
            let chatPreviews: ChatPreview[] = []
            chatPreviews = keys.map((key_: any) => {
                const chatPreview_ = data[key_]
                const chatPreview: ChatPreview = {
                    name1: chatPreview_.name1,
                    name2: chatPreview_.name2,
                    chatID: chatPreview_.chatID,
                    userID: userId!,            
                    lastMessage: chatPreview_.lastMessage,
                    sentAt: chatPreview_.sentAt
                }
                return chatPreview
            })

            const sortedPreviews = chatPreviews.sort((a, b) => a.sentAt > b.sentAt ? -1 : 1)
            onResult(sortedPreviews)
        }
    });
}

export function createOrUpdateChat(userId: string, chatId: string, chatPreview: ChatPreview) {
    const db = getDatabase();
    set(ref(db, 'chats/' + userId + "/" + chatId), chatPreview);
}