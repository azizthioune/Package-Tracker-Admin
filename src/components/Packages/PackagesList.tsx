import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import PackageService from "../../services/PackageService";
import { IPackageData } from "../../types/Package";

const PackagesList: React.FC = () => {
  let navigate = useNavigate();
  const [packages, setPackages] = useState<Array<IPackageData>>([]);
  const [currentPackage, setCurrentPackage] = useState<IPackageData | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrievePackages();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePackages = () => {
    PackageService.getAll()
      .then((response: any) => {
        setPackages(response.data.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  //   const refreshList = () => {
  //     retrievePackages();
  //     setCurrentPackage(null);
  //     setCurrentIndex(-1);
  //   };

  const setActivePackage = (packagee: IPackageData, index: number) => {
    setCurrentPackage(packagee);
    setCurrentIndex(index);
  };

  //   const removeAllPackages = () => {
  //     PackageService.removeAll()
  //       .then((response: any) => {
  //         console.log(response.data);
  //         refreshList();
  //       })
  //       .catch((e: Error) => {
  //         console.log(e);
  //       });
  //   };

  const findByTitle = () => {
    PackageService.findByID(searchTitle)
      .then((response: any) => {
        setPackages([response.data.data]);
        setCurrentPackage(response.data.data);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by UID"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Packages List</h4>

        <ul className="list-group">
          {packages &&
            packages?.map((selectedPackage, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePackage(selectedPackage, index)}
                key={index}
              >
                {selectedPackage.package_uid}
              </li>
            ))}
        </ul>

        <button
          className="m-4 btn-sm btn btn-secondary"
          onClick={() => navigate("/add-package")}
        >
          Add new Package
        </button>
      </div>
      <div className="col-md-6">
        {currentPackage ? (
          <div>
            <h4>Package</h4>
            <div>
              <label>
                <strong>UID:</strong>
              </label>{" "}
              {currentPackage.package_uid}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentPackage.description}
            </div>
            <div>
              <label>
                <strong>From:</strong>
              </label>{" "}
              {currentPackage.from_name}
            </div>
            <div>
              <label>
                <strong>From address:</strong>
              </label>{" "}
              {currentPackage.from_address}
            </div>
            <div>
              <label>
                <strong>To:</strong>
              </label>{" "}
              {currentPackage?.to_name || "N/A"}
            </div>
            <div>
              <label>
                <strong>To Address:</strong>
              </label>{" "}
              {currentPackage.to_address || "N/A"}
            </div>
            <div>
              <label>
                <strong>Created at:</strong>
              </label>{" "}
              {`${currentPackage?.created_at?.slice(
                0,
                10
              )} ${currentPackage?.created_at?.slice(11, 16)}`}
            </div>

            {/* <Link
              to={"/Packages/" + currentPackage._id}
              className="badge badge-warning"
            >
              Edit
            </Link> */}
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Package...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesList;
