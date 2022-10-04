import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import Separator from '../ui/Separator';
import Styles from '../../styles/form.module.css';
import toast, { Toaster } from 'react-hot-toast';

const AddCenter = ({ bool }) => {
  const [fileArr, setFileArr] = useState([]);
  const fileRef = useRef(null);

  const [manager, setManager] = React.useState(null);
  const [isLogged, setIsLogged] = useState('');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues: {
      name: '',
      currentlyOpen: '',
      mail: '',
      telephone: '',
      manager: '',
      StartPrice: '',
      lat: '',
      lng: '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Required de ses morts'),
      mail: Yup.string().email('Invalid email address').required('Required'),
      manager: Yup.number(),
      currentlyOpen: Yup.boolean(),
      StartPrice: Yup.number(),
      lat: Yup.number(),
      lng: Yup.number(),
    }),
    onSubmit: async (values) => {
      let innerValbj;

      innerValbj = {
        name: values.name,
        mail: values.mail,
        telephone: values.telephone,
        manager: parseInt(values.manager),
        currentlyOpen: values.currentlyOpen,
        StartPrice: values.StartPrice,
        lat: values.lat,
        lng: values.lng,
      };

      console.log(innerValbj);

      const data = new FormData();

      for (let i = 0; i < values.mainCover.length; i++) {
        data.append('files.mainCover', values.mainCover[i]);
      }

      data.append('data', JSON.stringify(innerValbj));

      const request = await fetch(`http://localhost:1337/api/dive-centers`, {
        method: 'POST',

        body: data,
      }).then(toast.success('Successfully toasted!'));
    },
  });

  // FUNCTION FOR LOG
  useEffect(() => {
    setIsLogged(localStorage.getItem('jwt'));
  }, []);

  const options = {
    method: 'POST',
    url: 'http://localhost:1337/graphql',
    headers: {
      Authorization: `Bearer ${isLogged}`,
    },
    data: {
      query: `{
        usersPermissionsRole(id:5){ data {id, attributes{name,users{ data{id, attributes{username}}}}}}

            }`,
    },
  };

  React.useEffect(() => {
    axios.request(options).then((response) => {
      setManager(response.data.data.usersPermissionsRole);
    });
  }, []);

  if (!manager) return null;

  const onFileChange = (e) => {
    formik.setFieldValue('mainCover', e.target.files);
    const fileList = e.target.files;
    const fileArray = [];
    for (let i = 0; i < fileList.length; i++) {
      fileArray.push(fileList[i]);
    }
    setFileArr(fileArray);
  };

  return (
    //   // City: '',
    //   // adresse: '',

    <>
      <div className="w-full">
        <div>
          <Toaster />
        </div>
        <Separator name="general informations" />
        <form onSubmit={formik.handleSubmit}>
          <fieldset>
            {/* <div className="flex w-full flex-wrap -mx-3 mb-6"> */}
            <div className="flex w-full flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2   px-3 mb-6 md:mb-0">
                <label htmlFor="name" className={Styles.label_form}>
                  Name of the diving center
                </label>
                <input
                  className={Styles.input_form}
                  type="text"
                  name="name"
                  id="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className={Styles.error_form}>{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="w-full md:w-1/2   px-3 mb-6 md:mb-0">
                <label htmlFor="name" className={Styles.label_form}>
                  Statut
                </label>
                <select
                  name="currentlyOpen"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cuurentlyOpen}
                  className={Styles.input_form}
                >
                  <option
                    value={true}
                    className="rounded-sm px-3 py-1 hover:bg-gray-100"
                  >
                    OPEN
                  </option>
                  <option
                    value={false}
                    className="rounded-sm px-3 py-1 hover:bg-gray-100"
                  >
                    CLOSED
                  </option>
                </select>
              </div>
            </div>

            <div className="flex w-full flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3   px-3 mb-6 md:mb-0">
                <label htmlFor="name" className={Styles.label_form}>
                  Start Price
                </label>
                <input
                  className={Styles.input_form}
                  type="number"
                  name="StartPrice"
                  id="StartPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.StartPrice}
                />
                {formik.touched.StartPrice && formik.errors.StartPrice ? (
                  <div className={Styles.error_form}>
                    {formik.errors.StartPrice}
                  </div>
                ) : null}
              </div>

              <div className="w-full md:w-1/3   px-3 mb-6 md:mb-0">
                <label htmlFor="name" className={Styles.label_form}>
                  Latitude
                </label>
                <input
                  className={Styles.input_form}
                  type="number"
                  name="lat"
                  id="lat"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lat}
                />
                {formik.touched.lat && formik.errors.lat ? (
                  <div className={Styles.error_form}>{formik.errors.lat}</div>
                ) : null}
              </div>

              <div className="w-full md:w-1/3   px-3 mb-6 md:mb-0">
                <label htmlFor="name" className={Styles.label_form}>
                  Longitude
                </label>
                <input
                  className={Styles.input_form}
                  type="number"
                  name="lat"
                  id="lat"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lng}
                />
                {formik.touched.lng && formik.errors.lng ? (
                  <div className={Styles.error_form}>{formik.errors.lng}</div>
                ) : null}
              </div>
            </div>

            <div className="flex w-full flex-wrap -mx-3 mb-6 px-3">
              <label htmlFor="mainCover" className={Styles.label_form}>
                Summary
              </label>
              <input
                className={Styles.input_form}
                type="text"
                name="summary"
                id="summary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.summary}
              />
            </div>

            <div className="flex w-full flex-wrap -mx-3 mb-6 px-3">
              <label htmlFor="mainCover" className={Styles.label_form}>
                Cover
              </label>
              <input
                type="file"
                id="mainCover"
                className={Styles.input_form}
                multiple
                onChange={onFileChange}
                ref={fileRef}
                accept="image/*"
              />
            </div>

            <Separator name="Contact" />

            <div className="flex w-full flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3   px-3 mb-6 md:mb-0">
                <label htmlFor="name" className={Styles.label_form}>
                  Email for public
                </label>
                <input
                  className={Styles.input_form}
                  type="text"
                  name="mail"
                  id="mail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mail}
                />
                {formik.touched.mail && formik.errors.mail ? (
                  <div className={Styles.error_form}>{formik.errors.mail}</div>
                ) : null}
              </div>

              <div className="w-full md:w-1/3   px-3 mb-6 md:mb-0">
                <label htmlFor="name" className={Styles.label_form}>
                  Phone number
                </label>
                <input
                  className={Styles.input_form}
                  type="text"
                  name="telephone"
                  id="telephone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.telephone}
                />
                {formik.touched.telephone && formik.errors.telephone ? (
                  <div className={Styles.error_form}>
                    {formik.errors.telephone}
                  </div>
                ) : null}
              </div>

              <div className="w-full md:w-1/3   px-3 mb-6 md:mb-0">
                <label htmlFor="name" className={Styles.label_form}>
                  manager of the center
                </label>

                <select
                  name="manager"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.manager}
                  className={Styles.input_form}
                >
                  {manager.data.attributes.users.data.map((m) => (
                    <option
                      key={m.id}
                      value={m.id}
                      className="rounded-sm px-3 py-1 hover:bg-gray-100"
                    >
                      {m.attributes.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex w-full flex-wrap -mx-3 mb-6 px-3">
              <label htmlFor="Adresse" className={Styles.label_form}>
                Adresse
              </label>
              <input
                className={Styles.input_form}
                type="text"
                name="summary"
                id="summary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Adresse}
              />
            </div>

            <div className="flex w-full flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/4  px-3 mb-6 md:mb-0">
                <label htmlFor="zipCode" className={Styles.label_form}>
                  zipCode
                </label>
                <input
                  className={Styles.input_form}
                  type="number"
                  name="lat"
                  id="lat"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zipCode}
                />
                {formik.touched.zipCode && formik.errors.zipCode ? (
                  <div className={Styles.error_form}>
                    {formik.errors.zipCode}
                  </div>
                ) : null}
              </div>

              <div className="w-full md:w-3/4  px-3 mb-6 md:mb-0">
                <label htmlFor="city" className={Styles.label_form}>
                  city
                </label>
                <input
                  className={Styles.input_form}
                  type="text"
                  name="summary"
                  id="summary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
              </div>
            </div>

            <div>
              <span className="btn btn-primary btn-file">
                <div className="w-full flex justify-around pt-4 flex-wrap ">
                  {fileArr.map((file, index) => {
                    // console.log("file", file);
                    return (
                      <span
                        className="  uk-border-rounded flex justify-around  flex-wrap "
                        key={index}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-[150px] h-[150px]"
                        />
                      </span>
                    );
                  })}
                </div>
              </span>
              {/* {console.log("fileRef", fileRef)} */}
              {fileRef.current === null ? null : (
                <a
                  href="#"
                  id="remove"
                  data-dismiss="fileupload"
                  onClick={(e) => {
                    e.preventDefault();
                    //  document.getElementById('file').value = null
                    fileRef.current = null;
                    setFileArr([]);
                  }}
                >
                  Remove
                </a>
              )}
            </div>
            {/* <div className="w-full md:w-2/3 px-3">
                <label
                  htmlFor="summary"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  summary
                </label>
                <Field
                  name="summary"
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div> */}
            {/* </div> */}
            <div className="flex w-full flex-wrap -mx-3 mb-6">
              {/* <div className="w-full md:w-1/3 px-3">
                <label
                  htmlFor="telephone"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  telephone
                </label>
                <Field
                  name="telephone"
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div> */}

              {/* <div className="w-full md:w-1/3 px-3">
                <label
                  htmlFor="City"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  city
                </label>
                <Field
                  name="City"
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div> */}
              {/* <div className="w-full md:w-1/3 px-3">
                <label
                  htmlFor="adresse"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  adresse
                </label>
                <Field
                  name="adresse"
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div> */}
            </div>

            <button
              type="submit"
              className="block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default AddCenter;
