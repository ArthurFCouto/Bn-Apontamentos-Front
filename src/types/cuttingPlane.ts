export interface CuttingPlane {
  id: number;
  nome: string;
  circuitos: number[];
}

export interface CuttingPlaneWithCable {
  id: number;
  nome: string;
  trechos: [
    {
      id: number;
      identificacaoCabo: string;
    }
  ];
}
