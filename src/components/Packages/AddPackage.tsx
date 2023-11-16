import React, { useState, ChangeEvent } from "react";
import PackageService from "../../services/PackageService";
import { IPackageData } from "../../types/Package";

const AddPackage: React.FC = () => {
  const initialState: IPackageData = {
    from_name: "",
    from_address: "",
    to_name: "",
    to_address: "",
    description: "",
  };
  const [_package, setPackage] = useState<IPackageData>(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPackage({ ..._package, [name]: value });
  };

  const setActivePackage = () => {
    PackageService.create({ ..._package })
      .then((response: any) => {
        const createdPackage = response?.data?.data;
        setPackage(createdPackage);
        setSubmitted(true);
        console.log(createdPackage);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newPackage = () => {
    setPackage(initialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPackage}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="from_name">From</label>
            <input
              type="text"
              className="form-control"
              id="from_name"
              required
              value={_package.from_name}
              onChange={handleInputChange}
              name="from_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="from_address">From address</label>
            <input
              type="text"
              className="form-control"
              id="from_address"
              required
              value={_package.from_address}
              onChange={handleInputChange}
              name="from_address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="to_name">To</label>
            <input
              type="text"
              className="form-control"
              id="to_name"
              required
              value={_package.to_name}
              onChange={handleInputChange}
              name="to_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="to_address">To address</label>
            <input
              type="text"
              className="form-control"
              id="to_address"
              required
              value={_package.to_address}
              onChange={handleInputChange}
              name="to_address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={_package.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={setActivePackage} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPackage;
