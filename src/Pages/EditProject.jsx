import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { CreateEditForm } from "../Components/Form";

const enumsMap = {
  name: "name",
  short_name: "shortName",
  email: "email",
  phone_number: "phoneNumber",
  country: "countryId",
  state: "provinceId",
  city: "cityId",
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

  // eslint-disable-next-line no-unused-vars
  const projectData = useMemo(() => {
    for (const key in location.state.projectDetails) {
      if (enumsMap[key]) {
        // console.log(
        //   "enumsMap[key] ====> key and value ",
        //   enumsMap[key],
        //   location.state.projectDetails[key]
        // );
        setProjectDetails((prevState) => ({
          ...prevState,
          [enumsMap[key]]: location.state.projectDetails[key]
            ? location.state.projectDetails[key]
            : "",
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(
    "PROJECT DETAILS INFO =======> ",
    projectDetails,
    location.state.projectId
  );

  return (
    <>
      {projectDetails ? (
        <CreateEditForm
          isEditProject={true}
          inputDataFields={projectDetails}
          projectId={location.state.projectId}
        />
      ) : (
        "Loading the form.........."
      )}
    </>
  );
};

export default EditProject;
