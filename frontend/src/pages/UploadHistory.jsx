import { useEffect, useState } from "react";
import API from "../api/api";

function UploadHistory() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {

    try {

      const response =
        await API.get(
          "/upload-history"
        );

      setHistory(
        response.data
      );

    } catch (error) {

      console.error(
        "History Error:",
        error
      );

    }

  };

  const deleteHistory =
    async (id) => {

      try {

        await API.delete(
          `/upload-history/${id}`
        );

        fetchHistory();

      } catch (error) {

        console.error(
          error
        );

      }

    };

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>
        Upload History
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse:
            "collapse"
        }}
      >

        <thead>

          <tr>

            <th>ID</th>

            <th>
              File Name
            </th>

            <th>
              Rows
            </th>

            <th>
              Columns
            </th>

            <th>
              Upload Time
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {history.map(
            (item) => (

              <tr
                key={item.id}
              >

                <td>
                  {item.id}
                </td>

                <td>
                  {item.filename}
                </td>

                <td>
                  {item.rows}
                </td>

                <td>
                  {item.columns}
                </td>

                <td>
                  {
                    item.upload_time
                  }
                </td>

                <td>

                  <button
                    onClick={() =>
                      deleteHistory(
                        item.id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

}

export default UploadHistory;