import { Modal } from "antd";
import React from "react";

export default function NewComerModal({ showNewModal, setShowNewModal }) {
  return (
    <Modal
      visible={showNewModal}
      closable={false}
      footer={false}
      title="  onTheGoCars Welcomes You"
    >
      <div className="p-2">
        🎉🎉 Dear Customer, We are happy to see you here. <br />
        As your first time, we would like to give you a special offer. <br />
        On your first two ride you will get 30% discount. <br />
        <br />
        enjoy your ride 🚗🚙 <br />
        <br />
        - chaudhuree(CEO)

        {/*
         <div className="text-right mt-5">
           <button
             className="btn1"
             onClick={() => {
               setShowNewModal(false);
             }}
           >
             CLOSE
           </button> 
           </div>
      */}
      </div>
    </Modal >
  );
}
