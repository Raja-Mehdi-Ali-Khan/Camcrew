import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State / Province is required"),
  zip: Yup.string().required("ZIP / Postal code is required"),
  // username: Yup.string().required("Username is required"),
  // website: Yup.string().url("Invalid URL").required("Website is required"),
  // bio: Yup.string().required("Bio is required"),
});

const FormField = ({ label, id, type, placeholder }) => {
  return (
    <div className="col-span-full sm:col-span-3">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <Field
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
      />
      <ErrorMessage
        name={id}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

const TextAreaField = ({ label, id, placeholder }) => {
  return (
    <div className="col-span-full">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <Field
        as="textarea"
        id={id}
        name={id}
        placeholder={placeholder}
        className="w-full rounded-md focus:ring text-black focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
      />
      <ErrorMessage
        name={id}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

const ImageUpload = () => {
  return (
    <div className="col-span-full">
      <label htmlFor="photo" className="text-sm">
        Photo
      </label>
      <div className="flex items-center space-x-2">
        <img
          src="https://source.unsplash.com/30x30/?random"
          alt=""
          className="w-10 h-10 rounded-full dark:bg-gray-300"
        />
        <button
          type="button"
          className="px-4 py-2 border rounded-md dark:border-gray-800"
        >
          Change
        </button>
      </div>
    </div>
  );
};

const FormSection = ({ title, description, children }) => {
  return (
    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
      <div className="space-y-2 col-span-full lg:col-span-1">
        <p className="font-medium">{title}</p>
        <p className="text-xs">{description}</p>
      </div>
      <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
        {children}
      </div>
    </fieldset>
  );
};

const EditProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const { user, logout, isAuthenticated, isLoading } = useAuth0();
  console.log(user);
  console.log(user?.email);

  useEffect(() => {
    // Fetch user data from the backend
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://camapi-in57.onrender.com/api/users/email/${user?.email}`
      );
      const data = response.data;
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Send updated user data to the backend
      const response = await axios.put(
        `https://camapi-in57.onrender.com/api/users/email/${user?.email}`,
        values
      );
      if (response.status === 200) {
        // Data updated successfully
        console.log("User data updated successfully!");
      } else {
        // Error updating data
        console.error("Error updating user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="text-white">
      <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
        {userData ? (
          <Formik
            initialValues={
              userData || {
                firstname: "",
                lastname: "",
                email: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                username: "",
                website: "",
                bio: "",
              }
            }
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form
                noValidate=""
                className="container flex flex-col mx-auto space-y-12"
              >
                <FormSection
                  title="Personal Information"
                  description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!"
                >
                  <FormField
                    label="First name"
                    id="firstname"
                    type="text"
                    placeholder="First name"
                  />
                  <FormField
                    label="Last name"
                    id="lastname"
                    type="text"
                    placeholder="Last name"
                  />
                  <FormField
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                  <FormField
                    label="Address"
                    id="address"
                    type="text"
                    placeholder=""
                  />
                  <FormField
                    label="City"
                    id="city"
                    type="text"
                    placeholder=""
                  />
                  <FormField
                    label="State / Province"
                    id="state"
                    type="text"
                    placeholder=""
                  />
                  <FormField
                    label="ZIP / Postal"
                    id="zip"
                    type="text"
                    placeholder=""
                  />
                </FormSection>
                {/* <FormSection
                  title="Profile"
                  description="Adipisci fuga autem eum!"
                >
                  <FormField
                    label="Username"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                  <FormField
                    label="Website"
                    id="website"
                    type="text"
                    placeholder="https://"
                  />
                  <TextAreaField label="Bio" id="bio" placeholder="" />
                  <ImageUpload />
                </FormSection> */}
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
};

export default EditProfilePage;
