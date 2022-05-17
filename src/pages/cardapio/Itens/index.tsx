import cardapio from 'data/cardapio.json';
import Item from './Item';
import styles from './Itens.module.scss';
import { useEffect, useState } from 'react';
import { Cardapio } from 'types/Prato';

interface Props {
  busca: string,
  filtro: number | null,
  ordenador: string;
}

export default function Itens(props: Props) {
  const [lista, setLista] = useState(cardapio); // o estado inicial será o cardapio
  const { busca, filtro, ordenador } = props;

  
  useEffect(() => {
    function testaBusca(title: string){
      const regex = new RegExp(busca, 'i');//o serve para desconsiderar o case sensitive
      return regex.test(title);
    }
  
    function testaFiltro(id: number){
      if(filtro !== null) return filtro === id; //se existir o filtro, vamos retornar filtro igual a iD
      return true;
    }
  
    function ordenar(novaLista: Cardapio){
      switch(ordenador){
      case 'porcao':
        return novaLista.sort((a, b) => a.size > b.size ? 1 : -1);
      case 'qtd_pessoas':
        return novaLista.sort((a, b) => a.serving > b.serving ? 1 : -1);
      case 'preco':
        return novaLista.sort((a, b) => a.price > b.price ? 1 : -1);
      default:
        return novaLista;
      }
    }

    const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id));
    setLista(ordenar(novaLista));
    
  },[busca, filtro, ordenador]);// sempre que esses atualizarem o useeffect irá rodar

  return (
    <div className={styles.itens}>
      {lista.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}

