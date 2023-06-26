import React, { useEffect, useRef } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalComp = ({ setName }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;
  useEffect(() => {
    openModal();
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>Enter session name</div>
        <form onSubmit={closeModal}>
          <input onChange={(e) => setName(e)} />
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
        <button className="btn btn-danger" onClick={closeModal}>
          Don't care
        </button>
      </Modal>
    </div>
  );
};

export default ModalComp;
