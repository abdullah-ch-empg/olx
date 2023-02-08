import * as Yup from "yup";

export const alphanumeric = /^[a-z0-9]+$/i;
export const alphabets = /^[aA-zZ\s]+$/;
export const phoneNumber =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const createNewProjectSchema = Yup.object().shape({
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
  countryId: Yup.string().required("Required"),
  provinceId: Yup.string().required("Required"),
  cityId: Yup.string().required("Required"),
  address: Yup.string().required("Address is Required"),
  incomeTaxRateFiler: Yup.number()
    .typeError("Input must be a number")
    .required("Required"),
  incomeTaxRateNonFiler: Yup.number()
    .typeError("Input must be a number")
    .required("Required"),
});
