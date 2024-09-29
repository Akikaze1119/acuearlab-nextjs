'use client';
import { Modal, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const IndexPageModal = ({ open, setOpen }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOk = () => {
    setLoading(true);
    router.push('/game');
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Spin spinning={loading} fullscreen />
      <Modal title='Caution!' open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>You won't be able to save your game results without signing in.</p>
        <p>Are you sure you want to continue?</p>
      </Modal>
    </>
  );
};

export default IndexPageModal;
