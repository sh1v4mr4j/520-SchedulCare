import { useState } from "react";
import { Button, Modal, message } from "antd";
import LocationSearch from "./LocationSearch";
import { useUserContext } from "../../context/UserContext";
import {
  updatePatientLocation,
  updateDoctorLocation,
} from "../../api/services/locationService";

const AddressSelector = () => {
  const { user } = useUserContext();
  const [messageApi, contextHolder] = message.useMessage();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const locationUpdateError = () => {
    messageApi.error("Error updating location", 2.5);
  };

  const handleLocationUpdate = () => {
    setConfirmLoading(true);
    if (user.type === "patient") {
      updatePatientLocation(user.email, location)
        .then((response) => {
          messageApi.success("Location updated", 2.5);
          setConfirmLoading(false);
          setOpen(false);
        })
        .catch((error) => {
          locationUpdateError();
          setConfirmLoading(false);
          setOpen(true);
        });
    } else {
      updateDoctorLocation(user.email, location)
        .then((response) => {
          messageApi.success("Location updated", 2.5);
          setConfirmLoading(false);
          setOpen(false);
        })
        .catch((error) => {
          locationUpdateError();
          setConfirmLoading(false);
          setOpen(true);
        });
    }
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [location, setLocation] = useState();

  const handleLocationChange = (location) => {
    setLocation(location);
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Click to set/update your address
      </Button>
      <Modal
        title="Select your address"
        open={open}
        onOk={handleLocationUpdate}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width="auto"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleLocationUpdate}
            disabled={!location}
          >
            Update my address
          </Button>,
        ]}
      >
        <div style={{ margin: "1em" }}>
          <LocationSearch customHandleLocation={handleLocationChange} />
        </div>
      </Modal>
    </>
  );
};

export default AddressSelector;
