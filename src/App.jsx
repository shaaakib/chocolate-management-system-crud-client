import { Link, useLoaderData } from 'react-router-dom';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

function App() {
  const chocolates = useLoaderData();

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/chocolates/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your Chocolate has been deleted.',
                'success'
              );
            }
          });
      }
    });
  };
  return (
    <>
      <div className="flex justify-center mx-2 my-10">
        <h1 className="text-5xl py-4 font-extrabold rounded-lg  w-[50rem] text-center text-white bg-gradient-to-r via-amber-400 from-amber-900 to-amber-900">
          Chocolate Management System
        </h1>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Country/Factory</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chocolates.map((chocolates) => (
              <tr key={chocolates._id}>
                <td>
                  <img className="w-10" src={chocolates.photo} alt="" />
                </td>
                <td>{chocolates.name}</td>
                <td>{chocolates.country}</td>
                <td>{chocolates.category}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <Link
                      className="bg-red-100 p-2 px-3 rounded-lg "
                      to={`updateChocolate/${chocolates._id}`}
                    >
                      <button className="">
                        <FaPen />
                      </button>
                    </Link>
                    <Link className="bg-red-100 py-2 px-3 rounded-lg ">
                      <button onClick={() => handleDelete(chocolates._id)}>
                        <FaRegTrashAlt />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
