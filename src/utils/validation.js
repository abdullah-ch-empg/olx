import * as Yup from "yup";

export const alphanumeric = /^[a-z\d\-_\s]+$/i;
export const alphabets = /^[aA-zZ\s]+$/;
export const phoneNumber =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const createNewProjectSchema = Yup.object()
  .shape({
    name: Yup.string()
      .matches(alphanumeric, "Input must be alphanumeric")
      .required("Required"),
    shortName: Yup.string()
      .max(5, "Too Long!")
      .matches(alphabets, "Input must be alphabets")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string()
      .matches(phoneNumber, "Invalid Phone Number")
      .required("Required"),
    country: Yup.object().shape({
      id: Yup.string().required("Required"),
      // name: Yup.string().required("Required"),
    }),
    province: Yup.object().shape({
      id: Yup.string().required("Required"),
      // name: Yup.string().required("Required"),
    }),
    city: Yup.object().shape({
      id: Yup.string().required("Required"),
      // name: Yup.string().required("Required"),
    }),
    address: Yup.string().required("Required"),
    incomeTaxRateFiler: Yup.number()
      .typeError("Input must be a number")
      .required("Required"),
    incomeTaxRateNonFiler: Yup.number()
      .typeError("Input must be a number")
      .required("Required"),
  })
  .nullable();
