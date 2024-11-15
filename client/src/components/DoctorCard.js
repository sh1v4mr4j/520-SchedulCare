import React, { useState } from "react";
import { Avatar, Card, Switch, Button, Modal, Layout } from "antd";

const { Content } = Layout;

export const DoctorCheckAvailabilityModal = ({ isModalOpen, onClose }) => {
  const handleOk = () => {
    onClose();
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        title="Doctor's availability"
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button key="back" onClick={onClose}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Schedule Meeting
          </Button>,
        ]}
      />
    </>
  );
};

const DoctorCard = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cardData = [
    {
      id: 1,
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      title: "Card Title 1",
      description: [
        "This is the first description",
        "Additional details here.",
      ],
      actions: [
        <Button key="checkAvailability" onClick={showModal}>
          Check availability
        </Button>,
        <Button type="primary" key="scheduleMeeting">
          Schedule Meeting
        </Button>,
      ],
    },
    {
      id: 2,
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
      title: "Card Title 2",
      description: ["Description for the second card.", "Some more text."],
      actions: [
        <Button key="share">Check availability</Button>,
        <Button type="primary" key="share">
          Schedule Meeting
        </Button>,
      ],
    },
    {
      id: 3,
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
      title: "Card Title 3",
      description: ["Card three description.", "More content here."],
      actions: [
        <Button key="share">Check availability</Button>,
        <Button type="primary" key="share">
          Schedule Meeting
        </Button>,
      ],
    },
  ];

  return (
    <div
      className="cards"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "10px",
      }}
    >
      <Switch checked={!loading} onChange={(checked) => setLoading(!checked)} />
      {cardData.map((card) => (
        <Card
          key={card.id}
          loading={loading}
          actions={card.actions}
          style={{ minWidth: 300, margin: "auto"}}
        >
          <Card.Meta
            avatar={<Avatar src={card.avatar} />}
            title={card.title}
            description={
              <>
                {card.description.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </>
            }
          />
        </Card>
      ))}
      <DoctorCheckAvailabilityModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DoctorCard;
