'use client'

import { TodoItem } from "@/types/TodoItem";
import { useState } from "react"



const Page = () => {
  
  const[itemInput, setItemInput] = useState<string>('') ;

  const[list,setList] = useState<TodoItem[]>([
    {label: 'Fazer dever de casa', checked:false, id:0},
    {label: 'Estudar react', checked:false, id:1},
    {label: 'Resolver bugs', checked:false,id:2},
    {label: 'Dar comida pros gatos', checked:false, id:3}
  ]);

  //adicionar no array
  const handleAddButton = () => {
    if (itemInput.trim() === '') return;
 //sempre que for adicionar algo novo em array dentro de state e necessario criar novo array
 setList([...list, { id:list.length, label:itemInput,checked:false}]);
 setItemInput('');
  
  };
  
//deletar
const deletItem = (id:number) => {
  setList(
    list.filter(item => item.id !== id)
        )//por padrao retorna true pra tudo, mas se key for igual index retorna false e o item nao fica no novo array gerado pelo filter  e assim e deletado
}

//alterar checked

const toggleItem = (id:number) => {
  let newList = [...list]; //criei novo array
  
  for (let i in newList) /*fiz um loop no array*/ {
    if (newList[i].id === id){
      newList[i].checked = !newList[i].checked
    }
  }

  setList(newList)
}

  return(
    <div className="w-screen h-screen flex flex-col text-2xl items-center">
      <h1 className="text-4xl mt-5">Lista de Tarefas</h1>
      <div className="flex w-full max-w-lg my-3 p-4 rounded-md bg-gray-700 border-2 border-gray-400">
        <input type="text" placeholder="Oque deseja fazer?" className="flex-1 border border-black p-3 text-2xl text-black rounded-md mr-3" value={itemInput} 
        onChange={e => setItemInput(e.target.value) } />
      <button onClick={handleAddButton}>Adicionar</button>
      </div>
      <p className="my-4">{list.length} - Itens na Lista</p>
      <ul className="w-full max-w-lg list-disc pl-5">
        {list.map((item) => (
          <li key={item.id}>
            <input onClick={()=> toggleItem(item.id)} type="checkbox" checked={item.checked} className="w-6 h-6 mr-3" />
            {item.label} - <button className="hover:underline" onClick={() => 
            deletItem(item.id)}>[ deletar ]</button></li>
        ))}
      </ul>
    </div>
  )
}

export default Page

