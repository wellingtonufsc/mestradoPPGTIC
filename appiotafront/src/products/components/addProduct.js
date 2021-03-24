import React, { useContext } from 'react';
import { Formik } from 'formik';
import { AuthContext } from '../../shared/context/auth-context';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './addProduct.scss';

const AddProduct = props => {

    const auth = useContext(AuthContext);

    const submitHandler = async data => {

        const headers = {
            'Content-Type': 'application/json'
        }

        data['userId'] = auth.userId;

        api.post('/products/selectProduct/', data, headers)
            .then((response) => {
                props.reset();
                toast(response.data.message, {type: 'dark'});
            })
            .catch((error) => {
                console.log(error);
                toast(error.response.data.message, {type:'error'})
            });
    }

    return(
        <Formik
            initialValues={{ deviceID: '', productName: '' }}
            validade={values => {
                const errors = {};

                if (!values.deviceID) {
                    errors.deviceID = 'Campo obrigatório!';
                }

                if (!values.productName) {
                    errors.productName = 'Campo obrigatório!';
                }

                if (!values.destination) {
                    errors.destination = 'Campo obrigatório!';
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    submitHandler(values);
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <div className="form-container">
                    <header>Cadastrar uma Viagem</header>
                    <form onSubmit={handleSubmit} >
                        <div className={'field ' + (touched.deviceID && errors.deviceID ? 'input-error' : '')}>
                            <input type="text" name="deviceID" id="deviceID" required placeholder="ID da placa" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.deviceID} />
                        </div>
                        <div className={'field ' + (touched.productName && errors.productName ? 'input-error' : '')} style={{marginBottom: "20px"}}>
                            <input type="text" name="productName" id="productName" required placeholder="Nome do Produto" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.productName} />
                        </div>
                        <div className={'field ' + (touched.destination && errors.destination ? 'input-error' : '')} style={{marginBottom: "20px"}}>
                            <input type="text" name="destination" id="destination" required placeholder="Trajeto" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.destination} />
                        </div>
                        <div className="field space">
                            <input type="submit" value="Adicionar" disabled={isSubmitting}/>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default AddProduct;