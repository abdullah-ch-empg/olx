import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  createProject,
  editProjectById,
  fetchNewProject,
} from "../../../API/project";
import { useNavigate } from "react-router-dom";
import { createNewProjectSchema } from "../../../utils/validation";
import { createNewProjectInitialValues } from "../../../utils/formValues";
import styles from "./Form.module.scss";
import FormObserver from "./Observer";

const CreateEditForm = ({
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
        country_id: values.country.id,
        state_id: values.province.id,
        city_id: values.city.id,
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
    <>
      {isEditProject ? (
        <span>Editing the Project Details</span>
      ) : (
        <span>Create a New Project</span>
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
            <Form className={styles.container}>
              <FormObserver
                isEditProject={isEditProject}
                handleProvinceCity={handleProvinceCity}
                editableInputFields={editableInputFields}
              />
              {/* Name */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Name</label>
                <Field
                  className={`${
                    errors.name && touched.name ? styles.errorField : ""
                  }`}
                  type="input"
                  name="name"
                  label="name"
                  placeholder="Name"
                />
                {errors.name && touched.name ? (
                  <div className={`${styles.label} ${styles.errorFont}`}>
                    {errors.name}
                  </div>
                ) : null}
              </div>
              {/* Short Name */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Short Name</label>

                <Field
                  className={`${
                    errors.shortName && touched.shortName
                      ? styles.errorField
                      : ""
                  }`}
                  type="input"
                  name="shortName"
                  placeholder="Short Name"
                />
                {errors.shortName && touched.shortName ? (
                  <div className={`${styles.label} ${styles.errorFont}`}>
                    {errors.shortName}
                  </div>
                ) : null}
              </div>
              {/* Email */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Email</label>
                <Field
                  className={`${
                    errors.email && touched.email ? styles.errorField : ""
                  }`}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <div className={`${styles.label} ${styles.errorFont}`}>
                    {errors.email}
                  </div>
                ) : null}
              </div>
              {/* Phone Number */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Phone Number</label>

                <Field
                  className={`${
                    errors.phoneNumber && touched.phoneNumber
                      ? styles.errorField
                      : ""
                  }`}
                  type="input"
                  name="phoneNumber"
                  placeholder="Phone Number"
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className={`${styles.label} ${styles.errorFont}`}>
                    {errors.phoneNumber}
                  </div>
                ) : null}
              </div>
              {/* country drop down */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Country</label>
                <Field
                  className={
                    errors?.country?.id && touched?.country?.id
                      ? styles.errorField
                      : ""
                  }
                  // onChange={(e) => handleChange(setFieldValue, e)}
                  as="select"
                  name="country.id"
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
                {errors.country?.id && touched.country?.id ? (
                  <div className={`${styles.label} ${styles.errorFont}`}>
                    {errors.country.id}
                  </div>
                ) : null}
              </div>
              {/* Province drop down */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Province</label>

                <Field
                  className={
                    errors.province?.id && touched.province?.id
                      ? styles.errorField
                      : ""
                  }
                  disabled={values.country.id === "" ? true : false}
                  as="select"
                  name="province.id"
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
                {errors.province?.id && touched.province?.id ? (
                  <div className={`${styles.label} ${styles.errorFont}`}>
                    {errors.province.id}
                  </div>
                ) : null}
              </div>
              {/* City drop down */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>City</label>
                <Field
                  className={
                    errors.city?.id && touched.city?.id ? styles.errorField : ""
                  }
                  disabled={values.country.id === "" ? true : false}
                  as="select"
                  name="city.id"
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
                {errors.city?.id && touched.city?.id ? (
                  <div className={`${styles.label} ${styles.errorFont}`}>
                    {errors.city.id}
                  </div>
                ) : null}
              </div>
              {/* Address */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Address</label>

                <Field
                  className={
                    errors.address && touched.address ? styles.errorField : ""
                  }
                  type="input"
                  name="address"
                  placeholder="Address"
                />
                {errors.address && touched.address ? (
                  <div className={`${styles.label} ${styles.errorFont}`}>
                    {errors.address}
                  </div>
                ) : null}
              </div>
              {/* External Id */}

              <div className={`${styles.m10}`}>
                <label className={styles.label}>External Id</label>

                <Field
                  type="input"
                  name="externalId"
                  placeholder="External ID"
                />
              </div>
              {/* Overdue Charges */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Overdue Charges</label>

                <Field
                  type="input"
                  name="overdueCharges"
                  placeholder="Overdue Charges"
                />
              </div>
              {/* Grace Period */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Grace Period</label>

                <Field
                  type="input"
                  name="gracePeriod"
                  placeholder="Grace Period"
                />
              </div>
              {/*  Transfer Fee */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Transfer Fee</label>

                <Field
                  type="input"
                  name="transferFee"
                  placeholder="Transfer Fee"
                />
              </div>
              {/* Cancellation Fee */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Cancellation Fee</label>

                <Field
                  type="input"
                  name="cancellationFee"
                  placeholder="Cancellation Fee"
                />
              </div>
              {/* Income Tax Rate Filter */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>Income Tax Rate Filter</label>

                <Field
                  className={
                    errors.incomeTaxRateFiler && touched.incomeTaxRateFiler
                      ? styles.errorField
                      : ""
                  }
                  type="input"
                  name="incomeTaxRateFiler"
                  placeholder="Income Tax Rate Filter"
                />
                {errors.incomeTaxRateFiler && touched.incomeTaxRateFiler ? (
                  <div className={`${styles.label} ${styles.errorFont}`}>
                    {errors.incomeTaxRateFiler}
                  </div>
                ) : null}
              </div>
              {/*Income Tax Rate Non Filter  */}
              <div className={`${styles.m10}`}>
                <label className={styles.label}>
                  Income Tax Rate Non Filter
                </label>
                <Field
                  className={
                    errors.incomeTaxRateNonFiler &&
                    touched.incomeTaxRateNonFiler
                      ? styles.errorField
                      : ""
                  }
                  type="input"
                  name="incomeTaxRateNonFiler"
                  placeholder="Income Tax Rate Non Filter"
                />
                {errors.incomeTaxRateNonFiler &&
                touched.incomeTaxRateNonFiler ? (
                  <div className={`${styles.label} ${styles.errorFont}`}>
                    {errors.incomeTaxRateNonFiler}
                  </div>
                ) : null}
              </div>
              <button
                className={`${styles.m10} ${styles.mb10}`}
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateEditForm;
