export interface Todo {
  id: number; 
  title: string;
  status: boolean;
}

export interface TodoProps {
  item: Todo;
  loadData: () => void;
}
