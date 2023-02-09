import React from "react";
import { createNewProjectInitialValues } from "../utils/formValues";

import { CreateEditForm } from "../Components/Form";

const CreateProject = () => {
  return (
    <CreateEditForm
      isEditProject={false}
      inputDataFields={createNewProjectInitialValues}
    />
  );
};

export default CreateProject;
