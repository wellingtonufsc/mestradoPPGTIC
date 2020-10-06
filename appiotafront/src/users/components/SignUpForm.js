import React from 'react';
import { Formik } from 'formik';
import { CSSTransition } from 'react-transition-group';
import api from '../../services/api';

const SignUpForm = props => {

    const submitHandler = async userData => {
        const headers = {
            'Content-Type': 'application/json'
        }

        const response = await api.post('/users/add', userData, headers);

        const { status, message } = response.data;

        if (status == 200) {
            props.switchMode();
            props.signUpSuccess(true);
        } else {
            props.signUpSuccess(false, message);
        }
    }

    return(
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Campo obrigatório!';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'E-mail inválido';
                }
                
                if (!values.password) {
                    errors.password = 'Senha não pode ser vazia!';
                }

                if (!values.name) {
                    errors.name = 'Escolha um nome';
                }
                  
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                submitHandler(values);
                setSubmitting(false);;
            }}
            // validateOnChange={false}
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
                <div className="vid-info" >
                    <div className="login_form text-center">
                        <h2>Cadastre-se</h2>
                        <form className="form-group" onSubmit={handleSubmit}>
                            <input type="text" name="name" id="name" className="form__input" placeholder="Seu nome" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.name}/>
                            <CSSTransition
                                in={touched.name && errors.name}
                                timeout={200}
                                unmountOnExit
                                classNames="my-node"
                            >
                                <p className="p-erros" >{errors.name}</p>
                            </CSSTransition>
                            <input type="email" name="email" id="email" className="form__input" placeholder="Email" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <CSSTransition
                                in={touched.email && errors.email}
                                timeout={200}
                                unmountOnExit
                                classNames="my-node"
                            >
                                <p className="p-erros" >{errors.email}</p>
                            </CSSTransition>
                            <input type="password" name="password" id="password" className="form__input" placeholder="Senha" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                            <CSSTransition
                                in={touched.password && errors.password}
                                timeout={200}
                                unmountOnExit
                                classNames="my-node"
                            >
                                <p className="p-erros" >{errors.password}</p>
                            </CSSTransition>
                            <input type="submit" value="Cadastrar" className="btn" disabled={isSubmitting}/>
                        </form>
                        <p>Já tem uma conta? <a onClick={props.switchMode}>Faça Login!</a></p>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default SignUpForm;