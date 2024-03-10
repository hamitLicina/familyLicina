import React, { useState, useEffect } from 'react'
import './Likes.css'
import { auth, db } from '../../config/FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, deleteDoc, getDocs, query, where, doc } from 'firebase/firestore'
import { FaHeart, FaRegHeart } from 'react-icons/fa'



function Likes({ articleId }) {

    // Get user data
    const [user] = useAuthState(auth);

    const [isLiked, setIsLiked] = useState(false);

    const [likesCount, setLikesCount] = useState(0);

    // We need to know if user has liked this article before, if they did so we can show the liked icon
    useEffect(() => {
        // Did this user like this article ?
        // So we need collection reference
        const likesRef = collection(db, "Likes");
        // If user is logged in
        if (user) {
            // This query is almost same as the previous one which we did to make the query to find the id of the document to delete
            const q = query(
                likesRef,
                where("articleId", "==", articleId),
                where("userId", "==", user?.uid)
            );
            // Look for matching document (if they liked the document it will give us a document otherwise it will not gives anything)
            getDocs(q, likesRef)
                .then((res) => {
                    if (res.size > 0) {
                        setIsLiked(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    useEffect(() => {
        // I am trying to find out how many people liked this article.
        // I need to make a query to count the likes
        const likesRef = collection(db, "Likes");

        const q2 = query(likesRef, where("articleId", "==", articleId));
        // I have to look for matching documents
        getDocs(q2, likesRef)
            .then((res) => {
                setLikesCount(res.size);
            })
            .catch((err) => console.log(err));
    }, [isLiked]);

    // We need to add a for this user to this article if you click the empty heart, remove if click again
    // We will need another collection that stores the userId and articleId which is the Like collection
    const handleLike = (e) => {
        // Make sure user is logged in
        if (user) {
            // Create reference to likes collection
            // I will create collection if does not exist
            const likesRef = collection(db, "Likes");
            // Now I am adding a document with this articleId and userId
            addDoc(likesRef, {
                userId: user?.uid,
                articleId: articleId,
            })
                .then((res) => {
                    // I want to show that it is liked by showing the full heart icon
                    setIsLiked(true);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleUnlike = (e) => {
        // I must make sure the user is logged in
        if (user) {
            // Need to find document with this userId and articleId
            // To get its document id
            const likesRef = collection(db, "Likes");

            // Now I have to make the query to set up and to find the id of the document to delete
            const q = query(
                likesRef,
                where("articleId", "==", articleId),
                where("userId", "==", user?.uid)
            );
            // Query is getting the data based on the condition
            // Get match
            getDocs(q, likesRef)
                .then((res) => {
                    // console.log(res.size);
                    // console.log(res.docs[0]);
                    const likesId = res.docs[0].id;
                    // console.log(likesId);  I just made this to make sure which documentId I must select
                    deleteDoc(doc(db, "Likes", likesId))
                        .then((res) => {
                            // Change icon to unlike heart icon
                            setIsLiked(false);
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div>
            <div className="like-icon">
                {isLiked ? (
                    <FaHeart onClick={handleUnlike} />
                ) : (
                    <FaRegHeart onClick={handleLike} />
                )}
                <span>{likesCount}</span>
            </div>
        </div>
    )
}

export default Likes