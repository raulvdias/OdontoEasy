import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Board, Card, Label, List } from './scrumboard.models';

@Injectable({ providedIn: 'root' })
export class ScrumboardService {
  // Private
  private _board: BehaviorSubject<Board | any> = new BehaviorSubject(null);
  private _boards: BehaviorSubject<Board[] | any> = new BehaviorSubject(null);
  private _card: BehaviorSubject<Card | any> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for board
   */
  get board$(): Observable<Board> {
    return this._board.asObservable();
  }

  /**
   * Getter for boards
   */
  get boards$(): Observable<Board[]> {
    return this._boards.asObservable();
  }

  /**
   * Getter for card
   */
  get card$(): Observable<Card> {
    return this._card.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get boards
   */
  getBoards() {
    const mockScrumBoard = {
      id: 'board-1',
      title: 'OdontoEasy Sprint 12',
      description: 'Planejamento e execução da sprint 12 do sistema OdontoEasy',
      icon: '📋',
      lastActivity: '2025-10-15T13:24:00Z',

      // Membros do board
      members: [
        {
          id: 'm1',
          name: 'Raul Victor',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
          id: 'm2',
          name: 'Ana Souza',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        {
          id: 'm3',
          name: 'Carlos Lima',
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
      ],

      // Labels do board
      labels: [
        {
          id: 'lbl-1',
          boardId: 'board-1',
          title: 'Alta prioridade',
        },
        {
          id: 'lbl-2',
          boardId: 'board-1',
          title: 'Bug',
        },
        {
          id: 'lbl-3',
          boardId: 'board-1',
          title: 'Melhoria',
        },
        {
          id: 'lbl-4',
          boardId: 'board-1',
          title: 'Baixa prioridade',
        },
        {
          id: 'lbl-5',
          boardId: 'board-1',
          title: 'Média prioridade',
        },
      ],

      // Listas (colunas do board)
      lists: [
        {
          id: 'list-1',
          boardId: 'board-1',
          position: 1,
          title: 'A Fazer',
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              listId: 'list-1',
              position: 1,
              coverImage: '/',
              title: 'Criar tela de login',
              description:
                'Implementar autenticação com Firebase e layout responsivo.',
              labels: [
                {
                  id: 'lbl-3',
                  boardId: 'board-1',
                  title: 'Melhoria',
                },
              ],
              dueDate: '2025-10-20T00:00:00Z',
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              listId: 'list-1',
              position: 2,
              coverImage: '/',
              title: 'Modelar banco de dados',
              description:
                'Definir estrutura das coleções MongoDB e índices principais.',
              labels: [
                {
                  id: 'lbl-1',
                  boardId: 'board-1',
                  title: 'Alta prioridade',
                },
              ],
              dueDate: null,
            },
          ],
        },
        {
          id: 'list-2',
          boardId: 'board-1',
          position: 2,
          title: 'Andamento',
          cards: [
            {
              id: 'card-3',
              boardId: 'board-1',
              listId: 'list-2',
              position: 1,
              coverImage: '/',
              title: 'Integrar API de pacientes',
              description:
                'Integração entre o front Angular e backend Node.js.',
              labels: [
                {
                  id: 'lbl-3',
                  boardId: 'board-1',
                  title: 'Melhoria',
                },
              ],
              dueDate: null,
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              listId: 'list-2',
              position: 2,
              coverImage: '/',
              title: 'Corrigir erro de upload de imagem',
              description:
                'Erro 400 ao enviar PDF pelo formulário de cadastro.',
              labels: [
                {
                  id: 'lbl-2',
                  boardId: 'board-1',
                  title: 'Bug',
                },
              ],
              dueDate: '2025-10-17T00:00:00Z',
            },
          ],
        },
        {
          id: 'list-3',
          boardId: 'board-1',
          position: 3,
          title: 'Concluído',
          cards: [
            {
              id: 'card-5',
              boardId: 'board-1',
              listId: 'list-3',
              position: 1,
              title: 'Configurar Tailwind no Angular',
              description:
                'Tailwind configurado com dark mode e cores dinâmicas.',
              coverImage: '/',
              labels: [
                {
                  id: 'lbl-3',
                  boardId: 'board-1',
                  title: 'Melhoria',
                },
              ],
              dueDate: null,
            },
            {
              id: 'card-6',
              boardId: 'board-1',
              listId: 'list-3',
              coverImage: '/',
              position: 2,
              title: 'Deploy do backend',
              description: 'Servidor Node.js rodando no Render.',
              labels: [],
              dueDate: null,
            },
          ],
        },
      ],
    };

    this._boards.next([mockScrumBoard]);

    // return this._httpClient.get<Board[]>('api/apps/scrumboard/boards').pipe(
    //   map((response) => response.map((item) => new Board(item))),
    //   tap((boards) => this._boards.next(mockScrumBoard))
    // );
  }

  /**
   * Get board
   *
   * @param id
   */
  getBoard(id: string): any {
    this._board.next({
      id: 'board-1',
      title: 'OdontoEasy Sprint 12',
      description: 'Planejamento e execução da sprint 12 do sistema OdontoEasy',
      icon: '📋',
      lastActivity: '2025-10-15T13:24:00Z',

      // Membros do board
      members: [
        {
          id: 'm1',
          name: 'Raul Victor',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
          id: 'm2',
          name: 'Ana Souza',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        {
          id: 'm3',
          name: 'Carlos Lima',
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
      ],

      // Labels do board
      labels: [
        {
          id: 'lbl-1',
          boardId: 'board-1',
          title: 'Alta prioridade',
        },
        {
          id: 'lbl-2',
          boardId: 'board-1',
          title: 'Bug',
        },
        {
          id: 'lbl-3',
          boardId: 'board-1',
          title: 'Melhoria',
        },
        {
          id: 'lbl-4',
          boardId: 'board-1',
          title: 'Baixa prioridade',
        },
        {
          id: 'lbl-5',
          boardId: 'board-1',
          title: 'Média prioridade',
        },
      ],

      // Listas (colunas do board)
      lists: [
        {
          id: 'list-1',
          boardId: 'board-1',
          position: 1,
          title: 'A Fazer',
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              listId: 'list-1',
              position: 1,
              coverImage: '/',
              title: 'Criar tela de login',
              description:
                'Implementar autenticação com Firebase e layout responsivo.',
              labels: [
                {
                  id: 'lbl-3',
                  boardId: 'board-1',
                  title: 'Melhoria',
                },
              ],
              dueDate: '2025-10-20T00:00:00Z',
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              listId: 'list-1',
              position: 2,
              coverImage: '/',
              title: 'Modelar banco de dados',
              description:
                'Definir estrutura das coleções MongoDB e índices principais.',
              labels: [
                {
                  id: 'lbl-1',
                  boardId: 'board-1',
                  title: 'Alta prioridade',
                },
              ],
              dueDate: null,
            },
          ],
        },
        {
          id: 'list-2',
          boardId: 'board-1',
          position: 2,
          title: 'Em Andamento',
          cards: [
            {
              id: 'card-3',
              boardId: 'board-1',
              listId: 'list-2',
              position: 1,
              coverImage: '/',
              title: 'Integrar API de pacientes',
              description:
                'Integração entre o front Angular e backend Node.js.',
              labels: [
                {
                  id: 'lbl-3',
                  boardId: 'board-1',
                  title: 'Melhoria',
                },
              ],
              dueDate: null,
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              listId: 'list-2',
              position: 2,
              coverImage: '/',
              title: 'Corrigir erro de upload de imagem',
              description:
                'Erro 400 ao enviar PDF pelo formulário de cadastro.',
              labels: [
                {
                  id: 'lbl-2',
                  boardId: 'board-1',
                  title: 'Bug',
                },
              ],
              dueDate: '2025-10-17T00:00:00Z',
            },
          ],
        },
        {
          id: 'list-3',
          boardId: 'board-1',
          position: 3,
          title: 'Concluído',
          cards: [
            {
              id: 'card-5',
              boardId: 'board-1',
              listId: 'list-3',
              position: 1,
              title: 'Configurar Tailwind no Angular',
              description:
                'Tailwind configurado com dark mode e cores dinâmicas.',
              coverImage: '/',
              labels: [
                {
                  id: 'lbl-3',
                  boardId: 'board-1',
                  title: 'Melhoria',
                },
              ],
              dueDate: null,
            },
            {
              id: 'card-6',
              boardId: 'board-1',
              listId: 'list-3',
              coverImage: '/',
              position: 2,
              title: 'Deploy do backend',
              description: 'Servidor Node.js rodando no Render.',
              labels: [],
              dueDate: null,
            },
          ],
        },
      ],
    });
  }

  /**
   * Create board
   *
   * @param board
   */
  createBoard(board: Board): Observable<Board> {
    return this.boards$.pipe(
      take(1),
      switchMap((boards) =>
        this._httpClient
          .put<Board>('api/apps/scrumboard/board', { board })
          .pipe(
            map((newBoard) => {
              // Update the boards with the new board
              this._boards.next([...boards, newBoard]);

              // Return new board from observable
              return newBoard;
            })
          )
      )
    );
  }

  /**
   * Update the board
   *
   * @param id
   * @param board
   */
  updateBoard(id: string, board: Board): Observable<Board> {
    return this.boards$.pipe(
      take(1),
      switchMap((boards) =>
        this._httpClient
          .patch<Board>('api/apps/scrumboard/board', {
            id,
            board,
          })
          .pipe(
            map((updatedBoard) => {
              // Find the index of the updated board
              const index = boards.findIndex((item) => item.id === id);

              // Update the board
              boards[index] = updatedBoard;

              // Update the boards
              this._boards.next(boards);

              // Return the updated board
              return updatedBoard;
            })
          )
      )
    );
  }

  /**
   * Delete the board
   *
   * @param id
   */
  deleteBoard(id: string) {
    // return this.boards$.pipe(
    //     take(1),
    //     switchMap(boards => this._httpClient.delete('api/apps/scrumboard/board', {params: {id}}).pipe(
    //     //     // map((isDeleted: boolean) =>
    //     //     {
    //     //         // Find the index of the deleted board
    //     //         const index = boards.findIndex(item => item.id === id);
    //     //         // Delete the board
    //     //         boards.splice(index, 1);
    //     //         // Update the boards
    //     //         this._boards.next(boards);
    //     //         // Update the board
    //     //         this._board.next(null);
    //     //         // Update the card
    //     //         this._card.next(null);
    //     //         // Return the deleted status
    //     //         return isDeleted;
    //     //     }),
    //     // )),
    // );
  }

  /**
   * Create list
   *
   * @param list
   */
  createList(list: List): Observable<List> {
    return this._httpClient
      .post<List>('api/apps/scrumboard/board/list', { list })
      .pipe(
        map((response) => new List(response)),
        tap((newList) => {
          // Get the board value
          const board = this._board.value;

          // Update the board lists with the new list
          board.lists = [...board.lists, newList];

          // Sort the board lists
          board.lists.sort((a: any, b: any) => a.position - b.position);

          // Update the board
          this._board.next(board);
        })
      );
  }

  /**
   * Update the list
   *
   * @param list
   */
  updateList(list: List): Observable<List> {
    return this._httpClient
      .patch<List>('api/apps/scrumboard/board/list', { list })
      .pipe(
        map((response) => new List(response)),
        tap((updatedList) => {
          // Get the board value
          const board = this._board.value;

          // Find the index of the updated list
          const index = board.lists.findIndex(
            (item: any) => item.id === list.id
          );

          // Update the list
          board.lists[index] = updatedList;

          // Sort the board lists
          board.lists.sort((a: any, b: any) => a.position - b.position);

          // Update the board
          this._board.next(board);
        })
      );
  }

  /**
   * Update the lists
   *
   * @param lists
   */
  updateLists(lists: List[]): Observable<List[]> {
    return this._httpClient
      .patch<List[]>('api/apps/scrumboard/board/lists', { lists })
      .pipe(
        map((response) => response.map((item) => new List(item))),
        tap((updatedLists) => {
          // Get the board value
          const board = this._board.value;

          // Go through the updated lists
          updatedLists.forEach((updatedList) => {
            // Find the index of the updated list
            const index = board.lists.findIndex(
              (item: any) => item.id === updatedList.id
            );

            // Update the list
            board.lists[index] = updatedList;
          });

          // Sort the board lists
          board.lists.sort((a: any, b: any) => a.position - b.position);

          // Update the board
          this._board.next(board);
        })
      );
  }

  /**
   * Delete the list
   *
   * @param id
   */
  deleteList(id: string): Observable<boolean> {
    return this._httpClient
      .delete<boolean>('api/apps/scrumboard/board/list', { params: { id } })
      .pipe(
        tap((isDeleted) => {
          // Get the board value
          const board = this._board.value;

          // Find the index of the deleted list
          const index = board.lists.findIndex((item: any) => item.id === id);

          // Delete the list
          board.lists.splice(index, 1);

          // Sort the board lists
          board.lists.sort((a: any, b: any) => a.position - b.position);

          // Update the board
          this._board.next(board);
        })
      );
  }

  /**
   * Get card
   */
  getCard(id: string): Observable<Card> {
    return this._board.pipe(
      take(1),
      map((board) => {
        // Find the card
        const card = board.lists
          .find((list: any) => list.cards.some((item: any) => item.id === id))
          .cards.find((item: any) => item.id === id);

        // Update the card
        this._card.next(card);

        // Return the card
        return card;
      }),
      switchMap((card) => {
        if (!card) {
          return throwError('Could not found the card with id of ' + id + '!');
        }

        return of(card);
      })
    );
  }

  /**
   * Create card
   *
   * @param card
   */
  createCard(card: Card): Observable<Card> {
    return this._httpClient
      .put<Card>('api/apps/scrumboard/board/card', { card })
      .pipe(
        map((response) => new Card(response)),
        tap((newCard) => {
          // Get the board value
          const board = this._board.value;

          // Find the list and push the new card in it
          board.lists.forEach((listItem: any, index: any, list: any) => {
            if (listItem.id === newCard.listId) {
              list[index].cards.push(newCard);
            }
          });

          // Update the board
          this._board.next(board);

          // Return the new card
          return newCard;
        })
      );
  }

  /**
   * Update the card
   *
   * @param id
   * @param card
   */
  updateCard(id: string, card: Card): Observable<Card> {
    return this.board$.pipe(
      take(1),
      switchMap((board) =>
        this._httpClient
          .patch<Card>('api/apps/scrumboard/board/card', {
            id,
            card,
          })
          .pipe(
            map((updatedCard) => {
              // Find the card and update it
              board.lists.forEach((listItem) => {
                listItem.cards.forEach((cardItem, index, array) => {
                  if (cardItem.id === id) {
                    array[index] = updatedCard;
                  }
                });
              });

              // Update the board
              this._board.next(board);

              // Update the card
              this._card.next(updatedCard);

              // Return the updated card
              return updatedCard;
            })
          )
      )
    );
  }

  /**
   * Update the cards
   *
   * @param cards
   */
  updateCards(cards: Card[]): Observable<Card[]> {
    return this._httpClient
      .patch<Card[]>('api/apps/scrumboard/board/cards', { cards })
      .pipe(
        map((response) => response.map((item) => new Card(item))),
        tap((updatedCards) => {
          // Get the board value
          const board = this._board.value;

          // Go through the updated cards
          updatedCards.forEach((updatedCard) => {
            // Find the index of the updated card's list
            const listIndex = board.lists.findIndex(
              (list: any) => list.id === updatedCard.listId
            );

            // Find the index of the updated card
            const cardIndex = board.lists[listIndex].cards.findIndex(
              (item: any) => item.id === updatedCard.id
            );

            // Update the card
            board.lists[listIndex].cards[cardIndex] = updatedCard;

            // Sort the cards
            board.lists[listIndex].cards.sort(
              (a: any, b: any) => a.position - b.position
            );
          });

          // Update the board
          this._board.next(board);
        })
      );
  }

  /**
   * Delete the card
   *
   * @param id
   */
  deleteCard(id: string): Observable<boolean> {
    return this.board$.pipe(
      take(1),
      switchMap((board) =>
        this._httpClient
          .delete('api/apps/scrumboard/board/card', { params: { id } })
          .pipe(
            map((isDeleted: any) => {
              // Find the card and delete it
              board.lists.forEach((listItem: any) => {
                listItem.cards.forEach(
                  (cardItem: any, index: any, array: any) => {
                    if (cardItem.id === id) {
                      array.splice(index, 1);
                    }
                  }
                );
              });

              // Update the board
              this._board.next(board);

              // Update the card
              this._card.next(null);

              // Return the deleted status
              return isDeleted;
            })
          )
      )
    );
  }

  /**
   * Create label
   *
   * @param label
   */
  createLabel(label: Label): Observable<Label> {
    return this.board$.pipe(
      take(1),
      switchMap((board) =>
        this._httpClient
          .post<Label>('api/apps/scrumboard/board/label', { label })
          .pipe(
            map((newLabel) => {
              // Update the board labels with the new label
              board.labels = [...board.labels, newLabel];

              // Update the board
              this._board.next(board);

              // Return new label from observable
              return newLabel;
            })
          )
      )
    );
  }

  /**
   * Update the label
   *
   * @param id
   * @param label
   */
  updateLabel(id: string, label: Label): Observable<Label> {
    return this.board$.pipe(
      take(1),
      switchMap((board) =>
        this._httpClient
          .patch<Label>('api/apps/scrumboard/board/label', {
            id,
            label,
          })
          .pipe(
            map((updatedLabel) => {
              // Find the index of the updated label
              const index = board.labels.findIndex((item) => item.id === id);

              // Update the label
              board.labels[index] = updatedLabel;

              // Update the board
              this._board.next(board);

              // Return the updated label
              return updatedLabel;
            })
          )
      )
    );
  }

  /**
   * Delete the label
   *
   * @param id
   */
  deleteLabel(id: string): Observable<boolean> {
    return this.board$.pipe(
      take(1),
      switchMap((board) =>
        this._httpClient
          .delete('api/apps/scrumboard/board/label', { params: { id } })
          .pipe(
            map((isDeleted: any) => {
              // Find the index of the deleted label
              const index = board.labels.findIndex((item) => item.id === id);

              // Delete the label
              board.labels.splice(index, 1);

              // If the label is deleted...
              if (isDeleted) {
                // Remove the label from any card that uses it
                board.lists.forEach((list) => {
                  list.cards.forEach((card) => {
                    const labelIndex = card.labels.findIndex(
                      (label) => label.id === id
                    );
                    if (labelIndex > -1) {
                      card.labels.splice(labelIndex, 1);
                    }
                  });
                });
              }

              // Update the board
              this._board.next(board);

              // Return the deleted status
              return isDeleted;
            })
          )
      )
    );
  }

  /**
   * Search within board cards
   *
   * @param query
   */
  search(query: string): Observable<Card[] | null> {
    // @TODO: Update the board cards based on the search results
    return this._httpClient.get<Card[] | null>(
      'api/apps/scrumboard/board/search',
      { params: { query } }
    );
  }
}
