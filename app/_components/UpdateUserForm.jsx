"use client";

import { useFormStatus } from "react-dom";
import { updateAccount } from "../_lib/actions";

function UpdateUserForm({ account }) {
  const {
    firstName,
    lastName,
    emailId,
    description,
    gender,
    DOB,
    avatar,
    languages,
    phoneNo,
  } = account;

  return (
    <>
      <h1 className="text-4xl font-semibold px-4 sm:px-6">Edit Profile</h1>
      <div className="bg-base-200 p-6 sm:p-10 m-4 sm:m-10 rounded-xl shadow-md">
        <form className="flex flex-col gap-8" action={updateAccount}>
          <div className="flex flex-col">
            <label>Email ID:</label>
            <input
              type="email"
              value={emailId}
              className="input input-accent bg-base-100 cursor-not-allowed w-full max-w-md"
              disabled
              name="emailId"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col flex-1">
              <label>First Name:</label>
              <input
                type="text"
                className="input input-accent w-full"
                defaultValue={firstName}
                name="firstName"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label>Last Name:</label>
              <input
                type="text"
                className="input input-accent w-full"
                defaultValue={lastName}
                name="lastName"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col flex-1">
              <label>Gender:</label>
              <select
                defaultValue={gender?.toLowerCase() || ""}
                className="select select-accent w-full"
                name="gender"
              >
                <option disabled value="">
                  Please select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label>Phone Number:</label>
              <input
                type="tel"
                className="input input-accent w-full"
                defaultValue={phoneNo}
                placeholder="+91"
                name="phoneNo"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col flex-1">
              <label>Date of Birth:</label>
              <input
                type="date"
                className="input input-accent w-full"
                defaultValue={DOB}
                name="DOB"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label>Languages Spoken:</label>
              <input
                type="text"
                className="input input-accent w-full"
                defaultValue={languages || ""}
                placeholder="Comma separated"
                name="languages"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label>Tell us about yourself:</label>
            <textarea
              className="textarea textarea-accent w-full min-h-[120px]"
              defaultValue={description}
              name="description"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="font-medium">Avatar:</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-accent w-full max-w-md"
              name="avatar"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <button className="btn btn-neutral" type="reset">
              Reset
            </button>
            <Button />
          </div>
        </form>
      </div>
    </>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-accent" type="submit" disabled={pending}>
      {pending ? "Updating..." : "Update Profile"}
    </button>
  );
}

export default UpdateUserForm;
