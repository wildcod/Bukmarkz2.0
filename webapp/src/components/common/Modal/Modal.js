import React, {useEffect, useMemo} from 'react';
import ReactModal from 'react-modal';
import style from './Modal.module.scss'
import closeIconSrc from '../../../assets/img/close.svg'

ReactModal.setAppElement('#root');

const Modal = ({
openModal,
onClose,
children,
hideClose = false,
modalStyle
}) => {
    function closeModal() {
        onClose && onClose()
    }

    const customStyles = useMemo(() => {
        return {
            content: {
                top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    ...modalStyle
            },
        };
    }, [modalStyle])

    useEffect(() => {
        if(openModal){
            document.body.classList.add('body-overflow');
        }
        return () => {
            document.body.classList.remove('body-overflow');
        }
    }, [openModal])

    return openModal ?
                <ReactModal
                    isOpen={openModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                  <div className={style.innerContainer}>
                      {
                          !hideClose ?
                              <div className={style.close} onClick={onClose}>
                                  <img
                                      src={closeIconSrc}
                                      loading="lazy"
                                      width={40}
                                      alt={'close'}
                                      height={40}
                                  />
                              </div> : null
                      }
                      {children}
                  </div>
                </ReactModal> : null
};

export default Modal;
