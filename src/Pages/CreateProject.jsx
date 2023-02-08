import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
// import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  fetchCities,
  fetchNewProject,
  fetchProvinces,
} from "../API/project";

const FormObserver = ({ handleProvinceCity }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    // if country is changed,
    if (values.country_id !== "") {
      console.log(values);
      handleCountryChange(values.country_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.country_id]);

  const handleCountryChange = async (countryId) => {
    console.log("country ====> ", countryId);
    try {
      const {
        data: { states },
      } = await fetchProvinces(countryId);
      const {
        data: { cities },
      } = await fetchCities(countryId);

      handleProvinceCity(states, cities);
    } catch (error) {
      console.log("error ====> ", error);
    }
  };
  return null;
};

const CreateProject = () => {
  const [countries, SetCountries] = useState();
  const [provinceCity, setProvinceCity] = useState({
    cities: null,
    provinces: null,
  });
  const apiCallRef = useRef(false);

  const handleProvinceCity = (provinces, cities) => {
    console.log("getting ===> handleProvinceCity", provinces, cities);
    setProvinceCity({
      cities,
      provinces,
    });
  };

  useEffect(() => {
    const getNewProject = async () => {
      apiCallRef.current = true;
      const response = await fetchNewProject();
      SetCountries(response.data.countries);
    };
    if (!apiCallRef.current) {
      getNewProject();
    }
  }, []);

  return (
    <div>
      CreateProject
      <Formik
        initialValues={{
          name: "",
          short_name: "",
          email: "",
          phone_number: "",
          country_id: "",
          province_id: "",
          city_id: "",
          address: "",
          external_id: "",
          // not using below fields in the form
          overdue_charges: "",
          grace_period: "",
          transfer_fee: "",
          cancellation_fee: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("FORM VALUES ===> ", values);

          createProject(values)
            .then((response) => {
              console.log("createProject ===> ", response.data);
              setSubmitting(false);
            })
            .catch((err) => {
              console.log("err ==> createProject ==> ", err);
              setSubmitting(false);

              alert(err.response.data.errors);
            });
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <FormObserver handleProvinceCity={handleProvinceCity} />
            <Field type="input" name="name" placeholder="Name" />
            <Field type="input" name="short_name" placeholder="Short Name" />
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field
              type="input"
              name="phone_number"
              placeholder="Phone Number"
            />
            {/* country drop down */}
            <Field as="select" name="country_id">
              <option disabled value="">
                Please Select a Country
              </option>
              {countries
                ? countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))
                : null}
            </Field>
            {/* Province drop down */}
            <Field
              disabled={values.country_id === "" ? true : false}
              as="select"
              name="province_id"
            >
              <option disabled value="">
                Select A Province
              </option>
              {provinceCity.provinces ? (
                provinceCity.provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading Provinces</option>
              )}
            </Field>
            {/* City drop down */}
            <Field
              disabled={values.country_id === "" ? true : false}
              as="select"
              name="city_id"
            >
              <option disabled value="">
                Select A City
              </option>
              {provinceCity.cities ? (
                provinceCity.cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading Cities</option>
              )}
            </Field>

            <Field type="input" name="address" placeholder="Address" />
            <Field type="input" name="external_id" placeholder="External ID" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProject;
