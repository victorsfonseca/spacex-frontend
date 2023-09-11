# SpaceX API Challenge

Este repositório contém o frontend da minha solução para o desafio Fullstack SpaceX API. Desenvolvi uma aplicação web que consome a API da SpaceX para listar informações sobre os lançamentos de foguetes da SpaceX e apresentar essas informações de maneira visualmente atraente. Instruções podem ser vistas em [README](instrucoes/README.md).

Para ver a apresentação do projeto em vídeo curto [clicke aqui](https://www.loom.com/share/8f5a2c1e3cab43d2bc49863438b64cbc).

## Front-end

### Tecnologias Utilizadas
- React.js: O React é o principal framework de desenvolvimento frontend, utilizado para criar interfaces de usuário interativas e reativas. Ele se baseia em componentes reutilizáveis e proporciona um gerenciamento eficaz do estado da aplicação.

- React Chartjs 2: A biblioteca React Chartjs 2 é integrada para facilitar a criação de gráficos e visualizações de dados interativos. Ela simplifica a incorporação de gráficos baseados em Chart.js na aplicação.

- Moment.js: O Moment.js é utilizado para manipular e formatar datas e horas. Isso é útil para lidar com informações de datas, como as relacionadas aos lançamentos da SpaceX.

- Axios: A biblioteca Axios é empregada para realizar chamadas HTTP a servidores e APIs externas. Ela permite buscar e enviar dados de forma eficiente, como os detalhes dos lançamentos da SpaceX.

- TypeScript: TypeScript é a linguagem de programação usada no frontend. Ela acrescenta tipagem estática ao JavaScript, melhorando a segurança e a manutenção do código.

### Como instalar e executar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/victorsfonseca/spacex-frontend.git
```

2. Navegue para o diretório do projeto:
```bash
cd pasta/de/destino/do/projeto
```

3. Inicie os containers
```bash
docker-compose build
docker-compose up
```

4. Ao finalizar o processo de inicialização do container, a aplicação estará disponível em http://localhost:5000.

### Aplicação

O projeto foi desenvolvido em Typescript. O Typescript traz benefícios como detecção de erros de tipo em tempo de compilação tornando o desenvolvimento de aplicativos JavaScript mais seguros e escaláveis. Portanto, antes de executarmos os arquivos, devemos compilar a aplicação.

A estrutura do projeto é organizada da seguinte forma:

**assets:** Esta pasta contém recursos estáticos, icones utilizados na aplicação.

**components** Nesta pasta, estão armazenados os componentes reutilizáveis que compõem a interface de usuário da aplicação. Eles podem ser facilmente integrados em diferentes partes da aplicação. Aqui estão, gráfico de pizza (adaptação de componente importado da lib React Chartjs 2), gráfico de barras (adaptação de componente importado da lib React Chartjs 2), skeleton (estrutura a ser exibida até que os dados sejam carregados para melhorar a experiência do usuário) e a tabela que exibe os dados paginados.

**config** A pasta config é usada para armazenar configurações globais da aplicação, como variáveis de ambiente ou configurações específicas do projeto.

**models** Aqui, são definidos os modelos de dados que representam a estrutura das informações utilizadas na aplicação. Isso ajuda a manter a consistência dos dados em toda a aplicação.

**utils** A pasta "utils" é usada para armazenar utilitários e funções auxiliares que podem ser usados em vários lugares da aplicação. Aqui temos uma função para debounce, onde a função passada como parâmetro somente será chamada depois do tempo definido como parâmetro, uma função para formatar datas e uma função para atualizar a url sempre que a variável de consulta ou a página forem alterados.

**pages** A pasta pages contém as páginas da aplicação. Neste projeto, há apenas uma página chamada "Home", que exibe gráficos e uma lista de informações requeridas. Não é necessário roteamento, pois a chamada para a página Home é feita diretamente a partir do arquivo index.tsx, que serve como ponto de início da aplicação.

A página Home é o ponto central da aplicação, onde os gráficos e a lista de informações são apresentados aos usuários. A pasta da página contém 3 arquivos, home.page.tsx, responsável por renderizar a interface da página e integrar os componentes e funcionalidades necessários para exibir gráficos e listas de informações relacionadas aos lançamentos da SpaceX, home.page.css com a folha de estilos da interface da página e home.service.ts que contém os serviços externos utilizados pela página, como consulta a API também desenvolvida neste projeto em [backend](https://github.com/victorsfonseca/spacex-backend.git)

A aplicação faz uma consulta a api para adquirir os dados de estatísticas para popular os dados dos gráficos, e uma consulta separada para adquirir a lista paginada de lançamentos.

This is a challenge by Coodesh