import React, { Component } from 'react';
import styles from './styles/NotificationStyles';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const Notification = ({ title,text,visible,onClick,onClose })=> {

  console.log(visible);

  return (
      <div>
      <Modal
       open={visible}
       closeOnEscape={false}
       closeOnRootNodeClick={true}
       onClose={() => onClose()}
       size='small'
       style={styles.modal}
      >
				<Header style={styles.title}>{title}</Header>
				<Modal.Content style={styles.body}>{text}</Modal.Content>
        <Modal.Actions>
          <Button onClick={() => onClick()}>Click</Button>
        </Modal.Actions>
      </Modal>
      </div>
  );
};

export default Notification;
	