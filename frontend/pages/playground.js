import React, { useRef, useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Playground = (props) => {
  const [fileArr, setFileArr] = useState([]);
  const fileRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      mainCover: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),

      //   .required('Required'),
    }),
    onSubmit: async (values) => {
      let innerValbj;

      innerValbj = {
        name: values.name,
      };

      const data = new FormData();

      for (let i = 0; i < values.mainCover.length; i++) {
        data.append('files.mainCover', values.mainCover[i]);
      }

      data.append('data', JSON.stringify(innerValbj));

      // setTitle('Submitting investigation');
      // setSubmitting(true);
      // setStatus('pending');

      const request = await fetch(`http://localhost:1337/api/tests`, {
        method: 'POST',

        body: data,
      });
    },
  });

  const onFileChange = (e) => {
    formik.setFieldValue('mainCover', e.target.files);
    const fileList = e.target.files;
    const fileArray = [];
    for (let i = 0; i < fileList.length; i++) {
      fileArray.push(fileList[i]);
    }
    setFileArr(fileArray);
  };

  // useEffect(() => {
  //   if (scrollCtx.contactRef.current) {
  //     if (router.asPath === '/#Contact') {
  //       scrollCtx.contactRef.current.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start',
  //       });
  //     }
  //   }

  //   // console.log("scrollCtx", scrollCtx.contactRef);
  //   // console.log("aboutRef", scrollCtx.aboutRef);
  // }, []);

  return (
    <section id="#contact">
      <div className="uk-tile-default">
        <div className=" pr-8 pt-8 pb-8">
          <form onSubmit={formik.handleSubmit}>
            <fieldset>
              {/* <legend className="uk-legend">Legend</legend> */}

              <div className="uk-margin">
                <input
                  className="uk-input"
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="fileupload pb-4 pt-4" data-provides="fileupload">
                <div className="fileupload-preview uk-thumbnail uk-border-rounded"></div>
                <div>
                  <span className="btn btn-primary btn-file">
                    <span className="fileupload-new pr-4">Select file</span>

                    <input
                      type="file"
                      id="mainCover"
                      multiple
                      onChange={onFileChange}
                      ref={fileRef}
                    />
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
              </div>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Playground;
