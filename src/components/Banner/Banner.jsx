import React, { useEffect, useState } from 'react'
import './Banner.css'
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { useNavigate } from 'react-router-dom'



function Banner() {

    const navigate = useNavigate()

    const [mainArticle, setMainArticle] = useState({})
    const [otherArticles, setOtherArticles] = useState([])

    // Get data when the banner loads 
    useEffect(() => {
        // Create a variable to reference the articles
        const articleRef = collection(db, "FamilyMember")
        // Set up query to filter responses  ( Sort and get latest 5 articles )
        const q = query(articleRef, orderBy('createdAt', 'desc'), limit(5))
        // Get Family Member from db
        getDocs(q, articleRef).then(res => {
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
            <div className="main-article-container" onClick={() => navigate(`/article/${mainArticle?.id}`)} style={{ backgroundImage: `url(${mainArticle?.imageUrl})` }}>
                <div className="banner-info">
                    <h2>{mainArticle?.title}</h2>
                    <div className="main-article-info">
                        <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
                    </div>
                </div>
            </div>
            <div className="other-articles-container">
                {otherArticles.map((item, index) => (<div className='other-article-item' onClick={() => navigate(`/article/${item?.id}`)} key={index} style={{ backgroundImage: `url(${item?.imageUrl})` }}>
                    <div className="banner-info">
                        <h4>{item?.title}</h4>
                        <div className="main-article-info">
                            <small>{item?.createdAt?.toDate().toDateString()}</small>
                        </div>
                    </div>
                </div>))}
            </div>
        </div>
    )
}

export default Banner;