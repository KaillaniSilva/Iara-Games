// API mockada
const api = {
  usuariosMock: [
    { id: 1, email: 'admin@iaragames.com', senha: 'admin123', nome: 'Administrador' },
    { id: 2, email: 'usuario@teste.com', senha: 'senha123', nome: 'Usuário Teste' },
    { id: 3, email: 'kaillani@iaragames.com', senha: '123456', nome: 'Kaillani' }
  ],
  
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  
  async login(email, senha) {
    await this.delay(1000);
    const usuario = this.usuariosMock.find(u => u.email === email && u.senha === senha);
    if (usuario) {
      const { senha: _, ...usuarioSemSenha } = usuario;
      return { success: true, usuario: usuarioSemSenha, token: `token_${usuario.id}_${Date.now()}` };
    }
    return { success: false, message: 'Email ou senha incorretos' };
  },
  
  async verificarToken(token) {
    await this.delay(500);
    if (token && token.startsWith('token_')) {
      const userId = token.split('_')[1];
      const usuario = this.usuariosMock.find(u => u.id === parseInt(userId));
      if (usuario) {
        const { senha: _, ...usuarioSemSenha } = usuario;
        return { success: true, usuario: usuarioSemSenha };
      }
    }
    return { success: false, message: 'Token inválido' };
  }
};

// Auth Context
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = React.useState(null);
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [carregando, setCarregando] = React.useState(true);

  React.useEffect(() => {
    const tokenSalvo = localStorage.getItem('token');
    if (tokenSalvo) {
      api.verificarToken(tokenSalvo).then(resultado => {
        if (resultado.success) {
          setUsuario(resultado.usuario);
          setToken(tokenSalvo);
        } else {
          localStorage.removeItem('token');
          setToken(null);
        }
        setCarregando(false);
      });
    } else {
      setCarregando(false);
    }
  }, []);

  const fazerLogin = async (email, senha) => {
    try {
      const resultado = await api.login(email, senha);
      if (resultado.success) {
        setUsuario(resultado.usuario);
        setToken(resultado.token);
        localStorage.setItem('token', resultado.token);
        localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
        return { success: true };
      } else {
        return { success: false, message: resultado.message };
      }
    } catch (erro) {
      return { success: false, message: 'Erro ao fazer login. Tente novamente.' };
    }
  };

  const fazerLogout = async () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, token, carregando, fazerLogin, fazerLogout, autenticado: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};

