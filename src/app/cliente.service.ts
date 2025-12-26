import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static REPO_CLIENTES = '_CLIENTES';
  constructor() {}

  salvar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  obterStorage(): Cliente[] {
    const repsitorioClientes = localStorage.getItem(
      ClienteService.REPO_CLIENTES
    );

    if (repsitorioClientes) {
      const clientes: Cliente[] = JSON.parse(repsitorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(
      ClienteService.REPO_CLIENTES,
      JSON.stringify(clientes)
    );
    return clientes;
  }

  buscarClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find((c) => c.id === id);
  }

  pesquisarClientes(nomeBusca: string): Cliente[] {
    const clientes = this.obterStorage();
    if (!nomeBusca) {
      return clientes;
    }
    return clientes.filter(
      (cliente) => cliente.nome?.indexOf(nomeBusca) !== -1
    );
  }

  atualizar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.forEach((c) => {
      if (c.id === cliente.id) {
        Object.assign(c, cliente);
      }
    });
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  deletar(cliente: Cliente) {
    const storage = this.obterStorage();

    const novaLista = storage.filter((c) => c.id !== cliente.id);

    localStorage.setItem(
      ClienteService.REPO_CLIENTES,
      JSON.stringify(novaLista)
    );
  }
}
