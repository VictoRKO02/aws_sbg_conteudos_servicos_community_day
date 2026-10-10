# AWS SBG — Conteúdos e Serviços

Site estático inspirado na estética da AWS e do AWS Skill Builder, criado como uma página de recomendação de estudos para capacitação em **mensageria** e **arquitetura orientada a eventos**.

## Identidade atualizada

- **Nome exibido:** AWS SBG
- **Subtítulo institucional:** Conteúdos e Serviços
- **Logo aplicada:** fornecida pelo usuário
- **Curadoria destacada no hero:** Rian Dultra, Rafael Guerra e Victor Mendes

## Recursos do site

- trilha de estudos organizada em etapas;
- biblioteca com artigos, vídeos e documentação oficial;
- filtros por etapa e tipo de conteúdo;
- busca textual;
- progresso salvo localmente no navegador;
- layout responsivo para desktop e mobile;
- visual inspirado em plataformas da AWS.

## Estrutura do projeto

```text
aws_sbg_mensageria/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── aws-sbg-logo.png
    └── favicon.svg
```

## Como executar

### Opção 1 — abrir direto
Basta abrir o arquivo `index.html` no navegador.

### Opção 2 — VS Code
Use a extensão **Live Server** para servir a página localmente.

### Opção 3 — Python
No terminal, dentro da pasta do projeto:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Observações

- O site não depende de back-end.
- Todos os links de estudo apontam para materiais externos.
- O progresso é salvo com `localStorage` no navegador do usuário.
- O visual é apenas inspirado na AWS, sem representar produto oficial.
