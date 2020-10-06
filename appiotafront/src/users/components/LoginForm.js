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
                    <div className="content">
                        <header>Faça o Login</header>
                        <form onSubmit={handleSubmit} >
                            <div className={'field ' + (touched.email && errors.email ? 'input-error' : '')}>
                                <span className="fa fa-user"></span>
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
                                <CSSTransition
                                    in={touched.password && errors.password}
                                    timeout={200}
                                    unmountOnExit
                                    classNames="my-node"
                                >
                                    <p className="p-erros" >{errors.password}</p>
                                </CSSTransition>
                            </div>
                            <div className="field space">
                                <input type="submit" value="Entrar" disabled={isSubmitting}/>
                            </div>
                            <div className="pass">
                                <p>Não tem uma conta? <a onClick={props.switchMode}>Cadastre-se!</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default LoginForm;