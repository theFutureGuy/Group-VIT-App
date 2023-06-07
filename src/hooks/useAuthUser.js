import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../utils/firebase'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

function useAuthUser() {
    const [user] = useAuthState(auth)
    useEffect(() => {
        if (user){
            const useRef = doc(db,`users/${user.uid}`)
            getDoc(useRef).then( snapshot => {
                if( !snapshot.exists){
                    setDoc(snapshot.ref,{
                        name:user.displayName,
                        photoURL: user.photoURL,
                        timeStamp: serverTimestamp()
                    })
                }
            })
        }
    })
  return (
    <div>useAuthUser</div>
  )
}

export default useAuthUser