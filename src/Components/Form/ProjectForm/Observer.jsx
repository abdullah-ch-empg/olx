import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { fetchCities, fetchProvinces } from "../../../API/project";
import { useCallback } from "react";

const FormObserver = ({
  isEditProject,
  handleProvinceCity,
  editableInputFields,
}) => {
  const apiCallRef = useRef(false);
  const provinceSelectRef = useRef(false);

  const { values, setValues, setFieldValue } = useFormikContext();

  const allowCitySelectionRef = useRef(!isEditProject);

  const cityReset = useCallback(() => {
    console.log("CITY ---- RESET -----> ", values.province.id);

    if (provinceSelectRef.current) {
      if (allowCitySelectionRef.current && values.province.id !== "") {
        setFieldValue("city.id", "", false);
      } else {
        allowCitySelectionRef.current = true;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.province.id]);

  useEffect(() => {
    cityReset();
    return () => {
      if (isEditProject) {
        provinceSelectRef.current = !provinceSelectRef.current;
        console.log("CITY ---- RESET -----> CLEAN UP");
      } else {
        provinceSelectRef.current = true;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityReset]);

  useEffect(() => {
    // if country is changed,
    console.log("formObserver country id ===> ", values.country);
    if (values.country.id !== "") {
      console.log(values);
      handleCountryChange(values.country?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.country.id]);

  useEffect(() => {
    const getDataToEdit = async () => {
      apiCallRef.current = true;

      console.log("editableInputFields=========>", editableInputFields);

      setValues(editableInputFields, true);
    };
    if (isEditProject && !apiCallRef.current) {
      getDataToEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountryChange = async (country) => {
    const responses = await Promise.allSettled([
      fetchProvinces(country),
      fetchCities(country),
    ]);

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

export default FormObserver;
