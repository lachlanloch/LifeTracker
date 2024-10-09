
'use client'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut , sendPasswordResetEmail} from 'firebase/auth'
import { doc, getDoc, collection, getDocs} from 'firebase/firestore'
import "firebase/firestore";


import React, { useContext, useState, useEffect } from 'react'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dailyQuestionData, setDailyQuestionData] = useState([])


    // AUTH HANDLERS
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    const sendResetEmail = async (email) => {
        try {
          await sendPasswordResetEmail(auth, email);
          console.log('Password reset email sent successfully');
        } catch (error) {
          console.error('Error sending password reset email:', error.message);
          throw error; // Propagate the error to be handled by the caller
        }
      };



     

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
               
                // Set the user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if (!user) {
                    console.log('No User Found')
                    return
                }
                // if user exists, fetch data from firestore database
                console.log('Fetching User Data')
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if (docSnap.exists()) {
                    console.log('Found User Data', docSnap.data())
                    firebaseData = docSnap.data()
                }
                setUserDataObj(firebaseData)
   
                //getting promp coll data
                console.log('Fetching Prompt Data')                      
                const promptsRef = collection(db, 'users', user.uid, 'collection1')
                const querySnapshot1 = await getDocs(promptsRef)
                const list = querySnapshot1.docs.map(doc =>{               
                   return {id: doc.id, ...doc.data()}                       
                })
                console.log('Found Daily Question Data ', list)
                setDailyQuestionData(list)                 
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        })    
        return unsubscribe
    }, [])
    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        sendResetEmail,
        dailyQuestionData,
        setDailyQuestionData,
        signup,
        logout,
        login,
        loading,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}