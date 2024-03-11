import React from 'react'
import './Comments.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../config/FirebaseConfig'
import { addDoc, collection, deleteDoc, onSnapshot, query, where, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'



function Comments({ articleId }) {

    // We need to get user data
    const [user] = useAuthState(auth);

    const [newComment, setNewComment] = useState("");

    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Get reference to comments collection
        // const commentsRef = collection(db, 'Comments')
        // Get the comments
        // getDocs(commentsRef)
        // .then((res => {
        // convert to array
        // const comments = res.docs.map((item) => ({
        // ...item.data(),
        // id: item.id,
        // }))
        // console.log(comments)
        // setComments(comments)
        // })
        // .catch(err => console.log(err))

        // Get reference to comments collection
        const commentsRef = collection(db, "Comments");

        // Filter to show only comments for this article
        const q = query(commentsRef, where("articleId", "==", articleId));

        onSnapshot(q, (snapshot) => {
            // Convert to array
            const comments = snapshot.docs.map((item) => ({
                ...item.data(),
                id: item.id,
            }));
            setComments(comments);
        });
    }, []);

    const addNewComment = (e) => {
        e.preventDefault();
        // I need to make a new document in Comments collection
        // Include the newComment text, the articleId, and the User who made the comment
        // Create a reference to comments collection
        // I will create a collection if doesn't exist

        const commentsRef = collection(db, "Comments");
        // Adding a document with this articleId and user
        if (newComment != "") {
            addDoc(commentsRef, {
                articleId: articleId,
                userId: user?.uid,
                content: newComment,
                username: user?.displayName,
            })
                .then((res) => {
                    // Giving feedback to user for adding a comment
                    toast("Comment Added!", {
                        type: "success",
                        autoClose: 1500,
                    });
                    // Now I need to reset the input to be empty
                    setNewComment("");
                })
                .catch((err) => console.log(err));
        } else {
            toast("Please write a comment!", {
                type: "fail",
                autoClose: 1500,
            });
        }
    };

    const deleteComment = (id) => {
        // We must get the particular document
        deleteDoc(doc(db, "Comments", id))
            .then((res) => {
                // Giving feedback to user for deleting their comment
                toast("Comment deleted.", {
                    type: "success",
                    autoClose: 1000,
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="comments-container">
                {comments.map((item) => (
                    <div className="comment" key={item.id}>
                        <p>
                            <span>{item.username}</span>
                            {item.content}
                        </p>
                        {
                            // Each comment has userId
                            // Compare the userId to see if I can delete
                            user?.uid == item?.userId && (
                                <button onClick={() => deleteComment(item.id)}>Delete</button>
                            )
                        }
                    </div>
                ))}
            </div>
            {user ? (
                <form onSubmit={addNewComment}>
                    <input
                        type="text"
                        placeholder="Add Comment"
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    />
                    <button type="submit">Add Comment</button>
                </form>
            ) : (
                <p>Please Log in to comment</p>
            )}
        </div>
    );
}

export default Comments