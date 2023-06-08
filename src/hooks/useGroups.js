import { db } from '@/utils/firebase';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore'

//custom hook for getting all the data from the firebase firestore to get all the groups which was created.
function useGroups() {
    const [snapshot] = useCollection(query(collection(db,"groups"),orderBy('timestamp','asc')));
    // console.log(snapshot)
    const groups = snapshot?.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
    }));
  return (
    groups
    // <div>useGroups</div>
  )
}

export default useGroups