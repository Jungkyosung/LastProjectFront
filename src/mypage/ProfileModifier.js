import { useState } from "react";
import Modal from "../modal/Modal";



const ProfileModifier = (props) => {

  const modal = props.modal1;
  const setModal = props.setModal1;


  return (
    <Modal modal={modal} setModal={setModal}>
      <p>프로필 변경 관련 정보</p>
    </Modal>
  )
}

export default ProfileModifier;