// UserIcon Component
const UserIcon = ({ onLoginClick }) => {
  const { usuario, autenticado, fazerLogout } = useAuth();
  const [menuAberto, setMenuAberto] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };
    if (menuAberto) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuAberto]);

  const handleIconClick = () => {
    if (autenticado) {
      setMenuAberto(!menuAberto);
    } else {
      onLoginClick();
    }
  };

  const handleLogout = () => {
    fazerLogout();
    setMenuAberto(false);
  };

  return (
    <div className="menu-container" ref={menuRef}>
      <button 
        className="icon-pessoa-btn"
        onClick={handleIconClick}
        title={autenticado ? 'Menu do usuário' : 'Fazer login'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {menuAberto && autenticado && (
        <div className="menu-dropdown">
          <div className="menu-item menu-user-info">
            <div className="menu-user-name">{usuario?.nome}</div>
            <div className="menu-user-email">{usuario?.email}</div>
          </div>
          <div className="menu-divider"></div>
          <button className="menu-item menu-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

// GameCards Component
const GameCards = () => {
  const todosCards = [
    { titulo: "Grand Theft Auto V", imagem: "./Imagens/GTA 5.jpeg" },
    { titulo: "Red Dead Redemption 2", imagem: "./Imagens/RED DEAD.jpeg" },
    { titulo: "Bully", imagem: "./Imagens/Bully.jpeg" },
    { titulo: "Call Of Duty", imagem: "./Imagens/Call Dutty.jpeg" },
    { titulo: "Gears of War", imagem: "./Imagens/GEARS OF WAR.jpeg" },
    { titulo: "Grand Theft Auto IV", imagem: "./Imagens/GTA 4.jpeg" },
    { titulo: "Grand Theft Auto VI", imagem: "./Imagens/GTA 6 POSTER.jpeg" },
    { titulo: "Grand Theft Auto San Andres", imagem: "./Imagens/GTA SAN ANDRES.jpeg" },
    { titulo: "Call of Duty: Warzone", imagem: "./Imagens/Call Dutty.jpeg" }
  ];

  const [cardsExibidos, setCardsExibidos] = React.useState(3);
  const qtdePorClique = 3;
  const cardsParaExibir = todosCards.slice(0, cardsExibidos);
  const temMaisCards = cardsExibidos < todosCards.length;

  return (
    <>
      <div className="row g-4" id="cardsContainer">
        {cardsParaExibir.map((card, index) => (
          <div key={index} className="col-md-4">
            <div className="card bg-black text-white border-0 h-100">
              <div className="image-wrapper">
                <img src={card.imagem} className="img-fluid game-image" alt={card.titulo} />
              </div>
              <div className="card-body">
                <small className="text-muted">Iara Games Brasil</small>
                <h5 className="card-title mt-2">{card.titulo}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      {temMaisCards && (
        <div className="text-center my-5">
          <button 
            className="btn btn-vermais text-white"
            onClick={() => setCardsExibidos(prev => prev + qtdePorClique)}
          >
            Ver mais
          </button>
        </div>
      )}
    </>
  );
};

// NewsletterForm Component
const NewsletterForm = () => {
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mensagemSucesso, setMensagemSucesso] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome && email.includes('@') && email.includes('.')) {
      setMensagemSucesso(true);
      setNome('');
      setEmail('');
      setTimeout(() => setMensagemSucesso(false), 5000);
    } else {
      alert('Preencha os campos corretamente.');
    }
  };

  return (
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
      {mensagemSucesso && (
        <div className="mt-3 text-success">Cadastro realizado com sucesso!</div>
      )}
    </form>
  );
};

// LoginModal Component
const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [erro, setErro] = React.useState('');
  const [carregando, setCarregando] = React.useState(false);
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
      // Força re-render do UserIcon
      if (onLoginSuccess) onLoginSuccess();
      window.dispatchEvent(new Event('login-success'));
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
          <button type="submit" className="btn-login" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="login-info">
          <p className="info-text">Usuários de teste:</p>
          <div className="credenciais">
            <div><strong>admin@iaragames.com</strong> / admin123</div>
            <div><strong>usuario@teste.com</strong> / senha123</div>
            <div><strong>kaillani@iaragames.com</strong> / 123456</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// App Component
const App = () => {
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const [key, setKey] = React.useState(0); // Para forçar re-render

  React.useEffect(() => {
    // Listener para atualizar quando login for bem-sucedido
    const handleLoginSuccess = () => {
      setKey(prev => prev + 1);
    };
    window.addEventListener('login-success', handleLoginSuccess);
    return () => window.removeEventListener('login-success', handleLoginSuccess);
  }, []);

  React.useEffect(() => {
    // Injeta o ícone de usuário no navbar
    const userIconContainer = document.getElementById('user-icon-container');
    if (userIconContainer) {
      const renderUserIcon = () => {
        if (ReactDOM.createRoot) {
          const root = ReactDOM.createRoot(userIconContainer);
          root.render(<UserIcon key={key} onLoginClick={() => setLoginModalOpen(true)} />);
        } else {
          ReactDOM.render(<UserIcon key={key} onLoginClick={() => setLoginModalOpen(true)} />, userIconContainer);
        }
      };
      
      // Aguarda um pouco para garantir que o React está carregado
      setTimeout(renderUserIcon, 100);
    }

    // Substitui o container de cards
    const cardsContainer = document.getElementById('cardsContainer');
    if (cardsContainer && cardsContainer.children.length === 0) {
      const cardsSection = cardsContainer.closest('section');
      if (cardsSection) {
        const newContainer = document.createElement('div');
        newContainer.id = 'cards-react-container';
        cardsSection.replaceChild(newContainer, cardsContainer);
        
        const renderCards = () => {
          if (ReactDOM.createRoot) {
            const root = ReactDOM.createRoot(newContainer);
            root.render(<GameCards />);
          } else {
            ReactDOM.render(<GameCards />, newContainer);
          }
        };
        
        setTimeout(renderCards, 100);
      }
    }

    // Substitui o formulário de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm && newsletterForm.parentElement) {
      const newsletterSection = newsletterForm.closest('section');
      if (newsletterSection) {
        const newContainer = document.createElement('div');
        newContainer.id = 'newsletter-react-container';
        newsletterSection.replaceChild(newContainer, newsletterForm);
        const renderNewsletter = () => {
          if (ReactDOM.createRoot) {
            const root = ReactDOM.createRoot(newContainer);
            root.render(<NewsletterForm />);
          } else {
            ReactDOM.render(<NewsletterForm />, newContainer);
          }
        };
        
        setTimeout(renderNewsletter, 100);
      }
    }
  }, [key]);

  return <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} onLoginSuccess={() => setKey(prev => prev + 1)} />;
};

// Inicializa a aplicação
const initApp = () => {
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.log('Aguardando React carregar...');
    setTimeout(initApp, 100);
    return;
  }

  const rootElement = document.getElementById('react-root') || (() => {
    const div = document.createElement('div');
    div.id = 'react-root';
    document.body.appendChild(div);
    return div;
  })();
  
  if (ReactDOM.createRoot) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
  } else {
    ReactDOM.render(
      <AuthProvider>
        <App />
      </AuthProvider>,
      rootElement
    );
  }
};

document.addEventListener('DOMContentLoaded', initApp);
