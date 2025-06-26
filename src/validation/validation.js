import * as Yup from "yup";


export const contactForm = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Phone number is required"),
    comment: Yup.string().required("Comment is required"),
  });