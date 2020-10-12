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
            initialValues={{ name:'', email: '', password: '', type: 'Distribuidor' }}
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

                if (!values.type) {
                    errors.type = 'Escolha um tipo de usuário';
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
                <div className="vid-info">
                    <div className="content">
                        <header>Cadastre-se</header>
                        <form onSubmit={handleSubmit} >
                        <div className={'field ' + (touched.name && errors.name ? 'input-error' : '')}>
                                <span className="fa fa-user"></span>
                                <input type="text" name="name" id="name" required placeholder="Seu nome" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                            </div>
                            <CSSTransition
                                in={touched.name && errors.name}
                                timeout={200}
                                unmountOnExit
                                classNames="my-node"
                            >
                                <p className="p-erros" >{errors.name}</p>
                            </CSSTransition>
                            <div className={'field space ' + (touched.email && errors.email ? 'input-error' : '')}>
                                <span className="fa fa-envelope"></span>
                                <input type="email" name="email" id="email" required placeholder="Email" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            </div>
                            <CSSTransition
                                in={touched.email && errors.email}
                                timeout={200}
                                unmountOnExit
                                classNames="my-node"
                            >
                                <p className="p-erros" >{errors.email}</p>
                            </CSSTransition>
                            <div className={'field space ' + (touched.password && errors.password ? 'input-error' : '')}>
                                <span className="fa fa-lock"></span>
                                <input type="password" name="password" id="password" className="pass-key" required placeholder="Senha" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                            </div>
                            <CSSTransition
                                in={touched.password && errors.password}
                                timeout={200}
                                unmountOnExit
                                classNames="my-node"
                            >
                                <p className="p-erros" >{errors.password}</p>
                            </CSSTransition>
                            <div className={'field space ' + (touched.type && errors.type ? 'input-error' : '')}>
                                <span className="fa fa-address-card"></span>
                                <select name="type" id="type" className="pass-key" required onChange={handleChange} onBlur={handleBlur} value={values.type} >
                                    <option value="Distribuidor" >Distribuidor</option>
                                    <option value="Cliente" >Consumidor</option>
                                </select>
                            </div>
                            <CSSTransition
                                in={touched.type && errors.type}
                                timeout={200}
                                unmountOnExit
                                classNames="my-node"
                            >
                                <p className="p-erros" >{errors.type}</p>
                            </CSSTransition>
                            <div className="field space">
                                <input type="submit" value="Cadastrar" disabled={isSubmitting}/>
                            </div>
                            <div className="pass">
                                <p>Já tem uma conta? <a onClick={props.switchMode}>Faça Login!</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default SignUpForm;