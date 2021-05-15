import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../service/api';
import { toast } from 'react-toastify';

import { FormSignInContent } from './styles';

interface IUserLogin {
    usuario: string;
    senha: string;
}

const FormSigIn: React.FC = () => {

    const [formDataContent, setFormDataContent] = useState<IUserLogin>({} as IUserLogin); //forçando a tipagem

    const [isLoad, setIsLoad] = useState<boolean>(false); //inicia como false

    const history = useHistory()

    const loginSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()   
        setIsLoad(true)
        api.post('login', formDataContent).then(
            response => {
                localStorage.setItem('@tokenAfiaApp', response.data.token)

                toast.success('Login realizado!', {
                    onClose: () => {history.push('/panel')}, 
                    autoClose: 2000
                })
                
            }
        ).catch(err => toast.error('Ooops, algo deu errado!')).finally(() => setIsLoad(false))
    }, [formDataContent, history])

    return (
        <FormSignInContent>
            { isLoad ? (<p>Carregando...</p>) : (

                <form onSubmit={loginSubmit}>
                    <input type="text" placeholder="Username" onChange={e => setFormDataContent({ ...formDataContent, usuario: e.target.value })} />
                    <input type="password" placeholder="Senha" onChange={e => setFormDataContent({ ...formDataContent, senha: e.target.value })} />

                    <button type="submit">Enviar</button>
                </form>
            )}
        </FormSignInContent>
    );
}

export default FormSigIn;