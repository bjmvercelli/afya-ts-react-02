import React, { useState, useCallback, FormEvent } from 'react';
import api from '../../service/api';
import { toast } from 'react-toastify';
import { CardContent } from './styles';

interface IFormPostData {

  nome: string;
  login: string;
  cpf: string;
  senha: string;
}

const Form: React.FC = () => {

  const [formDataContent, setFormDataContent] = useState<IFormPostData>({} as IFormPostData); //forçando a tipagem

  const [isLoad, setIsLoad] = useState<boolean>(false); //inicia como false

  const postSignUpData = useCallback( //função p memorização
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoad(!isLoad)
      api.post('usuarios', formDataContent).then(
        response => {
          toast.success('Cadastro realizado com sucesso! ' + formDataContent.nome);
        }
      ).catch(err => {
        toast.error('Ooops, falha no cadastro')
      }).finally(() => setIsLoad(false));


    }, [formDataContent, isLoad]
  )

  // '...var' = rest operator - no caso do nome, passa o valor do formDataContent (inicialmente vazios), acessa o nome e passa o evento recebendo o valor
  return (
    <>
      <CardContent>
        {isLoad ?
          (
            <p>Carregando ...</p>
          ) : (

            <form onSubmit={postSignUpData} >
              <input type="text" placeholder="Seu nome" onChange={e => { setFormDataContent({ ...formDataContent, nome: e.target.value }) }} />
              <input type="text" placeholder="Username" onChange={e => { setFormDataContent({ ...formDataContent, login: e.target.value }) }} />
              <input type="text" placeholder="CPF" onChange={e => { setFormDataContent({ ...formDataContent, cpf: e.target.value }) }} />
              <input type="password" placeholder="Senha" onChange={e => { setFormDataContent({ ...formDataContent, senha: e.target.value }) }} />

              <button type="submit">Enviar</button>
            </form>
          )
        }
      </CardContent>
    </>
  );
}

export default Form;