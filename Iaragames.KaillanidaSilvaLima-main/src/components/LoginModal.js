import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { fazerLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    const resultado = await fazerLogin(email, senha);

    if (resultado.success) {
      onClose();
      setEmail('');
      setSenha('');
    } else {
      setErro(resultado.message || 'Erro ao fazer login');
    }

    setCarregando(false);
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>×</button>
        
        <div className="login-header">
          <h2>Iara Games</h2>
          <p>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={carregando}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              disabled={carregando}
            />
          </div>

          {erro && <div className="erro-mensagem">{erro}</div>}

          <button 
            type="submit" 
            className="btn-login"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-info">
          <p className="info-text">Usuários de teste:</p>
          <div className="credenciais">
            <div>
              <strong>admin@iaragames.com</strong> / admin123
            </div>
            <div>
              <strong>usuario@teste.com</strong> / senha123
            </div>
            <div>
              <strong>kaillani@iaragames.com</strong> / 123456
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

