'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import CardIntro from './components/card/CardIntro';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { BsArrowDown } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';


import yourFeed from '../public/feedpng.png';
import logoImage from '../public/logobranca.png';

import LoginModal from './components/login-modal/LoginModal';

// Supabase
import supabase from './service/supabase';
import Head from 'next/head';

export default function Home() {
  const [limit, setLimit] = useState(4);
  const { data: dados, error } = useSWR(['posts', limit], async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .limit(4);
    if (error) {
      console.error(error);
      throw new Error('Failed to fetch data');
    }
    return data;
  });

  const loading = !dados;
  const [inicioClicado, setInicioClicado] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const handleLoginClick = () => {
    setModalShow(true);
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 4);
  };

  useEffect(() => {
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    };
    scrollToBottom();
  }, [dados]);

  return (
    <Container fluid style={{ margin: 0, padding: 0, backgroundColor: 'white', overflow: 'hidden'}}>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3554757782177589" crossOrigin="anonymous"></script>
      </Head>

      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Image
              src={logoImage.src} 
              alt="Logo" 
              width={200}
              height={35}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" >
            <Nav className="ms-auto">
              <Nav.Link className={`me-2 ${inicioClicado ? "active" : ""}`} onClick={() => setInicioClicado(true)}>
                Início
              </Nav.Link>
              <Nav.Link onClick={() => handleLoginClick()}>
                Fazer login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'white', marginTop: '70px'}}>
        <Image src={yourFeed.src} alt="Imagem Centralizada" width={300} height={120}/>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <p>Carregando...</p>
        </div>
      ) : (
        <>
          {inicioClicado && dados.map((post) => (
            <CardIntro
              key={post.id}
              imgSrc={post.foto_capa_url}
              title={post.titulo_lista}
              userImgSrc={post.foto_usuario_url}
              userName={post.nome_usuario}
              post={post}
            />
          ))}
          <div className="d-flex justify-content-center align-items-center mt-4">
            <Button
              onClick={handleLoadMore}
              disabled={loading}
              variant="primary"
              className="rounded-pill d-flex align-items-center"
              style={{ backgroundColor: '#427BBE', border: 'none' }}
            >
              <FaChevronDown className="me-2" style={{ fontSize: '1.2em', color: '#ffffff' }} />
              <span style={{ fontWeight: 'bold', color: '#ffffff' }}>Carregar mais</span>
            </Button>
          </div>
        </>
      )}
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}