import { Button, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { DATABASE, ref, push, set } from '../Firebase/Firebase';
import { STORAGE,storageRef } from '../Firebase/Firebase';
import { uploadBytes, } from 'firebase/storage';

const UploadProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [uploadData, setUploadData] = useState([]);
  const [imageUpload,setImageUpload] = useState('');
  // const[imageList,setImageList] = useState([])
const [error,setError] = useState('');

  // const imageListRef = storageRef(STORAGE,"images/")
  // useEffect(() => {
  //   let isMounted = true;
  //   // getDataFromDatabase();
  //   listAll(imageListRef).then((response)=>{
  //     // console.log(response);
  //     response.items.forEach((item)=>{
  //       getDownloadURL(item).then((url)=>{
  //         if(isMounted){
  //           setImageList((prevData)=>[...prevData,url])
  //         }
  //       })
  //     })
  //   });  return () => {
  //     isMounted = false;
  //   };
  // }, []); // Run once when the component mounts

  const submitData = () => {
    const productData = {
      title: title,
      description: description,
      price: price,
      
    };
    if(!title || !description || !price){
      setError('Please fill in all fields');
      return;
    }
//DATABASE
    const referId = ref(DATABASE);
    const ID = push(referId).key;
    productData.id = ID;
    const refer = ref(DATABASE, `productData/${productData.id}`);
    set(refer, productData);

    //STORAGE
    const imageRef = storageRef(STORAGE,`images/${imageUpload.name}`);
    uploadBytes(imageRef,imageUpload).then(()=>{
      alert("image Uploaded")
    })
    // const imageId = push(imageRef).key;


    // Update the state after submitting data
    setUploadData((prevData) => [...prevData, productData]);

    setTitle('');
    setDescription('');
    setPrice('');
    setError('');
  };

  // function getDataFromDatabase() {
  //   var reference = ref(DATABASE);
  //   onChildAdded(reference, function (data) {
  //     setUploadData(() => data.val());
  //   });
  // }

  return (
    <Stack gap={2}>
      <TextField onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title...' />
      <TextField type='file' onChange={((e)=>setImageUpload(e.target.files[0]))} accept='image/png, image/jpeg' placeholder='Enter Image....' />
      <TextField onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description...' />
      <TextField onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price...' />
      <Button variant='contained' onClick={submitData}>
        Submit
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Render uploaded data */}
      {/* {uploadData.map((data, index) => (
        <div key={index}>
       <img src={imageList[index]} width={200} alt="" />
          <h1>{data.title}</h1>
          <h1>{data.description}</h1>
          <h1>{data.price}</h1>
        </div>
      ))} */}
    </Stack>
  );
};

export default UploadProduct;
