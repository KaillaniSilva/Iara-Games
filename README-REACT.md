# Iara Games - Aplicação Integrada com React

Esta aplicação integra React com o HTML existente, substituindo alguns elementos por componentes React.

## ✅ O que foi integrado com React:

1. **Ícone de pessoa no navbar** - Componente React que aparece no canto superior direito
2. **Cards de jogos** - Componente React que substitui o JavaScript puro
3. **Formulário de newsletter** - Componente React com validação
4. **Modal de login** - Sistema de autenticação com API mockada

## 🚀 Como usar:

### Opção 1: Abrir diretamente no navegador
1. Abra o arquivo `index.html` diretamente no navegador
2. O React será carregado via CDN e Babel standalone processará o JSX

### Opção 2: Usar servidor local (recomendado)
```bash
# Use o script PowerShell que já existe
.\servidor-local.ps1

# Ou use Python
python -m http.server 8000

# Depois acesse: http://localhost:8000
```

## 👤 Usuários de teste para login:

- **admin@iaragames.com** / admin123
- **usuario@teste.com** / senha123
- **kaillani@iaragames.com** / 123456

## 📁 Estrutura:

```
Iaragames.KaillanidaSilvaLima-main/
├── index.html              # HTML principal (mantido)
├── Css/
│   └── style.css           # Estilos (incluindo estilos React)
├── JS/
│   └── script.js           # Scripts originais (mantido para "Saiba Mais")
├── src/
│   ├── index.js            # Código React principal
│   ├── context/
│   │   └── AuthContext.js  # Context de autenticação
│   ├── services/
│   │   └── api.js          # API mockada
│   └── components/
│       ├── UserIcon.js     # Ícone de pessoa
│       ├── GameCards.js     # Cards de jogos
│       ├── NewsletterForm.js # Formulário newsletter
│       └── LoginModal.js    # Modal de login
└── Imagens/
```

## 🎯 Funcionalidades:

1. **Clique no ícone de pessoa** no navbar:
   - Se não estiver logado: abre modal de login
   - Se estiver logado: mostra menu com nome, email e opção de logout

2. **Cards de jogos**: Carregam dinamicamente com React (substitui o JS puro)

3. **Formulário de newsletter**: Validação com React

4. **Sistema de autenticação**: API mockada com persistência no localStorage

## 📝 Notas:

- O React é carregado via CDN (não precisa de build)
- O Babel Standalone processa o JSX em tempo de execução
- Alguns elementos HTML originais foram mantidos (banner, seção sobre, footer)
- A funcionalidade "Saiba Mais" continua em JavaScript puro

## ⚠️ Importante:

Para funcionar, você precisa de uma conexão com internet (para carregar React e Babel via CDN) ou configurar um servidor local.

