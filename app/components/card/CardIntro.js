
'use client'

import { Image } from 'react-bootstrap';
import { Button, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';

import styles from './CardIntro.module.css';


export default function CardIntro ({imgSrc, title, userImgSrc, userName, post}) {

    const [showModal, setShowModal] = useState(false);

    const [previousUrl, setPreviousUrl] = useState('/');


    const handleShowModal = () => {
        const titleUrl = `/${title.replace(/[,:;\.\s]+/g, '-').toLowerCase()}`;

        window.history.pushState("object or string", "Title", `${titleUrl}`);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false); 
        window.history.replaceState(null, '', previousUrl);
    }

    return (

        <div className={styles.listaCard}>
        <div className={styles.capaLista}>
            <Image src={imgSrc} alt="Capa da Lista" className={`img-fluid ${styles.capaLista}`} fluid width={600} height={250} />
        </div>
        <div className={styles.infoLista}>
            <h3 style={{minWidth: '100px'}}>{title}</h3>

            <div className={styles.usuario}>
                <Image src={userImgSrc} alt={userName} width={45} height={40}/>
            <a>
                <span>{userName}</span>
            </a>
            </div>
            <Button className={styles.lerMais} onClick={handleShowModal}>Saiba mais!</Button>         
        </div>


        <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
        <Modal.Header closeButton className={styles.modalHeader}>

            <Image src={userImgSrc} alt={userName} width={45} height={40}/>
            <a>
                <span>{userName}</span>
            </a>

        </Modal.Header>
        <Modal.Body className="text-center">
            
            <Modal.Title style={{color: "black", marginBottom: '20px', maxWidth: '1000px'}}>{title}</Modal.Title>
            <Image src={imgSrc} alt="Capa do Post" fluid width={500} height={300} style={{borderRadius: '10px', border: '5px solid rgb(18, 113, 255)', marginBottom: '20px'}}/>
            <br/>
            <p style={{color: 'black'}}>{post?.descricao}</p>
            <div>
            <ul className="list-unstyled">
                {post?.itens.map((item, index) => (
                <li key={index} className="text-left">
                    <h4><strong style={{color: 'black'}}>{index + 1}. {item.titulo}</strong></h4>
                    <Image src={item.imagemURL} alt={item.title} width={50} height={50} style={{marginBottom: '20px'}}/>
                    <p style={{color: 'black'}}>{item.conteudo}</p>
                </li>
                ))}
            </ul>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
            </Button>
        </Modal.Footer>
        </Modal>
        </div>
    );
}