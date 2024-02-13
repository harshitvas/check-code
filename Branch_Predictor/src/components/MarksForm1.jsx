/* eslint-disable react/prop-types */
import { useState } from "react";
import StudentService from "../services/StudentService";
import { ToastContainer, toast } from "react-toastify";
// import EmailService from "../services/EmailService";

function MarksForm1(props) {
  const [chemistry, setChemistry] = useState("");
  const [it, setIt] = useState("");
  const [english, setEnglish] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.formData.physicsMarks === "") {
      toast.error("Fill the marks of physics", { autoClose: 2500 });
      return;
    } else if (props.formData.mathsMarks === "") {
      toast.error("Fill the marks of maths", { autoClose: 2500 });
      return;
    } else if (chemistry === "") {
      toast.error("Fill the marks of chemistry", { autoClose: 2500 });
      return;
    } else if (english === "") {
      toast.error("Fill the marks of english", { autoClose: 2500 });
      return;
    }

    props.formData.optionalMarks = Math.max(
      Number(chemistry),
      Number(it),
      Number(english)
    );
    props.formData.bioMarks = 0;
    const total =
      Number(props.formData.physicsMarks) +
      Number(props.formData.optionalMarks) +
      Number(props.formData.mathsMarks);
    props.setUserData(total / 3);
    // console.log(props.formData);
    StudentService.addStudentDetails(props.formData)
      .then((res) => {
        // console.log(res);
        props.setCheckAgain(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <h2 className="text-2xl font-bold mb-4">Enter the marks of 12th std</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="physics" className="flex font-medium flex-start">
            Physics<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="physicsMarks"
            id="physics"
            value={props.formData.physicsMarks}
            onKeyPress={(e) => {
              const regex = /^(?:\d{0,3}(?:\.\d{0,2})?)$/;
              const currentValue = e.target.value;
              const nextValue = currentValue + e.key;
              // Allow only numbers and maximum of one decimal point
              if (!regex.test(nextValue) || parseFloat(nextValue) > 100) {
                e.preventDefault();
              }
            }}
            onChange={(event) => {
              const { name, value } = event.target;
              props.setFormData({
                ...props.formData,
                [name]: value,
              });
            }}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="maths" className="flex font-medium flex-start">
            Mathematics<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="maths"
            name="mathsMarks"
            value={props.formData.mathsMarks}
            onChange={(event) => {
              const { name, value } = event.target;
              if (
                value === "" ||
                (parseFloat(value) <= 100 && parseFloat(value) >= 0)
              ) {
                props.setFormData({
                  ...props.formData,
                  [name]: value,
                });
              }
            }}
            onKeyPress={(e) => {
              const regex = /^(?:\d{0,3}(?:\.\d{0,2})?)$/;
              const currentValue = e.target.value;
              const nextValue = currentValue + e.key;
              if (!regex.test(nextValue) || parseFloat(nextValue) > 100) {
                e.preventDefault();
              }
            }}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="maths" className="flex font-medium flex-start">
            Information Technology
          </label>
          <input
            type="tel"
            id="it"
            name="it"
            value={it}
            onChange={(event) => {
              const { value } = event.target;
              if (
                value === "" ||
                (parseFloat(value) <= 100 && parseFloat(value) >= 0)
              ) {
                setIt(event.target.value);
              }
            }}
            onKeyPress={(e) => {
              const regex = /^(?:\d{0,3}(?:\.\d{0,2})?)$/;
              const currentValue = e.target.value;
              const nextValue = currentValue + e.key;
              if (!regex.test(nextValue) || parseFloat(nextValue) > 100) {
                e.preventDefault();
              }
            }}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="maths" className="flex font-medium flex-start">
            Chemistry<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="chemistry"
            name="chemistry"
            value={chemistry}
            onChange={(event) => {
              const { value } = event.target;
              if (
                value === "" ||
                (parseFloat(value) <= 100 && parseFloat(value) >= 0)
              ) {
                setChemistry(event.target.value);
              }
            }}
            onKeyPress={(e) => {
              const regex = /^(?:\d{0,3}(?:\.\d{0,2})?)$/;
              const currentValue = e.target.value;
              const nextValue = currentValue + e.key;
              if (!regex.test(nextValue) || parseFloat(nextValue) > 100) {
                e.preventDefault();
              }
            }}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="maths" className="flex font-medium flex-start">
            English<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="english"
            name="englishMarks"
            value={english}
            onChange={(event) => {
              const { value } = event.target;
              if (
                value === "" ||
                (parseFloat(value) <= 100 && parseFloat(value) >= 0)
              ) {
                setEnglish(event.target.value);
              }
            }}
            onKeyPress={(e) => {
              const regex = /^(?:\d{0,3}(?:\.\d{0,2})?)$/;
              const currentValue = e.target.value;
              const nextValue = currentValue + e.key;
              if (!regex.test(nextValue) || parseFloat(nextValue) > 100) {
                e.preventDefault();
              }
            }}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ${
            props.verifiedUser ? "" : "cursor-not-allowed opacity-50"
          }`}
          onClick={props.verifiedUser ? handleSubmit : undefined}
          disabled={!props.verifiedUser}
        >
          {props.verifiedUser ? "Submit" : "First verify your mobile number"}
        </button>
      </form>
    </div>
  );
}

export default MarksForm1;
