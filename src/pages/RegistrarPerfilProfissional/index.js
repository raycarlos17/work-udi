import React, { useEffect, useState } from 'react';
import './registrarPerfilProfissional.css';
import Header from '../../components/Header';
import ButtonLogOut from '../../components/ButtonLogOut';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

const RegistrarPerfilProfissional = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [occupation, setOccupation] = useState('')
    const [contact, setContact] = useState('')
    const [description, setDescription] = useState('')
    const [listUser, setListUser] = useState([])
    const [listWorker, setListWorker] = useState([])


    useEffect(() => {

        const id = props.match.params.id

        try {
            fetch(`http://localhost:3001/users/${id}`)
                .then(response => response.json())
                .then(
                    (result) => {
                        setListUser(result);
                    })
        }
        catch (error) {
            console.error(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        const id = props.match.params.id

        try {
            fetch(`http://localhost:3001/workers/${id}`)
                .then(response => response.json())
                .then(
                    (result) => {
                        setListWorker(result);
                        setName(result.name);
                        setEmail(result.email);
                        setOccupation(result.occupation);
                        setContact(result.contact);
                        setDescription(result.description);
                    })
        }
        catch (error) {
           
            console.error(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function registerWorkerBack() {
        try {
            let retorno = await fetch(`http://localhost:3001/workers`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    "id": listUser.id,
                    "name": name,
                    "email": email,
                    "emailLogin": listUser.email,
                    "occupation": occupation,
                    "contact": contact,
                    "description": description
                })
            })

            let json = await retorno.json()
            alert('Dados profissionais registrado com sucesso')
            return json

        } catch (error) {
            alert('Você ja possui registro')
            clearForms()
            console.log(error)
        }
    }

    async function updateWorkerBack() {
        try {
            let retorno = await fetch(`http://localhost:3001/workers/${listUser.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    "id": listUser.id,
                    "name": name,
                    "email": email,
                    "emailLogin": listUser.email,
                    "occupation": occupation,
                    "contact": contact,
                    "description": description
                })
            })

            let json = await retorno.json()
            alert('Dados alterados com sucesso')
            return json

        } catch (error) {
            alert('Erro ao alterar dados')
            clearForms()
            console.log(error)
        }
    }

    async function deleteWorkerBack() {
        try {
            let retorno = await fetch(`http://localhost:3001/workers/${listUser.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    
                })
            })

            let json = await retorno.json()
            alert('DELETADO COM SUCESSO')
            return json

        } catch (error) {
            alert('Erro ao alterar dados')
            clearForms()
            console.log(error)
        }
    }

    function confirmRegisterWorker() {
        if(name === '' && email === '' & occupation === ''){
            alert('É necessário preencher os campos obrigatorios que contem *')
        } else{
            let resposta = window.confirm("Deseja realmente fazer o registro? Suas informações vão estar visiveis na página inicial")
            if(resposta === true){
                registerWorkerBack()
            } else {
                return undefined
            }
        }
    }


    function clearForms() {
        setName('')
        setEmail('')
        setOccupation('')
        setContact('')
        setDescription('')

    }

    function handleClickDelete(e) {
        e.preventDefault()
        let resposta = window.confirm("Realmente deseja deletar o seus dados profissionais?")
        if(resposta === true){
            deleteWorkerBack()  
            clearForms()
        } else{
            return undefined
        }
    }

    function handleClickSaveWorker(e) {
        e.preventDefault()
        confirmRegisterWorker()
    }

    function handleClickUpdateWorker(e) {
        e.preventDefault()
        let resposta = window.confirm('Realmente deseja alterar os seus dados?')
        if(resposta === true){
            updateWorkerBack()
        } else {
            return undefined
        }
    }


    function buttonRegister(){
        if(listWorker.id === undefined) {
            return(
                <button onClick={handleClickSaveWorker}>REGISTRAR</button>
            )
        }
    }

    return (
        <div>
            <Header>
                <div className='div-ButtonLogOut'>
                    <ButtonLogOut />
                </div>
            </Header>
            <div className='div-register-perfil-prof-principal'>
                <h1>DADOS PROFISSIONAIS</h1>
                <hr />
                <form>
                    <label>*Nome Profissional: </label>
                    <br />
                    <input value={name || ''} onChange={e => setName(e.target.value)} type='text' placeholder={name} />
                    <br />
                    <label>*Email Profissional: </label>
                    <br />
                    <input value={email || ''} onChange={e => setEmail(e.target.value)} type='text' placeholder={email} />
                    <br />
                    <label>*Occupation: </label>
                    <br />
                    <input value={occupation || ''} onChange={e => setOccupation(e.target.value)} type='text' placeholder={occupation} />
                    <br />
                    <label>Contact: </label>
                    <br />
                    <input value={contact || ''} onChange={e => setContact(e.target.value)} type='text' placeholder={contact} />
                    <br />
                    <label>Description: </label>
                    <br />
                    <input value={description || ''} onChange={e => setDescription(e.target.value)} type='text' placeholder={description} />
                    <br />
                    <div className='div-button-registrar-profissional'>
                        {buttonRegister()}
                        <button onClick={handleClickUpdateWorker}>ALTERAR</button>
                        <button onClick={handleClickDelete}>DELETE</button>
                        <button onClick={(undefined)}>ATUALIZAR PÁGINA</button>
                        <button><Link className='link-button-perfil' to={`/${listUser.perfil}/${listUser.id}`}>PERFIL</Link></button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default RegistrarPerfilProfissional;