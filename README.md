# Protótipo UI UX

Projeto front-end estático, mobile-first, inspirado em um fluxo simples de app de delivery.

## O que está incluído

- `index.html` — tela Home
- `produto.html` — tela de detalhe do restaurante/produto
- `carrinho.html` — tela de checkout/carrinho
- `css/reset.css` — reset básico
- `css/style.css` — estilos principais
- `js/app.js` — renderização de dados, localStorage do carrinho e interações estáticas
- `assets/icons` — ícones SVG locais
- `scripts/init-repo.sh` — comandos para inicializar Git e preparar o repositório remoto

## Direção visual aplicada

- branco predominante
- amarelo apenas como cor de atenção
- sem flores e sem elementos decorativos extras
- layout simples, limpo e funcional

## Como rodar com Apache no LAMPP/XAMPP

1. Copie a pasta `prototipo-ui-ux` para o diretório servido pelo Apache.
   - Linux (LAMPP): normalmente `/opt/lampp/htdocs/`
   - Windows (XAMPP): normalmente `C:\xampp\htdocs\`
2. Inicie o Apache.
3. Acesse no navegador:

```bash
http://localhost/prototipo-ui-ux/
```

## Fluxo funcional

- Home renderiza restaurantes, categorias, recentes e cards de destaque.
- Produto lista sabores com botão de adicionar.
- Carrinho usa `localStorage` para manter os itens entre as páginas.
- Botão `Pedir` gera uma confirmação estática visual.

## Como criar o repositório no GitHub

Este pacote inclui os comandos em `scripts/init-repo.sh`.

### Antes
Crie manualmente no GitHub um repositório chamado:

```text
prototipo-ui-ux
```

Depois rode:

```bash
cd prototipo-ui-ux
bash scripts/init-repo.sh
```

## Checklist de revisão

- [x] Home criada
- [x] Produto criado
- [x] Carrinho criado
- [x] Navegação entre telas
- [x] Menu inferior com Home / Buscar / Cupons / Pedidos
- [x] Branco predominante
- [x] Amarelo apenas como destaque
- [x] Sem flores
- [x] Projeto estático funcional
- [x] Estrutura pronta para Apache/LAMPP
- [x] Arquivos preparados para versionamento no GitHub

## Próximos passos sugeridos

1. trocar conteúdos mockados por dados reais
2. criar busca funcional
3. adicionar responsividade expandida para desktop
4. evoluir para componentes reutilizáveis ou framework front-end
