import styled from "styled-components";

export const LoginContent = styled.div`
    display: flex;
    background: #F70054;
    color: #fff;
    height: 100vh;
    justify-content: center;
    align-items: center;

    & form{
        display: grid;

        & input {
            margin: 2px 0;
            width: 100%;
            height: 18px;
            border: none;

            &:focus{
                outline-color: red;
            }
        }

        & button {
            border-radius: 12px;
            margin: 10px 0;
            background: #f70054;
            border: none;
            height: 30px;
            color: #fff;
            font-weight: bold;
            text-transform: uppercase;
        }
    }
`