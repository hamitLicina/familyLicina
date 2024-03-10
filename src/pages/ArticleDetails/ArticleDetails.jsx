import React, { useEffect, useState } from 'react'
import './ArticleDetails.css'
import { useParams } from 'react-router-dom';
import { db } from '../../config/FirebaseConfig';
import { getDoc, doc } from 'firebase/firestore';



function ArticleDetails() {

    const { articleId } = useParams();

    const [article, setArticle] = useState({});

    // I need to get details for this article from db

    useEffect(() => {
        // I have to set up a reference to a single document
        const docRef = doc(db, "FamilyMember", articleId);
        // Second one is getting the actual document reference
        getDoc(docRef)
            .then((res) => {
                //  console.log(res.data());
                setArticle(res.data());
            })
            .catch((err) => console.log(err));
    }, []);

    return (

        <div className="details-container">
            <h1>{article?.title}</h1>
            <h3>{article?.summary}</h3>
            <div className="details-info-container">
                <p className="article-category">Category: {article?.category}</p>
                <p><span className="article-span">Author: </span>{article?.createdBy?.toUpperCase()}</p>
                <p><span className="article-span published">Published: </span>{article?.createdAt?.toDate().toDateString()}</p>
                {/* < Likes articleId={articleId} /> */}
            </div>
            <div className="details-content">
                <img src={article?.imageUrl} alt={article?.title} className="details-img" />
                <p className="article-description">{article?.paragraphOne}</p>
                <p className="article-description">{article?.paragraphTwo}</p>
                <p className="article-description">{article?.paragraphThree}</p>
            </div>
            {/* <Comments articleId={articleId} /> */}
        </div>
    )

};

export default ArticleDetails