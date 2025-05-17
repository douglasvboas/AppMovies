export interface Filme {
  id_filme: number;
  id_usuario?: number;  
  nome: string;
  descricao: string;
  genero: string;
  nota: number;
  assistido: 'sim' | 'nao';  
  estrelas: number;
}