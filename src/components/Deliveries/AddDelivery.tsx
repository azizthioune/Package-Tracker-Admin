import React, { useState, useEffect, useMemo } from "react";
import DeliveryService from "../../services/DeliveryService";
import { IPackageData } from "../../types/Package";
import PackageService from "../../services/PackageService";
import Select from "react-select";

const AddDelivery: React.FC = () => {
  const initialState = {
    package: "",
  };
  const [delivery, setDelivery] = useState(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [packages, setPackages] = useState<Array<IPackageData>>([]);

  useEffect(() => {
    retrievePackages();
  }, []);

  const options = useMemo(() => {
    let optionsTab: any[] = [];
    packages?.forEach((packagee) => {
      optionsTab.push({
        value: packagee?._id,
        label: packagee?.package_uid,
      });
    });
    return optionsTab;
  }, [packages]);

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

  const setActiveDelivery = () => {
    DeliveryService.create(delivery)
      .then((response: any) => {
        const createdDelivery = response?.data?.data;
        setDelivery(createdDelivery);
        setSubmitted(true);
        console.log(createdDelivery);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newDelivery = () => {
    setDelivery(initialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newDelivery}>
            Add
          </button>
        </div>
      ) : (
        <div className="form-group">
          <div style={{ width: "100%", marginBottom: 20 }}>
            <Select
              placeholder="Select a package"
              options={options}
              onChange={(el) => setDelivery({ package: el.value })}
            />
          </div>

          <button onClick={setActiveDelivery} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDelivery;
