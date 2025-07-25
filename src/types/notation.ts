export interface Notation {
  idApontamento: number;
  circuito: number;
  descricaoCabo: string;
  tagPrevisto: string;
  tagReal: string;
  origem: string;
  destino: string;
  fase: string;
  comprimentoFase: number;
  comprimentoTotal: number;
  secao: number;
  metragemInicio: number;
  metragemFim: number;
  observacao?: string;
  dataLancamento: string;
}

export interface NotationSubmit {
  idTrecho: number;
  matriculaUsuario: number;
  tagReal: string;
  metragemInicio: number;
  metragemFim: number;
  observacao?: string;
  dataLancamento: string;
}
