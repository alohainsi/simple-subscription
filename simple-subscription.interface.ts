// Angular
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export interface I_SUBSCRIPTION extends OnDestroy {
  subscriptions: Subscription;
}
