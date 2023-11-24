import { Button, Stack,  } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { DATABASE, ref, onChildAdded } from '../Firebase/Firebase';
import { STORAGE,storageRef } from '../Firebase/Firebase';
import { listAll, getDownloadURL } from 'firebase/storage';
// import BasicModal from '../modalButton/Modal';

const UploadProduct = () => {
  const [uploadData, setUploadData] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [cart, setCart] = useState([]);

  // console.log('Upload Data:', uploadData);
  // console.log('Image List:', imageList);

  const imageListRef = storageRef(STORAGE, "images/");

  useEffect(() => {
    let isMounted = true;

    getDataFromDatabase();

    listAll(imageListRef)
      .then((response) => {
        // console.log('Storage Response:', response);
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (isMounted) {
              setImageList((prevData) => [...prevData, url]);
            }
          });
        });
      })
      .catch((error) => {
        console.error('Storage Error:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []); // Run once when the component mounts

  function getDataFromDatabase() {
    var reference = ref(DATABASE);

    onChildAdded(reference, function (data) {
      // console.log('New Data Received:', data.val());
      setUploadData((prevData) => [... prevData, data.val()]);
    });
  }
  console.log(uploadData);

  const handleAddToCart = (productData) => {
    setCart(() => [productData]);
  }

  return (
    <Stack>
      {/* Render uploaded data */}
      {uploadData.map((data, index) => (
        <div key={index}>
          <img src={imageList[index]} width={200} height={200} alt="" />
          <h1>{data.title}</h1>
          <h1>{data.description}</h1>
          <h1>{data.price}</h1>
          <Button variant='contained' type='submit' onClick={() => handleAddToCart(data)}>
            Add to Cart
          </Button>
        </div>
      ))}
    </Stack>
  );
};

export default UploadProduct;
