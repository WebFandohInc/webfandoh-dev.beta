import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import styles from './TermsAndPrivacity.module.css';

const TermsAndPrivacyModal = ({ show, handleClose }) => {
  // Aqui você colocaria o conteúdo dos Termos de Uso e Política de Privacidade
  const termsContent = `
  <p><strong>Uso do Site</strong></p>
  <p>Você pode utilizar nosso site para fins pessoais e informativos. Não é permitido utilizar o site para fins ilegais, fraudulentos ou que prejudiquem terceiros. É de sua responsabilidade assegurar que seu acesso e uso do site estejam em conformidade com todas as leis e regulamentações aplicáveis.</p>

  <p><strong>Propriedade Intelectual</strong></p>
  <p>Todo o conteúdo do site, incluindo textos, imagens, gráficos, logotipos, marcas registradas, nomes de produtos e outras informações são de nossa propriedade ou de terceiros que nos fornecem conteúdo. Você não tem permissão para copiar, reproduzir, distribuir, transmitir, exibir, vender, licenciar ou explorar qualquer conteúdo do site sem a nossa autorização prévia por escrito.</p>

  <p><strong>Links para Outros Sites</strong></p>
  <p>O nosso site pode conter links para outros sites que não sejam de nossa propriedade ou controle. Não somos responsáveis pelo conteúdo desses sites ou por quaisquer danos que possam ocorrer ao visitá-los. O uso desses links é de sua responsabilidade e risco.</p>

  <p><strong>Limitação de Responsabilidade</strong></p>
  <p>Não seremos responsáveis por quaisquer danos, perdas ou despesas decorrentes do uso ou incapacidade de uso do site. Não garantimos que o site seja livre de erros, vírus ou outros elementos prejudiciais. O uso do site é por sua conta e risco.</p>

  <p><strong>Alterações nos Termos e Condições</strong></p>
  <p>Podemos alterar estes termos e condições a qualquer momento sem aviso prévio. É sua responsabilidade verificar periodicamente esta página para se manter atualizado sobre quaisquer alterações.</p>

  <p><strong>Lei Aplicável</strong></p>
  <p>Estes termos e condições são regidos e interpretados de acordo com as leis do país em que estamos localizados, sem considerar conflitos de disposições legais. Qualquer ação legal relacionada a estes termos e condições deve ser movida exclusivamente nos tribunais desse país.</p>

  <p>Se tiver alguma dúvida ou preocupação sobre estes termos e condições, entre em contato conosco pelo nosso e-mail: contato@webfandoh.com</p>
  `;

  const privacyContent = `
  <p><strong>A privacidade dos visitantes do nosso site Webfandoh é muito importante para nós.</strong> Esta política de privacidade descreve como o nosso site coleta, armazena, utiliza e compartilha as informações dos usuários. Nós nos comprometemos em proteger a privacidade e a segurança dos dados pessoais dos usuários. Ao utilizar o nosso site, o usuário concorda com a coleta e o uso de suas informações pessoais, de acordo com os termos aqui estabelecidos.</p>

    <p><strong>Informações coletadas</strong></p>
    <p>Coletamos as informações pessoais dos usuários quando estes se cadastram no site, fazem uma compra ou entram em contato conosco por meio do formulário de contato. As informações coletadas incluem nome, endereço de e-mail, endereço postal e informações de pagamento.</p>

    <p>Também coletamos informações não pessoais, tais como as páginas visitadas no site e informações do dispositivo utilizado para acessá-lo, a fim de melhorar a experiência do usuário e fornecer conteúdo personalizado.</p>

    <p><strong>Uso das informações</strong></p>
    <p>As informações coletadas são utilizadas para fins internos, tais como processar pedidos e pagamentos, fornecer suporte ao usuário e enviar informações sobre produtos e serviços. Também utilizamos as informações para melhorar o site e personalizar a experiência do usuário.</p>

    <p>Não vendemos, alugamos ou compartilhamos as informações pessoais dos usuários com terceiros, exceto quando necessário para processar pagamentos ou quando exigido por lei.</p>

    <p><strong>Segurança das informações</strong></p>
    <p>Tomamos medidas de segurança adequadas para proteger as informações pessoais dos usuários. As informações são armazenadas em servidores seguros e somente são acessíveis por pessoal autorizado. No entanto, nenhum sistema de segurança é completamente infalível e não podemos garantir a segurança das informações em todas as circunstâncias.</p>

    <p><strong>Cookies</strong></p>
    <p>Utilizamos cookies para coletar informações não pessoais, tais como as páginas visitadas no site, a fim de melhorar a experiência do usuário. Os cookies são pequenos arquivos de texto que são armazenados no dispositivo utilizado para acessar o site. O usuário pode optar por desativar os cookies em seu navegador, mas isso pode afetar a funcionalidade do site.</p>

    <p><strong>Publicidade</strong></p>
    <p>Nosso site utiliza o Google Adsense, um serviço de publicidade fornecido pelo Google. O Google Adsense usa cookies para exibir anúncios personalizados aos usuários com base em sua visita ao nosso site e a outros sites na Internet. Os usuários podem optar por desativar o uso do cookie DART do Google Adsense visitando a <a href="link_da_politica_de_privacidade_do_google" target="_blank" rel="noopener noreferrer">Política de privacidade da rede de conteúdo e dos anúncios do Google</a>.</p>

    <p>Nós utilizamos serviços de publicidade de terceiros para exibir anúncios em nosso site. Esses serviços podem coletar informações anônimas sobre as visitas dos usuários a este e a outros sites, com o objetivo de exibir anúncios personalizados com base em seus interesses e preferências.</p>

    <p><strong>Compromisso do Usuário</strong></p>
    <p>Você concorda em seguir o nosso compromisso de usuário. Isso inclui o uso responsável do site, bem como o respeito pelas leis e regulamentações aplicáveis.</p>

    <ul>
    <li><strong>Uso apropriado:</strong> o site deve ser usado apenas para fins legais e adequados. Qualquer uso indevido ou ilegal do site não é permitido.</li>
    <li><strong>Conteúdo apropriado:</strong> é proibido publicar conteúdo ilegal, difamatório, obsceno, discriminatório ou ofensivo em nosso site.</li>
    <li><strong>Responsabilidade:</strong> você é responsável por qualquer atividade realizada em sua conta, portanto, deve proteger suas informações de login e senha.</li>
    <li><strong>Não cumprimento:</strong> o incumprimento deste compromisso pode resultar em restrição ou suspensão do acesso ao site.</li>
    </ul>

    <p><strong>Alterações na política de privacidade</strong></p>
    <p>Reservamo-nos o direito de alterar esta política de privacidade a qualquer momento. As alterações serão publicadas no site e a continuação do uso do site pelo usuário após tais alterações implicará na aceitação da política de privacidade atualizada.</p>

    <p><strong>Contato</strong></p>
    <p>Se tiver dúvidas ou preocupações sobre esta política de privacidade ou sobre o tratamento de suas informações pessoais, entre em contato conosco por meio do formulário de contato disponível no site.</p>
`;
  

  const [activeTab, setActiveTab] = useState('terms');

  const handleShowTerms = () => setActiveTab('terms');
  const handleShowPrivacy = () => setActiveTab('privacy');

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>{activeTab === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{color: 'grey'}}>
        {activeTab === 'terms' ? <div dangerouslySetInnerHTML={{ __html: termsContent }} /> : <div dangerouslySetInnerHTML={{ __html: privacyContent }} />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={activeTab === 'terms' ? handleShowPrivacy : handleShowTerms}>
          {activeTab === 'terms' ? 'Ver Política de Privacidade' : 'Ver Termos de Uso'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsAndPrivacyModal;
