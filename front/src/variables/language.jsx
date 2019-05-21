var url = new URL(window.location.href);
var type = url.searchParams.get("language");

type = "en";
type = "pt-br";
let BtWindowBack;
let news;
let meeting;
let tabs;
let swot1;
let swotBox;
let swotPopupAspect;
let painelMetasText;
let swot2;
let swot2Matrix;
let swot3;
let actions1;
let actions1Select;
let tabActions;
let actions1Box;
let actions2;
let homePlan;
let cartaoHome;
let criarPlan;
let criarPlanStep1;
let editarPlan;
let imageUpload;
let wizard;
let criarPlanStep2;
let editPlanStep1;
let editPlanStep2;
let painelAcoes;
let departamentoT;
let uploadFoto;
let department;
let registerCompany;
let login;
let pagesHeaderText;
let registerCompanyJX;
let registerPage;
let menu;
let criarTemplate;
let step1Template;
let calendario;
let editarTemplate;
let email;
let perfil;


let typeLanguage = String(type);

if (String(type) === "en") {
  // ##############################
  // ABAS
  // ##############################
  news = {
    placeholder: "",
    title: ""
  };

  meeting = {
    placeholder: "",
    title: ""
  };

  tabs = {
    painelMetas: "Goals Panel",
    swot: "SWOT",
    matrix: "MATRIX",
    actions: "ACTIONS"
  };

  // ##############################
  // SWOT 1
  // #############################
  swot1 = {
    aspectosInternos: "",
    aspectosExternos: "",
    infoAdicionar: "",
    name: 'name',
    details: 'details',
    source: 'source',
    source_name: 'source name',
    tags: 'tags',
  };

  // ##############################
  // Swot 1 box
  // #############################
  swotBox = {
    forcas: "Strengths",
    fraquezas: "Weaknesses",
    oportunidades: "Opportunities",
    ameacas: "Threats",
    forca: "Strength",
    fraqueza: "Weaknesse",
    oportunidade: "Opportunitie",
    ameaca: "Strength",
    adicionar: "Add "
  };

  // ##############################
  // Swot 1 PopupAspect
  // #############################
  swotPopupAspect = {
    camposMsg: "",
    campoMsgContinue: "",
    selecione: "",
    adicionar: "",
    tipo1: "",
    tipo2: "",
    detalhes1: "",
    detalhes2: "",
    nomeFonte1: "",
    nomeFonte2: "",
    linkFonte1: "",
    palavrasChaves1: "",
    palavrasChaves2: "",
    fonteInfo: "",
    forca: "",
    fraqueza: "",
    oportunidade: "",
    ameaca: "",
    fontSubtitle: "",
    descreva: "",
    link: "",
    palavrasChave: "",
    voltar: "",
    voltarAspectos: ""
  };

  // ##############################
  // Painel de metas
  // #############################
  painelMetasText = {
    textPlaceholder: "AS AÇÕES DESTA META APARECERÃO AQUI",
    metaDetails: "DETALHES DA META",
    chart: "Responsáveis pelas Ações",
    tituloGrafico: "PLAN EVOLUTION",
    tituloPainel: "GOAL PANEL",
    tituloTimeline: "TIMELINE",
    labelStatus: "STATUS",
    labelMeta: "GOAL",
    labelConclusao: "CONCLUSION",
    labelResponsavel: "RESPONSIBLE",
    labelData: "DATE",
    labelEditar: "EDIT",
    textCompletado: "COMPLETED",
    textConcluida: "CONCLUDED",
    textAcaoConcluida: "Action concluded",
    textPorcentagemAlterada: "Value changed for ",
    textComentario: "COMMENT",
    textProblema: "PROBLEM",
    textMarco: "MILESTONE",
    botaoVoltar: "BACK TO GOAL PANEL",
    responsavelMeta: "responsible for the goal",
    responsavelAcao: "responsible for the action",
    descricaoMeta: "goal description",
    inserirComentario: "INSERT A COMMENT",
    adicionarComentario: "Add comment",
    timelineMeta: "GOAL TIMELINE",
    usuario: "User: ",
    labelDepartamento: "Group",
    labelNAcoes: "Número de Ações",
    total: "ACTIONS",
    concluido: "CONCLUDED",
    chartTitle: "ADHERENCE GRAPH",
    temCerteza: "",
    sim: "",
    nao: "",
    info: "",
    cancelar: "",
    excluir: "",
    statusAcoes: "",
    deletedFor: "Deleted for",
    inicio: "Início",
    fim: "Fim",
    dateOrder: 'INVERT ORDER',
    filtro: 'FILTER',
    enviar: 'SEND',
    restaurar: 'RESTORE',
  };

  // ##############################
  //  Swot 2
  // #############################
  swot2 = {
    title: "",
    titleCruzamento: "",
    explicacaoCruzamento: "",
    botaoAdicionarCombinacao: "",
    diretrizD: "",
    diretrizR: "",
    diretrizC: "",
    diretrizE: "",
    objetivoEstrategico: "",
    desdobramentoEstrategico: "",
    aspectos: "",
    analise: "",
    buttonAdicionarCombinacao: "",
    titleDiretrizD: "",
    titleDiretrizR: "",
    titleDiretrizC: "",
    titleDiretrizE: "",
    explicacaoDiretrizD: "",
    explicacaoDiretrizR: "",
    explicacaoDiretrizC: "",
    explicacaoDiretrizE: "",
    subtitleDiretrizD: "",
    subtitleDiretrizR: "",
    subtitleDiretrizC: "",
    subtitleDiretrizE: "",
    baseDiretrizD: "",
    baseDiretrizR: "",
    baseDiretrizC: "",
    baseDiretrizE: ""
  };

  // ##############################
  //  Swot 2
  // #############################
  swot2 = {
    title: "",
    titleCruzamento: "",
    explicacaoCruzamento: "",
    botaoAdicionarCombinacao: "",
    diretrizD: "",
    diretrizR: "",
    diretrizC: "",
    diretrizE: "",
    objetivoEstrategico: "",
    desdobramentoEstrategico: "",
    aspectos: "",
    analise: "",
    buttonAdicionarCombinacao: "",
    titleDiretrizD: "",
    titleDiretrizR: "",
    titleDiretrizC: "",
    titleDiretrizE: "",
    explicacaoDiretrizD: "",
    explicacaoDiretrizR: "",
    explicacaoDiretrizC: "",
    explicacaoDiretrizE: "",
    subtitleDiretrizD: "",
    subtitleDiretrizR: "",
    subtitleDiretrizC: "",
    subtitleDiretrizE: "",
    baseDiretrizD: "",
    baseDiretrizR: "",
    baseDiretrizC: "",
    baseDiretrizE: ""
  };

  // ##############################
  //  matrix - grafico - swot 2
  // #############################
  swot2Matrix = {
    titleDiretrizD: "",
    titleDiretrizR: "",
    titleDiretrizC: "",
    titleDiretrizE: "",
    mover: "",
    bloquear: ""
  };

  // ##############################
  // swot 3
  // #############################
  swot3 = {
    atualizerObjetivo: "",
    popupAnalise: "",
    buttonNovoCruzamento: "",
    placeholderNomeCombinacao: "",
    placeholderAnalise: "",
    placeholderObjetivo: "",
    placeholderDesdobramento: "",
    diretrizD: "",
    diretrizR: "",
    diretrizC: "",
    diretrizE: "",
    titleDiretrizD: "",
    titleDiretrizR: "",
    titleDiretrizC: "",
    titleDiretrizE: "",
    forcas: "",
    fraquezas: "",
    oportunidades: "",
    ameacas: "",
    combinacaoSalva: "",
    prioridade1: "",
    prioridade2: " ",
    prioridade3: "",
    riscoMasc1: "",
    riscoMasc2: "",
    riscoMasc3: "",
    titleDefina: "",
    explicacaoAnalise: "",
    subExplicacaoAnalise1: "",
    subExplicacaoAnalise2: "",
    aspectos: "",
    combinacao: "",
    analise: "",
    objetivoEstrategico: "",
    desdobramentoEstrategico: "",
    textoPlaceholderCombinacao: ""
  };

  // ##############################
  //  actions1
  // #############################
  actions1 = {
    atencao: "",
    erroPillars: "",
    fechar: "",
    msgErrorSave: "",
    msgErrorMeta: "",
    escreva: "",
    atualizarMeta: "",
    adicionarMeta: "",
    nomeMeta: "",
    responsavel: "",
    dataInicio: "",
    dataFim: "",
    unidade: "",
    valorInicial: "",
    valorMeta: "",
    detalhesMeta: "",
    indicadores: "",
    responsavelGeral: "",
    aspectos: "",
    analise: "",
    objetivoEstrategico: "",
    desdobramentoEstrategico: "",
    prioridadeExc: "",
    alta: "",
    media: "",
    baixa: "",
    complexidadeExc: "",
    riscoImplementacao: "",
    recursosFinanceiros: "",
    impactoResultados: "",
    prazoImplantacao: "",
    curtissimo: "",
    curto: "",
    medio: "",
    medioLongo: "",
    longo: "",
    metasAcoes: "",
    explicacaoMetas: "",
    explicacaoSub: "",
    decisores: "",
    influenciadores: "",
    publicoImpactados: "",
    resultadosEsperados: "",
    selecioneAqui: "",
    selecioneObjetivoEstrategico: "Select a Strategic Objective",
    placeholderNomeAcao: "",
    placeholderDetalheMeta: "",
    selecoine: ""
  };

  // ##############################
  //  actions1 slect
  // #############################

  actions1Select = {
    selecioneResponsavel: ""
  };

  // ##############################
  //  actions1,2 e 3 guia de seleção de tela
  // #############################

  tabActions = {
    comVinculo: "",
    semVinculo: ""
  };

  // ##############################
  //  actions1,2 e 3 guia de seleção de tela
  // #############################

  actions1Box = {
    final: "",
    warnData: "",
    legendaPopupAcao: "",
    descricaoMetaBox: "",
    descricaoAcao: "",
    adicionarMeta: "",
    responsavel: "",
    dataInicio: "",
    dataTermino: "",
    unidade: "",
    valorInicial: "",
    valorMeta: "",
    detalhesMeta: "",
    adiconarAcao: "",
    detalhesAcao: "",
    selecione: "",
    placeholderNomeMeta: "",
    updateAcao: "",
    adicionarAcao: "",
    placeholderDetalhesAcao: ""
  };

  // ##############################
  //  actions 2
  // #############################

  actions2 = {
    adicionarMeta: "",
    determineAcao: "",
    adicionarMetas: "",
    responsavel: "",
    dataInicio: "",
    dataTermino: "",
    unidade: "",
    valorInicial: "",
    valorMeta: "",
    detalhesMeta: "",
    placeholderNomeMeta: ""
  };

  // ##############################
  // Home Plano
  // #############################

  homePlan = {
    criarPlan: "",
    adicionar: "ADD NEW PLAN",
    criarTemplate: "",
    titlePlanos: "Plans",
    templates: "Templates",
    admplans: "SONNE - MBI"
  };

  // ##############################
  // Home Plano - card
  // #############################

  cartaoHome = {
    abrirPlan: "Open plan",
    abrirTemplate: "Open template",
    editarPlan: "",
    excluirPlan: "",
    temCerteza: "",
    sim: "",
    nao: "",
    info: "",
    excluir: "",
    cancelar: ""
  };

  // ##############################
  // criar plano
  // #############################

  criarPlan = {
    criarPlan: "",
    criarPlanM: "",
    permissao: "",
    proximo: "",
    Finalizar: "",
    digiteInfo: "",
    voltar: ""
  };

  // ##############################
  // criar plano - step1
  // #############################

  criarPlanStep1 = {
    info: "",
    nomePlano: "",
    obrigatorio: "",
    empresa: "",
    selecioneSegmento: "",
    acessoriosPessoais: "",
    advocacia: "",
    agronegocio: "",
    alimenticio: "",
    animaisDomesticos: "",
    aparelhoConsumo: "",
    arquitetura: "",
    automotivo: "",
    aviacao: "",
    bebidasAlcoolicas: "",
    bebidasQuentes: "",
    beleza: "",
    brinquedosJogos: "",
    bensLuxo: "",
    canaisInstitucionais: "",
    casaJardim: "",
    comercio: "",
    consultoria: "",
    comidaEmbalada: "",
    comidaFresca: "",
    construçãoCivil: "",
    consumoEletronico: "",
    consumo: "",
    cosmeticos: "",
    cuidadoDomiciliario: "",
    cultural: "",
    educacional: "",
    embalagem: "",
    farmaceutica: "",
    finançasConsumidor: "",
    fornecimento: "",
    franquias: "",
    hoteleiro: "",
    instrumentos: "",
    incentivos: "",
    ingredientes: "",
    juridico: "",
    oculos: "",
    odontologia: "",
    petroquimica: "",
    orgaoPublico: "",
    refrigerantes: "",
    saude: "",
    seguro: "",
    servicos: "",
    tabaco: "",
    tecidoHigiene: "",
    tecnologia: "",
    varejo: "",
    vestuarioCalcado: "",
    viagem: "",
    outro: ""
  };

  // ##############################
  // upload de imagem do plano
  // #############################

  imageUpload = {
    addImagem: "",
    trocarImagem: "",
    legenda1: "",
    legenda2: ""
  };

  // ##############################
  // wizard - cadastro e editar plano
  // #############################

  wizard = {
    avancar: "",
    voltar: ""
  };

  // ##############################
  // criar plano - step2
  // #############################

  criarPlanStep2 = {
    cliquePessoas: ""
  };

  // ##############################
  // edit plano - step1
  // #############################

  editPlanStep1 = {
    info: "",
    nomePlano: "",
    obrigatorio: "",
    empresa: "",
    selecioneSegmento: "",
    acessoriosPessoais: "",
    advocacia: "",
    agronegocio: "",
    alimenticio: "",
    animaisDomesticos: "",
    aparelhoConsumo: "",
    arquitetura: "",
    automotivo: "",
    aviacao: "",
    bebidasAlcoolicas: "",
    bebidasQuentes: "",
    beleza: "",
    brinquedosJogos: "",
    bensLuxo: "",
    canaisInstitucionais: "",
    casaJardim: "",
    comercio: "",
    consultoria: "",
    comidaEmbalada: "",
    comidaFresca: "",
    construçãoCivil: "",
    consumoEletronico: "",
    consumo: "",
    cosmeticos: "",
    cuidadoDomiciliario: "",
    cultural: "",
    educacional: "",
    embalagem: "",
    farmaceutica: "",
    finançasConsumidor: "",
    fornecimento: "",
    franquias: "",
    hoteleiro: "",
    instrumentos: "",
    incentivos: "",
    ingredientes: "",
    juridico: "",
    oculos: "",
    odontologia: "",
    petroquimica: "",
    orgaoPublico: "",
    refrigerantes: "",
    saude: "",
    seguro: "",
    servicos: "",
    tabaco: "",
    tecidoHigiene: "",
    tecnologia: "",
    varejo: "",
    vestuarioCalcado: "",
    viagem: "",
    outro: ""
  };

  // ##############################
  // Editar plano
  // #############################

  editarPlan = {
    editarPlan: "",
    editarPlanM: "",
    permissao: "",
    proximo: "",
    Finalizar: "",
    digiteInfo: "",
    voltar: ""
  };

  // ##############################
  // Painel de ações
  // #############################

  painelAcoes = {
    botaoVoltar: "",
    plano: "",
    meta: "",
    responsavel: "",
    concluida: "",
    atrasado: "",
    atencao: "",
    prazo: "",
    concluidas: "",
    porcentagemAlterada: "",
    acaoConcluida: "",
    comentario: "",
    problema: "",
    marco: "",
    voltarPainel: "",
    completado: "",
    responsavelAcao: "",
    descicaoAcao: "",
    insiraComentario: "",
    timelineAcao: "",
    minhasAcoes: "",
    painelAcoes: "",
    calendario: "",
    iniciativa: "",
    homeUsuarios: "",
    adicionarComentario: "",
    deletedFor: "Deleted for"
  };

  // ##############################
  // Tela da empresa
  // #############################

  departamentoT = {
    permissao: "",
    emailNotValid: "",
    errorEmail: "",
    semDepartamento: "",
    crieDepartamento: "",
    editDepartamento: "",
    btCancelar: "",
    btSalvar: "",
    nome: "",
    cancelar: "",
    salvar: "",
    adicionarDepartamento: "",
    certezaDeletar: "",
    naoCancelar: "",
    simDeletar: "",
    certezaDeletarDp: "",
    adicionado: "",
    adicionadoSucesso: "",
    selecioneUsuario: "",
    confirmText: "",
    cancelarM: "",
    selectResponsavel: "",
    cadastrarUser: "",
    email: "",
    obrigatorio: "",
    cargo: "",
    cadastrar: "",
    editar: "",
    role: "",
    acoes: "",
    adicionarUsuario: "",
    deletarUser: "",
    deletarDepartamento: "",
    atualizarUser: "",
    adicionarUsuarioM: "",
    nameUser: "",
    emailUser: "",
    cargoUser: "",
    orgIdioma: "en",
    cadastrarCompany: "",
    segmento: "",
    funcionarios: "",
    faturamento: "",
    fonteInfo: "",
    fontSubtitle: ""
  };

  // ##############################
  // Upload de foto do usuario
  // #############################
  uploadFoto = {
    selectImage: ""
  };

  // ##############################
  // matrix\company\department.js
  // #############################
  department = {
    nome: "Nome",
    email: "Email",
    senha: "Senha",
    cargo: "Cargo",
    dataNacimento: "Data de Nacimento",
    graduacao: "Graduação",
    selectMasculino: "Masculino",
    selectFeminino: "Feminino",
    selectOutro: "Outro",
    cadastroUser: "Cadastro de Usuário"
  };

  // ##############################
  //  register Company
  // #############################

  registerCompany = {
    entreDados: "",
    nome: "",
    segment: "",
    faturamentoEmpresa: "",
    segmentoEmpresa: "",
    endereco: "",
    latitude: "",
    longitude: "",
    linkSite: "",
    lkEmpresa: "",
    cadastroEmpresa: "",
    obrigatorio: "",
    cadastrar: ""
  };

  // ##############################
  //  login
  // #############################
  login = {
    email: "",
    senha: "",
    btLogin: "",
    confSenha: "",
    btAlterarSenha: "",
    criarSenha: "",
    titleInfo: "",
    textInfo: "",
    btConf: "",
    msgAlterada: ""
  };

  // ##############################
  //  pages header - tela de login
  // #############################
  pagesHeaderText = {
    cadastrar: ""
  };

  // ##############################
  //
  // #############################
  registerCompanyJX = {
    cadastrarEmpresa: ""
  };

  // ##############################
  //  primeiro registro, tela de aceitação dos termos
  // #############################
  registerPage = {
    cadastrar: "",
    redesSociais: "",
    nome: "",
    email: "",
    senha: "",
    termos: "",
    linkTermos: "",
    btCadastrar: "",
    descricao: "",
  };

  // ##############################
  // menu
  // #############################
  menu = {
    empresa: "",
    planos: "",
    usuarios: "",
    reunioes: "",
    pacotes: "",
    pacoteFree: "",
    pacoteBasic: "",
    pacotePremium: "",
    homePlanos: "",
    dashboadMetas: "",
    swot1: "",
    swot2: "",
    swot3: "",
    orgchart: "",
    criarPlano: "",
    actions: "",
    editarPlano: "",
    dashboard: "",
    news: ""
  };

  //////////////////////////////////
  // Calendario
  //////////////////////////////////

  calendario = {
    allDay: "All day",
    previous: "Previous",
    next: "Next",
    today: "Today",
    month: "Month",
    week: "Week",
    day: "Day",
    agenda: "Agenda",
    date: "Date",
    time: "Time",
    event: "Event"
  };

  // ##############################
  // Editar tamplate
  // #############################

  editarTemplate = {
    criarPlan: "",
    criarPlanM: "",
    permissao: "",
    proximo: "",
    Finalizar: "",
    digiteInfo: "",
    voltar: ""
  };
}

