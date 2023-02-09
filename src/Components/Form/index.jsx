import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import {
  createProject,
  editProjectById,
  fetchCities,
  fetchNewProject,
  fetchProvinces,
} from "../../API/project";
import { useNavigate } from "react-router-dom";
import { createNewProjectSchema } from "../../utils/validation";
import { createNewProjectInitialValues } from "../../utils/formValues";

const FormObserver = ({
  isEditProject,
  handleProvinceCity,
  editableInputFields,
}) => {
  const apiCallRef = useRef(false);

  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    // if country is changed,
    console.log("formObserver country id ===> ", values.countryId);
    if (values.countryId.id !== "") {
      console.log(values);
      handleCountryChange(values.countryId?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.countryId.id]);

  useEffect(() => {
    const getDataToEdit = async () => {
      apiCallRef.current = true;

      console.log("editableInputFields=========>", editableInputFields);
      // prepare to update the form input fields
      for (const key in editableInputFields) {
        // console.log("keys ======> value", key, editableInputFields[key]);
        setFieldValue(key, editableInputFields[key], false);
      }
    };
    if (isEditProject && !apiCallRef.current) {
      getDataToEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountryChange = async (countryId) => {
    const provincesAPI = async () => await fetchProvinces(countryId);
    const citiesAPI = async () => await fetchCities(countryId);

    const responses = await Promise.allSettled([provincesAPI(), citiesAPI()]);

    for (const response of responses) {
      if (response.status === "fulfilled") {
        console.log("response ===> ", response.value.data);
        if ("cities" in response.value.data) {
          console.log("I have cities");
          handleProvinceCity(response.value.data.cities, "cities");
        } else if ("states" in response.value.data) {
          console.log("I have states");
          handleProvinceCity(response.value.data.states, "provinces");
        }
      } else {
        // handle error here
        console.log("response ===> ", response.value.data);
      }
    }
  };
  return null;
};

export const CreateEditForm = ({
  isEditProject,
  editableInputFields,
  projectId,
  countriesEditData,
}) => {
  const [countries, setCountries] = useState(null);
  const [provinceCity, setProvinceCity] = useState({
    cities: null,
    provinces: null,
  });
  const apiCallRef = useRef(false);
  const navigate = useNavigate();

  const handleProvinceCity = (data, key) => {
    console.log("getting ===> handleProvinceCity", data, key);
    setProvinceCity((prevState) => ({
      ...prevState,
      [`${key}`]: data,
    }));
  };

  const handleSubmit = async (values, setSubmitting) => {
    try {
      const projectData = {
        name: values.name,
        short_name: values.shortName,
        email: values.email,
        phone_number: values.phoneNumber,
        country_id: values.countryId.id,
        state_id: values.provinceId.id,
        city_id: values.cityId.id,
        address: values.address,
        external_id: values.externalId,
        overdue_charges: values.overdueCharges,
        grace_period: values.gracePeriod,
        transfer_fee: values.transferFee,
        cancellation_fee: values.cancellationFee,
        income_tax_rate_filer: values.incomeTaxRateFiler,
        income_tax_rate_non_filer: values.incomeTaxRateNonFiler,
      };
      if (isEditProject) {
        await editProjectById(projectData, projectId);
        setSubmitting(false);
        navigate(`/dashboard/view-details/${projectId}`);
      } else {
        await createProject(projectData);
        setSubmitting(false);
        navigate("/dashboard");
      }
      // const submissionSuccess = await dispatch(createNewProject(values));
      //   console.log("SUBMISSION SUCCESSFUL ===> ", submissionSuccess);
    } catch (error) {
      console.log("error ===> ", error);
      alert(error?.response?.data?.errors[0]);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getNewProject = async () => {
      apiCallRef.current = true;
      const response = await fetchNewProject();
      setCountries(response.data.countries);
    };
    if (!apiCallRef.current && !isEditProject) {
      getNewProject();
    } else if (!apiCallRef.current && isEditProject) {
      setCountries(countriesEditData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isEditProject ? (
        <h1>Editing the Project Details</h1>
      ) : (
        <h1>Create a New Project</h1>
      )}
      <Formik
        validationSchema={createNewProjectSchema}
        initialValues={createNewProjectInitialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ isSubmitting, values, errors, touched, setFieldValue }) => {
          return (
            <Form>
              <FormObserver
                isEditProject={isEditProject}
                handleProvinceCity={handleProvinceCity}
                editableInputFields={editableInputFields}
              />
              {/* Name */}
              <Field type="input" name="name" placeholder="Name" />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}

              {/* Short Name */}
              <Field type="input" name="shortName" placeholder="Short Name" />
              {errors.shortName && touched.shortName ? (
                <div>{errors.shortName}</div>
              ) : null}
              {/* Email */}
              <Field type="email" name="email" placeholder="Email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}

              {/* Phone Number */}
              <Field
                type="input"
                name="phoneNumber"
                placeholder="Phone Number"
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div>{errors.phoneNumber}</div>
              ) : null}
              {/* country drop down */}
              <Field
                // onChange={(e) => handleChange(setFieldValue, e)}
                as="select"
                name="countryId.id"
              >
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
              {errors.countryId?.id && touched.countryId?.id ? (
                <div>{errors.countryId.id}</div>
              ) : null}
              {/* Province drop down */}
              <Field
                disabled={values.countryId.id === "" ? true : false}
                as="select"
                name="provinceId.id"
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
              {errors.provinceId?.id && touched.provinceId?.id ? (
                <div>{errors.provinceId.id}</div>
              ) : null}
              {/* City drop down */}
              <Field
                disabled={values.countryId.id === "" ? true : false}
                as="select"
                name="cityId.id"
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
              {errors.cityId?.id && touched.cityId?.id ? (
                <div>{errors.cityId.id}</div>
              ) : null}
              {/* Address */}
              <Field type="input" name="address" placeholder="Address" />
              {errors.address && touched.address ? (
                <div>{errors.address}</div>
              ) : null}
              <Field type="input" name="externalId" placeholder="External ID" />

              {/* Overdue Charges */}
              <Field
                type="input"
                name="overdueCharges"
                placeholder="Overdue Charges"
              />
              {/* Grace Period */}
              <Field
                type="input"
                name="gracePeriod"
                placeholder="Grace Period"
              />

              {/*  Transfer Fee */}
              <Field
                type="input"
                name="transferFee"
                placeholder="Transfer Fee"
              />

              {/* Cancellation Fee */}
              <Field
                type="input"
                name="cancellationFee"
                placeholder="Cancellation Fee"
              />
              {/* Income Tax Rate Filter */}
              <Field
                type="input"
                name="incomeTaxRateFiler"
                placeholder="Income Tax Rate Filter"
              />
              {errors.incomeTaxRateFiler && touched.incomeTaxRateFiler ? (
                <div>{errors.incomeTaxRateFiler}</div>
              ) : null}
              {/*Income Tax Rate Non Filter  */}
              <Field
                type="input"
                name="incomeTaxRateNonFiler"
                placeholder="Income Tax Rate Non Filter"
              />
              {errors.incomeTaxRateNonFiler && touched.incomeTaxRateNonFiler ? (
                <div>{errors.incomeTaxRateNonFiler}</div>
              ) : null}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
