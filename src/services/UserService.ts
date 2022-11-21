import { getDatabase, ref, onValue, set, get} from "firebase/database";
import { User } from "../models/User";

export function getUsers(onResult: (users: User[]) => void) {
    const db = getDatabase();

    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            let users: User[] = []
            const keys = Object.keys(data)
            users = keys.map((key_: any) => {
                const user_ = data[key_]
                const user: User = {
                    name: user_.name,
                    userId: user_.userId
                }
                return user
            })
            onResult(users)
        }
    });
}

export function getUser(userId: string): Promise<User> {
    const db = getDatabase();
    const userRef = ref(db, "users/" + userId);
    
    return new Promise((resolve) => {
        get(userRef).then((snapshot) => {
            const data = snapshot.val();
            const user: User = {
                name: data.name,
                userId: data.userId
            }
            resolve(user)
        });
    })
}

export function addUser(user: User) {
    const db = getDatabase();
    set(ref(db, 'users/' + user.userId), user);
}