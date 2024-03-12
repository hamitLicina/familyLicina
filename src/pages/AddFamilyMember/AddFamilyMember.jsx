/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './AddFamilyMember.css'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage, auth, db } from '../../config/FirebaseConfig'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { v4 } from 'uuid'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



function AddFamilyMember() {

  // Activate useNavigate
  const navigate = useNavigate();

  // Get user info
  const [user] = useAuthState(auth);

  const categories = ["Family Members", "Travel", "Health", "Food"];

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    paragraphOne: "",
    paragraphTwo: "",
    paragraphThree: "",
    category: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // We should see the formData state
    // console.log("formData", formData);

    // First thing to do is create a reference for the image
    const imageRef = ref(storage, `images/${formData.image.name + v4()}`);

    // Now we need to upload the image to the bucket
    uploadBytes(imageRef, formData.image)
      .then((res) => {
        // console.log(res)
        // We will say now get download url from the reference
        getDownloadURL(res.ref)
          .then((url) => {
            // console.log("Download URL", url);
            // Now we have all data and url
            // We need to Create article reference
            const articleRef = collection(db, "FamilyMember");
            // Use addDoc to add the article to the collection
            addDoc(articleRef, {
              title: formData.title,
              summary: formData.summary,
              paragraphOne: formData.paragraphOne,
              paragraphTwo: formData.paragraphTwo,
              paragraphThree: formData.paragraphThree,
              category: formData.category,
              imageUrl: url,
              createdBy: user?.displayName,
              userId: user?.uid,
              createdAt: Timestamp.now().toDate(),
            }).then((res) => {
              toast("Article saved successfully!", {
                type: "success",
                autoClose: 1500,
              });
              setTimeout(() => {
                navigate("/");
              }, 1000);
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="add-family-member-container">
      <form className="add-fm-form" onSubmit={handleSubmit}>
        <h2>Create Article</h2>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Maximum 100 characters"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            placeholder="Maximum 120 characters"
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphOne">Paragraph One</label>
          <textarea
            id="paragraphOne"
            placeholder="Maximum 650 characters"
            onChange={(e) =>
              setFormData({ ...formData, paragraphOne: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphTwo">Paragraph Two</label>
          <textarea
            id="paragraphTwo"
            placeholder="Maximum 650 characters"
            onChange={(e) =>
              setFormData({ ...formData, paragraphTwo: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphThree">Paragraph Three</label>
          <textarea
            id="paragraphThree"
            placeholder="Maximum 650 characters"
            onChange={(e) =>
              setFormData({ ...formData, paragraphThree: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select</option>
            {categories.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-group">
          <label>Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddFamilyMember