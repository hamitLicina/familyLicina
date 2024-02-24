import React, { useEffect, useState } from 'react'
import './Banner.css'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'



function Banner() {

    const [mainArticle, setMainArticle] = useState({})
    const [otherArticles, setOtherArticles] = useState([])

    // Get data when the banner loads 
    useEffect(() => {
        // Create a variable to reference the articles
        const articleRef = collection(db, "FamilyMember")
        // Get Family Member from db
        getDocs(articleRef).then(res => {
            // console.log(res.docs[0].data())
            const articles = res.docs.map(item => ({
                ...item.data(),
                id: item.id,
            }));

            // console.log("articles", articles)
            setMainArticle(articles[0])
            setOtherArticles(articles.splice(1))

        })
    }, []);


    return (
        <div className='banner-container'>
            <div className="main-article-container" style={{backgroundImage: `url(${mainArticle?.imageUrl})`}}>
                <div className="banner-info">
                    <h2>{mainArticle?.title}</h2>
                    <div className="main-article-info">
                        <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Banner;