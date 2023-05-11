import React from 'react';

export default function ChocolateCard({ chocolate }) {
  const { photo, name, country, category } = chocolate;
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}

        <tbody>
          {/* row 1 */}
          <tr>
            <th></th>
            <th></th>

            <th>Zemlak, Daniel and Leannon</th>
            <th>Purple</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
