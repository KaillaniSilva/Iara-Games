// API mockada para validação de usuários

// Simulação de banco de dados de usuários
const usuariosMock = [
  {
    id: 1,
    email: 'admin@iaragames.com',
    senha: 'admin123',
    nome: 'Administrador'
  },
  {
    id: 2,
    email: 'usuario@teste.com',
    senha: 'senha123',
    nome: 'Usuário Teste'
  },
  {
    id: 3,
    email: 'kaillani@iaragames.com',
    senha: '123456',
    nome: 'Kaillani'
  }
];

// Simulação de delay de rede
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para validar login
export const login = async (email, senha) => {
  // Simula delay de rede
  await delay(1000);

  // Busca o usuário no "banco de dados"
  const usuario = usuariosMock.find(
    u => u.email === email && u.senha === senha
  );

  if (usuario) {
    // Remove a senha antes de retornar
    const { senha: _, ...usuarioSemSenha } = usuario;
    return {
      success: true,
      usuario: usuarioSemSenha,
      token: `token_mockado_${usuario.id}_${Date.now()}`
    };
  }

  return {
    success: false,
    message: 'Email ou senha incorretos'
  };
};

// Função para verificar se o usuário está autenticado
export const verificarToken = async (token) => {
  await delay(500);
  
  // Simula verificação de token
  if (token && token.startsWith('token_mockado_')) {
    const userId = token.split('_')[2];
    const usuario = usuariosMock.find(u => u.id === parseInt(userId));
    
    if (usuario) {
      const { senha: _, ...usuarioSemSenha } = usuario;
      return {
        success: true,
        usuario: usuarioSemSenha
      };
    }
  }

  return {
    success: false,
    message: 'Token inválido'
  };
};

// Função para fazer logout
export const logout = async () => {
  await delay(300);
  return { success: true };
};

