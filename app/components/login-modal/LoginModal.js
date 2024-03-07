import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Toast } from 'react-bootstrap';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

import logoCopy from '../../../public/logofandoh.png';
import styles from './LoginModal.module.css';


import TermsAndPrivacyModal from '../terms-and-privacity/TermsAndPrivacityModal';

import supabase from '../../service/supabase';

import perfilDefault from '../../../public/perfiluser.png';

const LoginModal = ({ show, onHide }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [isCadastro, setIsCadastro] = useState(false);
  const [showTermsPrivacyModal, setShowTermsPrivacyModal] = useState(false);
  const [cadastroRealizado, setCadastroRealizado] = useState(false);
  const [cadastroNaoRealizado, setCadastroNaoRealizado] = useState(false);

  const handleShowTermsPrivacyModal = () => setShowTermsPrivacyModal(true);
  const handleCloseTermsPrivacyModal = () => setShowTermsPrivacyModal(false);

  const toggleCadastroRealizado = () => setCadastroRealizado(true);

  const [emailExistsError, setEmailExistsError] = useState(false);
  const [invalidCredentialsError, setInvalidCredentialsError] = useState(false);

  const handleCadastro = async () => {
    try {

      console.log(formik.values.email);

      const { user,  error } = await supabase.auth.signUp(
      {
        email: formik.values.email,
        password: formik.values.password,
      }, 
      );

      if (error) {
        if (error.message.includes('User already registered')) {
          setEmailExistsError(true);

          setTimeout(() => {
            setEmailExistsError(false);
          }, 2500);
        }      
      } else {

          const { userInfo, errorUser} = await supabase.from('usuarios').upsert([
              {
                  user_email: formik.values.email,
                  nome: formik.values.nome,
                  idade: formik.values.idade,
                  fotoPerfilURL: perfilDefault.src, 
                  description: "Você ainda não tem uma bio. Adicione-a! :)"
              },
          ]);

          toggleCadastroRealizado();

          setTimeout(() => {
            setCadastroRealizado(false);
            setEmailExistsError(false);
            setIsCadastro(false);
            formik.resetForm();
          }, 3000);
      }

    } catch (error) {
    }
  };

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: formik.values.email,
        password: formik.values.password,
      });
  
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setInvalidCredentialsError(true);
  
          setTimeout(() => {
            setInvalidCredentialsError(false);
          }, 3000);
        } else {
          console.error('Erro ao fazer login:', error.message);
        }
      } else {
        // Não houve erro, o login foi bem-sucedido
        window.location.href = '/pages/home-auth';
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  };
  

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      nome: '',
      idade: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Campo obrigatório'),
      password: Yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Campo obrigatório'),
      nome: Yup.string().when('isCadastro', {
        is: true,
        then: Yup.string().required('Campo obrigatório'),
      }),
      idade: Yup.number().when('isCadastro', {
        is: true,
        then: Yup.number().required('Campo obrigatório'),
      }),
    }),

    onSubmit: (values) => {
      if (isCadastro) {
        handleCadastro();
      } else {
        handleLogin();
      }
      // onHide();
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleCadastro = () => {
    setIsCadastro(!isCadastro);
    formik.resetForm(); 
  };

  const handleHide = () => {
    formik.resetForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title style={{color: 'black', fontFamily: 'raleway, sans-serif'}}>{isCadastro ? 'Cadastro' : 'Faça login'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <div className={`${styles.logoContainer} mx-auto`}>
          <Image src={logoCopy.src} width={350} height={60} />
            Faça login/cadastre-se para acompanhar nossos conteúdos e se divertir com a comunidade! 
        </div>

        <Form className="w-100 mt-3">
          {isCadastro && (
            <>
              <Form.Group controlId="formBasicNome" className={styles.space}>
                <Form.Label className={styles.label}>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite seu nome"
                  name="nome"
                  value={formik.values.nome}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.nome && !!formik.errors.nome}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.nome}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicIdade" className={styles.space}>
                <Form.Label className={styles.label}>Idade</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite sua idade"
                  name="idade"
                  value={formik.values.idade}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.idade && !!formik.errors.idade}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.idade}</Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          <Form.Group controlId="formBasicEmail" className={styles.space}>
            <Form.Label className={styles.label}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={(formik.touched.email && !!formik.errors.email) || (isCadastro && emailExistsError) || (invalidCredentialsError)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
              {isCadastro && emailExistsError && 'O e-mail já foi cadastrado. Tente outro e-mail.'}
              {invalidCredentialsError && 'Credenciais inválidas! Tente novamente com o seu e-mail e senha cadastrados no site.'}
            </Form.Control.Feedback>
            </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className={styles.label}>Password</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password || (invalidCredentialsError)}
              />
              <Button variant="link" onClick={handleTogglePasswordVisibility} className="ms-2">
                {showPassword ? <IoEyeOff className="mt-2" /> : <IoEye />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
                {invalidCredentialsError && 'Credenciais inválidas! Tente novamente com o seu e-mail e senha cadastrados no site.'}
              </Form.Control.Feedback>
            </div>
          </Form.Group>
        </Form>
        <a className={styles.introSignUp} onClick={handleToggleCadastro}> <u>
        {isCadastro ? 'Já tem uma conta? Fazer Login' : 'Não tem uma conta ainda? Cadastre-se!'}
        </u>
        </a>
        <p className={styles.textTerms}>Ao entrar no site, você concorda com os <b style={{color: 'blue', cursor: 'pointer'}} onClick={handleShowTermsPrivacyModal}>Termos de Uso e Política de Privacidade</b> do WebFandoh.</p>
        <TermsAndPrivacyModal show={showTermsPrivacyModal} handleClose={handleCloseTermsPrivacyModal} />



        <Toast show={cadastroRealizado} onClose={toggleCadastroRealizado} style={{backgroundColor: 'green'}} delay={200}>
          <Toast.Body>Cadastro realizado com sucesso!</Toast.Body>
        </Toast>
     </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="primary" onClick={formik.handleSubmit}>
          {isCadastro ? 'Cadastrar' : 'Fazer Login'}
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>

  );
};

export default LoginModal;
