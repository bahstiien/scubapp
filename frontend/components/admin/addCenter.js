import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormikContext,
  useField,
} from 'formik';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import * as fi from 'date-fns/locale/fi';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
const AddCenter = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [manager, setManager] = React.useState(null);
  const [isLogged, setIsLogged] = useState('');

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

  return (
    <Formik
      initialValues={{
        name: '',
        manager: '',
        CurrentlyOpen: '',
        summary: '',
        StartPrice: '',
        telephone: '',
        lat: '',
        lng: '',
        City: '',
        adresse: '',
        // // zipCode: '',
        mail: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string(),
        // .max(15, 'Must be 15 characters or less')
        // .required('Required'),
        manager: Yup.number(),
        CurrentlyOpen: Yup.boolean(),
        summary: Yup.string(),
        StartPrice: Yup.number(),
        telephone: Yup.string(),
        lat: Yup.number(),
        lng: Yup.number(),
        City: Yup.string(),
        adresse: Yup.string(),
        // // zipCode: Yup.string(),
        mail: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values) => {
        setTimeout(() => {
          console.log(values);
          axios
            .post('http://localhost:1337/api/dive-centers', {
              data: values,
            })
            .then((response) => {
              console.log(response);
            });
        });
      }}
    >
      <Form>
        <DatePickerField name="date" />

        <label htmlFor="name"> name</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" />

        <label htmlFor="summary">summary</label>
        <Field name="summary" type="text" />

        <label htmlFor="telephone">telephone</label>
        <Field name="telephone" type="text" />

        <label htmlFor="City">city</label>
        <Field name="City" type="text" />

        <label htmlFor="adresse">adresse</label>
        <Field name="adresse" type="text" />

        <label htmlFor="StartPrice">StartPrice</label>
        <Field name="StartPrice" type="number" />

        <label htmlFor="lat">lat</label>
        <Field name="lat" type="number" />

        <label htmlFor="lng">lng</label>
        <Field name="lng" type="number" />

        {/* <label htmlFor="zipCode">zipCode</label>
        <Field name="zipCode" type="text" /> */}

        <label htmlFor="mail">mail</label>
        <Field name="mail" type="text" />

        <Field name="manager" as="select" className="my-select">
          {manager.data.attributes.users.data.map((m) => (
            <option
              key={m.id}
              value={m.id}
              className="rounded-sm px-3 py-1 hover:bg-gray-100"
            >
              {m.attributes.username}
            </option>
          ))}
        </Field>

        <div id="my-radio-group">CurrentlyOpen</div>
        <div role="group" aria-labelledby="my-radio-group">
          <label>
            <Field type="radio" name="CurrentlyOpen" value="false" />
            Fermé
          </label>
          <label>
            <Field type="radio" name="CurrentlyOpen" value="True" />
            Ouvert
          </label>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default AddCenter;
