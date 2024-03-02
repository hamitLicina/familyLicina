import React, { useEffect, useState } from "react";
import "./Category.css";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";



function Category() {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    // Create a reference to firebase db collection
    const articleRef = collection(db, "FamilyMember");
    // Now Create query
    const q = query(articleRef, where("category", "==", categoryName));
    // Now get data that matches the query
    getDocs(q, articleRef)
      .then((res) => {
        const articles = res.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        setArticles(articles);
      })
      .catch((err) => console.log(err));
  }, [categoryName]);
  return (
    <div>
      {articles.map((item) => (
        <h2>{item?.title}</h2>
      ))}
    </div>
  );
}

export default Category;
