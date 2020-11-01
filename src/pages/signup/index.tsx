import React, { useCallback, useRef } from 'react';

import { FiArrowLeft, FiLock, FiLogIn, FiMail, FiUser } from "react-icons/fi"
import { Form } from '@unform/web';

import { Container, Content, Background, AnimationContainer } from './styles';

import logo from '../../assets/logo.svg'

// COMPONENTS
import Input from '../../components/Input';
import Button from '../../components/Button';

import * as Yup from 'yup'
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValiationErros';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';

interface SignUpDTO{
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { addToast } = useToast()
  const history = useHistory()

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback( async(data: SignUpDTO) => {
    
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        email: Yup.string().required("Email é obrigatório").email("Digite um email válido"),
        password: Yup.string().min(6, "Sua senha deve conter pelo menos 6 dígitos"),
      })

      await schema.validate(data, {
        abortEarly: false
      })

      await api.post("/users", data)
      
      addToast({
        type: "success",
        title: "Cadastro realizado!",
        description: "Você já pode fazer seu logon"
      })

      history.push("/")

    } catch (error) {

      if(error instanceof Yup.ValidationError){
        const errors = getValidationErros(error)
  
        formRef.current?.setErrors(errors)

        return;
      }

      addToast({
        type: 'info',
        title: 'Erro no cadastro',
        description: "Houve um erro ao fazer cadastro, tente novamente"
      })      

    }
  }, [addToast, history])

  return (
      <Container>
          <Background />
          <Content>
            <AnimationContainer>
              <img src={logo} alt="GoBarber"/>

              <Form ref={formRef} onSubmit={handleSubmit}>
                  <h1>Faça seu cadastro</h1>

                  <Input icon={FiUser} name="name" placeholder="Nome"/>

                  <Input icon={FiMail} name="email" placeholder="E-mail"/>

                  <Input icon={FiLock} name="password" type="password" placeholder="Senha"/>

                  <Button type="submit"> Cadastrar </Button>

              </Form>

              <Link to="/">
                  <FiArrowLeft />
                  Voltar para o logon
              </Link>
            </AnimationContainer>
          </Content>
      </Container>
  );
}

export default SignUp;