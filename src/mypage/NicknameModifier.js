import Modal from "../modal/Modal"

const NicknameModifier = (props)=>{

    const modal = props.modal2;
    const setModal = props.setModal2;

    return (
        <Modal modal={modal} setModal={setModal}>
            <p>닉네임 변경 관련 정보</p>

        </Modal>
    )
};
export default NicknameModifier;