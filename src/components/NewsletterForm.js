import React, { useState } from 'react';
import './NewsletterForm.css';

const NewsletterForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (nome && email.includes('@') && email.includes('.')) {
      setMensagemSucesso(true);
      setNome('');
      setEmail('');
      
      // Esconde a mensagem após 5 segundos
      setTimeout(() => {
        setMensagemSucesso(false);
      }, 5000);
    } else {
      alert('Preencha os campos corretamente.');
    }
  };

  return (
    <section className="container my-5">
      <h2 className="text-white">Receba novidades</h2>
      <form id="newsletterForm" className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control" 
            id="nome" 
            placeholder="Seu nome" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required 
          />
        </div>
        <div className="col-md-6">
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="Seu e-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-vermais-verde">Cadastrar</button>
        </div>
      </form>
      {mensagemSucesso && (
        <div className="mt-3 text-success">Cadastro realizado com sucesso!</div>
      )}
    </section>
  );
};

export default NewsletterForm;

