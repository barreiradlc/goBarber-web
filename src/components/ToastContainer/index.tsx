import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { useTransition } from 'react-spring/web';
import { ToastMessage, useToast } from '../../hooks/ToastContext';
import Toast from '../Toast';
import { Container } from './styles';

interface ToastContainerProps {
    messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const { removeToast } = useToast()

    const messagesWithTransition = useTransition(
        messages,
        (message :ToastMessage) => message.id,
        {
            from: { right: "-120%" , opacity: 0 },
            enter: { right: "0%" , opacity: 1 },
            leave: { right: "-120%" , opacity: 0 },

        }
    ) 

    return (
        <Container>

            {messagesWithTransition.map(({item, key, props}) => (
                <Toast 
                    key={key}
                    message={item}
                    style={props}
                />                
            ))}

        </Container>
    );
}

export default ToastContainer;