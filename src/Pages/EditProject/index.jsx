import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchProjectDataForEdit } from "../../API/project";
import CreateEditForm from "../../Components/Form/ProjectForm";

const enumsMap = {
  name: "name",
  short_name: "shortName",
  email: "email",
  phone_number: "phoneNumber",
  country: "country",
  state: "province",
  city: "city",
  address: "address",
  external_id: "externalId",
  overdue_charges: "overdueCharges",
  grace_period: "gracePeriod",
  transfer_fee: "transferFee",
  cancellation_fee: "cancellationFee",
  income_tax_rate_filer: "incomeTaxRateFiler",
  income_tax_rate_non_filer: "incomeTaxRateNonFiler",
};
const EditProject = () => {
  const location = useLocation();
  const [projectDetails, setProjectDetails] = useState(null);
  const [countries, setCountries] = useState(null);
  const apiCallRef = useRef(false);

  useEffect(() => {
    const getDataToEdit = async () => {
      apiCallRef.current = true;
      const {
        data: { project, countries },
      } = await fetchProjectDataForEdit(location.state.projectId);
      //   console.log("DATA TO EDIT ====> ", project, countries);
      for (const key in project) {
        if (enumsMap[key]) {
          // console.log(
          //   "enumsMap[key] ====> key and value ",
          //   enumsMap[key],
          //   location.state.projectDetails[key]
          // );
          setProjectDetails((prevState) => ({
            ...prevState,
            [enumsMap[key]]: project[key] ? project[key] : "",
          }));
        }
      }

      setCountries(countries);
    };
    if (!apiCallRef.current) {
      getDataToEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   console.log(
  //     "PROJECT DETAILS INFO =======> ",
  //     projectDetails,
  //     location.state.projectId
  //   );

  return (
    <>
      CreateEditForm
      {projectDetails && countries ? (
        <CreateEditForm
          isEditProject={true}
          editableInputFields={projectDetails}
          projectId={location.state.projectId}
          countriesEditData={countries}
        />
      ) : (
        "Loading the form.........."
      )}
    </>
  );
};

export default EditProject;