// ##############################
// #############################
// #############################
// #############################
// #############################
// #############################
// #############################
// #############################
// #############################
// #############################
// #############################
// #############################
// #############################
// #############################
// #############################
// #############################
else {
  news = {
    placeholder: "AS NOTÍCIAS SALVAS APARECERÃO AQUI",
    title: "NOTÍCIAS",
    btAdd: "ADICIONAR NOTÍCIA",
    btBack: "VOLTAR PARA NOTÍCIAS",
    simpleAdd: {
      title: "ADICIONAR NOTÍCIA"
    },
    sessao: {
      outras: "OUTRAS NOTÍCIAS",
      destaques: "PRINCIPAIS DESTAQUES",
      colaboradores: "RADAR",
      rss: "OUTRAS FONTES",
    }
  };

  meeting = {
    placeholder: "PAINEL DE REUNIÕES",
    title: "REUNIÕES"
  };

  // ##############################
  // ABAS
  // ##############################

  tabs = {
    painelMetas: "Painel de Metas",
    swot: "SWOT",
    matrix: "MATRIX",
    actions: "ACTIONS"
  };

  // ##############################
  // Components
  // #############################
  BtWindowBack = {
    noticeDetail: "VOLTAR PARA NOTÍCIAS"
  };

  // ##############################
  // Painel de metas
  // #############################
  painelMetasText = {
    inicio: "Início",
    fim: "Fim",
    ragePlaceholder: "Insira um valor para o slider",
    textPlaceholder: "AS AÇÕES DESTA META APARECERÃO AQUI",
    metaDetails: "DETALHES DA META",
    chart: "RESPONSÁVEIS PELAS AÇÕES",
    tituloGrafico: "EVOLUÇÃO DO PLANO",
    tituloPainel: "PAINEL DE METAS",
    tituloTimeline: "LINHA DO TEMPO",
    labelStatus: "STATUS",
    labelMeta: "META",
    labelConclusao: "CONCLUSÃO",
    labelResponsavel: "RESPONSÁVEL",
    labelData: "DATA",
    labelEditar: "EDITAR",
    textCompletado: "COMPLETADO",
    textConcluida: "CONCLUIDA",
    textAcaoConcluida: "Ação concluida",
    textPorcentagemAlterada: "Valor alterado para ",
    textComentario: "COMENTÁRIO",
    textProblema: "PROBLEMA",
    textMarco: "MARCO",
    botaoVoltar: "VOLTAR PARA PAINEL DE METAS",
    responsavelMeta: "responsável pela meta",
    responsavelAcao: "responsável pela ação",
    descricaoMeta: "DESCRIÇÃO DA META",
    inserirComentario: "INSIRA UM COMENTÁRIO",
    adicionarComentario: "Adicionar comentário",
    timelineMeta: "TIMELINE DA META",
    usuario: "Usuario: ",
    labelDepartamento: "Grupo",
    labelNAcoes: "Número de Ações",
    total: "AÇÕES NO TOTAL",
    concluido: "CONCLUÍDAS",
    chartTitle: "GRÁFICO DE ADERÊNCIA",
    temCerteza: "Você tem certeza?",
    sim: "Sim, exclua!",
    nao: "Cancelar",
    info:
      "A meta será apagada assim como todas as ações e marcos associados a ela!",
    excluir: "EXCLUIR",
    cancelar: "CANCELAR",
    statusAcoes: "STATUS AÇÕES",
    deletedFor: "Deletado por",
    dateOrder: 'INVERTER ORDEM',
    filtro: 'FILTROS',
    enviar: 'ENVIAR',
    restaurar: 'RESTAURAR',
  };

  // ##############################
  // SWOT 1
  // #############################
  swot1 = {
    aspectosInternos: "ASPECTOS INTERNOS",
    aspectosExternos: "ASPECTOS EXTERNOS",
    infoAdicionar:
      "Clique em '+' e adicione elementos em cada quadrante da SWOT",
    name: 'nome',
    details: 'detalhes',
    source: 'fonte',
    source_name: 'nome da fonte',
    tags: 'tags',
  };

  // ##############################
  //  Swot 1 box
  // #############################
  swotBox = {
    forcas: "Forças",
    fraquezas: "Fraquezas",
    oportunidades: "Oportunidades",
    ameacas: "Ameaças",
    forca: "força",
    fraqueza: "fraqueza",
    oportunidade: "oportunidade",
    ameaca: "ameaça",
    adicionar: "Adicionar "
  };

  // ##############################
  // Swot 1 PopupAspect
  // #############################
  swotPopupAspect = {
    editar: "Editar",
    adicionar: "Adicionar",
    tipo1: "Insira uma",
    tipo2: "de sua empresa (ex: localização)",
    detalhes1: "Descreva mais detalhes sobre a",
    detalhes2: "a ser inserida",
    nomeFonte1: "Nome da fonte de informação da",
    nomeFonte2: "inserida (ex: pesquisa/estudo de mercado)",
    linkFonte1: "Se possível insira o link ou enderço da fonte (URL)",
    palavrasChaves1: "Insira palavras chave que facilitem a buscar desta ",
    palavrasChaves2:
      "futuramente separando por virgula (ex: local, localidade, etc.)",
    fonteInfo: "FONTE DE INFORMAÇÃO",
    fontSubtitle:
      "adicione arquivos aqui, ou preencha o link para fonte no campo ao lado",
    forca: " força ",
    fraqueza: " fraqueza ",
    oportunidade: " oportunidade ",
    ameaca: " ameaça ",
    selecione: "Selecione o aspecto que deseja adicionar",
    camposMsg: "Atribua um nome e preencha os detalhes desse aspecto",
    campoMsgContinue: " para a SWOT",
    descreva: "Descreva a fonte de informação (ex: pesquisa/estudo de mercado)",
    link: "Link do endereço da fonte (URL)",
    palavrasChave: "Palavras-chave (ex: localidade, localização)",
    voltar: "VOLTAR",
    voltarAspectos: "VOLTAR PARA ASPECTOS"
  };

  // ##############################
  //  Swot 2
  // #############################
  swot2 = {
    title: "Editar Cruzamento",
    titleCruzamento: "Qual cruzamento deseja analisar?",
    explicacaoCruzamento:
      "Selecione uma das combinações abaixo para iniciar o cruzamento dos componentes.",
    botaoAdicionarCombinacao: "ADICIONAR COMBINAÇÃO",
    diretrizD: "DIRETRIZES D",
    diretrizR: "DIRETRIZES R",
    diretrizC: "DIRETRIZES C",
    diretrizE: "DIRETRIZES E",
    objetivoEstrategico: "OBJETIVO ESTRATÉGICO",
    desdobramentoEstrategico: "DESDOBRAMENTO ESTRATÉGICO",
    aspectos: "ASPECTOS",
    analise: "ANALISE",
    buttonAdicionarCombinacao: "ADICIONAR COMBINAÇÃO",
    titleDiretrizD: "DIRETRIZES D",
    titleDiretrizR: "DIRETRIZES R",
    titleDiretrizC: "DIRETRIZES C",
    titleDiretrizE: "DIRETRIZES E",
    explicacaoDiretrizD: "Desenvolver, Desfazer, Distinguir",
    explicacaoDiretrizR: "Replicar, Reforçar, Reinventar",
    explicacaoDiretrizC: "Criar, Cultivar, Comprar",
    explicacaoDiretrizE: "Eliminar, Extinguir, Excluir",
    subtitleDiretrizD: "FORÇAS+AMEAÇAS",
    subtitleDiretrizR: "FORÇAS+OPORTUNIDADES",
    subtitleDiretrizC: "FRAQUEZAS+OPORTUNIDADES",
    subtitleDiretrizE: "FRAQUEZAS+AMEAÇAS",
    baseDiretrizD:
      "Recomenda-se desenvolver, desfazer ou distinguir algo para diminuir o impacto que uma ameaça possa ter ao negócio.",
    baseDiretrizR:
      "Recomenda-se replicar, reforçar ou reinventar algo para que seja possível aproveitar a oportunidade de mercado.",
    baseDiretrizC:
      "Recomenda-se criar, cultivar ou comprar algo para que seja possível aproveitar a oportunidade de mercado.",
    baseDiretrizE:
      "Recomenda-se eliminar, extinguir ou excluir algo para diminuir o impacto que uma ameaça possa ter ao negócio."
  };

  // ##############################
  //  matrix - grafico - swot 2
  // #############################
  swot2Matrix = {
    titleDiretrizD: "DIRETRIZES D",
    titleDiretrizR: "DIRETRIZES R",
    titleDiretrizC: "DIRETRIZES C",
    titleDiretrizE: "DIRETRIZES E",
    mover: "MOVER",
    bloquear: "BLOQUEAR"
  };

  // ##############################
  // swot 3
  // #############################
  swot3 = {
    atualizerObjetivo: "ATUALIZAR OBJETIVO",
    popupAnalise: "ANALISE",
    buttonNovoCruzamento: "NOVO CRUZAMENTO",
    placeholderNomeCombinacao: "Nome da combinação",
    placeholderAnalise: "Análise",
    placeholderObjetivo: "Objetivo estratégico",
    placeholderDesdobramento: "Desdobramento estratégico",
    diretrizD: "D-",
    diretrizR: "R-",
    diretrizC: "C-",
    diretrizE: "E-",
    titleDiretrizD: "DIRETRIZES D - DESENVOLVER, DESFAZER, DISTINGUIR.",
    titleDiretrizR: "DIRETRIZES R - REPLICAR, REFORÇAR, REINVENTAR.",
    titleDiretrizC: "DIRETRIZES C - CRIAR, CULTIVAR, COMPRAR.",
    titleDiretrizE: "DIRETRIZES E - ELIMINAR, EXTINGUIR, EXCLUIR.",
    forcas: "FORÇAS",
    fraquezas: "FRAQUEZAS",
    oportunidades: "OPORTUNIDADES",
    ameacas: "AMEAÇAS",
    combinacaoSalva: "Combinações salvas",
    prioridade1: "Alta",
    prioridade2: "Média",
    prioridade3: "Baixa",
    riscoMasc1: "ALTO",
    riscoMas2: "MÉDIO",
    ricoMasc3: "BAIXO",
    titleDefina: "Defina a prioridade:",
    explicacaoAnalise: "Analise os elementos que você combinou",
    subExplicacaoAnalise1:
      "Selecione as combinações, arraste-as para o campo e reflita sobre cada cruzamento.",
    subExplicacaoAnalise2:
      "Clique duas vezes em um atributo para visualizar e/ou alterar os detalhes.",
    aspectos: "ASPECTOS",
    combinacao: "COMBINAÇÃO",
    analise: "ANÁLISE",
    objetivoEstrategico: "OBJETIVO ESTRATÉGICO",
    desdobramentoEstrategico: "DESDOBRAMENTO ESTRATÉGICO",
    textoPlaceholderCombinacao: "Arraste para este quadro suas "
  };

  // ##############################
  //  actions1
  // #############################
  actions1 = {
    atencao: "ATENÇÃO",
    erroPillars:
      "Por favor, selecione uma combinação ou crie uma iniciativa para continuar",
    fechar: "FECHAR",
    msgErrorSave:
      "Por favor selecione uma combinação ou preencha o campo de iniciativa para criar uma nova.",
    msgErrorMeta:
      "Pro favor, selecione uma combinação ou crie uma iniciativa, para criar uma meta.",
    escreva: "Digite aqui",
    numerico: "NUMÉRICO",
    monetario: "MONETÁRIO",
    porcentagem: "PORCENTAGEM",
    tarefa: "TAREFA",
    explicacaoMeta:
      "Crie metas e ações mensuráveis que serão necessárias para alcançar o objetivo estratégico definido",
    explicacao:
      "Defina ações, metas e indicadores para os objetivos estratégicos definidos",
    selecioneMedida: "Selecione uma Medida",
    unidadeMedida: [
      "ENTIDADE",
      "PESSOA",
      "DINHEIRO",
      "UNIDADE",
      "VALOR",
      "PORCENTAGEM"
    ],
    selecione: "SELECIONE",
    atualizarMeta: "ATUALIZAR META",
    nomeMeta: "NOME DA META",
    adicionarMeta: "ADICIONAR META",
    responsavel: "RESPONSÁVEL",
    dataInicio: "DATA DE INÍCIO",
    dataFim: "DATA DE TÉRMINO",
    unidade: "UNIDADE",
    valorInicial: "UNIDADE INICIAL",
    valorMeta: "META PARA UNIDADE",
    detalhesMeta: "DETALHES DA META",
    indicadores: "INDICADORES",
    responsavelGeral: "RESPONSÁVEL GERAL",
    aspectos: "ASPECTOS",
    analise: "ANALISE",
    objetivoEstrategico: "OBJETIVO ESTRATÉGICO",
    desdobramentoEstrategico: "DESDOBRAMENTO ESTRATÉGICO",
    prioridadeExc: "PRIORIDADE",
    alta: "ALTA",
    media: "MÉDIA",
    baixa: "BAIXA",
    riscoMasc1: "ALTO",
    riscoMasc2: "MÉDIO",
    riscoMasc3: "BAIXO",
    complexidadeExc: "COMPLEXIDADE",
    riscoImplementacao: "RISCO",
    recursosFinanceiros: "RECURSOS",
    impactoResultados: "IMPACTO",
    prazoImplantacao: "PRAZO",
    curtissimo: "CURTISSIMO",
    curto: "CURTO",
    medio: "MÉDIO",
    medioLongo: "MÉDIO/LONGO",
    longo: "LONGO",
    metasAcoes: "METAS E AÇÕES",
    explicacaoMetas:
      "Determine as metas e ações necessárias para cumorir o seu planejamento estratégico",
    explicacaoSub:
      "Determine as metas e ações necessárias para cumorir o seu planejamento estratégico",
    decisores: "DECISORES",
    influenciadores: "INFLUENCIADORES",
    publicoImpactados: "ÁREAS",
    resultadosEsperados: "IMPACTO DESEJADO",
    selecioneAqui: "Selecione aqui",
    selecioneObjetivoEstrategico: "Selecione o objetivo estratégico",
    placeholderNomeAcao: "Nome da ação",
    placeholderDetalheMeta: "Detalhe a meta",
    analisePlace: "Digite sua análise ou selecione o objetivo estratégico.",
    analiseTitle: "Digite aqui o nome do Objetivo Estratégico",
    objetivoPlac:
      "Digite seu objetivo estratégico ou selecione sua iniciativa.",
    perguntaExcluir: "Deseja realmente excluir a iniciativa?",
    confirmExcluir: "Excuir",
    cancelExcluir: "Cancel"
  };

  // ##############################
  //  actions1 slect
  // #############################
  actions1Select = {
    selecioneResponsavel: "Selecione um responsavel"
  };

  // ##############################
  //  actions1,2 e 3 guia de seleção de tela
  // #############################

  tabActions = {
    comVinculo: "COM VÍNCULO",
    semVinculo: "SEM VÍNCULO"
  };

  // ##############################
  //  actions1,2 e 3 guia de seleção de tela
  // #############################

  actions1Box = {
    final: "VALOR FINAL",
    warnData:
      "AVISO: Esta ação tem uma data de término maior do que a da meta:",
    legendaPopupAcao: "Edite as datas ou escolha um período pré-determinado.",
    descricaoMetaBox: "DETALHES DA META: ",
    descricaoAcao: "DETALHES DA ação",
    adicionarMeta: "ADICIONAR META",
    responsavel: "RESPONSÁVEL",
    dataInicio: "DATA DE INÍCIO",
    dataTermino: "DATA DE TÉRMINO",
    unidade: "UNIDADE",
    valorInicial: "VALOR INICIAL",
    valorMeta: "VALOR DA META",
    detalhesMeta: "DETALHES DA META",
    adiconarAcao: "NOME DA AÇÃO",
    detalhesAcao: "DETALHES DA AÇÃO",
    placeholderDetalhesAcao: "Detalhes da Ação",
    selecione: "Selecione aqui",
    placeholderNomeMeta: "nome da meta",
    updateAcao: "ATUALIZAR AÇÃO",
    adicionarAcao: "ADICIONAR AÇÃO"
  };

  // ##############################
  //  actions 2
  // #############################

  actions2 = {
    adicionarMeta: "METAS E AÇÕES",
    determineAcao:
      "Determine as metas e ações necessárias para cumorir o seu planejamento estratégico",
    adicionarMetas: "ADICIONAR META",
    responsavel: "RESPONSÁVEL",
    dataInicio: "DATA DE INÍCIO",
    dataTermino: "DATA DE TÉRMINO",
    unidade: "UNIDADE",
    valorInicial: "VALOR INICIAL",
    valorMeta: "VALOR DA META",
    detalhesMeta: "DETALHES DA META",
    placeholderNomeMeta: "nome da meta"
  };

  // ##############################
  // Home Plano
  // #############################

  homePlan = {
    criarPlan: "CRIAR NOVO PLANO",
    criarTemplate: "ADICIONAR NOVO MODELO",
    titlePlanos: "Planos",
    templates: "Meus Modelos",
    adicionar: "ADICIONAR NOVO PLANO",
    admplans: "SONNE - MBI",
    plansPublicoAdicionar: "ADICIONAR NOVO MODELO",
    plansPublico: "MODELOS PÚBLICOS",
    plansCompartilhado: "PLANOS COMPARTILHADOS COMIGO"
  };

  // ##############################
  // Home Plano - card
  // #############################

  cartaoHome = {
    abrirPlan: "Abrir plano",
    abrirTemplate: "Abrir modelo",
    editarPlan: "Editar",
    excluirPlan: "Excluir",
    temCerteza: "Você tem certeza?",
    sim: "Sim, exclua!",
    nao: "Cancelar",
    info: "Você não poderá recuperar o plano!",
    excluir: "CONFIRMAR",
    cancelar: "CANCELAR",
    duplicarPlano: "Duplicar plano",
    transformTemplate: "Transformar em template",
    transformTemplatePublico: "Transformar em template público",
    transformPlan: "Transformar em plano"
  };

  // ##############################
  // criar plano
  // #############################

  criarPlan = {
    criarPlan: "Criar Plano",
    criarPlanM: "CRIAR PLANO",
    permissao: "Permissões",
    proximo: "Próximo",
    Finalizar: "Finalizar",
    digiteInfo: "Digite suas informações",
    voltar: "voltar"
  };

  // ##############################
  // criar plano - step1
  // #############################

  criarPlanStep1 = {
    info: "Vamos começar com informações básicas do plano.",
    nomePlano: "Nome do plano",
    obrigatorio: " (Obrigatório)",
    empresa: "Empresa",
    selecioneSegmento: "Selecione o segmento",
    acessoriosPessoais: "Acessórios Pessoais",
    advocacia: "Advocacia",
    agronegocio: "Agronegocio",
    alimenticio: "Alimentício",
    animaisDomesticos: "Animais Domésticos",
    aparelhoConsumo: "Aparelhos de Consumo",
    arquitetura: "Arquitetura",
    automotivo: "Automotivo",
    aviacao: "Aviação",
    bebidasAlcoolicas: "Bebidas Alcoólicas",
    bebidasQuentes: "Bebidas Quentes",
    beleza: "Beleza",
    brinquedosJogos: "Brinquedos e Jogos",
    bensLuxo: "Bens de Luxo",
    canaisInstitucionais: "Canais Institucionais",
    casaJardim: "Casa e Jardim",
    comercio: "Comércio",
    consultoria: "Consultoria",
    comidaEmbalada: "Comida Embalada",
    comidaFresca: "Comida Fresca",
    construçãoCivil: "Construção Civil",
    consumoEletronico: "Consumo Eletrônico",
    consumo: "Consumo Saúde",
    cosmeticos: "Cosméticos",
    cuidadoDomiciliario: "Cuidado Domiciliário",
    cultural: "Cultural",
    educacional: "Educacional",
    embalagem: "Embalagem",
    farmaceutica: "Farmacêutica",
    finançasConsumidor: "Finanças do Consumidor",
    fornecimento: "Fornecimento",
    franquias: "Franquias",
    hoteleiro: "Hoteleiro",
    instrumentos: "Instrumentos",
    incentivos: "Incentivos",
    ingredientes: "Ingredientes",
    juridico: "Jurídico",
    oculos: "Óculos",
    odontologia: "Odontologia",
    petroquimica: "Petroquímica",
    orgaoPublico: "Órgão Público",
    refrigerantes: "Refrigerantes",
    saude: "Saúde",
    seguro: "Seguros",
    servicos: "Serviços",
    tabaco: "Tabaco",
    tecidoHigiene: "Tecido e Higiene",
    tecnologia: "Tecnologia",
    varejo: "Varejo",
    vestuarioCalcado: "Vestuário e Calçado",
    viagem: "Viagem",
    outro: "Outro",
    selecioneEmpresa: "Selecione a empresa",
    addImagem: "SELECIONAR",
    trocarImagem: "SELECIONAR",
    legenda1: "Tamanho preferencial: 500 X 340px",
    legenda2: "Tamanho preferencial: 150 X 150px"
  };

  // ##############################
  // upload de imagem do plano
  // #############################

  imageUpload = {
    addImagem: "SELECIONAR",
    trocarImagem: "SELECIONAR",
    legenda1: "Tamanho preferencial: 500 X 340px",
    legenda2: "Tamanho preferencial: 150 X 150px",
    salvar: "SALVAR",
    cancelar: "CANCELAR"
  };

  // ##############################
  // wizard - cadastro e editar plano
  // #############################
  wizard = {
    avancar: "PRÓXIMO",
    voltar: "VOLTAR"
  };

  // ##############################
  // criar plano - step2
  // #############################

  criarPlanStep2 = {
    cliquePessoas: "Clique na pessoas que deseja dar permissão.",
    cliquePessoasC:
      "Selecione os usuários dos grupos selecionads o clique em 'COMPARTILHAR PLANO' para convidar pessoas externas",
    btEnviar: "SALVAR",
    btCancelar: "CANCELAR",
    placeholderNome: "Nome",
    placeholderEmail: "E-mail",
    titleConvidar: "COMPARTILHAR PLANO",
    placeholderSelect: "Filtrar por grupo",
    noOptions: "",
    infoCompartilhar: "Digite o nome e o e-mail para compartilhar o plano",
    titlePermission: "PERMISSÕES DO USUÁRIO",
    infoPermission: "Este usuário pode:",
    visualizar: "Visualizar plano",
    deletar: "Excluir itens",
    editar: "Editar itens",
    delegar: "Delegar",
    obrigatorio: " (Obrigatório)",
    apagarPlan: "Excluir plano",
    editarAcoes: "Editar Ações"
  };

  // ##############################
  // editar plano - step1
  // #############################

  editPlanStep1 = {
    info: "Edite as informações básicas do plano.",
    nomePlano: "Nome do plano",
    obrigatorio: " (Obrigatório)",
    empresa: "Empresa",
    selecioneSegmento: "Selecione o segmento",
    acessoriosPessoais: "Acessórios Pessoais",
    advocacia: "Advocacia",
    agronegocio: "Agronegocio",
    alimenticio: "Alimentício",
    animaisDomesticos: "Animais Domésticos",
    aparelhoConsumo: "Aparelhos de Consumo",
    arquitetura: "Arquitetura",
    automotivo: "Automotivo",
    aviacao: "Aviação",
    bebidasAlcoolicas: "Bebidas Alcoólicas",
    bebidasQuentes: "Bebidas Quentes",
    beleza: "Beleza",
    brinquedosJogos: "Brinquedos e Jogos",
    bensLuxo: "Bens de Luxo",
    canaisInstitucionais: "Canais Institucionais",
    casaJardim: "Casa e Jardim",
    comercio: "Comércio",
    consultoria: "Consultoria",
    comidaEmbalada: "Comida Embalada",
    comidaFresca: "Comida Fresca",
    construçãoCivil: "Construção Civil",
    consumoEletronico: "Consumo Eletrônico",
    consumo: "Consumo Saúde",
    cosmeticos: "Cosméticos",
    cuidadoDomiciliario: "Cuidado Domiciliário",
    cultural: "Cultural",
    educacional: "Educacional",
    embalagem: "Embalagem",
    farmaceutica: "Farmacêutica",
    finançasConsumidor: "Finanças do Consumidor",
    fornecimento: "Fornecimento",
    franquias: "Franquias",
    hoteleiro: "Hoteleiro",
    instrumentos: "Instrumentos",
    incentivos: "Incentivos",
    ingredientes: "Ingredientes",
    juridico: "Jurídico",
    oculos: "Óculos",
    odontologia: "Odontologia",
    petroquimica: "Petroquímica",
    orgaoPublico: "Órgão Público",
    refrigerantes: "Refrigerantes",
    saude: "Saúde",
    seguro: "Seguros",
    servicos: "Serviços",
    tabaco: "Tabaco",
    tecidoHigiene: "Tecido e Higiene",
    tecnologia: "Tecnologia",
    varejo: "Varejo",
    vestuarioCalcado: "Vestuário e Calçado",
    viagem: "Viagem",
    outro: "Outro",
    legenda1: "Tamanho preferencial: 500 X 340px",
    legenda2: "Tamanho preferencial: 150 X 150px",
    trocarImagem: "SELECIONE"
  };

  // ##############################
  // Editar plano
  // #############################

  editarPlan = {
    editarPlan: "Editar Plano",
    editarPlanM: "EDITAR PLANO",
    permissao: "Permissões",
    proximo: "Próximo",
    Finalizar: "Finalizar",
    digiteInfo: "Digite suas informações",
    voltar: "voltar"
  };

  // ##############################
  // Painel de ações
  // #############################

  painelAcoes = {
    textEmpty: "AS AÇÕES APARECERÃO AQUI",
    botaoVoltar: "VOLTAR PARA O PAINEL DE USUÁRIO",
    plano: "Plano",
    meta: "Meta",
    responsavel: "Responsavel",
    concluida: "CONCLUÍDA",
    atrasado: "ATRASADO",
    atencao: "ATENÇÃO",
    prazo: "NO PRAZO",
    concluidas: "CONCLUÍDAS",
    porcentagemAlterada: "Porcentagem alterada para ",
    acaoConcluida: "Ação concluida",
    comentario: "COMENTÁRIO",
    problema: "PROBLEMA",
    marco: "Marco",
    voltarPainel: "VOLTAR PARA PAINEL DE AÇÕES",
    completado: "COMPLETADO",
    responsavelAcao: "responsável pela ação",
    descicaoAcao: "DETALHES DA AÇÃO",
    insiraComentario: "INSIRA UM COMENTÁRIO",
    timelineAcao: "TIMELINE DA AÇÃO",
    minhasAcoes: "Minhas ações",
    painelAcoes: "PAINEL DE AÇÕES",
    calendario: "CALENDARIO",
    homeUsuarios: "Home Usuários",
    adicionarComentario: "Adicionar comentário",
    deletedFor: "Deletado por",
    iniciativa: "Iniciativa",
  };

  // ##############################
  // Tela da empresa
  // #############################

  departamentoT = {
    atencao: "Atenção",
    msgAtencao: "Tem certeza que deseja deletar esta empresa? ",
    msgAtencaoUser: "Tem certeza que deseja deletar este Usuário? ",
    msgAtencaoDep: "Tem certeza que deseja deletar este Grupo? ",
    permissao: "Permissões do usuário",
    emailNotValid: "Pro favor, insira um e-mail válido.",
    errorEmail: "Este email já esta cadastrado no nosso sistema.",
    editDepartamento: "Editar grupo",
    editEmpresa: "Editar empresa",
    semDepartamento: "Sem grupo",
    crieDepartamento: "ADICIONAR GRUPO",
    addEmpresa: "Adicionar Empresa",
    btCancelar: "Cancelar",
    btSalvar: "Salvar",
    nome: "Nome ",
    cancelar: "CANCELAR",
    salvar: "SALVAR",
    adicionarDepartamento: "ADICIONAR GRUPO",
    certezaDeletar: "Tem certeza que deseja deletar esse usuário?",
    naoCancelar: "NÃO, CANCELAR",
    simDeletar: "DELETAR",
    certezaDeletarDp: "Deseja realmente deletar esse grupo?",
    adicionado: "ADICIONADO!",
    adicionadoSucesso: "Adicionado com sucesso!",
    selecioneUsuario: "Selecione um usuário.",
    confirmText: "Sim, adicionar!",
    cancelarM: "Cancelar",
    selectResponsavel: "Selecione o responsavel",
    cadastrarUser: "Adicionar usuário",
    cadastrarEditar: "Editar usuário",
    email: "Email ",
    obrigatorio: " (Obrigatório)",
    cargo: "Cargo",
    cadastrar: "SALVAR",
    editar: "SALVAR",
    role: "Role",
    acoes: "Ações",
    adicionarUsuario: "ADICIONAR USUÁRIO",
    deletarUser: "Deletar Usuário?",
    deletarDepartamento: "Deletar Grupo?",
    atualizarUser: "Atualizar usuário",
    adicionarUsuarioM: "Adicionar Usuário",
    nameUser: "Nome do usuário",
    emailUser: "E-mail do usuário",
    cargoUser: "Cargo do usuário",
    orgIdioma: "pt-br",
    cadastrarCompany: "Adicionar Empresa",
    segmento: "Segmento da empresa",
    funcionarios: "Número de funcionários",
    faturamento: "Faturamento da empresa",
    fonteInfo: "AS EMPRESAS, GRUPOS",
    fontSubtitle: "E COLABORADORES APARECERÃO AQUI"
  };

  // ##############################
  // Upload de foto do usuario
  // #############################

  uploadFoto = {
    selectImage: "SELECIONAR"
  };

  // ##############################
  //  matrix\company\department.js
  // #############################

  department = {
    nome: "Nome",
    email: "Email",
    senha: "Senha",
    cargo: "Cargo",
    dataNacimento: "Data de Nacimento",
    graduacao: "Graduação",
    selectMasculino: "Masculino",
    selectFeminino: "Feminino",
    selectOutro: "Outro",
    cadastroUser: "Cadastro de Usuário"
  };

  // ##############################
  //  register Company
  // #############################

  registerCompany = {
    entreDados: "Entre com os dados da sua empresa",
    nome: "Nome da empresa",
    segment: "Segmento",
    faturamentoEmpresa: "Faturamento da empresa",
    segmentoEmpresa: "Segmento da empresa",
    endereco: "Endereço",
    latitude: "Latitude",
    longitude: "Longitude",
    linkSite: "Link do site da empresa",
    lkEmpresa: "Linkedin da empresa",
    cadastroEmpresa: "Cadastro de empresas",
    obrigatorio: "(obrigatório)",
    cadastrar: "Cadastrar"
  };

  // ##############################
  //  login
  // #############################
  login = {
    email: "Email",
    senha: "Senha",
    btLogin: "LOGIN",
    confSenha: "Confirme a senha",
    btAlterarSenha: "CRIAR SENHA",
    criarSenha: "Crie uma nova senha",
    titleInfo: "MATRIX OF SWOT ANALYSIS",
    textInfo:
      "Bem-vindo à MATRIX OF SWOT ANALYSIS, para começar você precisa criar uma senha de no mínimo 6 dígitos, contendo no mínimo um número, uma letra maiúscula e uma minuscula",
    btConf: "OK",
    btConfOK: "OK",
    errorIguais: "As senhas não são iguais",
    errorDigitos: "A senha não contém 6 digitos",
    msgAlterada:
      "Senha alterada com sucesso! Clique no botão abaixo para fazer login",
    errorRequisitos: "A senha deve ter no mínimo um número, uma letra maiúscula e uma minuscula",
  };

  // ##############################
  //  email
  // #############################
  email = {
    email: "Email",
    titleInfo: "MATRIX OF SWOT ANALYSIS",
    textInfo:
      "Para redifinir sua senha digite seu email cadastrado no sistema.",
    btConf: "Ok",
    btEnviar: "Enviar",
    msgAlterada: "Verifique seu e-mail para cadastar uma nova senha."
  };

  // ##############################
  //  pages header - tela de login
  // #############################
  pagesHeaderText = {
    cadastrar: "CADASTRAR"
  };

  // ##############################
  //
  // #############################
  registerCompanyJX = {
    cadastrarEmpresa: "Cadastre sua empresa"
  };

  // ##############################
  //  primeiro registro, tela de aceitação dos termos
  // #############################
  registerPage = {
    cadastrar: "CADASTRO",
    redesSociais: "Redes Sociais",
    nome: "Nome",
    email: "Email",
    senha: "Senha",
    termos: "Eu li, e concordo com",
    linkTermos: "os termos e condições",
    btCadastrar: "CADASTRAR",
    descricao: "Preencha os campos abaixo para cadastrar-se"
  };

  // ##############################
  // menu
  // #############################
  menu = {
    empresa: "Empresas",
    planos: "Planos",
    usuarios: "Usuário",
    reunioes: "Reuniões",
    pacotes: "Pacotes",
    pacoteFree: "Pacote Free",
    pacoteBasic: "Pacote Basic",
    pacotePremium: "Pacote Premium",
    homePlanos: "Home Planos",
    dashboadMetas: "Dashboard Metas",
    swot1: "Swot1",
    swot2: "Swot2",
    swot3: "Swot3",
    orgchart: "Orgchart",
    criarPlano: "Criar Plano",
    actions: "Actions",
    editarPlano: "Editar Plano",
    dashboard: "Dashboard",
    criarTemplate: "Criar Template",
    news: "Noticias"
  };

  // ##############################
  // step1 Tamplate
  // #############################
  step1Template = {
    info: "Vamos começar com informações básicas do plano.",
    nomePlano: "Nome do plano",
    obrigatorio: "(obrigatório)",
    empresa: "Empresa",
    selecioneSegmento: "Selecione o segmento",
    acessoriosPessoais: "Acessórios Pessoais",
    advocacia: "Advocacia",
    agronegocio: "Agronegocio",
    alimenticio: "Alimentício",
    animaisDomesticos: "Animais Domésticos",
    aparelhoConsumo: "Aparelhos de Consumo",
    arquitetura: "Arquitetura",
    automotivo: "Automotivo",
    aviacao: "Aviação",
    bebidasAlcoolicas: "Bebidas Alcoólicas",
    bebidasQuentes: "Bebidas Quentes",
    beleza: "Beleza",
    brinquedosJogos: "Brinquedos e Jogos",
    bensLuxo: "Bens de Luxo",
    canaisInstitucionais: "Canais Institucionais",
    casaJardim: "Casa e Jardim",
    comercio: "Comércio",
    consultoria: "Consultoria",
    comidaEmbalada: "Comida Embalada",
    comidaFresca: "Comida Fresca",
    construçãoCivil: "Construção Civil",
    consumoEletronico: "Consumo Eletrônico",
    consumo: "Consumo Saúde",
    cosmeticos: "Cosméticos",
    cuidadoDomiciliario: "Cuidado Domiciliário",
    cultural: "Cultural",
    educacional: "Educacional",
    embalagem: "Embalagem",
    farmaceutica: "Farmacêutica",
    finançasConsumidor: "Finanças do Consumidor",
    fornecimento: "Fornecimento",
    franquias: "Franquias",
    hoteleiro: "Hoteleiro",
    instrumentos: "Instrumentos",
    incentivos: "Incentivos",
    ingredientes: "Ingredientes",
    juridico: "Jurídico",
    oculos: "Óculos",
    odontologia: "Odontologia",
    petroquimica: "Petroquímica",
    orgaoPublico: "Órgão Público",
    refrigerantes: "Refrigerantes",
    saude: "Saúde",
    seguro: "Seguros",
    servicos: "Serviços",
    tabaco: "Tabaco",
    tecidoHigiene: "Tecido e Higiene",
    tecnologia: "Tecnologia",
    varejo: "Varejo",
    vestuarioCalcado: "Vestuário e Calçado",
    viagem: "Viagem",
    outro: "Outro",
    selecioneEmpresa: "Selecione a empresa",
    trocarImagem: "SELECIONAR",
    legenda1: "Tamanho preferencial: 500 X 340px",
    legenda2: "Tamanho preferencial: 150 X 150px"
  };

  // ##############################
  // criar tamplate
  // #############################

  criarTemplate = {
    criarPlan: "Criar modelo",
    criarPlanM: "CRIAR MODELO",
    permissao: "Permissões",
    proximo: "Próximo",
    Finalizar: "Finalizar",
    digiteInfo: "Digite suas informações",
    voltar: "voltar"
  };

  // ##############################
  // Editar tamplate
  // #############################

  editarTemplate = {
    criarPlan: "Editar template",
    criarPlanM: "EDITAR TEMPLATE",
    permissao: "Permissões",
    proximo: "Próximo",
    Finalizar: "Finalizar",
    digiteInfo: "Digite suas informações",
    voltar: "voltar",
    legenda1: "Tamanho preferencial: 500 X 340px",
    legenda2: "Tamanho preferencial: 150 X 150px"
  };

  calendario = {
    allDay: "Dia todo",
    previous: "Anterior",
    next: "Próximo",
    today: "Hoje",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Data",
    time: "Tempo",
    event: "Evento"
  };

  perfil = {
    sair: "SAIR",
    atualizarPerfil: "Atualizar perfil",
    dadosPerfil: "DADOS DO PERFIL",
    name: "Nome",
    empresa: "Empresa",
    departamento: "Departamento",
    cargo: "Cargo",
    newPass: "Nova senha",
    confirmNovaSenha: "Confirme sua senha",
    desabilitado: " (desabilitado)",
    errorIguais: "As senhas não são iguais",
    errorDigitos: "A senha não contém 6 digitos",
    btConf: 'OK',
    padraoSenha: "Atenção",
    padraoSenha2: 'Você precisa criar uma senha contendo no mínimo um número, uma letra maiúscula e uma minuscula"'
  };
}

export {
  BtWindowBack,
  tabs,
  swot1,
  swotBox,
  painelMetasText,
  swotPopupAspect,
  swot2,
  swot2Matrix,
  swot3,
  actions1,
  actions1Select,
  tabActions,
  actions1Box,
  actions2,
  homePlan,
  cartaoHome,
  criarPlan,
  editarPlan,
  criarPlanStep1,
  imageUpload,
  wizard,
  criarPlanStep2,
  editPlanStep1,
  editPlanStep2,
  painelAcoes,
  departamentoT,
  uploadFoto,
  department,
  registerCompany,
  login,
  email,
  pagesHeaderText,
  registerCompanyJX,
  registerPage,
  menu,
  step1Template,
  criarTemplate,
  typeLanguage,
  calendario,
  editarTemplate,
  news,
  meeting,
  perfil
};
