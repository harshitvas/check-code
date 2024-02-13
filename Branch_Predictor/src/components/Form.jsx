/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import MarksForm1 from "./MarksForm1";
import MarksForm2 from "./MarksForm2";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-input-2/lib/style.css";
import { ImSpinner } from "react-icons/im";
import { setUpRecaptcha } from "../assets/firebase";
import OtpInput from "./OtpInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentPhoneNumber: "1234 567 890",
    physicsMarks: "",
    mathsMarks: "",
    optionalMarks: "",
    bioMarks: "",
    medicalBranch: false,
  });
  const [phoneNumber, setPhoneNumbe] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(0);
  const [verifingUser, setVerfingUser] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState("");
  const [checkAgain, setCheckAgain] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [percentChance, setPercentChance] = useState({
    cs: 0,
    it: 0,
    others: 0,
  });

  useEffect(() => {
    if (userData !== 0) {
      if (userData > 90) {
        setPercentChance({ cs: 98, it: 100, others: 100 });
      } else if (userData > 80) {
        setPercentChance({ cs: 92, it: 97, others: 100 });
      } else if (userData >= 70) {
        setPercentChance({ cs: 80, it: 85, others: 100 });
      } else if (userData >= 60) {
        setPercentChance({ cs: 50, it: 80, others: 100 });
      } else if (userData >= 50) {
        setPercentChance({ cs: 0, it: 0, others: 90 });
      } else {
        setPercentChance({ cs: 0, it: 0, others: 0 });
      }
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = (e) => {
    window.location.reload();
  };

  const getOtp = async (e) => {
    e.preventDefault();
    if (formData.studentName === "" || formData.studentEmail === "") {
      toast.error("First fill above details", { autoClose: 2500 });
      return;
    }
    if (phoneNumber === "" || phoneNumber === undefined) {
      toast.error("Please enter a valid mobile number", { autoClose: 2500 });
      return;
    }
    setLoading(true);
    try {
      const response = await setUpRecaptcha(phoneNumber);
      setVerfingUser(true);
      setFormData({ ...formData, studentPhoneNumber: phoneNumber });
      setConfirmObj(response);
    } catch (error) {
      toast.error(error.message + ", try again by refreshing the page!", {
        autoClose: 2500,
      });
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "" || otp === null) {
      toast.error("Please enter the OTP", { autoClose: 2500 });
    }
    try {
      if (await confirmObj.confirm(otp)) setVerifiedUser(true);
    } catch (error) {
      setVerifiedUser(false);
      toast.error(error.message + ", try again by refreshing the page!", {
        autoClose: 2500,
      });
    }

    setLoading(false);
  };

  return (
    <div>
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
      {userData ? (
        <div className="mx-auto max-w-lg p-8 rounded-lg shadow-lg bg-blue-100">
          <h1 className="text-2xl font-bold mb-5">
            Expected Branch Percentage (%)
          </h1>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Branch
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Percent
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    CSE
                  </th>
                  <td className="px-6 py-4 text-center">{percentChance.cs}%</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium flex-wrap text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    IT
                  </th>
                  <td className="px-6 py-4 text-center">{percentChance.it}%</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium flex-wrap text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Civil
                  </th>
                  <td className="px-6 py-4 text-center">
                    {percentChance.others}%
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium flex-wrap text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    ECE
                  </th>
                  <td className="px-6 py-4 text-center">
                    {percentChance.others}%
                  </td>
                </tr>
                {formData.medicalBranch === "medical" && (
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      BI / BT
                    </th>
                    <td className="px-6 py-4 text-center">
                      {percentChance.others}%
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              onClick={() => {
                if (checkAgain) {
                  setUserData(0);
                  setCheckAgain(false);
                }
              }}
              disabled={!checkAgain}
              className={`mt-5 py-2 flex justify-center gap-3 items-center w-full bg-blue-500 rounded-md hover:bg-blue-600 ${
                !checkAgain ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {!checkAgain && (
                <ImSpinner size={20} className="mt-1 animate-spin" />
              )}
              <span>Check Again</span>
            </button>
            {!checkAgain && (
              <span className="text-sm text-red-500">
                Please wait while saving data...
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-lg p-8 rounded-lg shadow-lg bg-blue-100">
          <h2 className="text-3xl font-bold mb-6">
            Enter details to predict the branches
          </h2>

          <form className="space-y-6">
            <div className="flex flex-col gap-5">
              <div className="text-start">
                <label className="block mb-1 text-lg font-medium">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-0.5 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg"
                  required
                />
              </div>
              <div className="text-start">
                <label className="block mb-1 text-lg font-medium">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="studentEmail"
                  value={formData.studentEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-0.5 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg"
                  required
                />
              </div>
              <div className="flex flex-col text-start">
                <label className="block text-lg font-medium">
                  Phone Number<span className="text-red-500">*</span>
                </label>{" "}
                <div className="flex items-center">
                  <PhoneInput
                    value={phoneNumber}
                    defaultCountry="IN"
                    onChange={setPhoneNumbe}
                    className="text-xl flex-1"
                  />

                  <button
                    onClick={!verifiedUser ? getOtp : undefined}
                    disabled={verifiedUser}
                    className={`${
                      verifiedUser ? "cursor-not-allowed opacity-50" : ""
                    } 
                    ${
                      verifiedUser
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } ml-2 px-4 py-2 font-bold  flex gap-1 justify-center items-center text-white rounded-md focus:outline-none `}
                  >
                    {loading && (
                      <ImSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span>{verifiedUser ? "Verified" : "Verify"}</span>
                  </button>
                </div>
                {!verifiedUser && !verifingUser && (
                  <div className="flex justify-center">
                    <div id="recaptcha-container" className="my-2"></div>
                  </div>
                )}
                {!verifiedUser && verifingUser && (
                  <div className="space-y-4">
                    <div className="flex justify-center mt-2">
                      <OtpInput length={6} onOtpSubmit={setOtp} />
                    </div>
                    <div className="">
                      <button
                        onClick={verifyOtp}
                        className="w-full bg-green-500 hover:bg-green-600 duration-150 font-bold rounded-md py-1 text-white"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h1 className="font-bold text-lg">Select One branch</h1>
            <div className="flex justify-center items-center gap-5 text-lg">
              <select
                value={
                  formData.medicalBranch === true ? "medical" : "nonMedical"
                }
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    medicalBranch: e.target.value === "medical" ? true : false,
                  });
                }}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled defaultValue={true}>
                  Select One Branch
                </option>
                <option value={"medical"}>Medical</option>
                <option value={"nonMedical"}>Non-Medical</option>
              </select>
            </div>
          </form>

          <div>
            {formData.medicalBranch && (
              <MarksForm2
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                setUserData={setUserData}
                verifiedUser={verifiedUser}
                setCheckAgain={setCheckAgain}
              />
            )}
            {!formData.medicalBranch && (
              <MarksForm1
                formData={formData}
                setFormData={setFormData}
                setUserData={setUserData}
                verifiedUser={verifiedUser}
                setCheckAgain={setCheckAgain}
              />
            )}
          </div>
          <button
            onClick={handleReset}
            className="mt-5 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;
