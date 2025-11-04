import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, verificarToken, logout as apiLogout } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Verifica se há token salvo ao carregar a aplicação
    const tokenSalvo = localStorage.getItem('token');
    if (tokenSalvo) {
      verificarToken(tokenSalvo).then(resultado => {
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
      const resultado = await apiLogin(email, senha);
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
    await apiLogout();
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  };

  const valor = {
    usuario,
    token,
    carregando,
    fazerLogin,
    fazerLogout,
    autenticado: !!usuario
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
};

