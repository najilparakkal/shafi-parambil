"use client";

import React from "react";
import { useFormik } from "formik";
import { contactForm } from "../validation/validation";
import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";

export default function Footer() {
  // Contact component logic
  const latitude = 10.7569241;
  const longitude = 76.660938;
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=16&output=embed`;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      comment: "",
    },
    validationSchema: contactForm,
    onSubmit: (values, { resetForm }) => {
      const templateParams = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.comment,
      };

      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
          templateParams,
          process.env.NEXT_PUBLIC_EMAIL_PUBLIC_ID
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            alert("Message sent successfully!");
            resetForm();
          },
          (error) => {
            console.error("FAILED...", error);
            alert("Failed to send message.");
          }
        );
    },
  });
  return (
    <div id="contactus" className="h-auto ">
      <div className=" bg-white md:py-10 py-5">
        <div className="w-full font-semibold text-4xl montserrat text-black flex justify-center items-center">
          Contact Me
        </div>
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="">
              <div className="h-64 rounded-lg overflow-hidden">
                <iframe
                  src={googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  // title="Kollummakkeyezze events location"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="h-full">
            <form
              onSubmit={formik.handleSubmit}
              className=" h-full flex flex-col gap-2"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="w-full md:w-1/2">
                    <TextField
                      fullWidth
                      size="small"
                      id="name"
                      name="name"
                      label="Name"
                      variant="outlined"
                      value={formik.values.name}
                      onChange={(e) => {
                        formik.handleChange(e);
                        if (formik.errors.name) {
                          formik.setErrors({
                            ...formik.errors,
                            name: undefined,
                          });
                        }
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      sx={{
                        "& .MuiInputBase-input": { color: "black" },
                        "& .MuiInputLabel-root": {
                          color: "black",
                          fontSize: "0.70rem",
                        },
                        "& .Mui-focused": { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black" },
                          height: "40px",
                        },
                      }}
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <TextField
                      fullWidth
                      size="small"
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={(e) => {
                        formik.handleChange(e);
                        if (formik.errors.email) {
                          formik.setErrors({
                            ...formik.errors,
                            email: undefined,
                          });
                        }
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      sx={{
                        "& .MuiInputBase-input": { color: "black" },
                        "& .MuiInputLabel-root": {
                          color: "black",
                          fontSize: "0.70rem",
                        },
                        "& .Mui-focused": { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black" },
                          height: "40px",
                        },
                      }}
                    />
                  </div>
                </div>
                <TextField
                  fullWidth
                  size="small"
                  id="phone"
                  name="phone"
                  label="Phone number"
                  variant="outlined"
                  type="tel"
                  value={formik.values.phone}
                  onChange={(e) => {
                    formik.handleChange(e);
                    if (formik.errors.phone) {
                      formik.setErrors({
                        ...formik.errors,
                        phone: undefined,
                      });
                    }
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  sx={{
                    "& .MuiInputBase-input": { color: "black" },
                    "& .MuiInputLabel-root": {
                      color: "black",
                      fontSize: "0.60rem",
                    },
                    "& .Mui-focused": { color: "black" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "black" },
                      height: "40px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  id="comment"
                  name="comment"
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formik.values.comment}
                  onChange={(e) => {
                    formik.handleChange(e);
                    if (formik.errors.comment) {
                      formik.setErrors({
                        ...formik.errors,
                        comment: undefined,
                      });
                    }
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.comment && Boolean(formik.errors.comment)
                  }
                  sx={{
                    "& .MuiInputBase-input": { color: "black" },
                    "& .MuiInputLabel-root": {
                      color:
                        formik.errors.comment && formik.touched.comment
                          ? "red"
                          : "black",
                      fontSize: "0.60rem",
                    },
                    "& .Mui-focused": { color: "black" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "black" },
                      minHeight: "80px",
                    },
                  }}
                />
                <button className="bg-[#624384] px-8 py-2 text-white text-xs flex justify-center items-center rounded-md mt-2">
                  SEND
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full bg-black md:px-16 px-2 py-3 flex justify-between items-center">
        <Link href="/" prefetch>
          <Image
            src="/logo/Cream Red Simple Bold Modern Creative Studio Logo 1.png"
            alt="Shafi parambil Logo"
            width={150}
            height={50}
            className="md:h-16 h-8 md:w-auto w-24"
            priority
            loading="eager"
          />
        </Link>
        <Link
          href="www.fedgix.com"
          className="text-gray-500 text-center md:text-xs text-[6px]"
        >
          Powered by Fedgix Technologies
        </Link>
      </div>
    </div>
  );
}
