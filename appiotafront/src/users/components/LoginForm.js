import React from 'react';
import { Formik } from 'formik';
import { CSSTransition } from 'react-transition-group';

const LoginForm = props => {
    return (
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
                  
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
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
                    <div className="login_form text-center">
                        <h2>Faça o Login</h2>
                        <form className="form-group" onSubmit={handleSubmit}>
                            <input type="email" name="email" id="email" className="form__input" placeholder="Email" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                            <CSSTransition
                                in={touched.email && errors.email}
                                timeout={200}
                                unmountOnExit
                                classNames="my-node"
                            >
                                <p className="p-erros" >{errors.email}</p>
                            </CSSTransition>
                            <input type="password" name="password" id="password" className="form__input" placeholder="Senha" autoComplete="off" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                            <CSSTransition
                                in={touched.password && errors.password}
                                timeout={200}
                                unmountOnExit
                                classNames="my-node"
                            >
                                <p className="p-erros" >{errors.password}</p>
                            </CSSTransition>
                            <input type="submit" value="Entrar" className="btn" disabled={isSubmitting}/>
                        </form>
                        <p>Não tem uma conta? <a onClick={props.switchMode}>Cadastre-se!</a></p>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default LoginForm;