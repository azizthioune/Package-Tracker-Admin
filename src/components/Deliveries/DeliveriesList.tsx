import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IDeliveryData } from "../../types/Delivery";
import DeliveryService from "../../services/DeliveryService";

const DeliveriesList: React.FC = () => {
  let navigate = useNavigate();
  const [deliveries, setDeliveries] = useState<Array<IDeliveryData>>([]);
  const [currentDelivery, setCurrentDelivery] = useState<IDeliveryData | null>(
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
    DeliveryService.getAll()
      .then((response: any) => {
        setDeliveries(response.data.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const setActivePackage = (delivery: IDeliveryData, index: number) => {
    setCurrentDelivery(delivery);
    setCurrentIndex(index);
  };

  const findById = () => {
    DeliveryService.findByID(searchTitle)
      .then((response: any) => {
        setDeliveries([response.data.data]);
        setCurrentDelivery(response.data.data);
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
              onClick={findById}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Deliveries List</h4>

        <ul className="list-group">
          {deliveries &&
            deliveries?.map((delivery, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePackage(delivery, index)}
                key={index}
              >
                {delivery.delivery_uid}
              </li>
            ))}
        </ul>

        <button
          className="m-4 btn-sm btn btn-secondary"
          onClick={() => navigate("/add-delivery")}
        >
          Add new Delivery
        </button>
      </div>
      <div className="col-md-6">
        {currentDelivery ? (
          <div>
            <h4>Package</h4>
            <div>
              <label>
                <strong>UID:</strong>
              </label>{" "}
              {currentDelivery.delivery_uid}
            </div>
            <div>
              <label>
                <strong>Package UID:</strong>
              </label>{" "}
              {currentDelivery.package?.package_uid}
            </div>

            <div>
              <label>
                <strong>Created at:</strong>
              </label>{" "}
              {`${currentDelivery?.created_at?.slice(
                0,
                10
              )} ${currentDelivery?.created_at?.slice(11, 16)}`}
            </div>

            <div className="badge badge-warning">{currentDelivery?.status}</div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Delivery...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveriesList;
