/* eslint-disable react/jsx-no-undef */
'use client'

import { Button, Col, Container, Nav, Navbar, Row, Form, Toast } from "react-bootstrap";

import styles from './page.module.css';
import CardIntro from "@/app/components/card/CardIntro";
import { useCallback, useEffect, useState } from "react";
import { FaPencilAlt, FaSignOutAlt } from 'react-icons/fa';
import { BsImage, BsPlus, BsShare, BsTrash } from 'react-icons/bs';

// import { Footer } from '../../components/footer/Footer';

import Image from "next/image";
import { useRouter } from 'next/router'

import supabase from "@/app/service/supabase";

import yourFeed from '../../../public/feedpng.png';
import logoImage from '../../../public/logobranca.png';
import criarListaImage from '../../../public/listapepople.png';
import useSWR from "swr";

export default function HomeAuth () {

  // const [dados, setDados] = useState([]);
  const [userDados, setuserDados] = useState([]);
  const [inicioClicado, setInicioClicado] = useState(true);
  const [escreverClicado, setEscreverClicado] = useState(false);
  const [perfilClicado, setPerfilClicado] = useState(false);
  const [sairClicao, setSairClicado] = useState(false);
  const toggleCadastroRealizado = () => setCadastroRealizado(true);


  const [expanded, setExpanded] = useState(false);

  const [imagemSelecionada, setImagemSelecionada] = useState<string | undefined>(undefined);

  const [session, setSession] = useState();
  const [user, setUser] = useState();

  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [userPerfilURL, setUserPerfilURL] = useState();
  const [userName, setUserName] = useState();

  var userNameTest;
  var userPerfilURLTest;

  const { data: dados, error } = useSWR('posts', async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error(error);
      throw new Error('Failed to fetch data');
    }
    return data;
    
  });

  const loading = !dados;

  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const sessionData = await supabase.auth.getSession();

      if(!sessionData.data.session) {
        window.location.href = '/';
      }
    };

    verifyAuth();
  }, []);

  const fetchUsuario = async (email: string) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 3000));

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('user_email', email);

      if (error) {
        throw error;
      }
      
      setUserName(data?.[0]?.nome);
      userNameTest = data?.[0]?.nome;

      setUserPerfilURL(data?.[0]?.fotoPerfilURL);
      userPerfilURLTest = data?.[0]?.fotoPerfilURL;

    } catch (error: any) {
      console.error('Erro ao buscar usuário:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const sessionData = await supabase.auth.getSession();
  
      const userData = await supabase.auth.getUser();
  
      const userEmailValue = userData?.data?.user?.email;
  
      if (userEmailValue) {

        setUserEmail(userEmailValue); 
        // setSession(sessionData);
        // setUser(userData);

        fetchUsuario(userEmailValue);
      } else {
        // Lidar com o caso em que userEmail não está definido
        console.error('userEmail não está definido no userData:', userData);
      }
    };
  
    fetchData();
  }, []);
  

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    window.location.href = '/';
  }

  const handleClickMenu = (menu : any) => {
    setInicioClicado(menu === 'inicio');
    setEscreverClicado(menu === 'escrever');
    setPerfilClicado(menu === 'perfil');
    setSairClicado(menu === 'sair');

    if(menu === 'sair') {
        handleLogout();
    }
  };  

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        if (reader.result) {
          setImagemSelecionada(reader.result as string);
        } else {
          // Se você quiser definir explicitamente como undefined quando reader.result for nulo
          setImagemSelecionada(undefined);
        }
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleTagInput = (e : any) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = (e: any) => {
    e.preventDefault();

    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index : any) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const [itens, setItens] = useState([
    { id: Date.now(), titulo: '', imagemUrl: '', conteudo: '' },
  ]);
  
  const handleAdicionarItem = () => {
    setItens([...itens, { id: Date.now(), titulo: '', imagemUrl: '', conteudo: '' }]);
  };

  const handleRemoverItem = (id : any) => {
    setItens(itens.filter((item) => item.id !== id));
  };

  const handleAlterarImagemItem = (id : any, imagem : any) => {
    const imagemUrl = URL.createObjectURL(imagem);
  
    setItens((prevItens) => {
      return prevItens.map((item) => (item.id === id ? { ...item, imagemUrl } : item));
    });
  };
  
  const handleCampoItemChange = useCallback((id : any, campo : any, valor : any) => {
    setItens((prevItens) =>
      prevItens.map((item) =>
        item.id === id ? { ...item, [campo]: valor } : item
      )
    );
  }, [setItens]);

  const [tituloLista, setTituloLista] = useState('');
  const [descricao, setDescricao] = useState('');

  const [cadastroRealizado, setCadastroRealizado] = useState(false);

  const handlePublicarLista = async () => {
    try {
      // Função para converter imagem para base64
      const convertImageToBase64 = async (imageUrl : any) => {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
      
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error('Erro ao converter imagem para base64:', error);
          throw error;
        }
      };

      const fotoUsuarioBase64 = await convertImageToBase64(userPerfilURL);

      const itensBase64 = await Promise.all(
        itens.map(async (item) => {
          const imagemItemBase64 = await convertImageToBase64(item.imagemUrl);
          return {
            titulo: item.titulo,
            imagemURL: imagemItemBase64,
            conteudo: item.conteudo,
          };
        })
      );
  
      const postData = {
        user_email: userEmail,
        nome_usuario: userName,
        foto_usuario_url: fotoUsuarioBase64,
        foto_capa_url: imagemSelecionada,
        titulo_lista: tituloLista,
        descricao: descricao,
        tags: tags,
        itens: itensBase64,
      };
  
      if (fotoUsuarioBase64) {
        // Enviar dados para o Supabase
        const { data, error } = await supabase.from('posts').upsert(postData);
  
        if (error) {
          throw error;
        }
  
        setCadastroRealizado(true);
  
        setTimeout(() => {
          setCadastroRealizado(false);
          window.location.reload();
        }, 3500);
  
        console.log('Lista publicada com sucesso:', data);
      } else {
        console.error('Erro ao publicar lista: A imagem do usuário não pôde ser convertida para base64.');
      }
    } catch (error) {
      // console.error('Erro ao publicar lista:', error.message);
    }
  };
  
  
  
  return (

      <Container fluid style={{ margin: 0, padding: 0, backgroundColor: 'white', overflow: 'hidden'}}>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>
              <Image 
                src={logoImage.src} 
                alt="Logo" 
                // fluid="true"
                width={200}
                height={35}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ms-auto">
                <Nav.Link className={`me-2 ${inicioClicado ? "active" : ""}`} onClick={() => handleClickMenu('inicio')}>
                    Início
                </Nav.Link>

                <Nav.Link className={`me-2 ${escreverClicado ? "active" : ""}`} onClick={() => handleClickMenu('escrever')}>
                <FaPencilAlt className="me-1" /> Escrever
                </Nav.Link>

                <Nav.Link className={`me-2 ${sairClicao ? "active" : ""}`} onClick={() => handleClickMenu('sair')}>
                    <FaSignOutAlt className="me-1"/> Sair
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
      </Navbar>

     {inicioClicado && (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'white', marginTop: '70px'}}>
            <Image src={yourFeed.src} alt="Imagem Centralizada" width={300} height={120}/>
        </div>
     )}

    {loading ? (
      // Renderize o indicador de carregamento aqui
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <p>Carregando...</p>
      </div>
    ) : (
      // Renderize os posts aqui
      inicioClicado && dados.map((post) => (
        <CardIntro
          key={post.id}
          imgSrc={post.foto_capa_url}
          title={post.titulo_lista}
          userImgSrc={post.foto_usuario_url}
          userName={post.nome_usuario}
          post={post}
        />
      ))
    )}

    {escreverClicado && (
      
        <div className="d-flex flex-column align-items-center" style={{ backgroundColor: 'white', marginTop: '10px'}}>
<Image 
  src={criarListaImage.src} 
  alt="Imagem Centralizada" 
  width={780} 
  height={250}
  style={{ maxWidth: '100%', display: 'none', height: 'auto' }}
/>        
<h1 className="cover-title" style={{ color: '#373737', marginTop: '30px', marginRight: '330px', fontWeight: 'bold' }}>Capa</h1>       
        <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Adicione a imagem de capa para o seu conteúdo.</Form.Label>
        <Form.Control type="file" size="lg" onChange={handleFileChange} />
        </Form.Group>

        {imagemSelecionada && (
 <div className={`d-flex flex-column justify-content-center align-items-center ${styles.imageContainer}`} style={{ marginTop: '20px', padding: '15px' }}>
 <style jsx>{`
   @media (max-width: 767px) {
     .image-container {
       width: 100%;
       max-width: 400px;
     }
   }

   @media (min-width: 768px) {
     .image-container {
       width: 100%;
       max-width: 600px;
     }
   }
 `}</style>

 <div className="image-container">
   <Image
     src={imagemSelecionada}
     alt="Imagem Selecionada"
     layout="responsive"
     width={600}
     height={360}
     style={{ borderRadius: '15px' }}
   />
 </div>
</div>
)}


<h3 className={`cover-title title-container`} style={{ color: '#373737', fontWeight: 'bold', fontFamily: 'Raleway, arial' }}>Título</h3>

  
<Form.Control 
style={{width: "90%", maxWidth: "600px", height: "50px", fontSize: "15px", borderRadius: "12px",  fontWeight: 'bolder', margin: '10px auto'}}
type="text" 
placeholder="Criar título..." 
className="mb-3"
onChange={(e) => setTituloLista(e.target.value)}
/>


<h3 className="cover-title" style={{ color: '#373737', marginTop: '10px', fontWeight: 'bold'}}
>Descrição</h3>
<Form.Control  
style={{width: "90%", maxWidth: "600px", height: "100px", fontSize: "15px", borderRadius: "12px", margin: '10px auto'}} 
as="textarea" 
rows={3} 
placeholder="Escrever descrição sobre o seu conteúdo...." 
className="mb-3"
onChange={(e) => setDescricao(e.target.value)}
/>


<h3 className="cover-title" style={{ color: '#373737', marginTop: '10px',fontWeight: 'bolder'}}>Tags</h3>
<div className="d-flex flex-wrap mb-3">
{tags.map((tag, index) => (
 <div key={index} className="tag-item d-flex align-items-center bg-primary text-white p-2 rounded m-2">
   <span className="mr-2" style={{marginRight: '10px'}}>{tag}</span>
   <Button variant="outline-light" size="sm" onClick={() => handleRemoveTag(index)}>X</Button>
 </div>
))}
</div>
   
 
<Form.Control
style={{
 width: "100%",
 maxWidth: "390px",
 height: "40px",
 fontSize: "15px",
 margin: "10px auto",
}}
type="text"
placeholder="Inclua tags relevantes, como filmes, aventura..."
value={tagInput}
onChange={handleTagInput}
onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
/>





{itens.map((item) => (
<div key={item.id} className="adicionar-item-container mt-3 p-3" style={{ border: '0px solid #ccc', borderRadius: '10px', marginBottom: '2rem', margin: 'auto', width: '100%', maxWidth: '610px' }}>
 <div className="d-flex justify-content-between">
   <div>
     <Button variant="danger" size="sm" style={{ fontWeight: 'bolder', borderRadius: '20' }} onClick={() => handleRemoverItem(item.id)}>
       <BsTrash className="mr-2" /> Excluir
     </Button>
   </div>
   <Form.Control style={{ width: '100%', maxWidth: '400px', fontSize: '18px', borderRadius: "8px", fontWeight: 'bolder', margin: '10px 0' }} type="text" placeholder="Título"
     onChange={(e) => handleCampoItemChange(item.id, 'titulo', e.target.value)}
   />
 </div>

 <Form.Group controlId={`formFileLg-${item.id}`} className="mt-3">
  <Form.Label>Selecione uma imagem</Form.Label>
  <Form.Control
    type="file"
    size="sm"
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAlterarImagemItem(item.id, e.target.files ? e.target.files[0] : null)}
  />
</Form.Group>


 {item.imagemUrl && (
   <div className="d-flex flex-column align-items-center mt-3">
<Image
 src={item.imagemUrl}
 alt={`Imagem do Item ${item.id}`}
 width={440}
 height={260}
 className="mb-2"
 style={{
   borderRadius: '12%',  // Bordas redondas
   overflow: 'hidden',
   width: '100%',
 }}
/>
</div>
)}

<Form.Control
      style={{
        width: '100%',
        height: '180px',
        fontSize: '15px',
        marginTop: '10px',
        borderRadius: '12px',
        whiteSpace: 'pre-line', // Permite quebras de linha
      }}
      as="textarea"
      rows={3}
      placeholder="Escreva o conteúdo do item..."
      value={item.conteudo} // Certifique-se de que você está usando o value corretamente
      onChange={(e) => handleCampoItemChange(item.id, 'conteudo', e.target.value)}
    />
  </div>
))}





<div className="d-flex justify-content" style={{ width: '370px', marginTop: '20px' }}>
   <Button 
 variant="primary" 
 size="lg" 
 style={{
   marginRight: '10px',
   fontFamily: 'Raleway, arial',
   color: '#007BFF',
   backgroundColor: '#fff',
   border: '3px solid #007BFF',
   borderRadius: '20px',
   fontWeight: 'bold',
 }}   
 onClick={handleAdicionarItem}
>
 <BsPlus className="mr-2"/> Item
</Button>

    
<Button 
 variant="success" 
 size="lg" 
 style={{
   marginRight: '10px',
   fontFamily: 'Raleway, arial',
   color: '#28A745',
   backgroundColor: '#fff',
   borderRadius: '20px',
   border: '3px solid #19692c',
   fontWeight: 'bold',
 }}   
 onClick={handlePublicarLista}
>
 <BsShare className="mr-2" /> Publicar
</Button>
          </div>
          
          <Toast
      show={cadastroRealizado}
      onClose={toggleCadastroRealizado}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#B4E5A1', // Verde pastel
        color: '#2E384D', // Cor de texto mais escura
        zIndex: 9999,
        borderRadius: '15px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        maxWidth: '300px', // Tamanho ajustável conforme necessário
      }}
      delay={4000}
      autohide
    >
      <Toast.Body>
        <Row className="align-items-center">
          <Col xs="auto">
            <span role="img" aria-label="success-emoji" style={{ fontSize: '2.9rem', marginRight: '15px' }}>
            🎉
            </span>
          </Col>
          <Col>
            <p style={{ fontFamily: 'Raleway, arial', fontSize: '1.2rem', margin: 0, fontWeight: 'bold' }}>
              Conteúdo publicado com sucesso!
            </p>
            <p style={{ fontFamily: 'Raleway, arial', fontSize: '1rem', margin: 0 }}>
              Parabéns, você fez algo incrível!
            </p>
          </Col>
        </Row>
      </Toast.Body>
    </Toast>

      </div>

    )}

    </Container>
    
  );
}