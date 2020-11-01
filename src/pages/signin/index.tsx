import React, { useCallback, useRef } from 'react';

import { Container, Content, Background, AnimationContainer } from './styles';

import { FiLock, FiLogIn, FiMail } from "react-icons/fi"

import logo from '../../assets/logo.svg'

// COMPONENTS
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup'
import getValidationErros from '../../utils/getValiationErros';
import { AuthContext, useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
import { Link, useHistory } from 'react-router-dom';

interface SignInCredentials{
  email: string;
  password: string;
}

const Signin: React.FC = () => {

  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { signIn, user } = useAuth()
  const { addToast } = useToast()

  console.log(user)

  const handleSubmit = useCallback( async(data: SignInCredentials) => {
    
    console.debug(data)

    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({        
        email: Yup.string().required("Email é obrigatório").email("Digite um email válido"),
        password: Yup.string().required("Senha obrigatória"),
      })

      await schema.validate(data, {
        abortEarly: false
      })

      await signIn({
        email: data.email,
        password: data.password
      })

      history.push("/dashboard")
      
    } catch (error) {

      if(error instanceof Yup.ValidationError){
        const errors = getValidationErros(error)
  
        formRef.current?.setErrors(errors)

        return;
      }

      addToast({
        type: 'info',
        title: 'Erro na autenticação',
        description: "Houve um erro ao fazer logon, cheque suas credenciais"
      })      
    }
  }, [signIn, history])


  return (
      <Container>
          <Content>
            <AnimationContainer>

            <img src={logo} alt="GoBarber"/>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>

                <Input icon={FiMail} name="email" placeholder="E-mail"/>

                <Input icon={FiLock} name="password" type="password" placeholder="Senha"/>

                <Button type="submit"> Entrar </Button>

                <a href="#">Esqueci minha senha</a>
            </Form>

            <Link to="/register" >
                <FiLogIn />
                Criar conta
            </Link>
            </AnimationContainer>
          </Content>
          <Background />
      </Container>
  );
}

export default Signin;