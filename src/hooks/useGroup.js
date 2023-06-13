import { doc } from 'firebase/firestore';
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';

function useGroup(groupId,userId) {
    const isUserGroup = groupId.includes(userId);
    const collectionId = isUserGroup ? "users" : "groups";
    const docId = isUserGroup ? groupId.replace(userId,"") : groupId;
    const [snapshot] = useDocument(docId ? doc('db',`${collectionId}/${docId}`):null)
    if (snapshot?.exists()){
        return null;
    }
  return{ 
    id:snapshot.id,
    photoURL: snapshot.photoURL || `https://avatars.dicebear.com/api/jdenticon/${snapshot.id}.svg`,
    ...snapshot.data()
}
   
  
}

export default useGroup