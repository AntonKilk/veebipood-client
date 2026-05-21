import { DestroyRef, Injectable, inject } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { Page, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductSocketService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly updates$ = new Subject<Page<Product>>();
  private client: Client | null = null;
  private connected = false;

  readonly products$: Observable<Page<Product>> = this.updates$.asObservable();

  connect(): void {
    if (this.client) return;

    const wsUrl = `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/websocket`;

    this.client = new Client({
      brokerURL: wsUrl,
      reconnectDelay: 5000,
      onConnect: () => {
        this.connected = true;
        this.client?.subscribe('/get-products', (msg: IMessage) => {
          try {
            this.updates$.next(JSON.parse(msg.body) as Page<Product>);
          } catch {
            // ignore malformed payloads
          }
        });
      },
      onDisconnect: () => {
        this.connected = false;
      },
    });

    this.client.activate();
    this.destroyRef.onDestroy(() => this.disconnect());
  }

  requestUpdate(page = 0, size = 12): void {
    if (!this.client || !this.connected) return;
    this.client.publish({
      destination: '/app/products-update',
      body: JSON.stringify({ page, size }),
    });
  }

  disconnect(): void {
    this.client?.deactivate();
    this.client = null;
    this.connected = false;
  }
}
