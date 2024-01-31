
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
            <Button className={styles.lerMais} onClick={handleShowModal}>Ler mais!</Button>         
        </div>


        <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
        <Modal.Header closeButton className={styles.modalHeader}>

            <Image src={userImgSrc} alt={userName} width={45} height={40}/>
            <a>
                <span>{userName}</span>
            </a>

        </Modal.Header>
     
        <Modal.Body className="text-center">         
            <Image src={imgSrc} alt="Capa do Post" fluid width={600} height={300} style={{borderRadius: '20px', marginBottom: '10px', marginTop:'15px'}}/>
            <Modal.Title style={{color: "black",marginBottom: '10px', maxWidth: '1000px', fontWeight: 'bold', fontFamily: 'Raleway, arial' }}>{title}</Modal.Title>
            <br/>
            <p style={{ color: 'black', marginTop: '-10px', marginBottom: '30px', whiteSpace: 'pre-line', textAlign: 'left' }}>{post?.descricao}</p>
            <div>
            <ul className="list-unstyled">
                {post?.itens.map((item, index) => (
                <li key={index} className="text-left">
<div style={{ display: 'flex', alignItems: 'center' }}>
  <h4>
    <strong style={{ color: 'black',marginRight: '10px',  whiteSpace: 'pre-line', fontWeight: 'bold', fontFamily: 'Raleway, arial' }}>{index + 1}.</strong>
  </h4>
  <h4>
    <strong style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Raleway, arial'}}>{item.titulo}</strong>
  </h4>
</div>
<Image
  src={item.imagemURL}
  alt={item.title}
  width={500}
  height={300}
  className="img-fluid" // Essa classe bootstrap garante que a imagem do item fique responsiva
  style={{
    marginBottom: '10px',
    marginTop: '15px',
    borderRadius: '25px',
    maxWidth: '100%', // Garante que a imagem não ultrapasse a largura do contêiner pai
    height: 'auto', // Mantém a proporção da imagem de forma harmônica
  }}
/> 
<p style={{ color: 'black', whiteSpace: 'pre-line', textAlign: 'left' }}>{item.conteudo}</p>
                </li>
                ))}
            </ul>
            </div>
        </Modal.Body>
        <Modal.Footer>
        <Button
  variant="secondary"
  onClick={handleCloseModal}
  style={{
    backgroundColor: '#FFFFFF',
    color: '#1264A2',
    fontFamily: 'raleway, arial',
    fontWeight: 'bold',
    border: '3px solid #1264A2',
    borderRadius: '18px',
    padding: '8px 16px',
    cursor: 'pointer',
  }}
>
  Fechar
</Button>

        </Modal.Footer>
        </Modal>
        </div>
    );
}