import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UpdateChocolate() {
  const chocolate = useLoaderData();
  const [category, setCategory] = useState('');

  // const { photo, name, country, category } = chocolate;

  const handleUpdateChocolate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const country = form.country.value;
    const photo = form.photo.value;
    // console.log(selects);
    const updatedChocolate = { photo, name, country, category };
    console.log(updatedChocolate);

    // send data to the server
    fetch(`http://localhost:5000/chocolates/${chocolate._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updatedChocolate),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Data Updated Successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        }
      });
  };

  const handleChangeSelect = (event) => {
    const selectValue = event.target.value;
    setCategory(selectValue);
    // console.log(selectValue);
  };
  return (
    <div className="bg-[#1414140d] p-10 md:px-48">
      <div className="flex justify-center mx-2 my-10">
        <h1 className="text-5xl py-4 font-extrabold rounded-lg  w-[50rem] text-center text-white bg-gradient-to-r via-amber-400 from-amber-900 to-amber-900">
          Chocolate Management System
        </h1>
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Update Chocolates: {chocolate.name}
        </h2>
        <p className="mt-2 text-[#141414]">
          Use the below form to create a new product
        </p>
      </div>
      <form onSubmit={handleUpdateChocolate}>
        <div className="">
          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="name"
                defaultValue={chocolate.name}
                placeholder="Hot Pink Chocolate"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text">Country</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="country"
                defaultValue={chocolate.country}
                placeholder="Enter Country Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text">Phot URL</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="photo"
                defaultValue={chocolate.photo}
                placeholder="Photo URL"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="w-full mb-8">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="select"
              onChange={handleChangeSelect}
              className="select w-full"
            >
              <option disabled>Choose the plan that’s right for you</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        <input
          className="btn bg-amber-900 hover:bg-amber-800 btn-block"
          type="submit"
          value="Save"
        />
      </form>
    </div>
  );
}
