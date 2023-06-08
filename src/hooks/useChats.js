import { db } from '@/utils/firebase';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore'

//custom hook for getting all the data from the firebase firestore to get all the groups which was created.
function useChats(user) {
    const [snapshot] = useCollection(query(collection(db,`users/${user.uid}/chats`),orderBy('timestamp','desc')));
    // console.log(snapshot)
    const chats = snapshot?.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
    }));
  return (
    chats
    // <div>useGroups</div>
  )
}

export default useChats 