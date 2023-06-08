import { collection,order } from "firebase/firestore";
import {useCollection} from 'react-firebase-hooks/firestore';
import { db } from "../utils/firebase";
export default function useUsers(user){
    const [snapshot] = useCollection(query(collection(db,"groups"),orderBy('timestamp','asc')));
    const [users] = [];
snapshot?.docs.forEach(doc => {
    const id = doc.id > user.uid ? `${doc.id}${user.uid}`: `${user.uid}${doc.id}`;
    if (doc.id !== user.id){
        users.push({id,...doc.data()})
    }
})

}