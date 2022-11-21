import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addUser } from "../services/UserService"
import { User } from "../models/User";

export function signIn(email: string, password: string): Promise<string> {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
     signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        resolve(userId)
      })
      .catch((error) => reject(error))
  })
}

export function signUp(email: string, password: string, name: string): Promise<string> {
  const auth = getAuth();
  return new Promise((resolve, reject) => { 
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const userId = userCredential.user.uid;
        const user: User = {
          name: name,
          userId: userId
        }
        addUser(user)
        resolve(userId)
    })
    .catch((error) => reject(error))
  })
}

export function logOut(): Promise<string> {
  const auth = getAuth();
  return new Promise((resolve, reject) => { 
    signOut(auth).then(() => {
      resolve("ok")
    }).catch((error) => {
      reject("Si e' verificato un errore")
    });
  })
}