import { ReactNode, useState } from "react";
import { Modal } from '../components/modal';

export function useModal() {
  const [modal, setModal] = useState<ReactNode | undefined>();
  function closeModal() {
    document.body.style.overflow = "auto";
    setModal(undefined)
  }

  function triggerModal(title: string, modal: ReactNode) {
    const completeModal = <Modal onOutsideClick={closeModal} title={title} >
      {modal}
    </Modal>
    document.body.style.overflow = "hidden";
    setModal(completeModal);
  }

  return { modal, triggerModal, closeModal }
}
