import React, {useEffect, useState} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/auxiliary';

const withAxiosErrorHandler = (WrappedComponent, axios) => {
    return (props) =>  {
        const [error, setError] = useState(null);

        const errorConfirmedHandler = () => {
            setError(null)
        }

        useEffect(() => {
            console.log('component did mount')
            let responseInterceptor = axios.interceptors.response.use(
                res => res,
                error => {
                    setError(error)
                }
            );
            return () => {
                console.log('component did UNmount')
                axios.interceptors.response.eject(responseInterceptor)
            }
        }, []);

        return (
            <Auxiliary>
                {error
                && <Modal
                    modalClosed={errorConfirmedHandler}
                    show
                >
                    {error.message}
                </Modal>}
                <WrappedComponent {...props} />
            </Auxiliary>
        )
    };
};

export default withAxiosErrorHandler;