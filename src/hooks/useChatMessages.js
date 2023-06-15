import React from 'react'
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

function useChatMessages(groupId) {
const [snapshot] = useCollection(groupId ? query(collection(db,`groups/${groupId}/messages`),
    orderBy('timestamp','asc')
):null)

const messages = snapshot?.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),

}))

  return messages;
}

export default useChatMessages