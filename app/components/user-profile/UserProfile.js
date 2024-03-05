'use client'

import supabase from '@/app/service/supabase';
import React, { useState } from 'react';
import { Card, Image, Modal, Button, Form } from 'react-bootstrap';

export default function UserProfile ({ perfilClicado, userName, userEmail, userBio, userPerfilURL}) {
  const [showModal, setShowModal] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const [editedBio, setEditedBio] = useState(userBio);

  const [selectedImage, setSelectedImage] = useState(userPerfilURL);

  const handleEditProfile = () => {
    setShowModal(true);
    setEditedName(userName);
    setEditedBio(userBio);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      console.log('entrei')
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        console.log(base64Image);
        setSelectedImage(base64Image);
      };
      reader.readAsDataURL(file);
    } else {
      // Se o usuário não selecionar nenhuma imagem, mantenha a userPerfilURL inalterada
      setSelectedImage(userPerfilURL);
    }
  };
  
    
  
  const handleSaveChanges = async () => {

    const { data, error } = await supabase
    .from('usuarios')
    .update({
      nome: editedName,
      description: editedBio,
      fotoPerfilURL: selectedImage,
    })
    .eq('user_email', userEmail);

    console.log(data);

    setShowModal(false);
    window.location.reload();
  };

  return (
    <>
      {perfilClicado && (
        <>
          <Card style={{ width: '18rem', marginTop: '20px' }} className="mx-auto text-center">
            <Card.Body>
              <Image
                src={userPerfilURL}
                alt="Imagem de perfil"
                width={100}
                height={100}
                style={{ borderRadius: '15px'}}
              />
              <Card.Title>Olá, {userName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{userEmail}</Card.Subtitle>
              <Card.Text>{userBio}</Card.Text>
              <Button onClick={handleEditProfile}>Editar perfil</Button>
            </Card.Body>
          </Card>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Editar perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formProfileURL">
                <Form.Label>Foto do Perfil</Form.Label>
                <Form.Control 
                  type="file" 
                  onChange={handleImageChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Nome do Usuário</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o novo nome do usuário"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBio">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Digite a nova descrição"
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Salvar Alterações
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};