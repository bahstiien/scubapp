import React, { useRef, useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import router from 'next/router';

const Test = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState('');

  const [fileArr, setFileArr] = useState([]);
  const fileRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      mainPhoto: null,
    },
    validationSchema: Yup.object({
      mail: Yup.string().email('Invalid email address').required('Required'),
      // reason: Yup.string()
      //   .required('Required'),
    }),
    onSubmit: async (values) => {
      let innerValbj;

      const data = new FormData();

      for (let i = 0; i < values.mainPhoto.length; i++) {
        data.append('files.mainPhoto', values.mainPhoto[i]);
      }

      data.append('data', JSON.stringify(innerValbj));

      setTitle('Submitting investigation');
      setSubmitting(true);

      const userObj = localStorage.getItem('user');
      const token = JSON.parse(userObj).jwt;

      const request = await fetch(`http://localhost:1337/api/dive-centers`, {
        method: 'POST',
        body: data,
      });

      const response = await request.json();

      if (!response.error) {
        setTitle('Submitted investigation');
      }
      if (response.error) {
        // alert("Something went wrong");
        setTitle('Error submitting investigation');

        const timer = setTimeout(() => {
          setSubmitting(false);
          clearTimeout(timer);
        }, 1000);
      }
    },
  });

  const onFileChange = (e) => {
    formik.setFieldValue('mainPhoto', e.target.files);
    const fileList = e.target.files;
    const fileArray = [];
    for (let i = 0; i < fileList.length; i++) {
      fileArray.push(fileList[i]);
    }
    setFileArr(fileArray);
  };

  return <p> Plaground</p>;
};

export default Test;
